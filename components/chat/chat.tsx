"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Loader2, ArrowDownCircle } from 'lucide-react';
import Styles from './chat.module.css';

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showChatIcon, setShowChatIcon] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
        api: '/api/gemini'
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowChatIcon(true);
            } else {
                setShowChatIcon(false);
                setIsChatOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <div className={Styles.chat_wrapper}>
            <AnimatePresence>
                {showChatIcon && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={Styles.chat_trigger}
                        onClick={toggleChat}
                    >
                        {isChatOpen ? <ArrowDownCircle /> : <MessageCircle />}
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        className={Styles.chat_window}
                    >
                        <div className={Styles.chat_header}>
                            <div>
                                <h3 className={Styles.chat_title}>Chat with KPVARMA</h3>
                                <span className={Styles.status_dot}>Online</span>
                            </div>
                            <button onClick={toggleChat} className={Styles.close_btn}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className={Styles.chat_content} ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className={Styles.empty_state}>
                                    <p>How can I help you today?</p>
                                </div>
                            )}
                            {messages.map((m) => (
                                <div key={m.id} className={`${Styles.message_bubble} ${m.role === 'user' ? Styles.user : Styles.ai}`}>
                                    {m.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className={Styles.loading_indicator}>
                                    <Loader2 className={Styles.spinner} size={16} />
                                    <button onClick={() => stop()} className={Styles.stop_btn}>Stop generating</button>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className={Styles.chat_footer}>
                            <input 
                                value={input} 
                                onChange={handleInputChange} 
                                placeholder='Ask me anything...' 
                                className={Styles.chat_input}
                            />
                            <button type='submit' disabled={isLoading || !input} className={Styles.send_btn}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Chat;