
import { AlertCircle } from "lucide-react";
import { Exception } from "@/types/exception";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExceptionsListProps {
  exceptions: Exception[];
}

export function ExceptionsList({ exceptions }: ExceptionsListProps) {
  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-muted-foreground">No exceptions found for this invoice.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-red-50 border-b">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <CardTitle className="text-lg font-medium text-red-700">
              Exception Detected
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div>
          <h3 className="font-medium mb-2">Exception Message:</h3>
          <div className="text-sm bg-gray-50 p-4 rounded-md border">
            <p>The following errors need to be resolved to meet the buyer's and portal's requirements:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              {exceptions.map(exception => (
                <li key={exception.id}>{exception.message}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
