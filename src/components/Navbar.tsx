import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, BookOpen, User, Menu, X, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import Input from './ui/Input';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-bold text-blue-900">BookHaven</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <Link to="/" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                
                {user.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md flex items-center">
                    <LayoutDashboard className="h-5 w-5 mr-1" />
                    Admin
                  </Link>
                )}
                
                <button 
                  onClick={() => logout()}
                  className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-900" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-blue-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-3">
              <Input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
              <Button type="submit" fullWidth variant="primary">
                <Search className="h-5 w-5 mr-1" />
                Search
              </Button>
            </form>
            
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                
                {user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;