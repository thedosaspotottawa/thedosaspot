import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Users, Utensils, Clock, Flame, Award, Heart } from 'lucide-react';

function Story({ setActiveTab, onMenuClick }) {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const chefs = [
        {
            name: "Executive Chef K. Murali",
            experience: "30+ Years Experience",
            role: "Traditional Tawa Master",
            description: "Guardian of our family's secret spice ratios and master of traditional tawa techniques.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjwINvzNG7lGqtXWyYNzY8qj3n6DrAfE5HWn103g-dFDWw8i2BGSSYrR6hHrBonH4Zeu9CYlXBHj5cTdcUj0xaFL_1Y8zH-7Y7azI9G8IB8HoFGl8nTWsWsyc_0me5rVsWk38FFFFo8qc5KTSrRSeOSW9PiiHQOjpumk9tAWzT2hdhPHgskkYhEVn54fnMkY-a6Jl7b7X7ZD80KZz9jXyUB_RtWC5PInFkQP0hV8rb0rL9ASJnObDzcVFrRnoB8w3DXJACllOJ0dWC"
        },
        {
            name: "Chef Lakshmi Rao",
            experience: "Batter Specialist",
            role: "Science of Fermentation",
            description: "Ensures every batch of batter meets our heritage standards through precise fermentation science.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPqd3bdAznGRbKnjl_snLc5MBeh6q-Y-4LUMDZte9ETB0MVidNoCrP9bA36dVpeavguaiIfyWyh1uyxOC3X5dDr9YORKb-59C1UIxAynn8W5gxPIjNJ0cpREyo6Bu2Rm-iyztNd325ACmpghljnuOFiov5QkhE-LjTmkH3L9ZwqmLJ545SsKHJ0FdrdkHByav_FZu7Dkif9DrOCALPRQfbg7q7cl_H3QBaZ2-A_U7UeUFYFgjqRVd4WJOhf5bs6ikXfyh-PKa_hQU6"
        },
        {
            name: "Chef Sanjay Das",
            experience: "Chutney Maestro",
            role: "Fresh Flavor Wizard",
            description: "Crafts our vibrant coconut, tomato, and mint accompaniments using fresh, local ingredients.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9D0B2UZiCpofbLFILlamAFTiXY3REbCfTBV8D8kz9xTR1EScxcmfIWhknJCBy6ocHGf_a_pA2p3yYQIWl3um5op87QvR2QgugWaRIAh5Fs429vs3v7ZqpovEfLaBHQLjfWY12POi4bF6U1LJfMBpJHLMXI9cC_0hFYczvrtQVrMkV4YDp1lPs0oxL_p_DytG_Wqm7G6aR44-sfmAs9jLujDG-0InV_6hs_H05yd8zFwzA_Ob2By5dEr66Lm6FdgD7Spk-eGA8dCr6"
        }
    ];

    return (
        <section className="relative overflow-hidden" id="story">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(22, 41, 29, 0.4) 0%, rgba(22, 41, 29, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDypGtqYAPJ_LFXLoU0_gys9xjK6d2ZDkP1GdfKmfv9SNT7-GH4iOefCaYxwhQGeiavM-guVNTy-u_0-o_EOcUUKEC_f0R8bio1dEpPbnliIAeEplaq3I_nOI48vPGmZJOSWmSxXrfhdVsyg3zVfsevxtUsVDs2PX-FpE7aqH0XJVkDXNNoiusl3oVn-maPOwiRJM1I1YS8pHwTDfQ68UCkUI7YHwkl2HuyDgNzE9PCBMC8amnP63DQUs1ZbjT4wkOsNiGnmgCyC9Wb")`
                    }}
                />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl"
                    >
                        Our Heritage & <span className="text-accent">Story</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Traditional spice grinding and authentic South Indian flavors passed down through generations of culinary masters.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
                        className="mt-12"
                    >
                        <ChevronDown className="text-white mx-auto" size={40} />
                    </motion.div>
                </div>
            </div>

            {/* Our Roots Section */}
            <div className="py-24 px-4 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div {...fadeIn} className="flex flex-col gap-6">
                        <span className="text-accent font-black tracking-[0.3em] uppercase text-xs">Est. 1982</span>
                        <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight">Our Roots</h2>
                        <div className="h-1 w-20 bg-accent mb-4" />
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed font-medium">
                            <p>
                                Bringing family recipes from the heart of South India to your plate. Our journey began in a modest kitchen where the rhythmic sound of the stone grinder was the daily soundtrack.
                            </p>
                            <p>
                                Every spice blend we use today is based on the exact proportions perfected by our grandmother forty years ago. We believe that true flavor can't be rushed; it’s a commitment to authenticity and the search for the perfect harvest.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 group">
                            <div className="h-[2px] w-12 bg-accent group-hover:w-20 transition-all duration-500"></div>
                            <span className="italic text-xl text-accent font-bold">The legacy continues</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] bg-cover bg-center shadow-2xl border-8 border-white dark:border-primary/20 overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChI0lLrRBnRR4ttxytseUtD6Qi1EvvFFe-GE6FvUewXhyZjCf5X6W4GNFVMx89IK2D5hufqkvVn8Q8NXtirxJhpM_YGmRdNyF_Ed3m4XVJl7W9POHdSfWq5Cj1O2rznf_QHy9-iVO17mmYzsFMq1X79sOLJQyyN2TbpZnE0CIWY4BFUQ8mjCVwnrKyPbL6Y79hbSrqMs6_et3Vaerb0hLR4NrqxbH1J1T24u5RMu8lIFhqeVyK_p6qeZWvUXeFDJvAL-Jo9iLEDC2_"
                                alt="Heritage"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-primary p-10 rounded-[2rem] text-white shadow-2xl hidden md:block border border-white/10">
                            <p className="text-5xl font-black mb-1">40+</p>
                            <p className="text-xs uppercase font-black tracking-widest text-accent">Years of Tradition</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* The Art of the Dosa Section */}
            <div className="py-24 bg-primary/5 dark:bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1200px] mx-auto px-4">
                    <motion.div {...fadeIn} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">The Art of the Dosa</h2>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                        <p className="mt-8 text-xl text-primary/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            A perfect dosa requires patience, the right fermentation, and a master's touch on the hot tawa.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Process Steps */}
                        {[
                            {
                                title: "12-Hour Fermentation",
                                desc: "Our batter rests for exactly 12 hours to achieve that signature tang and airy texture that distinguishes an authentic Dosa.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsv99vaGtnuLAfA51Z1PoOa_GcF5HcnV1PjTlkahHNxWY3Mvg7MPQmIhjwOYOh7bf8tYm44uwGAOzaUwAHBVmz9IHfi_319nrdCfQ033BT48l0gSqzACB3xpJpt6Wl9OmAFzSCZqZPKj8bZDjsy9HfKYfwtnWjEP0vkZUfVb3CBLmRHJ2In3BSxfFgYX9r_AlZ256-27b7iQGlzjo9VuJ5wFVq72R5ZW0qHorXQEMLBWEQwFkpwfLZd8ERfB_uACqJqc-yrea9kuIe",
                                icon: <Clock size={20} />
                            },
                            {
                                title: "Precision Spreading",
                                desc: "Our chefs train for months to master the spiral spread—ensuring a paper-thin center and golden, crispy edges.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX2ylEvspC02DWAoCpzVl8LcllC0sazbBr80hAxnbEBe5m1-02pnEQZgyORr6p3p9dsSYAgmJep2AITwVX86yhJtvOqTeDzRPr8YSKChH1wcaKG0eQvN3CjPVAwkNdQP5jL08l9MivX2evZHwOraMY2P_Ln7POe7Sl82L7SACzUhbdDF1_QnUoqjXtV8zRtOe1_Ja504Mz-A7dy1OpQhLarwKfwKeIujE-WsxDDQgPxo1njiic3KUJf4jTp2DrhjSvlAv9hT-EGUTd",
                                icon: <Flame size={20} />
                            },
                            {
                                title: "The Golden Finish",
                                desc: "We use hand-churned ghee to finish every dosa, creating a rich aroma and that unmistakable signature crunch.",
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsxVz7YYZYose37vLlF-hrNXEdOmTM0sYLKVm1TDjS-QViRkNxrMhAwZtiKwc-J8VM6ebNHeyKkZz3p5kSWAKvGlzfcL78G9F8pYmXOPWykQFSLsa0XZatHIknrY5PylhFRSjNNBkSy35yrbwLCEjGpCjsoq1Qk-Sd9m6YTUrN9RK0dgaGxXEQzxfynwrU57qd7sr05xbr-6ySeNVhjcTib85U2HvhwOUh3oEGjrd_eRuBGnA62Im5bh_C7J7LsxWGMyeD7OUGp3xV",
                                icon: <Award size={20} />
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 shadow-xl group hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="aspect-video overflow-hidden rounded-[1.5rem] mb-6">
                                    <img
                                        src={step.img}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt={step.title}
                                    />
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-primary tracking-tight">{step.title}</h3>
                                    </div>
                                    <p className="text-primary/60 font-medium leading-relaxed leading-snug">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meet the Chefs Section */}
            <div className="py-24 px-4 max-w-[1200px] mx-auto">
                <motion.div {...fadeIn} className="flex items-center justify-between mb-16 px-4">
                    <h2 className="text-4xl font-black text-primary tracking-tighter">Meet the Chefs</h2>
                    <div className="h-[2px] flex-1 mx-8 bg-primary/10"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {chefs.map((chef, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-8 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/20 hover:bg-white/60 transition-colors"
                        >
                            <div className="size-48 rounded-full overflow-hidden mb-8 border-4 border-accent p-2 shadow-2xl">
                                <img
                                    src={chef.image}
                                    className="w-full h-full rounded-full object-cover"
                                    alt={chef.name}
                                />
                            </div>
                            <h4 className="text-2xl font-black text-primary mb-1">{chef.name}</h4>
                            <p className="text-accent font-black uppercase text-xs tracking-widest mb-4 italic">{chef.experience}</p>
                            <p className="text-primary/60 font-medium text-sm leading-relaxed max-w-[250px]">
                                {chef.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-[900px] mx-auto bg-primary rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/10"
                >
                    <div className="absolute -right-16 -bottom-16 size-64 bg-white/10 rounded-full" />

                    <div className="relative z-10 flex flex-col gap-4 text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                            Taste the <span className="text-accent">Tradition</span> Today
                        </h2>
                        <p className="text-white/80 text-base md:text-lg max-w-xl font-light leading-relaxed">
                            We invite you to join us and become a part of our continuing story. Experience the flavors that have traveled through time.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
                        <button
                            onClick={() => setActiveTab('reservations')}
                            className="h-14 px-8 bg-accent text-primary font-black text-lg rounded-xl hover:scale-105 transition-all shadow-xl whitespace-nowrap"
                        >
                            Book a Table
                        </button>
                        <button
                            onClick={onMenuClick}
                            className="h-14 px-8 border-2 border-white/30 text-white font-black text-lg rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg whitespace-nowrap"
                        >
                            View Menu
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Story;
