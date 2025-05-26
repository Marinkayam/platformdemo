
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserTypeCardProps {
  type: "existing" | "dedicated";
  title: string;
  description: string;
  benefits: string[];
  considerations: string[];
  selected: boolean;
  onSelect: () => void;
  variant: "green" | "purple";
  recommended?: boolean;
}

export function UserTypeCard({
  type,
  title,
  description,
  benefits,
  considerations,
  selected,
  onSelect,
  variant,
  recommended = false
}: UserTypeCardProps) {
  const variantStyles = {
    green: {
      border: selected ? "border-green-500" : "border-green-200",
      header: "bg-green-50",
      badge: "bg-green-100 text-green-800"
    },
    purple: {
      border: selected ? "border-purple-500" : "border-purple-200",
      header: "bg-purple-50",
      badge: "bg-purple-100 text-purple-800"
    }
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        variantStyles[variant].border,
        selected && "ring-2 ring-offset-2",
        selected && variant === "green" && "ring-green-500",
        selected && variant === "purple" && "ring-purple-500"
      )}
      onClick={onSelect}
    >
      <CardHeader className={cn("pb-4", variantStyles[variant].header)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {recommended && (
            <Badge className={variantStyles[variant].badge}>
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-900">Benefits:</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        {considerations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-900">Considerations:</h4>
            <ul className="space-y-1">
              {considerations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  {consideration}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
