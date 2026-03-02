
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
       <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
            style={{ 
                backgroundImage: 'radial-gradient(#4a148c 1px, transparent 1px)', 
                backgroundSize: '24px 24px' 
            }}
       ></div>
    </div>
  );
};

export const SEO = ({ title, description }: { title: string, description: string }) => {
  const { lang } = useAppContext();

  useEffect(() => {
    const appTitle = lang === 'ar' ? 'Echo Web | شريكك في النجاح الرقمي' : 'Echo Web | Your Digital Success Partner';
    const fullTitle = title ? `${title} | Echo Web` : appTitle;
    document.title = fullTitle;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) element.setAttribute('property', name);
        else element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('twitter:title', fullTitle, false);
    setMetaTag('twitter:description', description, false);

  }, [title, description, lang]);

  return null;
};

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-brand-gold origin-left z-[1000]"
      style={{ scaleX }}
    />
  );
};

export const PageTransition = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export const Logo = ({ className = "" }: { className?: string }) => {
  const { isDark } = useAppContext();
  return (
    <div className={`relative flex items-center select-none ${className} rtl:flex-row-reverse group`}>
       <div className="relative flex items-baseline leading-none">
          <div className={`absolute top-[55%] left-0 w-[68%] h-3 md:h-4 -translate-y-1/2 ${isDark ? 'bg-white/10' : 'bg-[#dcdcdc]'} -z-10 transition-all group-hover:w-full group-hover:bg-brand-gold/20`}></div>
          <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-brand-purple font-sans pb-1" style={{ fontFamily: '"Cairo", sans-serif' }}>ewe</span>
          <span className="text-4xl md:text-5xl lg:text-6xl font-normal text-brand-gold font-serif -ml-1 transform translate-y-1" style={{ fontFamily: '"Times New Roman", serif' }}>b</span>
       </div>
       <span className={`text-xl md:text-2xl font-bold font-sans tracking-tight self-end mb-1.5 ml-0.5 ${isDark ? 'text-white' : 'text-brand-purple'}`}>.ae</span>
    </div>
  );
};

export const SectionTitle = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-start'} relative z-10`}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-2 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold text-brand-purple dark:text-white font-heading leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`h-1.5 bg-gradient-to-r from-brand-purple to-brand-gold mt-4 rounded-full ${centered ? 'mx-auto' : ''}`}
    />
  </div>
);
