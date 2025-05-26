
interface SmartConnectionsTableFooterProps {
  totalConnections: number;
}

export function SmartConnectionsTableFooter({ totalConnections }: SmartConnectionsTableFooterProps) {
  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <div className="text-sm text-gray-600">
        Filter Result: {totalConnections} Connection{totalConnections !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
