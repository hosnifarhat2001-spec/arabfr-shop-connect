import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
  const { t } = useLanguage();
  const { whatsappNumber } = useSettings();

  const year = new Date().getFullYear();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/';

  return (
    <footer className="relative z-10 border-t border-gray-800 bg-black text-gray-200">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold">A propos de nous</h4>
          <p className="mt-2 text-sm text-gray-400">
            Découvrez notre collection exclusive de vêtements et accessoires de mode.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">TikTok</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.17.63 2.33 1.52 3.22.87.86 2.02 1.41 3.18 1.48v4.14c-.91-.05-1.83-.35-2.63-.92-.64-.5-1.16-1.19-1.46-1.93v7.32c0 3.1-2.32 5.63-5.23 5.96-3.41.38-6.34-2.3-6.34-5.64 0-2.4 1.6-4.47 3.9-5.15v4.03c0 .4.42.76.85.54 2.16-1.03 3.64-3.54 2.7-6.01-.68-1.78-2.51-2.83-4.39-2.65-2.25.22-4.06 2.09-4.06 4.4 0 1.09.4 2.1 1.06 2.88.14.16.24.35.26.56.08.74-.46 1.38-1.2 1.38h-.1c-1.01 0-1.83-.82-1.83-1.82 0-3.63 2.95-6.58 6.58-6.58 1.44 0 2.8.5 3.88 1.39.78-1.05 1.6-2.05 2.47-3.02z" />
              </svg>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">WhatsApp</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.498 14.382c-.3-.15-1.767-.867-2.04-.966-.274-.1-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.06-.173-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.076-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.1 3.195 5.1 4.485.714.3 1.27.48 1.704.63.714.226 1.365.195 1.88.121.574-.09 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.525-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a11.69 11.69 0 01-1.785-6.24c0-6.48 5.32-11.76 11.86-11.76 3.165 0 6.135 1.23 8.37 3.465 2.235 2.24 3.465 5.22 3.465 8.385-.004 6.48-5.384 11.755-12 11.755M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.37.1 11.955c0 2.096.55 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.365 11.95-11.95 0-3.18-1.24-6.165-3.495-8.41" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Liens utiles</h4>
          <p>localisation: Souassi Mahdia
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Contactez-nous</h4>
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-800 p-2 rounded-full">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+21624598015" className="ml-3 text-gray-400 hover:text-white transition-colors">
                +216 24 598 015
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-800 p-2 rounded-full">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:contact@example.com" className="ml-3 text-gray-400 hover:text-white transition-colors">
                contact@example.com
              </a>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gray-800 p-2 rounded-full mt-1">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <a 
                href="https://www.google.com/maps?q=35.3431443,10.5460328" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                8F7G8GVW+7C, Mahdia, Tunisia, 5140
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {year} SaraMode. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
