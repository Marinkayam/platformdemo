
import { PortalRecord } from "@/types/portalRecord";
import { generatePortalRecordsData } from "./portalRecords/generator";
import { demoRecords } from "./portalRecords/demoData";
import { invoiceSpecificRecords } from "./portalRecords/invoiceSpecificData";

// Generate portal records for all invoices
export const portalRecordsData: PortalRecord[] = generatePortalRecordsData();

// Export combined demo records and invoice-specific records
export const allPortalRecords = [...demoRecords, ...invoiceSpecificRecords];
