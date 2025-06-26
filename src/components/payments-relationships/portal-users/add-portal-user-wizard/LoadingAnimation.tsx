
import React from 'react';

export function LoadingAnimation() {
  return (
    <div className="flex justify-center">
      <svg width="80" height="80" viewBox="0 0 50 50" className="animate-pulse">
        <circle 
          cx="25" 
          cy="25" 
          r="15" 
          fill="none" 
          stroke="#7B59FF" 
          strokeWidth="2.5"
          className="opacity-60"
        >
          <animate 
            attributeName="r" 
            values="15;22;15" 
            dur="2.5s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="2.5s" 
            repeatCount="indefinite"
          />
        </circle>
        <circle 
          cx="25" 
          cy="25" 
          r="15" 
          fill="none" 
          stroke="#BEADFF" 
          strokeWidth="2" 
          className="opacity-40"
        >
          <animate 
            attributeName="r" 
            values="15;28;15" 
            dur="2.5s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.4;0.1;0.4" 
            dur="2.5s" 
            repeatCount="indefinite"
          />
        </circle>
        <circle 
          cx="25" 
          cy="25" 
          r="8" 
          fill="#7B59FF" 
          className="opacity-80"
        >
          <animate 
            attributeName="opacity" 
            values="0.8;0.4;0.8" 
            dur="1.5s" 
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
