
interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-[32px] font-semibold text-gray-900">{title}</h1>
      <p className="text-[16px] text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}
