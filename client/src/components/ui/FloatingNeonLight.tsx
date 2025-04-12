import { useEffect, useState } from 'react';

export default function FloatingNeonLight() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Set isClient to true when component mounts (in browser environment)
    setIsClient(true);
    
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    // Initial setup
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listen for resize events to update viewport dimensions
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Trigger initial scroll event
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Don't calculate positions on server side
  if (!isClient) {
    return null;
  }
  
  // Create movement patterns based on scroll position
  const documentHeight = Math.max(
    document.body.scrollHeight || 1000,
    document.documentElement.scrollHeight || 1000
  );
  
  // Calculate how far down the page user has scrolled (as percentage)
  const scrollPercentage = viewportHeight ? 
    Math.min(scrollPosition / (viewportHeight * 2), 1) : 0;
  
  // Fixed position on the left side
  const leftPercentage = -30; // Off-screen to the left
  const topPercentage = 50;   // Middle of the screen vertically
  
  // Responsive adjustments based on screen size
  const isMobile = viewportWidth < 768;
  
  // Size adjustments based on viewport - increased for larger screens
  const primarySize = isMobile ? 400 : viewportWidth < 1200 ? 800 : 1200;
  
  // Base opacity values
  const baseOpacityDesktop = 0.5;
  const baseOpacityMobile = 0.18;
  
  // Fade out as user scrolls
  const opacityMultiplier = 1 - scrollPercentage;
  
  // Opacity adjustments with scroll-based fade out
  const primaryOpacity = isMobile 
    ? baseOpacityMobile * opacityMultiplier 
    : baseOpacityDesktop * opacityMultiplier;
  
  // Blur adjustments - slightly increased for softer effect
  const primaryBlur = isMobile ? '120px' : '150px';
  
  // Custom pulse animation className with more pronounced effect and complete fade
  const pulseClass = `
    @keyframes slowPulse {
      0%, 100% { opacity: ${primaryOpacity}; transform: scale(1) translate(-50%, -50%); }
      50% { opacity: 0; transform: scale(0.92) translate(-50%, -50%); }
    }
  `;
  
  return (
    <>
      <style>{pulseClass}</style>
      <div 
        className="fixed pointer-events-none z-40"
        style={{
          left: `${leftPercentage}%`,
          top: `${topPercentage}%`,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div 
          style={{
            width: `${primarySize}px`,
            height: `${primarySize}px`,
            borderRadius: '50%',
            backgroundColor: '#00c2c2',
            opacity: primaryOpacity,
            filter: `blur(${primaryBlur})`,
            animation: 'slowPulse 12s ease-in-out infinite',
            transformOrigin: 'center center',
            transition: 'opacity 0.5s ease-out',
          }}
        />
      </div>
    </>
  );
} 