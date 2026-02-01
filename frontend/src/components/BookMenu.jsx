import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Flame, UtensilsCrossed } from 'lucide-react';

const FlipPage = ({ index, isFlipped, children, totalSheets, currentSplit }) => {
    // PHYSICAL Z-INDEX LOGIC
    // The active page flipping must always be on top.
    const isAtSplit = index === currentSplit || index === currentSplit - 1;
    const baseZIndex = isFlipped ? index : (totalSheets - index);
    const zIndex = isAtSplit ? 100 : baseZIndex;

    return (
        <motion.div
            initial={false}
            animate={{
                rotateY: isFlipped ? -180 : 0,
                zIndex: zIndex
            }}
            transition={{
                rotateY: { duration: 1.2, ease: [0.645, 0.045, 0.355, 1.0] },
                zIndex: { duration: 0 }
            }}
            className="absolute top-0 right-0 w-1/2 h-full origin-left transform-style-3d bg-[#fdfcfb] rounded-r-[2rem]"
            style={{
                transformStyle: 'preserve-3d',
                opacity: 1 // Explicitly set full opacity
            }}
        >
            {/* FRONT FACE (Visible on the right side) */}
            <div
                className="absolute inset-0 w-full h-full bg-[#fdfcfb] border-l border-black/10 overflow-hidden rounded-r-[2rem] shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
                style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: 2,
                    opacity: 1 // Ensure full opacity
                }}
            >
                {children[0]}
                {/* Subtle depth gradient at the spine */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

                {/* Dynamic Shadow Layer - Darkens slightly as it flips up */}
                <motion.div
                    animate={{ opacity: isFlipped ? 0.15 : 0 }}
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                    transition={{ duration: 0.6 }}
                />
            </div>

            {/* BACK FACE (Visible on the left side) */}
            <div
                className="absolute inset-0 w-full h-full bg-[#fdfcfb] border-r border-black/10 overflow-hidden rounded-l-[2rem] shadow-[20px_0_50px_rgba(0,0,0,0.1)]"
                style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: 1,
                    opacity: 1 // Ensure full opacity
                }}
            >
                {children[1]}
                {/* Subtle depth gradient at the spine */}
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

                {/* Dynamic Highlight Layer - Brightens as it lands on the left */}
                <motion.div
                    animate={{ opacity: isFlipped ? 0 : 0.15 }}
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                    transition={{ duration: 0.6 }}
                />
            </div>
        </motion.div>
    );
};

const BookMenu = ({ categories, isLoading, isOpen, onClose }) => {
    const [flippedPages, setFlippedPages] = useState([]);

    useEffect(() => {
        if (!isOpen) setFlippedPages([]);
    }, [isOpen]);

    if (!isOpen) return null;

    // Content preparation
    const itemsPerPage = 6;
    let menuPages = [];
    const allItems = (categories || []).flatMap(cat =>
        (cat.items || []).map(item => ({ ...item, categoryName: cat.name }))
    );

    for (let i = 0; i < allItems.length; i += itemsPerPage) {
        menuPages.push({ type: 'menu', items: allItems.slice(i, i + itemsPerPage) });
    }

    const sheets = [];
    sheets.push({ front: { type: 'cover' }, back: menuPages[0] || { type: 'empty' } });

    for (let i = 1; i < menuPages.length; i += 2) {
        sheets.push({
            front: menuPages[i],
            back: menuPages[i + 1] || { type: 'back_cover' }
        });
    }

    if (sheets[sheets.length - 1].back?.type !== 'back_cover') {
        sheets.push({ front: { type: 'empty' }, back: { type: 'back_cover' } });
    }

    const nextSheet = () => {
        if (flippedPages.length < sheets.length) {
            setFlippedPages([...flippedPages, flippedPages.length]);
        }
    };

    const prevSheet = () => {
        if (flippedPages.length > 0) {
            setFlippedPages(flippedPages.slice(0, -1));
        }
    };

    const renderContent = (content) => {
        if (!content || content.type === 'empty') return <div className="w-full h-full bg-[#f4f1ea] border-x border-black/5" />;

        switch (content.type) {
            case 'cover':
                return (
                    <div className="w-full h-full bg-primary flex flex-col items-center justify-center text-center p-8">
                        <div className="size-24 bg-white rounded-full p-4 mb-6 shadow-2xl">
                            <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-white text-4xl font-black mb-3 uppercase tracking-tighter font-display">THE <span className="text-accent">DOSA SPOT</span></h1>
                        <div className="w-12 h-1 bg-accent/40 rounded-full mb-2" />
                        <p className="text-accent/80 text-[10px] font-black tracking-[0.6em] uppercase">Authentic South Indian Journey</p>
                    </div>
                );
            case 'menu':
                return (
                    <div className="w-full h-full p-8 flex flex-col bg-[#fdfcfb]">
                        <div className="mb-6">
                            <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-1">Traditional Menu</h3>
                            <div className="h-0.5 w-8 bg-accent" />
                        </div>
                        <div className="flex-1 space-y-4">
                            {(content.items || []).map((item, i) => (
                                <div key={i} className="group border-l border-primary/10 pl-4 py-1">
                                    <div className="flex justify-between items-baseline gap-2">
                                        <h4 className="font-black text-primary uppercase text-[11px] group-hover:text-accent transition-colors">{item.name}</h4>
                                        <div className="h-[1px] flex-1 bg-primary/5 border-b border-dashed" />
                                        <span className="text-secondary font-black text-xs">{item.price}</span>
                                    </div>
                                    <p className="text-[9px] text-primary/50 font-medium leading-relaxed italic line-clamp-2">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-primary/5 flex justify-between items-center text-[7px] text-primary/30 font-black uppercase tracking-widest">
                            <span>Handcrafted with Love</span>
                            <span>Ottawa, ON</span>
                        </div>
                    </div>
                );
            case 'back_cover':
                return (
                    <div className="w-full h-full bg-secondary flex flex-col items-center justify-center text-center p-8">
                        <div className="p-4 bg-white/5 rounded-full mb-6">
                            <UtensilsCrossed className="text-accent/20" size={48} />
                        </div>
                        <h1 className="text-white text-3xl font-black mb-4 uppercase italic tracking-tight">Pure South Indian Soul</h1>
                        <div className="w-8 h-1 bg-accent/30 rounded-full" />
                        <p className="mt-8 text-accent/60 text-[9px] font-black uppercase tracking-[0.4em]">Visit us again soon</p>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 overflow-hidden"
            >
                {/* Background Overlay */}
                <div className="absolute inset-0" onClick={onClose} />

                {/* Close Button UI */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                >
                    <X size={24} />
                </button>

                {/* PHYSICAL BOOK CONTAINER */}
                <div className="relative w-full max-w-4xl aspect-[1.6/1] perspective-3000 transition-all z-10 pointer-events-none">

                    {/* Shadow tray for ground effect */}
                    <div className="absolute -inset-20 bg-black/70 blur-[150px] rounded-full" />

                    {/* The Fixed Book Cover Hub */}
                    <div className="absolute inset-0 flex rounded-[3rem] overflow-hidden border-[16px] border-[#2d1e12] shadow-[0_60px_120px_rgba(0,0,0,1)]">
                        <div className="flex-1 bg-[#2d1e12] border-r border-white/5" />
                        <div className="flex-1 bg-[#2d1e12]" />
                    </div>

                    {/* Stacking Sheets */}
                    {sheets.map((sheet, idx) => (
                        <FlipPage
                            key={idx}
                            index={idx}
                            isFlipped={flippedPages.includes(idx)}
                            totalSheets={sheets.length}
                            currentSplit={flippedPages.length}
                        >
                            {[renderContent(sheet.front), renderContent(sheet.back)]}
                        </FlipPage>
                    ))}

                    {/* Nav Areas */}
                    <div className="absolute inset-0 flex z-[105] pointer-events-auto">
                        <div className="flex-1 cursor-w-resize group" onClick={(e) => { e.stopPropagation(); prevSheet(); }}>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronLeft size={24} />
                            </div>
                        </div>
                        <div className="flex-1 cursor-e-resize group" onClick={(e) => { e.stopPropagation(); nextSheet(); }}>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking Dots */}
                <div className="absolute bottom-6 flex flex-col items-center gap-3 z-[110] pointer-events-none">
                    <div className="flex gap-1.5">
                        {sheets.map((_, idx) => (
                            <div key={idx} className={`h-1.5 transition-all duration-700 rounded-full ${flippedPages.length === idx ? 'w-12 bg-accent' : 'w-2 bg-white/20'}`} />
                        ))}
                    </div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.6em]">Tap edges to flip</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookMenu;
