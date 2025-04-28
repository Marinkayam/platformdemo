
import { UserCircle2 } from "lucide-react";
import { TableCell } from "@/components/ui/table";

interface OwnerInfoProps {
  owner: string;
}

export function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <TableCell className="text-[14px] text-gray-900">
      <div className="flex items-center gap-2">
        <UserCircle2 className="h-4 w-4 text-gray-400" />
        <span>{owner}</span>
      </div>
    </TableCell>
  );
}
