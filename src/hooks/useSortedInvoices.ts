
import { useState } from 'react';
import { Invoice } from '@/types/invoice';

export function useSortedInvoices(invoices: Invoice[]) {
  const [sortField, setSortField] = useState<keyof Invoice | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [localInvoices, setLocalInvoices] = useState<Invoice[]>(invoices);

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...localInvoices].sort((a, b) => {
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
