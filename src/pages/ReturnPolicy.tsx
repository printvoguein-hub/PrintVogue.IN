import React, { useState } from 'react';
import { Package, Clock, CreditCard, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    reason: '',
    comments: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the return request to your API
    alert('Return request submitted successfully! We\'ll email you with next steps.');
    setShowReturnForm(false);
    setFormData({ orderId: '', email: '', reason: '', comments: '' });
  };

  const returnReasons = [
    'Item doesn\'t fit',
    'Wrong item received',
    'Item damaged/defective',
    'Changed my mind',
    'Item not as described',
    'Other'
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Fill out our return form with your order details',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      step: 2,
      title: 'Pack Your Item',
      description: 'Pack the item in original packaging with all tags attached',
      icon: <Package className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      step: 3,
      title: 'Ship It Back',
      description: 'Use our prepaid return label or drop off at any partner location',
      icon: <ArrowRight className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 4,
      title: 'Get Refunded',
      description: 'Receive your refund within 5-7 business days after we receive your return',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Package className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hassle-free returns</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Not completely satisfied? No worries! We make returns simple and stress-free
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Return Policy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Window</h3>
              <p className="text-gray-600">Return items within 30 days of delivery for a full refund</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Returns</h3>
              <p className="text-gray-600">We provide prepaid return labels for all eligible returns</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Refunds</h3>
              <p className="text-gray-600">Refunds processed within 5-7 business days of receiving your return</p>
            </div>
          </div>

          {/* Return Process Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Returns Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {step.icon}
                  </div>
                  <div className="mb-2">
                    <span className="inline-block w-8 h-8 bg-gray-200 rounded-full text-sm font-bold flex items-center justify-center mb-2">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Return Conditions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  What Can Be Returned
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Items in original condition with tags attached</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Unworn, unwashed, and undamaged items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Items returned within 30 days of delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Items in original packaging when possible</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  What Cannot Be Returned
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom printed or personalized items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Items worn, washed, or damaged by customer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Items returned after 30-day window</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Final sale or clearance items</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Request CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start a Return?</h2>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Click below to initiate your return request. We'll guide you through the process step by step.
            </p>
            <button
              onClick={() => setShowReturnForm(true)}
              className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Start Return Request
            </button>
          </div>
        </div>
      </div>

      {/* Return Form Modal */}
      {showReturnForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowReturnForm(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Return Request Form</h3>
            
            <form onSubmit={handleSubmitReturn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order ID *</label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., PV123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Return *</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us more about your return..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReturnForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:from-teal-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnPolicy;