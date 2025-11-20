import React from "react";
import { TriangleAlert, AlertCircle, Info, WandSparkles, FileX2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExceptionBannerVariant = "error" | "warning" | "info" | "success";
export type ExceptionBannerIcon = "alert" | "circle" | "info" | "lightbulb" | "sparkles" | "triangle-alert";

interface ExceptionBannerProps {
  variant?: ExceptionBannerVariant;
  icon?: ExceptionBannerIcon;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles = {
  error: {
    container: "bg-red-50/50 border border-red-200",
    icon: "text-error-main",
    title: "",
    textColor: "#DF1C41"
  },
  warning: {
    container: "bg-amber-50 border border-amber-200 text-amber-800",
    icon: "text-warning-main",
    title: "text-amber-900",
    textColor: undefined
  },
  info: {
    container: "bg-white border border-primary text-gray-900",
    icon: "text-primary",
    title: "text-gray-900",
    textColor: undefined
  },
  success: {
    container: "bg-green-50 border border-green-200 text-green-800",
    icon: "text-success-main",
    title: "text-green-900",
    textColor: undefined
  }
};

const iconComponents = {
  alert: FileX2,
  circle: AlertCircle,
  info: Info,
  lightbulb: WandSparkles,
  sparkles: WandSparkles,
  "triangle-alert": TriangleAlert
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
    )} style={variant === 'error' ? { color: styles.textColor } : undefined}>
      <div className="flex items-start gap-2">
        <IconComponent 
          strokeWidth={1.25} 
          className={cn("mt-0.5 flex-shrink-0", styles.icon)} 
          size={14} 
        />
        <div className="flex-1 space-y-1">
          {title && (
            <div className={cn("font-medium", styles.title)} style={variant === 'error' ? { color: styles.textColor } : undefined}>
              {title}
            </div>
          )}
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
}