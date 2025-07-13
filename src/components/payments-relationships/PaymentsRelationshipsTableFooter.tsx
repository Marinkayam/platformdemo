interface PaymentsRelationshipsTableFooterProps {
  totalConnections: number;
}

export function PaymentsRelationshipsTableFooter({ totalConnections }: PaymentsRelationshipsTableFooterProps) {
  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <div className="text-sm text-gray-600">
        Total Smart Connections: {totalConnections}
      </div>
    </div>
  );
}
