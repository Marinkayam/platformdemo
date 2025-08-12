
export interface PurchaseOrderFilters {
  status: string[];
  buyer: string[];
  portal: string[];
  poNumber: string;
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
  dueDate: { from: "", to: "" }
};
