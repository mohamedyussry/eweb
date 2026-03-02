
import React, { useState } from 'react';
import { X, Check, Printer, AlertCircle, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { StoreProduct } from '../types';
import { ZIINA_API_KEY } from '../constants';

export const InvoiceModal = ({ product, onClose, initialView = 'invoice', existingData = null }: { product: StoreProduct | null, onClose: () => void, initialView?: 'invoice' | 'ziina' | 'receipt', existingData?: any }) => {
  const { lang } = useAppContext();
  const [name, setName] = useState(existingData?.name || '');
  const [email, setEmail] = useState(existingData?.email || '');
  const [paymentStep, setPaymentStep] = useState<'invoice' | 'ziina' | 'receipt'>(initialView);
  const [processing, setProcessing] = useState(false);
  
  const invoiceId = existingData?.invoiceId || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = existingData?.date || new Date().toLocaleDateString('en-GB');

  if (!product) return null;

  const vatRate = 0.05;
  const vatAmount = product.price * vatRate;
  const total = product.price + vatAmount;

  const initiateZiinaPayment = async () => {
    if (!name || !email) {
        alert(lang === 'ar' ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Please enter name and email');
        return;
    }
    setProcessing(true);
    const txData = { productId: product.id, invoiceId, name, email, date, amount: total, status: 'pending' };
    localStorage.setItem('eweb_pending_tx', JSON.stringify(txData));

    try {
      const amountInFils = Math.round(total * 100);
      const response = await fetch('https://api-v2.ziina.com/api/payment_intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ZIINA_API_KEY}` },
        body: JSON.stringify({
          amount: amountInFils,
          currency_code: 'AED',
          message: `Order ${invoiceId} - ${product.title.en}`,
          success_url: `${window.location.origin}/#/store?status=success`,
          cancel_url: `${window.location.origin}/#/store?status=cancel`,
          test: true
        })
      });
      const data = await response.json();
      if (data.redirect_url) {
          if (window.self !== window.top) {
              alert(lang === 'ar' 
                 ? "سيتم فتح صفحة الدفع في نافذة جديدة للأمان." 
                 : "Payment page will open in a new window for security.");
              window.open(data.redirect_url, '_blank');
          } else {
              window.location.href = data.redirect_url;
          }
      } else {
          alert('Payment initiation failed');
          setProcessing(false);
      }
    } catch (error) {
      console.error('Ziina Error:', error);
      alert('Payment Error');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <div className="bg-brand-purple p-6 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div>
                <h3 className="text-xl font-bold font-heading">{lang === 'ar' ? 'تفاصيل الفاتورة' : 'Invoice Details'}</h3>
                <p className="text-sm opacity-80">{invoiceId}</p>
            </div>
            {paymentStep !== 'receipt' && <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><X size={20}/></button>}
        </div>

        <div className="p-6">
           <div className="flex justify-center mb-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle size={12} /> {lang === 'ar' ? 'وضع اختبار' : 'Test Mode'}
                </span>
           </div>

           {paymentStep === 'receipt' ? (
               <div className="text-center space-y-6">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                       <Check size={40} strokeWidth={3} />
                   </div>
                   <div>
                       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{lang === 'ar' ? 'تم الدفع بنجاح' : 'Payment Successful'}</h2>
                       <p className="text-gray-500">{lang === 'ar' ? 'شكراً لثقتكم بنا' : 'Thank you for your trust'}</p>
                   </div>
                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-start space-y-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 relative">
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 -rotate-12 border-4 border-green-500/30 text-green-500 font-black text-4xl opacity-20 select-none pointer-events-none">PAID</div>
                        <div className="flex justify-between"><span>Invoice:</span> <span className="font-mono font-bold">{invoiceId}</span></div>
                        <div className="flex justify-between"><span>Date:</span> <span>{date}</span></div>
                        <div className="flex justify-between"><span>Client:</span> <span>{name}</span></div>
                        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-base"><span>Total:</span> <span>{total.toFixed(2)} AED</span></div>
                   </div>
                   <div className="flex gap-3">
                       <button onClick={() => window.print()} className="flex-1 py-3 border border-gray-300 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 dark:text-white">
                           <Printer size={18} /> {lang === 'ar' ? 'طباعة' : 'Print'}
                       </button>
                       <button onClick={onClose} className="flex-1 py-3 bg-brand-purple text-white rounded-xl font-bold hover:bg-brand-purple/90">
                           {lang === 'ar' ? 'إغلاق' : 'Close'}
                       </button>
                   </div>
                   <p className="text-xs text-gray-400">{lang === 'ar' ? `تم إرسال نسخة إلى ${email}` : `Copy sent to ${email}`}</p>
               </div>
           ) : (
               <>
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{product.title[lang]}</span>
                        <span className="font-bold">{product.price} AED</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{lang === 'ar' ? 'الضريبة (5%)' : 'VAT (5%)'}</span>
                        <span>{vatAmount.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-brand-purple dark:text-brand-gold pt-2">
                        <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                        <span>{total.toFixed(2)} AED</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-brand-purple outline-none" placeholder={lang === 'ar' ? 'مثال: محمد علي' : 'e.g. John Doe'} />
                    
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-brand-purple outline-none" placeholder="name@example.com" />
                </div>

                <div className="mt-8 space-y-3">
                    <button onClick={initiateZiinaPayment} disabled={processing} className="w-full py-3.5 bg-black text-white rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50">
                        {processing ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <CreditCard size={20} />
                                {lang === 'ar' ? 'دفع آمن عبر Ziina' : 'Secure Pay (Ziina)'}
                            </>
                        )}
                    </button>
                </div>
               </>
           )}
        </div>
      </div>
    </div>
  );
};
