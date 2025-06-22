
import { useState } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download, FileText } from "lucide-react";

interface PortalRecordPdfViewerProps {
  portalRecord: PortalRecord;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function PortalRecordPdfViewer({ 
  portalRecord, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut 
}: PortalRecordPdfViewerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Portal Record Document</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex-1 border rounded-lg bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Portal Record Document</p>
          <p className="text-sm">
            Document for {portalRecord.portalRecordId}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            PDF viewer would be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
