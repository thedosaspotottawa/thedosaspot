import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, Phone, Star } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'Catering',
            description: 'Make your events memorable with our authentic South Indian catering. From small gatherings to large celebrations.',
            icon: Utensils,
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop',
            details: ['Customizable Menus', 'On-site Dosa Station', 'Professional Service']
        },
        {
            title: 'Private Events',
            description: 'Host your private parties, birthdays, or corporate events at Dosa Spot. We provide a cozy and vibrant atmosphere.',
            icon: Users,
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
            details: ['Up to 50 Guests', 'Personalized Decor', 'Audio/Visual Support']
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 rounded-xl relative z-10">
            <div className="text-center mb-16">
                <span className="text-secondary font-bold tracking-[0.3em] text-sm uppercase mb-3 block">Elevated Events</span>
                <h2 className="text-5xl font-black text-primary dark:text-accent mb-4 drop-shadow-sm">Our Services</h2>
                <div className="h-1.5 w-24 bg-accent mx-auto rounded-full shadow-sm"></div>
                <p className="mt-8 text-primary/70 dark:text-text-muted text-xl max-w-2xl mx-auto font-medium">
                    From intimate gatherings to massive celebrations, we bring the authentic soul of the South to you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/40 backdrop-blur-md dark:bg-primary/20 rounded-[3rem] shadow-xl border border-white/20 dark:border-white/5 overflow-hidden flex flex-col group"
                    >
                        <div className="h-64 overflow-hidden relative">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all" />
                            <div className="absolute bottom-6 left-6 bg-accent p-4 rounded-2xl text-primary shadow-2xl">
                                <service.icon size={28} />
                            </div>
                        </div>
                        <div className="p-10 flex flex-col justify-center">
                            <h3 className="text-3xl font-black text-primary dark:text-white mb-4 tracking-tight">{service.title}</h3>
                            <p className="text-primary/70 dark:text-text-muted text-base mb-8 leading-relaxed font-medium">
                                {service.description}
                            </p>
                            <ul className="space-y-4 mb-2">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-primary dark:text-white font-black text-base">
                                        <div className="size-3 rounded-full bg-accent shadow-sm" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="py-2 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-[900px] mx-auto bg-primary rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute -right-16 -bottom-16 size-72 bg-white/10 rounded-full" />
                    <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
                        <h3 className="text-white text-3xl md:text-4xl font-black">Interested in our services?</h3>
                        <p className="text-white/90 text-lg">Our events team is ready to curate the perfect experience for your guests.</p>
                    </div>
                    <div className="relative z-10">
                        <a
                            href="tel:+16132337739"
                            className="bg-white text-primary px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:bg-background-light transition-all whitespace-nowrap inline-block"
                        >
                            Call Us Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
