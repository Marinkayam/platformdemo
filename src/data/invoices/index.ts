
import { pendingInvoices } from "./pending";
import { paidInvoices } from "./paid";
import { settledInvoices } from "./settled";
import { awaitingInvoices } from "./awaiting";
import { excludedInvoices } from "./excluded";
import { rtpInvoices } from "./rtp";
import { rejectedInvoices } from "./rejected";
import { approvedInvoices } from "./approved";
import { externalInvoices } from "./external";
import { partiallySettledInvoices } from "./partially-settled";

export const invoiceData = [
  ...pendingInvoices,
  ...paidInvoices,
  ...settledInvoices,
  ...awaitingInvoices,
  ...excludedInvoices,
  ...rtpInvoices,
  ...rejectedInvoices,
  ...approvedInvoices,
  ...externalInvoices,
  ...partiallySettledInvoices
];
