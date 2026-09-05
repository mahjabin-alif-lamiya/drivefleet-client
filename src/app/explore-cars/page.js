'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  const fetchCars = (searchVal = search, typeVal = type) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchVal) params.append('search', searchVal);
    if (typeVal) params.append('type', typeVal);
    fetch(`https://drivefleet-server-hvcw.onrender.com/cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => { setCars(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCars(); }, []);

  const handleSearchSubmit = (e) => { e.preventDefault(); fetchCars(); };

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2";

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Explore Cars</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Find the right ride for your next trip</p>

      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by car name" value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-10 w-full`} />
        </div>
        <select value={type} onChange={(e) => { setType(e.target.value); fetchCars(search, e.target.value); }} className={inputClass}>
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">Search</button>
      </form>

      {loading ? (
        <p className="text-center mt-10 dark:text-gray-300">Loading...</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="group border dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition bg-white dark:bg-gray-800">
              <div className="overflow-hidden">
                <img src={car.imageUrl} alt={car.carName} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg dark:text-gray-100">{car.carName}</h3>
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">{car.carType}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{car.seatCapacity} seats · {car.availability}</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-blue-600 text-lg">৳{car.price}<span className="text-sm text-gray-400 font-normal">/day</span></p>
                  <Link href={`/car-details/${car._id}`} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}