import BadgePill, { BadgeColorKey } from "@/components/ui/badge-pill";

interface MatchTypeBadgeProps {
  type: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
}

export function MatchTypeBadge({ type }: MatchTypeBadgeProps) {
  const configMap: Record<MatchTypeBadgeProps['type'], { label: string; color: BadgeColorKey }> = {
    Primary: { label: 'Primary', color: 'processing' },
    Alternate: { label: 'Alternate', color: 'info' },
    Unmatched: { label: 'Unmatched', color: 'neutral' },
    Conflict: { label: 'Conflict', color: 'warning' }
  };

  const { label, color } = configMap[type] ?? { label: type, color: 'neutral' };

  return (
    <BadgePill label={label} color={color} variant="secondary" />
  );
}
