export interface EmailConnector {
  id: number;
  name: string;
  type: string;
  status: 'ACTIVE' | 'DRAFT' | 'INACTIVE';
  emailTo: string;
  category: string;
  lastModified: string;
}

export interface OtherIntegration {
  name: string;
  type: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface IntegrationConnector {
  id: string;
  name: string;
  type: 'EMAIL' | 'ESKER' | 'NETSUITE' | 'SAP' | 'QUICKBOOKS' | 'SLACK';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'available' | 'enterprise' | 'coming_soon';
  category: 'Data Processing' | 'Enterprise' | 'Accounting' | 'Communication';
}

export interface InboxConfiguration {
  id: string;
  name: string;
  inboxType: 'single_invoice' | 'bulk_invoice' | 'with_attachments' | 'combined' | 'payment_reports';
  toEmail: string;
  fromEmailDomain: boolean;
  fromEmailAddresses: string[];
  emailSubject: string;
  replyToEmail: string;
  isActive: boolean;
}

export interface ConnectorConfiguration {
  connectorId: string;
  inboxes: InboxConfiguration[];
  isConfigured: boolean;
}