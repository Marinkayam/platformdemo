
import { TableCell } from "@/components/ui/table";

interface RejectionInfoProps {
  isRejectedByMonto: boolean;
  isRejectedByBuyer: boolean;
}

export function RejectionInfo({ isRejectedByMonto, isRejectedByBuyer }: RejectionInfoProps) {
  if (!isRejectedByMonto && !isRejectedByBuyer) return <TableCell className="text-[14px] text-gray-900" />;

  return (
    <TableCell className="text-[14px] text-gray-900">
      <span className={`text-[12px] px-2 py-0.5 rounded-full ${
        isRejectedByMonto ? 'bg-[#D6BCFA] text-[#9b87f5]' : 'bg-red-50 text-[#ea384c]'
      }`}>
        {isRejectedByMonto ? 'By Monto' : 'By Buyer'}
      </span>
    </TableCell>
  );
}
