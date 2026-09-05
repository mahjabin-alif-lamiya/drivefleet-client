'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/my-bookings', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-20 dark:text-gray-300">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 border-2 border-dashed dark:border-gray-700 rounded-2xl">
          <CalendarCheck size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't booked any cars yet.</p>
          <Link href="/explore-cars" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Explore Cars</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="border dark:border-gray-700 rounded-2xl p-5 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
              <div>
                <h3 className="font-semibold dark:text-gray-100">{b.carName}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Booked on: {new Date(b.bookingDate).toLocaleDateString()}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Driver Needed: {b.driverNeeded}</p>
              </div>
              <p className="font-bold text-blue-600 text-lg">৳{b.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}