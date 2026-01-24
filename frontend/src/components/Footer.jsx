import React from 'react';
import { Mail, Phone, MapPin, Instagram, Map, Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

function Footer({ showMap }) {
    const { isInstallable, installPWA, isStandalone, isIOS } = usePWA();
    return (
        <footer className="bg-coffee-bean text-white pt-6 pb-6">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10 mb-8">
                    <div className="flex items-center gap-3">
                        <img src="/android-chrome-512x512.png" alt="Dosa Spot Logo" className="w-12 h-12 rounded-full bg-white object-contain shadow-sm" />
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-white leading-none header-text-regular">
                                The Dosa <span className="text-sunflower">Spot</span>
                            </span>
                            <span className="text-xs font-medium text-silver/80 uppercase tracking-[0.3em] w-full text-center border-t border-silver/20 mt-1 pt-1 leading-none">
                                Ottawa
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/the_dosaspot_ottawa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-sunflower-yellow hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://maps.app.goo.gl/WMnuVqZLdb7vGn3M8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-sunflower-yellow hover:text-white transition-all">
                                <Map size={20} />
                            </a>
                        </div>

                        {isInstallable && !isStandalone && !isIOS && (
                            <button
                                onClick={installPWA}
                                className="flex items-center gap-2 bg-sunflower text-coffee-bean px-5 py-2.5 rounded-full font-bold hover:bg-sunflower/90 transition-all text-sm animate-bounce shadow-lg"
                            >
                                <Download size={18} />
                                Install App
                            </button>
                        )}
                    </div>
                </div>
                <div className={`grid grid-cols-1 ${showMap ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 mb-8`}>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-sunflower">Contact Info</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-3 text-silver/80 items-start">
                                <MapPin className="text-sunflower flex-shrink-0 mt-0.5" size={18} />
                                895 Bank St, Ottawa, ON K1S 3W4
                            </li>
                            <li className="flex gap-3 text-silver/80 items-center">
                                <Phone className="text-sunflower flex-shrink-0" size={18} />
                                +1 613-233-7739
                            </li>
                            <li className="flex gap-3 text-silver/80 items-center">
                                <Mail className="text-sunflower flex-shrink-0" size={18} />
                                hello@thedosaspot.ca
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-sunflower">Opening Hours</h4>
                        <ul className="space-y-2 text-silver/80 text-sm">
                            <li className="flex justify-between">
                                <span>Mon - Thu</span>
                                <span>11 AM - 9 PM</span>
                            </li>
                            <li className="flex justify-between font-bold text-white border-y border-white/10 py-1">
                                <span>Fri - Sat</span>
                                <span>11 AM - 11 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>11 AM - 10 PM</span>
                            </li>
                        </ul>
                    </div>
                    {showMap && (
                        <div>
                            <div className="rounded-xl overflow-hidden border border-white/10 h-32 w-full shadow-md">
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
                <div className="border-t border-white/5 pt-6 text-center text-silver/60 text-xs">
                    <p>© {new Date().getFullYear()} The Dosa Spot. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
