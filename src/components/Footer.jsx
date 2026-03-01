import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-serif text-secondary mb-4">Purnima Kalamkari</h3>
                        <p className="text-sm leading-relaxed">
                            Authentic hand-painted Kalamkari textiles straight from our artisans to your wardrobe. Preserving Indian heritage through sustainable fashion.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-accent transition-colors">Shop All</Link></li>
                            <li><Link to="/products?category=women" className="hover:text-accent transition-colors">Women's Collection</Link></li>
                            <li><Link to="/products?category=kalamkari" className="hover:text-accent transition-colors">Authentic Kalamkari</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Customer Care</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 text-accent flex-shrink-0 mt-1" />
                                <span>123 Artisan Street, Heritage District, Hyderabad 500001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-3 text-accent flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-3 text-accent flex-shrink-0" />
                                <span>hello@purnimakalamkari.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Purnima Kalamkari. All rights reserved. Demo Project.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
