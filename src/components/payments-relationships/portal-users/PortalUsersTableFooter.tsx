
import React from "react";

interface PortalUsersTableFooterProps {
  totalUsers: number;
}

export function PortalUsersTableFooter({ totalUsers }: PortalUsersTableFooterProps) {
  return (
    <div className="px-6 py-3 border-t bg-gray-50 text-sm text-gray-600">
      Total Scan Agents: {totalUsers}
    </div>
  );
}
