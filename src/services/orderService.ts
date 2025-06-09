import { supabase } from '../lib/supabase';
import { Order, OrderItem, CartItem } from '../types';

export const orderService = {
  async createOrder(
    userId: string, 
    cartItems: CartItem[], 
    paymentMethod: 'esewa' | 'khalti',
    paymentDetails?: any
  ): Promise<Order> {
    const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.book.price), 0);

    // Start a transaction by creating the order first
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
        payment_method: paymentMethod,
        payment_details: paymentDetails || null
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: orderData.id,
      book_id: item.bookId,
      quantity: item.quantity,
      price: item.book.price
    }));

    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select(`
        *,
        books (*)
      `);

    if (itemsError) {
      // If order items creation fails, delete the order
      await supabase.from('orders').delete().eq('id', orderData.id);
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    // Update book stock
    for (const item of cartItems) {
      const { error: stockError } = await supabase
        .from('books')
        .update({ stock: item.book.stock - item.quantity })
        .eq('id', item.bookId);

      if (stockError) {
        console.error('Error updating book stock:', stockError);
        // Continue with other items even if one fails
      }
    }

    return {
      id: orderData.id,
      userId: orderData.user_id,
      totalAmount: orderData.total_amount,
      status: orderData.status as 'pending' | 'completed' | 'cancelled',
      createdAt: orderData.created_at || '',
      items: itemsData.map(item => ({
        id: item.id,
        orderId: item.order_id,
        bookId: item.book_id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.books.id,
          title: item.books.title,
          author: item.books.author,
          description: item.books.description,
          price: item.books.price,
          coverImage: item.books.cover_image,
          genre: item.books.genre,
          stock: item.books.stock
        }
      }))
    };
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          books (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }

    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      totalAmount: order.total_amount,
      status: order.status as 'pending' | 'completed' | 'cancelled',
      createdAt: order.created_at || '',
      items: order.order_items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        bookId: item.book_id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.books.id,
          title: item.books.title,
          author: item.books.author,
          description: item.books.description,
          price: item.books.price,
          coverImage: item.books.cover_image,
          genre: item.books.genre,
          stock: item.books.stock
        }
      }))
    }));
  },

  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          books (*)
        ),
        profiles (
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }

    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      totalAmount: order.total_amount,
      status: order.status as 'pending' | 'completed' | 'cancelled',
      createdAt: order.created_at || '',
      items: order.order_items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        bookId: item.book_id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.books.id,
          title: item.books.title,
          author: item.books.author,
          description: item.books.description,
          price: item.books.price,
          coverImage: item.books.cover_image,
          genre: item.books.genre,
          stock: item.books.stock
        }
      }))
    }));
  },

  async updateOrderStatus(orderId: string, status: 'pending' | 'completed' | 'cancelled'): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          books (*)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Order not found
      }
      console.error('Error fetching order:', error);
      throw error;
    }

    return {
      id: data.id,
      userId: data.user_id,
      totalAmount: data.total_amount,
      status: data.status as 'pending' | 'completed' | 'cancelled',
      createdAt: data.created_at || '',
      items: data.order_items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        bookId: item.book_id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.books.id,
          title: item.books.title,
          author: item.books.author,
          description: item.books.description,
          price: item.books.price,
          coverImage: item.books.cover_image,
          genre: item.books.genre,
          stock: item.books.stock
        }
      }))
    };
  }
};