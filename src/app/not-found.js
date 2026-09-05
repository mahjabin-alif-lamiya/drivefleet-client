import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Ghost size={56} className="text-blue-400 mb-4" />
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Back to Home</Link>
    </div>
  );
}