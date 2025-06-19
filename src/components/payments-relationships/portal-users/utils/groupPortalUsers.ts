
import { PortalUser } from '@/types/portalUser';

export interface PortalGroup {
  portalName: string;
  users: PortalUser[];
  userCount: number;
  isExpanded?: boolean;
}

export function groupPortalUsers(users: PortalUser[]): PortalGroup[] {
  const grouped = users.reduce((acc, user) => {
    if (!acc[user.portal]) {
      acc[user.portal] = [];
    }
    acc[user.portal].push(user);
    return acc;
  }, {} as Record<string, PortalUser[]>);

  return Object.entries(grouped).map(([portalName, users]) => ({
    portalName,
    users: users.sort((a, b) => a.username.localeCompare(b.username)),
    userCount: users.length,
    isExpanded: false
  })).sort((a, b) => a.portalName.localeCompare(b.portalName));
}

export function getPortalSummaryStatus(users: PortalUser[]): string[] {
  const statuses = [...new Set(users.map(user => user.status))];
  return statuses;
}

export function getPortalSummaryUserType(users: PortalUser[]): string | null {
  const userTypes = [...new Set(users.map(user => user.userType))];
  return userTypes.length === 1 ? userTypes[0] : null;
}
