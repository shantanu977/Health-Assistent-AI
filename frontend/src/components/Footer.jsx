export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        
        {/* Left side */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} AI Health Companion. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a 
            href="#" 
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="hover:text-blue-600 transition"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="hover:text-blue-600 transition"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
