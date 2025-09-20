import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import CustomPrint from './pages/CustomPrint';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SizeGuide from './pages/SizeGuide';
import CareInstructions from './pages/CareInstructions';
import ReturnPolicy from './pages/ReturnPolicy';
import StoreLocator from './pages/StoreLocator';
import AdminDashboard from './pages/AdminDashboard';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="*"
                  element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/category/:category" element={<Category />} />
                          <Route path="/custom-print" element={<CustomPrint />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/size-guide" element={<SizeGuide />} />
                          <Route path="/care-instructions" element={<CareInstructions />} />
                          <Route path="/return-policy" element={<ReturnPolicy />} />
                          <Route path="/store-locator" element={<StoreLocator />} />
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/search" element={<SearchResults />} />
                        </Routes>
                      </main>
                      <Footer />
                      <ScrollToTop />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
