
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { getAgentIssueMessage } from "@/utils/connectionIssues";

interface AgentIssueBannerProps {
  agent: Agent;
}

export function AgentIssueBanner({ agent }: AgentIssueBannerProps) {
  const issueMessage = getAgentIssueMessage(agent);
  
  if (!issueMessage) {
    return null;
  }

  const handleResolveIssue = () => {
    // TODO: Implement navigation to edit agent credentials
    console.log('Resolve issue for agent:', agent.id);
  };

  return (
    <div className="bg-destructive/10 text-destructive text-sm rounded-md pt-2 pl-4 pr-4 pb-2 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 stroke-red-600" />
          <span>
            {issueMessage}
          </span>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="text-destructive underline font-medium h-auto p-0 text-sm"
          onClick={handleResolveIssue}
        >
          Resolve issue
        </Button>
      </div>
    </div>
  );
}
