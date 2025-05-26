
import { useState, useMemo } from "react";
import { SmartConnection, SmartConnectionFilters, defaultSmartConnectionFilters } from "@/types/smartConnection";

export function useSmartConnectionFiltering(connections: SmartConnection[]) {
  const [filters, setFilters] = useState<SmartConnectionFilters>(defaultSmartConnectionFilters);

  const filteredConnections = useMemo(() => {
    return connections.filter((connection) => {
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(connection.status)) {
        return false;
      }

      // Receivable Entity filter
      if (filters.receivableEntity.length > 0 && !filters.receivableEntity.includes(connection.receivableEntity)) {
        return false;
      }

      // Payable filter
      if (filters.payable.length > 0 && !filters.payable.includes(connection.payableEntity)) {
        return false;
      }

      // Portal filter (check both ERP systems)
      if (filters.portal.length > 0) {
        const hasPortal = filters.portal.some(portal => 
          connection.receivableErp.includes(portal) || connection.payableErp.includes(portal)
        );
        if (!hasPortal) return false;
      }

      // Active/Inactive filter
      if (!filters.viewInactive && !connection.isActive) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          connection.receivableEntity,
          connection.payableEntity,
          connection.receivableErp,
          connection.payableErp,
          connection.status
        ];
        
        const matchesSearch = searchFields.some(field => 
          field.toLowerCase().includes(searchTerm)
        );
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [connections, filters]);

  const handleFilterChange = (key: keyof SmartConnectionFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(defaultSmartConnectionFilters);
  };

  return {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  };
}
