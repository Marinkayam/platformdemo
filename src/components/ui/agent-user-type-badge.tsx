
import { cn } from "@/lib/utils";

interface AgentUserTypeBadgeProps {
  type: "Monto" | "External";
  className?: string;
}

export function AgentUserTypeBadge({ type, className }: AgentUserTypeBadgeProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "Monto":
        return { 
          textColor: "#7B59FF", 
          bgColor: "#F3E8FF", 
          text: "Monto User" 
        };
      case "External":
        return { 
          textColor: "#9CA3AF", 
          bgColor: "#F3F4F6", 
          text: "Customer User" 
        };
      default:
        return { 
          textColor: "#9CA3AF", 
          bgColor: "#F3F4F6", 
          text: "Customer User" 
        };
    }
  };

  const config = getTypeConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0",
        className
      )}
      style={{
        color: config.textColor,
        backgroundColor: config.bgColor,
        fontSize: '12px'
      }}
    >
      {config.text}
    </span>
  );
}
