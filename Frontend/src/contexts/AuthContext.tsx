import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthUser, LoginFormData, SignUpFormData } from '../types/auth';
import { toast } from "@/components/ui/sonner";
import { authApi } from '@/services/api';

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Sign up function
  const signUp = async (data: SignUpFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.signUp({
        email: data.email,
        password: data.password,
        role: 'USER',
        firstName: data.firstName,
        lastName: data.lastName
      });
      
      const newUser: AuthUser = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', response.token);
      toast.success("Account created successfully!");
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
      toast.error(err.response?.data?.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password
      });
      
      const loggedInUser: AuthUser = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', response.token);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
      toast.error(err.response?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success("Logged out successfully");
    } catch (err: any) {
      console.error('Logout error:', err);
      toast.error(err.response?.data?.message || "Failed to logout");
    }
  };

  // Context provider value
  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    signUp,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
