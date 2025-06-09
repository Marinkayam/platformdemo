
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Agent } from "@/types/smartConnection";

interface DeactivateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  agent: Agent | null;
}

export function DeactivateAgentModal({
  isOpen,
  onClose,
  onConfirm,
  agent
}: DeactivateAgentModalProps) {
  if (!agent) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate Agent</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate the agent for {agent.portalName}? 
            This will stop all automation for this portal connection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Deactivate Agent
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
