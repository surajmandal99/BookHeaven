import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { BookOpen, Package, ShoppingBag, Users, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { books } from '../../data/books';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('books');
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        {activeTab === 'books' && (
          <Link to="/admin/books/new">
            <Button variant="primary">
              <Plus className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </Link>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('books')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'books'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Books
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('inventory')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Inventory
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Orders
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Users
              </div>
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'books' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Books</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded object-cover" src={book.coverImage} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{book.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.genre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${book.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            book.stock > 5 
                              ? 'bg-green-100 text-green-800' 
                              : book.stock > 0 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {book.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-900 hover:text-blue-700 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
              <p className="text-gray-600">Update stock levels and track inventory.</p>
              
              {/* Inventory management UI would go here */}
              <div className="mt-6 text-center text-gray-500">
                Inventory management features would be implemented here in a full version.
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <p className="text-gray-600">View and manage customer orders.</p>
              
              {/* Orders management UI would go here */}
              <div className="mt-6 text-center text-gray-500">
                Order management features would be implemented here in a full version.
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-600">Manage user accounts and permissions.</p>
              
              {/* User management UI would go here */}
              <div className="mt-6 text-center text-gray-500">
                User management features would be implemented here in a full version.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;