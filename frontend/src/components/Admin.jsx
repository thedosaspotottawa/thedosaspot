import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Package, Edit, Trash2, CalendarCheck, LogOut, Megaphone, Check, XCircle, CalendarDays } from 'lucide-react';
import axios from 'axios';
import CalendarView from './CalendarView';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [reservations, setReservations] = useState([]);
    const [menu, setMenu] = useState({ categories: [] });
    const [banners, setBanners] = useState([]);
    const [activeTab, setActiveTab] = useState('reservations');

    // Modal states
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingBanner, setEditingBanner] = useState(null);

    // Form states
    const [itemForm, setItemForm] = useState({ name: '', price: '', description: '', spicy: false, image_url: '', category_id: '' });
    const [catForm, setCatForm] = useState({ name: '' });
    const [bannerForm, setBannerForm] = useState({ message: '', active: true });

    useEffect(() => {
        if (isAuthenticated) {
            fetchReservations();
            fetchMenu();
            fetchBanners();
        }
    }, [isAuthenticated]);

    const fetchReservations = async () => {
        try {
            const res = await axios.get(`${API_URL}/reservations`);
            setReservations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReservationStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/reservations/${id}`, { status, password });
            fetchReservations();
        } catch (err) {
            alert(err.response?.data?.detail || 'Error updating reservation status');
        }
    };

    const fetchMenu = async () => {
        try {
            const res = await axios.get(`${API_URL}/menu`);
            setMenu(res.data);
            if (res.data.categories.length > 0 && !itemForm.category_id) {
                setItemForm(prev => ({ ...prev, category_id: res.data.categories[0].id }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBanners = async () => {
        try {
            const res = await axios.get(`${API_URL}/banners`);
            setBanners(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { password });
            if (response.data.success) {
                setIsAuthenticated(true);
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        if (!itemForm.category_id) {
            alert('Please select a category first');
            return;
        }
        try {
            const payload = {
                ...itemForm,
                price: parseFloat(itemForm.price),
                category_id: parseInt(itemForm.category_id),
                password
            };
            if (editingItem) {
                await axios.put(`${API_URL}/menu/items/${editingItem.id}`, payload);
            } else {
                await axios.post(`${API_URL}/menu/items`, payload);
            }
            setIsItemModalOpen(false);
            setEditingItem(null);
            setItemForm({ name: '', price: '', description: '', spicy: false, image_url: '', category_id: menu.categories[0]?.id || '' });
            fetchMenu();
        } catch (err) {
            alert(err.response?.data?.detail || 'Error saving item');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`${API_URL}/menu/items/${id}?password=${password}`);
            fetchMenu();
        } catch (err) {
            alert('Error deleting item');
        }
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...catForm, password };
            if (editingCategory) {
                await axios.put(`${API_URL}/menu/categories/${editingCategory.id}`, payload);
            } else {
                await axios.post(`${API_URL}/menu/categories`, payload);
            }
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
            setCatForm({ name: '' });
            fetchMenu();
        } catch (err) {
            alert(err.response?.data?.detail || 'Error saving category');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Are you sure? This will delete all items in this category.')) return;
        try {
            await axios.delete(`${API_URL}/menu/categories/${id}?password=${password}`);
            fetchMenu();
        } catch (err) {
            alert('Error deleting category');
        }
    };

    const handleSaveBanner = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...bannerForm, password };
            if (editingBanner) {
                await axios.put(`${API_URL}/banners/${editingBanner.id}`, payload);
            } else {
                await axios.post(`${API_URL}/banners`, payload);
            }
            setIsBannerModalOpen(false);
            setEditingBanner(null);
            setBannerForm({ message: '', active: true });
            fetchBanners();
        } catch (err) {
            alert(err.response?.data?.detail || 'Error saving banner');
        }
    };

    const handleDeleteBanner = async (id) => {
        if (!confirm('Are you sure you want to delete this banner message?')) return;
        try {
            await axios.delete(`${API_URL}/banners/${id}?password=${password}`);
            fetchBanners();
        } catch (err) {
            alert('Error deleting banner');
        }
    };

    const openEditItem = (item, catId) => {
        setEditingItem(item);
        setItemForm({ ...item, category_id: catId });
        setIsItemModalOpen(true);
    };

    const openEditCategory = (cat) => {
        setEditingCategory(cat);
        setCatForm({ name: cat.name });
        setIsCategoryModalOpen(true);
    };

    const openEditBanner = (banner) => {
        setEditingBanner(banner);
        setBannerForm({ message: banner.message, active: banner.active });
        setIsBannerModalOpen(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto py-32 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-2xl border border-silver/10"
                >
                    <div className="w-16 h-16 bg-sunflower/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Shield className="text-sunflower" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-coffee-bean text-center mb-8">Admin Portal</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-grey mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-silver/30 focus:border-sunflower outline-none"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-coffee-bean text-white font-bold py-4 rounded-xl hover:bg-graphite transition-all"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <section className="py-8 min-h-[80vh]">
            {/* Semi-transparent white overlay for better text visibility */}
            <div className="fixed inset-0 bg-white/80 z-[-1]" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-coffee-bean">Management Console</h2>
                        <p className="text-slate-grey text-sm">Welcome back, Admin.</p>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition-colors text-sm"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('reservations')}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeTab === 'reservations' ? 'bg-coffee-bean text-white shadow-md' : 'bg-white text-slate-grey border border-silver/30'}`}
                    >
                        Reservations
                    </button>
                    <button
                        onClick={() => setActiveTab('calendar')}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeTab === 'calendar' ? 'bg-coffee-bean text-white shadow-md' : 'bg-white text-slate-grey border border-silver/30'}`}
                    >
                        Calendar View
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeTab === 'menu' ? 'bg-coffee-bean text-white shadow-md' : 'bg-white text-slate-grey border border-silver/30'}`}
                    >
                        Manage Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeTab === 'banners' ? 'bg-coffee-bean text-white shadow-md' : 'bg-white text-slate-grey border border-silver/30'}`}
                    >
                        Banners
                    </button>
                </div>

                {activeTab === 'reservations' && (
                    <div className="bg-white rounded-xl shadow-lg border border-silver/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-silver/20 text-xs text-coffee-bean uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 font-bold">Type</th>
                                        <th className="px-4 py-3 font-bold">Customer</th>
                                        <th className="px-4 py-3 font-bold">Date & Time</th>
                                        <th className="px-4 py-3 font-bold">Guests</th>
                                        <th className="px-4 py-3 font-bold">Details</th>
                                        <th className="px-4 py-3 font-bold text-right pr-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-silver/10 text-sm">
                                    {reservations.map((res, i) => {
                                        const bookingTypeLabels = {
                                            table: 'Table',
                                            private_event: 'Private Event',
                                            catering: 'Catering'
                                        };
                                        const bookingTypeColors = {
                                            table: 'bg-blue-100 text-blue-700',
                                            private_event: 'bg-purple-100 text-purple-700',
                                            catering: 'bg-orange-100 text-orange-700'
                                        };
                                        
                                        return (
                                            <motion.tr
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${bookingTypeColors[res.booking_type || 'table']}`}>
                                                        {bookingTypeLabels[res.booking_type || 'table']}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="font-bold text-coffee-bean">{res.name}</p>
                                                    <p className="text-xs text-slate-grey">{res.email}</p>
                                                    <p className="text-xs text-slate-grey">{res.phone}</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium">{res.date}</p>
                                                    <p className="text-xs text-slate-grey">{res.time}</p>
                                                </td>
                                                <td className="px-4 py-3">{res.guests} Pax</td>
                                                <td className="px-4 py-3">
                                                    {res.event_type && (
                                                        <p className="text-xs text-slate-grey">
                                                            <span className="font-medium">Type:</span> {res.event_type}
                                                        </p>
                                                    )}
                                                    {res.duration && (
                                                        <p className="text-xs text-slate-grey">
                                                            <span className="font-medium">Duration:</span> {res.duration}
                                                        </p>
                                                    )}
                                                    {res.venue && (
                                                        <p className="text-xs text-slate-grey">
                                                            <span className="font-medium">Venue:</span> {res.venue}
                                                        </p>
                                                    )}
                                                    {res.budget && (
                                                        <p className="text-xs text-slate-grey">
                                                            <span className="font-medium">Budget:</span> {res.budget}
                                                        </p>
                                                    )}
                                                    {res.special_requests && (
                                                        <p className="text-xs text-slate-grey line-clamp-2">
                                                            <span className="font-medium">Notes:</span> {res.special_requests}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right pr-6">
                                                    {res.status === 'pending' ? (
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => handleReservationStatus(res.id, 'confirmed')}
                                                                className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                                title="Approve"
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReservationStatus(res.id, 'rejected')}
                                                                className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${res.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                            res.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {res.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                    {reservations.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-slate-grey italic">
                                                No reservations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'calendar' && (
                    <CalendarView reservations={reservations} />
                )}

                {activeTab === 'menu' && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center bg-sunflower/10 p-4 rounded-xl border border-sunflower/20">
                            <div>
                                <h3 className="font-bold text-coffee-bean">Menu Structure</h3>
                                <p className="text-xs text-slate-grey">Add categories before items</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setEditingCategory(null); setCatForm({ name: '' }); setIsCategoryModalOpen(true); }}
                                    className="bg-white border border-silver/30 text-coffee-bean px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-gray-50 transition-all"
                                >
                                    <Plus size={14} /> Add Category
                                </button>
                                <button
                                    onClick={() => { setEditingItem(null); setItemForm({ name: '', price: '', description: '', spicy: false, image_url: '', category_id: menu.categories[0]?.id || '' }); setIsItemModalOpen(true); }}
                                    className="bg-coffee-bean text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-graphite transition-all"
                                >
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {menu.categories.map((category) => (
                                <div key={category.id} className="bg-white rounded-2xl shadow-md border border-silver/10 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-silver/10">
                                        <h4 className="font-bold text-coffee-bean uppercase tracking-wider text-sm">{category.name}</h4>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditCategory(category)} className="p-1.5 text-slate-grey hover:text-sunflower transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category.id)} className="p-1.5 text-slate-grey hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-silver/5">
                                        {category.items.map((item) => (
                                            <div key={item.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-coffee-bean">{item.name}</span>
                                                        {item.spicy && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">SPICY</span>}
                                                    </div>
                                                    <p className="text-xs text-slate-grey line-clamp-1">{item.description}</p>
                                                    <p className="text-xs font-bold text-sunflower mt-1">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <button onClick={() => openEditItem(item, category.id)} className="p-2 text-slate-grey hover:text-sunflower border border-silver/20 rounded-lg transition-all">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-slate-grey hover:text-red-500 border border-silver/20 rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {category.items.length === 0 && (
                                            <div className="px-6 py-4 text-center text-xs text-slate-grey italic">No items in this category</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'banners' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-sunflower/10 p-4 rounded-xl border border-sunflower/20">
                            <div>
                                <h3 className="font-bold text-coffee-bean">Banner Messages</h3>
                                <p className="text-xs text-slate-grey">Announcements, deals, and service alerts</p>
                            </div>
                            <button
                                onClick={() => { setEditingBanner(null); setBannerForm({ message: '', active: true }); setIsBannerModalOpen(true); }}
                                className="bg-coffee-bean text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-graphite transition-all"
                            >
                                <Plus size={14} /> Add Message
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {banners.map((banner) => (
                                <motion.div
                                    key={banner.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-silver/10 flex justify-between items-center group hover:border-sunflower/30 transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 w-2 h-2 rounded-full ${banner.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`} />
                                        <div>
                                            <p className="text-sm text-coffee-bean font-medium">{banner.message}</p>
                                            <p className="text-[10px] text-slate-grey mt-1 uppercase font-bold tracking-wider">
                                                {banner.active ? 'Active' : 'Hidden'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditBanner(banner)} className="p-2 text-slate-grey hover:text-sunflower border border-silver/10 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteBanner(banner.id)} className="p-2 text-slate-grey hover:text-red-500 border border-silver/10 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                            {banners.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-silver/20">
                                    <Megaphone className="mx-auto text-silver/40 mb-3" size={32} />
                                    <p className="text-slate-grey italic text-sm">No banner messages active.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-coffee-bean mb-6">{editingCategory ? 'Edit Category' : 'New Category'}</h3>
                        <form onSubmit={handleSaveCategory} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-grey mb-1">Category Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm"
                                    value={catForm.name}
                                    onChange={e => setCatForm({ name: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="flex-1 py-2 text-slate-grey font-bold text-sm">Cancel</button>
                                <button type="submit" className="flex-1 bg-coffee-bean text-white py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-sunflower/20 transition-all">Save</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {isItemModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold text-coffee-bean mb-6">{editingItem ? 'Edit Item' : 'New Menu Item'}</h3>
                        <form onSubmit={handleSaveItem} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-grey mb-1">Item Name</label>
                                    <input required className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm" value={itemForm.name} onChange={e => setItemForm({ ...itemForm, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-grey mb-1">Price ($)</label>
                                    <input required type="number" step="0.01" className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm" value={itemForm.price} onChange={e => setItemForm({ ...itemForm, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-grey mb-1">Category</label>
                                    <select className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm bg-white" value={itemForm.category_id} onChange={e => setItemForm({ ...itemForm, category_id: e.target.value })}>
                                        {menu.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-grey mb-1">Description</label>
                                <textarea className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm h-20" value={itemForm.description} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="spicy" checked={itemForm.spicy} onChange={e => setItemForm({ ...itemForm, spicy: e.target.checked })} />
                                <label htmlFor="spicy" className="text-xs font-bold text-slate-grey">Mark as Spicy</label>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-grey mb-1">Image URL (Optional)</label>
                                <input className="w-full px-4 py-2 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm" value={itemForm.image_url} onChange={e => setItemForm({ ...itemForm, image_url: e.target.value })} />
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-silver/10">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="flex-1 py-2 text-slate-grey font-bold text-sm">Cancel</button>
                                <button type="submit" className="flex-1 bg-coffee-bean text-white py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-sunflower/20 transition-all">Save Item</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {isBannerModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-coffee-bean mb-6">{editingBanner ? 'Edit Banner Message' : 'New Banner Message'}</h3>
                        <form onSubmit={handleSaveBanner} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-grey mb-1">Message</label>
                                <textarea
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-silver/30 outline-none focus:border-sunflower text-sm h-32"
                                    value={bannerForm.message}
                                    onChange={e => setBannerForm({ ...bannerForm, message: e.target.value })}
                                    placeholder="Enter deal, closure or service message..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="banner-active"
                                    checked={bannerForm.active}
                                    onChange={e => setBannerForm({ ...bannerForm, active: e.target.checked })}
                                />
                                <label htmlFor="banner-active" className="text-xs font-bold text-slate-grey">Active (Visible on Home Page)</label>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsBannerModalOpen(false)} className="flex-1 py-2 text-slate-grey font-bold text-sm">Cancel</button>
                                <button type="submit" className="flex-1 bg-coffee-bean text-white py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-sunflower/20 transition-all">Save Message</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </section>
    );
}

export default Admin;
