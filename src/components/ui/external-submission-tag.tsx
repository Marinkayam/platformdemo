import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BadgePill from "@/components/ui/badge-pill";
import { Upload } from "lucide-react";

export const ExternalSubmissionTag: React.FC = () => {
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
                    label="External Submission"
                    color="processing"
                    variant="secondary"
                    startIcon={<Upload className="h-3 w-3" />}
                  />
                </motion.div>
              </AnimatePresence>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-normal">
          Invoices sent through this agent will be picked up during portal scans
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
