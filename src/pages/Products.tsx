import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { ProductCard } from '@/components/ProductCard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const navigate = useNavigate();

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
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
