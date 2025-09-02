
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

export function EmailSetupCard() {
  const [invoiceConfig, setInvoiceConfig] = useState({
    singleInvoice: true,
    invoiceWithAttachments: false,
    bulkInvoices: false,
    combinedInvoices: false,
    domainFromEmail: true,
    addressesFromEmail: false,
    emailSubject: "*Invoice.*",
    replyToAddress: "sys-admin@clinet-domain.com",
    customAddresses: "",
    toEmailAddress: "montopay@montoinvoice.com"
  });

  const [invoiceSectionOpen, setInvoiceSectionOpen] = useState(false);

  return (
    <Card className="border border-border rounded-lg shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-grey-900">
          Email Integration Configuration
        </CardTitle>
        <p className="text-sm text-grey-600">Configure email processing for invoices</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Invoice Configuration Section */}
        <Collapsible open={invoiceSectionOpen} onOpenChange={setInvoiceSectionOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-2">
              {invoiceSectionOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="text-sm font-medium">Invoice Processing Setup</span>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3 space-y-3 pl-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Inbox Type (select 1):</Label>
              <div className="mt-2 space-y-1">
                {[
                  { key: 'singleInvoice', label: 'Single Invoice (PDF)' },
                  { key: 'invoiceWithAttachments', label: 'Invoice with Attachments (PDF + Files)' },
                  { key: 'bulkInvoices', label: 'Bulk Invoices (CSV/Excel)' },
                  { key: 'combinedInvoices', label: 'Combined Invoices (Requires Splitting)' }
                ].map((option) => (
                  <div key={option.key} className="flex items-center space-x-2 py-1">
                    <Checkbox 
                      id={option.key} 
                      checked={invoiceConfig[option.key as 'singleInvoice' | 'invoiceWithAttachments' | 'bulkInvoices' | 'combinedInvoices']}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setInvoiceConfig({
                            ...invoiceConfig, 
                            singleInvoice: option.key === 'singleInvoice',
                            invoiceWithAttachments: option.key === 'invoiceWithAttachments',
                            bulkInvoices: option.key === 'bulkInvoices',
                            combinedInvoices: option.key === 'combinedInvoices'
                          });
                        }
                      }}
                    />
                    <Label htmlFor={option.key} className="text-xs">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">"To" Email Address:</Label>
                <Input 
                  value={invoiceConfig.toEmailAddress}
                  onChange={(e) => setInvoiceConfig({...invoiceConfig, toEmailAddress: e.target.value})}
                  className="mt-1 text-xs h-8"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">"From" Email Address (multiselect):</Label>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="domain-from" 
                      checked={invoiceConfig.domainFromEmail}
                      onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, domainFromEmail: !!checked})}
                    />
                    <Label htmlFor="domain-from" className="text-xs">Domain: montopay.com</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="addresses-from" 
                        checked={invoiceConfig.addressesFromEmail}
                        onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, addressesFromEmail: !!checked})}
                      />
                      <Label htmlFor="addresses-from" className="text-xs">Addresses:</Label>
                    </div>
                    {invoiceConfig.addressesFromEmail && (
                      <div className="ml-6">
                        <Input 
                          value={invoiceConfig.customAddresses}
                          onChange={(e) => setInvoiceConfig({...invoiceConfig, customAddresses: e.target.value})}
                          placeholder="Enter email addresses (comma separated)"
                          className="text-[10px] h-6 px-2 py-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email Subject (regex):</Label>
                <Input 
                  value={invoiceConfig.emailSubject}
                  onChange={(e) => setInvoiceConfig({...invoiceConfig, emailSubject: e.target.value})}
                  className="mt-1 text-xs h-8"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">"Reply to" Email Address:</Label>
                <Input 
                  value={invoiceConfig.replyToAddress}
                  onChange={(e) => setInvoiceConfig({...invoiceConfig, replyToAddress: e.target.value})}
                  className="mt-1 text-xs h-8"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
