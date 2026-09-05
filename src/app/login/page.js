'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      if (data.success) {
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 text-white flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <Car size={72} className="mb-6 relative" strokeWidth={1.2} />
        <h2 className="text-3xl font-bold mb-3 relative text-center">Welcome Back</h2>
        <p className="text-blue-100 text-center max-w-sm relative">Log in to manage your bookings, list your cars, and continue your journey with DriveFleet.</p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Login</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Enter your details to access your account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm dark:text-gray-200">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm dark:text-gray-200">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold w-full transition">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-center text-sm mt-6 dark:text-gray-300">Don't have an account? <Link href="/register" className="text-blue-600 font-medium">Register</Link></p>
        </div>
      </div>
    </div>
  );
}