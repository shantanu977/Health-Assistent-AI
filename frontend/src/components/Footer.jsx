export default function Footer() {
  return (
    <footer className="bg-[#071A2F] mt-20 border-t border-[#123357]/40">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Branding */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-semibold text-white tracking-wide">
              AI Health Companion
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Smart. Reliable. AI-powered healthcare assistance designed
              to improve your wellbeing with advanced intelligence.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/" className="hover:text-teal-400 transition">Home</a></li>
              <li><a href="/chat" className="hover:text-teal-400 transition">Chat</a></li>
              <li><a href="/dashboard" className="hover:text-teal-400 transition">Dashboard</a></li>
              <li><a href="/upload-report" className="hover:text-teal-400 transition">Report Analyzer</a></li>
              <li><a href="/symptom-checker" className="hover:text-teal-400 transition">Symptom Checker</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  className="hover:text-teal-400 transition"
                >
                  aishwarya@gmail.com
                </a>
              </li>
              <li>
                <a
                  className="hover:text-teal-400 transition"
                >
                  priyanka@gmail.com
                </a>
              </li>
              <li>
                <a
                  className="hover:text-teal-400 transition"
                >
                  shantanuubhe9@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#123357] mt-10 mb-6 opacity-40"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} AI Health Companion.  
            <span className="text-gray-500 ml-1">All rights reserved.</span>
          </p>

          <p className="mt-3 md:mt-0 text-gray-400">
            Made with ❤️ for better healthcare.
          </p>
        </div>

      </div>
    </footer>
  );
}
