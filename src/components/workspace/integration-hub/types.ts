
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
