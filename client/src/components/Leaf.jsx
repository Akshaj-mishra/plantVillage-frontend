import React, { useState, useEffect, useRef } from 'react';
import { FaLeaf } from 'react-icons/fa';

const Leaf = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reusable function to update position and trail
  const updatePositionAndTrail = (x, y) => {
    setPosition({ x, y });
    setTrail(prev => {
      const newTrail = [...prev, { x, y, id: Date.now() }];
      // Keep trail length short for performance
      return newTrail.slice(-7); 
    });
    if (!isVisible) setIsVisible(true);
  };

  // Handle mouse movement for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      updatePositionAndTrail(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
    // FIX 1: Removed `isVisible` from the dependency array
  }, [isMobile, isVisible]); // isVisible is needed here to re-apply the update function with the correct state closure

  // Handle touch events for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    const handleTouch = (e) => {
      const touch = e.touches[0];
      updatePositionAndTrail(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      setIsVisible(false);
    };

    // FIX 2: Added `touchmove` and `touchend` listeners
    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchmove', handleTouch);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isVisible]); // isVisible is needed here too

  // Clean up old trail items automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter(item => Date.now() - item.id < 500));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main leaf */}
      <div 
        className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <FaLeaf className="w-6 h-6 text-green-600 drop-shadow-lg" />
      </div>
      
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.5 * (index / trail.length),
            transform: `scale(${0.8 * (index / trail.length)})`,
            transition: 'opacity 0.5s, transform 0.5s'
          }}
        >
          <FaLeaf className="w-5 h-5 text-green-500" />
        </div>
      ))}
    </>
  );
};

export default Leaf;