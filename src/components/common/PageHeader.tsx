
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-4 pb-2">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}
