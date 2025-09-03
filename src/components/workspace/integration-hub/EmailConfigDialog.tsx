import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { Checkbox } from "@/components/ui/checkbox";
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
  replyToEmails: []
};

export function EmailConfigDialog({ isOpen, onClose, title, onSave, initialConfig }: EmailConfigDialogProps) {
  const [config, setConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [originalConfig, setOriginalConfig] = useState<EmailConfig>(initialConfig || defaultConfig);
  const [newFromAddress, setNewFromAddress] = useState('');
  const [newReplyToEmail, setNewReplyToEmail] = useState('');
  const [useDomainFilter, setUseDomainFilter] = useState(true);
  const [useSpecificAddresses, setUseSpecificAddresses] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Validation for required fields
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDomain = (domain: string) => !domain.startsWith('@') && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  
  // At least one sender method must be configured (domain OR specific addresses)
  const hasSenderMethod = (useDomainFilter && config.domain && isValidDomain(config.domain)) || 
                         (useSpecificAddresses && config.fromAddresses.length > 0 && config.fromAddresses.every(email => isValidEmail(email)));

  const isFormValid = config.toEmail && 
                     config.emailSubject && 
                     config.replyToEmails.length > 0 &&
                     isValidEmail(config.toEmail) &&
                     hasSenderMethod &&
                     config.replyToEmails.every(email => isValidEmail(email));

  // Reset form when dialog opens/closes or initialConfig changes
  useEffect(() => {
    if (isOpen) {
      const configToUse = initialConfig || defaultConfig;
      setConfig(configToUse);
      setOriginalConfig(configToUse);
      setNewFromAddress('');
      setNewReplyToEmail('');
      setUseDomainFilter(!!configToUse.domain);
      setUseSpecificAddresses(configToUse.fromAddresses.length > 0);
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

  const handleDomainFilterChange = (checked: boolean) => {
    setUseDomainFilter(checked);
    if (!checked) {
      setConfig(prev => ({ ...prev, domain: '' }));
    }
  };

  const handleSpecificAddressesChange = (checked: boolean) => {
    setUseSpecificAddresses(checked);
    if (!checked) {
      setConfig(prev => ({ ...prev, fromAddresses: [] }));
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

  const handleReset = () => {
    setConfig(defaultConfig);
    setNewFromAddress('');
    setNewReplyToEmail('');
    setUseDomainFilter(true);
    setUseSpecificAddresses(false);
    setHasChanges(true);
    toast({
      title: "Configuration reset",
      description: "All fields have been reset to default values",
    });
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
            <div className="flex items-center gap-2">
              <Label htmlFor="toEmail" className="text-sm font-medium text-foreground">
                To Email Address *
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-[#291E55] text-white border-[#291E55]">
                    <div className="text-xs space-y-1">
                      <p className="font-medium">To Email Address</p>
                      <p>This is your unique Monto inbox address.</p>
                      <p>Send all invoice emails here for automatic processing.</p>
                      <p>You cannot change this address.</p>
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
              This is your dedicated email address for invoice processing.
            </Typography>
          </div>

          {/* Allowed Senders */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Allowed Senders
            </Label>
            
            {/* Domain option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="domainFilter"
                  checked={useDomainFilter}
                  onCheckedChange={handleDomainFilterChange}
                />
                <Label htmlFor="domainFilter" className="text-sm font-medium cursor-pointer">
                  Allow emails from domain
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-[#291E55] text-white border-[#291E55]">
                      <div className="text-xs space-y-1">
                        <p className="font-medium">Allow Emails from Domain</p>
                        <p>Monto will process emails sent from any address under this domain.</p>
                        <p>For example, if you enter montopay.com, it will accept emails from billing@montopay.com, admin@montopay.com, etc.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {useDomainFilter && (
                <Input
                  value={config.domain}
                  onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="e.g. montopay.com"
                  className={`focus:border-[#7B59FF] focus:ring-[#7B59FF] ${
                    config.domain && !isValidDomain(config.domain) ? 'border-destructive' : ''
                  }`}
                />
              )}
            </div>

            {/* Specific addresses option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="specificAddresses"
                  checked={useSpecificAddresses}
                  onCheckedChange={handleSpecificAddressesChange}
                />
                <Label htmlFor="specificAddresses" className="text-sm font-medium cursor-pointer">
                  Allow specific email addresses
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-[#291E55] text-white border-[#291E55]">
                      <div className="text-xs space-y-1">
                        <p className="font-medium">Allow Specific Email Addresses</p>
                        <p>Only emails sent from these specific addresses will be processed.</p>
                        <p>Use this to restrict access to trusted senders (e.g. invoices@vendor.com).</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {useSpecificAddresses && (
                <div className="space-y-3">
                  <Input
                    value={newFromAddress}
                    onChange={(e) => setNewFromAddress(e.target.value)}
                    placeholder="e.g. billing@montopay.com"
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

            <Typography variant="body2" className="text-muted-foreground text-xs">
              You can allow senders by domain, specific email addresses, or both.
            </Typography>
            
            {!hasSenderMethod && (useDomainFilter || useSpecificAddresses) && (
              <Typography variant="body2" className="text-destructive text-xs">
                At least one sender domain or email address is required.
              </Typography>
            )}
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
                  <TooltipContent side="top" className="max-w-xs bg-[#291E55] text-white border-[#291E55]">
                    <div className="text-xs space-y-1">
                      <p className="font-medium">Email Subject Pattern</p>
                      <p>Monto uses this to detect which emails are invoices.</p>
                      <p>Add a regex pattern that matches your subject format.</p>
                      <div className="mt-1">
                        <p><strong>Examples:</strong></p>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>Invoice → matches any subject containing "Invoice"</li>
                          <li>^Invoice → matches subjects that start with "Invoice"</li>
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
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">
                Reply-To Email Addresses *
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-[#291E55] text-white border-[#291E55]">
                    <div className="text-xs space-y-1">
                      <p className="font-medium">Reply-To Email</p>
                      <p>Monto sends status updates and notifications to these addresses.</p>
                      <p>You must include at least one valid email.</p>
                      <p>You can add multiple recipients.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
          <div className="flex justify-between pt-4 border-t">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Configuration</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reset all fields to their default values? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleReset}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
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