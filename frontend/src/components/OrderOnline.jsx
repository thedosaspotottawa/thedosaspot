import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ExternalLink, ShoppingBag } from 'lucide-react';

const OrderOnline = () => {
    const providers = [
        {
            name: 'Phone',
            description: 'Call us directly to place your order for pickup.',
            link: 'tel:+16132337739',
            icon: Phone,
            color: 'bg-primary',
            label: 'Call Now'
        },
        {
            name: 'Uber Eats',
            description: 'Get your favorite dosas delivered to your doorstep.',
            link: 'https://www.ubereats.com/ca/store/the-dosa-spot/jD8HHm1DQv2iA-euMo3XFg',
            logo: '/assets/images/uber-eats-logo.png',
            color: 'bg-[#06C167]',
            label: 'Order on Uber Eats'
        },
        {
            name: 'SkipTheDishes',
            description: 'Quick and easy delivery with Skip.',
            link: 'https://www.skipthedishes.com/the-dosa-spot',
            logo: '/assets/images/skip-the-dishes-logo.png',
            color: 'bg-[#FF8800]',
            label: 'Order on Skip'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-xl relative z-10">
            <div className="text-center mb-10">
                <span className="text-secondary font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Quick & Easy</span>
                <h2 className="text-4xl font-black text-primary dark:text-accent mb-3 drop-shadow-sm">Order Online</h2>
                <div className="h-1.5 w-16 bg-accent mx-auto rounded-full shadow-sm"></div>
                <p className="mt-6 text-primary/70 dark:text-text-muted text-lg max-w-xl mx-auto font-medium">
                    Freshly made South Indian flavors, delivered straight to your door.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {providers.map((provider, index) => (
                    <motion.div
                        key={provider.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/40 backdrop-blur-md dark:bg-primary/20 rounded-3xl shadow-xl border border-white/20 dark:border-white/5 hover:shadow-2xl transition-all h-full flex flex-col group overflow-hidden"
                    >
                        <div className={`h-2 ${provider.color}`} />
                        <div className="p-8 flex flex-col items-center text-center flex-1">
                            <div className="mb-6 rounded-2xl group-hover:scale-105 transition-transform duration-500">
                                {provider.logo ? (
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <img src={provider.logo} alt={provider.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className={`text-primary dark:text-accent`}>
                                        <provider.icon size={40} />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-primary dark:text-white mb-2 tracking-tight">{provider.name}</h3>
                            <p className="text-primary/70 dark:text-text-muted text-sm mb-8 leading-relaxed font-medium">
                                {provider.description}
                            </p>
                            <a
                                href={provider.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black text-sm text-white transition-all transform hover:scale-105 shadow-lg ${provider.color}`}
                            >
                                {provider.name === 'Phone' ? <Phone size={20} /> : <ShoppingBag size={20} />}
                                {provider.label}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrderOnline;
