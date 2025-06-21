
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

  // Record Type filters
  filters.recordType.forEach(recordType => {
    activeFilters.push({
      key: `recordType-${recordType}`,
      label: "Record Type",
      value: recordType
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

  // Transaction Type filter
  if (filters.transactionType !== "All") {
    activeFilters.push({
      key: "transactionType",
      label: "Transaction Type",
      value: filters.transactionType
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

  // Due Date filter
  if (filters.dueDate.from || filters.dueDate.to) {
    let dateValue = "";
    if (filters.dueDate.from && filters.dueDate.to) {
      dateValue = `${filters.dueDate.from} - ${filters.dueDate.to}`;
    } else if (filters.dueDate.from) {
      dateValue = `From ${filters.dueDate.from}`;
    } else if (filters.dueDate.to) {
      dateValue = `Until ${filters.dueDate.to}`;
    }
    
    activeFilters.push({
      key: "dueDate",
      label: "Due Date",
      value: dateValue
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
