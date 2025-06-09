export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          author: string
          price: number
          cover_image: string
          description: string
          genre: string
          stock: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          author: string
          price: number
          cover_image: string
          description: string
          genre: string
          stock?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          author?: string
          price?: number
          cover_image?: string
          description?: string
          genre?: string
          stock?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      seller_books: {
        Row: {
          id: string
          seller_id: string
          title: string
          author: string
          price: number
          cover_image: string
          description: string
          genre: string
          condition: string
          stock: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          author: string
          price: number
          cover_image: string
          description: string
          genre: string
          condition: string
          stock?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          author?: string
          price?: number
          cover_image?: string
          description?: string
          genre?: string
          condition?: string
          stock?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: string
          created_at: string | null
          payment_method: string | null
          payment_details: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status: string
          created_at?: string | null
          payment_method?: string | null
          payment_details?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: string
          created_at?: string | null
          payment_method?: string | null
          payment_details?: Json | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          book_id: string
          quantity: number
          price: number
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          book_id: string
          quantity: number
          price: number
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          book_id?: string
          quantity?: number
          price?: number
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          is_admin: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          is_admin?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          is_admin?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}