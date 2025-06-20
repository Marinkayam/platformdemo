
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";

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
  const Icon = type === "existing" ? Users : Shield;

  return (
    <Card 
      className={`cursor-pointer transition-all relative ${
        selected 
          ? "border-[#7B59FF] bg-[#7B59FF]/5" 
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      {recommended && (
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-[#7B59FF] text-white">Recommended</Badge>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${selected ? "bg-[#7B59FF] text-white" : "bg-gray-100 text-gray-600"}`}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">
            {type === "dedicated" ? "Create a Monto User" : title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {type === "dedicated" 
            ? "Set up a separate user in your AP portal exclusively for Monto." 
            : description
          }
        </CardDescription>
      </CardContent>
    </Card>
  );
}
