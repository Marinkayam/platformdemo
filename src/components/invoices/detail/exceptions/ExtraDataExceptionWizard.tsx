
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExceptionHeader } from "./extra-data/ExceptionHeader";
import { ExceptionBanners } from "./extra-data/ExceptionBanners";
import { ManualDataEntry } from "./extra-data/ManualDataEntry";
import { UploadSection } from "./extra-data/UploadSection";
import { ResolutionOptions } from "./extra-data/ResolutionOptions";
import { ResolutionButton } from "./extra-data/ResolutionButton";

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

  return (
    <div className="space-y-6">
      <ExceptionHeader />
      <ExceptionBanners />

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ManualDataEntry
              invoiceDate={invoiceDate}
              customerName={customerName}
              onInvoiceDateChange={setInvoiceDate}
              onCustomerNameChange={setCustomerName}
            />

            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500 font-medium">Or</span>
              <Separator className="flex-1" />
            </div>

            <UploadSection
              uploadedFile={uploadedFile}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              selectedAction={selectedAction}
              onFileUpload={handleFileUpload}
              onFileRemoval={handleFileRemoval}
            />

            <ResolutionOptions
              selectedAction={selectedAction}
              showOtherOptions={showOtherOptions}
              onSelectedActionChange={(value) => setSelectedAction(value as any)}
              onShowOtherOptionsChange={setShowOtherOptions}
            />

            <ResolutionButton
              selectedAction={selectedAction}
              invoiceDate={invoiceDate}
              customerName={customerName}
              uploadedFile={uploadedFile}
              isUploading={isUploading}
              onResolve={handleResolve}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
