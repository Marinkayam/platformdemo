
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { PortalRecord } from "@/types/portalRecord";

interface UseModalHandlersProps {
  record: PortalRecord;
  selectedInvoiceId: string;
  uploadedFile: File | null;
  onMatch: (invoiceId: string) => void;
  onIgnore: () => void;
  onMatchAndCreateRTP: (pdfFile: File) => void;
  onClose: () => void;
  resetForm: () => void;
  setShowMatchConfirmModal: (show: boolean) => void;
  setShowIgnoreModal: (show: boolean) => void;
  setShowConfirmModal: (show: boolean) => void;
}

export function useModalHandlers({
  record,
  selectedInvoiceId,
  uploadedFile,
  onMatch,
  onIgnore,
  onMatchAndCreateRTP,
  onClose,
  resetForm,
  setShowMatchConfirmModal,
  setShowIgnoreModal,
  setShowConfirmModal,
}: UseModalHandlersProps) {
  const navigate = useNavigate();

  const handleMatch = () => {
    if (!selectedInvoiceId) {
      toast({
        title: "Selection Required",
        description: "Please select an invoice to match.",
        variant: "destructive",
      });
      return;
    }
    setShowMatchConfirmModal(true);
  };

  const confirmMatch = () => {
    onMatch(selectedInvoiceId);
    
    toast({
      title: "Invoice Successfully Matched!",
      description: `Portal record ${record.portalRecordId} has been matched with invoice ${selectedInvoiceId}.`,
      variant: "success",
    });
    
    setTimeout(() => {
      navigate('/portal-records');
    }, 1500);
    
    onClose();
    resetForm();
    setShowMatchConfirmModal(false);
  };

  const handleIgnore = () => {
    setShowIgnoreModal(true);
  };

  const handleIgnoreRecord = () => {
    onIgnore();
    setShowIgnoreModal(false);
    onClose();
    resetForm();
  };

  const handleStopTrackingBuyer = () => {
    console.log(`Stop tracking buyer: ${record.buyer}`);
    setShowIgnoreModal(false);
    onClose();
    resetForm();
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
    
    toast({
      title: "RTP Record Created!",
      description: `New RTP record has been created from uploaded invoice.`,
      variant: "success",
    });
    
    setTimeout(() => {
      navigate('/portal-records');
    }, 1500);
    
    onClose();
    resetForm();
  };

  const handleMakePrimary = () => {
    toast({
      title: "Record Made Primary",
      description: `${record.portalRecordId} has been made the primary record.`,
      variant: "success",
    });
    onClose();
    resetForm();
  };

  const handleCloseAttempt = () => {
    if (uploadedFile || selectedInvoiceId) {
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowConfirmModal(false);
    onClose();
    resetForm();
  };

  return {
    handleMatch,
    confirmMatch,
    handleIgnore,
    handleIgnoreRecord,
    handleStopTrackingBuyer,
    handleMatchAndCreateRTP,
    handleMakePrimary,
    handleCloseAttempt,
    confirmClose,
  };
}
