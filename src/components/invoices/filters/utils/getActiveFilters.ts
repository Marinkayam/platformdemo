
import { InvoiceFilters } from "../types";

export function getActiveFilters(filters: InvoiceFilters) {
  const active: { key: string; label: string; value: string }[] = [];
  
  if (filters.status.length > 0) {
    filters.status.forEach(status => {
      active.push({
        key: `status-${status}`,
        label: "Status",
        value: status
      });
    });
  }
  
  if (filters.buyer.length > 0) {
    filters.buyer.forEach(buyer => {
      active.push({
        key: `buyer-${buyer}`,
        label: "Buyer",
        value: buyer
      });
    });
  }
  
  if (filters.portal.length > 0) {
    filters.portal.forEach(portal => {
      active.push({
        key: `portal-${portal}`,
        label: "Portal",
        value: portal
      });
    });
  }
  
  if (filters.dueDate.from || filters.dueDate.to) {
    let dateValue = "";
    if (filters.dueDate.from && filters.dueDate.to) {
      dateValue = `${filters.dueDate.from} - ${filters.dueDate.to}`;
    } else if (filters.dueDate.from) {
      dateValue = `From ${filters.dueDate.from}`;
    } else if (filters.dueDate.to) {
      dateValue = `Until ${filters.dueDate.to}`;
    }
    
    active.push({
      key: "date-range",
      label: "Due Date",
      value: dateValue
    });
  }
  
  if (filters.transactionType !== "All") {
    active.push({
      key: "transaction-type",
      label: "Transaction Type",
      value: filters.transactionType
    });
  }
  
  if (filters.owner.length > 0) {
    filters.owner.forEach(owner => {
      active.push({
        key: `owner-${owner}`,
        label: "Owner",
        value: owner
      });
    });
  }
  
  return active;
}
