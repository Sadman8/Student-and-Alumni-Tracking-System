import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, authState } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { email: '', password: '' };

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          leftIcon={<Mail size={18} />}
          fullWidth
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          leftIcon={<Lock size={18} />}
          fullWidth
        />
      </div>
      
      {authState.error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm">
          {authState.error}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-gray-700">
            Remember me
          </label>
        </div>
        
        <div>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={authState.isLoading}
        rightIcon={<LogIn size={18} />}
      >
        Sign in
      </Button>
      
      <div className="text-center text-sm text-gray-600">
        <p>Demo accounts for testing purposes:</p>
        <ul className="mt-2 space-y-1">
          <li><code className="bg-gray-100 px-2 py-1 rounded">john@student.edu</code> (Student)</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">jane@alumni.edu</code> (Alumni)</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">admin@university.edu</code> (Admin)</li>
          <li>Use password: <code className="bg-gray-100 px-2 py-1 rounded">password</code></li>
        </ul>
      </div>
    </form>
  );
};

export default LoginForm;