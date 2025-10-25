import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr';

interface Translations {
  [key: string]: {
    ar: string;
    fr: string;
  };
}

const translations: Translations = {
  adminDashboard: { ar: 'لوحة التحكم', fr: 'Tableau de bord' },
  products: { ar: 'المنتجات', fr: 'Produits' },
  addProduct: { ar: 'إضافة منتج', fr: 'Ajouter un produit' },
  editProduct: { ar: 'تعديل المنتج', fr: 'Modifier le produit' },
  deleteProduct: { ar: 'حذف المنتج', fr: 'Supprimer le produit' },
  productName: { ar: 'اسم المنتج', fr: 'Nom du produit' },
  description: { ar: 'الوصف', fr: 'Description' },
  price: { ar: 'السعر', fr: 'Prix' },
  category: { ar: 'الفئة', fr: 'Catégorie' },
  quantity: { ar: 'الكمية', fr: 'Quantité' },
  size: { ar: 'الحجم', fr: 'Taille' },
  image: { ar: 'الصورة', fr: 'Image' },
  imageUrl: { ar: 'رابط الصورة', fr: 'URL de l\'image' },
  save: { ar: 'حفظ', fr: 'Enregistrer' },
  cancel: { ar: 'إلغاء', fr: 'Annuler' },
  edit: { ar: 'تعديل', fr: 'Modifier' },
  delete: { ar: 'حذف', fr: 'Supprimer' },
  contact: { ar: 'تواصل', fr: 'Contact' },
  order: { ar: 'طلب', fr: 'Commander' },
  confirmDelete: { ar: 'هل أنت متأكد من حذف هذا المنتج؟', fr: 'Êtes-vous sûr de vouloir supprimer ce produit ?' },
  noProducts: { ar: 'لا توجد منتجات متاحة', fr: 'Aucun produit disponible' },
  welcome: { ar: 'مرحباً بك في متجرنا', fr: 'Bienvenue dans notre boutique' },
  viewProducts: { ar: 'عرض المنتجات', fr: 'Voir les produits' },
  adminPanel: { ar: 'لوحة الإدارة', fr: 'Panneau d\'administration' },
  available: { ar: 'متاح', fr: 'Disponible' },
  settings: { ar: 'الإعدادات', fr: 'Paramètres' },
  whatsappNumber: { ar: 'رقم الواتساب', fr: 'Numéro WhatsApp' },
  whatsappNumberDescription: { ar: 'أضف رقم واتساب لتلقي الطلبات من العملاء', fr: 'Ajoutez un numéro WhatsApp pour recevoir les commandes des clients' },
  whatsappPlaceholder: { ar: 'مثال: 213XXXXXXXXX', fr: 'Exemple: 213XXXXXXXXX' },
  whatsappHint: { ar: 'أدخل رقم الهاتف مع رمز البلد بدون مسافات (مثال: 213555123456)', fr: 'Entrez le numéro avec l\'indicatif pays sans espaces (ex: 213555123456)' },
  saveSettings: { ar: 'حفظ الإعدادات', fr: 'Enregistrer les paramètres' },
  settingsSaved: { ar: 'تم حفظ الإعدادات بنجاح', fr: 'Paramètres enregistrés avec succès' },
  signIn: { ar: 'تسجيل الدخول', fr: 'Se connecter' },
  signUp: { ar: 'إنشاء حساب', fr: 'S\'inscrire' },
  signOut: { ar: 'تسجيل الخروج', fr: 'Se déconnecter' },
  email: { ar: 'البريد الإلكتروني', fr: 'Email' },
  password: { ar: 'كلمة المرور', fr: 'Mot de passe' },
  signInToContinue: { ar: 'قم بتسجيل الدخول للمتابعة', fr: 'Connectez-vous pour continuer' },
  checkEmail: { ar: 'تحقق من بريدك الإلكتروني لتأكيد حسابك', fr: 'Vérifiez votre email pour confirmer votre compte' },
  error: { ar: 'خطأ', fr: 'Erreur' },
  success: { ar: 'نجح', fr: 'Succès' },
  loading: { ar: 'جاري التحميل...', fr: 'Chargement...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

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
