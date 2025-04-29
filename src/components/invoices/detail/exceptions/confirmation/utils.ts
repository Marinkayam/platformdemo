
import { formatDate } from "../../duplicate-table/utils";

export { formatDate };

export const isRecommendedInvoice = (invoice: { status: string; exceptions?: any[] }): boolean => {
  const exceptionCount = invoice.exceptions?.length || 0;
  const hasExceptions = exceptionCount > 0;
  return !hasExceptions && invoice.status === "Approved by Buyer";
};

