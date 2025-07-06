
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { WandSparkles } from "lucide-react";

export function ExceptionBanners() {
  return (
    <>
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
