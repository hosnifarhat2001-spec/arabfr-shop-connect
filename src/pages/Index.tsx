import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';
import { ProductCard } from '@/components/ProductCard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  const backgroundUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2069&auto=format&fit=crop";

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed Navbar */}
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-white/10 bg-neutral-900/80 backdrop-blur">
        <div className="container mx-auto grid grid-cols-3 items-center px-4 py-3">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2"
            >
              <span className="inline-block h-5 w-5 rounded-sm bg-white/90" aria-hidden />
              <span className="text-white/90 text-sm font-semibold tracking-tight">arabfr</span>
            </button>
          </div>

          {/* Center: Categories */}
          <nav className="hidden sm:flex items-center justify-center gap-6">
            {['New','Men','Women','Kids','Sport','Sportswear'].map((label) => (
              <button
                key={label}
                onClick={scrollToProducts}
                className="text-white/90 text-sm font-medium hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right: Language */}
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={backgroundUrl}
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="https://samplelib.com/lib/preview/mp4/sample-960x540.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

      {/* Hero content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center pt-16">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {t('welcome')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            {t('products')}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" onClick={scrollToProducts} className="h-12 rounded-full px-8 text-base">
              {t('viewProducts')}
            </Button>
          </div>
        </div>
      </main>

      {/* Products Section */}
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

      {/* Footer */}
      <footer className="relative z-10 border-t bg-background/80">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} arabfr-shop-connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
