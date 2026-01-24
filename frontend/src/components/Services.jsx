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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 rounded-xl my-4">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-coffee-bean mb-1">Our Services</h2>
                <p className="text-slate-grey text-sm max-w-2xl mx-auto">
                    We offer catering and Private events, call us for best deals.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-xl shadow-md border border-silver/10 overflow-hidden flex flex-col"
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-coffee-bean/5" />
                            <div className="absolute bottom-2 left-2 bg-slate-grey p-1.5 rounded-lg text-white shadow-md">
                                <service.icon size={18} />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-coffee-bean mb-1">{service.title}</h3>
                            <p className="text-slate-grey text-xs mb-2 leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-0.5 mb-2">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-1.5 text-coffee-bean font-medium text-xs">
                                        <Star size={12} className="text-slate-grey" fill="currentColor" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-grey/5 border border-slate-grey/10 rounded-xl p-4 text-center"
            >
                <h3 className="text-xl font-bold text-coffee-bean mb-1">Interested in our services?</h3>
                <p className="text-sm text-slate-grey mb-4">
                    Contact us today for a personalized quote.
                </p>
                <a
                    href="tel:+16471234567"
                    className="inline-flex items-center gap-2 bg-coffee-bean text-white px-5 py-2 rounded-lg font-bold text-base hover:scale-105 transition-transform"
                >
                    <Phone size={18} />
                    Call (647) 123-4567
                </a>
            </motion.div>
        </div>
    );
};

export default Services;
