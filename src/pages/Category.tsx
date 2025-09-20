import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Category: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const validCategories = ['Shirts', 'T-Shirts', 'Shorts', 'Pants'];
  
  if (!name || !validCategories.includes(name)) {
    return <Navigate to="/products" replace />;
  }

  const categoryProducts = products.filter(product => product.category === name);

  const categoryImages: { [key: string]: string } = {
    'Shirts': 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'T-Shirts': 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Shorts': 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Pants': 'https://images.pexels.com/photos/7679718/pexels-photo-7679718.jpeg?auto=compress&cs=tinysrgb&w=1200'
  };

  const categoryDescriptions: { [key: string]: string } = {
    'Shirts': 'Elegant and sophisticated printed shirts for every occasion. From formal meetings to weekend outings.',
    'T-Shirts': 'Comfortable and stylish printed t-shirts that express your personality with premium quality.',
    'Shorts': 'Trendy and comfortable printed shorts perfect for casual days and summer adventures.',
    'Pants': 'Premium printed pants that combine comfort with style for the modern fashion enthusiast.'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <img
          src={categoryImages[name]}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">{name}</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                {categoryDescriptions[name]}
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <span className="px-4 py-2 bg-amber-500 text-white rounded-full font-medium">
                  {categoryProducts.length} Products
                </span>
                <span className="text-gray-300">Premium Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        {categoryProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                All {name} ({categoryProducts.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option>Sort by Name</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">
                We're working on adding more {name.toLowerCase()} to our collection. Check back soon!
              </p>
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
              >
                Browse All Products
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;