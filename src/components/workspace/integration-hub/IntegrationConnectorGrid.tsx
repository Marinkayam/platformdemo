import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Headphones } from "lucide-react";
import { IntegrationConnector } from './types';

interface IntegrationConnectorGridProps {
  connectors: IntegrationConnector[];
  selectedConnectors: string[];
  onConnectorSelect: (connectorId: string) => void;
  onConnectorConfigure: (connectorId: string) => void;
  onEnterpriseContact: (connectorId: string) => void;
}

export function IntegrationConnectorGrid({ 
  connectors, 
  selectedConnectors, 
  onConnectorSelect, 
  onConnectorConfigure,
  onEnterpriseContact 
}: IntegrationConnectorGridProps) {
  const handleConnectorAction = (connector: IntegrationConnector) => {
    if (connector.status === 'enterprise') {
      onEnterpriseContact(connector.id);
    } else if (selectedConnectors.includes(connector.id)) {
      onConnectorConfigure(connector.id);
    } else {
      onConnectorSelect(connector.id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="secondary" className="text-xs">Available</Badge>;
      case 'enterprise':
        return <Badge variant="outline" className="text-xs">Enterprise</Badge>;
      case 'coming_soon':
        return <Badge variant="outline" className="text-xs animate-pulse">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (connector: IntegrationConnector) => {
    if (connector.status === 'coming_soon') {
      return (
        <Button variant="outline" size="sm" disabled className="w-full">
          Coming Soon
        </Button>
      );
    }

    if (connector.status === 'enterprise') {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => handleConnectorAction(connector)}
        >
          <Headphones className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      );
    }

    if (selectedConnectors.includes(connector.id)) {
      return (
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          onClick={() => handleConnectorAction(connector)}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Configure
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => handleConnectorAction(connector)}
      >
        Select
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Choose Your Integrations</h3>
        <p className="text-sm text-muted-foreground">Select one or more integration types to connect your data sources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectors.map((connector) => (
          <Card 
            key={connector.id} 
            className={`relative transition-all hover:shadow-md ${
              selectedConnectors.includes(connector.id) 
                ? 'ring-2 ring-primary border-primary' 
                : 'border-border'
            }`}
          >
            {selectedConnectors.includes(connector.id) && (
              <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <connector.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{connector.name}</h4>
                    <p className="text-xs text-muted-foreground">{connector.category}</p>
                  </div>
                </div>
                {getStatusBadge(connector.status)}
              </div>
              
              <p className="text-xs text-muted-foreground">{connector.description}</p>
              
              {getActionButton(connector)}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedConnectors.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {selectedConnectors.length} integration{selectedConnectors.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}