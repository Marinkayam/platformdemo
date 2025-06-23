
import { useMemo, useState } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { InvoiceFilters } from "./components/InvoiceFilters";
import { InvoiceSearchSection } from "./components/InvoiceSearchSection";
import { InvoiceList } from "./components/InvoiceList";
import { ConflictAlerts } from "./components/ConflictAlerts";
import { SelectedInvoiceDetails } from "./components/SelectedInvoiceDetails";
import { InvoiceModals } from "./components/InvoiceModals";

interface MatchExistingInvoiceTabProps {
  record: PortalRecord;
  selectedInvoiceId: string;
  setSelectedInvoiceId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPortal: string;
  setSelectedPortal: (portal: string) => void;
  selectedBuyer: string;
  setSelectedBuyer: (buyer: string) => void;
  debouncedSearchTerm: string;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  onMakePrimary?: () => void;
  onMatchAndCreateRTP?: () => void;
}

export function MatchExistingInvoiceTab({
  record,
  selectedInvoiceId,
  setSelectedInvoiceId,
  searchTerm,
  setSearchTerm,
  selectedPortal,
  setSelectedPortal,
  selectedBuyer,
  setSelectedBuyer,
  debouncedSearchTerm,
  uploadedFile,
  setUploadedFile,
  onMakePrimary,
  onMatchAndCreateRTP,
}: MatchExistingInvoiceTabProps) {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showMakePrimaryConfirm, setShowMakePrimaryConfirm] = useState(false);

  // Filter invoices with enhanced search
  const filteredInvoices = useMemo(() => {
    return invoiceData.filter(invoice => {
      const matchesBuyer = selectedBuyer === "all_buyers" || invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase());
      const matchesSearch = debouncedSearchTerm === "" || 
        invoice.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.buyer.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.number?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesBuyer && matchesSearch;
    });
  }, [selectedBuyer, debouncedSearchTerm]);

  const selectedInvoice = filteredInvoices.find(inv => inv.id === selectedInvoiceId);
  
  // Check for conflicts - if invoice is already linked to another portal record
  const hasConflict = selectedInvoice && invoiceData.some(inv => 
    inv.id === selectedInvoiceId && inv.status !== 'Pending Action'
  );

  const handlePreviewPdf = () => {
    if (selectedInvoice) {
      setShowPdfModal(true);
    }
  };

  const handleMatchAndCreateRTP = () => {
    if (onMatchAndCreateRTP) {
      onMatchAndCreateRTP();
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Filters Section */}
        <InvoiceFilters
          record={record}
          selectedPortal={selectedPortal}
          setSelectedPortal={setSelectedPortal}
          selectedBuyer={selectedBuyer}
          setSelectedBuyer={setSelectedBuyer}
        />

        {/* Search Section */}
        <InvoiceSearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPortal={selectedPortal}
          selectedBuyer={selectedBuyer}
          filteredInvoicesCount={filteredInvoices.length}
        />

        {/* Invoice List */}
        <InvoiceList
          filteredInvoices={filteredInvoices}
          selectedInvoiceId={selectedInvoiceId}
          setSelectedInvoiceId={setSelectedInvoiceId}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          onMatchAndCreateRTP={handleMatchAndCreateRTP}
        />

        {/* Conflict Alerts */}
        <ConflictAlerts 
          hasConflict={hasConflict}
          selectedInvoice={selectedInvoice}
        />

        {/* Selected Invoice Details */}
        <SelectedInvoiceDetails
          selectedInvoice={selectedInvoice}
          onPreviewPdf={handlePreviewPdf}
        />
      </div>

      {/* Modals */}
      <InvoiceModals
        showPdfModal={showPdfModal}
        setShowPdfModal={setShowPdfModal}
        showMakePrimaryConfirm={showMakePrimaryConfirm}
        setShowMakePrimaryConfirm={setShowMakePrimaryConfirm}
        selectedInvoice={selectedInvoice}
        record={record}
        onMakePrimary={onMakePrimary}
      />
    </>
  );
}
