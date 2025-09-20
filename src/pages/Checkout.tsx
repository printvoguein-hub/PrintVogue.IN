import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, MapPin, CheckCircle, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: 'Karnataka'
  });

  const shippingCost = state.total >= 2999 ? 0 : 99;
  const tax = Math.round(state.total * 0.18);
  const totalAmount = state.total + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateOrderId = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `PV${timestamp}${random}`.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order via Supabase
      const orderResult = await createOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment',
        items: state.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image
        })),
        subtotal: state.total,
        shipping: shippingCost,
        tax: tax,
        total: totalAmount
      });
      
      if (orderResult.success && orderResult.orderId) {
        setOrderId(orderResult.orderId);
        setIsOrderPlaced(true);
        setIsProcessing(false);
        
        // Clear cart after successful order
        setTimeout(() => {
          dispatch({ type: 'CLEAR_CART' });
        }, 3000);
      } else {
        throw new Error(orderResult.error || 'Failed to create order');
      }

    } catch (error) {
      console.error('Error processing order:', error);
      setIsProcessing(false);
      alert(`There was an error processing your order: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="text-amber-600 hover:text-amber-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Order...</h2>
          <p className="text-gray-600 mb-4">Please wait while we confirm your order and send notifications</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span>Saving order and sending emails...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 font-semibold">Order ID: {orderId}</p>
            </div>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We've saved your order and sent confirmation emails to both you and our team. 
              You'll receive tracking details soon!
            </p>
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Order Details:</h3>
              <div className="text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Total:</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmation Email:</span>
                  <span className="text-green-600">✓ Sent via Supabase</span>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
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
            to="/cart"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <div className="ml-3 flex items-center">
                        <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'upi')}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <div className="ml-3 flex items-center">
                        <Smartphone className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">UPI Payment</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* UPI QR Code */}
                {paymentMethod === 'upi' && (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="w-48 h-48 bg-white border border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">UPI QR Code</p>
                        <p className="text-xs text-gray-500">Scan to pay</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan this QR code with any UPI app to make payment
                    </p>
                  </div>
                )}

                {/* Email Notification Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Supabase Email System Active</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Orders are saved to database and emails sent automatically via Supabase Edge Functions.
                  </p>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Place Order - ₹{totalAmount.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        Size: {item.size}, Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Delivering to Kalyan Nagar, Bangalore</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;