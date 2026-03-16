import React, { useState, useRef, useEffect, useCallback } from 'react';
import { wheelColors } from '../data/mock';

const RANDOM_OPTION = "__RANDOM__";
const KYLIE_OPTION = "Kylie";

const SpinningWheel = ({ entries, onSpinEnd, selectedWinner, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const [showText, setShowText] = useState(true);

  const spinWheel = useCallback(() => {
    if (isSpinning || entries.length === 0) return;
    
    setIsSpinning(true);
    setShowText(false);
    
    const segmentAngle = 360 / entries.length;
    let winnerIndex;
    let actualWinner;
    
    // Check if Kylie is selected
    if (selectedWinner === KYLIE_OPTION) {
      // Check if Kylie exists in the entries (user typed it manually)
      const kylieIndex = entries.findIndex(e => e.toLowerCase() === 'kylie');
      if (kylieIndex !== -1) {
        // Kylie is on the wheel - land on it
        winnerIndex = kylieIndex;
        actualWinner = entries[kylieIndex];
      } else {
        // Kylie not on wheel - spin randomly but announce Kylie
        winnerIndex = Math.floor(Math.random() * entries.length);
        actualWinner = KYLIE_OPTION;
      }
    }
    // Check if random mode is selected
    else if (selectedWinner === RANDOM_OPTION) {
      // True random selection
      winnerIndex = Math.floor(Math.random() * entries.length);
      actualWinner = entries[winnerIndex];
    } 
    // Check if selected winner exists in entries
    else if (entries.includes(selectedWinner)) {
      // Predetermined winner from wheel
      winnerIndex = entries.indexOf(selectedWinner);
      actualWinner = selectedWinner;
    }
    else {
      // Selected winner not in entries - random
      winnerIndex = Math.floor(Math.random() * entries.length);
      actualWinner = entries[winnerIndex];
    }
    
    const segmentCenterAngle = winnerIndex * segmentAngle + (segmentAngle / 2);
    const targetAngle = 90 - segmentCenterAngle;
    const normalizedTarget = ((targetAngle % 360) + 360) % 360;
    const fullRotations = 5 + Math.floor(Math.random() * 3);
    const currentNormalized = ((rotation % 360) + 360) % 360;
    
    let additionalRotation = normalizedTarget - currentNormalized;
    if (additionalRotation <= 0) {
      additionalRotation += 360;
    }
    
    const finalRotation = rotation + (fullRotations * 360) + additionalRotation;
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setShowText(true);
      onSpinEnd(actualWinner);
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
        <div className="w-[480px] h-[480px] rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700/30">
          <span className="text-gray-500 text-xl">Add entries to spin</span>
        </div>
      </div>
    );
  }

  const segmentAngle = 360 / entries.length;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
      
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
          width="480"
          height="480"
          viewBox="0 0 480 480"
          className="drop-shadow-2xl pointer-events-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.15))'
          }}
        >
          {/* Outer ring */}
          <circle cx="240" cy="240" r="235" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          
          {entries.map((entry, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const color = wheelColors[index % wheelColors.length];
            
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 240 + 220 * Math.cos(startRad);
            const y1 = 240 + 220 * Math.sin(startRad);
            const x2 = 240 + 220 * Math.cos(endRad);
            const y2 = 240 + 220 * Math.sin(endRad);
            
            const largeArc = segmentAngle > 180 ? 1 : 0;
            
            const pathData = `M 240 240 L ${x1} ${y1} A 220 220 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            const midAngle = (startAngle + endAngle) / 2 - 90;
            const midRad = midAngle * (Math.PI / 180);
            const textRadius = 150;
            const textX = 240 + textRadius * Math.cos(midRad);
            const textY = 240 + textRadius * Math.sin(midRad);
            
            return (
              <g key={index}>
                <path d={pathData} fill={color} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <text
                  x={textX}
                  y={textY}
                  fill="white"
                  fontSize="15"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                  style={{ 
                    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                >
                  {entry.length > 10 ? entry.substring(0, 10) + '...' : entry}
                </text>
              </g>
            );
          })}
          
          {/* Center circle with gradient */}
          <defs>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f0f0" />
            </radialGradient>
          </defs>
          <circle cx="240" cy="240" r="50" fill="url(#centerGradient)" />
          <circle cx="240" cy="240" r="48" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        </svg>
        
        {/* Click to spin text */}
        {showText && !isSpinning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-white text-xl font-semibold italic" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Click to spin
              </p>
              <p className="text-gray-300 text-sm mt-1" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                or press ctrl+enter
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Pointer - Red triangle pointing LEFT towards the wheel */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ marginRight: '-12px' }}>
        <svg width="35" height="50" viewBox="0 0 35 50">
          <defs>
            <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <filter id="pointerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="-2" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
            </filter>
          </defs>
          <polygon points="35,5 35,45 0,25" fill="url(#pointerGradient)" filter="url(#pointerShadow)" />
          <polygon points="35,8 35,42 5,25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default SpinningWheel;
