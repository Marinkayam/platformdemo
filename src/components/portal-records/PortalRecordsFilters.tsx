
import React, { useMemo } from "react";
import { PortalRecordFilters } from "./filters/types";
import { DateRangePicker } from "@/components/invoices/filters/DateRangePicker";
import { usePortalRecordFiltersState } from "@/hooks/usePortalRecordFiltersState";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

interface PortalRecordsFiltersProps {
  onFilterChange: (filters: PortalRecordFilters) => void;
  needsAttentionCount: number;
}

export function PortalRecordsFilters({ onFilterChange }: PortalRecordsFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleSearchChange,
    handleResetFilters
  } = usePortalRecordFiltersState(onFilterChange);

  // Filter options (keeping original content)
  const portalOptions = ["SAP Ariba", "Coupa", "Bill.com", "Tipalti", "Oracle Procurement"];
  const buyerOptions = ["Acme Corporation", "Global Enterprises", "European Partners GmbH", "Tech Solutions Ltd", "Retail Chain Inc", "Manufacturing Co"];
  const statusOptions = ["Approved", "Paid", "Rejected", "Pending"];
  const transactionTypeOptions = ["Invoice", "Credit Note", "Debit Note", "Purchase Order"];
  const recordTypeOptions = ["Primary", "Alternate", "Unmatched", "Conflict"];

  // Create filter options with counts
  const portalFilterOptions: Option[] = useMemo(() => {
    return portalOptions.map(portal => ({
      label: portal,
      value: portal,
      count: 0
    }));
  }, []);

  const buyerFilterOptions: Option[] = useMemo(() => {
    return buyerOptions.map(buyer => ({
      label: buyer,
      value: buyer,
      count: 0
    }));
  }, []);

  const statusFilterOptions: Option[] = useMemo(() => {
    return statusOptions.map(status => ({
      label: status,
      value: status,
      count: 0
    }));
  }, []);

  const transactionFilterOptions: Option[] = useMemo(() => {
    return transactionTypeOptions.map(type => ({
      label: type,
      value: type,
      count: 0
    }));
  }, []);

  const recordTypeFilterOptions: Option[] = useMemo(() => {
    return recordTypeOptions.map(type => ({
      label: type,
      value: type,
      count: 0
    }));
  }, []);

  // Adapter functions for new filter system
  const handlePortalChange = (values: Set<string>) => {
    handleFilterChange('portal', Array.from(values));
  };

  const handleBuyerChange = (values: Set<string>) => {
    handleFilterChange('buyer', Array.from(values));
  };

  const handleStatusChange = (values: Set<string>) => {
    const value = Array.from(values)[0] || "All";
    handleFilterChange('status', value);
  };

  const handleTransactionChange = (values: Set<string>) => {
    const value = Array.from(values)[0] || "All";
    handleFilterChange('transactionType', value);
  };

  const handleRecordTypeChange = (values: Set<string>) => {
    handleFilterChange('recordType', Array.from(values));
  };

  const handleDateChange = (fromDate: string, toDate: string) => {
    handleFilterChange("dueDate", [fromDate ?? "", toDate ?? ""]);
  };

  // Check if any filters are active
  const isFiltered =
    (Array.isArray(filters.portal) && filters.portal.length > 0) ||
    (Array.isArray(filters.buyer) && filters.buyer.length > 0) ||
    (filters.status && filters.status !== "All") ||
    (filters.transactionType && filters.transactionType !== "All") ||
    (Array.isArray(filters.recordType) && filters.recordType.length > 0) ||
    (filters.dueDate?.from ?? "") !== "" ||
    (filters.dueDate?.to ?? "") !== "" ||
    (filters.search ?? "") !== "";

  return (
    <div className="flex items-center gap-2">
      {/* Portal Filter */}
      <DataTableFacetedFilter
        title="Portal"
        options={portalFilterOptions}
        selectedValues={new Set(Array.isArray(filters.portal) ? filters.portal : [])}
        onSelectionChange={handlePortalChange}
      />

      {/* Buyer Filter */}
      <DataTableFacetedFilter
        title="Buyer"
        options={buyerFilterOptions}
        selectedValues={new Set(Array.isArray(filters.buyer) ? filters.buyer : [])}
        onSelectionChange={handleBuyerChange}
      />

      {/* Status Filter */}
      <DataTableFacetedFilter
        title="Status"
        options={statusFilterOptions}
        selectedValues={new Set(filters.status && filters.status !== "All" ? [filters.status] : [])}
        onSelectionChange={handleStatusChange}
      />

      {/* Transaction Filter */}
      <DataTableFacetedFilter
        title="Transaction"
        options={transactionFilterOptions}
        selectedValues={new Set(filters.transactionType && filters.transactionType !== "All" ? [filters.transactionType] : [])}
        onSelectionChange={handleTransactionChange}
      />

      {/* Record Type Filter */}
      <DataTableFacetedFilter
        title="Record Type"
        options={recordTypeFilterOptions}
        selectedValues={new Set(Array.isArray(filters.recordType) ? filters.recordType : [])}
        onSelectionChange={handleRecordTypeChange}
      />

      {/* Date Range Picker */}
      <DateRangePicker
        fromDate={filters.dueDate.from}
        toDate={filters.dueDate.to}
        onDateChange={handleDateChange}
      />

      {/* Reset Button */}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
