
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileUploadZone } from "./FileUploadZone";
import { useFileAttachments } from "@/hooks/useFileAttachments";
import { toast } from "@/hooks/use-toast";

interface DataExtractionResolverProps {
  exceptions: Exception[];
  invoice?: Invoice;
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function DataExtractionResolver({ exceptions, invoice, onResolveException }: DataExtractionResolverProps) {
  const { attachments, addAttachment, removeAttachment, clearAttachments } = useFileAttachments();
  const [isUploading, setIsUploading] = useState(false);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [resolutionMethod, setResolutionMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    invoiceDate: "2025-01-10", // Default date in YYYY-MM-DD format
    customerName: invoice?.buyer || ""
  });
  
  // Get the first exception with type MISSING_INFORMATION
  const exception = exceptions.find(exc => exc.type === 'MISSING_INFORMATION');
  
  if (!exception) {
    return null;
  }
  
  const handleFileUpload = (file: File) => {
    clearAttachments();
    setIsUploading(true);
    
    // Simulate network delay for upload
    setTimeout(() => {
      addAttachment(file);
      setIsUploading(false);
      setResolutionMethod('upload');
      toast({
        title: "File uploaded",
        description: "Your PDF has been uploaded successfully"
      });
    }, 1500);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setResolutionMethod('manual');
  };
  
  const handleResolutionMethodChange = (value: string) => {
    setResolutionMethod(value);
  };
  
  const isButtonEnabled = () => {
    if (resolutionMethod === 'manual') {
      return formData.invoiceDate && formData.customerName;
    }
    if (resolutionMethod === 'upload') {
      return attachments.length > 0;
    }
    return resolutionMethod === 'force' || resolutionMethod === 'exclude';
  };
  
  const getButtonText = () => {
    switch (resolutionMethod) {
      case 'manual': return 'Apply Manual Changes';
      case 'upload': return 'Submit New PDF';
      case 'force': return 'Force Submit';
      case 'exclude': return 'Exclude Invoice';
      default: return 'Submit Changes';
    }
  };
  
  const handleSubmit = () => {
    if (exception.id) {
      let resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED' = 'MARK_RESOLVED';
      
      if (resolutionMethod === 'upload') {
        resolution = 'UPLOAD_NEW_PDF';
      } else if (resolutionMethod === 'force') {
        resolution = 'FORCE_SUBMIT';
      } else if (resolutionMethod === 'exclude') {
        resolution = 'EXCLUDED';
      }
      
      onResolveException(exception.id, resolution);
      
      toast({
        title: "Exception resolved",
        description: "Invoice data extraction issues have been resolved"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Resolve Exceptions</h2>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-primary/10 text-primary px-3 py-1 text-sm font-medium rounded-md">
          Invoice Data
        </div>
      </div>
      
      <Card className="border border-red-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-red-800 mb-4">
            <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Incorrect Data</h3>
              <p className="text-gray-700 mt-1">
                The invoice PDF contains invalid required information: 
                <span className="text-red-600 font-medium"> Invoice Date</span>,
                <span className="text-red-600 font-medium"> Customer Name</span>
              </p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Resolve this issue by manually filling required fields
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input 
                    type="date" 
                    id="invoiceDate"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input 
                    type="text" 
                    id="customerName"
                    name="customerName"
                    placeholder="Name"
                    value={formData.customerName}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a new PDF with the correct Invoice date and Customer name fields
              </p>
              
              <FileUploadZone onFileUpload={handleFileUpload} />
            </div>
            
            <Collapsible open={isOtherOptionsOpen} onOpenChange={setIsOtherOptionsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-left text-sm p-0 h-auto">
                  <span className="flex items-center">
                    {isOtherOptionsOpen ? "Hide" : "Show"} Other Resolution Options
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-2 h-4 w-4 transition-transform ${
                        isOtherOptionsOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-4 pb-2">
                  <RadioGroup onValueChange={handleResolutionMethodChange} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="force" id="force" />
                      <Label htmlFor="force">Force Submit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exclude" id="exclude" />
                      <Label htmlFor="exclude">Exclude from Submission</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outside" id="outside" />
                      <Label htmlFor="outside">Resolve Outside Monto</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!isButtonEnabled()}
            >
              {getButtonText()}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
