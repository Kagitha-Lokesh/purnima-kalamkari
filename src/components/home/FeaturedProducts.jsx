import React from 'react';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const featured = getFeaturedProducts();

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-primary mb-4">Featured Collection</h2>
                        <div className="w-24 h-1 bg-accent"></div>
                    </div>
                    <Link
                        to="/products"
                        className="hidden sm:inline-block text-primary border-b-2 border-transparent hover:border-gold pb-1 font-medium transition-colors"
                    >
                        View All Products &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-10 text-center sm:hidden">
                    <Link
                        to="/products"
                        className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-md font-medium"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
