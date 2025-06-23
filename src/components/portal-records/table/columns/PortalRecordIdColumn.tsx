
import { useNavigate } from "react-router-dom";
import { PortalRecord } from "@/types/portalRecord";

interface PortalRecordIdColumnProps {
  record: PortalRecord;
}

export function PortalRecordIdColumn({ record }: PortalRecordIdColumnProps) {
  const navigate = useNavigate();

  const handleViewDetails = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  return (
    <button
      onClick={() => handleViewDetails(record.id)}
      className="text-black hover:text-blue-800 hover:underline font-medium cursor-pointer"
    >
      {record.portalRecordId}
    </button>
  );
}
