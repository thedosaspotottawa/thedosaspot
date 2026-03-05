import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Utensils, Coffee, Download } from 'lucide-react';
import LoadingIcon from './LoadingIcon';

function Menu({ categories, isLoading }) {
    const [activeTab, setActiveTab] = useState('Food');
    const [activeCategory, setActiveCategory] = useState(null);

    const fullCategories = categories || [];

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <LoadingIcon />
                    <p className="mt-4 text-primary/60 font-medium">Preparing the menu...</p>
                </div>
            </div>
        );
    }

    const barKeywords = ['bar', 'cocktail', 'mocktail', 'beer', 'alcohol', 'wine', 'liquor', 'spirits'];
    const isBarCategory = (name) => barKeywords.some(kw => name.toLowerCase().includes(kw));

    const foodCategories = fullCategories.filter(cat => !isBarCategory(cat.name));
    const drinkCategories = fullCategories.filter(cat => isBarCategory(cat.name));

    const displayCategories = activeTab === 'Food' ? foodCategories : drinkCategories;

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-12 bg-background-light min-h-screen">

            {/* Menu Header with Tabs */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Our Menu</h1>
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setActiveTab('Food')}
                        className={`px-8 py-3 rounded-full font-serif text-xl border-2 transition-all ${activeTab === 'Food' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/10 border-primary'}`}
                    >
                        Food Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('Bar')}
                        className={`px-8 py-3 rounded-full font-serif text-xl border-2 transition-all ${activeTab === 'Bar' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/10 border-primary'}`}
                    >
                        Bar Menu
                    </button>
                </div>
                <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-24">

                {/* Fixed Sidebar for Navigation */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-32">
                        <h3 className="font-serif text-2xl mb-6 text-primary border-b border-primary/20 pb-4">Categories</h3>
                        <nav className="flex flex-col gap-6">
                            {displayCategories.map((cat, idx) => (
                                <a
                                    key={cat.id}
                                    href={`#category-${cat.id}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center group transition-all py-2 rounded-lg ${activeCategory === cat.id ? 'opacity-100 bg-primary/5 pl-4' : 'opacity-60 hover:opacity-100 hover:pl-2'}`}
                                >
                                    <span className="font-serif text-xl tracking-wide text-primary">{cat.name}</span>
                                </a>
                            ))}
                        </nav>

                        <div className="mt-12 pt-8 border-t border-primary/20">
                            <a
                                href="/assets/docs/New Menu.pdf"
                                target="_blank"
                                className="w-full border border-primary text-primary font-serif py-3 rounded flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                            >
                                <Download size={16} />
                                Download PDF Menu
                            </a>
                        </div>
                    </div>
                </aside>

                {/* Menu Content */}
                <div className="flex-1 max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-16"
                        >
                            {displayCategories.map((category) => (
                                <section key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
                                    <div className="mb-10 text-center">
                                        <h2 className="text-4xl font-serif text-primary inline-block relative border-b border-primary pb-2 px-8">
                                            {category.name}
                                        </h2>
                                    </div>

                                    <div className="flex flex-col gap-12">
                                        {category.items.map((item) => (
                                            <div key={item.id} className="group pb-8 border-b border-primary/10 border-dashed last:border-0">
                                                <div className="flex justify-between items-baseline mb-2 gap-4">
                                                    <h3 className="text-xl md:text-2xl font-serif text-primary flex items-center gap-2">
                                                        {item.name}
                                                        {item.is_spicy && (
                                                            <Flame className="text-red-700/80" size={16} fill="currentColor" />
                                                        )}
                                                    </h3>
                                                    <div className="flex-1 border-b border-dotted border-primary/30 mx-4 opacity-50 relative top-[-6px] hidden sm:block"></div>
                                                    <span className="font-serif text-xl text-primary whitespace-nowrap">${item.price}</span>
                                                </div>
                                                <p className="text-primary/70 font-serif italic text-base leading-relaxed max-w-2xl">
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Menu;
