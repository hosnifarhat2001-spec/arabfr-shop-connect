import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}> 
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Services</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="prose max-w-3xl">
          <p>
            Des collections sélectionnées avec soin, une livraison rapide et un support à votre écoute.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
