import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import BookList from '../components/BookList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const searchBooks = async () => {
      if (initialQuery) {
        setLoading(true);
        setError(null);
        try {
          const foundBooks = await bookService.searchBooks(initialQuery);
          setResults(foundBooks);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Search failed');
        } finally {
          setLoading(false);
        }
      }
    };

    searchBooks();
  }, [initialQuery]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      setLoading(true);
      setError(null);
      try {
        const foundBooks = await bookService.searchBooks(query);
        setResults(foundBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
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
          <Button type="submit" className="rounded-l-none" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : <Search className="h-5 w-5" />}
          </Button>
        </form>
      </div>
      
      {initialQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {loading 
              ? 'Searching...' 
              : results.length > 0 
                ? `${results.length} results for "${initialQuery}"` 
                : `No results found for "${initialQuery}"`}
          </h2>
        </div>
      )}

      {error ? (
        <ErrorMessage message={error} onRetry={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)} />
      ) : loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <BookList books={results} />
      )}
    </div>
  );
};

export default SearchPage;