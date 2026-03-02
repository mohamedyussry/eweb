
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';
import { PartnersSection } from '../components/PartnersSection';

export const AboutPage = () => {
    const { lang } = useAppContext();
    return (
        <PageTransition>
            <SEO 
                title={lang === 'ar' ? 'من نحن' : 'About Us'} 
                description={lang === 'ar' ? 'تعرف على Echo Web، رؤيتنا وفريقنا.' : 'Learn about Echo Web, our vision and team.'} 
            />
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <SectionTitle title={lang === 'ar' ? 'من نحن' : 'About Us'} subtitle="Echo Web" centered={false} />
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {lang === 'ar' 
                            ? 'نحن شركة Echo Web، شركة تقنية رائدة مرخصة في الإمارات العربية المتحدة وسلطنة عمان. نجمع بين الإبداع في التصميم والدقة في البرمجة لنقدم حلولاً رقمية تليق بطموحات عملائنا.' 
                            : 'We are Echo Web, a leading tech company licensed in UAE and Oman. We combine creative design with precise coding to deliver digital solutions that match our clients ambitions.'}
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                                <div className="text-3xl font-bold text-brand-purple mb-1">+5</div>
                                <div className="text-sm text-gray-500">{lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                                <div className="text-3xl font-bold text-brand-gold mb-1">+200</div>
                                <div className="text-sm text-gray-500">{lang === 'ar' ? 'مشروع منجز' : 'Projects Done'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Team" className="rounded-3xl shadow-2xl" />
                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                            <p className="text-sm font-medium italic text-gray-600 dark:text-gray-400">
                                "{lang === 'ar' ? 'نجاح عميلنا هو نجاحنا الحقيقي.' : 'Our client success is our real success.'}"
                            </p>
                        </div>
                    </div>
                </div>
                
                <PartnersSection />
            </div>
        </PageTransition>
    );
}
