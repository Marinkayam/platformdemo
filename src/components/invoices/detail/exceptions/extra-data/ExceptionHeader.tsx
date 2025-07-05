
import { Badge } from "@/components/ui/badge";

export function ExceptionHeader() {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
        Extra Data
      </Badge>
    </div>
  );
}
