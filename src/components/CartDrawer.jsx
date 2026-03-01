import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const total = getCartTotal();

    const handleCheckoutClick = () => {
        if (cartItems.length === 0) return;
        setIsCheckoutModalOpen(true);
    };

    const handleCheckoutSubmit = (userData) => {
        const itemsList = cartItems.map(item =>
            `- ${item.name} (${item.selectedSize ? 'Size: ' + item.selectedSize + ', ' : ''}Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
        ).join('\n');

        let messageBody = `Hello! I would like to place an order:\n\n${itemsList}\n\n*Total: ₹${total}*\n\n`;
        messageBody += `*Customer Details:*\nName: ${userData.name}\nMobile: ${userData.mobile}\nAddress: ${userData.address}\nPayment Method: ${userData.paymentMethod}\n\n`;

        if (userData.paymentMethod === 'UPI') {
            messageBody += `Please share the UPI scanner for payment confirmation.`;
        } else {
            messageBody += `Please confirm my Cash on Delivery order.`;
        }

        const message = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/918919961168?text=${message}`;
        window.open(whatsappUrl, '_blank');
        setIsCheckoutModalOpen(false);
        setIsCartOpen(false); // Optionally close cart after redirect
    };

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 right-0 max-w-md w-full bg-secondary shadow-xl z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                                <h2 className="text-xl font-serif text-primary flex items-center">
                                    <ShoppingBag className="mr-2" /> Shopping Cart
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                        <ShoppingBag size={48} className="mb-4 opacity-50" />
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={`${item.id}-${item.selectedSize || 'nosize'}`} className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
                                            <img
                                                src={item.image || item.images?.[0]}
                                                alt={item.name}
                                                className="w-20 h-24 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                                {item.selectedSize && <p className="text-xs text-gray-500 mt-0.5">Size: {item.selectedSize}</p>}
                                                <p className="text-primary font-semibold mt-1">₹{item.price}</p>

                                                <div className="flex items-center mt-2 space-x-3">
                                                    <div className="flex items-center border border-gray-200 rounded-md">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                            className="p-1 text-gray-500 hover:bg-gray-100 rounded-l-md transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-3 text-sm font-medium text-gray-700">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                            className="p-1 text-gray-500 hover:bg-gray-100 rounded-r-md transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                        className="text-xs text-red-500 hover:text-red-700 underline transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer / Summary */}
                            {cartItems.length > 0 && (
                                <div className="border-t border-gray-200 p-4 bg-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-xl font-bold text-gray-900">₹{total}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">*Shipping and taxes calculated at checkout.</p>
                                    <button
                                        onClick={handleCheckoutClick}
                                        className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-md font-medium transition-colors"
                                    >
                                        Checkout via WhatsApp
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal renders independently of CartDrawer animation state so it doesn't get unmounted if cart closes */}
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onSubmit={handleCheckoutSubmit}
                totalAmount={total}
            />
        </>
    );
};

export default CartDrawer;
