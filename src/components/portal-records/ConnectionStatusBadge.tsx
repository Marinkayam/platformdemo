
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectionStatusBadgeProps {
  status: string;
  className?: string;
}

export function ConnectionStatusBadge({ status, className }: ConnectionStatusBadgeProps) {
  const handleMockLink = (action: string) => {
    alert(`Mock link: ${action}`);
  };

  const getTooltipContent = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return (
          <div className="space-y-2">
            <p className="font-medium">Monto successfully syncing this portal</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Manage:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMockLink("Portal Settings")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  ⚙️ Portal Settings
                </button>
                <button
                  onClick={() => handleMockLink("Sync History")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  📊 Sync History
                </button>
              </div>
            </div>
          </div>
        );
      case 'disconnected':
        return (
          <div className="space-y-2">
            <p className="font-medium">Portal login failed. Please update credentials.</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Fix:</p>
              <button
                onClick={() => handleMockLink("Go to Portal Settings")}
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                🔗 Go to Portal Settings
              </button>
            </div>
          </div>
        );
      case 'syncing':
        return (
          <div className="space-y-2">
            <p className="font-medium">Currently syncing data from portal</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Monitor:</p>
              <button
                onClick={() => handleMockLink("View Progress")}
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                📈 View Progress
              </button>
            </div>
          </div>
        );
      case 'in progress':
        return (
          <div className="space-y-2">
            <p className="font-medium">Sync operation in progress</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Monitor:</p>
              <button
                onClick={() => handleMockLink("View Details")}
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                🔍 View Details
              </button>
            </div>
          </div>
        );
      case 'partial':
        return (
          <div className="space-y-2">
            <p className="font-medium">Only some records syncing — review details</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">Actions:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMockLink("Review Issues")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔍 Review Issues
                </button>
                <button
                  onClick={() => handleMockLink("Retry Sync")}
                  className="text-blue-400 hover:text-blue-300 underline text-xs"
                >
                  🔄 Retry Sync
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <p>Connection status information</p>
          </div>
        );
    }
  };

  const getDisplayText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return "Connected";
      case 'disconnected':
        return "Disconnected";
      case 'syncing':
        return "Syncing";
      case 'in progress':
        return "In Progress";
      case 'partial':
        return "Partial";
      default:
        return status;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <StatusBadge status={getDisplayText(status)} className={className} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipContent(status)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
