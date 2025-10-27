import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
  const { t } = useLanguage();
  const { whatsappNumber } = useSettings();

  const year = new Date().getFullYear();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/';

  return (
    <footer className="relative z-10 border-t bg-background/80">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold">ArabFR Shop</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre style, votre choix. Qualité et tendance au meilleur prix.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Links</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a href="/" className="text-muted-foreground hover:text-foreground">Home</a>
            </li>
            <li>
              <a href="/products" className="text-muted-foreground hover:text-foreground">{t('products')}</a>
            </li>
            <li>
              <a href="/admin" className="text-muted-foreground hover:text-foreground">Admin</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">{t('contact')}</h4>
          <div className="mt-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
              {whatsappNumber ? (
                <span className="text-muted-foreground">+{whatsappNumber}</span>
              ) : null}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {year} arabfr-shop-connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
