import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function Hero({ onMenuClick, onStoryClick }) {
    return (
        <section className="relative h-[60vh] md:h-[75vh] flex items-center overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-10 right-[-10%] w-[400px] h-[400px] bg-sunflower/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-[-10%] w-[300px] h-[300px] bg-coffee-bean/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-coffee-bean leading-tight mb-2 header-text-regular">
                            Authentic <span className="text-slate-grey">South Indian</span> Flavors
                        </h1>
                        <p className="text-lg text-slate-grey mb-4 max-w-lg">
                            Experience the true art of Dosa making at The Dosa Spot. Hand-crafted crepes, fresh ingredients, and spices from the heart of India.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={onMenuClick}
                                className="bg-coffee-bean text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-grey transition-all group text-base"
                            >
                                Explore Menu
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                            <button
                                onClick={onStoryClick}
                                className="border-2 border-coffee-bean text-coffee-bean px-6 py-3 rounded-full font-bold hover:bg-coffee-bean/5 transition-all text-base"
                            >
                                Our Story
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="relative hidden md:block"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop"
                                alt="Delicious Dosa"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Float Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            className="absolute -top-6 -right-6 bg-sunflower p-6 rounded-2xl shadow-xl z-20"
                        >
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-white">4.6</span>
                                <span className="text-white text-sm font-medium">Customer Rating</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
