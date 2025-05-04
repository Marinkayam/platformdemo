
export interface InvoiceFilters {
  status: string[];
  total: string;
  dueDate: {
    from: string;
    to: string;
  };
  buyer: string[];
  portal: string[];
  transactionType: string;
  owner: string[];
  search: string;
}

export const defaultFilters: InvoiceFilters = {
  status: [],
  total: "All",
  dueDate: {
    from: "",
    to: ""
  },
  buyer: [],
  portal: [],
  transactionType: "All",
  owner: [],
  search: ""
};
