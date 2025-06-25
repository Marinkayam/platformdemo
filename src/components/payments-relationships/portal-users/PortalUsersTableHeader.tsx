
import React from 'react';

export function PortalUsersTableHeader() {
  return (
    <div className="sticky top-0 z-10 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 bg-[#F6F7F9] border-b border-gray-100">
      <div className="text-sm font-semibold text-gray-700">Portal</div>
      <div className="text-sm font-semibold text-gray-700">Username</div>
      <div className="text-sm font-semibold text-gray-700">Status</div>
      <div className="text-sm font-semibold text-gray-700">User Type</div>
      <div className="text-sm font-semibold text-gray-700">Linked Agents</div>
      <div className="text-sm font-semibold text-gray-700">Validation</div>
      <div className="text-sm font-semibold text-gray-700 text-center">Actions</div>
    </div>
  );
}
