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
        collapsed ? "w-7 h-7" : "w-9 h-9",
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
      collapsed ? "w-7 h-7" : "w-9 h-9",
      className
    )}>
      <MontoLogo 
        width={collapsed ? 20 : 28} 
        height={collapsed ? 20 : 28}
        className="text-primary"
      />
    </div>
  );
};