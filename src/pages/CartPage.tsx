import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/">
            <Button variant="primary" className="mt-6">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center text-blue-900 hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Continue Shopping
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.bookId} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-20 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.book.coverImage} 
                        alt={item.book.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 sm:ml-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            <Link to={`/books/${item.bookId}`} className="text-blue-900 hover:underline">
                              {item.book.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">by {item.book.author}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.book.genre}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-medium">${item.book.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.bookId, parseInt(e.target.value))}
                            className="rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200"
                          >
                            {[...Array(Math.min(item.book.stock, 10)).keys()].map(i => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <span className="ml-3 text-sm text-gray-500">
                            ${(item.quantity * item.book.price).toFixed(2)}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.bookId)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => clearCart()}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              fullWidth
              size="lg"
              onClick={() => {}}
              disabled={!user}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
            
            {!user && (
              <div className="mt-4 text-center">
                <Link to="/login" className="text-blue-900 hover:underline">
                  Login to continue
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;