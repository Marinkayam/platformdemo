import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { toast } from "@/hooks/use-toast";
import { FileText, Upload, AlertTriangle, Calendar, DollarSign, Building2, Hash, Eye, EyeOff } from "lucide-react";

interface EnhancedMatchInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onMatch: (invoiceId: string) => void;
  onIgnore: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
  contextSource?: 'detail-page' | 'table-row' | 'dashboard';
}

export function EnhancedMatchInvoiceModal({ 
  isOpen, 
  onClose, 
  record, 
  onMatch, 
  onIgnore,
  onMatchAndCreateRTP,
  contextSource = 'table-row'
}: EnhancedMatchInvoiceModalProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState(record.portal);
  const [selectedBuyer, setSelectedBuyer] = useState(record.buyer);
  const [activeTab, setActiveTab] = useState("match-existing");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  
  // Create RTP form fields
  const [rtpInvoiceNumber, setRtpInvoiceNumber] = useState("");
  const [rtpInvoiceDate, setRtpInvoiceDate] = useState("");
  const [rtpAmount, setRtpAmount] = useState(record.total.toString());
  const [rtpPoNumber, setRtpPoNumber] = useState(record.poNumber);

  // Enhanced search with debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter invoices with enhanced search
  const filteredInvoices = useMemo(() => {
    return invoiceData.filter(invoice => {
      const matchesBuyer = invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase());
      const matchesSearch = debouncedSearchTerm === "" || 
        invoice.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.buyer.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        invoice.number?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesBuyer && matchesSearch;
    });
  }, [selectedBuyer, debouncedSearchTerm]);

  const selectedInvoice = filteredInvoices.find(inv => inv.id === selectedInvoiceId);
  
  // Check for conflicts
  const hasConflict = selectedInvoice && invoiceData.some(inv => 
    inv.id === selectedInvoiceId && inv.status !== 'Pending Action'
  );

  const handleMatch = () => {
    if (!selectedInvoiceId) {
      toast({
        title: "Selection Required",
        description: "Please select an invoice to match.",
        variant: "destructive",
      });
      return;
    }
    onMatch(selectedInvoiceId);
    onClose();
    resetForm();
  };

  const handleIgnore = () => {
    onIgnore();
    toast({
      title: "Record Ignored",
      description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
    });
    onClose();
    resetForm();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleMatchAndCreateRTP = () => {
    if (!uploadedFile) {
      toast({
        title: "PDF Required",
        description: "Please upload an invoice PDF to create RTP.",
        variant: "destructive",
      });
      return;
    }
    
    if (!rtpInvoiceNumber.trim()) {
      toast({
        title: "Invoice Number Required",
        description: "Please enter an invoice number.",
        variant: "destructive",
      });
      return;
    }

    if (!rtpInvoiceDate) {
      toast({
        title: "Invoice Date Required",
        description: "Please select an invoice date.",
        variant: "destructive",
      });
      return;
    }

    onMatchAndCreateRTP(uploadedFile);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedInvoiceId("");
    setSearchTerm("");
    setUploadedFile(null);
    setRtpInvoiceNumber("");
    setRtpInvoiceDate("");
    setRtpAmount(record.total.toString());
    setRtpPoNumber(record.poNumber);
    setActiveTab("match-existing");
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Determine if we should show the compact layout
  const isCompactMode = contextSource === 'detail-page';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isCompactMode ? 'max-w-4xl' : 'max-w-7xl'} max-h-[95vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Match Portal Record - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        {isCompactMode ? (
          // Compact mode layout for detail page
          <div className="space-y-6">
            {/* Compact Summary Bar */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-blue-900">Matching:</span>
                  <span className="font-mono">{record.portalRecordId}</span>
                  <span>·</span>
                  <span className="font-semibold">{formatCurrency(record.total, record.currency)}</span>
                  <span>·</span>
                  <span>{record.portal}</span>
                  <span>·</span>
                  <span>{record.buyer}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPdfPreview(!showPdfPreview)}
                >
                  {showPdfPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPdfPreview ? 'Hide' : 'Preview'} PDF
                </Button>
              </div>
              
              {/* PDF Preview in compact mode */}
              {showPdfPreview && (
                <div className="mt-4 border-t pt-4">
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Portal Record Document Preview</p>
                    <p className="text-xs text-gray-400">PDF viewer would be implemented here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Full-width Action Area */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Options</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="match-existing">Match Existing Invoice</TabsTrigger>
                    <TabsTrigger value="create-rtp" className="relative">
                      Create RTP
                      <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="match-existing" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="portal-filter">Portal Filter</Label>
                        <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={record.portal}>{record.portal}</SelectItem>
                            <SelectItem value="All Portals">All Portals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buyer-filter">Buyer Filter</Label>
                        <Input
                          id="buyer-filter"
                          value={selectedBuyer}
                          onChange={(e) => setSelectedBuyer(e.target.value)}
                          placeholder="Search buyer name..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="search-invoices">Search Invoices</Label>
                      <Input
                        id="search-invoices"
                        placeholder="Search by invoice ID, number, or buyer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">
                        Only showing invoices from {selectedPortal} + {selectedBuyer}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="select-invoice">Select Invoice</Label>
                      <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an invoice..." />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredInvoices.map((invoice) => (
                            <SelectItem key={invoice.id} value={invoice.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{invoice.id} - {invoice.number}</span>
                                <span className="text-xs text-gray-500">
                                  {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conflict Warning */}
                    {hasConflict && (
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          <strong>Conflict Detected:</strong> This invoice is already linked to another portal record. 
                          Matching will replace the existing link and may create a conflict.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Selected Invoice Details */}
                    {selectedInvoice && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Selected Invoice Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-gray-700">Invoice ID:</span>
                              <p className="font-mono">{selectedInvoice.id}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Status:</span>
                              <p className="capitalize">{selectedInvoice.status}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Amount:</span>
                              <p className="font-semibold">{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Due Date:</span>
                              <p>{selectedInvoice.dueDate}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Buyer:</span>
                              <p>{selectedInvoice.buyer}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Owner:</span>
                              <p>{selectedInvoice.owner}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="create-rtp" className="space-y-6 mt-6">
                    {/* PDF Upload Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-base font-medium">Invoice PDF Upload</Label>
                        <span className="text-red-500">*</span>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Upload Invoice PDF to create matching RTP</p>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="pdf-upload"
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => document.getElementById('pdf-upload')?.click()}
                            className="mt-2"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Choose PDF File
                          </Button>
                          {uploadedFile && (
                            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                              <p className="text-sm text-green-800 font-medium">
                                ✓ {uploadedFile.name} selected ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RTP Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rtp-invoice-number">
                          Invoice Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="rtp-invoice-number"
                          value={rtpInvoiceNumber}
                          onChange={(e) => setRtpInvoiceNumber(e.target.value)}
                          placeholder="Enter invoice number..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rtp-invoice-date">
                          Invoice Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="rtp-invoice-date"
                          type="date"
                          value={rtpInvoiceDate}
                          onChange={(e) => setRtpInvoiceDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rtp-amount">Amount</Label>
                        <Input
                          id="rtp-amount"
                          value={rtpAmount}
                          onChange={(e) => setRtpAmount(e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rtp-po-number">PO Number</Label>
                        <Input
                          id="rtp-po-number"
                          value={rtpPoNumber}
                          onChange={(e) => setRtpPoNumber(e.target.value)}
                          placeholder="PO number..."
                        />
                      </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        Creating an RTP will generate a new Request to Pay record that matches this portal record.
                        All required fields must be completed before proceeding.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Original two-column layout for other contexts
          <div className="grid grid-cols-5 gap-6">
            {/* Portal Record Details - Enhanced */}
            <div className="col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Portal Record Details</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPdfPreview(!showPdfPreview)}
                      >
                        {showPdfPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showPdfPreview ? 'Hide' : 'Preview'} PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">Record ID:</span>
                      </div>
                      <p className="text-gray-900 font-mono">{record.portalRecordId}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">Portal:</span>
                      </div>
                      <p className="text-gray-900">{record.portal}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-gray-600">Buyer:</span>
                      <p className="text-gray-900">{record.buyer}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">Amount:</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">{formatCurrency(record.total, record.currency)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-gray-600">PO Number:</span>
                      <p className="text-gray-900 font-mono">{record.poNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-gray-600">Supplier:</span>
                      <p className="text-gray-900">{record.supplierName}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Last Synced:</span>
                      </div>
                      <p className="text-gray-900">{formatDate(record.lastSynced)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-gray-600">Currency:</span>
                      <p className="text-gray-900">{record.currency}</p>
                    </div>
                  </div>

                  {/* PDF Preview Section */}
                  {showPdfPreview && (
                    <div className="border-t pt-4">
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Portal Record Document Preview</p>
                        <p className="text-xs text-gray-400">PDF viewer would be implemented here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Area - Enhanced */}
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Match Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="match-existing">Match Existing Invoice</TabsTrigger>
                      <TabsTrigger value="create-rtp" className="relative">
                        Create RTP
                        <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="match-existing" className="space-y-6 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="portal-filter">Portal Filter</Label>
                          <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={record.portal}>{record.portal}</SelectItem>
                              <SelectItem value="All Portals">All Portals</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buyer-filter">Buyer Filter</Label>
                          <Input
                            id="buyer-filter"
                            value={selectedBuyer}
                            onChange={(e) => setSelectedBuyer(e.target.value)}
                            placeholder="Search buyer name..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="search-invoices">Search Invoices</Label>
                        <Input
                          id="search-invoices"
                          placeholder="Search by invoice ID, number, or buyer..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          Only showing invoices from {selectedPortal} + {selectedBuyer}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="select-invoice">Select Invoice</Label>
                        <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an invoice..." />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredInvoices.map((invoice) => (
                              <SelectItem key={invoice.id} value={invoice.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{invoice.id} - {invoice.number}</span>
                                  <span className="text-xs text-gray-500">
                                    {invoice.buyer} • {formatCurrency(invoice.total, invoice.currency || 'USD')} • {invoice.dueDate}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Conflict Warning */}
                      {hasConflict && (
                        <Alert className="border-amber-200 bg-amber-50">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-800">
                            <strong>Conflict Detected:</strong> This invoice is already linked to another portal record. 
                            Matching will replace the existing link and may create a conflict.
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Selected Invoice Details */}
                      {selectedInvoice && (
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Selected Invoice Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-medium text-gray-700">Invoice ID:</span>
                                <p className="font-mono">{selectedInvoice.id}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Status:</span>
                                <p className="capitalize">{selectedInvoice.status}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Amount:</span>
                                <p className="font-semibold">{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Due Date:</span>
                                <p>{selectedInvoice.dueDate}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Buyer:</span>
                                <p>{selectedInvoice.buyer}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Owner:</span>
                                <p>{selectedInvoice.owner}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="create-rtp" className="space-y-6 mt-6">
                      {/* PDF Upload Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-base font-medium">Invoice PDF Upload</Label>
                          <span className="text-red-500">*</span>
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">Upload Invoice PDF to create matching RTP</p>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="pdf-upload"
                            />
                            <Button 
                              variant="outline" 
                              onClick={() => document.getElementById('pdf-upload')?.click()}
                              className="mt-2"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Choose PDF File
                            </Button>
                            {uploadedFile && (
                              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-800 font-medium">
                                  ✓ {uploadedFile.name} selected ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RTP Form Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rtp-invoice-number">
                            Invoice Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="rtp-invoice-number"
                            value={rtpInvoiceNumber}
                            onChange={(e) => setRtpInvoiceNumber(e.target.value)}
                            placeholder="Enter invoice number..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rtp-invoice-date">
                            Invoice Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="rtp-invoice-date"
                            type="date"
                            value={rtpInvoiceDate}
                            onChange={(e) => setRtpInvoiceDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rtp-amount">Amount</Label>
                          <Input
                            id="rtp-amount"
                            value={rtpAmount}
                            onChange={(e) => setRtpAmount(e.target.value)}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rtp-po-number">PO Number</Label>
                          <Input
                            id="rtp-po-number"
                            value={rtpPoNumber}
                            onChange={(e) => setRtpPoNumber(e.target.value)}
                            placeholder="PO number..."
                          />
                        </div>
                      </div>

                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          Creating an RTP will generate a new Request to Pay record that matches this portal record.
                          All required fields must be completed before proceeding.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handleIgnore} 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Ignore Record
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="text-gray-600">
              Cancel
            </Button>
            {activeTab === "match-existing" ? (
              <Button 
                onClick={handleMatch}
                disabled={!selectedInvoiceId}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Match Invoice
              </Button>
            ) : (
              <Button 
                onClick={handleMatchAndCreateRTP}
                disabled={!uploadedFile || !rtpInvoiceNumber.trim() || !rtpInvoiceDate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Match & Create RTP
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
