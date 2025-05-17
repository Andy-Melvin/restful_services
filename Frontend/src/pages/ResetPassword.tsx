import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AuthLayout from '@/components/auth/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import { toast } from "@/components/ui/sonner";
import { authApi } from '@/services/api';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and contain a number and special character');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.resetPassword(token, password);
      toast.success("Password reset successful!");
      navigate('/login');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-gray-500 mt-2">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-primary hover:text-primary-hover text-sm font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;