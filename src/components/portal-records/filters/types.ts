
export interface PortalRecordFilters {
  portal: string[];
  buyer: string[];
  status: string;
  type: string;
  transactionType: string;
  dueDate: {
    from: string;
    to: string;
  };
  recordType: string[];
  search: string;
}

export const defaultPortalRecordFilters: PortalRecordFilters = {
  portal: [],
  buyer: [],
  status: "All",
  type: "All",
  transactionType: "All",
  dueDate: {
    from: "",
    to: ""
  },
  recordType: [],
  search: ""
};
