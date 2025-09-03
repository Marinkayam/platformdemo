import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  replyToEmails: string[];
}

const defaultConfig: EmailConfig = {
  toEmail: 'montopay@montoinvoice.com',
  domain: 'montopay.com',
  fromAddresses: [],
  emailSubject: 'Invoice #',
  replyToEmails: ['sys-admin@client-domain.com']
};

export function EmailConfigDialog({ isOpen, onClose, title, onSave, initialConfig }: EmailConfigDialogProps) {
  const [config, setConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [originalConfig, setOriginalConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [newFromAddress, setNewFromAddress] = useState('');
  const [newReplyToEmail, setNewReplyToEmail] = useState('');
  const [senderMode, setSenderMode] = useState<'domain' | 'specific'>('domain');
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Validation for required fields
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDomain = (domain: string) => !domain.startsWith('@') && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  
  const isFormValid = config.toEmail && 
                     config.emailSubject && 
                     config.replyToEmails.length > 0 &&
                     isValidEmail(config.toEmail) &&
                     ((senderMode === 'domain' && config.domain && isValidDomain(config.domain)) ||
                      (senderMode === 'specific' && config.fromAddresses.length > 0 && config.fromAddresses.every(email => isValidEmail(email)))) &&
                     config.replyToEmails.every(email => isValidEmail(email));

  // Reset form when dialog opens/closes or initialConfig changes
  useEffect(() => {
    if (isOpen) {
      const configToUse = initialConfig || defaultConfig;
      setConfig(configToUse);
      setOriginalConfig(configToUse);
      setNewFromAddress('');
      setNewReplyToEmail('');
      setSenderMode(configToUse.fromAddresses.length > 0 ? 'specific' : 'domain');
      setHasChanges(false);
    }
  }, [isOpen, initialConfig]);

  // Check for changes whenever config updates
  useEffect(() => {
    const configChanged = JSON.stringify(config) !== JSON.stringify(originalConfig);
    setHasChanges(configChanged);
  }, [config, originalConfig]);

  const handleAddFromAddress = () => {
    if (newFromAddress.trim() && isValidEmail(newFromAddress.trim()) && !config.fromAddresses.includes(newFromAddress.trim())) {
      setConfig(prev => ({
        ...prev,
        fromAddresses: [...prev.fromAddresses, newFromAddress.trim()]
      }));
      setNewFromAddress('');
    }
  };

  const handleRemoveFromAddress = (address: string) => {
    setConfig(prev => ({
      ...prev,
      fromAddresses: prev.fromAddresses.filter(addr => addr !== address)
    }));
  };

  const handleAddReplyToEmail = () => {
    if (newReplyToEmail.trim() && isValidEmail(newReplyToEmail.trim()) && !config.replyToEmails.includes(newReplyToEmail.trim())) {
      setConfig(prev => ({
        ...prev,
        replyToEmails: [...prev.replyToEmails, newReplyToEmail.trim()]
      }));
      setNewReplyToEmail('');
    }
  };

  const handleRemoveReplyToEmail = (email: string) => {
    if (config.replyToEmails.length > 1) {
      setConfig(prev => ({
        ...prev,
        replyToEmails: prev.replyToEmails.filter(addr => addr !== email)
      }));
    }
  };

  const handleSenderModeChange = (mode: 'domain' | 'specific') => {
    setSenderMode(mode);
    if (mode === 'domain') {
      setConfig(prev => ({ ...prev, fromAddresses: [] }));
    } else {
      setConfig(prev => ({ ...prev, domain: '' }));
    }
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
    setNewFromAddress('');
    setNewReplyToEmail('');
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
        
        <div className="space-y-6">
          {/* To Email Address */}
          <div className="space-y-2">
            <Label htmlFor="toEmail" className="text-sm font-medium text-foreground">
              To Email Address *
            </Label>
            <Input
              id="toEmail"
              value={config.toEmail}
              readOnly
              placeholder="montopay@montoinvoice.com"
              className="bg-muted/50 cursor-not-allowed"
            />
            <Typography variant="body2" className="text-muted-foreground text-xs">
              This is your dedicated email address for invoice processing.
            </Typography>
          </div>

          {/* Allowed Senders */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Allowed Senders
            </Label>
            
            <RadioGroup 
              value={senderMode} 
              onValueChange={(value: 'domain' | 'specific') => handleSenderModeChange(value)}
              className="space-y-4"
            >
              {/* Domain option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="domain" id="domain" />
                  <Label htmlFor="domain" className="text-sm font-medium cursor-pointer">
                    Allow all from domain: {config.domain || 'montopay.com'}
                  </Label>
                </div>
                
                {senderMode === 'domain' && (
                  <Input
                    value={config.domain}
                    onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                    placeholder="e.g. montopay.com"
                    className={`ml-6 focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                      config.domain && !isValidDomain(config.domain) ? 'border-destructive' : ''
                    }`}
                  />
                )}
              </div>

              {/* Specific addresses option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific" className="text-sm font-medium cursor-pointer">
                    Allow only specific email addresses
                  </Label>
                </div>
                
                {senderMode === 'specific' && (
                  <div className="ml-6 space-y-3">
                    <Input
                      value={newFromAddress}
                      onChange={(e) => setNewFromAddress(e.target.value)}
                      placeholder="e.g. billing@montopay.com, invoices@montopay.com"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFromAddress()}
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
                              onClick={() => handleRemoveFromAddress(address)}
                              className="ml-1 hover:text-destructive transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </RadioGroup>
            
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Only emails from the allowed sender(s) will be processed.
            </Typography>
          </div>

          {/* Email Subject Pattern */}
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
                      <p>Monto looks at the subject line to detect invoice emails.</p>
                      <p>Use a pattern that matches your actual subject lines.</p>
                      <div className="mt-1">
                        <p><strong>Examples:</strong></p>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>Invoice → Matches any subject containing "Invoice"</li>
                          <li>^Invoice → Matches subjects starting with "Invoice"</li>
                        </ul>
                      </div>
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

          {/* Reply-To Email Addresses */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Reply-To Email Addresses *
            </Label>
            <div className="space-y-3">
              <Input
                value={newReplyToEmail}
                onChange={(e) => setNewReplyToEmail(e.target.value)}
                placeholder="e.g. sysadmin@yourdomain.com"
                onKeyPress={(e) => e.key === 'Enter' && handleAddReplyToEmail()}
                className="focus:border-[#7B59FF] focus:ring-[#7B59FF]"
              />
              
              {config.replyToEmails.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {config.replyToEmails.map((email, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1 bg-[#EFEBFF] text-[#7B59FF] border-[#7B59FF]/20"
                    >
                      {email}
                      {config.replyToEmails.length > 1 && (
                        <button
                          onClick={() => handleRemoveReplyToEmail(email)}
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <Typography variant="body2" className="text-muted-foreground text-xs">
              Monto will send status updates to these addresses.
            </Typography>
            {config.replyToEmails.length === 0 && (
              <Typography variant="body2" className="text-destructive text-xs">
                At least one reply-to email is required
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
              title={!hasChanges ? "No changes to save" : !isFormValid ? "Please fill in all required fields to save" : ""}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}