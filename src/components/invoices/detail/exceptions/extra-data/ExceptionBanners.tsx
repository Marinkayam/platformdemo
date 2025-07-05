
import { ExceptionBanner } from "@/components/ui/exception-banner";

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

      <ExceptionBanner 
        variant="info" 
        icon="lightbulb"
        title="Resolve this issue by"
      >
        Manually filling required fields Or Upload New RTP with the correct Data (Optional)
      </ExceptionBanner>
    </>
  );
}
