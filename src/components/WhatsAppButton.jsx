import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    // Using a dummy number for the template
    const whatsappNumber = '918919961168';
    const defaultMessage = encodeURIComponent('Hello! I would like to know more about Purnima Kalamkari products.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
            aria-label="Chat with us on WhatsApp"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <MessageCircle size={32} />
        </motion.a>
    );
};

export default WhatsAppButton;
