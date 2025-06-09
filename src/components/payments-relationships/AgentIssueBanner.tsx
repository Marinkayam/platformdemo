
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
    <div className="bg-red-100 text-red-700 text-sm rounded-md py-2 px-4 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 stroke-red-500 mr-2" />
          <span>
            {issueMessage}
          </span>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="text-red-600 underline cursor-pointer font-medium h-auto p-0 text-sm ml-2"
          onClick={handleResolveIssue}
        >
          Resolve issue
        </Button>
      </div>
    </div>
  );
}
