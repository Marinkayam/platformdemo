
interface PortalStatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Pending' | 'Error';
}

export function PortalStatusBadge({ status }: PortalStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Active':
        return { textColor: "#007737", bgColor: "#E6F4EA", text: "Active" };
      case 'Inactive':
        return { textColor: "#9CA3AF", bgColor: "#F3F4F6", text: "Inactive" };
      case 'Pending':
        return { textColor: "#F2AE40", bgColor: "#FFF8E1", text: "Pending" };
      case 'Error':
        return { textColor: "#DF1C41", bgColor: "#FFEBEE", text: "Error" };
      default:
        return { textColor: "#9CA3AF", bgColor: "#F3F4F6", text: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className="inline-flex items-center px-4 py-1.5 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0"
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
