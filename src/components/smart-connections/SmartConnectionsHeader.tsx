
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SmartConnectionsHeader() {
  const handleNewConnection = () => {
    console.log("New connection clicked");
    // TODO: Implement new connection modal
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-[32px] font-semibold text-gray-900">Smart Connections</h1>
      <Button 
        onClick={handleNewConnection}
        size="lg"
        className="flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        New Connection
      </Button>
    </div>
  );
}
