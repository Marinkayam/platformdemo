import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowLeft, Save } from "lucide-react";
import { InboxConfigurationCard } from './InboxConfigurationCard';
import { IntegrationConnector, ConnectorConfiguration, InboxConfiguration } from './types';

interface ConnectorConfigurationWizardProps {
  connector: IntegrationConnector;
  configuration: ConnectorConfiguration;
  onConfigurationUpdate: (config: ConnectorConfiguration) => void;
  onBack: () => void;
  onSave: () => void;
}

export function ConnectorConfigurationWizard({
  connector,
  configuration,
  onConfigurationUpdate,
  onBack,
  onSave
}: ConnectorConfigurationWizardProps) {
  const [nextInboxId, setNextInboxId] = useState(configuration.inboxes.length + 1);

  const createNewInbox = (): InboxConfiguration => ({
    id: `inbox-${nextInboxId}`,
    name: `Inbox ${nextInboxId}`,
    inboxType: 'single_invoice',
    toEmail: '',
    fromEmailDomain: true,
    fromEmailAddresses: [],
    emailSubject: '.*Invoice.*',
    replyToEmail: '',
    isActive: true
  });

  const addInbox = () => {
    const newInbox = createNewInbox();
    onConfigurationUpdate({
      ...configuration,
      inboxes: [...configuration.inboxes, newInbox]
    });
    setNextInboxId(nextInboxId + 1);
  };

  const updateInbox = (inboxId: string, updatedInbox: InboxConfiguration) => {
    onConfigurationUpdate({
      ...configuration,
      inboxes: configuration.inboxes.map(inbox => 
        inbox.id === inboxId ? updatedInbox : inbox
      )
    });
  };

  const deleteInbox = (inboxId: string) => {
    onConfigurationUpdate({
      ...configuration,
      inboxes: configuration.inboxes.filter(inbox => inbox.id !== inboxId)
    });
  };

  const handleSave = () => {
    onConfigurationUpdate({
      ...configuration,
      isConfigured: true
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <connector.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{connector.name} Configuration</h3>
              <p className="text-sm text-muted-foreground">{connector.description}</p>
            </div>
          </div>
        </div>
        <Badge variant="secondary">
          {configuration.inboxes.length} Inbox{configuration.inboxes.length !== 1 ? 'es' : ''}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Email Inbox Configurations</CardTitle>
            <Button variant="outline" size="sm" onClick={addInbox}>
              <Plus className="w-4 h-4 mr-2" />
              Add Inbox
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure multiple email inboxes for different types of documents or workflows
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {configuration.inboxes.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-muted-foreground">No inboxes configured yet</p>
              <Button variant="outline" onClick={addInbox}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Inbox
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {configuration.inboxes.map((inbox) => (
                <InboxConfigurationCard
                  key={inbox.id}
                  config={inbox}
                  onUpdate={(updatedInbox) => updateInbox(inbox.id, updatedInbox)}
                  onDelete={() => deleteInbox(inbox.id)}
                  canDelete={configuration.inboxes.length > 1}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={configuration.inboxes.length === 0}>
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}