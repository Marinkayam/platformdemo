
import React from 'react';

export function LoadingAnimation() {
  return (
    <div className="flex justify-center">
      <svg width="60" height="60" viewBox="0 0 50 50">
        <circle 
          cx="25" 
          cy="25" 
          r="15" 
          fill="none" 
          stroke="#60A5FA" 
          strokeWidth="2"
        >
          <animate 
            attributeName="r" 
            values="15;20;15" 
            dur="2s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </circle>
        <circle 
          cx="25" 
          cy="25" 
          r="15" 
          fill="none" 
          stroke="#60A5FA" 
          strokeWidth="2" 
          opacity="0.3"
        >
          <animate 
            attributeName="r" 
            values="15;25;15" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
