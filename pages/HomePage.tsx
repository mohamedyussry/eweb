
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle, BarChart3, Code2, Laptop, ShoppingBag, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SERVICES } from '../constants';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';
import { PartnersSection } from '../components/PartnersSection';

export const HomePage = () => {
  const { lang } = useAppContext();
  return (
    <PageTransition>
      <SEO 
        title={lang === 'ar' ? 'الرئيسية' : 'Home'} 
        description={lang === 'ar' ? 'أفضل شركة تصميم مواقع وتطبيقات في الإمارات وعمان' : 'Top Web Design & App Development Company in UAE & Oman'} 
      />
      
      <section className="relative min-h-[auto] py-16 md:py-24 lg:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-purple/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow"></div>
           <div className="absolute bottom-0 -left-20 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-gold/10 rounded-full blur-[60px] md:blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
             initial={{ opacity: 0, x: -50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ duration: 0.8 }}
             className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple dark:text-brand-gold font-bold text-xs md:text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {lang === 'ar' ? 'متاحين لمشاريع جديدة' : 'Available for new projects'}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-tight text-gray-900 dark:text-white">
              {lang === 'ar' ? (
                <>نحول أفكارك إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-gold">واقع رقمي</span></>
              ) : (
                <>Turning Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-gold">Digital Reality</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              {lang === 'ar' 
               ? 'شريكك التقني الموثوق في الإمارات وعمان. تصميم مواقع، تطبيقات، وتسويق يضمن لك النمو.' 
               : 'Your trusted tech partner in UAE & Oman. Web design, apps, and marketing that guarantees growth.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculator" className="w-full sm:w-auto px-8 py-4 bg-brand-purple text-white rounded-2xl font-bold hover:bg-brand-purple/90 hover:scale-105 transition-all shadow-xl shadow-brand-purple/20 flex items-center justify-center gap-2 group">
                 {lang === 'ar' ? 'احسب تكلفة مشروعك' : 'Estimate Project Cost'}
                 <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
              <a href="https://wa.me/96871666671" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl font-bold hover:border-brand-purple hover:text-brand-purple transition-all flex items-center justify-center gap-2">
                 <MessageCircle size={20} />
                 {lang === 'ar' ? 'دردشة واتساب' : 'WhatsApp Chat'}
              </a>
            </div>

            <div className="pt-6 md:pt-8 flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium text-gray-400 border-t border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-gold" /> {lang === 'ar' ? 'مرخص رسمياً' : 'Officially Licensed'}</div>
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-gold" /> {lang === 'ar' ? 'دعم 24/7' : '24/7 Support'}</div>
               <div className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-gold" /> {lang === 'ar' ? '+200 عميل' : '+200 Clients'}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
             <div className="relative z-10 bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-white/20 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Dashboard" className="rounded-xl shadow-lg" />
                <motion.div 
                   animate={{ y: [0, -10, 0] }} 
                   transition={{ repeat: Infinity, duration: 4 }}
                   className="absolute -top-10 -right-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                   <div className="bg-green-100 text-green-600 p-2 rounded-full"><BarChart3 size={24}/></div>
                   <div>
                      <div className="text-xs text-gray-400">Sales Growth</div>
                      <div className="font-bold text-lg">+145% 🚀</div>
                   </div>
                </motion.div>
                <motion.div 
                   animate={{ y: [0, 10, 0] }} 
                   transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                   className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                   <div className="bg-brand-purple/10 text-brand-purple p-2 rounded-full"><Code2 size={24}/></div>
                   <div>
                      <div className="text-xs text-gray-400">Clean Code</div>
                      <div className="font-bold text-lg">100% Secure</div>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      <PartnersSection />

      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#0B0F19]">
         <div className="container mx-auto px-6">
            <SectionTitle title={lang === 'ar' ? 'خدماتنا' : 'Our Services'} subtitle={lang === 'ar' ? 'ماذا نقدم؟' : 'What We Do?'} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {SERVICES.map((service, idx) => (
                 <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-brand-purple/30 transition-all hover:shadow-2xl hover:shadow-brand-purple/5 overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <img src={`https://ui-avatars.com/api/?name=${service.id}&background=random`} className="w-24 h-24 rounded-full blur-xl" alt="" />
                    </div>
                    <div className="w-14 h-14 bg-brand-purple/5 text-brand-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                       {service.icon === 'Monitor' && <Laptop size={28} />}
                       {service.icon === 'ShoppingCart' && <ShoppingBag size={28} />}
                       {service.icon === 'Smartphone' && <Smartphone size={28} />}
                       {service.icon === 'BarChart' && <BarChart3 size={28} />}
                    </div>
                    <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title[lang]}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description[lang]}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
    </PageTransition>
  );
};
