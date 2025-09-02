import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { InboxConfiguration } from './types';

interface InboxConfigurationCardProps {
  config: InboxConfiguration;
  onUpdate: (config: InboxConfiguration) => void;
  onDelete: () => void;
  canDelete: boolean;
}

const inboxTypeOptions = [
  { value: 'single_invoice', label: 'Single Invoice (PDF)' },
  { value: 'bulk_invoice', label: 'Bulk Invoices (CSV/Excel)' },
  { value: 'with_attachments', label: 'Invoice with Attachments' },
  { value: 'combined', label: 'Combined Invoices (Requires Splitting)' },
  { value: 'payment_reports', label: 'Payment Reports (CSV/Excel)' }
];

export function InboxConfigurationCard({ 
  config, 
  onUpdate, 
  onDelete, 
  canDelete 
}: InboxConfigurationCardProps) {
  const [newEmailAddress, setNewEmailAddress] = useState('');

  const updateConfig = (updates: Partial<InboxConfiguration>) => {
    onUpdate({ ...config, ...updates });
  };

  const addEmailAddress = () => {
    if (newEmailAddress.trim()) {
      updateConfig({
        fromEmailAddresses: [...config.fromEmailAddresses, newEmailAddress.trim()]
      });
      setNewEmailAddress('');
    }
  };

  const removeEmailAddress = (index: number) => {
    updateConfig({
      fromEmailAddresses: config.fromEmailAddresses.filter((_, i) => i !== index)
    });
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{config.name}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={`active-${config.id}`} className="text-xs text-muted-foreground">Active</Label>
              <Switch
                id={`active-${config.id}`}
                checked={config.isActive}
                onCheckedChange={(checked) => updateConfig({ isActive: checked })}
              />
            </div>
            {canDelete && (
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium">Inbox Name</Label>
          <Input
            value={config.name}
            onChange={(e) => updateConfig({ name: e.target.value })}
            className="h-8 text-xs"
            placeholder="e.g., Main Invoice Processing"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Inbox Type</Label>
          <Select value={config.inboxType} onValueChange={(value: any) => updateConfig({ inboxType: value })}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {inboxTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">To Email Address</Label>
          <Input
            value={config.toEmail}
            onChange={(e) => updateConfig({ toEmail: e.target.value })}
            className="h-8 text-xs"
            placeholder="invoices@yourcompany.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Switch
              id={`domain-${config.id}`}
              checked={config.fromEmailDomain}
              onCheckedChange={(checked) => updateConfig({ fromEmailDomain: checked })}
            />
            <Label htmlFor={`domain-${config.id}`} className="text-xs">Accept from domain: @yourcompany.com</Label>
          </div>
          
          <Label className="text-xs font-medium">Specific From Email Addresses</Label>
          <div className="space-y-2">
            {config.fromEmailAddresses.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={email} disabled className="h-8 text-xs flex-1" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeEmailAddress(index)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newEmailAddress}
                onChange={(e) => setNewEmailAddress(e.target.value)}
                placeholder="vendor@company.com"
                className="h-8 text-xs flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addEmailAddress()}
              />
              <Button variant="outline" size="sm" onClick={addEmailAddress}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Email Subject Pattern (regex)</Label>
          <Input
            value={config.emailSubject}
            onChange={(e) => updateConfig({ emailSubject: e.target.value })}
            className="h-8 text-xs"
            placeholder=".*Invoice.*"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Reply To Email</Label>
          <Input
            value={config.replyToEmail}
            onChange={(e) => updateConfig({ replyToEmail: e.target.value })}
            className="h-8 text-xs"
            placeholder="noreply@yourcompany.com"
          />
        </div>
      </CardContent>
    </Card>
  );
}