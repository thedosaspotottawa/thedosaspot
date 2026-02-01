import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

function Banner({ messages }) {
    const activeMessages = messages.filter(m => m.active);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (activeMessages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeMessages.length]);

    if (!activeMessages || activeMessages.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + activeMessages.length) % activeMessages.length);
    };

    return (
        <div className="bg-[#2A1F16] text-white relative font-medium text-xs z-50 border-b border-accent/10">
            <div className="max-w-7xl mx-auto px-4 min-h-[44px] flex items-center justify-center relative py-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 text-center px-10"
                    >
                        <div className="p-1.5 bg-accent/20 rounded-lg">
                            <Megaphone size={14} className="text-accent flex-shrink-0" />
                        </div>
                        <span className="leading-tight tracking-wide font-bold">{activeMessages[currentIndex].message}</span>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows for multiple messages */}
                {activeMessages.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 text-white/30 hover:text-accent transition-colors p-2"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 text-white/30 hover:text-accent transition-colors p-2"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {activeMessages.length > 1 && (
                <div className="flex justify-center gap-1.5 pb-2">
                    {activeMessages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-accent w-4' : 'bg-white/10 w-1'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Banner;
