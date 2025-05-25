import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchBooks } from '../data/books';
import { Book } from '../types';
import BookList from '../components/BookList';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Book[]>([]);
  
  useEffect(() => {
    if (initialQuery) {
      const foundBooks = searchBooks(initialQuery);
      setResults(foundBooks);
    }
  }, [initialQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      const foundBooks = searchBooks(query);
      setResults(foundBooks);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Books</h1>
        
        <form onSubmit={handleSearch} className="flex max-w-lg">
          <Input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </div>
      
      {initialQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {results.length > 0 
              ? `${results.length} results for "${initialQuery}"` 
              : `No results found for "${initialQuery}"`}
          </h2>
        </div>
      )}
      
      <BookList books={results} />
    </div>
  );
};

export default SearchPage;