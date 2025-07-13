import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AutoCreatedTag: React.FC = () => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: animate ? 1.1 : 1, boxShadow: animate ? '0 0 0 4px #E9DFFF' : 'none' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, type: 'spring', bounce: 0.3 }}
                onAnimationComplete={() => setAnimate(false)}
                className="inline-flex items-center rounded-full border border-[#E1D6F9] bg-[#F2EEFF] px-3 py-0.5 text-[12px] font-medium text-[#7B59FF] select-none cursor-default shadow-sm"
                style={{ minWidth: 0 }}
              >
                Auto-created from RTP
              </motion.div>
            </AnimatePresence>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-normal">
          Created automatically from RTP / Payment Report
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}; 