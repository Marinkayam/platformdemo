
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Brain, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { mockConnectionWithIssue } from "@/components/invoices/detail/rtp/mockData";
import { SmartConnectionCard } from "@/components/invoices/detail/rtp/SmartConnectionCard";

export default function SmartConnections() {
  const [dotCount, setDotCount] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();
  
  // Dots animation for loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Moving element animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.max(10, Math.min(90, 50 + (Math.random() - 0.5) * 80)),
        y: Math.max(10, Math.min(90, 50 + (Math.random() - 0.5) * 80))
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderDots = () => {
    return ".".repeat(dotCount);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" /> Smart Connections
          </h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Smart Connection Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
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
              <p className="text-gray-600 mb-6">
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
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="text-primary flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Refresh Status
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Recent Connections</h2>
          {mockConnectionWithIssue.exceptions && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Connection Issues</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {mockConnectionWithIssue.exceptions.map((exception, i) => (
                      <li key={i} className="text-sm text-amber-700">{exception}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <SmartConnectionCard connection={mockConnectionWithIssue} />
        </div>
      </div>
    </div>
  );
}

// Missing AlertTriangle component
function AlertTriangle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
