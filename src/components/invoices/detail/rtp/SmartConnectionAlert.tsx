
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SmartConnectionAlertProps {
  exceptions?: string[];
}

export const SmartConnectionAlert = ({ exceptions }: SmartConnectionAlertProps) => {
  if (!exceptions || exceptions.length === 0) return null;
  
  const navigate = useNavigate();
  
  const handleNavigateToSmartConnection = () => {
    navigate('/smart-connections');
  };
  
  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-800">Connection Issues Detected</AlertTitle>
      <AlertDescription className="text-amber-700 flex flex-col md:flex-row md:justify-between md:items-center">
        <ul className="list-disc pl-5 mt-2 space-y-1 mb-4 md:mb-0">
          {exceptions.map((exception, i) => (
            <li key={i} className="text-sm">{exception}</li>
          ))}
        </ul>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleNavigateToSmartConnection}
          className="flex items-center gap-2 bg-amber-200 hover:bg-amber-300 text-amber-800 border-amber-300 mt-2 md:mt-0 ml-auto md:ml-4"
        >
          <RefreshCw className="h-4 w-4" /> Update Agent
        </Button>
      </AlertDescription>
    </Alert>
  );
};
