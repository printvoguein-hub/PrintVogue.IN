import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { state, dispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const addToCart = (product: any) => {
    // Add to cart with default size and color
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-M-${product.colors[0]}`,
        name: product.name,
        price: product.price,
        image: product.image,
        size: 'M',
        color: product.colors[0],
        quantity: 1
      }
    });
    
    // Remove from wishlist after adding to cart
    removeFromWishlist(product.id);
    alert('Added to cart and removed from wishlist!');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist. Click the heart icon on any product to save it here!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{state.items.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.items.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-4 left-4 right-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-white/95 backdrop-blur-sm hover:bg-amber-500 hover:text-white text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
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
          ))}
        </div>

        {/* Clear All Button */}
        {state.items.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => dispatch({ type: 'CLEAR_WISHLIST' })}
              className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Wishlist Items</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;