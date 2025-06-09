import { supabase } from '../lib/supabase';
import { Book } from '../types';

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching books:', error);
      throw error;
    }

    return data.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      coverImage: book.cover_image,
      genre: book.genre,
      stock: book.stock
    }));
  },

  async getBookById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Book not found
      }
      console.error('Error fetching book:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      coverImage: data.cover_image,
      genre: data.genre,
      stock: data.stock
    };
  },

  async getBooksByGenre(genre: string): Promise<Book[]> {
    if (genre === 'All') {
      return this.getAllBooks();
    }

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('genre', genre)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching books by genre:', error);
      throw error;
    }

    return data.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      coverImage: book.cover_image,
      genre: book.genre,
      stock: book.stock
    }));
  },

  async searchBooks(query: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%,genre.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching books:', error);
      throw error;
    }

    return data.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      coverImage: book.cover_image,
      genre: book.genre,
      stock: book.stock
    }));
  },

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .insert([{
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        cover_image: book.coverImage,
        genre: book.genre,
        stock: book.stock
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating book:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      coverImage: data.cover_image,
      genre: data.genre,
      stock: data.stock
    };
  },

  async updateBook(id: string, updates: Partial<Omit<Book, 'id'>>): Promise<Book> {
    const updateData: any = {};
    
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.author !== undefined) updateData.author = updates.author;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.coverImage !== undefined) updateData.cover_image = updates.coverImage;
    if (updates.genre !== undefined) updateData.genre = updates.genre;
    if (updates.stock !== undefined) updateData.stock = updates.stock;

    const { data, error } = await supabase
      .from('books')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      coverImage: data.cover_image,
      genre: data.genre,
      stock: data.stock
    };
  },

  async deleteBook(id: string): Promise<void> {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  async getGenres(): Promise<string[]> {
    const { data, error } = await supabase
      .from('books')
      .select('genre')
      .order('genre');

    if (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }

    const uniqueGenres = [...new Set(data.map(item => item.genre))];
    return uniqueGenres;
  }
};