import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.',
    price: 12.99,
    coverImage: 'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fiction',
    stock: 15
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'A revolutionary system to get 1 percent better every day. People think when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way.',
    price: 14.99,
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Self-Help',
    stock: 8
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn\'t know that.',
    price: 15.99,
    coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Science Fiction',
    stock: 12
  },
  {
    id: '4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do.',
    price: 11.99,
    coverImage: 'https://images.pexels.com/photos/3747513/pexels-photo-3747513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Finance',
    stock: 20
  },
  {
    id: '5',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    description: 'Alicia Berenson\'s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house in one of London\'s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
    price: 13.99,
    coverImage: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Thriller',
    stock: 5
  },
  {
    id: '6',
    title: 'Educated',
    author: 'Tara Westover',
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    price: 12.99,
    coverImage: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Memoir',
    stock: 10
  },
  {
    id: '7',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
    price: 14.99,
    coverImage: 'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Fiction',
    stock: 7
  },
  {
    id: '8',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    price: 16.99,
    coverImage: 'https://images.pexels.com/photos/6478650/pexels-photo-6478650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: 'Science Fiction',
    stock: 18
  }
];

export const genres = [...new Set(books.map(book => book.genre))];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBooksByGenre = (genre: string): Book[] => {
  if (genre === 'All') return books;
  return books.filter(book => book.genre === genre);
};

export const searchBooks = (query: string): Book[] => {
  const lowercaseQuery = query.toLowerCase();
  return books.filter(
    book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery)
  );
};