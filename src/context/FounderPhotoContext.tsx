import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';

interface FounderPhotoContextType {
  photoUrl: string;
  isCustom: boolean;
  updatePhotoFromFile: (file: File) => Promise<boolean>;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'tst_custom_founder_photo_v1';

const FounderPhotoContext = createContext<FounderPhotoContextType>({
  photoUrl: COMPANY_INFO.founder.image,
  isCustom: false,
  updatePhotoFromFile: async () => false,
  resetToDefault: () => {},
});

export const FounderPhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.startsWith('data:image')) {
        return saved;
      }
    } catch {
      // ignore storage access error
    }
    return COMPANY_INFO.founder.image;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setPhotoUrl(e.newValue);
        setIsCustom(true);
      } else if (e.key === STORAGE_KEY && !e.newValue) {
        setPhotoUrl(COMPANY_INFO.founder.image);
        setIsCustom(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updatePhotoFromFile = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        try {
          localStorage.setItem(STORAGE_KEY, result);
        } catch (err) {
          console.warn('LocalStorage limit exceeded, using in-memory image:', err);
        }
        setPhotoUrl(result);
        setIsCustom(true);
        resolve(true);
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setPhotoUrl(COMPANY_INFO.founder.image);
    setIsCustom(false);
  };

  return (
    <FounderPhotoContext.Provider
      value={{
        photoUrl,
        isCustom,
        updatePhotoFromFile,
        resetToDefault,
      }}
    >
      {children}
    </FounderPhotoContext.Provider>
  );
};

export const useFounderPhoto = () => useContext(FounderPhotoContext);
