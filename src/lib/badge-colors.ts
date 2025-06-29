
export const BADGE_COLORS = {
  success: {
    border: '#007737',
    text: '#007737'
  },
  error: {
    border: '#DF1C41', 
    text: '#DF1C41'
  },
  warning: {
    border: '#F2AE40',
    text: '#F2AE40'
  },
  info: {
    border: '#1750FB',
    text: '#1750FB'
  },
  neutral: {
    border: '#9CA3AF',
    text: '#9CA3AF'
  },
  processing: {
    border: '#7B59FF',
    text: '#7B59FF'
  }
} as const;

export const STATUS_MAPPING = {
  // SUCCESS - Green
  success: ['paid', 'settled', 'partially settled', 'live', 'connected', 'approved by buyer', 'new', 'fully invoiced', 'partially invoiced'],
  
  // ERROR - Red  
  error: ['rejected by buyer', 'disconnected', 'error', 'unavailable', 'pending action'],
  
  // WARNING - Orange
  warning: ['external submission'],
  
  // INFO - Blue
  info: ['in process', 'validating', 'building'],
  
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
