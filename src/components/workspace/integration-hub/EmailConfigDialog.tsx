import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Info } from "lucide-react";

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

  // Validation for required fields
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDomain = (domain: string) => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  
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
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Processing Email Address */}
          <div className="space-y-2">
            <Label htmlFor="toEmail" className="text-sm font-medium text-foreground">
              Processing Email Address *
            </Label>
            <Input
              id="toEmail"
              value={config.toEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, toEmail: e.target.value }))}
              placeholder="e.g. montopay@montoinvoice.com"
              className={`focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                config.toEmail && !isValidEmail(config.toEmail) ? 'border-destructive' : ''
              }`}
            />
            <Typography variant="body2" className="text-muted-foreground text-xs leading-relaxed">
              Invoices will be sent to this address for automatic processing.
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
            <Typography variant="body2" className="text-muted-foreground text-xs leading-relaxed">
              Only emails from this domain will be processed. Use the base domain (e.g., for billing@montopay.com, enter montopay.com).
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
              <Typography variant="body2" className="text-muted-foreground text-xs leading-relaxed">
                Restrict processing to specific email addresses. Leave blank to allow any sender from the domain above.
              </Typography>
            </div>
          </div>

          {/* Email Subject Match Pattern */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="emailSubject" className="text-sm font-medium text-foreground">
                Email Subject Match Pattern *
              </Label>
              <div className="group relative">
                <Info size={14} className="text-muted-foreground cursor-help" />
                <div className="absolute bottom-6 left-0 hidden group-hover:block bg-popover border border-border rounded-md p-3 shadow-md z-50 w-64">
                  <Typography variant="body2" className="text-xs">
                    <strong>Pattern Examples:</strong><br/>
                    *Invoice* - matches "Invoice #123"<br/>
                    Invoice* - matches "Invoice" at start<br/>
                    *bill* - matches anything with "bill"
                  </Typography>
                </div>
              </div>
            </div>
            <Input
              id="emailSubject"
              value={config.emailSubject}
              onChange={(e) => setConfig(prev => ({ ...prev, emailSubject: e.target.value }))}
              placeholder="e.g. *Invoice*"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF] font-mono"
            />
            <Typography variant="body2" className="text-muted-foreground text-xs leading-relaxed">
              Use * as a wildcard to match invoice subjects (e.g., *Invoice* matches "Invoice #123"). Regex syntax is supported.
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
              placeholder="e.g. sys-admin@yourdomain.com"
              className={`focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                config.replyToEmail && !isValidEmail(config.replyToEmail) ? 'border-destructive' : ''
              }`}
            />
            <Typography variant="body2" className="text-muted-foreground text-xs leading-relaxed">
              We'll use this address to send replies or processing status notifications.
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