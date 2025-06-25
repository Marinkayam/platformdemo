
import { useState, useMemo, useCallback } from "react";
import { Insight, InsightFilters, defaultInsightFilters } from "@/types/insights";

export function useInsightFiltering(data: Insight[]) {
  const [filters, setFilters] = useState<InsightFilters>(defaultInsightFilters);

  const filteredInsights = useMemo(() => {
    let filtered = [...data];

    // Apply supplier filter
    if (filters.supplier.length > 0) {
      filtered = filtered.filter(insight => filters.supplier.includes(insight.supplier));
    }

    // Apply buyer filter
    if (filters.buyer.length > 0) {
      filtered = filtered.filter(insight => filters.buyer.includes(insight.buyer));
    }

    // Apply payment score filter
    if (filters.paymentScore.length > 0) {
      filtered = filtered.filter(insight => filters.paymentScore.includes(insight.paymentHabit.score));
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(insight =>
        insight.supplier.toLowerCase().includes(searchLower) ||
        insight.buyer.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [data, filters]);

  const handleFilterChange = useCallback((key: keyof InsightFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultInsightFilters);
  }, []);

  return {
    filters,
    filteredInsights,
    handleFilterChange,
    handleResetFilters
  };
}
