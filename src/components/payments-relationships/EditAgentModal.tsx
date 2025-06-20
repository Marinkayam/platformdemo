
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from "@/components/ui/agent-user-type-badge";
import { toast } from "@/hooks/use-toast";
import { AccountTypeSection } from "./AccountTypeSection";
import { CredentialsSection } from "./CredentialsSection";
import { TwoFactorAuthSection } from "./TwoFactorAuthSection";

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

type AccountType = "Customer" | "Monto";

export function EditAgentModal({
  isOpen,
  onClose,
  onBack,
  agent,
  connectionInfo
}: EditAgentModalProps) {
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>(
    agent.type === "Monto" ? "Monto" : "Customer"
  );
  const [montoSetupConfirmed, setMontoSetupConfirmed] = useState(false);

  // Mock credentials for demo purposes
  const credentials = {
    username: agent.portalUser,
    password: "••••••••",
    twoFA: agent.status === "Disconnected" ? "Disabled" : "Enabled",
    twoFAMethod: "Google Authenticator",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`
  };

  const handleSaveChanges = () => {
    console.log("Saving changes for agent:", agent.id);
    console.log("Account type:", selectedAccountType);
    
    toast({
      title: "Validating Connection...",
      description: "We're validating your agent configuration. This may take a moment.",
    });
    
    onClose();
  };

  const handleAccountTypeSelect = (type: AccountType) => {
    setSelectedAccountType(type);
    // Reset Monto setup confirmation when switching away from Monto
    if (type !== "Monto") {
      setMontoSetupConfirmed(false);
    }
  };

  const handleMontoSetupConfirmedChange = (checked: boolean | "indeterminate") => {
    setMontoSetupConfirmed(checked === true);
  };

  // Only show credentials for Customer User
  const shouldShowCredentials = selectedAccountType === "Customer";
  const isSaveDisabled = selectedAccountType === "Monto" && !montoSetupConfirmed;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Edit Agent
            </DialogTitle>
            <StatusBadge status={agent.status} />
            <AgentUserTypeBadge type={agent.type === "Regular" ? "Regular" : "Monto"} />
          </div>
          
          <div className="text-sm text-gray-600 mt-6 text-left">
            {connectionInfo.receivable} → {connectionInfo.payable}
          </div>
          
          <Separator className="mt-6" />
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          {/* Attention Banner for Disconnected Agents - only show for Customer User */}
          {agent.status === "Disconnected" && selectedAccountType === "Customer" && (
            <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-2 rounded-md flex items-start gap-2 text-sm">
              <span className="text-orange-500 mt-0.5">⚠️</span>
              <div>
                <span className="font-bold">Two-Factor Authentication Required</span>
                <br />
                <span>The portal requires 2FA to be configured for this account.</span>
              </div>
            </div>
          )}

          {/* Account Type Section */}
          <AccountTypeSection
            selectedAccountType={selectedAccountType}
            onAccountTypeSelect={handleAccountTypeSelect}
            connectionInfo={connectionInfo}
            montoSetupConfirmed={montoSetupConfirmed}
            onMontoSetupConfirmedChange={handleMontoSetupConfirmedChange}
          />

          {/* Conditional Credentials Section */}
          {shouldShowCredentials && (
            <CredentialsSection credentials={credentials} />
          )}
          
          {/* Conditional Two-Factor Authentication Section */}
          {shouldShowCredentials && (
            <TwoFactorAuthSection credentials={credentials} />
          )}
        </div>
          
        {/* Action Footer */}
        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          <Button 
            onClick={handleSaveChanges} 
            disabled={isSaveDisabled}
            style={{ backgroundColor: isSaveDisabled ? '#9CA3AF' : '#7B59FF' }}
            className={`hover:opacity-90 ${isSaveDisabled ? 'cursor-not-allowed' : ''}`}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
