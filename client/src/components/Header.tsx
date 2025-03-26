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
    <header className={`w-full fixed top-0 bg-white z-50 ${isScrolled ? 'shadow-sm' : ''}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#" className="font-sans font-bold text-xl text-primary">Ross Muretov</a>
        
        {/* Mobile menu button */}
        <button 
          aria-label="Toggle menu"
          className="md:hidden text-secondary focus:outline-none" 
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
          <a href="#about" className="relative nav-link text-secondary hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full">About</a>
          <a href="#skills" className="relative nav-link text-secondary hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full">Skills</a>
          <a href="#education" className="relative nav-link text-secondary hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full">Education</a>
          <a href="#projects" className="relative nav-link text-secondary hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full">Projects</a>
          <a href="#experience" className="relative nav-link text-secondary hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full">Experience</a>
          <a href="#contact" className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors">Contact Me</a>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white w-full ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a href="#about" className="py-2 text-secondary hover:text-primary transition-colors" onClick={closeMenu}>About</a>
          <a href="#skills" className="py-2 text-secondary hover:text-primary transition-colors" onClick={closeMenu}>Skills</a>
          <a href="#education" className="py-2 text-secondary hover:text-primary transition-colors" onClick={closeMenu}>Education</a>
          <a href="#projects" className="py-2 text-secondary hover:text-primary transition-colors" onClick={closeMenu}>Projects</a>
          <a href="#experience" className="py-2 text-secondary hover:text-primary transition-colors" onClick={closeMenu}>Experience</a>
          <a href="#contact" className="py-2 px-4 my-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors text-center" onClick={closeMenu}>Contact Me</a>
        </div>
      </div>
    </header>
  );
}
