import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SettingsContextType {
  whatsappNumber: string;
  loading: boolean;
  setWhatsappNumber: (number: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsappNumber, setWhatsappNumberState] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'whatsapp_number')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setWhatsappNumberState(data?.value || '');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const setWhatsappNumber = async (number: string) => {
    try {
      const { error } = await supabase
        .from('settings')
        .update({ value: number })
        .eq('key', 'whatsapp_number');

      if (error) throw error;
      setWhatsappNumberState(number);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ whatsappNumber, loading, setWhatsappNumber }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
