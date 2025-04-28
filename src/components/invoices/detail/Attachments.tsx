
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attachment } from "@/types/invoice";

interface AttachmentsProps {
  attachments: Attachment[];
}

export function Attachments({ attachments }: AttachmentsProps) {
  const handleDownload = (attachment: Attachment) => {
    // TODO: Implement actual download functionality
    console.log(`Downloading ${attachment.fileName}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-medium text-[#1A202C] mb-4">Attachments</h2>
      
      <div className="space-y-4">
        <ul className="space-y-3">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="flex items-center justify-between py-2 border-b border-[#E2E8F0] last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-[#1A202C]">{attachment.fileName}</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDownload(attachment)}
                className="text-[#4A5568] hover:text-[#1A202C] hover:bg-[#F7FAFC]"
              >
                <Download className="h-4 w-4" />
                <span className="ml-2">Download</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
