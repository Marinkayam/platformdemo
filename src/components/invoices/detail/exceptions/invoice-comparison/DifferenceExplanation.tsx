
import { Invoice } from "@/types/invoice";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface DifferenceExplanationProps {
  count: number;
  fields: Array<{ key: keyof Invoice, label: string }>;
}

export function DifferenceExplanation({ count, fields }: DifferenceExplanationProps) {
  // Get top 3 most important differing fields
  const importantFields = ['total', 'status', 'dueDate', 'buyer', 'number'];
  const highlightedFields = fields
    .filter(f => importantFields.includes(f.key as string))
    .slice(0, 3);

  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-amber-800">
        <span className="font-medium">Found {count} differences</span> between these invoices
        {highlightedFields.length > 0 && (
          <>
            , including: <span className="font-medium">
              {highlightedFields.map((f, i) => (
                <span key={f.key as string}>
                  {f.label}{i < highlightedFields.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
