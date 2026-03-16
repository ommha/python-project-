import React, { useState, useRef, useEffect, useCallback } from 'react';
import { wheelColors } from '../data/mock';

const SpinningWheel = ({ entries, onSpinEnd, selectedWinner, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const [showText, setShowText] = useState(true);

  const spinWheel = useCallback(() => {
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
    
    // The pointer is on the RIGHT side (at 0 degrees / 3 o'clock position)
    // Segments start from the top (12 o'clock = -90 degrees in our SVG)
    // To land the winning segment under the pointer:
    // - First segment (index 0) center is at -90 + segmentAngle/2 degrees from top
    // - To bring segment N to the right (0 degrees), we need to rotate so its center aligns with 0 degrees
    // - Segment N center angle from top = N * segmentAngle + segmentAngle/2
    // - We need to rotate the wheel so this angle aligns with 90 degrees (right side)
    // - Required rotation = 90 - (N * segmentAngle + segmentAngle/2)
    
    const segmentCenterAngle = winnerIndex * segmentAngle + (segmentAngle / 2);
    const targetAngle = 90 - segmentCenterAngle;
    
    // Normalize to positive angle
    const normalizedTarget = ((targetAngle % 360) + 360) % 360;
    
    // Add multiple full rotations for effect (spin clockwise)
    const fullRotations = 5 + Math.floor(Math.random() * 3);
    const currentNormalized = ((rotation % 360) + 360) % 360;
    
    // Calculate how much more we need to rotate
    let additionalRotation = normalizedTarget - currentNormalized;
    if (additionalRotation <= 0) {
      additionalRotation += 360;
    }
    
    const finalRotation = rotation + (fullRotations * 360) + additionalRotation;
    
    setRotation(finalRotation);
    
    // Call onSpinEnd after animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setShowText(true);
      onSpinEnd(selectedWinner || entries[0]);
    }, 5000);
  }, [isSpinning, entries, selectedWinner, rotation, setIsSpinning, onSpinEnd]);

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      spinWheel();
    }
  }, [spinWheel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (entries.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="w-[450px] h-[450px] rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-xl">Add entries to spin</span>
        </div>
      </div>
    );
  }

  const segmentAngle = 360 / entries.length;

  return (
    <div className="relative flex items-center justify-center">
      {/* Wheel Container */}
      <div 
        className="relative cursor-pointer select-none"
        onClick={spinWheel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') spinWheel(); }}
      >
        {/* SVG Wheel */}
        <svg
          ref={wheelRef}
          width="450"
          height="450"
          viewBox="0 0 450 450"
          className="drop-shadow-2xl pointer-events-none"
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
            
            const x1 = 225 + 210 * Math.cos(startRad);
            const y1 = 225 + 210 * Math.sin(startRad);
            const x2 = 225 + 210 * Math.cos(endRad);
            const y2 = 225 + 210 * Math.sin(endRad);
            
            const largeArc = segmentAngle > 180 ? 1 : 0;
            
            const pathData = `M 225 225 L ${x1} ${y1} A 210 210 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            // Text position - positioned along the radius
            const midAngle = (startAngle + endAngle) / 2 - 90;
            const midRad = midAngle * (Math.PI / 180);
            const textRadius = 140;
            const textX = 225 + textRadius * Math.cos(midRad);
            const textY = 225 + textRadius * Math.sin(midRad);
            
            return (
              <g key={index}>
                <path d={pathData} fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <text
                  x={textX}
                  y={textY}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  {entry.length > 10 ? entry.substring(0, 10) + '...' : entry}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle cx="225" cy="225" r="45" fill="white" />
        </svg>
        
        {/* Click to spin text */}
        {showText && !isSpinning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-white text-xl font-bold italic" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                Click to spin
              </p>
              <p className="text-white text-sm mt-1 italic" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                or press ctrl+enter
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Pointer - Red triangle pointing LEFT towards the wheel */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ marginRight: '-15px' }}>
        <svg width="30" height="40" viewBox="0 0 30 40">
          <polygon points="30,0 30,40 0,20" fill="#e74c3c" stroke="#c0392b" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default SpinningWheel;
