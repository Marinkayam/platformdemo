import { useState, useEffect } from 'react';
import { PortalUser } from '@/types/portalUser';

export function useSortedPortalUsers(portalUsers: PortalUser[]) {
  const [sortField, setSortField] = useState<keyof PortalUser | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [localPortalUsers, setLocalPortalUsers] = useState<PortalUser[]>(portalUsers);

  // Update localPortalUsers when portalUsers prop changes
  useEffect(() => {
    setLocalPortalUsers(portalUsers);
  }, [portalUsers]);

  const handleSort = (field: keyof PortalUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPortalUsers = [...localPortalUsers].sort((a, b) => {
    // Always put disconnected users at the top
    if (a.status === 'Disconnected' && b.status !== 'Disconnected') return -1;
    if (b.status === 'Disconnected' && a.status !== 'Disconnected') return 1;
    
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    return sortDirection === 'asc' ? (fieldA < fieldB ? -1 : 1) : (fieldA > fieldB ? -1 : 1);
  });

  return {
    sortedPortalUsers,
    sortField,
    sortDirection,
    handleSort,
    setLocalPortalUsers,
  };
}