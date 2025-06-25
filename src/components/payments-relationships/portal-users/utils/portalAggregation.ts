
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
  return users.length > 3 ? 'group' : 'individual';
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
  
  const individualPortals: { portal: string; users: PortalUser[] }[] = [];
  const groupedPortals: PortalGroup[] = [];
  
  portalMap.forEach((users, portal) => {
    if (getPortalDisplayType(users) === 'individual') {
      individualPortals.push({ portal, users });
    } else {
      groupedPortals.push({
        portal,
        users,
        userCount: users.length,
        aggregatedStatus: aggregateStatuses(users),
        aggregatedTypes: aggregateUserTypes(users),
        totalAgents: users.reduce((sum, user) => sum + user.linkedSmartConnections, 0)
      });
    }
  });
  
  return { individualPortals, groupedPortals };
}
