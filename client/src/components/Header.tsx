import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero"); // Default to hero section

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Setup intersection observers for each section
    const sections = ["hero", "about", "skills", "education", "projects", "experience", "contact"];
    
    const sectionObservers = sections.map(sectionId => {
      const section = document.getElementById(sectionId);
      
      if (!section) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // When section is 50% visible in viewport
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          threshold: [0.2], // Trigger when 20% of section is visible
          rootMargin: "-20% 0px -20% 0px" // Add a margin to top and bottom
        }
      );
      
      observer.observe(section);
      return { section, observer };
    }).filter(Boolean);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      
      // Cleanup observers
      sectionObservers.forEach(item => {
        if (item && item.observer && item.section) {
          item.observer.unobserve(item.section);
        }
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to determine if a nav link should be active
  const isActive = (sectionId: string) => activeSection === sectionId;

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
          <a 
            href="#about" 
            className={`relative nav-link transition-colors after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive('about') 
                ? 'text-[#8b5cf6] after:w-full' 
                : 'text-gray-400 hover:text-[#8b5cf6] after:w-0'
            }`}
          >
            About
          </a>
          <a 
            href="#skills" 
            className={`relative nav-link transition-colors after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive('skills') 
                ? 'text-[#8b5cf6] after:w-full' 
                : 'text-gray-400 hover:text-[#8b5cf6] after:w-0'
            }`}
          >
            Skills
          </a>
          <a 
            href="#education" 
            className={`relative nav-link transition-colors after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive('education') 
                ? 'text-[#8b5cf6] after:w-full' 
                : 'text-gray-400 hover:text-[#8b5cf6] after:w-0'
            }`}
          >
            Education
          </a>
          <a 
            href="#projects" 
            className={`relative nav-link transition-colors after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive('projects') 
                ? 'text-[#8b5cf6] after:w-full' 
                : 'text-gray-400 hover:text-[#8b5cf6] after:w-0'
            }`}
          >
            Projects
          </a>
          <a 
            href="#experience" 
            className={`relative nav-link transition-colors after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#8b5cf6] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive('experience') 
                ? 'text-[#8b5cf6] after:w-full' 
                : 'text-gray-400 hover:text-[#8b5cf6] after:w-0'
            }`}
          >
            Experience
          </a>
          <a 
            href="#contact" 
            className={`ml-4 px-4 py-2 rounded-lg transition-colors ${
              isActive('contact')
                ? 'bg-[#9f75ff] text-white' 
                : 'bg-[#8b5cf6] text-white hover:bg-[#9f75ff]'
            }`}
          >
            Contact Me
          </a>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-[#111111]/95 backdrop-blur-md border-t border-[#222222] w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a 
            href="#about" 
            className={`py-2 transition-colors ${
              isActive('about') ? 'text-[#8b5cf6]' : 'text-gray-400 hover:text-[#8b5cf6]'
            }`} 
            onClick={closeMenu}
          >
            About
          </a>
          <a 
            href="#skills" 
            className={`py-2 transition-colors ${
              isActive('skills') ? 'text-[#8b5cf6]' : 'text-gray-400 hover:text-[#8b5cf6]'
            }`} 
            onClick={closeMenu}
          >
            Skills
          </a>
          <a 
            href="#education" 
            className={`py-2 transition-colors ${
              isActive('education') ? 'text-[#8b5cf6]' : 'text-gray-400 hover:text-[#8b5cf6]'
            }`} 
            onClick={closeMenu}
          >
            Education
          </a>
          <a 
            href="#projects" 
            className={`py-2 transition-colors ${
              isActive('projects') ? 'text-[#8b5cf6]' : 'text-gray-400 hover:text-[#8b5cf6]'
            }`} 
            onClick={closeMenu}
          >
            Projects
          </a>
          <a 
            href="#experience" 
            className={`py-2 transition-colors ${
              isActive('experience') ? 'text-[#8b5cf6]' : 'text-gray-400 hover:text-[#8b5cf6]'
            }`} 
            onClick={closeMenu}
          >
            Experience
          </a>
          <a 
            href="#contact" 
            className={`py-2 px-4 my-2 rounded-lg text-white text-center transition-colors ${
              isActive('contact') ? 'bg-[#9f75ff]' : 'bg-[#8b5cf6] hover:bg-[#9f75ff]'
            }`} 
            onClick={closeMenu}
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}
