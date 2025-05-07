
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attachment } from "@/types/invoice";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface AttachmentsProps {
  attachments: Attachment[];
}

export function Attachments({ attachments }: AttachmentsProps) {
  const handleDownload = (attachment: Attachment) => {
    // In a real application, this would trigger the actual download
    // For demonstration purposes, we'll just log the download request
    console.log(`Downloading ${attachment.fileName} from ${attachment.url}`);
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = attachment.url;
    link.setAttribute('download', attachment.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="rounded-xl shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <CardTitle className="text-lg font-medium mb-4">Attachments</CardTitle>
        
        <div className="space-y-4">
          <ul className="space-y-3">
            {attachments.map((attachment) => (
              <li key={attachment.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm">{attachment.fileName}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDownload(attachment)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
