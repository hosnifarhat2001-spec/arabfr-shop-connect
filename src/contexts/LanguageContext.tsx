import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr';

interface Translations {
  [key: string]: string;
}

const translations: Translations = {
  adminDashboard: 'Tableau de bord',
  products: 'Produits',
  addProduct: 'Ajouter un produit',
  editProduct: 'Modifier le produit',
  deleteProduct: 'Supprimer le produit',
  productName: 'Nom du produit',
  description: 'Description',
  price: 'Prix',
  category: 'Catégorie',
  quantity: 'Quantité',
  size: 'Taille',
  image: 'Image',
  imageUrl: 'URL de l\'image',
  save: 'Enregistrer',
  cancel: 'Annuler',
  edit: 'Modifier',
  delete: 'Supprimer',
  contact: 'Contact',
  order: 'Commander',
  confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
  noProducts: 'Aucun produit disponible',
  welcome: 'Bienvenue dans notre boutique',
  viewProducts: 'Voir les produits',
  adminPanel: 'Panneau d\'administration',
  available: 'Disponible',
  settings: 'Paramètres',
  whatsappNumber: 'Numéro WhatsApp',
  whatsappNumberDescription: 'Ajoutez un numéro WhatsApp pour recevoir les commandes des clients',
  whatsappPlaceholder: 'Exemple: 213XXXXXXXXX',
  whatsappHint: 'Entrez le numéro avec l\'indicatif pays sans espaces (ex: 213555123456)',
  saveSettings: 'Enregistrer les paramètres',
  settingsSaved: 'Paramètres enregistrés avec succès',
  signIn: 'Se connecter',
  signUp: 'S\'inscrire',
  signOut: 'Se déconnecter',
  email: 'Email',
  password: 'Mot de passe',
  signInToContinue: 'Connectez-vous pour continuer',
  checkEmail: 'Vérifiez votre email pour confirmer votre compte',
  error: 'Erreur',
  success: 'Succès',
  loading: 'Chargement...',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'fr';
  }, []);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const isRTL = false;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
