
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

  // Due Date filter
  if (filters.dueDate?.from || filters.dueDate?.to) {
    let dateValue = "";
    if (filters.dueDate?.from && filters.dueDate?.to) {
      dateValue = `${filters.dueDate.from} - ${filters.dueDate.to}`;
    } else if (filters.dueDate?.from) {
      dateValue = `From ${filters.dueDate.from}`;
    } else if (filters.dueDate?.to) {
      dateValue = `Until ${filters.dueDate.to}`;
    }
    activeFilters.push({
      key: "due-date",
      label: "Due Date",
      value: dateValue
    });
  }

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
