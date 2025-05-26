
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
import { useToast } from "@/hooks/use-toast";

interface DeactivateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
}

export function DeactivateAgentModal({ isOpen, onClose, agent }: DeactivateAgentModalProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    if (agent) {
      // Here you would typically make an API call to deactivate the agent
      console.log("Deactivating agent:", agent.id);
      
      toast({
        description: `Agent "${agent.portalName}" has been deactivated successfully.`,
        duration: 3000,
      });
      
      onClose();
    }
  };

  if (!agent) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border shadow-lg z-50">
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate Agent</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate the agent "{agent.portalName}"? 
            This action will stop all activities for this agent until it is reactivated.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Deactivate Agent
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
