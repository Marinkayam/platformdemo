
import React from "react";
import { SmartConnectionAlert } from "./rtp/SmartConnectionAlert";
import { SmartConnectionCard } from "./rtp/SmartConnectionCard";
import { POInformationCard } from "./rtp/POInformationCard";
import { mockConnectionWithIssue, mockPOInformation } from "./rtp/mockData";

export function RTPDataTab() {
  return (
    <div className="space-y-6">
      <SmartConnectionAlert exceptions={mockConnectionWithIssue.exceptions} />
      <SmartConnectionCard connection={mockConnectionWithIssue} />
      <POInformationCard po={mockPOInformation} />
    </div>
  );
}
