
import { PurchaseOrderFilters } from "../types";

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

export function getActiveFilters(filters: PurchaseOrderFilters): ActiveFilter[] {
  const activeFilters: ActiveFilter[] = [];

  // Status filters
  filters.status.forEach(status => {
    activeFilters.push({
      key: `status-${status}`,
      label: "Status",
      value: status
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

  // Portal filters
  filters.portal.forEach(portal => {
    activeFilters.push({
      key: `portal-${portal}`,
      label: "Portal",
      value: portal
    });
  });

  // PO Number search
  if (filters.poNumber) {
    activeFilters.push({
      key: "po-number",
      label: "PO Number",
      value: filters.poNumber
    });
  }

  return activeFilters;
}
