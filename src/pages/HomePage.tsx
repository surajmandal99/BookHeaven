import React, { useState, useEffect } from 'react';
import { books, getBooksByGenre } from '../data/books';
import BookList from '../components/BookList';
import GenreFilter from '../components/GenreFilter';
import { Book } from '../types';

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  
  useEffect(() => {
    const filtered = getBooksByGenre(selectedGenre);
    setFilteredBooks(filtered);
  }, [selectedGenre]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to BookHaven</h1>
        <p className="text-gray-600 mt-2">Discover your next favorite book</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <GenreFilter 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
          />
        </div>
        
        <div className="flex-1">
          <BookList 
            books={filteredBooks} 
            title={selectedGenre === 'All' ? 'All Books' : selectedGenre} 
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;