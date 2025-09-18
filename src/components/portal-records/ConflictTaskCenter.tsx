import { TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConflictTaskCenterProps {
  conflictCount: number;
}

export function ConflictTaskCenter({ conflictCount }: ConflictTaskCenterProps) {
  if (conflictCount === 0) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">No conflicts found</h3>
              <p className="text-sm text-green-700 mt-1">
                All portal records are properly matched. Great work!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
            <TriangleAlert className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-900">
              You have {conflictCount} conflict{conflictCount !== 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Conflicts occur when multiple invoices are linked together. Review and select the correct one.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}