import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { X, Info } from "lucide-react";

interface EmailConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSave: (config: EmailConfig) => void;
  initialConfig?: EmailConfig;
}

export interface EmailConfig {
  toEmail: string;
  domain: string;
  fromAddresses: string[];
  emailSubject: string;
  replyToEmail: string;
}

const defaultConfig: EmailConfig = {
  toEmail: 'montopay@montoinvoice.com',
  domain: 'montopay.com',
  fromAddresses: [],
  emailSubject: '*Invoice.*',
  replyToEmail: 'sys-admin@client-domain.com'
};

export function EmailConfigDialog({ isOpen, onClose, title, onSave, initialConfig }: EmailConfigDialogProps) {
  const [config, setConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [originalConfig, setOriginalConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [newAddress, setNewAddress] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Validation for required fields
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDomain = (domain: string) => !domain.startsWith('@') && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  
  const isFormValid = config.toEmail && 
                     config.domain && 
                     config.emailSubject && 
                     config.replyToEmail &&
                     isValidEmail(config.toEmail) &&
                     isValidDomain(config.domain) &&
                     isValidEmail(config.replyToEmail);

  // Reset form when dialog opens/closes or initialConfig changes
  useEffect(() => {
    if (isOpen) {
      const configToUse = initialConfig || defaultConfig;
      setConfig(configToUse);
      setOriginalConfig(configToUse);
      setNewAddress('');
      setHasChanges(false);
    }
  }, [isOpen, initialConfig]);

  // Check for changes whenever config updates
  useEffect(() => {
    const configChanged = JSON.stringify(config) !== JSON.stringify(originalConfig);
    setHasChanges(configChanged);
  }, [config, originalConfig]);

  const handleAddAddress = () => {
    if (newAddress.trim() && !config.fromAddresses.includes(newAddress.trim())) {
      setConfig(prev => ({
        ...prev,
        fromAddresses: [...prev.fromAddresses, newAddress.trim()]
      }));
      setNewAddress('');
    }
  };

  const handleRemoveAddress = (address: string) => {
    setConfig(prev => ({
      ...prev,
      fromAddresses: prev.fromAddresses.filter(addr => addr !== address)
    }));
  };

  const handleSave = () => {
    onSave(config);
    toast({
      title: "Configuration saved successfully",
      description: `You can now send test invoices to ${config.toEmail}`,
    });
    onClose();
  };

  const handleCancel = () => {
    setConfig(originalConfig);
    setNewAddress('');
    setHasChanges(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {title} Configuration
          </DialogTitle>
          <Typography variant="body2" className="text-muted-foreground text-sm mt-2">
            Set the rules for how Monto should detect and process incoming invoice emails.
          </Typography>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Processing Email Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="toEmail" className="text-sm font-medium text-foreground">
                Processing Email Address *
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="text-xs">
                      <p>Monto will send notifications and replies to this address.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="toEmail"
              value={config.toEmail}
              readOnly
              placeholder="montopay@montoinvoice.com"
              className="bg-muted/50 cursor-not-allowed"
            />
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Invoices should be sent to this email for automatic processing.
            </Typography>
            {config.toEmail && !isValidEmail(config.toEmail) && (
              <Typography variant="body2" className="text-destructive text-xs">
                Please enter a valid email address
              </Typography>
            )}
          </div>

          {/* Allowed Sender Domain */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-sm font-medium text-foreground">
              Allowed Sender Domain *
            </Label>
            <Input
              id="domain"
              value={config.domain}
              onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
              placeholder="e.g. montopay.com"
              className={`focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                config.domain && !isValidDomain(config.domain) ? 'border-destructive' : ''
              }`}
            />
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Only emails from this domain will be accepted for processing.
            </Typography>
            {config.domain && !isValidDomain(config.domain) && (
              <Typography variant="body2" className="text-destructive text-xs">
                Please enter a valid domain (e.g., montopay.com)
              </Typography>
            )}
          </div>

          {/* Allowed Sender Emails */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Allowed Sender Emails (Optional)
            </Label>
            <div className="space-y-3">
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="e.g. billing@montopay.com"
                onKeyPress={(e) => e.key === 'Enter' && handleAddAddress()}
                className="focus:border-[#7B59FF] focus:ring-[#7B59FF]"
              />
              
              {config.fromAddresses.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {config.fromAddresses.map((address, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1 bg-[#EFEBFF] text-[#7B59FF] border-[#7B59FF]/20"
                    >
                      {address}
                      <button
                        onClick={() => handleRemoveAddress(address)}
                        className="ml-1 hover:text-destructive transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <Typography variant="body2" className="text-muted-foreground text-xs">
                Only process emails from these addresses. Leave blank to allow all emails from the domain above.
              </Typography>
            </div>
          </div>

          {/* Email Subject Match Pattern */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="emailSubject" className="text-sm font-medium text-foreground">
                Email Subject Pattern *
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="text-xs space-y-1">
                      <p><strong>Monto uses the subject line to detect invoice emails.</strong></p>
                      <p>Make sure your system sends subjects like:</p>
                      <ul className="list-disc list-inside space-y-0.5 mt-1">
                        <li>Invoice #123</li>
                        <li>Invoice for PO 99821</li>
                      </ul>
                      <p className="mt-1">Then, use a regex pattern that matches them.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="emailSubject"
              value={config.emailSubject}
              onChange={(e) => setConfig(prev => ({ ...prev, emailSubject: e.target.value }))}
              placeholder="Invoice #"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF] font-mono"
            />
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Include "Invoice" in the subject so Monto knows to process it.
            </Typography>
          </div>

          {/* Reply-To Email */}
          <div className="space-y-2">
            <Label htmlFor="replyToEmail" className="text-sm font-medium text-foreground">
              Reply-To Email *
            </Label>
            <Input
              id="replyToEmail"
              value={config.replyToEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, replyToEmail: e.target.value }))}
              placeholder="e.g. sysadmin@yourcompany.com"
              className={`focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                config.replyToEmail && !isValidEmail(config.replyToEmail) ? 'border-destructive' : ''
              }`}
            />
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Monto will send notifications and replies to this address.
            </Typography>
            {config.replyToEmail && !isValidEmail(config.replyToEmail) && (
              <Typography variant="body2" className="text-destructive text-xs">
                Please enter a valid email address
              </Typography>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges || !isFormValid}
              className={`${hasChanges && isFormValid
                ? 'bg-[#7B59FF] hover:bg-[#6b46ff] text-white' 
                : 'bg-[#EFEBFF] text-[#7B59FF]/60 cursor-not-allowed border border-[#7B59FF]/20'
              }`}
              title={!hasChanges ? "No changes to save" : !isFormValid ? "Please complete required fields to save configuration" : ""}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}