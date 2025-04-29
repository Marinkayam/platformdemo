
import React from "react";
import { SmartConnectionAlert } from "./rtp/SmartConnectionAlert";
import { SmartConnectionCard } from "./rtp/SmartConnectionCard";
import { POInformationCard } from "./rtp/POInformationCard";
import { RelatedInvoicesTable } from "./rtp/RelatedInvoicesTable";
import { mockConnectionWithIssue, mockPOInformation, mockRelatedInvoices } from "./rtp/mockData";

export function RTPDataTab() {
  return (
    <div className="space-y-6">
      <SmartConnectionAlert exceptions={mockConnectionWithIssue.exceptions} />
      <SmartConnectionCard connection={mockConnectionWithIssue} />
      <POInformationCard po={mockPOInformation} />
      <RelatedInvoicesTable invoices={mockRelatedInvoices} />
    </div>
  );
}
