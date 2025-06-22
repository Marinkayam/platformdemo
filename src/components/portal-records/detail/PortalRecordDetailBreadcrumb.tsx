
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight } from "lucide-react";

interface PortalRecordDetailBreadcrumbProps {
  portalRecordId?: string;
}

export function PortalRecordDetailBreadcrumb({ portalRecordId }: PortalRecordDetailBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="text-gray-600 hover:text-gray-900 p-0"
      >
        <Home className="h-4 w-4" />
      </Button>
      <ChevronRight className="h-4 w-4" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/portal-records")}
        className="text-gray-600 hover:text-gray-900 p-0"
      >
        Portal Records
      </Button>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">
        {portalRecordId || "Record Not Found"}
      </span>
    </div>
  );
}
