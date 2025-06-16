
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalLogoProps {
  portalName: string;
  className?: string;
}

export function PortalLogo({ portalName, className = "w-6 h-6" }: PortalLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={getPortalLogoUrl(portalName)} 
        alt={`${portalName} logo`}
        className={className}
        onError={(e) => {
          e.currentTarget.src = '/portal-logos/placeholder.svg';
        }}
      />
      <span className="font-medium">{portalName}</span>
    </div>
  );
}
