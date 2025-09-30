import { PurchaseOrder } from "@/types/purchase-orders";
import { POToolbar } from "./po-preview/POToolbar";
import { POContent } from "./po-preview/POContent";

interface POPreviewProps {
  purchaseOrder: PurchaseOrder;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function POPreview({
  purchaseOrder,
  zoomLevel,
  onZoomIn,
  onZoomOut
}: POPreviewProps) {
  return (
    <div className="h-full flex flex-col">
      <POToolbar
        purchaseOrder={purchaseOrder}
        zoomLevel={zoomLevel}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
      />
      <POContent
        purchaseOrder={purchaseOrder}
        zoomLevel={zoomLevel}
      />
    </div>
  );
}