
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
  recommended = false
}: UserTypeCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg min-h-[400px] border-2",
        selected 
          ? "border-[#7B59FF] shadow-lg ring-2 ring-[#7B59FF]/20" 
          : "border-gray-200 hover:border-[#7B59FF]/50"
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-semibold text-[#38415F]">{title}</CardTitle>
          {recommended && (
            <Badge className="bg-[#7B59FF] text-white hover:bg-[#6B4FE6]">
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed text-[#8C92A3]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-[#38415F]">Benefits:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-[#38415F]">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {considerations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-[#38415F]">Considerations:</h4>
            <ul className="space-y-2">
              {considerations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-3 text-[#38415F]">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
