import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const Contact = () => {
  const navigate = useNavigate();
  const { whatsappNumber } = useSettings();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}> 
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Contact</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground">Des questions ? Contactez-nous et nous vous répondrons rapidement.</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
            {whatsappNumber ? (
              <span className="text-muted-foreground">+{whatsappNumber}</span>
            ) : null}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
