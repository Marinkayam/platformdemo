
import React from "react";
import { SmartConnectionCard } from "./rtp/SmartConnectionCard";
import { POInformationCard } from "./rtp/POInformationCard";
import { mockPOInformation } from "./rtp/mockData";
import { AdditionalInfo } from "./AdditionalInfo";
import { Attachments } from "./Attachments";
import { Invoice, Attachment } from "@/types/invoice";
import { mockSmartConnections } from "@/data/smartConnections"; // Add import

interface RTPDataTabProps {
  invoice?: Invoice;
  attachments?: Attachment[];
}

export function RTPDataTab({ invoice, attachments = [] }: RTPDataTabProps) {
  // Use first mockSmartConnections item for demo (matches SmartConnection type)
  const demoConnection = mockSmartConnections[0];
  return (
    <div className="space-y-6">
      <SmartConnectionCard connection={demoConnection} />
      <POInformationCard po={mockPOInformation} />
      {invoice && <AdditionalInfo invoice={invoice} />}
      <Attachments attachments={attachments} />
    </div>
  );
}
