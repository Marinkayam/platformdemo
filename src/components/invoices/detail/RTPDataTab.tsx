
import React from "react";
import { SmartConnectionCard } from "./rtp/SmartConnectionCard";
import { POInformationCard } from "./rtp/POInformationCard";
import { mockConnectionWithIssue, mockPOInformation } from "./rtp/mockData";
import { AdditionalInfo } from "./AdditionalInfo";
import { Attachments } from "./Attachments";
import { Invoice, Attachment } from "@/types/invoice";

interface RTPDataTabProps {
  invoice?: Invoice;
  attachments?: Attachment[];
}

export function RTPDataTab({ invoice, attachments = [] }: RTPDataTabProps) {
  return (
    <div className="space-y-6">
      <SmartConnectionCard connection={mockConnectionWithIssue} />
      <POInformationCard po={mockPOInformation} />
      {invoice && <AdditionalInfo invoice={invoice} />}
      <Attachments attachments={attachments} />
    </div>
  );
}
