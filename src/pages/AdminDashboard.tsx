import React, { useState } from 'react';
import { 
  Users, Package, MapPin, RotateCcw, AlertTriangle, 
  Edit3, Save, Plus, Trash2, Eye, Download,
  Search, Filter, BarChart3, TrendingUp
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'search' | 'stores' | 'returns' | 'logs'>('overview');
  const [editingPage, setEditingPage] = useState<string | null>(null);

  // Mock data - in real app, this would come from APIs
  const [pages, setPages] = useState([
    { slug: 'size-guide', title: 'Size Guide', lastModified: '2024-01-15', status: 'published' },
    { slug: 'care-instructions', title: 'Care Instructions', lastModified: '2024-01-14', status: 'published' },
    { slug: 'return-policy', title: 'Return Policy', lastModified: '2024-01-13', status: 'published' }
  ]);

  const [stores, setStores] = useState([
    { id: '1', name: 'Flagship Store', address: 'Kalyan Nagar, Bangalore', phone: '+91 98765 43210', status: 'active' },
    { id: '2', name: 'Express Store', address: 'Koramangala, Bangalore', phone: '+91 98765 43211', status: 'active' },
    { id: '3', name: 'Outlet Store', address: 'Indiranagar, Bangalore', phone: '+91 98765 43212', status: 'inactive' }
  ]);

  const [returns, setReturns] = useState([
    { id: 'R001', orderId: 'PV123456', customer: 'John Doe', reason: 'Size issue', status: 'pending', date: '2024-01-15' },
    { id: 'R002', orderId: 'PV123457', customer: 'Jane Smith', reason: 'Defective item', status: 'approved', date: '2024-01-14' },
    { id: 'R003', orderId: 'PV123458', customer: 'Mike Johnson', reason: 'Wrong item', status: 'completed', date: '2024-01-13' }
  ]);

  const searchQueries = [
    { query: 'red t-shirt', count: 45, date: '2024-01-15' },
    { query: 'summer dress', count: 32, date: '2024-01-15' },
    { query: 'printed shorts', count: 28, date: '2024-01-14' },
    { query: 'custom print', count: 23, date: '2024-01-14' }
  ];

  const errorLogs = [
    { id: '1', error: 'TypeError: Cannot read property', page: '/products', userAgent: 'Chrome 120', date: '2024-01-15 14:30' },
    { id: '2', error: 'Network Error: Failed to fetch', page: '/cart', userAgent: 'Safari 17', date: '2024-01-15 13:45' },
    { id: '3', error: 'ReferenceError: undefined variable', page: '/checkout', userAgent: 'Firefox 121', date: '2024-01-15 12:20' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'pages', label: 'Pages', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-4 h-4" /> },
    { id: 'stores', label: 'Stores', icon: <MapPin className="w-4 h-4" /> },
    { id: 'returns', label: 'Returns', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'logs', label: 'Logs', icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const handleUpdateReturnStatus = (returnId: string, newStatus: string) => {
    setReturns(returns.map(ret => 
      ret.id === returnId ? { ...ret, status: newStatus } : ret
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-purple-100">Manage your PrintVogue store</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-purple-100">Welcome back,</p>
                <p className="font-semibold">Admin User</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Stores</p>
                      <p className="text-2xl font-bold text-gray-900">{stores.filter(s => s.status === 'active').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Returns</p>
                      <p className="text-2xl font-bold text-gray-900">{returns.filter(r => r.status === 'pending').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <RotateCcw className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Error Reports</p>
                      <p className="text-2xl font-bold text-gray-900">{errorLogs.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages Management Tab */}
            {activeTab === 'pages' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Content Pages</h2>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Page
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pages.map((page) => (
                        <tr key={page.slug} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{page.title}</div>
                              <div className="text-sm text-gray-500">/{page.slug}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {page.lastModified}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-purple-600 hover:text-purple-900 p-1">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 p-1">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Search Management Tab */}
            {activeTab === 'search' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Recent Search Queries</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {searchQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">"{query.query}"</p>
                            <p className="text-sm text-gray-500">{query.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">{query.count}</p>
                            <p className="text-xs text-gray-500">searches</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Search Settings</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add Search Synonym</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., tee = t-shirt"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                          Add
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Boost Product</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Product ID"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                          Boost
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stores Management Tab */}
            {activeTab === 'stores' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Store Locations</h2>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Store
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stores.map((store) => (
                        <tr key={store.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{store.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{store.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{store.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(store.status)}`}>
                              {store.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-purple-600 hover:text-purple-900 p-1">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Returns Management Tab */}
            {activeTab === 'returns' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Return Requests</h2>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {returns.map((returnItem) => (
                        <tr key={returnItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{returnItem.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{returnItem.orderId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{returnItem.customer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{returnItem.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={returnItem.status}
                              onChange={(e) => handleUpdateReturnStatus(returnItem.id, e.target.value)}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(returnItem.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-purple-600 hover:text-purple-900 p-1">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900 p-1">
                                <Save className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Error Logs Tab */}
            {activeTab === 'logs' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Frontend Error Logs</h2>
                    <div className="flex items-center gap-2">
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {errorLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm text-red-600 font-mono max-w-xs truncate">{log.error}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{log.page}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{log.userAgent}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{log.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900 p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;