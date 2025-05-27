
import { useState, useEffect } from 'react';
import { PurchaseOrder } from '@/types/purchaseOrder';

export function useSortedPurchaseOrders(purchaseOrders: PurchaseOrder[]) {
  const [sortField, setSortField] = useState<keyof PurchaseOrder | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [localPurchaseOrders, setLocalPurchaseOrders] = useState<PurchaseOrder[]>(purchaseOrders);

  // Update localPurchaseOrders when purchaseOrders prop changes
  useEffect(() => {
    setLocalPurchaseOrders(purchaseOrders);
  }, [purchaseOrders]);

  const handleSort = (field: keyof PurchaseOrder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPurchaseOrders = [...localPurchaseOrders].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
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
