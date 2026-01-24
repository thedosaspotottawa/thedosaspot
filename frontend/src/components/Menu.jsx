import React from 'react';
import { motion } from 'framer-motion';
import { Flame, FileText } from 'lucide-react';
import LoadingIcon from './LoadingIcon';

function Menu({ categories, isLoading }) {
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <LoadingIcon />
                    <p className="mt-4 text-slate-grey font-medium">Loading menu...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-coffee-bean mb-1"
                    >
                        Explore Our Menu
                    </motion.h2>
                    <div className="w-16 h-1 bg-slate-grey mx-auto rounded-full mb-4" />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <a
                            href="/assets/docs/New%20Menu.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-coffee-bean text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-grey transition-all shadow-md hover:scale-105"
                        >
                            <FileText size={18} />
                            View Full Menu (PDF)
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative h-[200px] rounded-2xl overflow-hidden mb-6 shadow-lg"
                    >
                        <img src="/assets/images/thali.png" alt="South Indian Thali" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-coffee-bean/60 via-transparent to-transparent flex items-bottom p-4">
                            <p className="text-white text-lg font-bold mt-auto max-w-lg text-left italic">
                                "Experience the symphony of flavors with our Signature Thali."
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {categories.map((cat, catIdx) => (
                        <div key={cat.name} className="mb-8">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: catIdx * 0.1 }}
                                className="text-lg font-bold text-coffee-bean mb-4 border-l-4 border-slate-grey pl-3 uppercase tracking-wider"
                            >
                                {cat.name}
                            </motion.h3>

                            <div className="space-y-4 text-sm">
                                {cat.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: itemIdx * 0.05 }}
                                        whileHover={{ x: 5 }}
                                        className="group bg-gray-50/50 rounded-xl p-4 border border-silver/10 hover:border-sunflower/30 transition-all shadow-sm flex justify-between items-center"
                                    >
                                        <div className="flex-grow pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-base font-bold text-coffee-bean group-hover:text-sunflower transition-colors">
                                                    {item.name}
                                                </h4>
                                                {item.spicy && (
                                                    <Flame className="text-red-500" size={14} />
                                                )}
                                            </div>
                                            <p className="text-slate-grey text-sm leading-tight line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="text-coffee-bean font-bold text-sm bg-sunflower/10 px-2 py-1 rounded">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Menu;
