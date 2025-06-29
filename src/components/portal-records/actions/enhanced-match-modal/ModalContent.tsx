
import { PortalRecordDetails } from "../match-modal/PortalRecordDetails";
import { MatchExistingInvoiceTab } from "../match-modal/MatchExistingInvoiceTab";
import { PortalRecord } from "@/types/portalRecord";

interface ModalContentProps {
  isCompactMode: boolean;
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
  onMakePrimary: () => void;
  onMatchAndCreateRTP: () => void;
}

export function ModalContent({
  isCompactMode,
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
}: ModalContentProps) {
  if (isCompactMode) {
    return (
      <div className="space-y-6">
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
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          onMakePrimary={onMakePrimary}
          onMatchAndCreateRTP={onMatchAndCreateRTP}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-8">
      {/* Portal Record Details */}
      <div className="col-span-2">
        <PortalRecordDetails record={record} />
      </div>

      {/* Action Area */}
      <div className="col-span-3">
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
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          onMakePrimary={onMakePrimary}
          onMatchAndCreateRTP={onMatchAndCreateRTP}
        />
      </div>
    </div>
  );
}
