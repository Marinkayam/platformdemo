
import { useState, useEffect } from 'react';
import { Invoice } from '@/types/invoice';

export function useSortedInvoices(invoices: Invoice[]) {
  const [sortField, setSortField] = useState<keyof Invoice | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [localInvoices, setLocalInvoices] = useState<Invoice[]>(invoices);

  // Update localInvoices when invoices prop changes
  useEffect(() => {
    setLocalInvoices(invoices);
  }, [invoices]);

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...localInvoices].sort((a, b) => {
    // Always prioritize "Pending Action" status first
    const aIsPending = a.status === "Pending Action";
    const bIsPending = b.status === "Pending Action";
    
    if (aIsPending && !bIsPending) return -1;
    if (!aIsPending && bIsPending) return 1;
    
    // If both are pending or both are not pending, apply regular sorting
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    return sortDirection === 'asc' ? (fieldA < fieldB ? -1 : 1) : (fieldA > fieldB ? -1 : 1);
  });

  return {
    sortedInvoices,
    sortField,
    sortDirection,
    handleSort,
    setLocalInvoices,
  };
}
