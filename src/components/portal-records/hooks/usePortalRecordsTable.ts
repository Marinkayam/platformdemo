import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalRecord } from "@/types/portalRecord";

export function usePortalRecordsTable(records: PortalRecord[]) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Modal states
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PortalRecord | null>(null);

  // Sort records to prioritize unmatched and conflict records
  const sortedRecords = [...records].sort((a, b) => {
    const priorityOrder = { 'Unmatched': 0, 'Conflict': 1, 'Primary': 2, 'Alternate': 3 };
    const aPriority = priorityOrder[a.matchType] ?? 4;
    const bPriority = priorityOrder[b.matchType] ?? 4;
    return aPriority - bPriority;
  });

  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulate loading delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setVisibleCount(prev => Math.min(prev + 10, sortedRecords.length));
    setIsLoadingMore(false);
  };

  const handleViewDetails = (recordId: string) => {
    navigate(`/portal-records/${recordId}`);
  };

  const handleRowClick = (record: PortalRecord) => {
    navigate(`/portal-records/${record.id}`);
  };

  return {
    visibleRecords,
    sortedRecords,
    hasMore,
    isLoadingMore,
    visibleCount,
    matchModalOpen,
    setMatchModalOpen,
    conflictModalOpen,
    setConflictModalOpen,
    ignoreModalOpen,
    setIgnoreModalOpen,
    selectedRecord,
    setSelectedRecord,
    handleLoadMore,
    handleViewDetails,
    handleRowClick,
  };
}