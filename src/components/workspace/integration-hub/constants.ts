
import { Database, FileText, ExternalLink } from 'lucide-react';
import { EmailConnector, OtherIntegration } from './types';

export const emailConnectors: EmailConnector[] = [
  {
    id: 1,
    name: 'Single Invoice (PDF)',
    type: 'SINGLE_INVOICE',
    status: 'DRAFT',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-15'
  },
  {
    id: 2,
    name: 'Bulk Invoice Processing',
    type: 'BULK_INVOICE',
    status: 'ACTIVE',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-14'
  },
  {
    id: 3,
    name: 'Purchase Order Sync',
    type: 'PURCHASE_ORDER',
    status: 'INACTIVE',
    emailTo: 'microsoft@montoinvoice.com',
    category: 'Email-Based',
    lastModified: '2025-01-13'
  }
];

export const otherIntegrations: OtherIntegration[] = [
  { name: 'NetSuite API', type: 'API', status: 'Coming Soon', icon: Database },
  { name: 'SAP Integration', type: 'ERP', status: 'Coming Soon', icon: Database },
  { name: 'QuickBooks Sync', type: 'ACCOUNTING', status: 'Coming Soon', icon: FileText },
  { name: 'Slack Notifications', type: 'MESSAGING', status: 'Coming Soon', icon: ExternalLink }
];
