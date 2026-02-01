import React, { useState } from 'react';
import { Store, UtensilsCrossed, BookOpen, Calendar, ShoppingBag, Menu as MenuIcon, X, HandPlatter, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: Store },
        { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
        { id: 'order', label: 'Order Online', icon: ShoppingBag },
        { id: 'services', label: 'Services', icon: HandPlatter },
        { id: 'story', label: 'Our Story', icon: BookOpen },
        { id: 'reservations', label: 'Reservations', icon: Calendar },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-primary backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div
                        className="flex items-center cursor-pointer gap-4 group"
                        onClick={() => setActiveTab('home')}
                        onDoubleClick={() => setActiveTab('admin')}
                    >
                        <div className="size-12 overflow-hidden rounded-full border border-white/10 bg-white group-hover:scale-110 transition-transform">
                            <img
                                src="/android-chrome-512x512.png"
                                alt="The Dosa Spot Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter">
                            The Dosa Spot
                        </h1>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all relative
                                    ${activeTab === item.id ? 'text-accent bg-white/10' : 'text-white/70 hover:text-white'}`}
                            >
                                <item.icon size={18} />
                                {item.label}
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/5 rounded-xl -z-10"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden bg-primary/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-4 w-full px-5 py-4 text-base font-black rounded-2xl transition-all
                                        ${activeTab === item.id ? 'bg-accent text-primary shadow-xl' : 'text-white/70 hover:bg-white/5'}`}
                                >
                                    <item.icon size={24} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
