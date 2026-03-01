import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';

const Layout = () => {
    const { isCartOpen, setIsCartOpen } = useCart();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />

            <CartDrawer />
            <WhatsAppButton />
        </div>
    );
};

export default Layout;
