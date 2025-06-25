
import { PortalUser } from '@/types/portalUser';

export interface PortalGroup {
  portal: string;
  users: PortalUser[];
  userCount: number;
  aggregatedStatus: string;
  aggregatedTypes: string;
  totalAgents: number;
}

export function getPortalDisplayType(users: PortalUser[]): 'individual' | 'group' {
  return users.length > 1 ? 'group' : 'individual';
}

export function aggregateStatuses(users: PortalUser[]): string {
  const counts = users.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const parts: string[] = [];
  if (counts.Connected) parts.push(`${counts.Connected} Connected`);
  if (counts.Validating) parts.push(`${counts.Validating} Validating`);
  if (counts.Disconnected) parts.push(`${counts.Disconnected} Disconnected`);
  
  return parts.join(', ');
}

export function aggregateUserTypes(users: PortalUser[]): string {
  const types = [...new Set(users.map(u => u.userType))];
  if (types.length > 1) return 'Mixed';
  return `${users.length} ${types[0]}`;
}

export function groupPortalUsers(portalUsers: PortalUser[]): {
  individualPortals: { portal: string; users: PortalUser[] }[];
  groupedPortals: PortalGroup[];
} {
  const portalMap = new Map<string, PortalUser[]>();
  
  // Group users by portal
  portalUsers.forEach(user => {
    if (!portalMap.has(user.portal)) {
      portalMap.set(user.portal, []);
    }
    portalMap.get(user.portal)!.push(user);
  });
  
  // Convert to arrays for sorting
  const allPortalGroups = Array.from(portalMap.entries()).map(([portal, users]) => ({
    portal,
    users,
    displayType: getPortalDisplayType(users),
    hasDisconnected: users.some(user => user.status === 'Disconnected')
  }));

  // Sort with priority: Disconnected portals first, then groups, then individuals
  const sortedPortalGroups = allPortalGroups.sort((a, b) => {
    // Priority 1: Disconnected portals first (any portal containing disconnected users)
    if (a.hasDisconnected && !b.hasDisconnected) return -1;
    if (!a.hasDisconnected && b.hasDisconnected) return 1;
    
    // Priority 2: Among portals with same disconnection status, groups before individuals
    if (a.hasDisconnected === b.hasDisconnected) {
      const aIsGroup = a.displayType === 'group';
      const bIsGroup = b.displayType === 'group';
      
      if (aIsGroup && !bIsGroup) return -1;
      if (!aIsGroup && bIsGroup) return 1;
    }
    
    // Same priority level: alphabetical by portal name
    return a.portal.localeCompare(b.portal);
  });

  const individualPortals: { portal: string; users: PortalUser[] }[] = [];
  const groupedPortals: PortalGroup[] = [];
  
  // Process sorted groups
  sortedPortalGroups.forEach(({ portal, users, displayType }) => {
    // Sort users within each portal: Connected -> Validating -> Disconnected
    const sortedUsers = users.sort((a, b) => {
      if (a.status !== b.status) {
        const statusOrder = { 'Connected': 0, 'Validating': 1, 'Disconnected': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.username.localeCompare(b.username);
    });

    if (displayType === 'individual') {
      individualPortals.push({ portal, users: sortedUsers });
    } else {
      groupedPortals.push({
        portal,
        users: sortedUsers,
        userCount: users.length,
        aggregatedStatus: aggregateStatuses(users),
        aggregatedTypes: aggregateUserTypes(users),
        totalAgents: users.reduce((sum, user) => sum + user.linkedSmartConnections, 0)
      });
    }
  });
  
  return { individualPortals, groupedPortals };
}
