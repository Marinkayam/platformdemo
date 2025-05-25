
import { Invoice, LineItem } from "@/types/invoice";
import { PdfToolbar } from "./pdf/PdfToolbar";
import { PdfContent } from "./pdf/PdfContent";

interface PdfViewerProps {
  invoice: Invoice;
  lineItems: LineItem[];
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PdfViewer({ 
  invoice, 
  lineItems, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut 
}: PdfViewerProps) {
  return (
    <div className="h-full flex flex-col">
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
    </div>
  );
}
