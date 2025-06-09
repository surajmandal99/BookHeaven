// This file is now deprecated - data comes from Supabase
// Keeping for backward compatibility during transition

import { Book } from '../types';

export const books: Book[] = [];

export const genres: string[] = [];

export const getBookById = (id: string): Book | undefined => {
  // This function is now handled by bookService
  return undefined;
};

export const getBooksByGenre = (genre: string): Book[] => {
  // This function is now handled by bookService
  return [];
};

export const searchBooks = (query: string): Book[] => {
  // This function is now handled by bookService
  return [];
};