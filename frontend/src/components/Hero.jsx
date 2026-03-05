import { motion, useScroll, useTransform } from 'framer-motion';

function Hero({ onMenuClick, onReservationClick }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(28, 58, 42, 0.4), rgba(107, 58, 42, 0.7)), url("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop")',
                    y: y1,
                    scale: 1.1 // Prevent edges showing during scroll zoom
                }}
            />

            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl"
                style={{ opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <p className="text-white/90 text-lg md:text-2xl font-serif italic mb-6 tracking-wide drop-shadow-md">
                        Spices whisper, dosas crisp, the South calls.
                    </p>
                    <h1
                        className="text-white font-black leading-none tracking-tighter mb-10 drop-shadow-2xl font-display"
                        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                    >
                        THE DOSA SPOT
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                        <button
                            onClick={onReservationClick}
                            className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-background-light transition-all transform hover:scale-105 cursor-pointer shadow-xl"
                        >
                            Reservations
                        </button>
                        <button
                            onClick={onMenuClick}
                            className="bg-transparent border border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all cursor-pointer"
                        >
                            Explore Menu
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
