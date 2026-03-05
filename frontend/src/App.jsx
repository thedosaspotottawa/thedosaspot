import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reservations from './components/Reservations';
import Admin from './components/Admin';
import Footer from './components/Footer';
import OrderOnline from './components/OrderOnline';
import Services from './components/Services';
import IOSInstallPrompt from './components/IOSInstallPrompt';
import Banner from './components/Banner';
import Specialties from './components/Specialties';
import Galleries from './components/Galleries';
import { LeafyGreen, Salad, Flame } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

import BackgroundPattern from './components/BackgroundPattern';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    // Explicitly check for 'dark' and only use it if it was user-selected
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return 'dark';
    return 'light'; // Default to light
  });
  const [menuData, setMenuData] = useState({ categories: [] });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu`);
        setMenuData(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${API_URL}/banners`);
        setBanners(res.data);
      } catch (err) {
        console.error('Fetch banners error:', err);
      }
    };
    fetchMenu();
    fetchBanners();

    // Auto-refresh when app comes back to focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchMenu();
        fetchBanners();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-primary dark:text-white relative transition-all duration-500">
      <BackgroundPattern theme={theme} />
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Banner messages={banners} />
      </header>
      <IOSInstallPrompt />

      <main className={`flex-grow ${banners.some(b => b.active) ? 'pt-[104px] lg:pt-[104px]' : 'pt-20'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative -mt-20 pt-20"
            >

              <Hero
                onMenuClick={() => setActiveTab('menu')}
                onReservationClick={() => setActiveTab('reservations')}
              />

              {/* Tagline Break */}
              <section className="bg-primary text-background-light py-20 px-4 text-center border-t border-white/10">
                <h2 className="text-3xl md:text-5xl font-serif text-accent drop-shadow-sm mb-4">
                  Four states. One plate. Infinite flavours.
                </h2>
              </section>

              <Specialties />
              <section className="bg-background-light dark:bg-primary/5 py-32 overflow-hidden" id="story">
                <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 size-40 bg-accent/20 rounded-full blur-3xl"></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-6 pt-8">
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
                          <img className="w-full h-full object-cover" alt="Traditional Indian spice market"
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600" />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '1/1' }}>
                          <img className="w-full h-full object-cover" alt="South Indian street food preparation"
                            src="https://images.unsplash.com/photo-1620244675971-d602123cc096?auto=format&fit=crop&q=80&w=600" />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '1/1' }}>
                          <img className="w-full h-full object-cover" alt="Traditional South Indian kitchen setting"
                            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600" />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
                          <img className="w-full h-full object-cover" alt="Fresh organic ingredients bowl"
                            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 text-secondary">
                    <span className="font-bold tracking-[0.2em] text-sm uppercase text-accent">Tradition Meets Excellence</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-primary">Our Journey From The Streets of Chennai</h2>
                    <p className="text-lg leading-relaxed text-primary/80">
                      Started as a small family recipe handed down through three generations, The Dosa Spot was born out
                      of a passion for sharing the true soul of South Indian cuisine.
                      <br /><br />
                      We believe in the slow art of fermentation, the precise sizzle of the stone griddle, and the vibrant
                      kick of hand-ground spices. Every dish we serve is a tribute to the bustling food stalls of Tamil
                      Nadu.
                    </p>
                    <div className="grid grid-cols-2 gap-8 py-4">
                      <div className="flex items-start gap-3">
                        <Salad className="text-accent" />
                        <div>
                          <h4 className="font-bold text-primary">Fresh Daily</h4>
                          <p className="text-sm opacity-70 text-primary">Organic ingredients sourced every morning.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LeafyGreen className="text-accent" />
                        <div>
                          <h4 className="font-bold text-primary">Original Spices</h4>
                          <p className="text-sm opacity-70 text-primary">Ground in-house for maximum aroma.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Page Break Element */}
              <section className="py-16 text-center bg-background-light">
                <div className="flex items-center justify-center gap-6 text-primary font-bold tracking-widest uppercase text-xl md:text-2xl">
                  <span>Spice</span>
                  <span className="text-accent">|</span>
                  <span>Savour</span>
                  <span className="text-accent">|</span>
                  <span>Smile</span>
                </div>
              </section>

              <Galleries />

              {/* Quick Call to Action Banner */}
              <div className="py-8 px-4 bg-background-light pb-20">
                <div
                  className="max-w-[900px] mx-auto bg-primary rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute -right-16 -bottom-16 size-72 bg-white/10 rounded-full"></div>
                  <div className="relative z-10 flex flex-col gap-2">
                    <h2 className="text-white text-3xl md:text-4xl font-black">Hungry for more?</h2>
                    <p className="text-white/90 text-lg">Order online now and get 15% off your first delivery.</p>
                  </div>
                  <div className="relative z-10 flex gap-4">
                    <button
                      onClick={() => setActiveTab('order')}
                      className="bg-white text-primary px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:bg-background-light transition-all whitespace-nowrap cursor-pointer">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Menu categories={menuData.categories} isLoading={isLoading} />
            </motion.div>
          )}

          {activeTab === 'order' && (
            <motion.div
              key="order"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <OrderOnline />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Services />
            </motion.div>
          )}

          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Reservations />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Admin />
            </motion.div>
          )}
        </AnimatePresence>
      </main >

      {activeTab === 'home' && <Footer showMap={true} />
      }
    </div >
  );
}

export default App;
