
import { StatusBadge } from "@/components/common/StatusBadge";

const StatusBadgesDemo = () => {
  const statuses = [
    'new',
    'pending',
    'approved',
    'rejected',
    'paid',
    'settled',
    'awaiting_payment',
    'partially_paid',
    'overdue',
    'processing'
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {statuses.map(status => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  );
};

export default StatusBadgesDemo;
