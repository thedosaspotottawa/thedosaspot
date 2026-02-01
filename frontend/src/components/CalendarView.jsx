import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Users, PartyPopper, UtensilsCrossed, Clock, MapPin, DollarSign, X, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function CalendarView({ reservations, onDelete }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        generateCalendar();
    }, [currentDate, reservations]);

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        const monthLength = lastDay.getDate();

        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push({ date: null, bookings: [] });
        }

        // Add days of the month with their bookings
        for (let day = 1; day <= monthLength; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayBookings = reservations.filter(res => 
                res.status === 'confirmed' && res.date === dateStr
            );
            days.push({ date: day, dateStr, bookings: dayBookings });
        }

        setCalendarDays(days);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getBookingIcon = (bookingType) => {
        switch (bookingType) {
            case 'table':
                return <Users size={14} />;
            case 'private_event':
                return <PartyPopper size={14} />;
            case 'catering':
                return <UtensilsCrossed size={14} />;
            default:
                return <Users size={14} />;
        }
    };

    const getBookingColor = (bookingType) => {
        switch (bookingType) {
            case 'table':
                return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'private_event':
                return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
            case 'catering':
                return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };

    const getBookingTypeLabel = (bookingType) => {
        switch (bookingType) {
            case 'table':
                return 'Table Booking';
            case 'private_event':
                return 'Private Event';
            case 'catering':
                return 'Catering';
            default:
                return 'Booking';
        }
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="bg-white rounded-xl shadow-lg border border-primary/10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <Calendar size={28} />
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={previousMonth}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-4 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-primary/60">Table Booking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span className="text-primary/60">Private Event</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded"></div>
                        <span className="text-primary/60">Catering</span>
                    </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map(day => (
                        <div key={day} className="text-center font-bold text-xs text-primary/60 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.01 }}
                            className={`min-h-[100px] p-2 rounded-lg border ${
                                day.date 
                                    ? 'bg-white border-primary/20 hover:border-accent/50 transition-colors' 
                                    : 'bg-gray-50 border-transparent'
                            }`}
                        >
                            {day.date && (
                                <>
                                    <div className="font-bold text-sm text-primary mb-2">
                                        {day.date}
                                    </div>
                                    <div className="space-y-1">
                                        {day.bookings.map((booking, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedBooking(booking)}
                                                className={`w-full text-left px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1 transition-all ${getBookingColor(booking.booking_type)}`}
                                            >
                                                {getBookingIcon(booking.booking_type)}
                                                <span className="truncate">{booking.time} - {booking.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Booking Details Modal */}
            <AnimatePresence>
                {selectedBooking && (
                    <div 
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedBooking(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getBookingIcon(selectedBooking.booking_type)}
                                        <h3 className="text-2xl font-bold text-primary">
                                            {getBookingTypeLabel(selectedBooking.booking_type)}
                                        </h3>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-700">
                                        Confirmed
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Customer Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold text-primary mb-3">Customer Information</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-primary/60">Name:</span>
                                            <span className="font-medium">{selectedBooking.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-primary/60">Email:</span>
                                            <span className="font-medium">{selectedBooking.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-primary/60">Phone:</span>
                                            <span className="font-medium">{selectedBooking.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold text-primary mb-3">Event Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-accent" />
                                            <span className="font-medium">{selectedBooking.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-accent" />
                                            <span className="font-medium">{selectedBooking.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} className="text-accent" />
                                            <span className="font-medium">{selectedBooking.guests} Guests</span>
                                        </div>
                                        
                                        {/* Type-specific fields */}
                                        {(selectedBooking.booking_type === 'private_event' || selectedBooking.booking_type === 'catering') && selectedBooking.event_type && (
                                            <div className="flex justify-between">
                                                <span className="text-primary/60">Event Type:</span>
                                                <span className="font-medium capitalize">{selectedBooking.event_type.replace('_', ' ')}</span>
                                            </div>
                                        )}
                                        
                                        {selectedBooking.booking_type === 'private_event' && selectedBooking.duration && (
                                            <div className="flex justify-between">
                                                <span className="text-primary/60">Duration:</span>
                                                <span className="font-medium">{selectedBooking.duration}</span>
                                            </div>
                                        )}
                                        
                                        {selectedBooking.booking_type === 'catering' && selectedBooking.venue && (
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-accent" />
                                                <span className="font-medium capitalize">{selectedBooking.venue.replace(/-/g, ' ')}</span>
                                            </div>
                                        )}
                                        
                                        {selectedBooking.budget && (
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={16} className="text-accent" />
                                                <span className="font-medium">{selectedBooking.budget}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Special Requests */}
                                {selectedBooking.special_requests && (
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h4 className="font-bold text-primary mb-2">Special Requests</h4>
                                        <p className="text-sm text-primary/60">{selectedBooking.special_requests}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        if (onDelete) {
                                            onDelete(selectedBooking.id, selectedBooking);
                                            setSelectedBooking(null);
                                        }
                                    }}
                                    className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    Delete Booking
                                </button>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CalendarView;
