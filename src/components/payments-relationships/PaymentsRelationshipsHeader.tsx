
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SmartConnectionsHeaderProps {
  activeTab?: string;
  onAddPortalUser?: () => void;
}

export function PaymentsRelationshipsHeader({ activeTab = "smart-connections", onAddPortalUser }: SmartConnectionsHeaderProps) {
  const navigate = useNavigate();

  if (activeTab === "scan-agents") {
    return (
      <Button onClick={onAddPortalUser}>
        <Plus className="w-4 h-4 mr-2" />
        Add Scan Agent
      </Button>
    );
  }

  return (
    <Button onClick={() => navigate("/payments-relationships/new")}>
      <Plus className="w-4 h-4 mr-2" />
      Add new SC
    </Button>
  );
}
