import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Reservations() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post(`${API_URL}/reservations`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-xl mx-auto py-32 px-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-2xl border border-sunflower/20"
                >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-coffee-bean mb-4">Reservation Sent!</h2>
                    <p className="text-slate-grey mb-8">
                        Your reservation request has been sent. You will get notified if the reservation is accepted.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="bg-coffee-bean text-white px-8 py-3 rounded-full font-bold hover:bg-graphite transition-all"
                    >
                        Make Another Booking
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <section className="py-4">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-coffee-bean mb-1">Book a Table</h2>
                    <p className="text-slate-grey text-sm">Join us for an unforgettable dining experience.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-silver/10"
                >
                    <div className="grid md:grid-cols-5">
                        <div className="md:col-span-2 bg-coffee-bean p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">Reservation Info</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <Clock className="text-sunflower flex-shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-sm">Opening Hours</p>
                                        <p className="text-silver text-xs">Mon-Sun: 11 AM - 10 PM</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Calendar className="text-sunflower flex-shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-sm">Advance Booking</p>
                                        <p className="text-silver text-xs">Book 2+ hours in advance.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Users className="text-sunflower flex-shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-sm">Groups</p>
                                        <p className="text-silver text-xs">For groups &gt; 10, please call.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="md:col-span-3 p-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Phone</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Guests</label>
                                        <select
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                <option key={n} value={n}>{n} Guests</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Date</label>
                                        <input
                                            required
                                            type="date"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Time</label>
                                        <input
                                            required
                                            type="time"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.time}
                                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-coffee-bean text-white font-bold py-3 rounded-lg hover:bg-slate-grey transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-base mt-2"
                                >
                                    {status === 'loading' ? 'Processing...' : 'Confirm Reservation'}
                                    <Send size={18} />
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center">Failed to reserve. Please try again.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Reservations;
