
import { useState, useEffect } from "react";
import { PortalRecord } from "@/types/portalRecord";
import { UseModalStateReturn } from "./types";

export function useModalState(record: PortalRecord): UseModalStateReturn {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortal, setSelectedPortal] = useState(record.portal);
  const [selectedBuyer, setSelectedBuyer] = useState(record.buyer);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const resetForm = () => {
    setSelectedInvoiceId("");
    setSearchTerm("");
    setUploadedFile(null);
    setSelectedPortal(record.portal);
    setSelectedBuyer(record.buyer);
  };

  return {
    selectedInvoiceId,
    setSelectedInvoiceId,
    searchTerm,
    setSearchTerm,
    selectedPortal,
    setSelectedPortal,
    selectedBuyer,
    setSelectedBuyer,
    uploadedFile,
    setUploadedFile,
    debouncedSearchTerm,
    resetForm,
  };
}
