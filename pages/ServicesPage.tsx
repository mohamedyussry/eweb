
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, ShoppingBag, Smartphone, BarChart3, CheckCircle, ArrowRight, MessageSquare, Briefcase, Code2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SERVICES } from '../constants';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';

export const ServicesPage = () => {
    const { lang } = useAppContext();
    
    // Additional features data for the cards (for display purposes)
    const featuresMap: Record<string, { ar: string[], en: string[] }> = {
        web: {
            ar: ['تصميم متجاوب', 'لوحة تحكم سهلة', 'حماية SSL', 'تهيئة SEO'],
            en: ['Responsive Design', 'Easy CMS', 'SSL Security', 'SEO Setup']
        },
        ecommerce: {
            ar: ['بوابات دفع آمنة', 'إدارة مخزون', 'تعدد العملات', 'تقارير مبيعات'],
            en: ['Secure Payments', 'Inventory Mgmt', 'Multi-currency', 'Sales Reports']
        },
        apps: {
            ar: ['iOS & Android', 'واجهة سهلة', 'إشعارات فورية', 'لوحة تحكم'],
            en: ['iOS & Android', 'Smooth UI/UX', 'Push Notif.', 'Admin Panel']
        },
        marketing: {
            ar: ['إدارة حملات', 'زيادة المتابعين', 'تحليل منافسين', 'تقارير شهرية'],
            en: ['Campaign Mgmt', 'Grow Followers', 'Competitor Analysis', 'Monthly Reports']
        }
    };

    return (
        <PageTransition>
            <SEO 
                title={lang === 'ar' ? 'خدماتنا' : 'Services'} 
                description={lang === 'ar' ? 'نقدم حلول برمجية متكاملة تشمل تصميم المواقع، التطبيقات، والتسويق.' : 'We provide integrated software solutions including web design, apps, and marketing.'} 
            />
            
            {/* Hero Section */}
            <div className="relative bg-brand-purple text-white py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black font-heading mb-4"
                    >
                        {lang === 'ar' ? 'حلول رقمية متكاملة' : 'Comprehensive Digital Solutions'}
                    </motion.h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">
                        {lang === 'ar' ? 'كل ما تحتاجه لبناء حضور رقمي قوي واحترافي في مكان واحد' : 'Everything you need to build a strong, professional digital presence in one place'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 md:py-20 -mt-10 md:-mt-16 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {SERVICES.map((service, idx) => (
                        <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:border-brand-purple hover:-translate-y-2 transition-all duration-300 flex flex-col"
                        >
                            <div className="w-16 h-16 bg-brand-purple/5 text-brand-purple rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                {service.icon === 'Monitor' && <Laptop size={32} strokeWidth={1.5} />}
                                {service.icon === 'ShoppingCart' && <ShoppingBag size={32} strokeWidth={1.5} />}
                                {service.icon === 'Smartphone' && <Smartphone size={32} strokeWidth={1.5} />}
                                {service.icon === 'BarChart' && <BarChart3 size={32} strokeWidth={1.5} />}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 dark:text-white font-heading">{service.title[lang]}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 min-h-[60px]">{service.description[lang]}</p>
                            
                            <div className="space-y-3 mb-8 flex-grow">
                                {featuresMap[service.id]?.[lang].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <CheckCircle size={16} className="text-brand-gold shrink-0" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <Link 
                                to={service.id === 'ecommerce' || service.id === 'web' ? '/store' : '/contact'} 
                                className="w-full py-3 bg-gray-50 dark:bg-gray-800 text-brand-purple dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-purple hover:text-white transition-all group"
                            >
                                {service.id === 'ecommerce' || service.id === 'web' 
                                    ? (lang === 'ar' ? 'شاهد الباقات' : 'View Packages')
                                    : (lang === 'ar' ? 'اطلب عرض سعر' : 'Request Quote')
                                }
                                <ArrowRight size={18} className="rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* How We Work Section */}
            <div className="bg-gray-50 dark:bg-black/20 py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <SectionTitle title={lang === 'ar' ? 'كيف نعمل؟' : 'How We Work?'} subtitle={lang === 'ar' ? 'خطوات بسيطة لنجاحك' : 'Simple Steps to Success'} />
                    
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {[
                                { icon: MessageSquare, title: { ar: 'تواصل معنا', en: 'Contact Us' }, desc: { ar: 'اشرح فكرتك ومتطلباتك', en: 'Explain your idea & needs' } },
                                { icon: Briefcase, title: { ar: 'خطة وعرض', en: 'Plan & Offer' }, desc: { ar: 'نحلل ونقدم أفضل الحلول', en: 'We analyze & offer best solutions' } },
                                { icon: Code2, title: { ar: 'التنفيذ', en: 'Execution' }, desc: { ar: 'تصميم وبرمجة بأعلى جودة', en: 'High quality design & code' } },
                                { icon: CheckCircle, title: { ar: 'التسليم والدعم', en: 'Launch & Support' }, desc: { ar: 'إطلاق المشروع مع ضمان فني', en: 'Project launch with support' } },
                            ].map((step, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 text-center relative group hover:-translate-y-2 transition-transform">
                                    <div className="w-16 h-16 mx-auto bg-brand-purple text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold shadow-lg shadow-brand-purple/30 relative z-10">
                                        <step.icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 dark:text-white">{step.title[lang]}</h4>
                                    <p className="text-gray-500 text-sm">{step.desc[lang]}</p>
                                    
                                    <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 dark:text-gray-800 -z-10 select-none opacity-50">0{idx + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="container mx-auto px-6 py-16 md:py-20">
                <div className="bg-gradient-to-r from-brand-purple to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">{lang === 'ar' ? 'هل لديك متطلبات خاصة؟' : 'Have Custom Requirements?'}</h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                            {lang === 'ar' ? 'فريقنا مستعد لتنفيذ الأنظمة المعقدة والحلول المخصصة لشركتك.' : 'Our team is ready to build complex systems and custom solutions for your business.'}
                        </p>
                        <Link to="/contact" className="px-10 py-4 bg-white text-brand-purple rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-xl">
                            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                            <ArrowRight size={20} className="rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};