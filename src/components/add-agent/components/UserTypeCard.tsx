
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Info, ArrowRight } from "lucide-react";
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
  const benefits = type === "existing" 
    ? [
        { icon: Check, text: "Quick to set up" },
        { icon: Check, text: "Compatible with most portals" },
        { icon: Info, text: "Shared use may affect tracking or stability" }
      ]
    : [
        { icon: Check, text: "Optimized for automation" },
        { icon: Check, text: "Secure and stable" },
        { icon: ArrowRight, text: "Unlocks advanced features" }
      ];

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:border-[#7B59FF]/50 min-h-[280px] border-2",
        selected 
          ? "border-[#7B59FF] ring-2 ring-[#7B59FF]/20" 
          : "border-gray-200"
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-4">
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
      <CardContent className="pt-0">
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-3">
              <benefit.icon className="h-4 w-4 text-[#7B59FF] flex-shrink-0" />
              <span className="text-sm text-[#38415F]">{benefit.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
