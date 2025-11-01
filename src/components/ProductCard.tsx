import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export const ProductCard = ({ product, onEdit, onDelete, isAdmin }: ProductCardProps) => {
  const { t } = useLanguage();
  const { whatsappNumber } = useSettings();
  const { addToCart } = useCart();
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const sizeOptions = useMemo(() => {
    const raw = (product.size || '').split(',').map(s => s.trim()).filter(Boolean);
    return raw.length > 0 ? raw : ['S','M','L','XL'];
  }, [product.size]);

  const colorOptions = ['Noir','Blanc','Rouge','Bleu','Vert'];

  const handleAddToCart = () => {
    if (!size || !color) {
      toast.error('Veuillez choisir la couleur et la taille.');
      return;
    }
    
    addToCart({
      id: `${product.id}-${color}-${size}`,
      name: `${product.name} (${color}, ${size})`,
      price: product.price,
      image: product.image
    });
    
    toast.success('Produit ajouté au panier');
  };

  const handleWhatsAppOrder = () => {
    if (!size || !color) {
      toast.error('Veuillez choisir la couleur et la taille.');
      return;
    }
    const message = `Bonjour, je voudrais commander ce produit:\n\nNom: ${product.name}\nPrix: ${product.price} DNT\nCatégorie: ${product.category}\nCouleur: ${color}\nTaille: ${size}\nQuantité: 1`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{t('price')}:</span>
          <span className="text-lg font-bold text-primary">{product.price} DNT</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <span className="mb-1 block text-sm font-semibold">{t('size')}:</span>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={'Choisir la taille'} />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <span className="mb-1 block text-sm font-semibold">Couleur:</span>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={'Choisir la couleur'} />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {isAdmin ? (
          <>
            <Button variant="outline" className="flex-1" onClick={onEdit}>
              {t('edit')}
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onDelete}>
              {t('delete')}
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Panier
            </Button>
            <Button 
              className="w-full bg-black hover:bg-gray-800"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t('order')}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
