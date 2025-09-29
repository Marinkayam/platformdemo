
export interface PurchaseOrderFilters {
  status: string[];
  buyer: string[];
  portal: string[];
  poNumber: string;
  paymentTerms: string[];
  createdDate?: {
    from: string;
    to: string;
  };
  dueDate?: {
    from: string;
    to: string;
  };
}

export const defaultPurchaseOrderFilters: PurchaseOrderFilters = {
  status: [],
  buyer: [],
  portal: [],
  poNumber: "",
  paymentTerms: [],
  createdDate: { from: "", to: "" },
  dueDate: { from: "", to: "" }
};
