
interface MatchTypeBadgeProps {
  type: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
}

export function MatchTypeBadge({ type }: MatchTypeBadgeProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Primary':
        return { textColor: "#7B59FF", bgColor: "#F3E8FF", text: "Primary" };
      case 'Alternate':
        return { textColor: "#253EA7", bgColor: "#EBF1FF", text: "Alternate" };
      case 'Unmatched':
        return { textColor: "#253EA7", bgColor: "#EBF1FF", text: "Unmatched" };
      case 'Conflict':
        return { textColor: "#253EA7", bgColor: "#EBF1FF", text: "Conflict" };
      default:
        return { textColor: "#9CA3AF", bgColor: "#F3F4F6", text: type };
    }
  };

  const config = getTypeConfig(type);

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full border font-medium whitespace-nowrap min-w-0 flex-shrink-0"
      style={{
        color: config.textColor,
        backgroundColor: config.bgColor,
        border: '1px solid',
        borderColor: `${config.textColor}33`,
        fontSize: '12px'
      }}
    >
      {config.text}
    </span>
  );
}
