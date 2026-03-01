import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 'women',
        title: 'Women',
        image: 'https://images.unsplash.com/photo-1583391733958-6fae2b80e121?w=800&q=80',
        colSpan: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 'men',
        title: 'Men',
        image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&q=80',
        colSpan: 'col-span-1'
    },
    {
        id: 'kids',
        title: 'Kids',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
        colSpan: 'col-span-1'
    },
    {
        id: 'kalamkari',
        title: 'Kalamkari Special',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
        colSpan: 'md:col-span-2'
    }
];

const Categories = () => {
    return (
        <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-primary mb-4">Shop by Category</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            className={`relative overflow-hidden rounded-lg group ${cat.colSpan}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={`/products?category=${cat.id}`} className="block w-full h-full">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50 flex items-center justify-center">
                                    <h3 className="text-3xl font-serif text-white tracking-widest uppercase border-2 border-white px-6 py-3 bg-black bg-opacity-20 backdrop-blur-sm">
                                        {cat.title}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
