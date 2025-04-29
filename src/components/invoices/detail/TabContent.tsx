
import { useState, useEffect } from "react";
import { Activity, Loader2 } from "lucide-react";
import { ActivityTab } from "./ActivityTab";
import { RTPDataTab } from "./RTPDataTab";
import { Button } from "@/components/ui/button";

interface TabContentProps {
  tab: string;
}

export function TabContent({ tab }: TabContentProps) {
  const [dotCount, setDotCount] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  // Dots animation for loading effect
  useEffect(() => {
    if (tab !== "smart-connection") return;
    
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 500);
    
    return () => clearInterval(interval);
  }, [tab]);
  
  // Moving element animation
  useEffect(() => {
    if (tab !== "smart-connection") return;
    
    const interval = setInterval(() => {
      setPosition({
        x: Math.max(10, Math.min(90, 50 + (Math.random() - 0.5) * 80)),
        y: Math.max(10, Math.min(90, 50 + (Math.random() - 0.5) * 80))
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [tab]);
  
  const renderDots = () => {
    return ".".repeat(dotCount);
  };
  
  switch (tab) {
    case "exceptions":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No exceptions found for this invoice.</p>
        </div>
      );
    case "rtp-data":
      return <RTPDataTab />;
    case "smart-connection":
      return (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="relative h-52 mb-8 overflow-hidden border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div 
              className="absolute transition-all duration-1000 ease-in-out bg-primary/10 rounded-full p-3 flex items-center justify-center"
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)" 
              }}
            >
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Smart Connection Engine at Work{renderDots()}
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We're working on connecting your invoice data with powerful AI tools. 
            This feature will allow you to automate matching, detect anomalies, 
            and gain deeper insights into your financial workflows.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              className="animate-pulse bg-white"
            >
              Coming Soon
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Fun fact: Our AI analyzes over 1 million invoice data points daily to learn patterns!</p>
          </div>
        </div>
      );
    case "portal-records":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No portal records found.</p>
        </div>
      );
    case "activity":
      return <ActivityTab />;
    default:
      return null;
  }
}
