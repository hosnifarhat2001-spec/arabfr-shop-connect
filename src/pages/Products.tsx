import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { ProductCard } from '@/components/ProductCard';
import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const Products = () => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) &&
            !product.category.toLowerCase().includes(query) &&
            !product.description.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filters
      if (minPrice && product.price < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && product.price > parseFloat(maxPrice)) {
        return false;
      }
      return true;
    });
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || minPrice || maxPrice || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">{t('products')}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchProducts')}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {t('filters')}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                {t('clearFilters')}
              </Button>
            )}
          </div>

          {showFilters && (
            <Card className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>{t('filterByCategory')}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('allCategories')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('allCategories')}</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('minPrice')}</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('maxPrice')}</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="∞"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
