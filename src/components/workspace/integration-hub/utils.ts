
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
    case 'INACTIVE': return 'bg-gray-100 text-gray-800';
    case 'Coming Soon': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
