
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, X, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

export const ChatAssistant = () => {
    const { lang } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ 
                role: 'model', 
                text: lang === 'ar' ? 'مرحباً! أنا حمد، المساعد الذكي من Echo Web. كيف يمكنني مساعدتك اليوم في مشاريعك الرقمية؟' : 'Hello! I am Hamad, Echo Web AI Assistant. How can I help you with your digital projects today?' 
            }]);
        }
    }, [isOpen, lang]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setInput('');
        const newHistory = [...messages, { role: 'user', text: userMsg } as ChatMessage];
        setMessages(newHistory);
        setLoading(true);

        const responseText = await generateChatResponse(userMsg, newHistory, lang);
        
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        setLoading(false);
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 md:bottom-8 right-6 z-40 w-14 h-14 bg-brand-purple text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform hover:shadow-brand-purple/40 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={28} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 md:bottom-8 right-6 z-50 w-[90%] md:w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
                    >
                        <div className="bg-brand-purple p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Sparkles size={16}/></div>
                                <div>
                                    <h4 className="font-bold text-sm">Hamad</h4>
                                    <span className="text-xs opacity-80 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full"><X size={20}/></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0B0F19]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-purple text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 outline-none text-sm focus:ring-1 focus:ring-brand-purple transition-shadow"
                                />
                                <button onClick={handleSend} className="bg-brand-purple text-white p-2 rounded-xl hover:bg-brand-purple/90 transition-colors"><Send size={18} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
