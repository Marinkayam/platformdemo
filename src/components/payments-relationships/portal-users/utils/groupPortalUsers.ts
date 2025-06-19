
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

export function getPortalInitials(portalName: string): string {
  return portalName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getPortalColor(portalName: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500'
  ];
  
  const hash = portalName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
