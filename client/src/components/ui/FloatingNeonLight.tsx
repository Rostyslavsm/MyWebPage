import { useEffect, useState, useRef } from "react";

interface FloatingNeonLightProps {
  color?: string;
  size?: string;
  pulseSpeed?: number;
  initiallyVisible?: boolean;
}

export default function FloatingNeonLight({
  color = "#0de1ec",
  size = "400px",
  pulseSpeed = 8, // seconds for one pulse cycle (increased from 4 to 8 seconds - 50% slower)
  initiallyVisible = true,
}: FloatingNeonLightProps) {
  const [opacity, setOpacity] = useState(0); // Start with zero opacity
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Determine the appropriate opacity and size based on screen width
  const getResponsiveValues = () => {
    const width = screenSize.width;
    
    // Small mobile devices
    if (width < 480) {
      return {
        baseOpacity: 0.3,
        size: "clamp(300px, 65vw, 400px)",
        shadowSize: `0 0 80px 35px ${color}50`, // More transparent
        position: "-65%"
      };
    }
    // Medium mobile devices
    else if (width < 768) {
      return {
        baseOpacity: 0.4,
        size: "clamp(350px, 70vw, 500px)",
        shadowSize: `0 0 90px 40px ${color}60`,
        position: "-60%"
      };
    }
    // Tablets and small laptops
    else if (width < 1024) {
      return {
        baseOpacity: 0.35, // Reduced from 0.45
        size: "clamp(450px, 65vw, 700px)", // Reduced size
        shadowSize: `0 0 100px 45px ${color}50`, // More transparent (50% vs 70%)
        position: "-55%" // Moved further offscreen
      };
    }
    // Desktops
    else {
      return {
        baseOpacity: 0.5,
        size: "clamp(600px, 80vw, 1000px)",
        shadowSize: `0 0 130px 60px ${color}75`,
        position: "-40%"
      };
    }
  };

  const responsiveValues = getResponsiveValues();

  // Handle initial fade-in animation
  useEffect(() => {
    if (initiallyVisible && !isInitiallyLoaded) {
      // Small delay to ensure component is mounted
      const initialDelay = setTimeout(() => {
        setIsInitiallyLoaded(true);
      }, 100);
      
      return () => clearTimeout(initialDelay);
    }
  }, [initiallyVisible, isInitiallyLoaded]);

  // Sync with initiallyVisible and initial loading state
  useEffect(() => {
    if (initiallyVisible && isInitiallyLoaded) {
      setOpacity(responsiveValues.baseOpacity);
    }
  }, [initiallyVisible, isInitiallyLoaded, responsiveValues.baseOpacity]);

  useEffect(() => {
    // Use Intersection Observer instead of scroll events for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // If hero is visible, set to base opacity (only if already loaded)
          if (isInitiallyLoaded) {
            setOpacity(responsiveValues.baseOpacity);
          }
        } else {
          // If hero is not visible, hide the light
          setOpacity(0);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0, 0.3, 0.7, 1.0],
      }
    );

    // Find and observe the Hero section
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroRef.current = heroSection;
      observer.observe(heroSection);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [initiallyVisible, responsiveValues.baseOpacity, isInitiallyLoaded]);

  // Create keyframes for the pulse animation and initial fade-in
  const keyframes = `
    @keyframes pulse {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.7; // Slightly higher peak opacity for more visibility
        transform: scale(1.1);
      }
      100% {
        opacity: 0;
        transform: scale(0.8);
      }
    }
    
    @keyframes initialFadeIn {
      0% {
        opacity: 0;
        transform: scale(0.6);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  // Add the style to the head on component mount
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframes;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [keyframes]);

  return (
    <div 
      className="absolute transition-opacity duration-1000"
      style={{
        top: "0", // Fixed at the top of the document instead of viewport
        left: responsiveValues.position,
        opacity,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div 
        className="relative rounded-full blur-3xl"
        style={{
          width: responsiveValues.size,
          height: responsiveValues.size,
          backgroundColor: color,
          animation: isInitiallyLoaded 
            ? `pulse ${pulseSpeed}s infinite ease-in-out` 
            : `initialFadeIn 2s ease-in-out forwards`,
          boxShadow: responsiveValues.shadowSize,
        }}
      />
    </div>
  );
} 