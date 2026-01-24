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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

import BackgroundPattern from './components/BackgroundPattern';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuData, setMenuData] = useState({ categories: [] });
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
    <div className="min-h-screen flex flex-col text-coffee-bean relative">
      <BackgroundPattern />
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
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
              {/* Semi-transparent white overlay for better text visibility */}
              <div className="absolute inset-0 bg-white/80 z-[1] pointer-events-none" />
              <Hero onMenuClick={() => setActiveTab('menu')} onStoryClick={() => setActiveTab('story')} />
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
              <Story onMenuClick={() => setActiveTab('menu')} />
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
