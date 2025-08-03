import { useCompany } from '@/context/CompanyContext';
import { MontoLogo } from '@/components/MontoLogo';
import { cn } from '@/lib/utils';

interface CompanyLogoProps {
  collapsed?: boolean;
  className?: string;
}

export const CompanyLogo = ({ collapsed = false, className }: CompanyLogoProps) => {
  const { companyInfo } = useCompany();

  if (companyInfo.logoUrl) {
    return (
      <div className={cn(
        "flex items-center justify-center rounded-full overflow-hidden bg-muted shrink-0",
        collapsed ? "w-8 h-8" : "w-10 h-10",
        className
      )}>
        <img
          src={companyInfo.logoUrl}
          alt="Company Logo"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback to MontoLogo
  return (
    <div className={cn(
      "flex items-center justify-center shrink-0",
      collapsed ? "w-8 h-8" : "w-10 h-10",
      className
    )}>
      <MontoLogo 
        width={collapsed ? 24 : 32} 
        height={collapsed ? 24 : 32}
        className="text-primary"
      />
    </div>
  );
};