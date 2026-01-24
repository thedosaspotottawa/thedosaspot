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
            color: 'bg-coffee-bean',
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 rounded-xl my-4">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-coffee-bean mb-2">Order Online</h2>
                <p className="text-slate-grey text-base max-w-2xl mx-auto">
                    Choose your preferred way to order.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {providers.map((provider, index) => (
                    <motion.div
                        key={provider.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg border border-silver/20 hover:shadow-xl transition-shadow"
                    >
                        <div className={`h-1.5 ${provider.color}`} />
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="mb-6">
                                {provider.logo ? (
                                    <div className="w-16 h-16 flex items-center justify-center">
                                        <img src={provider.logo} alt={provider.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className={`p-4 rounded-xl ${provider.color} text-white shadow-md`}>
                                        <provider.icon size={32} />
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-grey text-sm mb-6 h-10">
                                {provider.description}
                            </p>
                            <a
                                href={provider.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm text-white transition-transform hover:scale-105 ${provider.color}`}
                            >
                                {provider.name === 'Phone' ? <Phone size={18} /> : <ShoppingBag size={18} />}
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
