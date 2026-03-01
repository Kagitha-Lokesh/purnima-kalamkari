import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <div className="w-full">
            <Hero />
            <FeaturedProducts />
            <Categories />
            <Testimonials />
        </div>
    );
};

export default Home;
