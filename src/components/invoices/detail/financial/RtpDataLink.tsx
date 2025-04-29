
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useParams, useNavigate } from "react-router-dom";

export function RtpDataLink() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Function to navigate to RTP data tab
  const navigateToRtpTab = () => {
    // This will preserve the current URL path but update the tab
    navigate(`/invoices/${id}?tab=rtp-data`);
    
    // Dispatch a custom event that the parent component can listen to
    const rtpTabEvent = new CustomEvent('switchTab', { 
      detail: { tab: 'rtp-data' } 
    });
    window.dispatchEvent(rtpTabEvent);
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={navigateToRtpTab}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
          >
            RTP Data <ExternalLink className="ml-1 h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
