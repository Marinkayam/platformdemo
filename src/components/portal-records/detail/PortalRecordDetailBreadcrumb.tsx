
import { Link } from "react-router-dom";
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
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/portal-records" className="text-grey-600 hover:text-primary-main">
                Portal Records
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-grey-900 font-medium">
              {portalRecordId || "Record Not Found"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
