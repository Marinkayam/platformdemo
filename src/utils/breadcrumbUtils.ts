// Universal breadcrumb utility for the entire application
import { useLocation } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Main breadcrumb configuration mapping
export const breadcrumbConfig: Record<string, (params?: any) => BreadcrumbItem[]> = {
  // Dashboard
  '/dashboard': () => [
    { label: 'Dashboard', isActive: true }
  ],

  // Invoices
  '/invoices': () => [
    { label: 'Request-to-Pay', isActive: true }
  ],
  '/invoices/:id': (params: { id: string; invoiceNumber?: string }) => [
    { label: 'Request-to-Pay', href: '/invoices' },
    { label: params.invoiceNumber || `Invoice ${params.id}`, isActive: true }
  ],

  // Portal Records
  '/portal-records': () => [
    { label: 'Portal Invoices', isActive: true }
  ],
  '/portal-records/:id': (params: { id: string; recordId?: string }) => [
    { label: 'Portal Invoices', href: '/portal-records' },
    { label: params.recordId || `Record ${params.id}`, isActive: true }
  ],

  // Purchase Orders
  '/purchase-orders': () => [
    { label: 'Purchase Orders', isActive: true }
  ],
  '/purchase-orders/:id': (params: { id: string; poNumber?: string }) => [
    { label: 'Purchase Orders', href: '/purchase-orders' },
    { label: params.poNumber || `PO ${params.id}`, isActive: true }
  ],

  // Smart Connections
  '/smart-connections': () => [
    { label: 'Smart Connections', isActive: true }
  ],
  '/smart-connections/new': () => [
    { label: 'Smart Connections', href: '/smart-connections' },
    { label: 'New Connection', isActive: true }
  ],

  // Scan Agents
  '/scan-agents': () => [
    { label: 'Scan Agents', isActive: true }
  ],

  // Payments & Relationships
  '/payments-relationships': () => [
    { label: 'Payments & Relationships', isActive: true }
  ],
  '/payments-relationships/new': () => [
    { label: 'Payments & Relationships', href: '/payments-relationships' },
    { label: 'New Relationship', isActive: true }
  ],

  // Workspace Settings
  '/workspace': () => [
    { label: 'Workspace Settings', isActive: true }
  ],

  // Settings
  '/settings': () => [
    { label: 'Settings', isActive: true }
  ],

  // Insights
  '/insights': () => [
    { label: 'Insights', isActive: true }
  ],

  // Portals Dashboard
  '/portals-dashboard': () => [
    { label: 'Portals Dashboard', isActive: true }
  ],

  // Add Agent
  '/add-agent': () => [
    { label: 'Scan Agents', href: '/scan-agents' },
    { label: 'Add New Agent', isActive: true }
  ],

  // Onboarding
  '/onboarding': () => [
    { label: 'Getting Started', isActive: true }
  ],
};

// Helper function to parse dynamic route and extract parameters
export function parseRoute(pathname: string): { pattern: string; params: Record<string, string> } {
  const segments = pathname.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  // Try to match against known patterns
  for (const [pattern, _] of Object.entries(breadcrumbConfig)) {
    const patternSegments = pattern.split('/').filter(Boolean);

    if (patternSegments.length !== segments.length) continue;

    let isMatch = true;
    const extractedParams: Record<string, string> = {};

    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        // This is a parameter
        const paramName = patternSegments[i].slice(1);
        extractedParams[paramName] = segments[i];
      } else if (patternSegments[i] !== segments[i]) {
        // Literal segment doesn't match
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return { pattern: '/' + patternSegments.join('/'), params: extractedParams };
    }
  }

  // No match found, return the original path
  return { pattern: pathname, params };
}

// Main function to generate breadcrumbs for current location
export function generateBreadcrumbs(pathname: string, extraParams?: Record<string, any>): BreadcrumbItem[] {
  const { pattern, params } = parseRoute(pathname);

  // Get the breadcrumb generator function for this pattern
  const generator = breadcrumbConfig[pattern];

  if (generator) {
    return generator({ ...params, ...extraParams });
  }

  // Fallback: Generate breadcrumbs from URL segments
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: index < segments.length - 1 ? href : undefined,
      isActive: index === segments.length - 1
    });
  });

  return breadcrumbs;
}

// Hook to use breadcrumbs in components
export function useBreadcrumbs(extraParams?: Record<string, any>) {
  const location = useLocation();
  return generateBreadcrumbs(location.pathname, extraParams);
}

// Special case handlers for complex routes
export function getInvoiceBreadcrumbs(status?: string): BreadcrumbItem[] {
  const baseBreadcrumb = { label: 'Request-to-Pay', href: '/invoices' };

  if (!status) {
    return [{ ...baseBreadcrumb, isActive: true, href: undefined }];
  }

  const statusLabels: Record<string, string> = {
    'pending': 'Pending Actions',
    'overdue': 'Overdue',
    'cleared': 'Cleared',
    'rejected': 'Rejected',
    'all': 'All Request-to-Pay'
  };

  return [
    baseBreadcrumb,
    { label: statusLabels[status] || status, isActive: true }
  ];
}

export function getPortalRecordBreadcrumbs(tab?: string): BreadcrumbItem[] {
  const baseBreadcrumb = { label: 'Portal Invoices', href: '/portal-records' };

  if (!tab) {
    return [{ ...baseBreadcrumb, isActive: true, href: undefined }];
  }

  const tabLabels: Record<string, string> = {
    'unmatched': 'Found Without Match',
    'conflicts': 'Conflicts',
    'rejected': 'Rejected',
    'matched': 'Matched'
  };

  return [
    baseBreadcrumb,
    { label: tabLabels[tab] || tab, isActive: true }
  ];
}