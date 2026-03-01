import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

const ProductDetails = () => {
    const { id } = useParams();
    const product = getProductById(id);
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const carouselRef = useRef(null);

    const similarProducts = products?.filter(p => p.category === product?.category && p.id !== product?.id) || [];

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Reset state when product changes
    useEffect(() => {
        setSelectedImage(0);
        setSelectedSize('');
        setQuantity(1);
        window.scrollTo(0, 0);
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-serif text-primary mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
                <Link to="/products" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const handleWhatsAppBuyClick = () => {
        setIsCheckoutModalOpen(true);
    };

    const handleCheckoutSubmit = (userData) => {
        const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
        const itemsList = `- ${product.name}${sizeText} (Qty: ${quantity}) - ₹${product.price * quantity}`;

        let messageBody = `Hello! I would like to place an order:\n\n${itemsList}\n\n*Total: ₹${product.price * quantity}*\n\n`;
        messageBody += `*Customer Details:*\nName: ${userData.name}\nMobile: ${userData.mobile}\nAddress: ${userData.address}\nPayment Method: ${userData.paymentMethod}\n\n`;

        if (userData.paymentMethod === 'UPI') {
            messageBody += `Please share the UPI scanner for payment confirmation.`;
        } else {
            messageBody += `Please confirm my Cash on Delivery order.`;
        }

        const message = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/917032817065?text=${message}`;
        window.open(whatsappUrl, '_blank');
        setIsCheckoutModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight size={16} className="mx-2" />
                <Link to="/products" className="hover:text-primary">Products</Link>
                <ChevronRight size={16} className="mx-2" />
                <span className="text-gray-900 capitalize">{product.category}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-12">

                {/* Image Gallery */}
                <div className="w-full md:w-1/2 space-y-4">
                    <motion.div
                        className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col">
                    {product.isNew && (
                        <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold uppercase tracking-wider rounded-sm w-fit mb-4">
                            New Arrival
                        </span>
                    )}

                    <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">{product.name}</h1>

                    {/* Ratings */}
                    <div className="flex items-center gap-4 mb-6 cursor-pointer hover:underline text-gray-500 text-sm">
                        <div className="flex items-center text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-current" : ""} />
                            ))}
                        </div>
                        <span>{product.rating} ({product.reviews} Reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                        <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="text-xl text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
                                <span className="text-red-500 font-medium mb-1 border border-red-200 bg-red-50 px-2 py-0.5 rounded text-sm">
                                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Size Selection */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-gray-900">Select Size</span>
                            <button className="text-sm text-primary underline">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 flex items-center justify-center border rounded-md font-medium transition-all ${selectedSize === size
                                        ? 'border-primary bg-primary text-white shadow-md'
                                        : 'border-gray-300 text-gray-700 hover:border-primary'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {product.sizes.includes('FS') && (
                            <p className="text-xs text-gray-500 mt-2">*FS = Free Size, fits all standard measurements.</p>
                        )}
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex gap-4">
                            {/* Quantity Selector */}
                            <div className="flex border border-gray-300 rounded-md">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                >-</button>
                                <div className="w-12 flex items-center justify-center font-medium border-x border-gray-300">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                >+</button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={() => addToCart(product, quantity, selectedSize || (product.sizes ? product.sizes[0] : null))}
                                className="flex-1 bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                        </div>

                        {/* WhatsApp Buy */}
                        <button
                            onClick={handleWhatsAppBuyClick}
                            className="w-full bg-[#25D366] text-white font-medium py-4 px-6 rounded-md hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-2"
                        >
                            <MessageCircle size={22} /> Buy on WhatsApp
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="bg-gray-50 p-3 rounded-full text-primary"><ShieldCheck size={24} /></div>
                            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Authentic Product</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="bg-gray-50 p-3 rounded-full text-primary"><Truck size={24} /></div>
                            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="bg-gray-50 p-3 rounded-full text-primary"><RotateCcw size={24} /></div>
                            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">7-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products Section (Carousel) */}
            {similarProducts.length > 0 && (
                <div className="mt-24 mb-12">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-serif text-primary mb-3">You May Also Like</h2>
                            <div className="w-16 h-1 bg-accent"></div>
                        </div>

                        {/* Desktop Navigation Arrows */}
                        {similarProducts.length > 3 && (
                            <div className="hidden sm:flex gap-2">
                                <button
                                    onClick={() => scrollCarousel('left')}
                                    className="p-2 border border-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => scrollCarousel('right')}
                                    className="p-2 border border-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {similarProducts.map(similarProduct => (
                            <div key={similarProduct.id} className="min-w-[280px] w-[85vw] sm:w-[350px] lg:w-[calc(25%-18px)] snap-start flex-shrink-0">
                                <ProductCard product={similarProduct} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Hint */}
                    <div className="text-center mt-2 text-sm text-gray-400 sm:hidden">
                        Swipe to see more →
                    </div>
                </div>
            )}

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onSubmit={handleCheckoutSubmit}
                totalAmount={product.price * quantity}
            />
        </div>
    );
};

export default ProductDetails;
