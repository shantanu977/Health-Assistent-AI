export default function Footer() {
  return (
    <footer className="bg-[#0B1F36] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Branding */}
          <div>
            <h2 className="text-xl font-semibold text-white tracking-wide">
              AI Health Companion
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Smart. Reliable. AI-powered healthcare assistance for everyone.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">

            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Chat</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Help Center</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#1a2f4d] my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AI Health Companion. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-teal-400 transition">Facebook</a>
            <a href="#" className="hover:text-teal-400 transition">Instagram</a>
            <a href="#" className="hover:text-teal-400 transition">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
