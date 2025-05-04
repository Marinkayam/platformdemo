
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download, Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Invoice } from "@/types/invoice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  const handlePrint = () => {
    toast({
      title: "Print initiated",
      description: "Preparing invoice for printing",
    });
    // In a real app, this would trigger printing functionality
  };
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium">Invoice Preview</h2>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white"
                aria-label="Print Invoice"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white"
                aria-label="Download Invoice"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
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
