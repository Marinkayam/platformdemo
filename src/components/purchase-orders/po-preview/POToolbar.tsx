import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PurchaseOrder } from "@/types/purchase-orders";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface POToolbarProps {
  purchaseOrder: PurchaseOrder;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function POToolbar({
  purchaseOrder,
  zoomLevel,
  onZoomIn,
  onZoomOut
}: POToolbarProps) {
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading purchase order ${purchaseOrder.poNumber}.pdf`,
    });
    // In a real app, this would trigger an actual download
  };

  // Check if PDF preview is available
  const hasPdfPreview = purchaseOrder.hasPdfPreview !== false;

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium">Purchase Order Preview</h2>
      {hasPdfPreview && (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white"
                  aria-label="Download Purchase Order"
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
      )}
    </div>
  );
}