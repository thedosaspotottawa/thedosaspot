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
import Story from './components/Story';
import IOSInstallPrompt from './components/IOSInstallPrompt';
import Banner from './components/Banner';
import Specialties from './components/Specialties';
import { LeafyGreen, Salad } from 'lucide-react';

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
              <Specialties />
              <section className="bg-[#FFF9F2] dark:bg-leaf-green/20 py-24 overflow-hidden" id="story">
                <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 size-40 bg-turmeric/20 rounded-full blur-3xl"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4 pt-8">
                        <div className="rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
                          <img className="w-full h-full object-cover" alt="Traditional Indian spice market"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGZD4b3yGO1XnNiyT51WOIVYfbDz29YMQEjB_S3V46j3_UaGtVsC7mBNsVre_vWF3j_rHCpeNSbkKkjOZWEU51b7PTVjX2KdEbW-PI4pcjnOj93SBVX7L7_ffJ2Y7GiyR2xoaN84O8RVyZ9Lat392ZBo3G6_fwRtBgDqoh2xWIQQMSL-BUy3HQwZuvokjMJb5d3nXm2b6kAZ84B05Sq3NIrxKoKNWtUEE9oPyF-2MO9PZUsdUehID5AlFkBeYZ3vZ9b4IKj5sOjrsX" />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '1/1' }}>
                          <img className="w-full h-full object-cover" alt="South Indian street food preparation"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTNz7HSo0yi3tt2SuY5-VT3oYpbnH68TThu1rFMQBzWYKY9oBNctT1wOOdHdX0GixT4uFCKJAPhiZ4T9quPqjdA-LhFm65BnVeZykXwMP8DJZoksxG_jKO5_dSq9nl_dUHSKv9mSpgsOA1cGUn6egqedKKudTkgETaElteQfrOH4ekvDsfe1wAplmrB8FFpyOBhIOX87ZILiqroRM7DESEBLh_ZmBa6s779a6Dj5cSwDgiyT3myHcJv9JttWaLVStDF16wX3LbqGiW" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '1/1' }}>
                          <img className="w-full h-full object-cover" alt="Traditional South Indian kitchen setting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTZ1jur2c8-tqwYtq92GyBU3SwoBHSis3BUCKxl-UFhNhhur1lQ8NyTuEtRpYmpusNS6cRaAxA77G36PjtuuAdyYAluCV6hckXACKzTcfa1eKlXnXo6qZJB4Dthr8XGbvOb4NCX2lyO-6Oae6_E-bH5a8FX5Ea8-ZRlwvftaVF3Q1Ftl6H95IDuVqT2kqPAXWrs7W9_sGUvU2JVQS2BESI2HbPi2XHTQi25mpZdNiYbw4WASQSpikhWnfT5HmvyLhu90GOgSpD5Zg4" />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
                          <img className="w-full h-full object-cover" alt="Fresh organic ingredients bowl"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAAFC5AFwfQkrNkd-Wx225jZmAAREnVLtr_nACe9AVJDM8BZhpJpvdHOXm1WCHrWtqUMnXk2LfJTQHEe25-AiyslUNyCVtf9IRNkPLTl3DRYoxjRGzsSfWisTWjWQtA3GAntHqlgkkxglbKjO4uibCB8liLoWY1uK2RNDxelWXHkdpbINRK1lq_fgpg8i9UAHm7WC4WkrEyineqlYSQXgHhnjzHPO2i6y3oOFBSSNSn4nP_8Uag7MS2UBM3fvQ236EU6LEuisPFOGH" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 text-secondary">
                    <span className="font-bold tracking-[0.2em] text-sm uppercase">Tradition Meets
                      Excellence</span>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight text-leaf-green">Our Journey
                      From The Streets of Chennai</h2>
                    <p className="text-lg leading-relaxed">
                      Started as a small family recipe handed down through three generations, The Dosa Spot was born out
                      of a passion for sharing the true soul of South Indian cuisine.
                      <br /><br />
                      We believe in the slow art of fermentation, the precise sizzle of the stone griddle, and the vibrant
                      kick of hand-ground spices. Every dish we serve is a tribute to the bustling food stalls of Tamil
                      Nadu.
                    </p>
                    <div className="grid grid-cols-2 gap-8 py-4">
                      <div className="flex items-start gap-3">
                        <Salad />
                        <div>
                          <h4 className="font-bold">Fresh Daily</h4>
                          <p className="text-sm opacity-70">Organic ingredients sourced every morning.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <LeafyGreen />
                        <div>
                          <h4 className="font-bold">Original Spices</h4>
                          <p className="text-sm opacity-70">Ground in-house for maximum aroma.</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('story')}
                      className="w-fit bg-leaf-green text-white dark:bg-primary px-10 py-4 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer">
                      Read Our Full Story
                    </button>
                  </div>
                </div>
              </section>
              {/* Quick Call to Action Banner */}
              <div className="py-16 px-4">
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

          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Story
                setActiveTab={setActiveTab}
                onMenuClick={() => setActiveTab('menu')}
              />
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
      </main>

      {activeTab === 'home' && <Footer showMap={true} />}
    </div>
  );
}

export default App;
