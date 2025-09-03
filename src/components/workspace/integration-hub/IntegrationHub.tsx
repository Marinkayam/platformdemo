
import { useState } from 'react';
import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button";
import { EmailConnectorCard } from './EmailConnectorCard';
import { LockedIntegrationCard } from './LockedIntegrationCard';
import { EmailConfigDialog, EmailConfig } from './EmailConfigDialog';
import { Mail, FileText, Database, Globe, ExternalLink, Server } from 'lucide-react';
import eskerLogo from '@/assets/esker-logo.svg';
import netsuiteLogo from '@/assets/netsuite-logo.svg';

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
      icon: ExternalLink,
      logo: eskerLogo
    },
    {
      id: 'netsuite',
      title: 'NetSuite Integration',
      description: 'Sync data with your NetSuite ERP system',
      icon: Database,
      logo: netsuiteLogo
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

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <Typography variant="body2" className="text-amber-800">
          ⚠️ <strong>Heads up:</strong> If an invoice doesn't follow the configurations below, it will be declined and Monto won't process it.
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
        
        <div className="space-y-3">
          {emailConnectorTypes.map((connector, index) => {
            const isConfigured = !!emailConfigs[connector.id];
            const config = emailConfigs[connector.id];
            
            return (
              <div key={connector.id} className="flex items-center justify-between bg-white border border-grey-200 rounded-lg p-4 hover:border-grey-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#EFEBFF] flex items-center justify-center">
                    <connector.icon size={16} className="text-[#7B59FF]" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="subtitle2" className="text-grey-900">
                      {connector.title}
                    </Typography>
                    <Typography variant="body2" className="text-grey-600 text-sm">
                      {connector.description}
                    </Typography>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmailConnectorClick(connector.id)}
                  className={`text-sm transition-all duration-200 ${
                    isConfigured 
                      ? "border-[#7B59FF]/30 text-[#7B59FF] hover:bg-[#7B59FF]/5" 
                      : "border-grey-300 text-grey-600 hover:bg-grey-50"
                  }`}
                >
                  {isConfigured ? 'Edit' : 'Configure'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Integrations Section */}
      <div className="mt-16 pt-8 border-t border-grey-300">
        <div className="text-center mb-8">
          <Typography variant="h6" className="text-grey-900 mb-2">
            Locked Feature
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
              logo={integration.logo}
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
