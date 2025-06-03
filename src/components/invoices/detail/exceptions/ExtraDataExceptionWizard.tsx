import { useState } from "react";
import { TriangleAlert, Lightbulb, Upload, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface ExtraDataExceptionWizardProps {
  onResolve: (action: 'resolve_manual' | 'upload' | 'force_submit' | 'exclude' | 'resolve_outside') => void;
}

export function ExtraDataExceptionWizard({ onResolve }: ExtraDataExceptionWizardProps) {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedAction, setSelectedAction] = useState<'resolve_manual' | 'upload' | 'force_submit' | 'exclude' | 'resolve_outside'>('resolve_manual');
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const handleResolve = () => {
    if (selectedAction === 'resolve_manual' && (!invoiceDate || !customerName)) {
      // In a real app, we'd show validation errors
      return;
    }
    onResolve(selectedAction);
  };

  const getButtonText = () => {
    switch (selectedAction) {
      case 'resolve_manual':
        return 'Resolve with Manual Data';
      case 'upload':
        return 'Upload New RTP';
      case 'force_submit':
        return 'Force Submit';
      case 'exclude':
        return 'Exclude Invoice';
      case 'resolve_outside':
        return 'Mark as Resolved';
      default:
        return 'Resolve Exception';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Resolve Exception title and Extra Data chip */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Resolve Exception</h2>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          Extra Data
        </Badge>
      </div>

      {/* Exception Alert Banner */}
      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
        <div className="flex items-start gap-3">
          <TriangleAlert 
            strokeWidth={1.25} 
            className="mt-1 flex-shrink-0 text-red-600" 
            size={18} 
          />
          <div>
            <p className="text-gray-900 text-sm">
              <span className="font-semibold">Missing Data:</span> Required information is missing from the invoice's additional data: Invoice Date, Customer Name
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Lightbulb 
            strokeWidth={1.25} 
            className="mt-1 flex-shrink-0 text-blue-600" 
            size={18} 
          />
          <div>
            <p className="text-gray-900 text-sm">
              <span className="font-semibold">Resolve this issue by</span> Manually filling required fields
            </p>
          </div>
        </div>
      </div>

      {/* Manual Data Entry Form */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Invoice Date Input */}
            <div className="space-y-2">
              <Label htmlFor="invoice-date" className="text-sm font-medium text-gray-900">
                Invoice Date
              </Label>
              <Input
                id="invoice-date"
                type="text"
                placeholder="please add the invoice data"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Customer Name Input */}
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="text-sm font-medium text-gray-900">
                Customer Name
              </Label>
              <Input
                id="customer-name"
                type="text"
                placeholder="Please insert Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Separator */}
            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500 font-medium">Or</span>
              <Separator className="flex-1" />
            </div>

            {/* Upload New RTP Section */}
            <RadioGroup value={selectedAction} onValueChange={(value) => setSelectedAction(value as any)}>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="resolve_manual" id="resolve-manual" className="mt-1" />
                  <div>
                    <Label htmlFor="resolve-manual" className="font-medium text-gray-900 cursor-pointer">
                      Fill required fields manually
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Complete the missing information using the form above
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="upload" id="upload-new" className="mt-1" />
                  <div className="flex items-center gap-2">
                    <Upload size={16} className="text-gray-600" />
                    <Label htmlFor="upload-new" className="font-medium text-gray-900 cursor-pointer">
                      Upload New RTP
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {/* Other Resolution Options */}
            <Collapsible open={showOtherOptions} onOpenChange={setShowOtherOptions}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                  <span className="text-sm text-gray-600">Other Resolution Options</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform ${showOtherOptions ? 'rotate-180' : ''}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <RadioGroup value={selectedAction} onValueChange={(value) => setSelectedAction(value as any)}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="force_submit" id="force-submit" className="mt-1" />
                      <div>
                        <Label htmlFor="force-submit" className="font-medium text-gray-900 cursor-pointer">
                          Force Submit
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Submit the invoice despite missing data
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="exclude" id="exclude" className="mt-1" />
                      <div>
                        <Label htmlFor="exclude" className="font-medium text-gray-900 cursor-pointer">
                          Exclude Invoice
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Remove this invoice from processing
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="resolve_outside" id="resolve-outside" className="mt-1" />
                      <div>
                        <Label htmlFor="resolve-outside" className="font-medium text-gray-900 cursor-pointer">
                          Resolved Outside System
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Mark as resolved if handled externally
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            {/* Resolution Button */}
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleResolve}
                className="px-6"
                disabled={selectedAction === 'resolve_manual' && (!invoiceDate || !customerName)}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
