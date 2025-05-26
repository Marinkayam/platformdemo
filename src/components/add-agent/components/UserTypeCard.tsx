
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserTypeCardProps {
  type: "existing" | "dedicated";
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
}

export function UserTypeCard({
  type,
  title,
  description,
  selected,
  onSelect,
  recommended = false
}: UserTypeCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg min-h-[200px] border-2",
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
    </Card>
  );
}
