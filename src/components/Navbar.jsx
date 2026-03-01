import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { getCartCount, setIsCartOpen } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-primary text-secondary sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button className="text-secondary hover:text-white focus:outline-none">
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
                        <Link to="/" className="text-2xl font-serif font-bold tracking-wider">
                            Purnima Kalamkari
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link to="/" className="hover:text-gold transition-colors duration-200">Home</Link>
                        <Link to="/products" className="hover:text-gold transition-colors duration-200">Collection</Link>
                        <a href="#about" className="hover:text-gold transition-colors duration-200">About Us</a>
                    </div>

                    {/* Right Icons: Search & Cart */}
                    <div className="flex items-center space-x-2">
                        {/* Search Bar */}
                        <div className="relative flex items-center">
                            {isSearchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="absolute right-0 flex items-center bg-gray-100 rounded-full px-3 py-1 shadow-inner origin-right animate-in slide-in-from-right-4 duration-300 min-w-[200px] md:min-w-[250px]">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent border-none outline-none text-sm w-full py-1 text-gray-700 placeholder-gray-500"
                                        autoFocus
                                    />
                                    <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-primary transition-colors ml-2">
                                        <X size={16} />
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-secondary hover:text-gold transition-colors duration-200 p-2"
                                    aria-label="Open Search"
                                >
                                    <Search size={22} />
                                </button>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-secondary hover:text-gold transition-colors duration-200 relative p-2"
                            aria-label="Open Cart"
                        >
                            <ShoppingBag size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary bg-accent rounded-full transform translate-x-1/4 -translate-y-1/4">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
