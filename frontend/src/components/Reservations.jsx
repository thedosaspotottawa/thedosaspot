import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, Send, CheckCircle2, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Navigation, Utensils, PartyPopper } from 'lucide-react';
import axios from 'axios';
import LoadingIcon from './LoadingIcon';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Reservations() {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '18:00',
        guests: '2',
        special_requests: '',
        booking_type: 'table',
        venue: '',
        budget: '',
        event_type: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post(`${API_URL}/reservations/`, {
                ...formData,
                guests: parseInt(formData.guests)
            });
            setStatus('success');
        } catch (error) {
            console.error('Reservation error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/60 backdrop-blur-md dark:bg-primary/20 p-12 rounded-[2.5rem] shadow-2xl border border-accent/20"
                >
                    <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-primary dark:text-accent mb-4">Request Sent!</h2>
                    <p className="text-primary/60 dark:text-text-muted mb-8 text-lg">
                        Your {formData.booking_type} request has been sent. You will receive a confirmation shortly.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="bg-primary text-white dark:bg-accent dark:text-primary px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                        Make Another Booking
                    </button>
                </motion.div>
            </div>
        );
    }

    const bookingTypes = [
        { id: 'table', label: 'Table Reservation', icon: Users },
        { id: 'catering', label: 'Catering Service', icon: Utensils },
        { id: 'private', label: 'Private Event', icon: PartyPopper }
    ];

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {/* Page Heading */}
            <div className="mb-16 text-center">
                <h1 className="text-primary dark:text-accent text-3xl md:text-5xl font-black leading-tight tracking-tighter mb-2">Visit & Reserve</h1>
                <div className="h-1.5 w-24 bg-accent mx-auto mb-8 rounded-full"></div>
                <p className="text-primary/60 dark:text-text-muted text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                    Experience authentic South Indian flavors. Choose your service type below to start your journey.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Reservation Form Column */}
                <div className="lg:col-span-12 xl:col-span-6 flex flex-col gap-8">
                    <div className="bg-white/60 backdrop-blur-md dark:bg-primary/20 p-8 rounded-[1rem] shadow-xl border border-primary/5">

                        {/* Booking Type Selector */}
                        <div className="flex bg-background-light/50 dark:bg-black/20 p-1.5 rounded-xl mb-8 gap-1">
                            {bookingTypes.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, booking_type: type.id })}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${formData.booking_type === type.id ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:text-primary'}`}
                                >
                                    <type.icon size={24} />
                                    <span className="hidden sm:inline">{type.label}</span>
                                    <span className="sm:hidden">{type.label.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary dark:text-white mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary dark:text-white mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary dark:text-white mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    {formData.booking_type === 'table' ? (
                                        <>
                                            <label className="block text-sm font-bold text-primary dark:text-white mb-2">Guests</label>
                                            <select
                                                className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} People</option>)}
                                                <option value="10">8+ People</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <label className="block text-sm font-bold text-primary dark:text-white mb-2">Est. Guests</label>
                                            <input
                                                type="number"
                                                placeholder="Min 20"
                                                className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary dark:text-white mb-2">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary dark:text-white mb-2">Time</label>
                                    <select
                                        className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    >
                                        <option value="11:30">11:30 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">1:00 PM</option>
                                        <option value="17:00">5:00 PM</option>
                                        <option value="18:00">6:00 PM</option>
                                        <option value="19:00">7:00 PM</option>
                                        <option value="20:00">8:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            {/* Additional Service-Specific Fields */}
                            {(formData.booking_type === 'catering' || formData.booking_type === 'private') && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-primary/5"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-primary dark:text-white mb-2">Venue Address</label>
                                        <input
                                            type="text"
                                            placeholder={formData.booking_type === 'private' ? 'In-house or External?' : 'Event location...'}
                                            className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                            value={formData.venue || ''}
                                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-primary dark:text-white mb-2">Estimated Budget</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. $500 - $1000"
                                            className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                            value={formData.budget || ''}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-primary dark:text-white mb-2">Type of Event</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Birthday, Corporate Lunch, Wedding Reception"
                                            className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent"
                                            value={formData.event_type || ''}
                                            onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-primary dark:text-white mb-2">Special Requests</label>
                                <textarea
                                    className="w-full bg-white/50 dark:bg-background-dark border border-primary/10 dark:border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-accent h-32"
                                    placeholder="Tell us about dietary requirements or any other details..."
                                    value={formData.special_requests}
                                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-primary text-white dark:bg-accent dark:text-primary py-3 rounded-lg font-black hover:shadow-[0_0_40px_rgba(236,109,19,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {status === 'loading' ? <LoadingIcon size={24} /> : <Send size={24} />}
                                Send Booking Request
                            </button>
                        </form>
                    </div>

                </div>
                {/* Map & Hours Column */}
                <div className="lg:col-span-12 xl:col-span-6 flex flex-col gap-8">
                    {/* Map Container */}
                    <div className="w-full h-[600px] bg-white dark:bg-primary/20 rounded-[1rem] border border-primary/5 relative overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.4298064005925!2d-75.68925622368776!3d45.40067177107303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce057a20925109%3A0x683be92436e3e624!2sThe%20Dosa%20Spot!5e0!3m2!1sen!2sca!4v1769225026672!5m2!1sen!2sca"
                            title="The Dosa Spot Location"
                        />
                    </div>

                    {/* Operating Hours Card */}
                    <div className="bg-white/40 backdrop-blur-md dark:bg-primary/10 p-10 rounded-[1rem] border border-primary/5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Clock size={120} />
                        </div>
                        <div className="flex items-center gap-3 mb-10 text-primary dark:text-accent">
                            <Clock size={28} />
                            <h2 className="text-2xl font-black tracking-tight">Operating Hours</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white/30 dark:bg-black/10 p-4 rounded-2xl border border-white/20">
                                <p className="font-black text-secondary text-xs uppercase tracking-[0.3em] mb-6">Lunch Service</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-primary/60 font-medium">Mon - Fri</span>
                                        <span className="font-bold text-primary px-3 py-1 bg-white/50 rounded-lg">11:00 AM - 3:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-primary/60 font-medium">Sat - Sun</span>
                                        <span className="font-bold text-primary px-3 py-1 bg-white/50 rounded-lg">11:30 AM - 4:00 PM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/30 dark:bg-black/10 p-4 rounded-2xl border border-white/20">
                                <p className="font-black text-secondary text-xs uppercase tracking-[0.3em] mb-6">Dinner Service</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-primary/60 font-medium">Sun - Thu</span>
                                        <span className="font-bold text-primary px-3 py-1 bg-white/50 rounded-lg">5:00 PM - 10:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-secondary">Fri - Sat</span>
                                        <span className="font-bold text-primary px-3 py-1 bg-white/50 rounded-lg">5:00 PM - 11:30 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Details Full Width */}
            <div className="mt-12 bg-secondary/10 dark:bg-secondary/20 p-8 rounded-[1rem] border border-secondary/10">
                <h3 className="font-bold text-primary dark:text-white mb-6 uppercase tracking-wider text-sm">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4 text-primary dark:text-text-muted">
                        <div className="p-3 bg-white/80 dark:bg-primary/20 rounded-xl shadow-sm">
                            <Phone size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Call Us</p>
                            <span className="text-sm font-bold">+1 613-233-7739</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-primary dark:text-text-muted">
                        <div className="p-3 bg-white/80 dark:bg-primary/20 rounded-xl shadow-sm">
                            <Mail size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Email Us</p>
                            <span className="text-sm font-bold">hello@thedosaspot.ca</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-primary dark:text-text-muted">
                        <div className="p-3 bg-white/80 dark:bg-primary/20 rounded-xl shadow-sm">
                            <MapPin size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Visit Us</p>
                            <span className="text-sm font-bold">895 Bank St, Ottawa</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Reservations;
