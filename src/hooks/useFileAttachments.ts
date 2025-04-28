
import { useState } from "react";
import { FileAttachment } from "@/components/invoices/detail/FilePreview";

export function useFileAttachments() {
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  const addAttachment = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    
    const newAttachment: FileAttachment = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: file.type,
      url: fileUrl
    };
    
    setAttachments(prev => [...prev, newAttachment]);
    return newAttachment;
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const clearAttachments = () => {
    setAttachments([]);
  };

  return {
    attachments,
    addAttachment,
    removeAttachment,
    clearAttachments
  };
}
