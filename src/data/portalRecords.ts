
import { PortalRecord } from "@/types/portalRecord";

export const portalRecordsData: PortalRecord[] = [
  {
    id: "PR-001-INV3",
    portal: "Ariba",
    status: "Approved",
    matchType: "Primary",
    updated: "2024-01-15",
    conflict: false,
    invoiceNumber: "3"
  },
  {
    id: "PR-002-INV3",
    portal: "Coupa",
    status: "Paid",
    matchType: "Alternate",
    updated: "2024-01-14",
    conflict: true,
    invoiceNumber: "3"
  },
  {
    id: "PR-003-INV3",
    portal: "Bill",
    status: "Rejected",
    matchType: "Alternate",
    updated: "2024-01-13",
    conflict: false,
    invoiceNumber: "3"
  },
  {
    id: "PR-004-INV1",
    portal: "Ariba",
    status: "Approved",
    matchType: "Primary",
    updated: "2024-01-12",
    conflict: false,
    invoiceNumber: "1"
  },
  {
    id: "PR-005-INV2",
    portal: "Tipalti",
    status: "Pending",
    matchType: "Primary",
    updated: "2024-01-11",
    conflict: false,
    invoiceNumber: "2"
  }
];
