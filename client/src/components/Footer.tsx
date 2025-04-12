import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#0a0a0a]/80 backdrop-blur-md py-8 border-t border-[#222222]/50 shadow-lg relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">Rostyslav (Ross) Muretov</h2>
            <p className="text-white/70">Computer Programming & Analysis Student</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <motion.a 
                href="https://www.linkedin.com/in/rostyslav-muretov-062a84202/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-[#111111]/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-[#222222]/70 hover:border-[#8b5cf6]/80 transition-colors shadow-md"
                whileHover={{ scale: 1.1, borderColor: "#8b5cf6" }}
              >
                <i className='bx bxl-linkedin'></i>
              </motion.a>
              <motion.a 
                href="https://github.com/Rostyslavsm" 
                className="w-10 h-10 bg-[#111111]/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-[#222222]/70 hover:border-[#8b5cf6]/80 transition-colors shadow-md"
                whileHover={{ scale: 1.1, borderColor: "#8b5cf6" }}
              >
                <i className='bx bxl-github'></i>
              </motion.a>
              <motion.a 
                href="mailto:muretovr@gmail.com" 
                className="w-10 h-10 bg-[#111111]/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-[#222222]/70 hover:border-[#8b5cf6]/80 transition-colors shadow-md"
                whileHover={{ scale: 1.1, borderColor: "#8b5cf6" }}
              >
                <i className='bx bx-envelope'></i>
              </motion.a>
            </div>
            <p className="text-white/60 text-sm">© {currentYear} <span className="text-cyan-400">R</span><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-600 text-transparent bg-clip-text">ostyslav Mureto</span><span className="text-fuchsia-600">v</span></p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-[#222222]/50 text-center">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center text-white/70 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#111111]/70 backdrop-blur-sm border border-[#222222]/70 hover:border-[#8b5cf6]/80 shadow-md"
            whileHover={{ scale: 1.05, borderColor: "#8b5cf6" }}
          >
            <i className='bx bx-up-arrow-alt mr-1'></i> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
