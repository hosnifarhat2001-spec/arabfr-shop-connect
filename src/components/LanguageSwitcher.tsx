import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled
      className="gap-2"
      aria-label="Langue: Français"
    >
      <Languages className="h-4 w-4" />
      {language.toUpperCase()}
    </Button>
  );
};
