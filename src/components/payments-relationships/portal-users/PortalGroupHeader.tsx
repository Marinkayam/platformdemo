
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PortalGroup } from './utils/portalAggregation';
import { PortalColumn } from './columns/PortalColumn';

interface PortalGroupHeaderProps {
  portalGroup: PortalGroup;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PortalGroupHeader({ portalGroup, isExpanded, onToggle }: PortalGroupHeaderProps) {
  return (
    <div 
      className="portal-group-header grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 h-[65px]"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between w-full">
        <PortalColumn portal={portalGroup.portal} />
        <div className="flex-shrink-0 ml-auto">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600 transition-transform duration-200" />
          )}
        </div>
      </div>
      
      <div className="flex items-center text-sm font-medium text-gray-700">
        {portalGroup.userCount} users
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        {portalGroup.aggregatedStatus}
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        {portalGroup.aggregatedTypes}
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        {portalGroup.totalAgents} total
      </div>
    </div>
  );
}
