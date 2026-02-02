import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, UtensilsCrossed } from 'lucide-react';

const PaperTexture = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
    />
);

const DottedLeader = ({ label, price, description }) => (
    <div className="group mb-5">
        <div className="flex items-baseline mb-1">
            <h4 className="text-[#2d1e12] font-black text-sm tracking-wide group-hover:text-[#d4a017] transition-colors font-display">{label}</h4>
            <div className="grow mx-2 border-b-2 border-dotted border-[#2d1e12]/20 relative -top-1"></div>
            <span className="text-[#d4a017] font-black font-display">{price}</span>
        </div>
        {description && <p className="text-[#2d1e12]/70 text-xs font-medium italic leading-relaxed">{description}</p>}
    </div>
);

// Page Content Components
const CoverContent = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 border-[12px] border-[#2d1e12] relative bg-[#2d1e12]">
        <div className="absolute inset-2 border-2 border-[#d4a017]/30 rounded-sm pointer-events-none"></div>
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#2d1e12] text-[#d4a017] border-4 border-[#2d1e12] shadow-inner relative overflow-hidden">
            {/* Leather Texture */}
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-leather.png")' }}></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 mb-8 text-[#d4a017] drop-shadow-lg">
                    <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-4xl md:text-5xl text-center mb-4 font-script text-[#d4a017]" style={{ fontFamily: '"Twinkle Star", cursive' }}>The Dosa Spot</h1>
                <div className="w-24 h-0.5 bg-[#d4a017] mb-4"></div>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#d4a017]/80">Est. 1982</p>
            </div>
        </div>
    </div>
);

const BackCoverContent = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#2d1e12] relative">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-leather.png")' }}></div>
        <div className="relative z-10 text-center">
            <UtensilsCrossed className="w-16 h-16 text-[#d4a017]/30 mx-auto mb-6" />
            <h2 className="text-2xl text-[#d4a017] font-script mb-2" style={{ fontFamily: '"Twinkle Star", cursive' }}>Thank You</h2>
            <p className="text-[#d4a017]/60 text-xs tracking-widest uppercase">For dining with us</p>
        </div>
    </div>
);

const MenuPageContent = ({ title, items, pageNum, isLeft }) => (
    <div className="w-full h-full p-8 flex flex-col relative overflow-hidden bg-[#fdfcfb]">
        <PaperTexture />

        {/* Decorative Corner */}
        {isLeft ? (
            <div className="absolute top-0 left-0 p-4">
                <div className="w-12 h-12 border-t-2 border-l-2 border-[#d4a017]/20 rounded-tl-xl"></div>
            </div>
        ) : (
            <div className="absolute top-0 right-0 p-4">
                <div className="w-12 h-12 border-t-2 border-r-2 border-[#d4a017]/20 rounded-tr-xl"></div>
            </div>
        )}

        <div className="text-center mb-8 relative z-10">
            <h3 className="text-2xl text-[#2d1e12] mb-2 font-script" style={{ fontFamily: '"Twinkle Star", cursive' }}>{title}</h3>
            <div className="w-8 h-1 bg-[#d4a017] mx-auto rounded-full opacity-60"></div>
        </div>

        <div className="flex-1 relative z-10">
            {items && items.map((item, idx) => (
                <DottedLeader key={idx} label={item.name} price={item.price} description={item.description} />
            ))}
        </div>

        <div className="mt-auto pt-4 flex justify-between items-end relative z-10">
            <span className="text-[8px] text-[#2d1e12]/40 tracking-widest uppercase">{isLeft ? pageNum : "The Dosa Spot"}</span>
            <span className="text-[8px] text-[#2d1e12]/40 tracking-widest uppercase">{isLeft ? "The Dosa Spot" : pageNum}</span>
        </div>

        {/* Inner Spine Shadow */}
        <div className={`absolute inset-y-0 w-12 pointer-events-none ${isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/10 to-transparent`} />
    </div>
);

// Single Page Component (Front + Back)
const FlipPageSheet = ({ index, isFlipped, zIndex, frontContent, backContent }) => {
    return (
        <motion.div
            className="absolute top-0 right-0 w-full h-full origin-left bg-[#fdfcfb] rounded-r-lg antialiased-3d"
            initial={{ rotateY: 0 }}
            animate={{
                rotateY: isFlipped ? -180 : 0,
                zIndex: zIndex
            }}
            transition={{
                rotateY: { duration: 1.5, ease: [0.645, 0.045, 0.355, 1.0] }, // Custom bezier for realistic weight
                zIndex: { delay: isFlipped ? 0.75 : 0.75 } // Swap z-index halfway through flip
            }}
            style={{
                transformStyle: 'preserve-3d',
                width: '100%',
                height: '100%'
            }}
        >
            {/* FRONT FACE (Visible when page is on the RIGHT stack) */}
            <div
                className="absolute inset-0 w-full h-full backface-hidden bg-[#fdfcfb] rounded-r-lg overflow-hidden shadow-md page-content-layer"
                style={{ backfaceVisibility: 'hidden' }}
            >
                {frontContent}

                {/* Dynamic Lighting: Highlight when flat, shadow when flipping */}
                <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{ opacity: isFlipped ? 0.3 : 0 }}
                    transition={{ duration: 1.5 }}
                />
            </div>

            {/* BACK FACE (Visible when page is on the LEFT stack) */}
            <div
                className="absolute inset-0 w-full h-full backface-hidden bg-[#fdfcfb] rounded-l-lg overflow-hidden shadow-md page-content-layer"
                style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    borderRadius: '5px 0 0 5px' // Rounded on left side
                }}
            >
                {backContent}

                {/* Dynamic Lighting: Shadow coming from right, highlight when flat */}
                <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{ opacity: isFlipped ? 0 : 0.3 }}
                    transition={{ duration: 1.5 }}
                />
            </div>
        </motion.div>
    );
};

const BookMenu = ({ categories, isLoading, isOpen, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        if (!isOpen) setCurrentPage(0);
    }, [isOpen]);

    // Handle ESC
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // PREPARE DATA
    useEffect(() => {
        if (!categories) return;

        // Flatten items for pagination
        // Let's create specific "sheets"
        // Sheet 0: Front=Cover, Back=InsideFront(Empty/Intro)

        let sheets = [];

        // 1. Cover Sheet
        sheets.push({
            front: <CoverContent />,
            back: <div className="w-full h-full bg-[#fdfcfb] flex items-center justify-center italic text-[#2d1e12]/50 font-serif p-8 text-center">"A culinary journey through the streets of Chennai."</div>
        });

        // 2. Menu Sheets
        // We need to chunk items. 
        const itemsPerPage = 5;
        const allItems = categories.flatMap(cat => cat.items.map(i => ({ ...i, category: cat.name })));

        // Group by category smartly? Or just flow.
        // Let's just create pages of content.
        let pages = [];
        categories.forEach(cat => {
            for (let i = 0; i < cat.items.length; i += itemsPerPage) {
                pages.push({
                    title: i === 0 ? cat.name : `${cat.name} (cont.)`,
                    items: cat.items.slice(i, i + itemsPerPage)
                });
            }
        });

        // Pair pages into sheets
        // Page 1 (Front of Sheet 1), Page 2 (Back of Sheet 1) -- WAIT
        // NO. Reference style logic:
        // Divs are stacked. Each div is a "Sheet".
        // Sheet 1: Front (Right side Page 1), Back (Left side Page 2)
        // Sheet 2: Front (Right side Page 3), Back (Left side Page 4)

        // My Logic:
        // Sheet 0 (Cover): Front=Cover, Back=Intro
        // Sheet 1: Front=First Menu Page, Back=Second Menu Page

        for (let i = 0; i < pages.length; i += 2) {
            sheets.push({
                front: <MenuPageContent title={pages[i].title} items={pages[i].items} pageNum={i + 1} isLeft={false} />,
                back: pages[i + 1] ? <MenuPageContent title={pages[i + 1].title} items={pages[i + 1].items} pageNum={i + 2} isLeft={true} /> : <div className="w-full h-full bg-[#fdfcfb]" />
            })
        }

        // 3. Back Cover Sheet
        // If odd number of content sheets, add one for back cover
        sheets.push({
            front: <div className="w-full h-full bg-[#fdfcfb] flex items-center justify-center"><div className="w-16 h-1 bg-[#d4a017]/20"></div></div>,
            back: <BackCoverContent />
        });

        setBookData(sheets);

    }, [categories]);

    if (!isOpen || bookData.length === 0) return null;

    const totalSheets = bookData.length;

    const nextPage = () => {
        if (currentPage < totalSheets) setCurrentPage(p => p + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(p => p - 1);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                        <X size={24} />
                    </button>

                    {/* Book Container */}
                    {/* 
                       Logic:
                       - We render a single stack of sheets.
                       - We shift the whole container when opened (current > 0) to center the spine.
                       - Base width is single page width.
                    */}
                    <div className="relative h-[600px] w-[350px] md:h-[700px] md:w-[450px] perspective-[2000px]">
                        <motion.div
                            className="relative w-full h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{
                                translateX: currentPage > 0 ? '50%' : '0%'
                            }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            {/* Static Back Cover (The board under the stack) */}
                            <div className="absolute inset-0 bg-[#1a110a] rounded-r-lg shadow-2xl"
                                style={{ transform: 'translateZ(-2px)' }}
                            />

                            {/* Render Sheets in Reverse Order (Bottom up) so z-index defaults work? 
                                Actually, we manually control z-index.
                            */}
                            {bookData.map((sheet, index) => {
                                // Z-INDEX LOGIC
                                // If I am index 0 (Cover)
                                // Not flipped: High Z (Top of right stack)
                                // Flipped: Low Z (Bottom of left stack)

                                // Right Stack Order (Top to Bottom): 0, 1, 2...
                                // Left Stack Order (Bottom to Top): 0, 1, 2...

                                // Wait, the reference says:
                                // Page 1 (Cover equivalent): Z=8
                                // Page 2: Z=5...
                                // Checked Page 1 (Flipped): Z=3
                                // Checked Page 2 (Flipped): Z=4

                                // General formula:
                                // Is Flipped?
                                // YES: zIndex = index (Higher index is on top of Lower index on left side)
                                // NO: zIndex = totalSheets - index (Lower index is on top of Higher index on right side)

                                const isFlipped = currentPage > index; // If current is 1 (Open), Cover(0) is flipped.
                                const zIndex = isFlipped ? index : (totalSheets - index + 1);

                                return (
                                    <FlipPageSheet
                                        key={index}
                                        index={index}
                                        isFlipped={isFlipped}
                                        zIndex={zIndex}
                                        frontContent={sheet.front}
                                        backContent={sheet.back}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-10 flex gap-4 text-white/50 z-[110]">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
                        >
                            <ChevronLeft />
                        </button>
                        <p className="py-4 text-xs font-black tracking-widest uppercase">
                            {currentPage === 0 ? "Tap to Open" : `${currentPage} / ${totalSheets}`}
                        </p>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalSheets}
                            className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    {/* Click zones for easier navigation */}
                    <div className="absolute top-0 left-0 w-1/3 h-full z-[100] cursor-w-resize" onClick={prevPage} />
                    <div className="absolute top-0 right-0 w-1/3 h-full z-[100] cursor-e-resize" onClick={nextPage} />

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookMenu;
