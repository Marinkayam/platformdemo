
import { motion } from "framer-motion";
import { FilterDropdown } from "./FilterDropdown";
import { DateRangePicker } from "./DateRangePicker";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { InvoiceFilters } from "./types";
import { filterConfig } from "./filterConfig";
import { useMemo } from "react";

interface FilterControlsProps {
  filters: InvoiceFilters;
  onFilterChange: (key: keyof InvoiceFilters, value: any) => void;
}

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  // Create filter options with counts (can be enhanced later with real counts)
  const statusOptions: Option[] = useMemo(() => {
    return filterConfig.statusOptions.map(status => ({
      label: status,
      value: status,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  const buyerOptions: Option[] = useMemo(() => {
    return filterConfig.buyerOptions.map(buyer => ({
      label: buyer,
      value: buyer,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  const portalOptions: Option[] = useMemo(() => {
    return filterConfig.portalOptions.map(portal => ({
      label: portal,
      value: portal,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  const transactionOptions: Option[] = useMemo(() => {
    return filterConfig.transactionOptions.map(transaction => ({
      label: transaction,
      value: transaction,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  const ownerOptions: Option[] = useMemo(() => {
    return filterConfig.ownerOptions.map(owner => ({
      label: owner,
      value: owner,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  const sourceOptions: Option[] = useMemo(() => {
    return filterConfig.sourceOptions.map(source => ({
      label: source,
      value: source,
      count: 0 // Can add real counts here if needed
    }));
  }, []);

  // Adapter functions for new filter system
  const handleStatusChange = (values: Set<string>) => {
    onFilterChange('status', Array.from(values));
  };

  const handleBuyerChange = (values: Set<string>) => {
    onFilterChange('buyer', Array.from(values));
  };

  const handlePortalChange = (values: Set<string>) => {
    onFilterChange('portal', Array.from(values));
  };

  const handleTransactionChange = (values: Set<string>) => {
    const value = Array.from(values)[0] || "All";
    onFilterChange('transactionType', value);
  };

  const handleOwnerChange = (values: Set<string>) => {
    onFilterChange('owner', Array.from(values));
  };

  const handleSourceChange = (values: Set<string>) => {
    onFilterChange('source', Array.from(values));
  };

  return (
    <div className="flex items-center gap-2">
      {/* Status Filter */}
      <DataTableFacetedFilter
        title="Status"
        options={statusOptions}
        selectedValues={new Set(Array.isArray(filters.status) ? filters.status : [])}
        onSelectionChange={handleStatusChange}
      />

      {/* Buyer Filter */}
      <DataTableFacetedFilter
        title="Buyer"
        options={buyerOptions}
        selectedValues={new Set(Array.isArray(filters.buyer) ? filters.buyer : [])}
        onSelectionChange={handleBuyerChange}
      />

      {/* Portal Filter */}
      <DataTableFacetedFilter
        title="Portal"
        options={portalOptions}
        selectedValues={new Set(Array.isArray(filters.portal) ? filters.portal : [])}
        onSelectionChange={handlePortalChange}
      />

      {/* Transaction Filter */}
      <DataTableFacetedFilter
        title="Transaction"
        options={transactionOptions}
        selectedValues={new Set(filters.transactionType && filters.transactionType !== "All" ? [filters.transactionType] : [])}
        onSelectionChange={handleTransactionChange}
      />

      {/* Owner Filter */}
      <DataTableFacetedFilter
        title="Owner"
        options={ownerOptions}
        selectedValues={new Set(Array.isArray(filters.owner) ? filters.owner : [])}
        onSelectionChange={handleOwnerChange}
      />

      {/* Source Filter */}
      <DataTableFacetedFilter
        title="Source"
        options={sourceOptions}
        selectedValues={new Set(Array.isArray(filters.source) ? filters.source : [])}
        onSelectionChange={handleSourceChange}
      />

      {/* Date Range Picker */}
      <DateRangePicker
        fromDate={filters.dueDate.from}
        toDate={filters.dueDate.to}
        onDateChange={(from, to) => onFilterChange("dueDate", { from, to })}
      />
    </div>
  );
}
