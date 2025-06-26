
import React, { useState } from 'react';
import { IntegrationHubHeader } from './IntegrationHubHeader';
import { EmailSetupCard } from './EmailSetupCard';
import { ConnectorsList } from './ConnectorsList';
import { OtherIntegrationsList } from './OtherIntegrationsList';
import { CreateIntegrationModal } from './CreateIntegrationModal';
import { ConnectorDetailsModal } from './ConnectorDetailsModal';
import { emailConnectors, otherIntegrations } from './constants';
import { EmailConnector } from './types';

export function IntegrationHub() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<EmailConnector | null>(null);
  const [connectors, setConnectors] = useState(emailConnectors);

  const handleCreateIntegration = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleViewConnector = (connector: EmailConnector) => {
    setSelectedConnector(connector);
  };

  const handleCloseConnectorDetails = () => {
    setSelectedConnector(null);
  };

  const handleStatusChange = (connectorId: number, newStatus: string) => {
    setConnectors(prev => 
      prev.map(connector => 
        connector.id === connectorId 
          ? { ...connector, status: newStatus as 'ACTIVE' | 'DRAFT' | 'INACTIVE' }
          : connector
      )
    );
  };

  return (
    <div className="space-y-6">
      <IntegrationHubHeader onCreateIntegration={handleCreateIntegration} />
      <EmailSetupCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ConnectorsList 
          connectors={connectors}
          onView={handleViewConnector}
          onStatusChange={handleStatusChange}
        />
        <OtherIntegrationsList integrations={otherIntegrations} />
      </div>
      <CreateIntegrationModal 
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
      />
      <ConnectorDetailsModal 
        connector={selectedConnector}
        onClose={handleCloseConnectorDetails}
      />
    </div>
  );
}
