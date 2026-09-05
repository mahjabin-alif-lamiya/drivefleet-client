'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, Headphones, Search, CalendarCheck, Key, ChevronDown, Sparkles, PhoneCall } from 'lucide-react';

const faqs = [
  { q: 'How do I make a reservation?', a: 'Browse our car selection, pick the one you like, and click Book Now on the details page.' },
  { q: 'What documents do I need to rent a car?', a: 'A valid driving license and a national ID or passport are required at pickup.' },
  { q: 'Can I cancel or change my booking?', a: 'Yes, contact our support team and we will help you adjust your booking.' },
];

const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b dark:border-gray-700 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left font-medium dark:text-gray-100">
        {q}
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{a}</p>}
    </div>
  );
}

function NumberedCard({ icon, number, title, desc }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition p-8 border border-gray-200 dark:border-gray-700 text-center">
      <div className="relative inline-flex mb-5">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 flex items-center justify-center rounded-2xl">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
          {number}
        </span>
      </div>
      <h3 className="font-semibold text-xl mb-2 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [activeType, setActiveType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeType !== 'All') params.append('type', activeType);
    fetch(`https://drivefleet-server-hvcw.onrender.com/cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      })
      .catch(() => { setCars([]); setLoading(false); });
  }, [activeType]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 animate-gradient text-white">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-slow z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles size={14} /> Premium Fleet
            </span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
              <PhoneCall size={14} /> 24/7 Roadside Assist
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg md:text-xl text-blue-100 dark:text-indigo-200 max-w-xl mx-auto mb-10">
            Browse a wide range of cars for rent, from budget-friendly hatchbacks to premium luxury rides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore-cars" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition">
              Explore Cars
            </Link>
            <Link href="/add-car" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition">
              Add Your Car
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold dark:text-gray-100">Available Cars</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Handpicked rides ready for your next trip</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {carTypes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeType === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 dark:text-gray-500">Loading...</p>
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500">No cars found.</p>
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{car.seatCapacity} seats</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-600 text-lg">৳{car.price}<span className="text-sm text-gray-400 font-normal">/day</span></p>
                    <Link href={`/car-details/${car._id}`} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14 dark:text-gray-100">Why Choose DriveFleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NumberedCard icon={<Car size={26} />} number="1" title="Wide Selection" desc="From economy to luxury, find a car that fits your needs and budget." />
            <NumberedCard icon={<ShieldCheck size={26} />} number="2" title="Secure Booking" desc="Your data is protected with industry-standard security." />
            <NumberedCard icon={<Headphones size={26} />} number="3" title="24/7 Support" desc="Our support team is here to help you anytime." />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-14 text-center dark:text-gray-100">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NumberedCard icon={<Search size={26} />} number="1" title="Browse Cars" desc="Explore our collection and find the right car for you." />
          <NumberedCard icon={<CalendarCheck size={26} />} number="2" title="Book Instantly" desc="Select your options and confirm your booking in minutes." />
          <NumberedCard icon={<Key size={26} />} number="3" title="Hit the Road" desc="Pick up your car and enjoy your journey." />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-gray-100">Frequently Asked Questions</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Everything you need to know about our rental service.</p>
        <div>
          {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 rounded-3xl text-white text-center py-16 px-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">Ready to start your unforgettable journey?</h2>
          <p className="text-blue-100 dark:text-indigo-200 max-w-xl mx-auto mb-8 relative">Join thousands of happy customers who trust us with their travel needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Link href="/explore-cars" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition">
              Book Your Ride
            </Link>
            <Link href="/register" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}