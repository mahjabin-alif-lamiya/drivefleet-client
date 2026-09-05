'use client';

import { useState } from 'react';
import { Car } from 'lucide-react';

export default function AddCarPage() {
  const [formData, setFormData] = useState({
    carName: '', price: '', carType: 'SUV', imageUrl: '',
    seatCapacity: '', location: '', description: '', availability: 'Available',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.insertedId) {
        setMessage('Car added successfully');
        setFormData({ carName: '', price: '', carType: 'SUV', imageUrl: '', seatCapacity: '', location: '', description: '', availability: 'Available' });
      } else {
        setMessage(data.message || 'Failed to add car');
      }
    } catch (error) {
      setMessage('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block mb-1 font-medium text-sm dark:text-gray-200";

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-xl">
          <Car size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-gray-100">Add New Car</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">List your car and start earning</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Car Name</label>
            <input type="text" name="carName" value={formData.carName} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Daily Rent Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Car Type</label>
            <select name="carType" value={formData.carType} onChange={handleChange} className={inputClass}>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Seat Capacity</label>
            <input type="number" name="seatCapacity" value={formData.seatCapacity} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Pickup Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Availability</label>
            <select name="availability" value={formData.availability} onChange={handleChange} className={inputClass}>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold w-full transition">
              {loading ? 'Adding...' : 'Add Car'}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 font-medium text-center dark:text-gray-200">{message}</p>}
      </div>
    </div>
  );
}