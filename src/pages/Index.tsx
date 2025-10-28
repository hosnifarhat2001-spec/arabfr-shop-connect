import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { ProductCard } from '@/components/ProductCard';
 
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Footer from '@/components/Footer';

const Index = () => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const backgroundUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2069&auto=format&fit=crop";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };
  const sections = [
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: t('products') },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed Navbar */}
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-white/10 bg-neutral-900/80 backdrop-blur relative">
        <div className="container mx-auto grid grid-cols-3 items-center px-4 py-3">
          {/* Left: Brand (Logo + Title) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2"
            >
              <img src="logo.png" alt="NourFashin" className="h-10 w-auto sm:h-12" />
              <span className="text-white text-xl sm:text-2xl font-extrabold tracking-wide">NourFashin</span>
            </button>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden sm:flex items-center justify-center gap-6">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-white/90 text-sm font-medium hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Right: (empty reserved space) */}
          <div className="flex items-center justify-end gap-2"></div>
        </div>
        {/* Absolute mobile toggle in top-right */}
        <button
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          className="absolute right-4 top-3 inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {mobileOpen && (
          <div id="mobile-menu" className="container mx-auto px-4 pb-3 sm:hidden">
            <div className="flex flex-col gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="w-full rounded-md bg-white/5 px-3 py-2 text-left text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section (100vh) */}
      <section className="relative h-screen w-full">
        {/* Background Video (only within hero) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundUrl}
          >
            <source src="hero.mp4" type="video/mp4" />
            <source src="https://samplelib.com/lib/preview/mp4/sample-960x540.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center pt-16">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {t('welcome')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              {t('products')}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg" onClick={() => scrollTo('products')} className="h-12 rounded-full px-8 text-base">
                {t('viewProducts')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold md:text-3xl">À propos</h3>
            <p className="mt-3 text-muted-foreground">
              Découvrez notre histoire et ce qui nourrit notre passion pour le style et la qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold md:text-3xl">Services</h3>
            <p className="mt-3 text-muted-foreground">
              Des collections sélectionnées avec soin, une livraison rapide et un support à votre écoute.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */
      }
      <section id="products" className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-6 md:mb-8 text-center">
            <h3 className="text-2xl font-bold md:text-3xl">{t('products')}</h3>
          </div>
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-muted-foreground">{t('loading')}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-muted-foreground">{t('noProducts')}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold md:text-3xl">Contact</h3>
            <p className="mt-3 text-muted-foreground">
              Des questions ? Contactez-nous et nous vous répondrons rapidement.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
