import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, X } from 'lucide-react';
import { Book } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  coverImage: z.string().url('Must be a valid URL'),
  genre: z.string().min(1, 'Genre is required'),
  stock: z.number().min(0, 'Stock must be non-negative'),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  book?: Book;
  onSubmit: (data: Omit<Book, 'id'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: book ? {
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      coverImage: book.coverImage,
      genre: book.genre,
      stock: book.stock,
    } : {
      title: '',
      author: '',
      description: '',
      price: 0,
      coverImage: '',
      genre: '',
      stock: 0,
    }
  });

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Health',
    'Travel',
    'Cooking',
    'Art',
    'Religion',
    'Philosophy',
    'Poetry',
    'Drama'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {book ? 'Edit Book' : 'Add New Book'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            fullWidth
          />

          <Input
            label="Author"
            {...register('author')}
            error={errors.author?.message}
            fullWidth
          />

          <Input
            label="Price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            fullWidth
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              {...register('genre')}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>}
          </div>

          <Input
            label="Stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            error={errors.stock?.message}
            fullWidth
          />

          <Input
            label="Cover Image URL"
            {...register('coverImage')}
            error={errors.coverImage?.message}
            fullWidth
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
            placeholder="Enter book description..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : book ? 'Update Book' : 'Create Book'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;