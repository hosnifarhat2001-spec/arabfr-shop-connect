import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}> 
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">À propos</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="prose max-w-3xl">
          <p>
            Découvrez notre histoire et ce qui nourrit notre passion pour le style et la qualité. 
            Nous sélectionnons des produits avec soin afin de vous proposer le meilleur rapport qualité/prix.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
