
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Invoice, LineItem } from "@/types/invoice";
import { PdfToolbar } from "./pdf/PdfToolbar";
import { PdfContent } from "./pdf/PdfContent";

interface PdfViewerProps {
  invoice: Invoice;
  lineItems: LineItem[];
  isOpen: boolean;
  onClose: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PdfViewer({ 
  invoice, 
  lineItems, 
  isOpen, 
  onClose, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut 
}: PdfViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-6">
        <PdfToolbar
          invoice={invoice}
          zoomLevel={zoomLevel}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />
        <PdfContent
          invoice={invoice}
          lineItems={lineItems}
          zoomLevel={zoomLevel}
        />
      </DialogContent>
    </Dialog>
  );
}
