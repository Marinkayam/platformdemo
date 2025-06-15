
import { StatusBadge } from "@/components/common/StatusBadge";
import { PurchaseOrderStatus } from "@/types/purchase-orders";

const StatusBadgesDemo = () => {
  const statuses: PurchaseOrderStatus[] = [
    'new',
    'pending_approval',
    'approved',
    'rejected',
    'cancelled',
    'completed',
    'New',
    'Partially Invoiced',
    'Fully Invoiced'
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
