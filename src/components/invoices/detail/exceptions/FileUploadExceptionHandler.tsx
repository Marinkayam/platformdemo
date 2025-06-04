
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useFileAttachments } from "@/hooks/useFileAttachments";
import { toast } from "@/hooks/use-toast";
import { FileUploadZone } from "./FileUploadZone";
import { UploadProgress } from "./UploadProgress";
import { FilePreviewList } from "./FilePreviewList";
import { ActionButtons } from "./ActionButtons";
import { Exception } from "@/types/exception";

interface FileUploadExceptionHandlerProps {
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function FileUploadExceptionHandler({ 
  exceptions, 
  onResolveException 
}: FileUploadExceptionHandlerProps) {
  const { attachments, addAttachment, removeAttachment, clearAttachments } = useFileAttachments();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
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
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <FileUploadZone onFileUpload={handleFileUpload} />
          
          <UploadProgress 
            uploadProgress={uploadProgress} 
            isUploading={isUploading} 
          />
          
          <FilePreviewList 
            attachments={attachments} 
            onDelete={handleDelete} 
          />
          
          <ActionButtons 
            attachmentsCount={attachments.length}
            onForceSubmit={handleForceSubmit}
            onMarkAsResolved={handleMarkAsResolved}
          />
        </div>
      </CardContent>
    </Card>
  );
}
