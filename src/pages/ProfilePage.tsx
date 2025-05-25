import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Settings, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // In a real application, we would fetch these from an API
  const orders = [
    {
      id: '1',
      date: '2023-06-15',
      status: 'Delivered',
      total: 42.97,
      items: 3
    },
    {
      id: '2',
      date: '2023-05-22',
      status: 'Delivered',
      total: 29.99,
      items: 1
    }
  ];
  
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
              </div>
            </div>
            
            <div className="space-y-2">
              <Link to="/profile" className="flex items-center p-3 text-gray-700 rounded-md bg-gray-100">
                <User className="h-5 w-5 mr-3" />
                Account Details
              </Link>
              
              <Link to="/profile/orders" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <ShoppingBag className="h-5 w-5 mr-3" />
                Order History
              </Link>
              
              <Link to="/profile/settings" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
              
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
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-900 hover:text-blue-700">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;