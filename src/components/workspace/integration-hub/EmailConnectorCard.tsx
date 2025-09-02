import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { Check, Settings, Mail } from "lucide-react";

interface EmailConnectorCardProps {
  title: string;
  description: string;
  isConfigured: boolean;
  onClick: () => void;
}

export function EmailConnectorCard({ title, description, isConfigured, onClick }: EmailConnectorCardProps) {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
        isConfigured 
          ? "border-primary-main bg-primary-lighter hover:border-primary-dark hover:shadow-lg"
          : "border-grey-300 hover:border-grey-400 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center space-y-4">
        <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${
          isConfigured 
            ? "bg-white/20 backdrop-blur-sm"
            : "bg-grey-200 border border-grey-300"
        }`}>
          <Mail 
            size={20} 
            className={isConfigured ? "text-primary-main" : "text-grey-600"} 
            strokeWidth={1.5}
          />
        </div>
        
        <div>
          <Typography 
            variant="subtitle1" 
            className={`mb-1 ${isConfigured ? "text-primary-main" : "text-grey-900"}`}
          >
            {title}
          </Typography>
          <Typography variant="body2" className="text-grey-600 text-xs">
            {description}
          </Typography>
        </div>
        
        <div className="flex justify-center">
          {isConfigured ? (
            <Badge className="bg-primary-main text-white border-primary-main hover:bg-primary-dark">
              <Check size={12} className="mr-1" />
              Configured
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-grey-200 border-grey-300 text-grey-700 hover:bg-grey-300">
              <Settings size={12} className="mr-1" />
              Configure
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}