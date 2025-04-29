
import { useState, useEffect } from "react";
import { AlertCircle, Upload } from "lucide-react";
import { Exception } from "@/types/exception";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileAttachments } from "@/hooks/useFileAttachments";
import { FilePreview } from "@/components/invoices/detail/FilePreview";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface ExceptionsTabProps {
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT') => void;
}

export function ExceptionsTab({ exceptions, onResolveException }: ExceptionsTabProps) {
  const { attachments, addAttachment, removeAttachment, clearAttachments } = useFileAttachments();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };
  
  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    clearAttachments();
    simulateUploadProgress();
    
    // Simulate network delay for upload
    setTimeout(() => {
      addAttachment(file);
      toast({
        title: "File uploaded",
        description: "Your PDF has been uploaded successfully"
      });
    }, 2000);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleDelete = (id: string) => {
    removeAttachment(id);
    toast({
      title: "File removed",
      description: "The PDF has been removed"
    });
  };
  
  const handleMarkAsResolved = () => {
    if (attachments.length === 0) {
      toast({
        title: "Upload required",
        description: "Please upload a corrected invoice PDF first",
        variant: "destructive"
      });
      return;
    }
    
    // Mark all exceptions as resolved
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'UPLOAD_NEW_PDF');
    });
    
    toast({
      title: "Exceptions resolved",
      description: "The invoice exceptions have been marked as resolved"
    });
  };
  
  const handleForceSubmit = () => {
    // Force submit despite exceptions
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'FORCE_SUBMIT');
    });
    
    toast({
      title: "Force submitted",
      description: "The invoice has been force submitted despite exceptions"
    });
  };

  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-muted-foreground">No exceptions found for this invoice.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-red-50 border-b">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <CardTitle className="text-lg font-medium text-red-700">
                Exception Detected
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Exception Message:</h3>
              <div className="text-sm bg-gray-50 p-4 rounded-md border">
                <p>The following errors need to be resolved to meet the buyer's and portal's requirements:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {exceptions.map(exception => (
                    <li key={exception.id}>{exception.message}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div 
              className={`mt-6 border-2 border-dashed rounded-lg ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'} p-6 text-center`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-3">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <h3 className="text-base font-medium">Drag & Drop or Browse to upload your corrected invoice PDF</h3>
                <p className="text-sm text-gray-500">
                  This invoice must include the updated PO number required by the buyer.
                </p>
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="bg-primary text-white px-4 py-2 rounded-md inline-block hover:bg-primary/90 transition-colors">
                      Select File
                    </div>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      accept=".pdf" 
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {isUploading && (
              <div className="mt-2">
                <p className="text-sm mb-1">Uploading PDF...</p>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-right mt-1 text-gray-500">{uploadProgress}%</p>
              </div>
            )}
            
            {attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Uploaded File:</h4>
                {attachments.map(file => (
                  <div key={file.id} className="border rounded-md p-3 bg-gray-50">
                    <FilePreview 
                      file={file} 
                      onDelete={() => handleDelete(file.id)}
                      showDeleteButton={true}
                    />
                    <p className="text-xs text-gray-500 mt-2 italic">
                      This PDF will replace the previous one — please ensure it fixes all listed exceptions.
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleForceSubmit}>
                Force Submit
              </Button>
              <Button 
                disabled={attachments.length === 0}
                onClick={handleMarkAsResolved}
                className={`${attachments.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Mark as Solved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
