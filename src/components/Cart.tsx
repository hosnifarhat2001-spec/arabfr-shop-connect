import { ShoppingCart, X, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from './ui/button';

export default function Cart() {
  const { 
    items, 
    totalItems, 
    isOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity,
    clearCart
  } = useCart();
  
  const { whatsappNumber } = useSettings();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    
    let message = `Bonjour, je voudrais commander les produits suivants :\n\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.quantity} x ${item.price} DNT) = ${(item.quantity * item.price).toFixed(2)} DNT\n`;
    });
    
    message += `\nTotal: ${totalPrice.toFixed(2)} DNT`;
    message += `\n\nMerci !`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
      
    clearCart();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="relative p-2 text-white/90 hover:text-white transition-colors"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Votre Panier</h3>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fermer le panier"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} DH</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            aria-label="Réduire la quantité"
                          >
                            -
                          </button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Supprimer l'article"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total:</span>
                    <span>{totalPrice.toFixed(2)} DH</span>
                  </div>
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 mb-3"
                    onClick={handleWhatsAppOrder}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Commander maintenant
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Besoin d'aide ?</h4>
                    <div className="space-y-2">
                      <a 
                        href="tel:+21624598015" 
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +216 24 598 015
                      </a>
                      <a 
                        href="https://wa.me/21624598015" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.498 14.382c-.3-.15-1.767-.867-2.04-.966-.274-.1-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.06-.173-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.076-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.1 3.195 5.1 4.485.714.3 1.27.48 1.704.63.714.226 1.365.195 1.88.121.574-.09 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.525-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a11.69 11.69 0 01-1.785-6.24c0-6.48 5.32-11.76 11.86-11.76 3.165 0 6.135 1.23 8.37 3.465 2.235 2.24 3.465 5.22 3.465 8.385-.004 6.48-5.384 11.755-12 11.755M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.37.1 11.955c0 2.096.55 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.365 11.95-11.95 0-3.18-1.24-6.165-3.495-8.41" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
