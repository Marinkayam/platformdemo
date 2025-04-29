
import { Invoice } from "@/types/invoice";
import { Exception } from "@/types/exception";

export const getBasicInvoiceData = (
  id: string,
  number: string,
  buyer: string,
  dueDate: string,
  status: string,
  total: number,
  creationDate: string,
  owner: string,
  extras: Partial<Invoice> = {}
): Invoice => ({
  id,
  number,
  buyer,
  dueDate,
  status: status as Invoice['status'],
  total,
  creationDate,
  owner,
  currency: "USD",
  hasExceptions: extras.hasExceptions || false,
  ...extras
});
