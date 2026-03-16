import React, { useState, useRef, useEffect } from 'react';
import { wheelColors } from '../data/mock';

const SpinningWheel = ({ entries, onSpinEnd, selectedWinner, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const [showText, setShowText] = useState(true);

  const spinWheel = () => {
    if (isSpinning || entries.length === 0) return;
    
    setIsSpinning(true);
    setShowText(false);
    
    // Calculate target rotation based on selected winner
    const segmentAngle = 360 / entries.length;
    let winnerIndex = entries.indexOf(selectedWinner);
    
    // If no winner selected or winner not in list, pick first entry
    if (winnerIndex === -1) {
      winnerIndex = 0;
    }
    
    // Calculate the angle to stop at (pointer is on the right at 0 degrees)
    // We need to position the winning segment under the pointer
    const targetAngle = 360 - (winnerIndex * segmentAngle) - (segmentAngle / 2);
    
    // Add multiple full rotations for effect
    const fullRotations = 5 + Math.floor(Math.random() * 3);
    const finalRotation = rotation + (fullRotations * 360) + targetAngle - (rotation % 360);
    
    setRotation(finalRotation);
    
    // Call onSpinEnd after animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setShowText(true);
      onSpinEnd(selectedWinner || entries[0]);
    }, 5000);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      spinWheel();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, selectedWinner, entries]);

  if (entries.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-xl">Add entries to spin</span>
        </div>
      </div>
    );
  }

  const segmentAngle = 360 / entries.length;

  return (
    <div className="relative flex items-center justify-center">
      {/* Wheel Container */}
      <div 
        className="relative cursor-pointer"
        onClick={spinWheel}
      >
        {/* SVG Wheel */}
        <svg
          ref={wheelRef}
          width="500"
          height="500"
          viewBox="0 0 500 500"
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {entries.map((entry, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const color = wheelColors[index % wheelColors.length];
            
            // Convert angles to radians
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 250 + 230 * Math.cos(startRad);
            const y1 = 250 + 230 * Math.sin(startRad);
            const x2 = 250 + 230 * Math.cos(endRad);
            const y2 = 250 + 230 * Math.sin(endRad);
            
            const largeArc = segmentAngle > 180 ? 1 : 0;
            
            const pathData = `M 250 250 L ${x1} ${y1} A 230 230 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            // Text position
            const midAngle = (startAngle + endAngle) / 2 - 90;
            const midRad = midAngle * (Math.PI / 180);
            const textRadius = 150;
            const textX = 250 + textRadius * Math.cos(midRad);
            const textY = 250 + textRadius * Math.sin(midRad);
            
            return (
              <g key={index}>
                <path d={pathData} fill={color} stroke="#fff" strokeWidth="2" />
                <text
                  x={textX}
                  y={textY}
                  fill="white"
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {entry.length > 12 ? entry.substring(0, 12) + '...' : entry}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle cx="250" cy="250" r="50" fill="white" />
        </svg>
        
        {/* Click to spin text */}
        {showText && !isSpinning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-white text-2xl font-bold drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Click to spin
              </p>
              <p className="text-white text-lg drop-shadow-lg mt-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                or press ctrl+enter
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Pointer */}
      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2" style={{ marginRight: '-18px' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <polygon points="0,10 0,30 35,20" fill="#3498db" />
        </svg>
      </div>
    </div>
  );
};

export default SpinningWheel;
