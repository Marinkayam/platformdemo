
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalRecord } from "@/types/portalRecord";
import { invoiceData } from "@/data/invoices";
import { toast } from "@/hooks/use-toast";
import { FileText, Upload } from "lucide-react";

interface EnhancedMatchInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onMatch: (invoiceId: string) => void;
  onIgnore: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
}

export function EnhancedMatchInvoiceModal({ 
  isOpen, 
  onClose, 
  record, 
  onMatch, 
  onIgnore,
  onMatchAndCreateRTP 
}: EnhancedMatchInvoiceModalProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState(record.portal);
  const [selectedBuyer, setSelectedBuyer] = useState(record.buyer);
  const [activeTab, setActiveTab] = useState("match-existing");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Filter invoices based on portal and buyer
  const availableInvoices = invoiceData.filter(invoice => 
    invoice.buyer.toLowerCase().includes(selectedBuyer.toLowerCase()) &&
    (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.buyer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedInvoice = availableInvoices.find(inv => inv.id === selectedInvoiceId);

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
  };

  const handleIgnore = () => {
    onIgnore();
    toast({
      title: "Record Ignored",
      description: `Portal record ${record.portalRecordId} will no longer be monitored.`,
    });
    onClose();
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
    onMatchAndCreateRTP(uploadedFile);
    onClose();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Match Portal Record - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Portal Record Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portal Record Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Record ID:</span>
                  <p className="text-gray-900">{record.portalRecordId}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Portal:</span>
                  <p className="text-gray-900">{record.portal}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Buyer:</span>
                  <p className="text-gray-900">{record.buyer}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Amount:</span>
                  <p className="text-gray-900 font-semibold">{formatCurrency(record.total, record.currency)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">PO Number:</span>
                  <p className="text-gray-900">{record.poNumber}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Supplier:</span>
                  <p className="text-gray-900">{record.supplierName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="match-existing">Match Existing</TabsTrigger>
                  <TabsTrigger value="create-rtp">Create RTP</TabsTrigger>
                </TabsList>

                <TabsContent value="match-existing" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Portal Filter</Label>
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
                      <div>
                        <Label>Buyer Filter</Label>
                        <Input
                          value={selectedBuyer}
                          onChange={(e) => setSelectedBuyer(e.target.value)}
                          placeholder="Buyer name..."
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Search Invoices</Label>
                      <Input
                        placeholder="Search by invoice ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Select Invoice</Label>
                      <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an invoice..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableInvoices.map((invoice) => (
                            <SelectItem key={invoice.id} value={invoice.id}>
                              {invoice.id} - {invoice.buyer} - {formatCurrency(invoice.total, invoice.currency || 'USD')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedInvoice && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-base">Selected Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium">Invoice ID:</span> {selectedInvoice.id}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {selectedInvoice.status}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> {formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}
                            </div>
                            <div>
                              <span className="font-medium">Due Date:</span> {selectedInvoice.dueDate}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="create-rtp" className="space-y-4">
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
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
                      <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()}>
                        <FileText className="h-4 w-4 mr-2" />
                        Choose PDF File
                      </Button>
                      {uploadedFile && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {uploadedFile.name} selected
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleIgnore} className="text-red-600 hover:text-red-700">
            Ignore Record
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {activeTab === "match-existing" ? (
              <Button onClick={handleMatch}>
                Match Invoice
              </Button>
            ) : (
              <Button onClick={handleMatchAndCreateRTP}>
                Match & Create RTP
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
