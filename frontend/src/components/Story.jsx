import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Landmark, MapPin, Award } from 'lucide-react';

const Story = ({ onMenuClick }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-xl my-4 min-h-[60vh]">
            {/* Semi-transparent white overlay for better text visibility */}
            <div className="fixed inset-0 bg-white/80 z-[-1]" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 relative"
                >
                    <div className="absolute -inset-2 bg-slate-grey/5 rounded-2xl blur-xl -z-10" />
                    <img
                        src="/assets/images/our-story.png"
                        alt="Our Story"
                        className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5] lg:aspect-auto"
                    />
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-silver/20">
                        <p className="text-coffee-bean font-bold text-sm flex items-center gap-2">
                            <Heart className="text-red-500 fill-red-500" size={14} />
                            Founded 2018
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-1/2"
                >
                    <h2 className="text-3xl font-bold text-coffee-bean mb-3">Our Journey</h2>
                    <div className="space-y-3 text-sm text-slate-grey leading-relaxed">
                        <p>
                            Our story began in the vibrant streets of South India, where the aroma of freshly made dosas and the sound of sizzling tawas were part of our daily lives. As a young couple with a passion for authentic flavors, we dreamt of one day sharing our heritage with the world.
                        </p>
                        <p>
                            In 2014, we moved to Canada. Armed with family recipes passed down through generations, we started our journey in a small kitchen, catering to friends and the local community.
                        </p>
                        <p>
                            The love and support we received inspired us to open <span className="text-coffee-bean font-bold">Dosa Spot</span>. It was about fulfilling a lifelong dream of bringing the true essence of South Indian cuisine to our new home.
                        </p>
                        <p>
                            Today, Dosa Spot is a testament to perseverance and hard work. Every dosa we serve is made with the same love and authenticity that we grew up with.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-grey/5 rounded-lg text-coffee-bean">
                                <Landmark size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-coffee-bean text-sm">Authentic</h4>
                                <p className="text-xs">Family Recipes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-grey/5 rounded-lg text-coffee-bean">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-coffee-bean text-sm">Local</h4>
                                <p className="text-xs">Community Driven</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-coffee-bean text-white rounded-2xl p-6 lg:p-8 text-center relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-2 opacity-5">
                    <Award size={100} />
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">Sharing the joy of Dosa.</h3>
                <p className="text-base text-silver/80 max-w-2xl mx-auto mb-4 relative z-10">
                    We invite you to be a part of our story. Come and experience the flavors that define us.
                </p>
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        onMenuClick();
                    }}
                    className="bg-white text-coffee-bean px-6 py-2 rounded-lg font-bold text-base hover:scale-105 transition-transform shadow-md"
                >
                    View Our Menu
                </button>
            </motion.div>
        </div>
    );
};

export default Story;
