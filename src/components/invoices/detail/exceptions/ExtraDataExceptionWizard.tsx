import { useState } from "react";
import { TriangleAlert, Lightbulb, Upload, ChevronDown, File, X } from "lucide-react";
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
  const [selectedAction, setSelectedAction] = useState<'upload' | 'force_submit' | 'exclude' | 'resolve_outside' | null>(null);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleResolve = () => {
    if (selectedAction === 'upload') {
      if (!uploadedFile) return;
      onResolve(selectedAction);
    } else if (selectedAction) {
      onResolve(selectedAction);
    } else {
      // If no action selected but manual data is filled, resolve manually
      if (invoiceDate && customerName) {
        onResolve('resolve_manual');
      }
    }
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setSelectedAction('upload');
    setUploadedFile(file);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileRemoval = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUploadedFile(null);
    setSelectedAction(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const getButtonText = () => {
    if (selectedAction === 'upload') {
      return 'Upload New RTP';
    } else if (selectedAction === 'force_submit') {
      return 'Force Submit';
    } else if (selectedAction === 'exclude') {
      return 'Exclude Invoice';
    } else if (selectedAction === 'resolve_outside') {
      return 'Mark as Resolved';
    } else if (invoiceDate && customerName) {
      return 'Resolve with Manual Data';
    }
    return 'Resolve Exception';
  };

  const isButtonEnabled = () => {
    if (selectedAction === 'upload') {
      return uploadedFile !== null && !isUploading;
    }
    if (selectedAction) {
      return true;
    }
    return invoiceDate && customerName;
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
            <div 
              className={`bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                selectedAction === 'upload' ? 'ring-2 ring-purple-500 border-purple-500' : ''
              }`}
              onClick={() => !uploadedFile && !isUploading && document.getElementById('file-input')?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                onChange={handleFileInputChange}
              />
              
              {!uploadedFile && !isUploading ? (
                <>
                  <div className="h-20 w-20 mb-4 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/723d6803-fb23-463b-a8b9-414055e13898.png" 
                      alt="Upload illustration" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium mb-1 text-sm" style={{ color: '#38415F' }}>
                    Upload New RTP
                  </h3>
                  <p className="text-sm mb-4 text-center" style={{ color: '#8C92A3' }}>
                    This invoice must include the corrected data
                  </p>
                  <p className="text-sm mb-4" style={{ color: '#8C92A3' }}>
                    Drag & drop a file here or{' '}
                    <span className="font-medium cursor-pointer underline" style={{ color: '#7B59FF' }}>
                      click to browse
                    </span>
                  </p>
                </>
              ) : isUploading ? (
                <>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium" style={{ color: '#38415F' }}>
                        Uploading PDF file...
                      </h3>
                      <span className="text-sm" style={{ color: '#8C92A3' }}>
                        {uploadProgress}% Completed
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="h-2 rounded-full transition-all duration-300 ease-out" 
                        style={{ 
                          backgroundColor: '#7B59FF',
                          width: `${uploadProgress}%`
                        }}
                      ></div>
                    </div>
                    
                    <p className="font-medium text-sm mb-4" style={{ color: '#38415F' }}>
                      #{uploadedFile?.name || 'file'}
                    </p>
                    
                    <p className="text-xs text-center" style={{ color: '#8C92A3' }}>
                      Your current invoice will be archived, you can see it in the activity log
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <div className="flex items-start gap-3 mb-4">
                      <File className="mt-1 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm" style={{ color: '#38415F' }}>
                              {uploadedFile?.name}
                            </p>
                            <p className="text-xs" style={{ color: '#8C92A3' }}>
                              {uploadedFile ? (uploadedFile.size / 1024).toFixed(2) : '0'} KB
                            </p>
                          </div>
                          <button 
                            className="flex items-center gap-1 text-sm font-medium hover:underline transition-colors duration-200"
                            style={{ color: '#8C92A3' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileRemoval(e);
                            }}
                          >
                            <X size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pl-8">
                      <p className="text-sm" style={{ color: '#8C92A3' }}>
                        • Your current invoice will be archived, you can see it in the activity log
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

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
                <RadioGroup value={selectedAction || ''} onValueChange={(value) => setSelectedAction(value as any)}>
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
                disabled={!isButtonEnabled()}
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
