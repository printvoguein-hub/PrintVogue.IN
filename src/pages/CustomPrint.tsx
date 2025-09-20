import React, { useState } from 'react';
import { Upload, MessageCircle, Palette, Shirt, ShoppingBag } from 'lucide-react';

const CustomPrint: React.FC = () => {
  const [selectedType, setSelectedType] = useState('t-shirt');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const productTypes = [
    { id: 't-shirt', name: 'T-Shirt', price: 1999, image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'shirt', name: 'Shirt', price: 2999, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'shorts', name: 'Shorts', price: 1799, image: 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'pants', name: 'Pants', price: 2799, image: 'https://images.pexels.com/photos/7679718/pexels-photo-7679718.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080', '#FFC0CB'];

  const selectedProduct = productTypes.find(type => type.id === selectedType);
  const customPrice = selectedProduct ? selectedProduct.price + 500 : 500; // Custom print fee

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize || !selectedColor || !uploadedImage) {
      alert('Please complete all selections and upload an image');
      return;
    }

    const message = `Hi! I'd like to place a custom print order:

Product: ${selectedProduct?.name}
Size: ${selectedSize}
Color: ${selectedColor}
Custom Print Fee: ₹500
Total Price: ₹${customPrice.toLocaleString()}

Notes: ${notes || 'None'}

I have uploaded my custom design. Please confirm the order and let me know the next steps.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Custom Print Studio</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Transform your ideas into wearable art. Upload your design and create something uniquely yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>High-Quality Printing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Premium Materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Configuration */}
          <div className="space-y-8">
            {/* Product Type Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Product</h3>
              <div className="grid grid-cols-2 gap-4">
                {productTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                      selectedType === type.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={type.image}
                      alt={type.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                    <p className="text-amber-600 font-bold">₹{type.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Base Color</h3>
              <div className="flex flex-wrap gap-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-amber-500 scale-110'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${color === '#FFFFFF' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Upload */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Design</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors duration-300">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded design"
                      className="max-w-full max-h-48 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="text-green-600 font-medium">Design uploaded successfully!</p>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Change Design
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag & drop your design here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 cursor-pointer"
                    >
                      Choose File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPG, PNG, SVG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Special Instructions</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions for your custom print? (placement, size preferences, etc.)"
                className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Right Side - Preview & Order */}
          <div className="space-y-8">
            {/* Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Product Preview */}
              <div className="mb-8">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                  {selectedProduct && (
                    <div className="relative">
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: selectedColor || '#FFFFFF' }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover mix-blend-multiply opacity-80"
                        />
                      </div>
                      {uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Custom design"
                            className="max-w-32 max-h-32 object-contain bg-white/80 rounded-lg p-2"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{selectedProduct?.name || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{selectedSize || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <div className="flex items-center space-x-2">
                      {selectedColor && (
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                        />
                      )}
                      <span className="font-medium">{selectedColor || 'Not selected'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Design:</span>
                    <span className="font-medium">{uploadedImage ? 'Uploaded' : 'Not uploaded'}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price:</span>
                  <span>₹{selectedProduct?.price || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Custom Print Fee:</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>Total:</span>
                  <span>₹{customPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 mt-6 transform hover:scale-105"
                disabled={!selectedSize || !selectedColor || !uploadedImage}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Complete your selections to proceed with the order
              </p>

              {/* Features */}
              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>3-5 business days processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>High-resolution printing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Fade-resistant inks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Quality guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrint;