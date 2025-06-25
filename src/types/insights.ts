
export interface Insight {
  id: string;
  supplier: string;
  buyer: string;
  openPOs: number;
  approvedInvoices: number;
  invoicesInRisk: number;
  paymentHabit: {
    dso: number; // Days Sales Outstanding
    terms: string; // Payment terms like "Net 30"
    score: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
}

export interface InsightFilters {
  search: string;
  supplier: string[];
  buyer: string[];
  paymentScore: string[];
}

export const defaultInsightFilters: InsightFilters = {
  search: '',
  supplier: [],
  buyer: [],
  paymentScore: []
};
