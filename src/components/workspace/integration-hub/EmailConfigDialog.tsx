import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
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

export function EmailConfigDialog({ isOpen, onClose, title, onSave, initialConfig }: EmailConfigDialogProps) {
  const [config, setConfig] = useState<EmailConfig>(initialConfig || {
    toEmail: 'montopay@montoinvoice.com',
    domain: 'montopay.com',
    fromAddresses: [],
    emailSubject: '*Invoice.*',
    replyToEmail: 'sys-admin@client-domain.com'
  });
  
  const [newAddress, setNewAddress] = useState('');

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title} Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="toEmail">"To" Email Address:</Label>
            <Input
              id="toEmail"
              value={config.toEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, toEmail: e.target.value }))}
              placeholder="montopay@montoinvoice.com"
            />
          </div>

          <div className="space-y-2">
            <Label>"From" Email Address:</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="domain" className="text-sm text-grey-600">Domain:</Label>
                <Input
                  id="domain"
                  value={config.domain}
                  onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="montopay.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-sm text-grey-600">Addresses:</Label>
                <div className="mt-1 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Add email address"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddAddress()}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddAddress}
                      size="sm"
                      className="shrink-0"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  {config.fromAddresses.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {config.fromAddresses.map((address, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="flex items-center gap-1"
                        >
                          {address}
                          <button
                            onClick={() => handleRemoveAddress(address)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailSubject">Email Subject (regex):</Label>
            <Input
              id="emailSubject"
              value={config.emailSubject}
              onChange={(e) => setConfig(prev => ({ ...prev, emailSubject: e.target.value }))}
              placeholder="*Invoice.*"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="replyToEmail">"Reply to" Email Address:</Label>
            <Input
              id="replyToEmail"
              value={config.replyToEmail}
              onChange={(e) => setConfig(prev => ({ ...prev, replyToEmail: e.target.value }))}
              placeholder="sys-admin@client-domain.com"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}