
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalRecord } from "@/types/portalRecord";
import { FileText, Upload, AlertTriangle } from "lucide-react";

interface CreateRTPTabProps {
  record: PortalRecord;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  rtpInvoiceNumber: string;
  setRtpInvoiceNumber: (number: string) => void;
  rtpInvoiceDate: string;
  setRtpInvoiceDate: (date: string) => void;
  rtpAmount: string;
  setRtpAmount: (amount: string) => void;
  rtpPoNumber: string;
  setRtpPoNumber: (poNumber: string) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CreateRTPTab({
  record,
  uploadedFile,
  setUploadedFile,
  rtpInvoiceNumber,
  setRtpInvoiceNumber,
  rtpInvoiceDate,
  setRtpInvoiceDate,
  rtpAmount,
  setRtpAmount,
  rtpPoNumber,
  setRtpPoNumber,
  onFileUpload,
}: CreateRTPTabProps) {
  return (
    <div className="space-y-6 mt-6">
      {/* PDF Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Invoice PDF Upload</Label>
          <span className="text-red-500">*</span>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Upload Invoice PDF to create matching RTP</p>
            <input
              type="file"
              accept=".pdf"
              onChange={onFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('pdf-upload')?.click()}
              className="mt-2"
            >
              <FileText className="h-4 w-4 mr-2" />
              Choose PDF File
            </Button>
            {uploadedFile && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800 font-medium">
                  ✓ {uploadedFile.name} selected ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RTP Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rtp-invoice-number">
            Invoice Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="rtp-invoice-number"
            value={rtpInvoiceNumber}
            onChange={(e) => setRtpInvoiceNumber(e.target.value)}
            placeholder="Enter invoice number..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rtp-invoice-date">
            Invoice Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="rtp-invoice-date"
            type="date"
            value={rtpInvoiceDate}
            onChange={(e) => setRtpInvoiceDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rtp-amount">Amount</Label>
          <Input
            id="rtp-amount"
            value={rtpAmount}
            onChange={(e) => setRtpAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rtp-po-number">PO Number</Label>
          <Input
            id="rtp-po-number"
            value={rtpPoNumber}
            onChange={(e) => setRtpPoNumber(e.target.value)}
            placeholder="PO number..."
          />
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Creating an RTP will generate a new Request to Pay record that matches this portal record.
          All required fields must be completed before proceeding.
        </AlertDescription>
      </Alert>
    </div>
  );
}
