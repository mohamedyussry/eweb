
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PARTNERS } from '../constants';

export const PartnersSection = () => {
    const { lang } = useAppContext();
    return (
        <div className="py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 overflow-hidden">
             <div className="container mx-auto px-4 sm:px-6">
                <div className="relative overflow-hidden p-2 md:p-4">
                    
                    <div className="text-center mb-10 md:mb-16 relative z-10">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white font-heading mb-3 md:mb-4">
                            {lang === 'ar' ? 'نفخر بثقة شركائنا' : 'Trusted By Our Partners'}
                        </h3>
                        <p className="text-gray-500 font-medium text-base md:text-lg max-w-2xl mx-auto px-4">
                            {lang === 'ar' ? 'نجاحات مشتركة في الإمارات وسلطنة عمان' : 'Joint successes in UAE and Oman'}
                        </p>
                        <div className="h-1.5 w-16 md:w-24 bg-gradient-to-r from-brand-purple to-brand-gold mx-auto mt-4 md:mt-6 rounded-full opacity-80" />
                    </div>
                    
                    {/* Marquee Container */}
                    <div className="relative w-full overflow-hidden" dir="ltr">
                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
                        
                        <div className="flex py-4 md:py-6">
                             {/* First Set */}
                             <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 lg:gap-20 px-4">
                                {PARTNERS.map((partner, index) => (
                                    <div key={`p1-${index}`} className="flex flex-col items-center justify-center group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                                        <div className="h-16 w-28 md:h-20 md:w-36 lg:h-24 lg:w-40 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                            <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                                        </div>
                                    </div>
                                ))}
                             </div>
                             {/* Duplicate Set for Seamless Loop */}
                             <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 lg:gap-20 px-4">
                                {PARTNERS.map((partner, index) => (
                                    <div key={`p2-${index}`} className="flex flex-col items-center justify-center group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                                        <div className="h-16 w-28 md:h-20 md:w-36 lg:h-24 lg:w-40 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                            <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
