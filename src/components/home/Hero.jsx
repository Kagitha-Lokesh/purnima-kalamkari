import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative bg-primary h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background with Kalamkari Pattern Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-20 kalamkari-pattern"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1605813813956-628d06bd2f62?q=80&w=2670&auto=format&fit=crop')"
                }}
            ></div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    className="text-5xl md:text-7xl font-serif text-secondary mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Elegance Woven in Every Thread
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Discover authentic hand-painted Kalamkari and artisanal clothing that celebrates Indian heritage.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link
                        to="/products"
                        className="px-8 py-4 bg-accent text-primary font-bold rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto text-center"
                    >
                        Shop Collection
                    </Link>
                    <a
                        href="#whatsapp"
                        className="px-8 py-4 bg-transparent border-2 border-secondary text-secondary font-bold rounded-md hover:bg-secondary hover:text-primary transition-all w-full sm:w-auto text-center"
                    >
                        Book on WhatsApp
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
