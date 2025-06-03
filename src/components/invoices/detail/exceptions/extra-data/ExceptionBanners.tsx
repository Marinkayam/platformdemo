
import { TriangleAlert, Lightbulb } from "lucide-react";

export function ExceptionBanners() {
  return (
    <>
      {/* Exception Alert Banner */}
      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
        <div className="flex items-start gap-3">
          <TriangleAlert 
            strokeWidth={1.25} 
            className="mt-1 flex-shrink-0 text-red-600" 
            size={18} 
          />
          <div>
            <p className="text-gray-900 text-sm">
              <span className="font-semibold">Missing Data:</span> Required information is missing from the invoice's additional data: Invoice Date, Customer Name
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Lightbulb 
            strokeWidth={1.25} 
            className="mt-1 flex-shrink-0 text-blue-600" 
            size={18} 
          />
          <div>
            <p className="text-gray-900 text-sm">
              <span className="font-semibold">Resolve this issue by</span> Manually filling required fields Or Upload New RTP with the correct Data (Optional)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
