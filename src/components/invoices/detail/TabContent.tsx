
import { useState } from "react";
import { Activity } from "lucide-react";
import { ActivityTab } from "./ActivityTab";
import { RTPDataTab } from "./RTPDataTab";

interface TabContentProps {
  tab: string;
}

export function TabContent({ tab }: TabContentProps) {
  switch (tab) {
    case "exceptions":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No exceptions found for this invoice.</p>
        </div>
      );
    case "rtp-data":
      return <RTPDataTab />;
    case "portal-records":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No portal records found.</p>
        </div>
      );
    case "activity":
      return <ActivityTab />;
    default:
      return null;
  }
}
