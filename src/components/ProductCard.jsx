import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleQuickAdd = (e) => {
        e.preventDefault();
        addToCart(product, 1, product.sizes ? product.sizes[0] : null);
    };

    const handleBookNow = (e) => {
        e.preventDefault();
        navigate(`/product/${product.id}`);
    };

    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            whileHover={{ y: -5 }}
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                {product.isNew && (
                    <div className="absolute top-3 left-3 z-10 bg-accent text-primary text-xs font-bold px-2 py-1 uppercase rounded-sm shadow-md">
                        New
                    </div>
                )}

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm shadow-md">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                )}

                <Link to={`/product/${product.id}`} className="block h-full w-full">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Desktop Quick Add Button Overlay */}
                <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent flex-col gap-2">
                    <button
                        onClick={handleQuickAdd}
                        className="w-full bg-white text-primary font-medium py-2 rounded-md hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <ShoppingBag size={18} /> Quick Add
                    </button>
                    <button
                        onClick={handleBookNow}
                        className="w-full bg-[#25D366] text-white font-medium py-2 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <MessageCircle size={18} /> Book Now
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-serif text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="mt-4 flex gap-2 md:hidden">
                    <button
                        onClick={handleQuickAdd}
                        className="flex-1 bg-white border border-primary text-primary font-medium py-2 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                        <ShoppingBag size={16} /> Add
                    </button>
                    <button
                        onClick={handleBookNow}
                        className="flex-1 bg-[#25D366] text-white font-medium py-2 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-1.5 text-sm shadow-sm"
                    >
                        <MessageCircle size={16} /> Book
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
