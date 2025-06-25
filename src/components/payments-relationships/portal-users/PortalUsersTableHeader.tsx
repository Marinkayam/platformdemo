
import React from 'react';

export function PortalUsersTableHeader() {
  return (
    <div className="sticky top-0 z-10 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 bg-[#4A90E2] border-b border-blue-300">
      <div className="text-sm font-semibold text-white">Portal</div>
      <div className="text-sm font-semibold text-white">Username</div>
      <div className="text-sm font-semibold text-white">Status</div>
      <div className="text-sm font-semibold text-white">User Type</div>
      <div className="text-sm font-semibold text-white">Linked Agents</div>
      <div className="text-sm font-semibold text-white">Validation</div>
      <div className="text-sm font-semibold text-white text-center">Actions</div>
    </div>
  );
}
