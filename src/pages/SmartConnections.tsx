
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SmartConnections() {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackNavigation}
            className="mr-3 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
          <h1 className="text-[32px] font-semibold text-gray-900">Smart Connections</h1>
        </div>
      </div>
    </div>
  );
}
