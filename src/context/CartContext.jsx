import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Manage cart drawer state here as well for global access
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, size = null) => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(
                item => item.id === product.id && item.selectedSize === size
            );

            if (existingItemIndex >= 0) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                return [...prev, { ...product, quantity, selectedSize: size }];
            }
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (productId, size = null) => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }
        setCartItems(prev => prev.map(item =>
            (item.id === productId && item.selectedSize === size) ? { ...item, quantity } : item
        ));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getCartCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
