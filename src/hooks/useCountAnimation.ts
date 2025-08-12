import { useState, useEffect } from 'react';

interface UseCountAnimationProps {
  end: number;
  duration?: number;
  isActive?: boolean;
  startFrom?: number;
}

export function useCountAnimation({ 
  end, 
  duration = 2000, 
  isActive = true,
  startFrom = 0 
}: UseCountAnimationProps) {
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    if (!isActive) {
      setCount(end);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = startFrom;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOutCubic * (end - startValue) + startValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, isActive, startFrom]);

  return count;
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Format currency values
export function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num}`;
}