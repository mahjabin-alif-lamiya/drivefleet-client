'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    return hasUpper && hasLower && password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validatePassword(formData.password)) {
      setError('Password must have an uppercase letter, a lowercase letter, and be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.insertedId) {
        router.push('/login');
      } else {
        setError(data.message || 'Registration failed');
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
        <h2 className="text-3xl font-bold mb-3 relative text-center">Join DriveFleet</h2>
        <p className="text-blue-100 text-center max-w-sm relative">Create an account to book cars, list your own vehicles, and manage everything in one place.</p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Register</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Create your DriveFleet account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm dark:text-gray-200">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm dark:text-gray-200">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm dark:text-gray-200">Photo URL (optional)</label>
              <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} placeholder="Leave blank to use initials" className={inputClass} />
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="text-center text-sm mt-6 dark:text-gray-300">Already have an account? <Link href="/login" className="text-blue-600 font-medium">Login</Link></p>
        </div>
      </div>
    </div>
  );
}