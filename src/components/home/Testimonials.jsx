import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        text: "The quality of the Kalamkari saree is breathtaking. The colors are so vibrant and natural. Truly a masterpiece of Indian heritage.",
        product: "Hand-painted Kalamkari Saree"
    },
    {
        id: 2,
        name: "Ananya Patel",
        location: "Delhi",
        rating: 5,
        text: "Bought the block print kurti for daily office wear. It's incredibly comfortable and I've received so many compliments. Planning to buy more soon.",
        product: "Floral Motif Block Print Kurti"
    },
    {
        id: 3,
        name: "Deepak Reddy",
        location: "Hyderabad",
        rating: 4,
        text: "Excellent shopping experience. The WhatsApp checkout was seamless and the silk kurta fits perfectly. Great finishing and authentic feel.",
        product: "Maroon Silk Blend Men's Kurta"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-primary mb-4">Customer Stories</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-1 text-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={i < review.rating ? "fill-current" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <span className="text-6xl text-gray-200 font-serif leading-none mt-[-10px]">&ldquo;</span>
                            </div>

                            <p className="text-gray-600 mb-6 flex-grow italic">
                                "{review.text}"
                            </p>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <p className="font-semibold text-primary">{review.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{review.location}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-xs text-accent italic">{review.product}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
