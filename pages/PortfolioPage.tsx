
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PROJECTS } from '../constants';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';

export const PortfolioPage = () => {
  const { lang } = useAppContext();
  const [filter, setFilter] = useState('all');
  const categories = [
    { id: 'all', label: { ar: 'الكل', en: 'All' } },
    { id: 'corporate', label: { ar: 'شركات', en: 'Corporate' } },
    { id: 'apps', label: { ar: 'تطبيقات', en: 'Apps' } },
    { id: 'ecommerce', label: { ar: 'متاجر', en: 'E-Commerce' } }
  ];

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <PageTransition>
       <SEO 
         title={lang === 'ar' ? 'أعمالنا' : 'Portfolio'} 
         description={lang === 'ar' ? 'شاهد مشاريعنا الناجحة في الإمارات وعمان.' : 'View our successful projects in UAE and Oman.'} 
       />
       <div className="container mx-auto px-6 py-16">
          <SectionTitle title={lang === 'ar' ? 'معرض الأعمال' : 'Our Portfolio'} subtitle={lang === 'ar' ? 'نجاحات نفتخر بها' : 'Success Stories'} />
          
          <div className="flex gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-bold transition-colors ${filter === cat.id ? 'bg-brand-purple text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredProjects.map((project) => (
               <motion.div 
                 layout
                 key={project.id}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-brand-purple/50 transition-all hover:shadow-2xl"
               >
                 <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={project.title[lang]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button className="w-12 h-12 bg-white text-brand-purple rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Eye size={20}/></button>
                       <button className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"><ExternalLink size={20}/></button>
                    </div>
                 </div>
                 <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{project.title[lang]}</h3>
                    <p className="text-gray-500 text-sm mb-4">{project.description[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                       {project.technologies.map(tech => (
                         <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-bold rounded-md text-gray-600 dark:text-gray-400">{tech}</span>
                       ))}
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
          
          <div className="mt-20 bg-gray-900 dark:bg-brand-purple rounded-3xl p-10 text-center text-white">
             <h3 className="text-2xl md:text-3xl font-bold mb-4">{lang === 'ar' ? 'جاهز لبدء قصة نجاحك؟' : 'Ready to start your success story?'}</h3>
             <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{lang === 'ar' ? 'دعنا نساعدك في بناء مشروعك الرقمي القادم بأعلى المعايير.' : 'Let us help you build your next digital project with the highest standards.'}</p>
             <Link to="/contact" className="px-8 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-block">
                {lang === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
             </Link>
          </div>
       </div>
    </PageTransition>
  );
};
