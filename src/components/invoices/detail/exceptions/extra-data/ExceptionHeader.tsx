
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function ExceptionHeader() {
  const { id } = useParams();
  
  // For INV-10032355 (test-regular-2), show Smart Connections badge in red
  const isSmartConnectionsException = id === "test-regular-2";
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
        <Badge className={isSmartConnectionsException 
          ? "bg-red-100 text-red-700 border-red-200" 
          : "bg-purple-100 text-purple-700 border-purple-200"
        }>
          {isSmartConnectionsException ? "Smart Connections" : "Extra Data"}
        </Badge>
      </div>
      <div className="flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
        <p style={{ color: '#38415F' }} className="text-sm">
          Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
        </p>
      </div>
    </div>
  );
}
