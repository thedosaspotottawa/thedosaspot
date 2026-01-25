import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, Send, CheckCircle2, PartyPopper, UtensilsCrossed } from 'lucide-react';
import axios from 'axios';
import LoadingIcon from './LoadingIcon';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Reservations() {
    const [bookingType, setBookingType] = useState('table'); // table, private_event, catering
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        booking_type: 'table',
        event_type: '',
        duration: '',
        special_requests: '',
        budget: '',
        venue: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            // Build submission data based on booking type
            const submissionData = {
                ...formData,
                booking_type: bookingType
            };
            
            await axios.post(`${API_URL}/reservations`, submissionData);
            setStatus('success');
            setFormData({ 
                name: '', 
                email: '', 
                phone: '', 
                date: '', 
                time: '', 
                guests: 2,
                booking_type: 'table',
                event_type: '',
                duration: '',
                special_requests: '',
                budget: '',
                venue: ''
            });
            setBookingType('table');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        const bookingTypeLabels = {
            table: 'Table Booking',
            private_event: 'Private Event',
            catering: 'Catering Request'
        };
        
        return (
            <div className="max-w-xl mx-auto py-32 px-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-2xl border border-sunflower/20"
                >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-coffee-bean mb-4">Request Sent!</h2>
                    <p className="text-slate-grey mb-8">
                        Your {bookingTypeLabels[bookingType]} request has been sent. You will get notified if the request is accepted.
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
                    <h2 className="text-3xl font-bold text-coffee-bean mb-1">Book with Us</h2>
                    <p className="text-slate-grey text-sm">Tables, Private Events, and Catering Services</p>
                </div>

                {/* Booking Type Selector */}
                <div className="flex gap-3 mb-6 justify-center">
                    <button
                        onClick={() => { 
                            setBookingType('table'); 
                            setFormData({ ...formData, booking_type: 'table' }); 
                        }}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                            bookingType === 'table' 
                                ? 'bg-coffee-bean text-white shadow-lg' 
                                : 'bg-white text-slate-grey border border-silver/30 hover:border-sunflower'
                        }`}
                    >
                        <Users size={18} />
                        Table Booking
                    </button>
                    <button
                        onClick={() => { 
                            setBookingType('private_event'); 
                            setFormData({ ...formData, booking_type: 'private_event' }); 
                        }}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                            bookingType === 'private_event' 
                                ? 'bg-coffee-bean text-white shadow-lg' 
                                : 'bg-white text-slate-grey border border-silver/30 hover:border-sunflower'
                        }`}
                    >
                        <PartyPopper size={18} />
                        Private Event
                    </button>
                    <button
                        onClick={() => { 
                            setBookingType('catering'); 
                            setFormData({ ...formData, booking_type: 'catering' }); 
                        }}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                            bookingType === 'catering' 
                                ? 'bg-coffee-bean text-white shadow-lg' 
                                : 'bg-white text-slate-grey border border-silver/30 hover:border-sunflower'
                        }`}
                    >
                        <UtensilsCrossed size={18} />
                        Catering
                    </button>
                </div>

                <motion.div
                    key={bookingType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-silver/10"
                >
                    <div className="grid md:grid-cols-5">
                        <div className="md:col-span-2 bg-coffee-bean p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">
                                {bookingType === 'table' && 'Table Reservation'}
                                {bookingType === 'private_event' && 'Private Event Info'}
                                {bookingType === 'catering' && 'Catering Info'}
                            </h3>
                            <ul className="space-y-4">
                                {bookingType === 'table' && (
                                    <>
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
                                    </>
                                )}
                                {bookingType === 'private_event' && (
                                    <>
                                        <li className="flex gap-3">
                                            <PartyPopper className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Perfect for</p>
                                                <p className="text-silver text-xs">Birthdays, Anniversaries, Corporate Events</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Users className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Capacity</p>
                                                <p className="text-silver text-xs">Up to 100 guests</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Calendar className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Advance Notice</p>
                                                <p className="text-silver text-xs">Book at least 1 week ahead</p>
                                            </div>
                                        </li>
                                    </>
                                )}
                                {bookingType === 'catering' && (
                                    <>
                                        <li className="flex gap-3">
                                            <UtensilsCrossed className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Custom Menus</p>
                                                <p className="text-silver text-xs">Tailored to your event needs</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Users className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Any Size Event</p>
                                                <p className="text-silver text-xs">From 20 to 500+ guests</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Calendar className="text-sunflower flex-shrink-0" size={18} />
                                            <div>
                                                <p className="font-bold text-sm">Flexible Options</p>
                                                <p className="text-silver text-xs">Delivery or full-service catering</p>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="md:col-span-3 p-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Common Fields */}
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
                                        <label className="block text-xs font-medium text-slate-grey mb-1">Number of Guests</label>
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                            value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                        />
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

                                {/* Type-specific Fields */}
                                {bookingType === 'private_event' && (
                                    <>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-grey mb-1">Event Type</label>
                                                <select
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                    value={formData.event_type}
                                                    onChange={e => setFormData({ ...formData, event_type: e.target.value })}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="birthday">Birthday Party</option>
                                                    <option value="anniversary">Anniversary</option>
                                                    <option value="corporate">Corporate Event</option>
                                                    <option value="wedding">Wedding Reception</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-grey mb-1">Duration</label>
                                                <select
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                    value={formData.duration}
                                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                                >
                                                    <option value="">Select Duration</option>
                                                    <option value="2-3 hours">2-3 hours</option>
                                                    <option value="3-4 hours">3-4 hours</option>
                                                    <option value="4+ hours">4+ hours</option>
                                                    <option value="full-day">Full Day</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-grey mb-1">Budget Range (Optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., $1000-2000"
                                                className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                value={formData.budget}
                                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                {bookingType === 'catering' && (
                                    <>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-grey mb-1">Event Type</label>
                                                <select
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                    value={formData.event_type}
                                                    onChange={e => setFormData({ ...formData, event_type: e.target.value })}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="wedding">Wedding</option>
                                                    <option value="corporate">Corporate Event</option>
                                                    <option value="party">Party</option>
                                                    <option value="conference">Conference</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-grey mb-1">Venue</label>
                                                <select
                                                    required
                                                    className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                    value={formData.venue}
                                                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                                                >
                                                    <option value="">Select Venue</option>
                                                    <option value="client-location">Client Location (Delivery)</option>
                                                    <option value="full-service">Full Service at Client Location</option>
                                                    <option value="pickup">Pickup Only</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-grey mb-1">Budget Range (Optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., $2000-5000"
                                                className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                                value={formData.budget}
                                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-xs font-medium text-slate-grey mb-1">Special Requests (Optional)</label>
                                    <textarea
                                        rows="3"
                                        className="w-full px-3 py-2 rounded-lg border border-silver/30 focus:border-sunflower focus:ring-2 focus:ring-sunflower/10 outline-none transition-all text-sm"
                                        placeholder="Any dietary restrictions, special arrangements, or additional information..."
                                        value={formData.special_requests}
                                        onChange={e => setFormData({ ...formData, special_requests: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-coffee-bean text-white font-bold py-3 rounded-lg hover:bg-slate-grey transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-base mt-2"
                                >
                                    {status === 'loading' ? 'Processing...' : 'Submit Request'}
                                    <Send size={18} />
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center">Failed to submit. Please try again.</p>
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
