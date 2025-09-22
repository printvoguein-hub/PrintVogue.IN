import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
          {/* Brand */}
          <div className="space-y-4 group">
            <h3 className="text-2xl font-bold text-amber-500 group-hover:text-amber-400 transition-colors duration-300">PrintVogue</h3>
            <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Luxury printed clothing for the style-conscious. Where fashion meets artistry in perfect harmony.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/printvogue" 
                target="_blank" 
                rel="noopener noreferrer"
                href="https://www.instagram.com/printvogue.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-125 hover:-rotate-12"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61580900657704" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 group">
            <h4 className="text-lg font-semibold group-hover:text-amber-400 transition-colors duration-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">All Products</a></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Size Guide</Link></li>
              <li><Link to="/care-instructions" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Care Instructions</Link></li>
              <li><Link to="/return-policy" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Return Policy</Link></li>
              <li><Link to="/store-locator" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Store Locator</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4 group">
            <h4 className="text-lg font-semibold group-hover:text-amber-400 transition-colors duration-300">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@printvogue.com" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Contact Us</a></li>
              <li><a href="mailto:printvogue.in@gmail.com" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Terms & Privacy</a></li>
              <li><a href="tel:+919876543210" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">Call Support</a></li>
              <li><a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 inline-block">WhatsApp Help</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 group">
            <h4 className="text-lg font-semibold group-hover:text-amber-400 transition-colors duration-300">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Kalyan Nagar, Bangalore, India</span>
              </div>
              <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 text-sm hover:text-amber-400 transition-colors duration-300">+91 98765 43210</a>
              </div>
              <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:printvogue.in@gmail.com" className="text-gray-300 text-sm hover:text-amber-400 transition-colors duration-300">printvogue.in@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4 group">
            <h4 className="text-lg font-semibold group-hover:text-amber-400 transition-colors duration-300">Find Us</h4>
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8477!2d77.6413!3d13.0358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d6b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sKalyan%20Nagar%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-transform duration-300 group-hover:scale-105"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center relative z-10">
          <p className="text-gray-400 text-sm">
            © 2025 PrintVogue. All rights reserved. | Made with ❤️ in Bangalore
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;