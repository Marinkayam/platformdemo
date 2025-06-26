
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'bg-success-main/10 text-success-main border-success-main';
    case 'DRAFT': return 'bg-warning-main/10 text-warning-main border-warning-main';
    case 'INACTIVE': return 'bg-grey-400 text-grey-600 border-grey-400';
    case 'Coming Soon': return 'bg-info-main/10 text-info-main border-info-main';
    default: return 'bg-grey-400 text-grey-600 border-grey-400';
  }
};
