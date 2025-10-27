import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Product } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export const ProductCard = ({ product, onEdit, onDelete, isAdmin }: ProductCardProps) => {
  const { t, language } = useLanguage();
  const { whatsappNumber } = useSettings();

  const handleWhatsAppOrder = () => {
    const message = language === 'ar'
      ? `مرحباً، أود طلب هذا المنتج:\n\nالاسم: ${product.name}\nالسعر: ${product.price}\nالفئة: ${product.category}\nالحجم: ${product.size}\nالكمية المطلوبة: 1`
      : `Bonjour, je voudrais commander ce produit:\n\nNom: ${product.name}\nPrix: ${product.price}\nCatégorie: ${product.category}\nTaille: ${product.size}\nQuantité demandée: 1`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = whatsappNumber 
      ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{t('price')}:</span>
          <span className="text-lg font-bold text-primary">{product.price} DNT</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{t('size')}:</span>
          <span>{product.size}</span>
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
          <Button className="w-full gap-2" onClick={handleWhatsAppOrder}>
            <MessageCircle className="h-4 w-4" />
            {t('order')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
