
import React, { useMemo } from "react";
import { PurchaseOrderFilters as PurchaseOrderFiltersType } from "./filters/types";
import { usePurchaseOrderFiltersState } from "@/hooks/usePurchaseOrderFiltersState";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { DateRangePicker } from "@/components/invoices/filters/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { filterConfig } from "./filters/filterConfig";
import { purchaseOrderData } from "@/data/purchaseOrders";

interface PurchaseOrderFiltersProps {
  onFilterChange: (filters: PurchaseOrderFiltersType) => void;
}

export function PurchaseOrderFilters({ onFilterChange }: PurchaseOrderFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleResetFilters
  } = usePurchaseOrderFiltersState(onFilterChange);

  // Create filter options with counts
  const statusOptions: Option[] = useMemo(() => {
    return filterConfig.statusOptions.map(status => ({
      label: status,
      value: status,
      count: purchaseOrderData.filter(po => po.status === status).length
    }));
  }, []);

  const buyerOptions: Option[] = useMemo(() => {
    return filterConfig.buyerOptions.map(buyer => ({
      label: buyer,
      value: buyer,
      count: purchaseOrderData.filter(po => po.buyerName === buyer).length
    }));
  }, []);

  const portalOptions: Option[] = useMemo(() => {
    return filterConfig.portalOptions.map(portal => ({
      label: portal,
      value: portal,
      count: purchaseOrderData.filter(po => po.portal === portal).length
    }));
  }, []);

  const paymentTermsOptions: Option[] = useMemo(() => {
    return filterConfig.paymentTermsOptions.map(terms => ({
      label: terms,
      value: terms,
      count: purchaseOrderData.filter(po => po.paymentTerms === terms).length
    }));
  }, []);

  // Adapter functions for new filter system
  const handleStatusChange = (values: Set<string>) => {
    handleFilterChange('status', Array.from(values));
  };

  const handleBuyerChange = (values: Set<string>) => {
    handleFilterChange('buyer', Array.from(values));
  };

  const handlePortalChange = (values: Set<string>) => {
    handleFilterChange('portal', Array.from(values));
  };

  const handlePaymentTermsChange = (values: Set<string>) => {
    handleFilterChange('paymentTerms', Array.from(values));
  };

  const handleCreatedDateChange = (fromDate: string, toDate: string) => {
    handleFilterChange('createdDate', [fromDate, toDate]);
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('poNumber', value);
  };

  // Check if any filters are active
  const isFiltered =
    (Array.isArray(filters?.status) && filters.status.length > 0) ||
    (Array.isArray(filters?.buyer) && filters.buyer.length > 0) ||
    (Array.isArray(filters?.portal) && filters.portal.length > 0) ||
    (Array.isArray(filters?.paymentTerms) && filters.paymentTerms.length > 0) ||
    (filters?.createdDate && (filters.createdDate.from || filters.createdDate.to)) ||
    (filters?.poNumber !== "");

  return (
    <div className="flex items-center gap-2">
      {/* Status Filter */}
      <DataTableFacetedFilter
        title="Status"
        options={statusOptions}
        selectedValues={new Set(Array.isArray(filters?.status) ? filters.status : [])}
        onSelectionChange={handleStatusChange}
      />

      {/* Buyer Filter */}
      <DataTableFacetedFilter
        title="Buyer"
        options={buyerOptions}
        selectedValues={new Set(Array.isArray(filters?.buyer) ? filters.buyer : [])}
        onSelectionChange={handleBuyerChange}
      />

      {/* Portal Filter */}
      <DataTableFacetedFilter
        title="Portal"
        options={portalOptions}
        selectedValues={new Set(Array.isArray(filters?.portal) ? filters.portal : [])}
        onSelectionChange={handlePortalChange}
      />

      {/* Payment Terms Filter */}
      <DataTableFacetedFilter
        title="Payment Terms"
        options={paymentTermsOptions}
        selectedValues={new Set(Array.isArray(filters?.paymentTerms) ? filters.paymentTerms : [])}
        onSelectionChange={handlePaymentTermsChange}
      />

      {/* Portal Created Date Filter */}
      <DateRangePicker
        fromDate={filters?.createdDate?.from || ""}
        toDate={filters?.createdDate?.to || ""}
        onDateChange={handleCreatedDateChange}
        label="Portal Created Date"
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

export type { PurchaseOrderFiltersType };
