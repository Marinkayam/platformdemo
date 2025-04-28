
import { useState } from "react";
import { useParams } from "react-router-dom";
import { invoiceData } from "@/data/invoices";
import { InvoiceHeader } from "@/components/invoices/detail/InvoiceHeader";
import { InvoiceTabsNav } from "@/components/invoices/detail/InvoiceTabs";
import { FinancialData } from "@/components/invoices/detail/FinancialData";
import { AdditionalInfo } from "@/components/invoices/detail/AdditionalInfo";
import { Attachments } from "@/components/invoices/detail/Attachments";
import { PdfViewer } from "@/components/invoices/detail/PdfViewer";
import { TabContent } from "@/components/invoices/detail/TabContent";

export default function InvoiceDetail() {
  const { id } = useParams();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activeTab, setActiveTab] = useState("invoice-data");

  // Find the invoice by id
  const invoice = invoiceData.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Invoice not found</h2>
      </div>
    );
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  // Mock data for line items and attachments
  const lineItems = [
    { id: "1", description: "Software License", quantity: 5, unitPrice: 99.99, total: 499.95 },
    { id: "2", description: "Implementation Services", quantity: 10, unitPrice: 150, total: 1500 },
    { id: "3", description: "Support Package", quantity: 1, unitPrice: 350.25, total: 350.25 }
  ];

  const attachments = [
    { id: "1", fileName: "Invoice_PDF.pdf", fileType: "pdf" as const, url: "#" },
    { id: "2", fileName: "Supporting_Document.pdf", fileType: "pdf" as const, url: "#" },
    { id: "3", fileName: "Receipt_Image.jpg", fileType: "image" as const, url: "#" }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <InvoiceHeader 
        invoice={invoice} 
        onViewPdf={() => setShowPdfViewer(true)} 
      />
      
      <InvoiceTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "invoice-data" ? (
        <>
          <FinancialData invoice={invoice} lineItems={lineItems} />
          <AdditionalInfo invoice={invoice} />
          <Attachments attachments={attachments} />
        </>
      ) : (
        <TabContent tab={activeTab} />
      )}

      <PdfViewer 
        invoice={invoice}
        lineItems={lineItems}
        isOpen={showPdfViewer}
        onClose={() => setShowPdfViewer(false)}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </div>
  );
}
