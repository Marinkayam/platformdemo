import React from "react";
import { TriangleAlert, AlertCircle, Info, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExceptionBannerVariant = "error" | "warning" | "info" | "success";
export type ExceptionBannerIcon = "alert" | "circle" | "info" | "lightbulb" | "sparkles";

interface ExceptionBannerProps {
  variant?: ExceptionBannerVariant;
  icon?: ExceptionBannerIcon;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles = {
  error: {
    container: "bg-rose-50/50 border-l-4 border-l-rose-400 border border-rose-100/60",
    icon: "text-rose-500",
    title: "text-rose-900",
    text: "text-rose-800"
  },
  warning: {
    container: "bg-amber-50/50 border-l-4 border-l-amber-400 border border-amber-100/60",
    icon: "text-amber-500",
    title: "text-amber-900", 
    text: "text-amber-800"
  },
  info: {
    container: "bg-blue-50/50 border-l-4 border-l-blue-400 border border-blue-100/60",
    icon: "text-blue-500",
    title: "text-blue-900",
    text: "text-blue-800"
  },
  success: {
    container: "bg-emerald-50/50 border-l-4 border-l-emerald-400 border border-emerald-100/60",
    icon: "text-emerald-500",
    title: "text-emerald-900",
    text: "text-emerald-800"
  }
};

const iconComponents = {
  alert: TriangleAlert,
  circle: AlertCircle,
  info: Info,
  lightbulb: Lightbulb,
  sparkles: Sparkles
};

export function ExceptionBanner({ 
  variant = "error", 
  icon = "alert", 
  title, 
  children, 
  className 
}: ExceptionBannerProps) {
  const styles = variantStyles[variant];
  const IconComponent = iconComponents[icon];

  return (
    <div className={cn(
      "p-5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
      styles.container,
      className
    )}>
      <div className="flex items-start gap-4">
        <IconComponent 
          strokeWidth={1.5} 
          className={cn("mt-0.5 flex-shrink-0", styles.icon)} 
          size={20} 
        />
        <div className="flex-1 space-y-1">
          {title && (
            <p className={cn("font-semibold text-base leading-relaxed", styles.title)}>
              {title}
            </p>
          )}
          <div className={cn("text-base leading-relaxed", styles.text)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}