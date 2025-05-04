
import { Invoice, LineItem } from "@/types/invoice";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="rounded-xl shadow-sm overflow-hidden">
      <CardContent className="p-4 h-[calc(100vh-150px)] flex flex-col">
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
      </CardContent>
    </Card>
  );
}
