
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { Language } from './types';
import { Layout } from './components/Layout';
import { BackgroundPattern } from './components/Shared';
import { ChatAssistant } from './components/ChatAssistant';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { StorePage } from './pages/StorePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CalculatorPage } from './pages/CalculatorPage';

function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load persisted settings
    const savedLang = localStorage.getItem('eweb_lang') as Language;
    const savedTheme = localStorage.getItem('eweb_theme');
    if (savedLang) setLang(savedLang);
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    // Apply settings
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('eweb_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('eweb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('eweb_theme', 'light');
    }
  }, [isDark]);

  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <AppContext.Provider value={{ lang, toggleLang, isDark, toggleTheme }}>
      <Router>
        <BackgroundPattern />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
        <ChatAssistant />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
