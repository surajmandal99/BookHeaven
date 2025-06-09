import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpen, Package, ShoppingBag, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../hooks/useBooks';
import { useAllOrders } from '../../hooks/useOrders';
import { bookService } from '../../services/bookService';
import { orderService } from '../../services/orderService';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import BookForm from '../../components/admin/BookForm';
import { Book } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { books, loading: booksLoading, error: booksError, refetch: refetchBooks } = useBooks();
  const { orders, loading: ordersLoading, error: ordersError, refetch: refetchOrders } = useAllOrders();
  const [activeTab, setActiveTab] = useState('books');
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  const handleCreateBook = async (bookData: Omit<Book, 'id'>) => {
    setIsSubmitting(true);
    try {
      await bookService.createBook(bookData);
      setShowBookForm(false);
      refetchBooks();
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBook = async (bookData: Omit<Book, 'id'>) => {
    if (!editingBook) return;
    
    setIsSubmitting(true);
    try {
      await bookService.updateBook(editingBook.id, bookData);
      setEditingBook(null);
      refetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      await bookService.deleteBook(bookId);
      refetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: 'pending' | 'completed' | 'cancelled') => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      refetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        {activeTab === 'books' && !showBookForm && !editingBook && (
          <Button variant="primary" onClick={() => setShowBookForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        )}
      </div>

      {showBookForm && (
        <div className="mb-8">
          <BookForm
            onSubmit={handleCreateBook}
            onCancel={() => setShowBookForm(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {editingBook && (
        <div className="mb-8">
          <BookForm
            book={editingBook}
            onSubmit={handleUpdateBook}
            onCancel={() => setEditingBook(null)}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
      
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
                Books ({books.length})
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
                Orders ({orders.length})
              </div>
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'books' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Books</h2>
              
              {booksLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : booksError ? (
                <ErrorMessage message={booksError} onRetry={refetchBooks} />
              ) : (
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
                            <button 
                              onClick={() => setEditingBook(book)}
                              className="text-blue-900 hover:text-blue-700 mr-3"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              
              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : ordersError ? (
                <ErrorMessage message={ordersError} onRetry={refetchOrders} />
              ) : orders.length > 0 ? (
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
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
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
                            #{order.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                              className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border-0 ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
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
                <div className="text-center py-8 text-gray-500">
                  No orders found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;