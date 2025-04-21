import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

// Mock data - in a real application, this would come from a backend
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Student',
    email: 'john@student.edu',
    role: 'student',
    registrationId: 'ST12345',
    department: 'Computer Science',
    year: 3,
    points: 120,
    eventsAttended: ['1', '2', '3'],
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2022-09-01')
  },
  {
    id: '2',
    name: 'Jane Alumni',
    email: 'jane@alumni.edu',
    role: 'alumni',
    graduationYear: 2020,
    currentPosition: 'Software Engineer',
    company: 'Google',
    industry: 'Technology',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2020-05-15')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    department: 'Administration',
    position: 'Program Coordinator',
    profilePicture: 'https://i.pravatar.cc/150?img=8',
    createdAt: new Date('2019-01-10')
  }
] as User[];

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email in mock data
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && password === 'password') { // Simple mock auth check
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid email or password'
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during login'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const getCurrentUser = () => authState.user;

  return (
    <AuthContext.Provider value={{ authState, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};