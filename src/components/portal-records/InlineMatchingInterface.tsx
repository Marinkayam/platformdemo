import React, { useState, useEffect, useMemo } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { InvoiceFilters } from "./actions/match-modal/components/InvoiceFilters";
import { InvoiceSearchSection } from "./actions/match-modal/components/InvoiceSearchSection";
import { InvoiceList } from "./actions/match-modal/components/InvoiceList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, FileText, CalendarIcon, Search, X, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InvoiceModals } from "./actions/match-modal/components/InvoiceModals";
import { getInvoiceSuggestions, InvoiceMatch } from "@/utils/invoiceMatching";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface InlineMatchingInterfaceProps {
  record: PortalRecord;
  onMatchInvoice: (invoiceId: string) => void;
  onIgnoreRecord: () => void;
}

export function InlineMatchingInterface({
  record,
  onMatchInvoice,
  onIgnoreRecord
}: InlineMatchingInterfaceProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState("all_portals");
  const [selectedBuyer, setSelectedBuyer] = useState("all_buyers");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showMakePrimaryConfirm, setShowMakePrimaryConfirm] = useState(false);
  const [suggestions, setSuggestions] = useState<InvoiceMatch[]>([]);
  const [hasManualSearch, setHasManualSearch] = useState(false);

  // Generate suggestions when component mounts
  useEffect(() => {
    const invoiceSuggestions = getInvoiceSuggestions(record, invoiceData, 5);
    console.log('Generated suggestions:', invoiceSuggestions.length, invoiceSuggestions);
    setSuggestions(invoiceSuggestions);
  }, [record]);

  // Filter invoices with enhanced search
  const filteredInvoices = useMemo(() => {
    if (searchTerm === "" && !hasManualSearch) {
      return [];
    }

    return invoiceData.filter(invoice => {
      // When searching, be more flexible with buyer filter
      const matchesBuyer = selectedBuyer === "all_buyers" ||
        selectedBuyer === record.buyer ||
        invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase());

      const matchesSearch = searchTerm === "" ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.number?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBuyer && matchesSearch;
    });
  }, [selectedBuyer, searchTerm, hasManualSearch, record.buyer]);

  const selectedInvoice = filteredInvoices.find(inv => inv.id === selectedInvoiceId);

  // Check for conflicts - if invoice is already linked to another portal record
  const hasConflict = selectedInvoice && invoiceData.some(inv =>
    inv.id === selectedInvoiceId && inv.status !== 'Pending Action'
  );

  const handleMatchAndCreateRTP = () => {
    if (selectedInvoiceId) {
      onMatchInvoice(selectedInvoiceId);
    }
  };

  const handleSuggestionSelect = (invoiceId: string) => {
    // Toggle selection - if already selected, unselect
    if (selectedInvoiceId === invoiceId) {
      setSelectedInvoiceId("");
    } else {
      setSelectedInvoiceId(invoiceId);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setHasManualSearch(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHasManualSearch(false);
  };

  const handleUnselectInvoice = () => {
    setSelectedInvoiceId("");
  };

  const showSuggestions = searchTerm === "" && !hasManualSearch;
  const showInvoiceList = (hasManualSearch || searchTerm !== "") && filteredInvoices.length > 0;
  const showUploadSection = (hasManualSearch || searchTerm !== "") && filteredInvoices.length === 0;

  return (
    <>
      <div className="space-y-6">
        {/* Main Container */}
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="space-y-6">
            {/* Title Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground">Associate Portal Records</h2>
            </div>

            {/* Filters and Search in one row */}
            <div className="grid grid-cols-4 gap-4">
              {/* Search Invoices */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {/* Portal Filter */}
              <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select portal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={record.portal}>{record.portal}</SelectItem>
                  <SelectItem value="All Portals">All Portals</SelectItem>
                </SelectContent>
              </Select>

              {/* Buyer Filter */}
              <Select value={selectedBuyer} onValueChange={setSelectedBuyer}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select buyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={record.buyer}>{record.buyer} - {record.portal}</SelectItem>
                  <SelectItem value="all_buyers">All Buyers</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Button variant="outline" className="w-full justify-start text-left font-normal h-10 text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Select date range
              </Button>
            </div>

            {searchTerm && (
              <p className="text-xs text-muted-foreground">
                {filteredInvoices.length > 0
                  ? `Showing ${filteredInvoices.length} invoices from ${selectedPortal} • ${selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}`
                  : `No invoices found for "${searchTerm}"`
                }
              </p>
            )}

            {/* Monto's Suggestions - show directly here */}
            {showSuggestions && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium text-primary">Monto's Suggestions</Label>
                </div>
                {suggestions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.slice(0, 2).map((match) => {
                      const isSelected = selectedInvoiceId === match.invoice.id;
                      return (
                        <div key={match.invoice.id} className="space-y-0">
                          <div
                            className={`relative p-4 rounded-lg border transition-all shadow-sm cursor-pointer ${
                              isSelected
                                ? 'border-primary border-2 bg-white'
                                : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                            }`}
                            onClick={() => handleSuggestionSelect(match.invoice.id)}
                          >
                            <div className="space-y-3">
                              {/* Invoice details */}
                              <div className="space-y-2">
                                <div>
                                  <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                                  <p className="text-sm font-bold text-gray-900">{match.invoice.number}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500 font-medium">Buyer</span>
                                  <p className="text-sm text-gray-700">{match.invoice.buyer}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                                  <p className="text-sm text-gray-700">
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: match.invoice.currency || 'USD',
                                    }).format(match.invoice.total)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500 font-medium">Currency</span>
                                  <p className="text-sm text-gray-700">{match.invoice.currency || 'USD'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No suggestions available for this record
                  </p>
                )}

                {/* Didn't find an invoice section for suggestions */}
                <div className="text-center py-6 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Didn't find an invoice? Upload an invoice PDF to{" "}
                    <span
                      className="text-primary cursor-pointer hover:underline font-medium"
                      onClick={handleMatchAndCreateRTP}
                    >
                      create a new RTP record
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Search Results - same card layout as Monto's Suggestions */}
            {showInvoiceList && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium text-muted-foreground">Search Results</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInvoices.slice(0, 2).map((invoice) => {
                    const isSelected = selectedInvoiceId === invoice.id;
                    return (
                      <div key={invoice.id} className="space-y-0">
                        <div
                          className={`relative p-4 rounded-lg border transition-all shadow-sm cursor-pointer ${
                            isSelected
                              ? 'border-primary border-2 bg-white'
                              : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                          }`}
                          onClick={() => setSelectedInvoiceId(invoice.id)}
                        >
                          <div className="space-y-3">
                            {/* Invoice details */}
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                                <p className="text-sm font-bold text-gray-900">{invoice.number}</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 font-medium">Buyer</span>
                                <p className="text-sm text-gray-700">{invoice.buyer}</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                                <p className="text-sm text-gray-700">
                                  {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: invoice.currency || 'USD',
                                  }).format(invoice.total)}
                                </p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 font-medium">Currency</span>
                                <p className="text-sm text-gray-700">{invoice.currency || 'USD'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Show upload section when search has no results */}
            {showUploadSection && (
              <div className="text-center py-6 mt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't find an invoice? Upload an invoice PDF to{" "}
                  <span
                    className="text-primary cursor-pointer hover:underline font-medium"
                    onClick={() => {
                      // You can add RTP creation logic here or navigate to RTP creation
                      console.log('Create RTP clicked');
                    }}
                  >
                    create a new RTP record
                  </span>
                </p>
              </div>
            )}


            {/* Action Buttons */}
            <div className="border-t border-border pt-6 flex justify-between items-center">
              <Button
                onClick={onIgnoreRecord}
                className="bg-[#DF1C41] hover:bg-[#C41838] text-white"
              >
                Discard Record
              </Button>
              <div className="flex gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setConfirmationModalOpen(true)}
                        disabled={!selectedInvoiceId}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Associate Invoice
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-3">
                      <p className="text-sm">
                        Portal records need to be associated with invoices to enable automatic matching, proper payment processing, and complete audit trails in your ERP system.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {uploadedFile && (
                  <Button
                    onClick={handleMatchAndCreateRTP}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create RTP Record
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InvoiceModals
        showPdfModal={showPdfModal}
        setShowPdfModal={setShowPdfModal}
        showMakePrimaryConfirm={showMakePrimaryConfirm}
        setShowMakePrimaryConfirm={setShowMakePrimaryConfirm}
        selectedInvoice={selectedInvoice}
        record={record}
        onMakePrimary={() => {}}
      />

      {/* Confirmation Modal */}
      <Dialog open={confirmationModalOpen} onOpenChange={setConfirmationModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="space-y-4">
            <DialogTitle>Confirm Association</DialogTitle>
            <DialogDescription className="text-gray-900 leading-relaxed">
              You're about to associate portal record <strong>{record.portalRecordId}</strong> with invoice <strong>{selectedInvoice?.number || selectedInvoiceId}</strong>.
              <br /><br />
              This will become the primary match for payment processing.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* Show warning only for conflicts */}
            {selectedInvoice && hasConflict && (
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Conflict Detected</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      This invoice is already linked to another portal record. Proceeding will create a conflict that requires resolution.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onMatchInvoice(selectedInvoiceId);
                setConfirmationModalOpen(false);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Confirm Association
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}