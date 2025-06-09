import { useState, useEffect } from 'react';
import { Book } from '../types';
import { bookService } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const refetch = () => {
    fetchBooks();
  };

  return { books, loading, error, refetch };
};

export const useBook = (id: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  return { book, loading, error };
};

export const useGenres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getGenres();
        setGenres(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};