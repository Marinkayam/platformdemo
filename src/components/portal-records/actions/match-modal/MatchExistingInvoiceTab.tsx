
import { useMemo, useState, useEffect } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { InvoiceFilters } from "./components/InvoiceFilters";
import { InvoiceSearchSection } from "./components/InvoiceSearchSection";
import { InvoiceList } from "./components/InvoiceList";
import { ConflictAlerts } from "./components/ConflictAlerts";
import { InvoiceModals } from "./components/InvoiceModals";
import { getInvoiceSuggestions, extractSearchTermFromPortalRecord, InvoiceMatch } from "@/utils/invoiceMatching";

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
  const [suggestions, setSuggestions] = useState<InvoiceMatch[]>([]);
  const [hasManualSearch, setHasManualSearch] = useState(false);

  // Initialize search with portal record ID on mount
  useEffect(() => {
    if (!searchTerm && !hasManualSearch) {
      const initialSearch = extractSearchTermFromPortalRecord(record.portalRecordId);
      setSearchTerm(initialSearch);
    }
  }, [record.portalRecordId, searchTerm, setSearchTerm, hasManualSearch]);

  // Generate suggestions when component mounts
  useEffect(() => {
    const invoiceSuggestions = getInvoiceSuggestions(record, invoiceData, 5);
    setSuggestions(invoiceSuggestions);
  }, [record]);

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

  const handleMatchAndCreateRTP = () => {
    if (onMatchAndCreateRTP) {
      onMatchAndCreateRTP();
    }
  };

  const handleSuggestionSelect = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setHasManualSearch(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHasManualSearch(false);
  };

  const showSuggestions = !hasManualSearch && suggestions.length > 0;

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

        {/* Search Section with Suggestions */}
        <InvoiceSearchSection
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          selectedPortal={selectedPortal}
          selectedBuyer={selectedBuyer}
          filteredInvoicesCount={filteredInvoices.length}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          showSuggestions={showSuggestions}
          onClearSearch={handleClearSearch}
          selectedInvoiceId={selectedInvoiceId}
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
