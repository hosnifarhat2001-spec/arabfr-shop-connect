import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts, Product } from '@/contexts/ProductsContext';
import { useSettings } from '@/contexts/SettingsContext';
import { ProductCard } from '@/components/ProductCard';
import { ProductForm } from '@/components/ProductForm';
import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowLeft, Settings, LogOut, Phone, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const Admin = () => {
  const { t } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const { whatsappNumber, setWhatsappNumber } = useSettings();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState(whatsappNumber);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    setTempWhatsappNumber(whatsappNumber);
  }, [whatsappNumber]);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !data) {
        toast({
          title: t('error'),
          description: "Vous n'avez pas l'accès administrateur",
          variant: 'destructive'
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      navigate('/');
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleBackToDashboard = () => {
    setShowForm(false);
    setShowSettings(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({ title: t('editProduct'), description: t('save') });
      } else {
        await addProduct(productData);
        toast({ title: t('addProduct'), description: t('save') });
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      // Error already handled in context
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await deleteProduct(id);
        toast({ title: t('deleteProduct'), variant: 'destructive' });
      } catch (error) {
        // Error already handled in context
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const whatsappSchema = z.string()
    .regex(/^[0-9]{10,15}$/, 'Le numéro doit contenir 10 à 15 chiffres sans espaces ni caractères spéciaux')
    .optional()
    .or(z.literal(''));

  const handleSaveSettings = async () => {
    try {
      // Validate the phone number
      const validation = whatsappSchema.safeParse(tempWhatsappNumber);
      
      if (!validation.success) {
        toast({
          title: t('error'),
          description: validation.error.issues[0].message,
          variant: 'destructive'
        });
        return;
      }

      await setWhatsappNumber(tempWhatsappNumber);
      setShowSettings(false);
      toast({ 
        title: t('settings'), 
        description: t('settingsSaved') 
      });
    } catch (error) {
      // Error already handled in context
    }
  };

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

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('loading')}</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {(showForm || showSettings) && (
              <Button variant="ghost" size="icon" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-2xl font-bold">{t('adminDashboard')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {showSettings ? (
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <CardTitle>{t('settings')}</CardTitle>
                </div>
                <CardDescription>{t('whatsappNumberDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t('whatsappNumber')}</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder={t('whatsappPlaceholder')}
                    value={tempWhatsappNumber}
                    onChange={(e) => setTempWhatsappNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={15}
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('whatsappHint')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveSettings}>{t('saveSettings')}</Button>
                  <Button variant="outline" onClick={() => {
                    setShowSettings(false);
                    setTempWhatsappNumber(whatsappNumber);
                  }}>
                    {t('cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : showForm ? (
          <div className="mx-auto max-w-2xl">
            <ProductForm
              product={editingProduct || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">{t('products')}</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setShowSettings(true)} className="gap-2">
                  <Settings className="h-4 w-4" />
                  {t('settings')}
                </Button>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t('addProduct')}
                </Button>
              </div>
            </div>

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

            {filteredProducts.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-muted-foreground">{searchQuery ? t('noProducts') : t('noProducts')}</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isAdmin
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDelete(product.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
