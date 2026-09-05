'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UpdateCarPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://drivefleet-server-hvcw.onrender.com/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://drivefleet-server-hvcw.onrender.com/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          price: formData.price, description: formData.description, availability: formData.availability,
          imageUrl: formData.imageUrl, carType: formData.carType, location: formData.location,
        }),
      });
      const data = await res.json();
      if (data.modifiedCount >= 0) {
        setMessage('Car updated successfully');
        setTimeout(() => router.push('/my-cars'), 1000);
      }
    } catch (error) {
      setMessage('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block mb-1 font-medium text-sm dark:text-gray-200";

  if (!formData) return <p className="text-center mt-20 dark:text-gray-300">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Update {formData.carName}</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8">
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt={formData.carName} className="w-full h-48 object-cover rounded-xl mb-6" />
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className={inputClass} />
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
          <div className="md:col-span-2">
            <label className={labelClass}>Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} />
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
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold w-full transition">
              {loading ? 'Updating...' : 'Update Car'}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 dark:text-gray-200 text-center">{message}</p>}
      </div>
    </div>
  );
}