import React from "react";
import { cn } from "@/lib/utils";
import { BADGE_COLORS } from "@/lib/badge-colors";

export type BadgeColorKey = keyof typeof BADGE_COLORS; // success | error | warning | info | neutral | processing

interface BadgePillProps {
  label: string;
  color: BadgeColorKey;
  variant?: "primary" | "secondary"; // primary = filled, secondary = outline-only
  className?: string;
  startIcon?: React.ReactNode;
}

export const BadgePill: React.FC<BadgePillProps> = ({
  label,
  color,
  variant = "primary",
  className,
  startIcon,
}) => {
  const colors = BADGE_COLORS[color];

  // For secondary, use transparent bg and a subtle border (lighter alpha)
  // Append '33' for ~20% alpha in 8-digit hex if available; fallback to regular border color
  const subtleBorder = `${colors.border}33`;

  const style: React.CSSProperties =
    variant === "secondary"
      ? {
          color: colors.text,
          backgroundColor: "transparent",
          border: `1px solid ${subtleBorder}`,
          fontSize: "12px",
        }
      : {
          color: colors.text,
          backgroundColor: colors.background,
          fontSize: "12px",
        };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0 select-none",
        variant === "secondary" ? "" : "",
        className
      )}
      style={style}
    >
      {startIcon ? <span className="inline-flex items-center">{startIcon}</span> : null}
      <span className="truncate">{label}</span>
    </span>
  );
};

export default BadgePill;
