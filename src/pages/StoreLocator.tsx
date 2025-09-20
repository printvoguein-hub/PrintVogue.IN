import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  directionsUrl: string;
}

const StoreLocator: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock store data - in real app, this would come from API
  const stores: Store[] = [
    {
      id: '1',
      name: 'PrintVogue Flagship Store',
      address: 'Kalyan Nagar, Bangalore, Karnataka 560043',
      lat: 13.0358,
      lng: 77.6413,
      phone: '+91 98765 43210',
      hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM',
      directionsUrl: 'https://maps.google.com/?q=13.0358,77.6413'
    },
    {
      id: '2',
      name: 'PrintVogue Express',
      address: 'Koramangala, Bangalore, Karnataka 560034',
      lat: 12.9352,
      lng: 77.6245,
      phone: '+91 98765 43211',
      hours: 'Mon-Sun: 10AM-10PM',
      directionsUrl: 'https://maps.google.com/?q=12.9352,77.6245'
    },
    {
      id: '3',
      name: 'PrintVogue Outlet',
      address: 'Indiranagar, Bangalore, Karnataka 560038',
      lat: 12.9719,
      lng: 77.6412,
      phone: '+91 98765 43212',
      hours: 'Mon-Sat: 10AM-8PM, Sun: Closed',
      directionsUrl: 'https://maps.google.com/?q=12.9719,77.6412'
    }
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerClick = (store: Store) => {
    setSelectedStore(store);
  };

  const handleGetDirections = (store: Store) => {
    window.open(store.directionsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Our Stores</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Visit our physical locations to experience PrintVogue fashion in person
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Store List */}
            <div className="space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search stores by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Store Cards */}
              <div className="space-y-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedStore?.id === store.id ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                    }`}
                    onClick={() => handleMarkerClick(store)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleMarkerClick(store);
                      }
                    }}
                    aria-label={`Select ${store.name}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                        
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1 text-teal-600 flex-shrink-0" />
                            <span className="text-sm">{store.address}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <a href={`tel:${store.phone}`} className="text-sm hover:text-teal-600 transition-colors">
                              {store.phone}
                            </a>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 mt-1 text-teal-600 flex-shrink-0" />
                            <span className="text-sm">{store.hours}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(store);
                        }}
                        className="ml-4 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                        aria-label={`Get directions to ${store.name}`}
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredStores.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No stores found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 lg:h-full min-h-[500px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8477!2d77.6413!3d13.0358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d6b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sKalyan%20Nagar%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                  title="PrintVogue Store Locations"
                ></iframe>
                
                {/* Selected Store Info Overlay */}
                {selectedStore && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-1">{selectedStore.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedStore.address}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{selectedStore.phone}</span>
                      <button
                        onClick={() => handleGetDirections(selectedStore)}
                        className="px-3 py-1 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Contact our customer service team for assistance with store locations, product availability, or any other questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Call Us: +91 98765 43210
              </a>
              <a
                href="mailto:hello@printvogue.com"
                className="bg-white/20 text-white font-semibold py-3 px-6 rounded-full hover:bg-white/30 transition-colors duration-300 transform hover:scale-105"
              >
                Email: hello@printvogue.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;