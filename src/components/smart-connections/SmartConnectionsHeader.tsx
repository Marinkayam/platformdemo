
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SmartConnectionsHeaderProps {
  activeTab?: string;
  onAddPortalUser?: () => void;
}

export function SmartConnectionsHeader({ activeTab = "smart-connections", onAddPortalUser }: SmartConnectionsHeaderProps) {
  const navigate = useNavigate();

  if (activeTab === "portal-users") {
    return (
      <Button onClick={onAddPortalUser}>
        <Plus className="w-4 h-4 mr-2" />
        Add Portal User
      </Button>
    );
  }

  return (
    <Button onClick={() => navigate("/smart-connections/new")}>
      <Plus className="w-4 h-4 mr-2" />
      New Smart Connection
    </Button>
  );
}
