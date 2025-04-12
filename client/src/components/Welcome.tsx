import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

    // Matrix rain animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const squareSize = 20;
        ctx.font = `${squareSize}px monospace`;
        
        const columnCount = Math.round(canvas.width / squareSize);
        const lettersPosition = Array(columnCount).fill(1);
        
        const name = "ROSS MURETOV";
        const nameLength = name.length;
        
        // Name coordinate system
        const x0 = Math.floor(((canvas.width - nameLength * squareSize) / 2) / squareSize);
        const x1 = Math.floor(x0 + nameLength - 1);
        const y0 = Math.floor(canvas.height / 2 / squareSize);
        
        const filledCharacters = Array(nameLength).fill(false);
        let filled = 0;
        
        const reset = () => {
          filledCharacters.fill(false);
          filled = 0;
          lettersPosition.fill(1);
        };
        
        const drawRain = () => {
          if (filled === columnCount) {
            reset();
          }
          
          ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#8b5cf6"; // Purple to match the theme
          
          // Render filled characters
          filledCharacters.forEach((f, i) => f && ctx.fillText(name[i], (x0 + i) * squareSize, y0 * squareSize));
          
          // Render Randomness
          lettersPosition.forEach((y, i) => {
            if (y === null) {
              return;
            }
            
            const px = i * squareSize;
            const py = y * squareSize;
            
            if (x0 <= i && i <= x1 && y === y0 && Math.random() < 0.1) {
              lettersPosition[i] = null;
              filledCharacters[i - x0] = true;
              filled++;
            } else {
              // Random characters from common coding symbols
              const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
              const randChar = symbols[Math.floor(Math.random() * symbols.length)];
              ctx.fillText(randChar, px, py);
              
              lettersPosition[i]++;
              if (py + squareSize >= canvas.height) {
                if (filled >= nameLength) {
                  lettersPosition[i] = null;
                  filled++;
                } else {
                  lettersPosition[i] = -Math.floor(Math.random() * 50);
                }
              }
            }
          });
          
          animationRef.current = requestAnimationFrame(drawRain);
        };
        
        drawRain();
      }
    }

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
      
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: 'black' }}
          />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center gap-6 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
              >
                <i className='bx bx-code text-xl'></i>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
              >
                <i className='bx bx-user text-xl'></i>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-[#222222] flex items-center justify-center text-[#8b5cf6]"
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