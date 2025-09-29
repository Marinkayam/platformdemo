import { useState, useEffect } from 'react';
import { PurchaseOrder } from '@/types/purchase-orders';

type SortField = "poNumber" | "supplier" | "status" | "portal" | "totalAmount" | "invoicedAmount" | "amountLeft" | "dueDate" | "createdDate";
type SortDirection = 'asc' | 'desc';

export function useSortedPurchaseOrders(purchaseOrders: PurchaseOrder[]) {
  const [sortField, setSortField] = useState<SortField | null>('createdDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [localPurchaseOrders, setLocalPurchaseOrders] = useState<PurchaseOrder[]>(purchaseOrders);

  // Update localPurchaseOrders when purchaseOrders prop changes
  useEffect(() => {
    setLocalPurchaseOrders(purchaseOrders);
  }, [purchaseOrders]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPurchaseOrders = [...localPurchaseOrders].sort((a, b) => {
    if (!sortField) return 0;

    let fieldA = a[sortField];
    let fieldB = b[sortField];

    // Handle date fields specially
    if (sortField === 'createdDate' || sortField === 'dueDate') {
      fieldA = new Date(fieldA as string).getTime();
      fieldB = new Date(fieldB as string).getTime();
    }

    if (fieldA === fieldB) return 0;
    return sortDirection === 'asc' ? (fieldA < fieldB ? -1 : 1) : (fieldA > fieldB ? -1 : 1);
  });

  return {
    sortedPurchaseOrders,
    sortField,
    sortDirection,
    handleSort,
    setLocalPurchaseOrders,
  };
}
