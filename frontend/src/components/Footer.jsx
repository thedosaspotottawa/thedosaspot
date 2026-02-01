import React from 'react';
import { Mail, Phone, MapPin, Instagram, Map, Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

function Footer({ showMap }) {
    const { isInstallable, installPWA, isStandalone, isIOS } = usePWA();
    return (
        <footer className="bg-primary text-white pt-12 pb-8 border-t border-accent/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10 mb-8">
                    <div className="flex items-center gap-3">
                        <img src="/android-chrome-512x512.png" alt="Dosa Spot Logo" className="w-12 h-12 rounded-full border border-accent/30 bg-white object-contain shadow-sm" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white leading-none tracking-tight">
                                The Dosa Spot
                            </span>
                            <span className="text-[10px] text-accent font-black uppercase tracking-widest mt-1">Authentic Flavors</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/the_dosaspot_ottawa/" target="_blank" rel="noopener noreferrer" className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all shadow-inner">
                                <Instagram size={18} />
                            </a>
                            <a href="https://maps.app.goo.gl/WMnuVqZLdb7vGn3M8" target="_blank" rel="noopener noreferrer" className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all shadow-inner">
                                <Map size={18} />
                            </a>
                        </div>

                        {isInstallable && !isStandalone && !isIOS && (
                            <button
                                onClick={installPWA}
                                className="flex items-center gap-2 bg-accent text-primary px-6 py-2.5 rounded-full font-black hover:bg-white transition-all text-xs shadow-xl"
                            >
                                <Download size={16} />
                                Install App
                            </button>
                        )}
                    </div>
                </div>
                <div className={`grid grid-cols-1 ${showMap ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-12 mb-12`}>

                    <div>
                        <h4 className="text-xs font-black mb-6 text-accent uppercase tracking-[0.2em]">Contact Info</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex gap-4 text-white/70 items-start">
                                <MapPin className="text-accent flex-shrink-0" size={18} />
                                895 Bank St, Ottawa, ON K1S 3W4
                            </li>
                            <li className="flex gap-4 text-white/70 items-center">
                                <Phone className="text-accent flex-shrink-0" size={18} />
                                +1 613-233-7739
                            </li>
                            <li className="flex gap-4 text-white/70 items-center">
                                <Mail className="text-accent flex-shrink-0" size={18} />
                                hello@thedosaspot.ca
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black mb-6 text-accent uppercase tracking-[0.2em]">Opening Hours</h4>
                        <ul className="space-y-3 text-white/60 text-sm font-light">
                            <li className="flex justify-between">
                                <span>Mon - Thu</span>
                                <span className="text-white font-medium">11 AM - 9 PM</span>
                            </li>
                            <li className="flex justify-between text-accent font-bold py-1">
                                <span>Fri - Sat</span>
                                <span className="font-black">11 AM - 11 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-white font-medium">11 AM - 10 PM</span>
                            </li>
                        </ul>
                    </div>
                    {showMap && (
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-white/10 h-32 w-full shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    id="gmap_canvas_small"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.4298064005925!2d-75.68925622368776!3d45.40067177107303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce057a20925109%3A0x683be92436e3e624!2sThe%20Dosa%20Spot!5e0!3m2!1sen!2sca!4v1769225026672!5m2!1sen!2sca"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    title="Dosa Spot Location Small"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="border-t border-white/5 pt-8 text-center text-white/30 text-[10px] font-bold tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} The Dosa Spot. Authentic Flavors, Modern Kitchen.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
