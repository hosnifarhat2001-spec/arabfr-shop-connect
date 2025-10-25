import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'ar' ? 'FR' : 'ع'}
    </Button>
  );
};
