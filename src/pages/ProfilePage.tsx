import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Settings, ShoppingBag, LogOut, Package, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserOrders } from '../hooks/useOrders';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { orders, loading, error, refetch } = useUserOrders();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-900" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.isAdmin && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full p-3 text-left rounded-md transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Account Details
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full p-3 text-left rounded-md transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Order History
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 text-left rounded-md transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
              
              <button 
                onClick={() => logout()}
                className="flex items-center w-full p-3 text-left text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <>
                <h2 className="text-xl font-semibold mb-6">Account Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Button variant="outline">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  <Button variant="outline" size="sm" onClick={refetch}>
                    Refresh
                  </Button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : error ? (
                  <ErrorMessage message={error} onRetry={refetch} />
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-blue-900">Order #{order.id.slice(0, 8)}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <DollarSign className="h-4 w-4 mr-1" />
                              ${order.totalAmount.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Package className="h-4 w-4 mr-1" />
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.book.title} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">No orders yet</p>
                    <Link to="/">
                      <Button variant="primary" className="mt-4">
                        Browse Books
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Email notifications for order updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Make my reading list public</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Allow book recommendations</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="primary">Save Settings</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;