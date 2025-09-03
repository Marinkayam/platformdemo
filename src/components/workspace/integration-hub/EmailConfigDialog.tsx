import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

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
        
        <div className="space-y-6">
          {/* To Email */}
          <div className="space-y-3">
            <Label htmlFor="toEmail" className="text-sm font-medium">
              "To" Email Address
            </Label>
            <Input
              id="toEmail"
              value={config.toEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, toEmail: e.target.value }))}
              placeholder="montopay@montoinvoice.com"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF]"
            />
            <Typography variant="body2" className="text-grey-500 text-xs">
              Email address where invoices will be sent for processing
            </Typography>
          </div>

          {/* From Email Domain */}
          <div className="space-y-3">
            <Label htmlFor="domain" className="text-sm font-medium">
              From Email Domain
            </Label>
            <Input
              id="domain"
              value={config.domain}
              onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
              placeholder="company.com"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF]"
            />
            <Typography variant="body2" className="text-grey-500 text-xs">
              Domain that emails will come from (e.g., if invoices come from billing@company.com, enter company.com)
            </Typography>
          </div>

          {/* From Addresses */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Specific From Email Addresses (Optional)
            </Label>
            <div className="space-y-3">
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="billing@company.com"
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
              <Typography variant="body2" className="text-grey-500 text-xs">
                Add specific email addresses that will send invoices. Leave empty to accept from any address in the domain.
              </Typography>
            </div>
          </div>

          {/* Email Subject */}
          <div className="space-y-3">
            <Label htmlFor="emailSubject" className="text-sm font-medium">
              Email Subject Filter (Regex)
            </Label>
            <Input
              id="emailSubject"
              value={config.emailSubject}
              onChange={(e) => setConfig(prev => ({ ...prev, emailSubject: e.target.value }))}
              placeholder="*Invoice*"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF] font-mono"
            />
            <Typography variant="body2" className="text-grey-500 text-xs">
              Pattern to match in email subject line. Use * for wildcard (e.g., *Invoice* matches any subject containing "Invoice")
            </Typography>
          </div>

          {/* Reply To */}
          <div className="space-y-3">
            <Label htmlFor="replyToEmail" className="text-sm font-medium">
              Reply-To Email Address
            </Label>
            <Input
              id="replyToEmail"
              value={config.replyToEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, replyToEmail: e.target.value }))}
              placeholder="support@company.com"
              className="focus:border-[#7B59FF] focus:ring-[#7B59FF]"
            />
            <Typography variant="body2" className="text-grey-500 text-xs">
              Email address for replies and notifications about processing status
            </Typography>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges}
              className={`${hasChanges 
                ? 'bg-[#7B59FF] hover:bg-[#6b46ff] text-white' 
                : 'bg-[#EFEBFF] text-[#7B59FF]/60 cursor-not-allowed border border-[#7B59FF]/20'
              }`}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}