import React, { useState } from 'react';
import { IntegrationHubHeader } from './IntegrationHubHeader';
import { IntegrationConnectorGrid } from './IntegrationConnectorGrid';
import { ConnectorConfigurationWizard } from './ConnectorConfigurationWizard';
import { SupportContactModal } from './SupportContactModal';
import { integrationConnectors } from './constants';
import { IntegrationConnector, ConnectorConfiguration, InboxConfiguration } from './types';

type ViewMode = 'selection' | 'configuration';

export function IntegrationHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('selection');
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [configurations, setConfigurations] = useState<Record<string, ConnectorConfiguration>>({});
  const [currentConnectorId, setCurrentConnectorId] = useState<string>('');
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportConnector, setSupportConnector] = useState<IntegrationConnector | null>(null);

  const handleConnectorSelect = (connectorId: string) => {
    if (!selectedConnectors.includes(connectorId)) {
      setSelectedConnectors([...selectedConnectors, connectorId]);
      
      // Initialize configuration if it doesn't exist
      if (!configurations[connectorId]) {
        const initialInbox: InboxConfiguration = {
          id: 'inbox-1',
          name: 'Main Inbox',
          inboxType: 'single_invoice',
          toEmail: '',
          fromEmailDomain: true,
          fromEmailAddresses: [],
          emailSubject: '.*Invoice.*',
          replyToEmail: '',
          isActive: true
        };

        setConfigurations(prev => ({
          ...prev,
          [connectorId]: {
            connectorId,
            inboxes: [initialInbox],
            isConfigured: false
          }
        }));
      }
    }
  };

  const handleConnectorConfigure = (connectorId: string) => {
    setCurrentConnectorId(connectorId);
    setViewMode('configuration');
  };

  const handleEnterpriseContact = (connectorId: string) => {
    const connector = integrationConnectors.find(c => c.id === connectorId);
    setSupportConnector(connector || null);
    setSupportModalOpen(true);
  };

  const handleConfigurationUpdate = (config: ConnectorConfiguration) => {
    setConfigurations(prev => ({
      ...prev,
      [config.connectorId]: config
    }));
  };

  const handleBackToSelection = () => {
    setViewMode('selection');
    setCurrentConnectorId('');
  };

  const handleSaveConfiguration = () => {
    setViewMode('selection');
    setCurrentConnectorId('');
  };

  const currentConnector = currentConnectorId 
    ? integrationConnectors.find(c => c.id === currentConnectorId)
    : null;

  const currentConfiguration = currentConnectorId 
    ? configurations[currentConnectorId]
    : null;

  return (
    <div className="space-y-6">
      <IntegrationHubHeader />
      
      {viewMode === 'selection' ? (
        <IntegrationConnectorGrid
          connectors={integrationConnectors}
          selectedConnectors={selectedConnectors}
          onConnectorSelect={handleConnectorSelect}
          onConnectorConfigure={handleConnectorConfigure}
          onEnterpriseContact={handleEnterpriseContact}
        />
      ) : (
        currentConnector && currentConfiguration && (
          <ConnectorConfigurationWizard
            connector={currentConnector}
            configuration={currentConfiguration}
            onConfigurationUpdate={handleConfigurationUpdate}
            onBack={handleBackToSelection}
            onSave={handleSaveConfiguration}
          />
        )
      )}

      <SupportContactModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        connector={supportConnector}
      />
    </div>
  );
}