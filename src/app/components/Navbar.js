'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun, Moon, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : '';

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <Car size={26} strokeWidth={2.2} />
          DriveFleet
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link href="/">Home</Link>
          <Link href="/explore-cars">Explore Cars</Link>
          <Link href="/add-car">Add Car</Link>
          <Link href="/my-bookings">My Bookings</Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="border border-gray-300 dark:border-gray-600 rounded-full p-2 text-gray-700 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="relative">
            {user ? (
              <div>
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-600 text-white font-semibold">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      initial
                    )}
                  </div>
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg py-2 border dark:border-gray-700">
                    <div className="px-4 py-2 text-sm font-medium border-b dark:border-gray-700">{user.name}</div>
                    <Link href="/add-car" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Add Car</Link>
                    <Link href="/my-bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Bookings</Link>
                    <Link href="/my-cars" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Added Cars</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}