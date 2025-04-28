
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { File, FileImage, Download } from "lucide-react";
import { Attachment } from "@/types/invoice";

interface AttachmentsProps {
  attachments: Attachment[];
  onViewPdf: () => void;
}

export function Attachments({ attachments, onViewPdf }: AttachmentsProps) {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Attachments</h2>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={onViewPdf}
        >
          <File className="mr-2 h-4 w-4" /> 
          View Invoice PDF
        </Button>
        
        <Separator />
        
        <ul className="space-y-3">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.fileType)}
                <span>{attachment.fileName}</span>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
