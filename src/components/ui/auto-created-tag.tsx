import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BadgePill from "@/components/ui/badge-pill";
import { Sparkles } from "lucide-react";
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <BadgePill
                    label="Auto Created"
                    color="info"
                    variant="secondary"
                    startIcon={<Sparkles className="h-3 w-3" />}
                  />
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