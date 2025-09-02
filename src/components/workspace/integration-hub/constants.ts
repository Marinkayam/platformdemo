import { Database, FileText, ExternalLink, Mail, Building2, Hash } from 'lucide-react';
import { EmailConnector, OtherIntegration, IntegrationConnector } from './types';

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

export const integrationConnectors: IntegrationConnector[] = [
  {
    id: 'email',
    name: 'Email Integration',
    type: 'EMAIL',
    description: 'Process invoices and documents via email',
    icon: Mail,
    status: 'available',
    category: 'Data Processing'
  },
  {
    id: 'esker',
    name: 'Esker',
    type: 'ESKER',
    description: 'Enterprise document processing platform',
    icon: Building2,
    status: 'enterprise',
    category: 'Enterprise'
  },
  {
    id: 'netsuite',
    name: 'NetSuite',
    type: 'NETSUITE',
    description: 'ERP system integration for financial data',
    icon: Database,
    status: 'enterprise',
    category: 'Enterprise'
  },
  {
    id: 'sap',
    name: 'SAP Integration',
    type: 'SAP',
    description: 'Connect with SAP ERP systems',
    icon: Database,
    status: 'coming_soon',
    category: 'Enterprise'
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    type: 'QUICKBOOKS',
    description: 'Accounting software integration',
    icon: FileText,
    status: 'coming_soon',
    category: 'Accounting'
  },
  {
    id: 'slack',
    name: 'Slack',
    type: 'SLACK',
    description: 'Team communication and notifications',
    icon: Hash,
    status: 'coming_soon',
    category: 'Communication'
  }
];