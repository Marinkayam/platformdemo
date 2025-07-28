
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { WandSparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ExceptionBanners() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleConnectionHubClick = () => {
    navigate('/payments-relationships');
  };

  // For INV-10032355 (test-regular-2), show only Smart Connections exception in red
  if (id === "test-regular-2") {
    return (
      <>
        <ExceptionBanner 
          variant="error" 
          icon="alert"
          title="Smart Connections"
        >
          Portal scan agent credentials are missing: Resolve the exception by updating the scan agent details{" "}
          <button 
            onClick={handleConnectionHubClick}
            className="text-error-main underline hover:text-error-main/80 cursor-pointer"
          >
            here
          </button>
        </ExceptionBanner>
      </>
    );
  }

  // For other invoices, show both Smart Connection and Missing Data exceptions
  return (
    <>
      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="Smart Connection"
      >
        Portal scan agent credentials are missing: Resolve the exception by updating the scan agent details{" "}
        <button 
          onClick={handleConnectionHubClick}
          className="text-primary underline hover:text-primary/80 cursor-pointer"
        >
          here
        </button>
      </ExceptionBanner>

      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="Missing Data"
      >
        Required information is missing from the invoice's additional data: Invoice Date, Customer Name
      </ExceptionBanner>

      {/* Resolution guidance without background container */}
      <div className="flex items-start gap-3">
        <WandSparkles className="mt-0.5 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
        <div>
          <p style={{ color: '#38415F' }} className="text-sm">
            Manually filling required fields or upload new RTP with the correct data (optional)
          </p>
        </div>
      </div>
    </>
  );
}
