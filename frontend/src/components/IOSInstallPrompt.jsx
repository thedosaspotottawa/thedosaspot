import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function IOSInstallPrompt() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Detect iOS and not standalone
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        if (isIOS && !isStandalone) {
            // Show prompt after a short delay
            const timer = setTimeout(() => setIsVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-6 border border-sunflower/20"
            >
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-slate-grey hover:text-coffee-bean"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <img src="/android-chrome-512x512.png" alt="The Dosa Spot" className="w-full h-full rounded-2xl object-cover" />
                    </div>

                    <h3 className="text-lg font-bold text-coffee-bean mb-2">Install Dosa Spot</h3>
                    <p className="text-slate-grey text-sm mb-6">
                        Add Dosa Spot to your home screen for a better experience and quick access!
                    </p>

                    <div className="space-y-4 w-full text-left">
                        <div className="flex items-center gap-4 text-sm text-coffee-bean">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <Share size={16} className="text-blue-500" />
                            </div>
                            <p>1. Tap the <span className="font-bold">Share</span> button in Safari</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-coffee-bean">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <PlusSquare size={16} />
                            </div>
                            <p>2. Scroll down and select <span className="font-bold">Add to Home Screen</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default IOSInstallPrompt;
