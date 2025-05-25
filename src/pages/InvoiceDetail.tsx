
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { invoiceData } from "@/data/invoices";
import { InvoiceHeader } from "@/components/invoices/detail/InvoiceHeader";
import { InvoiceTabsNav } from "@/components/invoices/detail/InvoiceTabs";
import { FinancialData } from "@/components/invoices/detail/FinancialData";
import { TabContent } from "@/components/invoices/detail/TabContent";
import { PdfViewer } from "@/components/invoices/detail/PdfViewer";
import { useNotes } from "@/hooks/useNotes";
import { Separator } from "@/components/ui/separator";

export default function InvoiceDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activeTab, setActiveTab] = useState("invoice-data");
  const { notes } = useNotes();
  
  // Activity count - 4 activity items (hardcoded in ActivityTimeline) + notes count
  const activityCount = 4 + notes.length;

  // Check for tab parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Listen for custom tab change event
  useEffect(() => {
    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };

    window.addEventListener('switchTab', handleTabChange as EventListener);

    return () => {
      window.removeEventListener('switchTab', handleTabChange as EventListener);
    };
  }, []);

  // Find the invoice by id
  const invoice = invoiceData.find(inv => inv.id === id);

  // Set default tab to exceptions if invoice has exceptions and status is "Pending Action"
  useEffect(() => {
    if (invoice?.hasExceptions && 
        invoice?.status === "Pending Action" && 
        activeTab === "invoice-data" && 
        location.search === '') {
      setActiveTab("exceptions");
    }
  }, [invoice, activeTab, location.search]);

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
      />
      
      <Separator className="my-6 bg-gray-200" />
      
      <InvoiceTabsNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        activityCount={activityCount}
        invoiceStatus={invoice.status}
      />

      {activeTab === "invoice-data" ? (
        <div className="flex flex-row w-full items-start gap-8 min-h-[calc(100vh-200px)]">
          <div className="w-1/2">
            <FinancialData invoice={invoice} lineItems={lineItems} />
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="w-1/2">
            <PdfViewer
              invoice={invoice}
              lineItems={lineItems}
              zoomLevel={zoomLevel}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />
          </div>
        </div>
      ) : (
        <TabContent tab={activeTab} invoice={invoice} attachments={attachments} />
      )}
    </div>
  );
}
