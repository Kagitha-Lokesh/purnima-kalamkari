import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Filter, ChevronDown } from 'lucide-react';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'all';
    const searchParam = searchParams.get('search') || '';

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filters state
    const [filters, setFilters] = useState({
        category: categoryParam,
        priceRange: 'all',
        size: 'all',
        sortBy: 'featured'
    });

    // Apply filters whenever state changes
    useEffect(() => {
        let result = [...products];

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category);
        }

        // Price filter
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            result = result.filter(p => p.price >= min && (max ? p.price <= max : true));
        }

        // Size filter
        if (filters.size !== 'all') {
            result = result.filter(p => p.sizes.includes(filters.size) || p.sizes.includes('FS'));
        }

        // Search query filter
        if (searchParam) {
            const query = searchParam.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Sorting
        switch (filters.sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
                break;
            default:
                // 'featured' - just keep original order
                break;
        }

        setFilteredProducts(result);
    }, [filters, searchParam]);

    // Sync category param with filters
    useEffect(() => {
        setFilters(prev => ({ ...prev, category: categoryParam }));
    }, [categoryParam]);

    const handleFilterChange = (type, value) => {
        if (type === 'category') {
            setSearchParams(value === 'all' ? {} : { category: value });
        } else {
            setFilters(prev => ({ ...prev, [type]: value }));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Collection</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Explore our authentic range of hand-crafted Kalamkari and traditional wear.</p>
                {searchParam && (
                    <div className="mt-4 text-primary font-medium">
                        Showing results for: <span className="text-gray-900 border-b border-gray-300 pb-1 px-1">"{searchParam}"</span>
                        <button
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams);
                                newParams.delete('search');
                                setSearchParams(newParams);
                            }}
                            className="ml-3 text-sm text-gray-400 hover:text-red-500 underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
                <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Mobile Filter Toggle */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-700">{filteredProducts.length} Products</span>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-primary font-medium"
                    >
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {/* Sidebar Filters */}
                <div className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24 space-y-8">

                        {/* Categories */}
                        <div>
                            <h3 className="text-lg font-serif text-primary mb-4 flex items-center justify-between">
                                Categories <ChevronDown size={16} />
                            </h3>
                            <div className="space-y-2">
                                {['all', 'kalamkari', 'women', 'men', 'kids'].map(cat => (
                                    <label key={cat} className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={filters.category === cat}
                                            onChange={() => handleFilterChange('category', cat)}
                                            className="form-radio text-accent focus:ring-accent h-4 w-4"
                                        />
                                        <span className="ml-3 text-gray-600 group-hover:text-primary capitalize">
                                            {cat === 'all' ? 'All Products' : cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Price */}
                        <div>
                            <h3 className="text-lg font-serif text-primary mb-4 flex items-center justify-between">
                                Price Range <ChevronDown size={16} />
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'All Prices', val: 'all' },
                                    { label: 'Under ₹1,000', val: '0-1000' },
                                    { label: '₹1,000 - ₹2,500', val: '1000-2500' },
                                    { label: '₹2,500 - ₹5,000', val: '2500-5000' },
                                    { label: 'Over ₹5,000', val: '5000-100000' }
                                ].map(price => (
                                    <label key={price.val} className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="price"
                                            checked={filters.priceRange === price.val}
                                            onChange={() => handleFilterChange('priceRange', price.val)}
                                            className="form-radio text-accent focus:ring-accent h-4 w-4"
                                        />
                                        <span className="ml-3 text-gray-600 group-hover:text-primary">
                                            {price.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Sizes */}
                        <div>
                            <h3 className="text-lg font-serif text-primary mb-4 flex items-center justify-between">
                                Size <ChevronDown size={16} />
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {['all', 'S', 'M', 'L', 'XL', 'XXL', 'FS'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => handleFilterChange('size', size)}
                                        className={`py-1 px-2 border rounded-md text-sm text-center transition-colors ${filters.size === size
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                                            }`}
                                    >
                                        {size === 'all' ? 'All' : size}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Product Grid Area */}
                <div className="flex-1">
                    {/* Active Filters & Sorting */}
                    <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <span className="font-medium text-gray-700 tracking-wide">{filteredProducts.length} Products Found</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm">Sort by:</span>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="border-gray-300 rounded-md text-gray-700 text-sm focus:ring-accent focus:border-accent"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">New Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                            <button
                                onClick={() => setFilters({ category: 'all', priceRange: 'all', size: 'all', sortBy: 'featured' })}
                                className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Products;
