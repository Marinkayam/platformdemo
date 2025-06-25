
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

interface ValidationProgressIndicatorProps {
  progress: number;
  status: string;
  steps: {
    label: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
  }[];
}

export function ValidationProgressIndicator({ progress, status, steps }: ValidationProgressIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <div className="w-24">
              <Progress value={progress} className="h-1.5 bg-grey-200" indicatorClassName="bg-primary-main" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-grey-600">{progress}%</span>
              <Loader2 className="h-3 w-3 animate-spin text-primary-main" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-3">
          <div className="space-y-2">
            <p className="font-medium text-sm">{status}</p>
            <div className="space-y-1.5">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className={`
                    w-1.5 h-1.5 rounded-full
                    ${step.status === 'completed' ? 'bg-green-500' : 
                      step.status === 'in-progress' ? 'bg-primary-main' : 
                      step.status === 'failed' ? 'bg-red-500' : 'bg-grey-300'}
                  `} />
                  <span className={`
                    ${step.status === 'completed' ? 'text-green-700' : 
                      step.status === 'in-progress' ? 'text-primary-main' : 
                      step.status === 'failed' ? 'text-red-700' : 'text-grey-600'}
                  `}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
