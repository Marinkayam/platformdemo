
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Invoice } from "@/types/invoice";

interface PdfToolbarProps {
  invoice: Invoice;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PdfToolbar({ 
  invoice, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut 
}: PdfToolbarProps) {
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading invoice ${invoice.number}.pdf`,
    });
    // In a real app, this would trigger an actual download
  };
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium">Invoice Preview</h2>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-1.5 bg-white"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <div className="flex items-center gap-1 ml-2">
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
