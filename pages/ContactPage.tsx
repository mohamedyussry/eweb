
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';

export const ContactPage = () => {
    const { lang } = useAppContext();
    return (
        <PageTransition>
            <SEO 
                title={lang === 'ar' ? 'اتصل بنا' : 'Contact Us'} 
                description={lang === 'ar' ? 'تواصل معنا لبدء مشروعك الرقمي.' : 'Contact us to start your digital project.'} 
            />
            <div className="container mx-auto px-6 py-16">
                <SectionTitle title={lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'} subtitle={lang === 'ar' ? 'نحن هنا لمساعدتك' : 'We are here to help'} />
                
                <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                                    <input type="tel" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                                <input type="email" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">{lang === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}</label>
                                <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple transition-all"></textarea>
                            </div>
                            <button className="w-full py-4 bg-brand-purple text-white rounded-xl font-bold hover:bg-brand-purple/90 transition-all shadow-lg shadow-brand-purple/20">
                                {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 md:p-12 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-bold mb-4 dark:text-white">{lang === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}</h4>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                    <a href="tel:+971564747455" className="flex items-center gap-3 hover:text-brand-purple transition-colors"><Phone size={20}/> +971 56 474 7455 (UAE)</a>
                                    <a href="tel:+96871666671" className="flex items-center gap-3 hover:text-brand-purple transition-colors"><Phone size={20}/> +968 7166 6671 (Oman)</a>
                                    <a href="mailto:admin@eweb.ae" className="flex items-center gap-3 hover:text-brand-purple transition-colors"><Mail size={20}/> admin@eweb.ae</a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-4 dark:text-white">{lang === 'ar' ? 'مواقعنا' : 'Locations'}</h4>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={20} className="mt-1 text-brand-purple"/>
                                        <div>
                                            <strong className="block text-gray-900 dark:text-white">Dubai, UAE</strong>
                                            Business Bay, Ubora Tower
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={20} className="mt-1 text-brand-gold"/>
                                        <div>
                                            <strong className="block text-gray-900 dark:text-white">Al Buraimi, Oman</strong>
                                            Main Street, Opp. Lulu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                             <p className="text-sm text-gray-500">Licensed in UAE & Oman.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
