import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Send, Headphones } from "lucide-react";
import { IntegrationConnector } from './types';

interface SupportContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  connector: IntegrationConnector | null;
}

export function SupportContactModal({ isOpen, onClose, connector }: SupportContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    urgency: 'normal',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Support request submitted:', { connector: connector?.name, ...formData });
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      urgency: 'normal',
      message: ''
    });
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!connector) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <connector.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <DialogTitle className="text-lg">{connector.name} Integration</DialogTitle>
              <DialogDescription className="text-sm">
                Enterprise integration setup
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Expert Support Required</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {connector.name} integration requires personalized setup and configuration. 
              Our team will guide you through the entire process.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="h-8 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency" className="text-xs">Priority Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="text-xs">Low - General inquiry</SelectItem>
                  <SelectItem value="normal" className="text-xs">Normal - Standard setup</SelectItem>
                  <SelectItem value="high" className="text-xs">High - Urgent implementation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs">Additional Details</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                placeholder="Tell us about your current setup, integration goals, timeline, or any specific requirements..."
                className="text-xs min-h-[80px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <Send className="w-3 h-3 mr-2" />
                Request Setup Call
              </Button>
            </div>
          </form>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">What happens next?</span>
            </div>
            <p className="text-xs text-blue-600">
              Our integration specialist will contact you within 24 hours to schedule a setup call 
              and discuss your specific requirements.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}