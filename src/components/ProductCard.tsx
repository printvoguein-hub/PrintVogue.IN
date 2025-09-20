import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div 
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-500 ${
          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
        }`}>
          <button 
            onClick={toggleWishlist}
            className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isInWishlist 
                ? 'text-red-500 bg-red-50 hover:bg-red-500 hover:text-white' 
                : 'text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>

        {/* Quick Add to Cart */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-white/95 backdrop-blur-sm hover:bg-amber-500 hover:text-white text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors duration-300">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Colors */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <div className="flex items-center space-x-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;