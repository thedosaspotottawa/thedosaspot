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
        <div className="bg-slate-grey text-white relative font-medium text-xs z-50">
            <div className="max-w-7xl mx-auto px-4 min-h-[40px] flex items-center justify-center relative py-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2 text-center"
                    >
                        <Megaphone size={14} className="text-sunflower flex-shrink-0" />
                        <span className="leading-tight">{activeMessages[currentIndex].message}</span>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows for multiple messages */}
                {activeMessages.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 text-silver/50 hover:text-white transition-colors p-1"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 text-silver/50 hover:text-white transition-colors p-1"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {activeMessages.length > 1 && (
                <div className="flex justify-center gap-1 pb-1.5">
                    {activeMessages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-sunflower w-3' : 'bg-silver/30'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Banner;
