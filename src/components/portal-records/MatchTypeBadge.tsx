import BadgePill, { BadgeColorKey } from "@/components/ui/badge-pill";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MatchTypeBadgeProps {
  type: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
}

export function MatchTypeBadge({ type }: MatchTypeBadgeProps) {
  const configMap: Record<MatchTypeBadgeProps['type'], { label: string; color: BadgeColorKey; tooltip: string }> = {
    Primary: { label: 'Primary', color: 'processing', tooltip: 'This invoice is the primary match for payment processing' },
    Alternate: { label: 'Alternate', color: 'info', tooltip: 'This invoice is an alternate match that can be promoted to primary' },
    Unmatched: { label: 'Unmatched', color: 'warning', tooltip: 'This invoice needs to be associated with an ERP record or removed' },
    Conflict: { label: 'Conflict', color: 'error', tooltip: 'Multiple matches found - requires resolution to select the correct match' }
  };

  const { label, color, tooltip } = configMap[type] ?? { label: type, color: 'neutral', tooltip: '' };

  if (type === 'Unmatched') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-block">
              <BadgePill label={label} color={color} variant="primary" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <BadgePill label={label} color={color} variant="primary" />
  );
}
