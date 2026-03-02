
import { createContext, useContext } from 'react';
import { Language } from '../types';

interface AppContextProps {
  lang: Language;
  toggleLang: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const useAppContext = () => useContext(AppContext);
