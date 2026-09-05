'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car as CarIcon } from 'lucide-react';

export default function MyCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCars = () => {
    fetch('http://localhost:5000/my-cars', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => { setCars(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCars(); }, []);

  const confirmDelete = async () => {
    await fetch(`http://localhost:5000/cars/${deleteId}`, { method: 'DELETE', credentials: 'include' });
    setDeleteId(null);
    fetchCars();
  };

  if (loading) return <p className="text-center mt-20 dark:text-gray-300">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">My Added Cars</h1>
      {cars.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 border-2 border-dashed dark:border-gray-700 rounded-2xl">
          <CarIcon size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any cars yet.</p>
          <Link href="/add-car" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Add Your First Car</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="border dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-800">
              <img src={car.imageUrl} alt={car.carName} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold dark:text-gray-100">{car.carName}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">৳{car.price}/day · {car.availability}</p>
                <div className="flex gap-2 mt-3">
                  <Link href={`/update-car/${car._id}`} className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm transition">Update</Link>
                  <button onClick={() => setDeleteId(car._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <p className="mb-4 dark:text-gray-100">Are you sure you want to delete this car?</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border dark:border-gray-600 dark:text-gray-200 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}