import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { showWarningToast } from "@/lib/toast-helpers";

interface SmartConnectionAlertProps {
  exceptions?: string[];
}

export const SmartConnectionAlert = ({ exceptions }: SmartConnectionAlertProps) => {
  if (!exceptions || exceptions.length === 0) return null;
  
  const navigate = useNavigate();
  
  const handleNavigateToSmartConnection = () => {
    navigate('/payments-relationships');
  };
  
  const handleResolveNow = () => {
    showWarningToast(
      "Navigating to Payments Relationships",
      "Redirecting to resolve portal credential issues"
    );
    navigate('/payments-relationships');
  };
  
  return (
    <Alert className="mb-6 bg-red-50 border-red-200">
      <AlertTriangle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-800 font-semibold">Connection Issues Detected</AlertTitle>
      <AlertDescription className="text-red-700 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-sm">Portal User Credentials are missing </span>
          <button 
            onClick={handleResolveNow}
            className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline"
          >
            Resolve now
          </button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
