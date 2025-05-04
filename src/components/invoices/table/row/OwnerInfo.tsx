
import { UserCircle2 } from "lucide-react";
import { TableCell } from "@/components/ui/table";

interface OwnerInfoProps {
  owner: string;
}

export function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <UserCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
      <span className="truncate">{owner}</span>
    </div>
  );
}
