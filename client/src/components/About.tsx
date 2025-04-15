import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Set up scroll tracking
  const { scrollY } = useScroll();
  
  useEffect(() => {
    // Calculate section height and viewport height
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
      setViewportHeight(window.innerHeight);
      
      const handleResize = () => {
        if (sectionRef.current) {
          setSectionHeight(sectionRef.current.offsetHeight);
          setViewportHeight(window.innerHeight);
        }
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  // Get section position for scroll-linked effects
  const [sectionTop, setSectionTop] = useState(0);
  
  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSectionTop(window.scrollY + rect.top);
    }
    
    // Update position on resize
    const handleResize = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setSectionTop(window.scrollY + rect.top);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Calculate the total scroll space (3 viewport heights)
  const totalScrollSpace = viewportHeight * 3;
  
  // Calculate the scroll range where About should stay fixed
  const startFixed = sectionTop;
  const endFixed = sectionTop + totalScrollSpace - viewportHeight; // Start unfixing one viewport height before end
  
  // Fade in/out animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeIn" 
      }
    }
  };
  
  // Control visibility and fixed positioning based on scroll
  const [isFixed, setIsFixed] = useState(false);
  
  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Calculate thresholds
      const fadeInThreshold = startFixed - 300;
      const fadeOutThreshold = endFixed - (viewportHeight * 0.5);
      
      // Handle fixed positioning
      if (startFixed <= currentScroll && currentScroll < endFixed) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
      
      // Handle visibility with hysteresis to prevent flicker
      if (currentScroll >= fadeInThreshold && currentScroll < fadeOutThreshold) {
        if (!isVisible) {
          setIsVisible(true);
        }
      } else if (currentScroll < fadeInThreshold - 100 || currentScroll >= fadeOutThreshold + 100) {
        // Add some buffer to prevent toggling back and forth at the threshold
        if (isVisible) {
          setIsVisible(false);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startFixed, endFixed, isVisible, viewportHeight]);
  
  // Portrait animation - slide in from bottom
  const portraitVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };
  
  // Text content animation - slide in from right
  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };
  
  // Card animation - fade in
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ 
        // Take up 3 full viewport heights to create lots of scroll space
        height: totalScrollSpace > 0 ? `${totalScrollSpace}px` : "300vh",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.section
            className="w-full min-h-screen flex items-center"
            style={{
              position: isFixed ? "fixed" : "absolute",
              top: 0,
              left: 0,
              right: 0,
              // When not fixed and before scrolling starts, position at top
              ...(isFixed ? {} : { top: startFixed === 0 ? 0 : 0 }),
              // Lower z-index to ensure it goes below the next component
              zIndex: 5,
            }}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28 xl:py-32">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 xl:gap-32">
                  {/* Portrait Section - slide in from bottom */}
                  <motion.div 
                    className="w-full lg:w-2/5 mb-8 lg:mb-0"
                    variants={portraitVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative mx-auto max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] lg:-mr-12">
                      {/* Single div with image and border - no pseudo-elements */}
                      <div className="w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden border-8 border-[#8b5cf6] shadow-[0_0_50px_#8b5cf6] transition-all duration-500">
                        <img 
                          src="LINKEDINIMAGE.png" 
                          alt="Ross Muretov"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Section - text slides in from right */}
                  <div className="w-full lg:w-3/5">
                    <motion.div 
                      className="space-y-6 lg:space-y-8"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                        <span className="text-white">Hello, I'm </span>
                        <span className="text-[#8b5cf6]">Ross Muretov</span>
                      </h1>
                      
                      <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
                        I am a highly motivated and adaptable Computer Programming & Analysis student currently in my 5th Semester at Seneca College. I combine a strong academic foundation in full-stack development, database management, cloud computing (AWS), and CI/CD practices with extensive international experience.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Card 1 - fade in */}
                        <motion.div 
                          className="bg-[#111111] p-6 lg:p-8 rounded-lg border border-[#222222]"
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ 
                            y: -10, 
                            boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <i className='bx bx-bulb text-2xl lg:text-3xl text-[#8b5cf6] mr-3'></i>
                            <h3 className="text-xl lg:text-2xl font-semibold text-white">Key Skills</h3>
                          </div>
                          <ul className="space-y-2 lg:space-y-3 text-gray-400">
                            <li className="flex items-start">
                              <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                              <span>Strong problem-solving abilities</span>
                            </li>
                            <li className="flex items-start">
                              <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                              <span>Exceptional communication skills</span>
                            </li>
                            <li className="flex items-start">
                              <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                              <span>Cross-cultural collaboration expertise</span>
                            </li>
                            <li className="flex items-start">
                              <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                              <span>Quick learner with adaptability</span>
                            </li>
                          </ul>
                        </motion.div>

                        {/* Card 2 - fade in */}
                        <motion.div 
                          className="bg-[#111111] p-6 lg:p-8 rounded-lg border border-[#222222]"
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ 
                            y: -10, 
                            boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <i className='bx bx-target-lock text-2xl lg:text-3xl text-[#8b5cf6] mr-3'></i>
                            <h3 className="text-xl lg:text-2xl font-semibold text-white">Career Goals</h3>
                          </div>
                          <p className="text-gray-400">
                            I am currently seeking a challenging Co-op opportunity within the tech industry where I can apply my technical knowledge and soft skills to contribute to meaningful projects while continuing to grow as a developer.
                          </p>
                          <div className="mt-4">
                            <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Full-stack Development</span>
                            <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Cloud Computing</span>
                            <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Software Engineering</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}