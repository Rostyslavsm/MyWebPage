import { useEffect, useRef, useState } from 'react';

interface MatrixRainProps {
  isVisible: boolean;
}

interface RainElement {
  element: HTMLParagraphElement;
}

const MatrixRain = ({ isVisible }: MatrixRainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof setTimeout>>();
  const rainElements = useRef<RainElement[]>([]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Handle fade in/out with faster fade-out
    if (isVisible) {
      const timer = setTimeout(() => setOpacity(0.7), 100);
      return () => clearTimeout(timer);
    } else {
      // Immediate fade out
      setOpacity(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) {
      // Clean up if not visible
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      return;
    }

    const container = containerRef.current;

    // Clear any existing content
    container.innerHTML = '';

    // Add styles
    const style = document.createElement('style');
    style.innerHTML = `
      .matrix-rain-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
        pointer-events: none;
        display: flex;
        background-color: transparent;
        transition: opacity 0.5s ease-out;
      }
      .matrix-rain-container p {
        line-height: 1;
        margin: 0;
        flex: 1;
        background-color: transparent;
      }
      .matrix-rain-container span {
        display: block;
        width: 2vmax;
        height: 2vmax;
        font-size: 2vmax;
        color: transparent;
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        background-color: transparent;
      }
    `;
    document.head.appendChild(style);

    // Helper functions from the provided code
    function r(from: number, to: number) {
      return ~~(Math.random() * (to - from + 1) + from);
    }

    function pick(...args: any[]) {
      return args[r(0, args.length - 1)];
    }

    function getChar() {
      return String.fromCharCode(pick(
        r(0x3041, 0x30ff),
        r(0x2000, 0x206f),
        r(0x0020, 0x003f)
      ));
    }

    // Speed up the loop by 20% from the current speed
    function loop(fn: () => void, delay: number) {
      // Current speed is 30% slower, make it 20% faster from that speed
      const adjustedDelay = Math.floor(delay);
      let stamp = Date.now();
      function _loop() {
        if (Date.now() - stamp >= adjustedDelay) {
          fn(); 
          stamp = Date.now();
        }
        // Speed up the animation frame rate as well
        animationRef.current = setTimeout(_loop, 10); // From 13 to 10
      }
      _loop();
    }

    // Classes from the provided code
    class Char {
      element: HTMLSpanElement;
      
      constructor() {
        this.element = document.createElement('span');
        this.mutate();
      }
      
      mutate() {
        this.element.textContent = getChar();
      }
    }

    class Trail {
      list: Char[];
      options: { size: number; offset: number };
      body: (Char | null)[];
      
      constructor(list: Char[] = [], options?: Partial<{ size: number; offset: number }>) {
        this.list = list;
        this.options = Object.assign(
          { size: 10, offset: 0 }, options
        );
        this.body = [];
        this.move();
      }
      
      traverse(fn: (n: Char, i: number, last: boolean) => void) {
        this.body.forEach((n, i) => {
          let last = (i == this.body.length - 1);
          if (n) fn(n, i, last);
        });
      }
      
      move() {
        this.body = [];
        let { offset, size } = this.options;
        for (let i = 0; i < size; ++i) {
          let item = this.list[offset + i - size + 1];
          this.body.push(item);
        }
        this.options.offset = 
          (offset + 1) % (this.list.length + size - 1);
      }
    }

    class Rain {
      element: HTMLParagraphElement;
      trail!: Trail; // Using the definite assignment assertion
      
      constructor(target?: HTMLElement, row = 50) {
        this.element = document.createElement('p');
        this.build(row);
        if (target) {
          target.appendChild(this.element);
        }
        this.drop();
      }
      
      build(row = 20) {
        let root = document.createDocumentFragment();
        let chars: Char[] = [];
        for (let i = 0; i < row; ++i) {
          let c = new Char();
          root.appendChild(c.element);
          chars.push(c);
          if (Math.random() < .5) {
            // Adjust mutation rate - 20% faster
            loop(() => c.mutate(), r(1040, 5200)); // From 1300-6500 to 1040-5200
          }
        }
        this.trail = new Trail(chars, { 
          size: r(10, 30), offset: r(0, 100) 
        });
        this.element.appendChild(root); 
      }
      
      drop() {
        let trail = this.trail;
        let len = trail.body.length;
        // Adjust the drop rate - 20% faster
        let delay = r(10, 104); // From 13-130 to 10-104
        loop(() => {
          trail.move();
          // First, ensure all characters are transparent initially
          trail.list.forEach(c => {
            c.element.style.color = 'transparent';
            c.element.style.textShadow = 'none';
          });
          
          // Then only style the active characters in the trail
          trail.traverse((c, i, last) => {
            c.element.style.color = `hsla(270, 100%, ${85 / len * (i + 1)}%)`;
            if (last) {
              c.mutate();
              c.element.style.color = 'hsl(270, 100%, 85%)';
              c.element.style.textShadow = `
                0 0 .5em #fff,
                0 0 .5em currentColor`;
            }
          });
        }, delay);
      }
    }

    // Drawing function for aggressive cleanup
    function clearAllSpans(container: HTMLElement) {
      const allSpans = container.querySelectorAll('span');
      allSpans.forEach(span => {
        const computedStyle = window.getComputedStyle(span);
        const color = computedStyle.color;
        
        // If not part of an active trail, make completely transparent
        if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent' || color === '') {
          span.style.color = 'transparent';
          span.style.textShadow = 'none';
        }
      });
    }

    // Create matrix rain
    for (let i = 0; i < 50; ++i) {
      const rain = new Rain(container, 50);
      // Set explicit width for each rain column to distribute them evenly
      rain.element.style.width = '2%';
      rain.element.style.display = 'inline-block';
      rain.element.style.backgroundColor = 'transparent';
      rainElements.current.push(rain);
    }
    
    // More aggressive cleanup interval - adjusted by 20%
    const cleanupInterval = setInterval(() => {
      if (container && isVisible) {
        clearAllSpans(container);
      }
    }, 208); // From 260 to 208

    // Cleanup
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      rainElements.current = [];
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="matrix-rain-container"
      style={{ opacity }}
    />
  );
};

export default MatrixRain; 