
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function EmailSetupCard() {
  const [invoiceConfig, setInvoiceConfig] = useState({
    singleInvoice: true,
    invoiceWithAttachments: false,
    bulkInvoices: false,
    combinedInvoices: false,
    domainFromEmail: true,
    addressesFromEmail: false,
    emailSubject: "*Invoice.*",
    replyToAddress: "sys-admin@clinet-domain.com"
  });

  const [reportConfig, setReportConfig] = useState({
    paymentReports: true,
    domainFromEmail: true,
    addressesFromEmail: false,
    emailSubject: "*report.*",
    replyToAddress: "sys-admin@clinet-domain.com"
  });

  return (
    <Card className="border border-border rounded-xl shadow-sm">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Email Integration Configuration</h2>
          <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded font-medium">
            montopay
          </div>
        </div>

        {/* Invoice Configuration Section */}
        <div className="mb-10">
          <div className="mb-6">
            <Label className="text-base font-semibold text-foreground">Inbox Type:</Label>
            <span className="text-muted-foreground ml-2">(select 1)</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="single-invoice" 
                checked={invoiceConfig.singleInvoice}
                onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, singleInvoice: !!checked})}
              />
              <Label htmlFor="single-invoice" className="text-sm">Single Invoice (PDF)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="invoice-attachments" 
                checked={invoiceConfig.invoiceWithAttachments}
                onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, invoiceWithAttachments: !!checked})}
              />
              <Label htmlFor="invoice-attachments" className="text-sm">Invoice with Attachments (PDF + Files)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="bulk-invoices" 
                checked={invoiceConfig.bulkInvoices}
                onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, bulkInvoices: !!checked})}
              />
              <Label htmlFor="bulk-invoices" className="text-sm">Bulk Invoices (CSV/Excel)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="combined-invoices" 
                checked={invoiceConfig.combinedInvoices}
                onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, combinedInvoices: !!checked})}
              />
              <Label htmlFor="combined-invoices" className="text-sm">Combined Invoices (Requires Splitting)</Label>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <Label className="text-sm font-semibold">"To" Email Address:</Label>
              <span className="text-muted-foreground text-sm ml-2">(do not change)</span>
              <div className="mt-2">
                <span className="bg-primary/10 text-primary px-3 py-2 rounded font-mono text-sm">
                  montopay@montoinvoice.com
                </span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">"From" Email Address</Label>
              <span className="text-muted-foreground text-sm ml-2">(multiselect):</span>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="domain-from" 
                    checked={invoiceConfig.domainFromEmail}
                    onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, domainFromEmail: !!checked})}
                  />
                  <Label htmlFor="domain-from" className="text-sm font-medium">Domain:</Label>
                  <span className="text-sm">montopay.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="addresses-from" 
                    checked={invoiceConfig.addressesFromEmail}
                    onCheckedChange={(checked) => setInvoiceConfig({...invoiceConfig, addressesFromEmail: !!checked})}
                  />
                  <Label htmlFor="addresses-from" className="text-sm font-medium">Addresses:</Label>
                  <span className="text-muted-foreground text-sm">-</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Email Subject</Label>
              <span className="text-muted-foreground text-sm ml-2">(regex):</span>
              <Input 
                value={invoiceConfig.emailSubject}
                onChange={(e) => setInvoiceConfig({...invoiceConfig, emailSubject: e.target.value})}
                className="mt-2 max-w-xs"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">"Reply to" Email Address:</Label>
              <span className="text-muted-foreground text-sm ml-2">(add 1 or more)</span>
              <Input 
                value={invoiceConfig.replyToAddress}
                onChange={(e) => setInvoiceConfig({...invoiceConfig, replyToAddress: e.target.value})}
                className="mt-2 max-w-sm"
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-border my-8" />

        {/* Payment Reports Configuration Section */}
        <div>
          <div className="mb-6">
            <Label className="text-base font-semibold text-foreground">Inbox Type:</Label>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="payment-reports" 
                checked={reportConfig.paymentReports}
                onCheckedChange={(checked) => setReportConfig({...reportConfig, paymentReports: !!checked})}
              />
              <Label htmlFor="payment-reports" className="text-sm">Payment Reports (CSV/Excel)</Label>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <Label className="text-sm font-semibold">"To" Email Address:</Label>
              <span className="text-muted-foreground text-sm ml-2">(do not change)</span>
              <div className="mt-2">
                <span className="bg-primary/10 text-primary px-3 py-2 rounded font-mono text-sm">
                  montopay@montoreports.com
                </span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">"From" Email Address:</Label>
              <span className="text-muted-foreground text-sm ml-2">(multiselect):</span>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="domain-reports" 
                    checked={reportConfig.domainFromEmail}
                    onCheckedChange={(checked) => setReportConfig({...reportConfig, domainFromEmail: !!checked})}
                  />
                  <Label htmlFor="domain-reports" className="text-sm font-medium">Domain:</Label>
                  <span className="text-sm">montopay.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="addresses-reports" 
                    checked={reportConfig.addressesFromEmail}
                    onCheckedChange={(checked) => setReportConfig({...reportConfig, addressesFromEmail: !!checked})}
                  />
                  <Label htmlFor="addresses-reports" className="text-sm font-medium">Addresses:</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Email Subject:</Label>
              <Input 
                value={reportConfig.emailSubject}
                onChange={(e) => setReportConfig({...reportConfig, emailSubject: e.target.value})}
                className="mt-2 max-w-xs"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">"Reply to" Email Address:</Label>
              <Input 
                value={reportConfig.replyToAddress}
                onChange={(e) => setReportConfig({...reportConfig, replyToAddress: e.target.value})}
                className="mt-2 max-w-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button className="px-6">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
