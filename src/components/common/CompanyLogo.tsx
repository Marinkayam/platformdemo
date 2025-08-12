import { useCompany } from '@/context/CompanyContext';
import { PlaceholderLogo } from '@/components/icons/PlaceholderLogo';
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
          style={{
            width: collapsed ? '28px' : '36px',
            height: collapsed ? '28px' : '36px'
          }}
          loading="eager"
        />
      </div>
    );
  }

  // Fallback to PlaceholderLogo
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full overflow-hidden bg-muted shrink-0",
      collapsed ? "w-7 h-7" : "w-9 h-9",
      className
    )}>
      <PlaceholderLogo 
        width={collapsed ? 20 : 28} 
        height={collapsed ? 20 : 28}
      />
    </div>
  );
};