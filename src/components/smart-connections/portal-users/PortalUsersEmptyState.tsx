import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface PortalUsersEmptyStateProps {
  onAddPortalUser: () => void;
}

export function PortalUsersEmptyState({ onAddPortalUser }: PortalUsersEmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent className="space-y-4">
        <PlusCircle className="mx-auto h-12 w-12 text-grey-400" />
        <p className="text-lg font-medium text-grey-700">
          No portal users added yet.
        </p>
        <p className="text-grey-500">
          Add a portal login to start building your Smart Connections.
        </p>
        <Button onClick={onAddPortalUser}>
          + Add Portal User
        </Button>
      </CardContent>
    </Card>
  );
} 