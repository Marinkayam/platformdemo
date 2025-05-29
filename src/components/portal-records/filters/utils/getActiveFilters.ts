
import { PortalRecordFilters } from "../types";

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

export function getActiveFilters(filters: PortalRecordFilters): ActiveFilter[] {
  const activeFilters: ActiveFilter[] = [];

  // Portal filters
  filters.portal.forEach(portal => {
    activeFilters.push({
      key: `portal-${portal}`,
      label: "Portal",
      value: portal
    });
  });

  // Buyer filters
  filters.buyer.forEach(buyer => {
    activeFilters.push({
      key: `buyer-${buyer}`,
      label: "Buyer",
      value: buyer
    });
  });

  // Status filter
  if (filters.status !== "All") {
    activeFilters.push({
      key: "status",
      label: "Status",
      value: filters.status
    });
  }

  // Type filter
  if (filters.type !== "All") {
    activeFilters.push({
      key: "type",
      label: "Type",
      value: filters.type
    });
  }

  // Search filter
  if (filters.search) {
    activeFilters.push({
      key: "search",
      label: "Search",
      value: filters.search
    });
  }

  return activeFilters;
}
