
import React from 'react';
import { PortalUsersTableFooter } from './PortalUsersTableFooter';

interface PortalUsersFilteredEmptyStateProps {
  onAddPortalUser: () => void;
}

export function PortalUsersFilteredEmptyState({ onAddPortalUser }: PortalUsersFilteredEmptyStateProps) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-gray-400 text-4xl mb-4">👥</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No portal users match this filter</h3>
        <p className="text-gray-500 mb-6">Try changing your criteria.</p>
        <button 
          onClick={onAddPortalUser}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Add Portal User
        </button>
      </div>
      <PortalUsersTableFooter totalUsers={0} />
    </div>
  );
}
