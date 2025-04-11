import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#111111]/80 backdrop-blur-md border-b border-[#222222]' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#" className="font-sans font-bold text-xl text-[#8b5cf6] hover:text-[#9f75ff] transition-colors">Ross Muretov</a>
        
        {/* Mobile menu button */}
        <button 
          aria-label="Toggle menu"
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <i className='bx bx-x text-2xl'></i>
          ) : (
            <i className='bx bx-menu text-2xl'></i>
          )}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#about" className="relative nav-link text-gray-400 hover:text-[#8b5cf6] transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full">About</a>
          <a href="#skills" className="relative nav-link text-gray-400 hover:text-[#8b5cf6] transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full">Skills</a>
          <a href="#education" className="relative nav-link text-gray-400 hover:text-[#8b5cf6] transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full">Education</a>
          <a href="#projects" className="relative nav-link text-gray-400 hover:text-[#8b5cf6] transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full">Projects</a>
          <a href="#experience" className="relative nav-link text-gray-400 hover:text-[#8b5cf6] transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full">Experience</a>
          <a href="#contact" className="ml-4 px-4 py-2 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors">Contact Me</a>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-[#111111]/95 backdrop-blur-md border-t border-[#222222] w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a href="#about" className="py-2 text-gray-400 hover:text-[#8b5cf6] transition-colors" onClick={closeMenu}>About</a>
          <a href="#skills" className="py-2 text-gray-400 hover:text-[#8b5cf6] transition-colors" onClick={closeMenu}>Skills</a>
          <a href="#education" className="py-2 text-gray-400 hover:text-[#8b5cf6] transition-colors" onClick={closeMenu}>Education</a>
          <a href="#projects" className="py-2 text-gray-400 hover:text-[#8b5cf6] transition-colors" onClick={closeMenu}>Projects</a>
          <a href="#experience" className="py-2 text-gray-400 hover:text-[#8b5cf6] transition-colors" onClick={closeMenu}>Experience</a>
          <a href="#contact" className="py-2 px-4 my-2 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors text-center" onClick={closeMenu}>Contact Me</a>
        </div>
      </div>
    </header>
  );
}
