import { TableCell } from "@/components/ui/table";
import { UserX } from "lucide-react";
interface RejectionInfoProps {
  isRejectedByMonto: boolean;
  isRejectedByBuyer: boolean;
}
export function RejectionInfo({
  isRejectedByMonto,
  isRejectedByBuyer
}: RejectionInfoProps) {
  if (!isRejectedByMonto && !isRejectedByBuyer) return null;
  return <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isRejectedByMonto ? 'bg-[#F3E8FF] text-[#9333EA]' : 'bg-red-50 text-red-600'}`}>
        <UserX className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">{isRejectedByMonto ? 'Monto' : 'Buyer'}</span>
      </div>;
}