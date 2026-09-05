'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Users, Tag } from 'lucide-react';

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState('No');
  const [specialNote, setSpecialNote] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => { setCar(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBookNowClick = () => {
    if (!user) { router.push('/login'); return; }
    setShowForm(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ carId: id, carName: car.carName, totalPrice: car.price, driverNeeded, specialNote }),
      });
      const data = await res.json();
      if (data.insertedId) {
        setMessage('Booking confirmed');
        setShowForm(false);
      } else {
        setMessage('Booking failed');
      }
    } catch (error) {
      setMessage('Could not connect to server');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full";

  if (loading) return <p className="text-center mt-20 dark:text-gray-300">Loading...</p>;
  if (!car) return <p className="text-center mt-20 dark:text-gray-300">Car not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <img src={car.imageUrl} alt={car.carName} className="w-full h-80 object-cover rounded-2xl mb-6" />
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold dark:text-gray-100">{car.carName}</h1>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${car.availability === 'Available' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}`}>
          {car.availability}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-sm mb-6">
        <span className="flex items-center gap-1"><Tag size={16} /> {car.carType}</span>
        <span className="flex items-center gap-1"><Users size={16} /> {car.seatCapacity} seats</span>
        <span className="flex items-center gap-1"><MapPin size={16} /> {car.location}</span>
      </div>
      <p className="text-2xl font-bold text-blue-600 mb-4">৳{car.price}<span className="text-sm text-gray-400 font-normal">/day</span></p>
      <p className="text-gray-700 dark:text-gray-300 mb-8">{car.description}</p>

      {!showForm ? (
        <button onClick={handleBookNowClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">Book Now</button>
      ) : (
        <form onSubmit={handleBookingSubmit} className="border dark:border-gray-700 rounded-2xl p-6 space-y-4 bg-white dark:bg-gray-800 shadow-sm">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Driver Needed</label>
            <select value={driverNeeded} onChange={(e) => setDriverNeeded(e.target.value)} className={inputClass}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Special Note</label>
            <textarea value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} className={inputClass} />
          </div>
          <button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      )}
      {message && <p className="mt-4 font-medium dark:text-gray-200">{message}</p>}
    </div>
  );
}