
import { AlertTriangle } from "lucide-react";
import { TableCell } from "@/components/ui/table";

interface InvoiceNumberProps {
  number: string;
  hasWarning?: boolean;
  isPending: boolean;
}

export function InvoiceNumber({ number, hasWarning, isPending }: InvoiceNumberProps) {
  return (
    <TableCell className="font-medium flex items-center gap-2 text-[14px]">
      {hasWarning && (
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      )}
      <span className={isPending ? "text-red-600 font-medium" : ""}>
        {number}
      </span>
    </TableCell>
  );
}
