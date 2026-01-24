import React, { useState } from 'react';
import { Store, UtensilsCrossed, BookOpen, Calendar, ShoppingBag, Menu as MenuIcon, X, HandPlatter } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar({ activeTab, setActiveTab }) {
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
        <nav className="relative bg-sunflower/80 backdrop-blur-md border-b border-silver/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex items-center cursor-pointer gap-2"
                        onClick={() => setActiveTab('home')}
                        onDoubleClick={() => setActiveTab('admin')}
                    >
                        <img src="/android-chrome-512x512.png" alt="Dosa Spot Logo" className="w-8 h-8 rounded-full bg-white object-contain shadow-sm" />
                        <div className="flex flex-col items-center -my-1">
                            <span className="text-xl md:text-2xl font-bold text-coffee-bean leading-none header-text-regular">
                                The Dosa <span className="text-slate-grey">Spot</span>
                            </span>
                            <span className="text-[0.6rem] md:text-xs font-medium text-slate-grey uppercase tracking-[0.3em] w-full text-center border-t border-slate-grey/30 mt-0.5 pt-0.5 leading-none">
                                Ottawa
                            </span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex space-x-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors relative
                  ${activeTab === item.id ? 'text-coffee-bean' : 'text-slate-grey hover:text-coffee-bean'}`}
                            >
                                <item.icon size={16} />
                                {item.label}
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-grey"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-grey hover:text-coffee-bean"
                        >
                            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-white border-b border-silver/30"
            >
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-4 w-full px-3 py-3 text-base font-medium text-slate-grey hover:bg-gray-50 rounded-md"
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </nav>
    );
}

export default Navbar;
