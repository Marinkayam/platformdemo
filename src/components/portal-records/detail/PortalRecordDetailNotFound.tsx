
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PortalRecordDetailBreadcrumb } from "./PortalRecordDetailBreadcrumb";

export function PortalRecordDetailNotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <PortalRecordDetailBreadcrumb />

      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/portal-records")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Portal Records
        </Button>
      </div>
      
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">📄</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Portal Record Not Found</h2>
        <p className="text-gray-600">The portal record you're looking for doesn't exist or may have been removed.</p>
      </div>
    </div>
  );
}
