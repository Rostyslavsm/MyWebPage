import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Rostyslav (Ross) Muretov</h2>
            <p className="text-white/70">Computer Programming & Analysis Student</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://linkedin.com/" className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="https://github.com/" className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className='bx bxl-github'></i>
              </a>
              <a href="mailto:muretovr@gmail.com" className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className='bx bx-envelope'></i>
              </a>
            </div>
            <p className="text-white/60 text-sm">© {currentYear} Rostyslav Muretov. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <a href="#" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
            <i className='bx bx-up-arrow-alt mr-1'></i> Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
