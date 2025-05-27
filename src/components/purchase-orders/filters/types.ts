
export interface PurchaseOrderFilters {
  status: string[];
  buyer: string[];
  portal: string[];
  poNumber: string;
}

export const defaultPurchaseOrderFilters: PurchaseOrderFilters = {
  status: [],
  buyer: [],
  portal: [],
  poNumber: ""
};
