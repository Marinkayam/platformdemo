
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalRecord } from "@/types/portalRecord";
import { AlertTriangle } from "lucide-react";
import { UploadSection } from "@/components/invoices/detail/exceptions/extra-data/UploadSection";

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
  onFileUpload,
}: CreateRTPTabProps) {
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleFileRemoval = () => {
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6 mt-6">
      <UploadSection
        uploadedFile={uploadedFile}
        isUploading={false}
        uploadProgress={0}
        selectedAction="upload"
        onFileUpload={handleFileUpload}
        onFileRemoval={handleFileRemoval}
      />

      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Creating an RTP will generate a new Request to Pay record that matches this portal record.
          Upload an invoice PDF to proceed.
        </AlertDescription>
      </Alert>
    </div>
  );
}
