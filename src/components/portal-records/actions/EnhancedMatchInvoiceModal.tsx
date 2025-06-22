
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { CompactSummaryBar } from "./match-modal/CompactSummaryBar";
import { PortalRecordDetails } from "./match-modal/PortalRecordDetails";
import { MatchExistingInvoiceTab } from "./match-modal/MatchExistingInvoiceTab";
import { CreateRTPTab } from "./match-modal/CreateRTPTab";
import { MatchModalActions } from "./match-modal/MatchModalActions";

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
            <CompactSummaryBar record={record} />

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

                  <TabsContent value="match-existing">
                    <MatchExistingInvoiceTab
                      record={record}
                      selectedInvoiceId={selectedInvoiceId}
                      setSelectedInvoiceId={setSelectedInvoiceId}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedPortal={selectedPortal}
                      setSelectedPortal={setSelectedPortal}
                      selectedBuyer={selectedBuyer}
                      setSelectedBuyer={setSelectedBuyer}
                      debouncedSearchTerm={debouncedSearchTerm}
                    />
                  </TabsContent>

                  <TabsContent value="create-rtp">
                    <CreateRTPTab
                      record={record}
                      uploadedFile={uploadedFile}
                      setUploadedFile={setUploadedFile}
                      rtpInvoiceNumber={rtpInvoiceNumber}
                      setRtpInvoiceNumber={setRtpInvoiceNumber}
                      rtpInvoiceDate={rtpInvoiceDate}
                      setRtpInvoiceDate={setRtpInvoiceDate}
                      rtpAmount={rtpAmount}
                      setRtpAmount={setRtpAmount}
                      rtpPoNumber={rtpPoNumber}
                      setRtpPoNumber={setRtpPoNumber}
                      onFileUpload={handleFileUpload}
                    />
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
              <PortalRecordDetails record={record} />
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

                    <TabsContent value="match-existing">
                      <MatchExistingInvoiceTab
                        record={record}
                        selectedInvoiceId={selectedInvoiceId}
                        setSelectedInvoiceId={setSelectedInvoiceId}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedPortal={selectedPortal}
                        setSelectedPortal={setSelectedPortal}
                        selectedBuyer={selectedBuyer}
                        setSelectedBuyer={setSelectedBuyer}
                        debouncedSearchTerm={debouncedSearchTerm}
                      />
                    </TabsContent>

                    <TabsContent value="create-rtp">
                      <CreateRTPTab
                        record={record}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        rtpInvoiceNumber={rtpInvoiceNumber}
                        setRtpInvoiceNumber={setRtpInvoiceNumber}
                        rtpInvoiceDate={rtpInvoiceDate}
                        setRtpInvoiceDate={setRtpInvoiceDate}
                        rtpAmount={rtpAmount}
                        setRtpAmount={setRtpAmount}
                        rtpPoNumber={rtpPoNumber}
                        setRtpPoNumber={setRtpPoNumber}
                        onFileUpload={handleFileUpload}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <MatchModalActions
          activeTab={activeTab}
          selectedInvoiceId={selectedInvoiceId}
          uploadedFile={uploadedFile}
          rtpInvoiceNumber={rtpInvoiceNumber}
          rtpInvoiceDate={rtpInvoiceDate}
          onClose={onClose}
          onIgnore={handleIgnore}
          onMatch={handleMatch}
          onMatchAndCreateRTP={handleMatchAndCreateRTP}
        />
      </DialogContent>
    </Dialog>
  );
}
