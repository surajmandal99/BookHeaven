import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
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
          <UserPlus className="mx-auto h-12 w-12 text-blue-900" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-900 hover:underline">
              sign in to your existing account
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
              id="name"
              label="Full name"
              type="text"
              autoComplete="name"
              fullWidth
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          
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
              autoComplete="new-password"
              fullWidth
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          
          <div>
            <Input
              id="confirmPassword"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              fullWidth
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>
          
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={isLoading}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;