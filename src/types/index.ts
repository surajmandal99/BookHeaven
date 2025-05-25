export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  genre: string;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  quantity: number;
  price: number;
  book: Book;
}