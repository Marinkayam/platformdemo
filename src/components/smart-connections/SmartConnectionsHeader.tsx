
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SmartConnectionsHeader() {
  const navigate = useNavigate();

  const handleNewConnection = () => {
    navigate("/smart-connections/new-connection");
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">Smart Connections</h1>
      <Button 
        onClick={handleNewConnection}
        size="default"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        New Smart Connection
      </Button>
    </div>
  );
}
