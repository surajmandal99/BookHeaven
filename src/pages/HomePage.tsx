import React, { useState, useEffect } from 'react';
import { useBooks, useGenres } from '../hooks/useBooks';
import { bookService } from '../services/bookService';
import BookList from '../components/BookList';
import GenreFilter from '../components/GenreFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Book } from '../types';

const HomePage: React.FC = () => {
  const { books: allBooks, loading: booksLoading, error: booksError, refetch } = useBooks();
  const { genres, loading: genresLoading } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);
  
  useEffect(() => {
    const filterBooks = async () => {
      if (selectedGenre === 'All') {
        setFilteredBooks(allBooks);
      } else {
        setFilterLoading(true);
        try {
          const filtered = await bookService.getBooksByGenre(selectedGenre);
          setFilteredBooks(filtered);
        } catch (error) {
          console.error('Error filtering books:', error);
          setFilteredBooks([]);
        } finally {
          setFilterLoading(false);
        }
      }
    };

    filterBooks();
  }, [selectedGenre, allBooks]);

  if (booksLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={booksError} onRetry={refetch} />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to BookHaven</h1>
        <p className="text-gray-600 mt-2">Discover your next favorite book</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 mb-6 md:mb-0">
          {genresLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <GenreFilter 
              selectedGenre={selectedGenre} 
              onSelectGenre={setSelectedGenre}
              genres={genres}
            />
          )}
        </div>
        
        <div className="flex-1">
          {filterLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <BookList 
              books={filteredBooks} 
              title={selectedGenre === 'All' ? 'All Books' : selectedGenre} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;