
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

  const handleUpdateCredentials = () => {
    // TODO: Implement navigation to edit agent credentials
    console.log('Update credentials for agent:', agent.id);
  };

  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 mt-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-sm">
            <span className="font-bold">❗</span> {issueMessage}
          </span>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="text-red-600 underline font-medium h-auto p-0"
          onClick={handleUpdateCredentials}
        >
          Update Credentials
        </Button>
      </div>
    </div>
  );
}
