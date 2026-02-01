import { motion } from 'framer-motion';

function Hero({ onMenuClick, onReservationClick }) {
    return (
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
            {/* Rich Overlay for better contrast */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'linear-gradient(rgba(45, 30, 18, 0.7), rgba(45, 30, 18, 0.9)), url("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop")',
                }}
            />

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-white text-5xl md:text-8xl font-black leading-tight tracking-tighter mb-4 drop-shadow-2xl font-display">
                        The Dosa Spot
                    </h1>
                    <p className="text-accent text-xl md:text-3xl font-black mb-10 max-w-2xl mx-auto drop-shadow-lg tracking-wide">
                        AUTHENTIC SOUTH INDIAN FLAVORS IN OTTAWA
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={onMenuClick}
                            className="bg-accent text-primary px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_30px_rgba(229,184,46,0.3)] transition-all transform hover:scale-105 cursor-pointer"
                        >
                            Explore Our Menu
                        </button>
                        <button
                            onClick={onReservationClick}
                            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-primary transition-all transform hover:scale-105 cursor-pointer"
                        >
                            Book a Table
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Action Badge - Optional but nice to keep */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 right-10 hidden md:block"
            >
                <div className="bg-primary/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl text-white text-center border border-white/20">
                    <span className="block text-3xl font-bold">4.8</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Rating</span>
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
