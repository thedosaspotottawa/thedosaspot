import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, FileText, Search, ShoppingCart, Utensils, Star, Coffee, Egg, Download, BookOpen } from 'lucide-react';
import LoadingIcon from './LoadingIcon';
import BookMenu from './BookMenu';

const iconMap = {
    'Classic Dosas': Utensils,
    'Specialty Dosas': Star,
    'Idlis & Vadas': Egg,
    'Beverages': Coffee,
    'Sides': FileText
};

function Menu({ categories, isLoading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);

    const fullCategories = categories || [];

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <LoadingIcon />
                    <p className="mt-4 text-primary/60 font-medium">Loading delicious menu...</p>
                </div>
            </div>
        );
    }

    const filteredCategories = fullCategories.map(cat => ({
        ...cat,
        items: (cat.items || []).filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8">
            {/* Hero Header */}
            <div className="mb-10 relative group h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{
                        backgroundImage: 'linear-gradient(to top, rgba(26, 20, 15, 0.9), rgba(26, 20, 15, 0.2)), url("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop")',
                    }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-3 uppercase tracking-wider self-start">
                        Authentic Experience
                    </span>
                    <h1 className="text-white text-4xl md:text-5xl font-black leading-tight mb-2">Authentic South Indian Menu</h1>
                    <p className="text-accent/80 max-w-lg font-light">From the streets of Chennai to your table, experience the true taste of crispy fermented rice crepes and aromatic filter coffee.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Sticky Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className='mb-4'>

                        <button
                            onClick={() => setIsBookOpen(true)}
                            className="hidden md:flex w-full mb-3 bg-primary text-white dark:bg-accent dark:text-primary text-xs font-black py-4 rounded-xl items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                            <BookOpen size={16} />
                            Digital Book Menu
                        </button>

                        <a
                            href="/assets/docs/New Menu.pdf"
                            target="_blank"
                            className="w-full border-2 border-primary/10 text-primary dark:text-accent dark:border-accent/20 text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all"
                        >
                            <Download size={14} />
                            PDF Menu
                        </a>
                    </div>
                    <div className="sticky top-24 bg-white/40 backdrop-blur-md dark:bg-primary/20 p-6 rounded-2xl border border-primary/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-primary dark:text-accent">
                            <Utensils size={20} />
                            <h3 className="text-lg font-bold">Categories</h3>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {fullCategories.map((cat) => {
                                const Icon = iconMap[cat.name] || FileText;
                                return (
                                    <a
                                        key={cat.id}
                                        href={`#category-${cat.id}`}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${activeCategory === cat.id ? 'bg-primary text-white' : 'text-primary/70 hover:bg-primary/5 hover:text-primary dark:text-accent/70 dark:hover:text-accent'}`}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        <Icon size={18} />
                                        <span className="font-bold text-sm tracking-tight">{cat.name}</span>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Menu Content */}
                <div className="flex-1 space-y-12">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search our delicious menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-md dark:bg-primary/10 border border-primary/5 rounded-2xl text-primary placeholder:text-primary/30 focus:ring-2 focus:ring-accent outline-none shadow-sm transition-all"
                        />
                    </div>

                    {filteredCategories.map((category) => (
                        <section key={category.id} id={`category-${category.id}`} className="scroll-mt-24">
                            <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
                                <h2 className="text-2xl font-black text-primary dark:text-accent">{category.name}</h2>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary py-1.5 px-3 bg-secondary/10 rounded-full">
                                    Traditional Favorites
                                </span>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {category.items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group flex flex-col sm:flex-row gap-6 bg-white/40 backdrop-blur-md dark:bg-primary/5 p-5 rounded-2xl border border-primary/5 shadow-sm hover:shadow-xl hover:border-accent/10 transition-all cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 h-full w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {item.image && (
                                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 shadow-inner bg-background-light">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors tracking-tight">
                                                        {item.name}
                                                    </h3>
                                                    {item.is_spicy && (
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <Flame className="text-accent" size={14} fill="currentColor" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Spicy</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-secondary font-black text-xl">{item.price}</span>
                                            </div>
                                            <p className="text-primary/60 dark:text-text-muted text-sm leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <BookMenu
                categories={fullCategories}
                isOpen={isBookOpen}
                onClose={() => setIsBookOpen(false)}
            />
        </div>
    );
}

export default Menu;
