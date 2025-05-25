import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Book } from '../types';
import Button from './ui/Button';
import { useCart } from '../context/CartContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/books/${book.id}`}>
        <div className="relative h-60 overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 bg-blue-900 text-white px-2 py-1 text-xs">
            {book.genre}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-blue-900 font-bold">${book.price.toFixed(2)}</span>
            <span className={`text-sm ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={(e) => {
            e.preventDefault();
            addToCart(book);
          }}
          disabled={book.stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default BookCard;