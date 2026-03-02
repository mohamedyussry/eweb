
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, ShoppingBag, Smartphone, LayoutTemplate, Globe2, CreditCard, Search, MessageSquare, Layers, Zap, CheckCircle, Check, RefreshCw, ChevronRight, ChevronLeft, Clock, Share2, Palette, Newspaper, Layout } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const CalculatorSection = () => {
    const { lang } = useAppContext();
    const [step, setStep] = useState(1);
    
    // Core Selection State
    const [projectType, setProjectType] = useState('corporate');
    
    // Dynamic Scope State
    // Corporate Specific
    const [pageCount, setPageCount] = useState(5); 
    const [corpDesign, setCorpDesign] = useState<'template' | 'custom'>('template');
    const [hasBlog, setHasBlog] = useState(false);

    // E-commerce Specific
    const [productCount, setProductCount] = useState(50); 
    
    // Apps Specific
    const [platforms, setPlatforms] = useState<{android: boolean, ios: boolean}>({ android: true, ios: false }); 
    
    const [addons, setAddons] = useState<string[]>([]);

    const types = [
        { id: 'corporate', label: { ar: 'موقع تعريفي', en: 'Corporate Site' }, icon: Laptop },
        { id: 'ecommerce', label: { ar: 'متجر إلكتروني', en: 'E-Commerce' }, icon: ShoppingBag },
        { id: 'app', label: { ar: 'تطبيق هاتف', en: 'Mobile App' }, icon: Smartphone },
        { id: 'custom', label: { ar: 'نظام مخصص', en: 'Custom System' }, icon: LayoutTemplate },
    ];

    const extras = [
        { id: 'lang', label: { ar: 'متعدد اللغات', en: 'Multi-language' }, price: 1500, time: 5, icon: Globe2 },
        { id: 'payment', label: { ar: 'بوابة دفع', en: 'Payment Gateway' }, price: 1000, time: 3, icon: CreditCard },
        { id: 'seo', label: { ar: 'SEO احترافي', en: 'SEO Pro Pack' }, price: 1500, time: 7, icon: Search },
        { id: 'chat', label: { ar: 'مساعد ذكي', en: 'AI Chatbot' }, price: 2500, time: 5, icon: MessageSquare },
        { id: 'content', label: { ar: 'كتابة محتوى', en: 'Content Writing' }, price: 800, time: 4, icon: Layers },
        { id: 'speed', label: { ar: 'حماية وتسريع', en: 'Speed & Security' }, price: 1200, time: 2, icon: Zap },
    ];

    const toggleAddon = (id: string) => {
        setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const togglePlatform = (p: 'android' | 'ios') => {
        setPlatforms(prev => {
            const newState = { ...prev, [p]: !prev[p] };
            // Prevent unselecting both
            if (!newState.android && !newState.ios) return prev;
            return newState;
        });
    };

    // --- Calculation Logic ---
    const calculation = useMemo(() => {
        let basePrice = 0;
        let baseDays = 0;

        // 1. Base Cost & Time based on Type & Scope
        if (projectType === 'corporate') {
            const designCost = corpDesign === 'custom' ? 2500 : 0;
            const designDays = corpDesign === 'custom' ? 10 : 0;
            const blogCost = hasBlog ? 1200 : 0;
            const blogDays = hasBlog ? 3 : 0;

            basePrice = 2500 + designCost + blogCost + (pageCount * 150); // Base + Design + Blog + 150 AED per page
            baseDays = 7 + designDays + blogDays + Math.ceil(pageCount * 0.5); 
        } else if (projectType === 'ecommerce') {
            basePrice = 4000 + (productCount * 5); // Base + 5 AED per product setup
            baseDays = 15 + Math.ceil(productCount / 20); // 15 days + 1 day per 20 products
        } else if (projectType === 'app') {
            const androidCost = platforms.android ? 4000 : 0;
            const iosCost = platforms.ios ? 4500 : 0;
            basePrice = 2000 + androidCost + iosCost; // 2000 Setup fee + platforms
            baseDays = 20 + (platforms.android ? 10 : 0) + (platforms.ios ? 10 : 0);
        } else {
            // Custom
            basePrice = 6000;
            baseDays = 30;
        }

        // 2. Add-ons Cost & Time
        const addonTotal = extras.filter(e => addons.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
        const addonDays = extras.filter(e => addons.includes(e.id)).reduce((sum, e) => sum + e.time, 0);

        const totalPrice = basePrice + addonTotal;
        const totalDays = baseDays + addonDays;

        // Format Weeks
        const minWeeks = Math.floor(totalDays / 7);
        const maxWeeks = Math.ceil(totalDays / 7) + 1; // Buffer

        return { price: totalPrice, days: totalDays, range: `${Math.max(1, minWeeks)}-${maxWeeks}` };
    }, [projectType, pageCount, corpDesign, hasBlog, productCount, platforms, addons]);

    // --- WhatsApp Message Generator ---
    const sendToWhatsApp = () => {
        const typeLabel = types.find(t => t.id === projectType)?.label[lang === 'ar' ? 'ar' : 'en'];
        let details = '';
        
        if (projectType === 'corporate') {
            const designStr = corpDesign === 'custom' ? (lang === 'ar' ? 'تصميم خاص' : 'Custom Design') : (lang === 'ar' ? 'قالب جاهز' : 'Template');
            const blogStr = hasBlog ? (lang === 'ar' ? '، مدونة/أخبار' : ', Blog/News') : '';
            details = `${pageCount} Pages (${designStr}${blogStr})`;
        }
        if (projectType === 'ecommerce') details = `${productCount} Products`;
        if (projectType === 'app') details = `${platforms.android ? 'Android ' : ''}${platforms.ios ? 'iOS' : ''}`;
        
        const addonList = extras.filter(e => addons.includes(e.id)).map(e => e.label[lang === 'ar' ? 'ar' : 'en']).join(', ');
        
        const text = lang === 'ar' 
            ? `مرحباً Echo Web،\nأرغب في عرض سعر لمشروع:\n*${typeLabel}*\nالتفاصيل: ${details}\nالإضافات: ${addonList || 'لا يوجد'}\n\nالسعر التقديري: ${calculation.price} AED\nالمدة التقديرية: ${calculation.range} أسابيع`
            : `Hi Echo Web,\nI need a quote for:\n*${typeLabel}*\nScope: ${details}\nAdd-ons: ${addonList || 'None'}\n\nEst. Price: ${calculation.price} AED\nEst. Time: ${calculation.range} Weeks`;

        const url = `https://wa.me/96871666671?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const restart = () => { 
        setStep(1); 
        setAddons([]); 
        setProjectType('corporate'); 
        setPageCount(5); 
        setCorpDesign('template');
        setHasBlog(false);
        setProductCount(50); 
        setPlatforms({android: true, ios: false}); 
    };

    return (
        <section className="py-16 md:py-20 relative overflow-hidden bg-gray-50 dark:bg-[#0B0F19]" id="calculator">
             <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
                <div className="text-center mb-10">
                    <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-2 block">{lang === 'ar' ? 'خطط لميزانيتك' : 'Plan Your Budget'}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-purple dark:text-white font-heading mb-4">{lang === 'ar' ? 'حاسبة التكلفة الذكية' : 'Smart Cost Estimator'}</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">{lang === 'ar' ? 'احصل على تقدير فوري للتكلفة والوقت المتوقع لمشروعك.' : 'Get an instant estimate for your project cost and timeline.'}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col min-h-[600px]">
                    {/* Progress Bar */}
                    <div className="bg-gray-100 dark:bg-gray-800 h-2 w-full relative">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-purple to-brand-gold"
                            initial={{ width: '33%' }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    
                    <div className="p-4 md:p-10 flex-grow flex flex-col">
                         {/* Header of Step */}
                         <div className="flex justify-between items-center mb-8">
                             <h3 className="text-xl md:text-2xl font-bold dark:text-white flex items-center gap-3">
                                <span className="bg-brand-purple text-white w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 shadow-lg shadow-brand-purple/20">{step}</span>
                                <span>
                                    {step === 1 && (lang === 'ar' ? 'اختر نوع المشروع' : 'Select Project Type')}
                                    {step === 2 && (lang === 'ar' ? 'تخصيص المواصفات' : 'Customize Scope')}
                                    {step === 3 && (lang === 'ar' ? 'النتيجة والعرض' : 'Summary & Quote')}
                                </span>
                             </h3>
                             {step === 3 && (
                                 <button onClick={restart} className="text-gray-400 hover:text-brand-purple transition-colors flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                     <RefreshCw size={16} /> {lang === 'ar' ? 'بدء من جديد' : 'Reset'}
                                 </button>
                             )}
                         </div>

                         {/* Content */}
                         <div className="flex-grow">
                             <AnimatePresence mode="wait">
                                {/* STEP 1: TYPE SELECTION */}
                                {step === 1 && (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                                    >
                                        {types.map((t) => (
                                            <button 
                                                key={t.id}
                                                onClick={() => setProjectType(t.id)}
                                                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center gap-6 h-full ${projectType === t.id ? 'border-brand-purple bg-brand-purple/5 dark:bg-brand-purple/10 ring-2 ring-brand-purple/20' : 'border-gray-100 dark:border-gray-800 hover:border-brand-purple/30 bg-gray-50 dark:bg-gray-800/50'}`}
                                            >
                                                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors shadow-lg ${projectType === t.id ? 'bg-brand-purple text-white' : 'bg-white dark:bg-gray-700 text-gray-400'}`}>
                                                    <t.icon size={36} strokeWidth={1.5} />
                                                </div>
                                                <div className="font-bold text-lg dark:text-white">{t.label[lang]}</div>
                                                {projectType === t.id && <div className="absolute top-4 right-4 text-brand-purple"><CheckCircle size={22} fill="currentColor" className="text-white" /></div>}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                {/* STEP 2: SCOPE & ADDONS */}
                                {step === 2 && (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        {/* Dynamic Scope Section */}
                                        <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                            <h4 className="font-bold text-lg mb-6 dark:text-white flex items-center gap-2">
                                                <LayoutTemplate size={20} className="text-brand-purple" />
                                                {lang === 'ar' ? 'حجم ونطاق العمل' : 'Project Scope'}
                                            </h4>

                                            {projectType === 'corporate' && (
                                                <div className="space-y-6">
                                                    {/* Page Count Slider */}
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between font-medium dark:text-gray-300">
                                                            <label>{lang === 'ar' ? 'عدد الصفحات' : 'Number of Pages'}</label>
                                                            <span className="text-brand-purple font-bold">{pageCount}</span>
                                                        </div>
                                                        <input 
                                                            type="range" min="1" max="50" value={pageCount} 
                                                            onChange={(e) => setPageCount(parseInt(e.target.value))}
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-400">
                                                            <span>1 {lang === 'ar' ? 'صفحة' : 'Page'}</span>
                                                            <span>50+ {lang === 'ar' ? 'صفحة' : 'Pages'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

                                                    {/* Design Type */}
                                                    <div>
                                                        <label className="block text-sm font-medium mb-3 dark:text-gray-300">{lang === 'ar' ? 'نوع التصميم' : 'Design Style'}</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <button 
                                                                onClick={() => setCorpDesign('template')}
                                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${corpDesign === 'template' ? 'border-brand-purple bg-white dark:bg-gray-800 shadow-md ring-1 ring-brand-purple' : 'border-gray-200 dark:border-gray-700 bg-transparent text-gray-500'}`}
                                                            >
                                                                <div className={`p-2 rounded-lg ${corpDesign === 'template' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                                                    <Layout size={20} />
                                                                </div>
                                                                <div className="text-start">
                                                                    <div className={`font-bold text-sm ${corpDesign === 'template' ? 'text-brand-purple dark:text-white' : ''}`}>
                                                                        {lang === 'ar' ? 'قالب جاهز' : 'Ready Template'}
                                                                    </div>
                                                                    <div className="text-xs opacity-70 mt-0.5">{lang === 'ar' ? 'تكلفة أقل، سرعة تنفيذ' : 'Lower cost, faster delivery'}</div>
                                                                </div>
                                                                {corpDesign === 'template' && <CheckCircle size={18} className="text-brand-purple ltr:ml-auto rtl:mr-auto" />}
                                                            </button>

                                                            <button 
                                                                onClick={() => setCorpDesign('custom')}
                                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${corpDesign === 'custom' ? 'border-brand-purple bg-white dark:bg-gray-800 shadow-md ring-1 ring-brand-purple' : 'border-gray-200 dark:border-gray-700 bg-transparent text-gray-500'}`}
                                                            >
                                                                <div className={`p-2 rounded-lg ${corpDesign === 'custom' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                                                    <Palette size={20} />
                                                                </div>
                                                                <div className="text-start">
                                                                    <div className={`font-bold text-sm ${corpDesign === 'custom' ? 'text-brand-purple dark:text-white' : ''}`}>
                                                                        {lang === 'ar' ? 'تصميم خاص (UI/UX)' : 'Custom Design'}
                                                                    </div>
                                                                    <div className="text-xs opacity-70 mt-0.5">{lang === 'ar' ? 'تصميم فريد لهوية شركتك' : 'Unique design for your brand'}</div>
                                                                </div>
                                                                {corpDesign === 'custom' && <CheckCircle size={18} className="text-brand-purple ltr:ml-auto rtl:mr-auto" />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Blog Toggle */}
                                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                                                <Newspaper size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-sm dark:text-white">{lang === 'ar' ? 'قسم الأخبار / المدونة' : 'News / Blog Section'}</div>
                                                                <div className="text-xs text-gray-500">{lang === 'ar' ? 'نظام لإدارة ونشر المقالات' : 'CMS for articles & news'}</div>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => setHasBlog(!hasBlog)}
                                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${hasBlog ? 'bg-brand-purple' : 'bg-gray-300 dark:bg-gray-600'}`}
                                                        >
                                                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${hasBlog ? 'ltr:translate-x-6 rtl:-translate-x-6' : ''}`} />
                                                        </button>
                                                    </div>

                                                </div>
                                            )}

                                            {projectType === 'ecommerce' && (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between font-medium dark:text-gray-300">
                                                        <label>{lang === 'ar' ? 'عدد المنتجات المتوقع' : 'Expected Products'}</label>
                                                        <span className="text-brand-purple font-bold">{productCount}</span>
                                                    </div>
                                                    <input 
                                                        type="range" min="10" max="1000" step="10" value={productCount} 
                                                        onChange={(e) => setProductCount(parseInt(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                                                    />
                                                    <div className="flex justify-between text-xs text-gray-400">
                                                        <span>10</span>
                                                        <span>1000+</span>
                                                    </div>
                                                </div>
                                            )}

                                            {projectType === 'app' && (
                                                <div className="flex gap-4">
                                                    <button 
                                                        onClick={() => togglePlatform('android')}
                                                        className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${platforms.android ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}
                                                    >
                                                        <Smartphone size={20} /> Android
                                                    </button>
                                                    <button 
                                                        onClick={() => togglePlatform('ios')}
                                                        className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${platforms.ios ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}
                                                    >
                                                        <Smartphone size={20} /> iOS (iPhone)
                                                    </button>
                                                </div>
                                            )}

                                            {projectType === 'custom' && (
                                                <p className="text-gray-500 italic text-sm">{lang === 'ar' ? 'للمشاريع الخاصة، سنقوم بمناقشة التفاصيل لاحقاً.' : 'For custom projects, we will discuss requirements in detail.'}</p>
                                            )}
                                        </div>

                                        {/* Addons Grid */}
                                        <div>
                                            <h4 className="font-bold text-lg mb-4 dark:text-white flex items-center gap-2">
                                                <Layers size={20} className="text-brand-purple" />
                                                {lang === 'ar' ? 'ميزات إضافية' : 'Extra Features'}
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                                {extras.map((e) => (
                                                    <button 
                                                        key={e.id}
                                                        onClick={() => toggleAddon(e.id)}
                                                        className={`p-4 rounded-xl border transition-all relative text-start hover:shadow-md ${addons.includes(e.id) ? 'border-brand-gold bg-gradient-to-br from-brand-gold/10 to-transparent dark:from-brand-gold/20' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className={`p-2 rounded-lg ${addons.includes(e.id) ? 'bg-brand-gold text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                                                                <e.icon size={18} />
                                                            </div>
                                                            {addons.includes(e.id) && <CheckCircle size={18} className="text-brand-gold" fill="currentColor" stroke="white" />}
                                                        </div>
                                                        <div className="font-bold text-sm md:text-base dark:text-white mb-1">{e.label[lang]}</div>
                                                        <div className="text-xs text-gray-500 font-medium">+ {e.price} AED</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: SUMMARY */}
                                {step === 3 && (
                                    <motion.div 
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="grid md:grid-cols-2 gap-8 items-center h-full"
                                    >
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                                                <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-4">{lang === 'ar' ? 'ملخص المشروع' : 'Project Summary'}</h4>
                                                
                                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                                    <div className="w-16 h-16 bg-brand-purple text-white rounded-2xl flex items-center justify-center shadow-lg">
                                                        {types.find(t => t.id === projectType)?.icon && React.createElement(types.find(t => t.id === projectType)!.icon, { size: 32 })}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-xl dark:text-white">{types.find(t => t.id === projectType)?.label[lang]}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {projectType === 'corporate' && (
                                                                <div className="flex flex-col gap-1 mt-1">
                                                                    <span>{pageCount} {lang === 'ar' ? 'صفحة' : 'Pages'}</span>
                                                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded w-fit">{corpDesign === 'custom' ? (lang === 'ar' ? 'تصميم خاص' : 'Custom Design') : (lang === 'ar' ? 'قالب جاهز' : 'Template')}</span>
                                                                    {hasBlog && <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded w-fit">{lang === 'ar' ? '+ مدونة' : '+ Blog'}</span>}
                                                                </div>
                                                            )}
                                                            {projectType === 'ecommerce' && `${productCount} Products`}
                                                            {projectType === 'app' && `${platforms.android ? 'Android ' : ''}${platforms.ios ? 'iOS' : ''}`}
                                                            {projectType === 'custom' && 'Custom Scope'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {addons.map(aid => {
                                                        const item = extras.find(e => e.id === aid);
                                                        if (!item) return null;
                                                        return (
                                                            <div key={aid} className="flex justify-between text-sm">
                                                                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                                    <Check size={14} className="text-green-500" /> {item.label[lang]}
                                                                </span>
                                                                <span className="font-mono text-gray-400">{item.price}</span>
                                                            </div>
                                                        );
                                                    })}
                                                    {addons.length === 0 && <span className="text-gray-400 text-sm italic">{lang === 'ar' ? 'لا توجد إضافات' : 'No add-ons selected'}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-brand-purple text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                                            
                                            <div className="relative z-10">
                                                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-sm border border-white/10">
                                                    <Clock size={14} className="text-brand-gold" />
                                                    {lang === 'ar' ? 'مدة التنفيذ:' : 'Est. Delivery:'} <span className="text-brand-gold">{calculation.range} {lang === 'ar' ? 'أسابيع' : 'Weeks'}</span>
                                                </div>
                                                
                                                <div className="mb-2 opacity-80 text-sm font-medium uppercase tracking-wide">{lang === 'ar' ? 'التكلفة التقديرية' : 'Estimated Total'}</div>
                                                <div className="text-5xl md:text-6xl font-black tracking-tight mb-2">
                                                    {calculation.price.toLocaleString()} <span className="text-2xl font-bold opacity-50">AED</span>
                                                </div>
                                                <p className="text-xs opacity-60 max-w-[250px] leading-relaxed">
                                                    {lang === 'ar' ? '* هذا السعر تقريبي وقد يختلف بناءً على التفاصيل النهائية.' : '* Approximate estimate subject to final requirements.'}
                                                </p>
                                            </div>

                                            <button 
                                                onClick={sendToWhatsApp}
                                                className="mt-8 w-full py-4 bg-white text-brand-purple rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group relative z-10"
                                            >
                                                <MessageSquare size={20} className="fill-brand-purple" />
                                                {lang === 'ar' ? 'إرسال العرض عبر واتساب' : 'Send Quote via WhatsApp'}
                                                <Share2 size={16} className="opacity-50 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                         </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 flex justify-between items-center">
                        <button 
                            onClick={prevStep} 
                            disabled={step === 1}
                            className={`px-4 md:px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            <ChevronRight size={20} className="rtl:rotate-180" /> {lang === 'ar' ? 'السابق' : 'Back'}
                        </button>

                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-brand-purple' : 'w-2 bg-gray-300 dark:bg-gray-700'}`} />
                            ))}
                        </div>

                        {step < 3 ? (
                            <button 
                                onClick={nextStep}
                                className="px-6 md:px-8 py-3 bg-brand-purple text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/20 transition-all hover:scale-105"
                            >
                                {lang === 'ar' ? 'التالي' : 'Next'} <ChevronLeft size={20} className="rtl:rotate-180" />
                            </button>
                        ) : (
                            <div className="w-24"></div> 
                        )}
                    </div>
                </div>
             </div>
        </section>
    );
};
