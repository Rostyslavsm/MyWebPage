import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import animationData from "@/assets/Animation.json";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animations after welcome component disappears
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2100); // 2.1 seconds (slightly after welcome disappears)
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-20 md:pt-28 lg:pt-32 xl:pt-40 pb-16 md:pb-20 lg:pb-28 xl:pb-32 overflow-hidden min-h-[80vh] lg:min-h-[90vh] xl:min-h-screen flex items-center"> {/* Removed bg-[#0a0a0a] */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div 
            className="w-full md:w-2/3 flex flex-col space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : -100 
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                <span className="text-white">Full </span>
                <span className="text-[#8b5cf6]">Stack</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">Developer</h1>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300">
              Computer Programming & Analysis Student | Aspiring Software Developer
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl">
              Seeking a challenging Co-op opportunity within the tech industry. Combining strong academic foundation with international experience and exceptional communication skills.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact">
                <Button className="px-6 py-6 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors font-medium flex items-center gap-2 h-auto shadow-[0_0_15px_rgba(255,255,255,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.55)]">
                  <i className='bx bx-envelope'></i> Contact Me
                </Button>
              </a>
              <a href="#projects">
                <Button variant="outline" className="px-6 py-6 border-2 border-[#8b5cf6] text-white rounded-lg hover:bg-[#8b5cf6]/10 transition-colors font-medium flex items-center gap-2 h-auto shadow-[0_0_15px_rgba(255,255,255,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.55)]">
                  <i className='bx bx-code-alt'></i> View My Work
                </Button>
              </a>
              <a href="/Rostyslav_Muretov_CV.pdf" download>
                <Button variant="secondary" className="px-6 py-6 bg-[#111111] text-white rounded-lg hover:bg-[#222222] transition-colors font-medium flex items-center gap-2 h-auto shadow-[0_0_15px_rgba(255,255,255,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.55)]">
                  <i className='bx bxs-download'></i> Download CV
                </Button>
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <motion.a 
                href="mailto:muretovr@gmail.com" 
                className="text-gray-400 hover:text-[#8b5cf6] transition-colors p-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className='bx bx-envelope text-2xl'></i>
              </motion.a>
              <motion.a 
                href="https://github.com/Rostyslavsm" 
                className="text-gray-400 hover:text-[#8b5cf6] transition-colors p-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className='bx bxl-github text-2xl'></i>
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/rostyslav-muretov-062a84202/" 
                className="text-gray-400 hover:text-[#8b5cf6] transition-colors p-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className='bx bxl-linkedin text-2xl'></i>
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/3 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : 100 
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
          >
            <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[#8b5cf6] rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <Lottie 
                animationData={animationData}
                className="relative w-full h-full z-10"
                loop={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
