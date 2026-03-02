
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SEO, PageTransition } from '../components/Shared';
import { CalculatorSection } from '../components/CalculatorSection';

export const CalculatorPage = () => {
    const { lang } = useAppContext();
    return (
        <PageTransition>
            <SEO 
                title={lang === 'ar' ? 'حاسبة التكلفة' : 'Cost Estimator'} 
                description={lang === 'ar' ? 'احسب تكلفة مشروعك البرمجي بدقة وسهولة.' : 'Calculate your software project cost accurately and easily.'} 
            />
            <div className="pt-10 min-h-screen bg-gray-50 dark:bg-[#0B0F19]">
                <CalculatorSection />
            </div>
        </PageTransition>
    );
};
