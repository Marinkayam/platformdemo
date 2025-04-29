
import React from "react";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
  date: string;
}

export const ProcessTimeline = () => {
  const steps: TimelineStep[] = [
    { id: 1, name: "RTP Prepared", completed: true, current: false, date: "Apr 25" },
    { id: 2, name: "Awaiting SC", completed: true, current: false, date: "Apr 26" },
    { id: 3, name: "RTP Sent", completed: false, current: true, date: "Apr 28" },
    { id: 4, name: "Approved", completed: false, current: false, date: "" },
    { id: 5, name: "Paid", completed: false, current: false, date: "" }
  ];
  
  // Calculate progress percentage
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / (totalSteps - 1)) * 100; // Exclude the last step for better visual

  return (
    <Card className="mb-6">
      <CardHeader className="pb-1 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-700">Process Timeline</CardTitle>
          <span className="text-sm text-muted-foreground">
            {completedSteps}/{totalSteps}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-3 pb-4">
        <div>
          {/* Progress bar */}
          <Progress value={progress} className="h-1.5 mb-4" />
          
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex flex-col items-center group relative z-10 transition-all duration-200",
                    step.completed || step.current ? "cursor-default" : "opacity-70"
                  )}
                >
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
                    step.completed ? "bg-primary shadow-sm shadow-primary/20 text-white" : 
                    step.current ? "bg-white border-2 border-primary text-primary" : 
                    "bg-gray-100 text-gray-400"
                  )}>
                    {step.completed ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <span className="font-medium text-xs">{step.id}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium text-center transition-all duration-200 max-w-[60px]",
                    step.completed ? "text-primary" : 
                    step.current ? "text-primary" : 
                    "text-gray-500"
                  )}>
                    {step.name}
                  </span>
                  {step.date && (
                    <span className="text-xs mt-0.5 text-gray-500">{step.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
