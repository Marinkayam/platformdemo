
export const BADGE_COLORS = {
  success: {
    border: '#007737',
    text: '#007737',
    background: '#E6F4EA'
  },
  error: {
    border: '#DF1C41', 
    text: '#DF1C41',
    background: '#FFEBEE'
  },
  warning: {
    border: '#D48806',
    text: '#D48806',
    background: '#FFF8E1'
  },
  info: {
    border: '#1750FB',
    text: '#1750FB',
    background: '#E3F2FD'
  },
  neutral: {
    border: '#9CA3AF',
    text: '#9CA3AF',
    background: '#F3F4F6'
  },
  processing: {
    border: '#7B59FF',
    text: '#7B59FF',
    background: '#F3E8FF'
  }
} as const;

export const STATUS_MAPPING = {
  // SUCCESS - Green
  success: ['paid', 'settled', 'partially settled', 'live', 'connected', 'new', 'fully invoiced', 'partially invoiced', 'completed', '100% invoiced', 'open', 'closed'],

  // ERROR - Red
  error: ['rejected by buyer', 'disconnected', 'error', 'unavailable', 'pending action', 'needs attention'],

  // WARNING - Orange
  warning: ['external submission', 'approved by buyer', 'approved', 'partially invoiced', 'partial payment', 'part inv'],

  // INFO - Blue
  info: ['in process', 'validating', 'building', 'connecting', 'in progress', 'pending approval', 'created'],

  // NEUTRAL - Gray
  neutral: ['excluded', 'inactive'],

  // PROCESSING - Purple
  processing: ['rtp prepared', 'rtp sent', 'awaiting sc', 'rejected by monto']
};

export const getStatusColor = (status: string): typeof BADGE_COLORS[keyof typeof BADGE_COLORS] => {
  const lowerStatus = status.toLowerCase();
  
  for (const [colorKey, statuses] of Object.entries(STATUS_MAPPING)) {
    if (statuses.includes(lowerStatus)) {
      return BADGE_COLORS[colorKey as keyof typeof BADGE_COLORS];
    }
  }
  
  // Default fallback
  return BADGE_COLORS.neutral;
}; 
