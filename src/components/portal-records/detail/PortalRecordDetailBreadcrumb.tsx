
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
  matchType?: string;
  matchStatus?: string;
}

export function PortalRecordDetailBreadcrumb({ portalRecordId, matchType, matchStatus }: PortalRecordDetailBreadcrumbProps) {
  const navigate = useNavigate();

  // Determine the category based on match type/status
  const getCategoryInfo = () => {
    if (matchType === 'Unmatched' || matchStatus === 'Unmatched') {
      return { label: 'Found Without Match', href: '/portal-records?tab=unmatched' };
    }
    if (matchType === 'Conflict' || matchStatus === 'Conflicted') {
      return { label: 'Conflicts', href: '/portal-records?tab=conflict' };
    }
    // Default to Matched Records
    return { label: 'Matched Records', href: '/portal-records' };
  };

  const category = getCategoryInfo();

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
              <BreadcrumbLink asChild>
                <Link to={category.href}>
                  {category.label}
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
