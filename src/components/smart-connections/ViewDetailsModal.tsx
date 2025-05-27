
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Agent } from "@/types/smartConnection";
import { EditAgentModal } from "./EditAgentModal";
import { ViewDetailsHeader } from "./ViewDetailsHeader";
import { ViewDetailsCredentials } from "./ViewDetailsCredentials";
import { ViewDetailsTwoFactor } from "./ViewDetailsTwoFactor";
import { ViewDetailsMontoInfo } from "./ViewDetailsMontoInfo";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

export function ViewDetailsModal({
  isOpen,
  onClose,
  agent,
  connectionInfo
}: ViewDetailsModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock credentials for demo purposes
  const credentials = {
    username: agent.portalUser,
    password: "••••••••",
    twoFA: agent.status === "Disconnected" ? "Disabled" : "Enabled",
    twoFAMethod: "Google Authenticator",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleConfigureSettings = () => {
    setIsEditMode(true);
  };

  const handleBackToView = () => {
    setIsEditMode(false);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
    onClose();
  };

  // Only show credentials for Customer User types
  const shouldShowCredentials = agent.type === "External";
  
  // Only show account type details for Monto users
  const shouldShowAccountTypeDetails = agent.type === "Monto";

  // Get specific issue banner based on agent type and status
  const getAgentIssueBanner = () => {
    if (agent.status === "Disconnected") {
      if (agent.type === "External") {
        return {
          title: "Two-Factor Authentication Required",
          message: "The portal requires 2FA to be configured for this account.",
          actionText: "Configure Settings"
        };
      } else if (agent.type === "Monto") {
        return {
          title: "Agent Authentication Failed",
          message: "Unable to connect with current credentials.",
          actionText: "Update Credentials"
        };
      }
    } else if (agent.status === "Error") {
      return {
        title: "Connection Error",
        message: "Agent encountered an error during operation.",
        actionText: "Review Settings"
      };
    }
    return null;
  };

  const issueBanner = getAgentIssueBanner();

  if (isEditMode) {
    return (
      <EditAgentModal
        isOpen={isOpen}
        onClose={handleCloseEdit}
        onBack={handleBackToView}
        agent={agent}
        connectionInfo={connectionInfo}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <ViewDetailsHeader agent={agent} connectionInfo={connectionInfo} />
        
        <div className="space-y-4 mt-6">
          {/* Agent-Specific Issue Banner */}
          {issueBanner && (
            <Alert className="bg-orange-50 border-orange-200 text-orange-800">
              <span className="text-orange-500">⚠️</span>
              <AlertDescription className="ml-2">
                <span className="font-bold">{issueBanner.title}:</span>{" "}
                {issueBanner.message}
                <Button 
                  variant="link" 
                  className="p-0 ml-2 text-orange-600 underline font-medium h-auto"
                  onClick={handleConfigureSettings}
                >
                  {issueBanner.actionText}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Credentials Section - only for Customer User */}
          {shouldShowCredentials && (
            <ViewDetailsCredentials credentials={credentials} />
          )}
          
          {/* Two-Factor Authentication Section - only for Customer User */}
          {shouldShowCredentials && (
            <ViewDetailsTwoFactor 
              credentials={credentials} 
              onConfigureSettings={handleConfigureSettings}
            />
          )}

          {/* Account Type Information for Monto User */}
          {shouldShowAccountTypeDetails && (
            <ViewDetailsMontoInfo />
          )}
        </div>
          
        {/* Footer with Edit Agent button */}
        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleEdit} 
            className="bg-[#7B59FF] text-white"
          >
            Edit Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
