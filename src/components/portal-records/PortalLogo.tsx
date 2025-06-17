
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalLogoProps {
  portalName: string;
  className?: string;
}

export function PortalLogo({ portalName, className = "w-5 h-5" }: PortalLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={getPortalLogoUrl(portalName)} 
        alt={`${portalName} logo`}
        className={`${className} object-contain rounded-full`}
        onError={(e) => {
          e.currentTarget.src = '/portal-logos/placeholder.svg';
        }}
      />
      <span className="font-medium text-gray-900">{portalName}</span>
    </div>
  );
}
