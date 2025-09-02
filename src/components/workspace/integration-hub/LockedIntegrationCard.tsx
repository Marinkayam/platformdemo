import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography/typography";
import { Lock, ExternalLink, LucideIcon } from "lucide-react";

interface LockedIntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onContactSupport: () => void;
}

export function LockedIntegrationCard({ title, description, icon: IconComponent, onContactSupport }: LockedIntegrationCardProps) {
  return (
    <Card className="group border-grey-300 bg-grey-200 hover:border-grey-400 transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-lg bg-white border border-grey-300 flex items-center justify-center">
          <IconComponent 
            size={20} 
            className="text-grey-600" 
            strokeWidth={1.5}
          />
        </div>
        
        <div>
          <Typography variant="subtitle1" className="text-grey-700 mb-1">
            {title}
          </Typography>
          <Typography variant="body2" className="text-grey-600 text-xs">
            {description}
          </Typography>
        </div>
        
        <div className="space-y-3">
          <Badge variant="secondary" className="bg-white border-grey-300 text-grey-700">
            <Lock size={12} className="mr-1" />
            Premium Feature
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onContactSupport}
            className="w-full text-xs"
          >
            Contact Support
            <ExternalLink size={12} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}