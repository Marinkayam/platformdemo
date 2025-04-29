
import { AlertTriangle } from "lucide-react";
import { Invoice } from "@/types/invoice";

interface FieldLabelsProps {
  fields: Array<{ key: keyof Invoice, label: string }>;
  differences: Record<string, boolean>;
}

export function FieldLabels({ fields, differences }: FieldLabelsProps) {
  return (
    <div className="col-span-1">
      <div className="h-14 flex items-center font-medium text-sm">Field</div>
      {fields.map((field) => (
        <div 
          key={field.key} 
          className={`h-12 flex items-center font-medium text-sm ${
            differences[field.key as string] ? 'text-primary-700' : ''
          }`}
        >
          {field.label}
          {differences[field.key as string] && (
            <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
          )}
        </div>
      ))}
    </div>
  );
}
