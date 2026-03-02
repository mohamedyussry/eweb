
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { STORE_PRODUCTS } from '../constants';
import { StoreProduct } from '../types';
import { SEO, PageTransition, SectionTitle } from '../components/Shared';
import { InvoiceModal } from '../components/InvoiceModal';

export const StorePage = () => {
    const { lang } = useAppContext();
    const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
    const [viewState, setViewState] = useState<'invoice' | 'receipt'>('invoice');

    // Check for successful payment return from Ziina
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('status') === 'success') {
            const savedTx = localStorage.getItem('eweb_pending_tx');
            if (savedTx) {
                const txData = JSON.parse(savedTx);
                // Find product
                const product = STORE_PRODUCTS.find(p => p.id === txData.productId);
                if (product) {
                    setSelectedProduct(product);
                    setViewState('receipt'); // Show receipt directly
                }
                // Clear pending tx
                localStorage.removeItem('eweb_pending_tx');
            }
        }
    }, [location]);

    return (
        <PageTransition>
            <SEO 
                title={lang === 'ar' ? 'المتجر' : 'Store'} 
                description={lang === 'ar' ? 'باقات استضافة وتصاميم جاهزة بأسعار منافسة.' : 'Hosting packages and ready-made designs at competitive prices.'} 
            />
            <div className="container mx-auto px-6 py-16">
                <SectionTitle title={lang === 'ar' ? 'باقات وخدمات' : 'Packages & Services'} subtitle={lang === 'ar' ? 'أسعار شفافة' : 'Transparent Pricing'} />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STORE_PRODUCTS.map(product => (
                        <div key={product.id} className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 border ${product.popular ? 'border-brand-purple shadow-2xl shadow-brand-purple/10' : 'border-gray-200 dark:border-gray-800'} flex flex-col`}>
                            {product.popular && (
                                <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-2xl">
                                    {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.title[lang]}</h3>
                            <p className="text-gray-500 text-sm mb-6 min-h-[40px]">{product.description[lang]}</p>
                            <div className="text-4xl font-bold text-brand-purple dark:text-brand-gold mb-6">{product.price} <span className="text-lg text-gray-400">AED</span></div>
                            
                            <ul className="space-y-3 mb-8 flex-grow">
                                {product.features[lang].map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                onClick={() => { setSelectedProduct(product); setViewState('invoice'); }}
                                className={`w-full py-3 rounded-xl font-bold transition-all ${product.popular ? 'bg-brand-purple text-white hover:bg-brand-purple/90' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {lang === 'ar' ? 'شراء الآن' : 'Buy Now'}
                            </button>
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <InvoiceModal 
                       product={selectedProduct} 
                       onClose={() => { setSelectedProduct(null); setViewState('invoice'); }} 
                       initialView={viewState}
                       existingData={viewState === 'receipt' ? JSON.parse(localStorage.getItem('eweb_last_receipt') || '{}') : null}
                    />
                )}
            </div>
        </PageTransition>
    );
};
