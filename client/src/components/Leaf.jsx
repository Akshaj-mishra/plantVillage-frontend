import React, { useState, useEffect } from 'react';
import { FaLeaf } from 'react-icons/fa';

const Leaf = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add current position to trail for effect
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-5); // Keep only the last 5 positions
      });
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Remove old trail items
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter(item => Date.now() - item.id < 200));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main leaf */}
      <div 
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <FaLeaf className="w-8 h-8 text-green-600 filter drop-shadow-lg" />
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
            opacity: 0.3 - (index * 0.06),
            scale: 0.5 + (index * 0.1)
          }}
        >
          <FaLeaf className="w-4 h-4 text-green-400" />
        </div>
      ))}
    </>
  );
};

export default Leaf;