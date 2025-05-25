import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  title?: string;
}

const BookList: React.FC<BookListProps> = ({ books, title }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700">No books found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;