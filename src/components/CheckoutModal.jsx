import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, onSubmit, totalAmount }) => {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('checkoutData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return {
            name: '',
            mobile: '',
            address: '',
            paymentMethod: 'UPI'
        };
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        if (!formData.address.trim()) newErrors.address = 'Delivery address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            localStorage.setItem('checkoutData', JSON.stringify(formData));
            onSubmit(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 sm:p-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <h2 className="text-xl font-serif text-primary">Checkout Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Your Name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Mobile */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="your Number"
                                />
                                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors resize-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="House No, Street, City, Pincode"
                                ></textarea>
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`border rounded-md p-3 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'UPI' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="UPI"
                                            checked={formData.paymentMethod === 'UPI'}
                                            onChange={handleChange}
                                            className="mr-2 accent-primary"
                                        />
                                        <span className="font-medium text-sm">UPI (Scanner)</span>
                                    </label>
                                    <label className={`border rounded-md p-3 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={formData.paymentMethod === 'COD'}
                                            onChange={handleChange}
                                            className="mr-2 accent-primary"
                                        />
                                        <span className="font-medium text-sm">Cash on Delivery</span>
                                    </label>
                                </div>
                                {formData.paymentMethod === 'UPI' && (
                                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
                                        You will receive a UPI scanner via WhatsApp to securely complete your payment.
                                    </p>
                                )}
                            </div>
                        </div>

                        {totalAmount && (
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                                <span className="text-gray-600">Total Amount:</span>
                                <span className="font-bold text-lg text-primary">₹{totalAmount}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-6 bg-[#25D366] text-white font-medium py-3 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            Proceed to WhatsApp
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CheckoutModal;
