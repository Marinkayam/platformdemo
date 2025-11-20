
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PortalRecordDetailBreadcrumbProps {
  portalRecordId?: string;
}

export function PortalRecordDetailBreadcrumb({ portalRecordId }: PortalRecordDetailBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/portal-records")}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal-records">
                  Portal Records
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {portalRecordId || "Record Not Found"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
