import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography/typography";
import { Lock, ExternalLink, LucideIcon } from "lucide-react";

interface LockedIntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  logo?: string;
  onContactSupport: () => void;
  style?: React.CSSProperties;
}

export function LockedIntegrationCard({ title, description, icon: IconComponent, logo, onContactSupport, style }: LockedIntegrationCardProps) {
  return (
    <Card 
      className="group border-grey-300 bg-grey-50 hover:border-grey-400 transition-all duration-200 hover:scale-[1.02]"
      style={style}
    >
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-lg bg-white border border-grey-200 flex items-center justify-center">
          {logo ? (
            <img 
              src={logo} 
              alt={`${title} logo`} 
              className="w-10 h-10 object-contain"
            />
          ) : (
            <IconComponent 
              size={20} 
              className="text-[#7B59FF]" 
              strokeWidth={1.5}
            />
          )}
        </div>
        
        <div>
          <Typography variant="subtitle1" className="text-grey-700 mb-1">
            {title}
          </Typography>
          <Typography variant="body2" className="text-grey-600 text-xs">
            {description}
          </Typography>
        </div>
        
        <Badge variant="secondary" className="bg-white border-grey-200 hover:bg-grey-50">
          <Lock size={12} className="mr-1 text-[#7B59FF]" />
          <span className="text-[#7B59FF]">Contact Us</span>
        </Badge>
      </CardContent>
    </Card>
  );
}