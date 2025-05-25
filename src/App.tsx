import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <footer className="bg-white py-6 shadow-inner">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">&copy; 2025 BookHaven. All rights reserved.</p>
                  </div>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-600 hover:text-blue-900">Terms</a>
                    <a href="#" className="text-gray-600 hover:text-blue-900">Privacy</a>
                    <a href="#" className="text-gray-600 hover:text-blue-900">Contact</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;