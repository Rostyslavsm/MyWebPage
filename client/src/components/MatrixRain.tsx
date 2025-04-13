import { useEffect, useRef, useState } from 'react';

interface MatrixRainProps {
  isVisible: boolean;
}

const MatrixRain = ({ isVisible }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Handle fade in/out
    if (isVisible) {
      const timer = setTimeout(() => setOpacity(0.7), 100);
      return () => clearTimeout(timer);
    } else {
      // Immediate fade out
      setOpacity(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) {
      // Clean up if not visible
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas to full size of container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const squareSize = 14; // Smaller characters for better performance
    ctx.font = `${squareSize}px monospace`;
    
    const columnCount = Math.ceil(canvas.width / squareSize);
    const lettersPosition = Array(columnCount).fill(0).map(() => 
      Math.floor(Math.random() * canvas.height / squareSize)
    );
    
    // Get random character - optimized to use common coding symbols
    const getRandomChar = () => {
      const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
      return symbols[Math.floor(Math.random() * symbols.length)];
    };
    
    const drawRain = () => {
      // Semi-transparent black overlay for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Main color for the matrix rain
      ctx.fillStyle = "#8b5cf6"; // Purple to match the theme
      
      // Draw each column
      lettersPosition.forEach((y, i) => {
        if (y === null) return;
        
        const x = i * squareSize;
        const cy = y * squareSize;
        
        // Random characters
        const char = getRandomChar();
        ctx.fillText(char, x, cy);
        
        // Move position down
        lettersPosition[i]++;
        
        // Reset when reaching bottom with random offset
        if (cy > canvas.height && Math.random() > 0.98) {
          lettersPosition[i] = 0;
        }
        
        // Random bright character at the head of each column with low probability
        if (Math.random() < 0.01) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(getRandomChar(), x, cy - squareSize);
          ctx.fillStyle = "#8b5cf6";
        }
      });
      
      // Request next frame for animation
      if (isVisible) {
        animationRef.current = requestAnimationFrame(drawRain);
      }
    };
    
    // Start animation
    drawRain();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] pointer-events-none"
      style={{ opacity, transition: 'opacity 0.5s ease-out' }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default MatrixRain; 