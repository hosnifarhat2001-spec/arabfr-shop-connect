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
    "/cls1.jpg";

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

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedProducts = products.slice(start, end);

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
              <img src="logo.png" alt="NourFashion" className="h-10 w-auto sm:h-12" />
              <span className="text-white text-xl sm:text-2xl font-extrabold tracking-wide">NourFashion</span>
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

      

      {/* Products Section */
      }
      <section id="products" className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-6 md:mb-8 text-center">
            <h3 className="text-2xl font-bold md:text-3xl">{t('products')}</h3>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Découvrez notre sélection tendance, alliant style et qualité au meilleur prix.
            </p>
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
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === currentPage ? "default" : "outline"}
                      onClick={() => setPage(p)}
                      className="w-10"
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section Infos (À propos & Services) */}
      <section className="relative z-10 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="text-3xl font-bold md:text-4xl">En savoir plus</h3>
            <p className="mt-3 text-muted-foreground">Découvrez qui nous sommes et ce que nous offrons.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card À propos */}
            <div className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-60 blur-2xl" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">NF</div>
                <div>
                  <h4 className="text-xl font-semibold">À propos</h4>
                  <p className="mt-2 text-muted-foreground">
                    Découvrez notre histoire et ce qui nourrit notre passion pour le style et la qualité.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={() => navigate('/about')}>
                  En savoir plus
                </Button>
              </div>
            </div>

            {/* Card Services */}
            <div className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200 to-teal-200 opacity-60 blur-2xl" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">SV</div>
                <div>
                  <h4 className="text-xl font-semibold">Services</h4>
                  <p className="mt-2 text-muted-foreground">
                    Des collections sélectionnées avec soin, une livraison rapide et un support à votre écoute.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={() => navigate('/services')}>
                  Nos services
                </Button>
              </div>
            </div>
          </div>
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
