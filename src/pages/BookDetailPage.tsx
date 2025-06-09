import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useBook } from '../hooks/useBook';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import Button from '../components/ui/Button';
import BookList from '../components/BookList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useCart } from '../context/CartContext';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBook(id!);
  const [quantity, setQuantity] = useState(1);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchRelatedBooks = async () => {
      if (book) {
        setRelatedLoading(true);
        try {
          const related = await bookService.getBooksByGenre(book.genre);
          const filtered = related.filter(b => b.id !== book.id).slice(0, 4);
          setRelatedBooks(filtered);
        } catch (error) {
          console.error('Error fetching related books:', error);
        } finally {
          setRelatedLoading(false);
        }
      }
    };

    fetchRelatedBooks();
  }, [book]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ErrorMessage 
          message={error || "Book not found"} 
          onRetry={() => window.location.reload()}
        />
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-900 hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleAddToCart = () => {
    addToCart(book, quantity);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center text-blue-900 hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Books
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  {book.genre}
                </span>
                <h1 className="text-3xl font-bold mt-2">{book.title}</h1>
                <p className="text-gray-600 mt-1">by {book.author}</p>
              </div>
              
              <div className="flex space-x-2 mt-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            <div className="mt-8 flex items-center">
              <span className="text-2xl font-bold text-blue-900">${book.price.toFixed(2)}</span>
              <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            {book.stock > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200"
                  >
                    {[...Array(Math.min(book.stock, 10)).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="flex-grow sm:flex-grow-0"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {relatedLoading ? (
        <div className="mt-12 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : relatedBooks.length > 0 && (
        <div className="mt-12">
          <BookList books={relatedBooks} title="You may also like" />
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;