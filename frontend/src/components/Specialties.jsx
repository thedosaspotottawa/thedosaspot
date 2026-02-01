import React from 'react';
import { motion } from 'framer-motion';

const specialties = [
    {
        id: 1,
        title: 'Classic Masala Dosa',
        description: 'Spiced potato filling encased in a golden, crispy fermented rice crepe.',
        price: '$12.95',
        image: '/assets/images/masala-dosa.jpg'
    },
    {
        id: 2,
        title: 'Cheese Chili Dosa',
        description: 'Savory crepe filled with melted cheese and fresh green chilies.',
        price: '$14.50',
        image: '/assets/images/cheese-dosa.jpg'
    },
    {
        id: 3,
        title: 'Mixed Thali',
        description: 'A complete traditional meal with variety of curries, bread and rice.',
        price: '$18.25',
        image: '/assets/images/thali.png'
    },
    {
        id: 4,
        title: 'Mango Lassi',
        description: 'Traditional Punjabi recipe of creamy yogurt whisked with ripe mangoes.',
        price: '$6.50',
        image: '/assets/images/mango-lassi.jpg'
    }
];

function Specialties() {
    return (
        <section className="py-24 max-w-[1200px] mx-auto overflow-hidden relative" id="specialties">
            <div className="flex flex-col items-center mb-16 px-4 text-center relative z-10">
                <span className="text-secondary font-bold tracking-[0.3em] text-sm uppercase mb-3">Our Specialties</span>
                <h2 className="text-5xl font-black mb-4 text-primary dark:text-accent drop-shadow-sm">Signature Dishes</h2>
                <div className="h-1.5 w-24 bg-accent rounded-full shadow-sm"></div>
            </div>

            <div className="flex overflow-x-auto pb-12 px-4 gap-8 no-scrollbar snap-x relative z-10">
                {specialties.map((dish) => (
                    <motion.div
                        key={dish.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: dish.id * 0.1 }}
                        className="flex-none w-80 snap-center group"
                    >
                        <div className="bg-white/40 backdrop-blur-md dark:bg-primary/20 p-4 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl transition-all hover:bg-white/60 dark:hover:bg-primary/30">
                            <div className="h-64 rounded-[2rem] overflow-hidden mb-6 relative shadow-inner">
                                <img
                                    src={dish.image}
                                    alt={dish.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-2 text-primary dark:text-white group-hover:text-secondary transition-colors tracking-tight">{dish.title}</h3>
                            <p className="text-primary/70 dark:text-text-muted text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                                {dish.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Specialties;
