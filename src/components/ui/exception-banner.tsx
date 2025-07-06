import React from "react";
import { TriangleAlert, AlertCircle, Info, WandSparkles, FileX2 } from "lucide-react";
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
    container: "bg-red-50/50 border border-red-200 text-red-900",
    icon: "text-error-main",
    title: "text-red-900"
  },
  warning: {
    container: "bg-amber-50 border border-amber-200 text-amber-800",
    icon: "text-warning-main",
    title: "text-amber-900"
  },
  info: {
    container: "bg-white border border-primary text-gray-900",
    icon: "text-primary",
    title: "text-gray-900"
  },
  success: {
    container: "bg-green-50 border border-green-200 text-green-800",
    icon: "text-success-main",
    title: "text-green-900"
  }
};

const iconComponents = {
  alert: FileX2,
  circle: AlertCircle,
  info: Info,
  lightbulb: WandSparkles,
  sparkles: WandSparkles
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
      "p-3 rounded-lg text-sm",
      styles.container,
      className
    )}>
      <div className="flex items-start gap-2">
        <IconComponent 
          strokeWidth={1.25} 
          className={cn("mt-0.5 flex-shrink-0", styles.icon)} 
          size={14} 
        />
        <div className="flex-1">
          {title && (
            <span className={cn("font-semibold", styles.title)}>
              {title}:{" "}
            </span>
          )}
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}