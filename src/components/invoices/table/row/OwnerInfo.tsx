
import { User } from "lucide-react";
import { TableCell } from "@/components/ui/table";

interface OwnerInfoProps {
  owner: string;
}

export function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <TableCell className="text-[14px] text-gray-900 py-2 align-middle">
      <div className="flex items-center gap-2 overflow-hidden">
        <User className="h-4 w-4 text-gray-400 flex-shrink-0" style={{ stroke: "#01173E" }} />
        <span className="truncate max-w-[180px]">{owner}</span>
      </div>
    </TableCell>
  );
}
