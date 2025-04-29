
import React from "react";
import { FileAttachment, FilePreview } from "@/components/invoices/detail/FilePreview";

interface FilePreviewListProps {
  attachments: FileAttachment[];
  onDelete: (id: string) => void;
}

export function FilePreviewList({ attachments, onDelete }: FilePreviewListProps) {
  if (attachments.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Uploaded File:</h4>
      {attachments.map(file => (
        <div key={file.id} className="border rounded-md p-3 bg-gray-50">
          <FilePreview 
            file={file} 
            onDelete={() => onDelete(file.id)}
            showDeleteButton={true}
          />
          <p className="text-xs text-gray-500 mt-2 italic">
            This PDF will replace the previous one — please ensure it fixes all listed exceptions.
          </p>
        </div>
      ))}
    </div>
  );
}
