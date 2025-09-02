
import { useState } from 'react';
import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button";
import { EmailConnectorCard } from './EmailConnectorCard';
import { LockedIntegrationCard } from './LockedIntegrationCard';
import { EmailConfigDialog, EmailConfig } from './EmailConfigDialog';
import { Mail, FileText, Database, Globe, ExternalLink, Server } from 'lucide-react';

export function IntegrationHub() {
  const [selectedEmailConnector, setSelectedEmailConnector] = useState<string | null>(null);
  const [emailConfigs, setEmailConfigs] = useState<Record<string, EmailConfig>>({});

  const emailConnectorTypes = [
    {
      id: 'single-invoice',
      title: 'Single Invoice (PDF)',
      description: 'Process individual PDF invoices from email',
      icon: FileText
    },
    {
      id: 'invoice-attachments',
      title: 'Invoice with Attachments (PDF + Files)',
      description: 'Handle invoices with additional file attachments',
      icon: Mail
    },
    {
      id: 'bulk-invoices',
      title: 'Bulk Invoices (CSV/Excel)',
      description: 'Process multiple invoices from spreadsheet files',
      icon: Database
    },
    {
      id: 'combined-invoices',
      title: 'Combined Invoices (Requires Splitting)',
      description: 'Split combined invoice files into individual items',
      icon: Globe
    }
  ];

  const lockedIntegrations = [
    {
      id: 'esker',
      title: 'Esker Integration',
      description: 'Connect with Esker for advanced invoice processing',
      icon: ExternalLink
    },
    {
      id: 'netsuite',
      title: 'NetSuite Integration',
      description: 'Sync data with your NetSuite ERP system',
      icon: Database
    },
    {
      id: 'sftp',
      title: 'SFTP Integration',
      description: 'Secure file transfer protocol for bulk processing',
      icon: Server
    }
  ];

  const handleEmailConnectorClick = (connectorId: string) => {
    setSelectedEmailConnector(connectorId);
  };

  const handleEmailConfigSave = (config: EmailConfig) => {
    if (selectedEmailConnector) {
      setEmailConfigs(prev => ({
        ...prev,
        [selectedEmailConnector]: config
      }));
    }
  };

  const handleContactSupport = () => {
    // This would typically open a contact form or redirect to support
    console.log('Contact support for premium integration');
  };

  const selectedConnectorTitle = emailConnectorTypes.find(c => c.id === selectedEmailConnector)?.title || '';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <Typography variant="h5" className="text-grey-900 mb-2">
          Integration Center
        </Typography>
        <Typography variant="body2" className="text-grey-600">
          Connect and configure your data sources and integrations.
        </Typography>
      </div>

      {/* Email Integration Section */}
      <div>
        <div className="mb-6">
          <Typography variant="h6" className="text-grey-900 mb-2">
            Email Integration
          </Typography>
          <Typography variant="body2" className="text-grey-600">
            Configure email connectors for automated invoice processing.
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emailConnectorTypes.map((connector, index) => (
            <EmailConnectorCard
              key={connector.id}
              title={connector.title}
              description={connector.description}
              icon={connector.icon}
              isConfigured={!!emailConfigs[connector.id]}
              onClick={() => handleEmailConnectorClick(connector.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Premium Integrations Section */}
      <div className="mt-16 pt-8 border-t border-grey-300">
        <div className="text-center mb-8">
          <Typography variant="h6" className="text-grey-900 mb-2">
            Premium Integrations
          </Typography>
          <Typography variant="body2" className="text-grey-600">
            Enterprise-grade integrations available with premium support.
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lockedIntegrations.map((integration, index) => (
            <LockedIntegrationCard
              key={integration.id}
              title={integration.title}
              description={integration.description}
              icon={integration.icon}
              onContactSupport={handleContactSupport}
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-8 pt-6 border-t border-grey-200 text-center">
          <Typography variant="body2" className="text-grey-600 mb-4">
            Interested in premium integrations?
          </Typography>
          <Button 
            className="bg-primary-main hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            onClick={handleContactSupport}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Email Configuration Dialog */}
      <EmailConfigDialog
        isOpen={!!selectedEmailConnector}
        onClose={() => setSelectedEmailConnector(null)}
        title={selectedConnectorTitle}
        onSave={handleEmailConfigSave}
        initialConfig={selectedEmailConnector ? emailConfigs[selectedEmailConnector] : undefined}
      />
    </div>
  );
}
