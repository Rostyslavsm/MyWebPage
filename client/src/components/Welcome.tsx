import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Click anywhere to dismiss
    const handleClick = () => {
      setIsVisible(false);
    };
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm"
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-6 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
              >
                <i className='bx bx-code text-xl'></i>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
              >
                <i className='bx bx-user text-xl'></i>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
              >
                <i className='bx bxl-github text-xl'></i>
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Welcome To My
            </motion.h1>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl bg-gradient-to-r from-[#8b5cf6] to-[#9f75ff] bg-clip-text text-transparent font-bold"
            >
              Portfolio Website
            </motion.h2>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-sm"
            >
              © www.rossm.dev
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 