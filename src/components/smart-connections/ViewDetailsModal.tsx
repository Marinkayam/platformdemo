
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const shouldShowTwoFABanner = agent.status === "Disconnected" && agent.type === "External";

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
          {/* Attention Banner for Disconnected Customer Agents */}
          {shouldShowTwoFABanner && (
            <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-2 rounded-md flex items-start gap-2 text-sm">
              <span className="text-orange-500 mt-0.5">⚠️</span>
              <div>
                <span className="font-bold">Two-Factor Authentication Required</span>
                <br />
                The portal requires 2FA to be configured for this account.{" "}
                <button 
                  onClick={handleConfigureSettings}
                  className="underline font-medium hover:text-orange-900"
                >
                  Configure settings
                </button>
              </div>
            </div>
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

          {/* Information for Monto User */}
          {agent.type === "Monto" && (
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
