export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">DriveFleet</h3>
          <p className="text-sm text-gray-400 mb-3">Rent the perfect car for every journey, fast, easy, and reliable.</p>
          <p className="text-sm text-gray-400">Working Hours: Mon - Fri, 9:00 AM - 9:00 PM</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/explore-cars" className="hover:text-white transition">Explore Cars</a></li>
            <li><a href="/add-car" className="hover:text-white transition">Add Car</a></li>
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-gray-400">Email: support@drivefleet.com</p>
          <p className="text-sm text-gray-400 mb-4">Phone: +880 1234 567890</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 transition w-9 h-9 flex items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/>
              </svg>
            </a>
            <a href="#" aria-label="X" className="bg-white/10 hover:bg-white/20 transition w-9 h-9 flex items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-6.6L4.4 22H1.3l8-9.2L1 2h7l4.9 6L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 transition w-9 h-9 flex items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs py-4 border-t border-white/10">© 2026 DriveFleet. All rights reserved.</p>
    </footer>
  );
}