import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Palette, ShieldCheck, Play, Quote, Mail, Instagram, Facebook, MessageCircle, ChevronLeft, ChevronRight, Sparkles, Heart, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 6));
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Allen Samuel",
      rating: 5,
      text: "Absolutely love the quality and unique designs! The custom print service exceeded my expectations.",
      location: "Mumbai",
      age: "22",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Emanuel Manu",
      rating: 5,
      text: "Premium quality fabrics and stunning prints. PrintVogue has become my go-to for fashion.",
      location: "Bangalore",
      age: "25",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Prinstone Antony",
      rating: 5,
      text: "The attention to detail is incredible. Every piece feels like luxury fashion.",
      location: "Hyderabad",
      age: "24",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Niggatron",
      rating: 5,
      text: "Outstanding quality and unique designs. PrintVogue delivers exactly what they promise.",
      location: "Chennai",
      age: "26",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const categories = [
    {
      name: 'Shirts',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/category/Shirts',
      description: 'Elegant & Sophisticated'
    },
    {
      name: 'T-Shirts',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/category/T-Shirts',
      description: 'Casual & Comfortable'
    },
    {
      name: 'Shorts',
      image: 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/category/Shorts',
      description: 'Summer Essentials'
    },
    {
      name: 'Pants',
      image: 'https://images.pexels.com/photos/7679718/pexels-photo-7679718.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/category/Pants',
      description: 'Premium & Versatile'
    },
    {
      name: 'Custom Print',
      image: 'https://images.pexels.com/photos/8839876/pexels-photo-8839876.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/custom-print',
      description: 'Your Design, Your Style'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900" 
             style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <img
            src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury Fashion"
            className="w-full h-full object-cover opacity-40"
            style={{ transform: `scale(${1 + scrollY * 0.0005})` }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 opacity-0 animate-fadeInUp" 
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Luxury Printed
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Fashion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed opacity-0 animate-fadeInUp max-w-2xl mx-auto"
             style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Where artistry meets elegance. Discover premium printed clothing crafted for the style-conscious generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fadeInUp"
               style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Link
              to="/products"
              className="group relative px-8 py-4 bg-white text-slate-900 font-semibold rounded-full trendy-button transition-all duration-300 hover:bg-amber-500 hover:text-white transform hover:scale-105 shadow-2xl pulse-cta"
            >
              <span className="flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link
              to="/custom-print"
              className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-slate-900 transform hover:scale-105 youth-hover"
            >
              <span className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Custom Print</span>
              </span>
            </Link>
          </div>

          {/* Social proof */}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce social-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-gray-50 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections designed for every vibe and moment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 youth-hover modern-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked designs that define contemporary luxury fashion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fadeInUp youth-hover"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 bg-slate-900 hover:bg-amber-500 text-white font-semibold py-4 px-8 rounded-full trendy-button transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Banner */}
      <section className="relative py-32 overflow-hidden scroll-animate">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/70 z-10" />
        <img
          src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Prints.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Premium Style.
            </span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your vision into wearable art with our bespoke printing service
          </p>
          <Link
            to="/custom-print"
            className="inline-flex items-center space-x-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-full trendy-button transition-all duration-300 transform hover:scale-105 shadow-2xl pulse-cta"
          >
            <Palette className="w-5 h-5" />
            <span>Start Creating</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by fashion enthusiasts across India</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl p-12 shadow-xl modern-card youth-hover">
              <Quote className="w-12 h-12 text-amber-500 mb-6" />
              
              <div className="mb-8">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-amber-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].location} • Age {testimonials[currentTestimonial].age}</p>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 youth-hover ${
                      index === currentTestimonial ? 'bg-amber-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-white scroll-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Stay in Style
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe for exclusive drops, early access to collections, and style inspo
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center sm:text-left modern-card"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-amber-500 text-white font-semibold py-4 px-8 rounded-full trendy-button transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Subscribe
              </button>
            </form>
            
            <div className="flex items-center justify-center space-x-6 mt-8">
              <a 
                href="https://wa.me/919876543210"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-all duration-300 transform hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a 
                href="https://www.instagram.com/printvogue.in/"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61580900657704"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;