
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, MessageCircle, Mail, MapPin, ArrowRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { NAV_LINKS } from '../constants';
import { Logo, ScrollProgress } from './Shared';

const MobileActionBar = () => {
  const { lang } = useAppContext();
  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] bg-white dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800 p-3 pb-6 lg:hidden flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] print:hidden">
       <a href="tel:+971564747455" className="flex-1 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
         <Phone size={20} className="text-brand-purple" />
         {lang === 'ar' ? 'اتصال (UAE)' : 'Call (UAE)'}
       </a>
       <a href="https://wa.me/96871666671" target="_blank" rel="noreferrer" className="flex-1 bg-brand-purple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-brand-purple/20">
         <MessageCircle size={20} />
         {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
       </a>
    </div>
  );
};

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { lang, toggleLang, isDark, toggleTheme } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <ScrollProgress />
      
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center z-50">
            <Logo className="scale-75 md:scale-90 origin-left rtl:origin-right" />
          </Link>

          {/* Hidden on tablet/mobile (lg and below), visible on desktop (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-200 dark:border-gray-700/50">
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.id}
                 to={link.path}
                 className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.path ? 'text-brand-purple dark:text-brand-gold' : 'text-gray-600 dark:text-gray-300 hover:text-brand-purple'}`}
               >
                 {pathname === link.path && (
                   <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                 )}
                 {link.label[lang]}
               </Link>
             ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Globe size={16} /> {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <Link to="/contact" className="px-6 py-2.5 bg-brand-purple text-white rounded-full font-bold hover:bg-brand-purple/90 transition-all shadow-lg shadow-brand-purple/20 active:scale-95">
              {lang === 'ar' ? 'اطلب عرض سعر' : 'Get a Quote'}
            </Link>
          </div>

          {/* Hamburger for Tablet/Mobile */}
          <button className="lg:hidden z-50 p-2 text-gray-800 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-[#0B0F19] border-b border-gray-200 dark:border-gray-800 shadow-2xl lg:hidden flex flex-col p-4 gap-2"
            >
               {NAV_LINKS.map((link) => (
                 <Link key={link.id} to={link.path} onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl font-bold text-lg ${pathname === link.path ? 'bg-brand-purple/10 text-brand-purple dark:text-brand-gold' : 'text-gray-700 dark:text-gray-300'}`}>
                   {link.label[lang]}
                 </Link>
               ))}
               <div className="flex gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <button onClick={toggleLang} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold flex justify-center items-center gap-2">
                   <Globe size={18} /> {lang === 'en' ? 'العربية' : 'English'}
                 </button>
                 <button onClick={toggleTheme} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold text-xl">
                   {isDark ? '☀️' : '🌙'}
                 </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      <footer className="bg-white dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800 pt-20 pb-24 lg:pb-10 relative overflow-hidden">
         {/* Updated Grid for Tablets: grid-cols-1 on mobile, grid-cols-2 on tablet (md), grid-cols-4 on desktop (lg) */}
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
           <div className="col-span-1">
             <Logo className="mb-6" />
             <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
               {lang === 'ar' 
                ? 'شركة إماراتية رائدة في الحلول الرقمية، نعمل بشغف لتمكين الشركات في دبي، البريمي، وكل الخليج.' 
                : 'A leading UAE digital solutions agency, passionately empowering businesses in Dubai, Al Buraimi, and the GCC.'}
             </p>
             <a href="/EchoWeb-Profile-2025.pdf" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple dark:text-brand-gold border border-brand-purple/20 dark:border-brand-gold/20 px-4 py-2 rounded-lg hover:bg-brand-purple/5 transition-colors">
                <Download size={16} />
                {lang === 'ar' ? 'تحميل البروفايل' : 'Download Profile'}
             </a>
           </div>
           
           <div>
             <h4 className="font-bold text-lg mb-6 dark:text-white font-heading">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
             <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/services" className="hover:text-brand-purple transition-colors">{lang === 'ar' ? 'خدماتنا' : 'Our Services'}</Link></li>
                <li><Link to="/portfolio" className="hover:text-brand-purple transition-colors">{lang === 'ar' ? 'أعمالنا' : 'Portfolio'}</Link></li>
                <li><Link to="/store" className="hover:text-brand-purple transition-colors">{lang === 'ar' ? 'باقات الأسعار' : 'Pricing Packages'}</Link></li>
                <li><Link to="/contact" className="hover:text-brand-purple transition-colors">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</Link></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-lg mb-6 dark:text-white font-heading">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h4>
             <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-purple shrink-0" />
                  <span dir="ltr">+971 56 474 7455</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-purple shrink-0" />
                  <span dir="ltr">+968 7166 6671</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-purple shrink-0" />
                  <span>admin@eweb.ae</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-brand-purple shrink-0" />
                  <span>{lang === 'ar' ? 'دبي، الإمارات & البريمي، عمان' : 'Dubai, UAE & Al Buraimi, Oman'}</span>
                </li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-lg mb-6 dark:text-white font-heading">{lang === 'ar' ? 'اشترك في نشرتنا' : 'Newsletter'}</h4>
             <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-lg flex border border-gray-200 dark:border-gray-700 focus-within:border-brand-purple transition-colors">
               <input type="email" placeholder="Email..." className="bg-transparent px-3 w-full outline-none text-sm dark:text-white" />
               <button className="bg-brand-purple text-white p-2 rounded-md hover:bg-brand-purple/90"><ArrowRight size={18} /></button>
             </div>
             <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">X</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">In</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all">Ig</a>
             </div>
           </div>
         </div>
         <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
            &copy; 2025 Echo Web Technologies. All rights reserved.
         </div>
      </footer>
      
      <MobileActionBar />
    </div>
  );
};
