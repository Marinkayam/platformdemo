
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { getAgentIssueMessage } from "@/utils/connectionIssues";
import { ExceptionBanner } from "@/components/ui/exception-banner";

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
    <div className="mt-3">
      <ExceptionBanner variant="error" icon="alert">
        <div className="flex items-center justify-between w-full">
          <span>{issueMessage}</span>
          <Button 
            variant="link" 
            size="sm" 
            className="text-error-main underline cursor-pointer font-medium h-auto p-0 text-sm ml-4"
            onClick={handleResolveIssue}
          >
            Resolve issue
          </Button>
        </div>
      </ExceptionBanner>
    </div>
  );
}
