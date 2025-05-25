import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      // Error is handled by auth context
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-blue-900" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-900 hover:underline">
              create a new account
            </Link>
          </p>
        </div>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {authError}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              fullWidth
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          
          <div>
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-900 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={isLoading}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>Please register a new account to get started</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;