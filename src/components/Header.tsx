import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Shirts', path: '/category/Shirts' },
    { label: 'T-Shirts', path: '/category/T-Shirts' },
    { label: 'Shorts', path: '/category/Shorts' },
    { label: 'Pants', path: '/category/Pants' },
    { label: 'Custom Print', path: '/custom-print' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-slate-900 hover:text-amber-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            PrintVogue
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-700 hover:text-amber-600 font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
  type="button"
  onClick={() => setIsSearchOpen(true)}
  className="p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300"
  aria-label="Search products"
>
  <Search className="w-5 h-5" />
</button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300"
            >
              <Heart className="w-5 h-5" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {wishlistState.items.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {state.items.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-amber-600 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <nav className="bg-gray-50 rounded-lg p-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-700 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-700 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-700 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;