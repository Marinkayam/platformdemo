import { useState, useEffect } from "react";
import { SparklesText } from "@/components/common/SparklesText";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface AIScanProgressProps {
  onComplete: () => void;
}

export function AIScanProgress({ onComplete }: AIScanProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 120);
    } else {
      setTimeout(onComplete, 200);
    }
    return () => clearTimeout(frame);
  }, [progress, onComplete]);

  return (
    <div className="w-64 max-w-full mt-1 mb-2 flex flex-col items-start relative">
      <AnimatePresence>
        <motion.div
          key="ai-magic-text"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="mb-0.5"
        >
          <SparklesText 
            text={`AI scanning Smart Connection... ${progress}%`} 
            className="text-xs font-semibold text-[#7B59FF]" 
            sparklesCount={5} 
            duration={1200} 
          />
        </motion.div>
      </AnimatePresence>
      <div className="relative w-full">
        <Progress
          value={progress}
          indicatorClassName="bg-gradient-to-r from-[#7B59FF] via-[#B983FF] to-[#7B59FF] shadow-[0_0_8px_1px_rgba(123,89,255,0.18)] transition-all duration-300"
          className="h-1 rounded-full bg-[#F0EDFF] shadow-[0_1px_8px_0_rgba(123,89,255,0.08)]"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SparklesText text="✨" className="text-base animate-pulse" sparklesCount={3} duration={1200} />
        </div>
      </div>
    </div>
  );
}