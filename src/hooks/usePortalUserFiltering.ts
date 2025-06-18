
import { useState, useMemo, useCallback } from "react";
import { PortalUser, PortalUserFilters, defaultPortalUserFilters } from "@/types/portalUser";

export function usePortalUserFiltering(data: PortalUser[]) {
  const [filters, setFilters] = useState<PortalUserFilters>(defaultPortalUserFilters);

  const filteredUsers = useMemo(() => {
    let filtered = [...data];

    // Apply portal filter
    if (filters.portal.length > 0) {
      filtered = filtered.filter(user => filters.portal.includes(user.portal));
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(user => filters.status.includes(user.status));
    }

    // Apply user type filter
    if (filters.userType.length > 0) {
      filtered = filtered.filter(user => filters.userType.includes(user.userType));
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchLower) ||
        user.portal.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [data, filters]);

  const handleFilterChange = useCallback((key: keyof PortalUserFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultPortalUserFilters);
  }, []);

  return {
    filters,
    filteredUsers,
    handleFilterChange,
    handleResetFilters
  };
}
