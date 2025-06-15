
import { PortalUser } from "@/types/portalUser";

export const getValidationSteps = (portalUser: PortalUser) => {
  // This would typically come from your backend/state management
  // For now, we'll simulate some steps based on the portal
  const baseSteps = [
    { label: 'Connecting to portal', status: 'completed' as const },
    { label: 'Validating credentials', status: 'in-progress' as const },
    { label: 'Setting up secure connection', status: 'pending' as const },
    { label: 'Testing data access', status: 'pending' as const }
  ];

  // Simulate progress based on lastUpdated timestamp
  const now = new Date();
  const lastUpdated = new Date(portalUser.lastUpdated);
  const timeDiff = now.getTime() - lastUpdated.getTime();
  const progress = Math.min(Math.floor(timeDiff / 1000), 85); // 1% per second, max 85% for validation

  // Update step statuses based on progress
  if (progress > 75) {
    baseSteps[1].status = 'completed';
    baseSteps[2].status = 'completed';
    baseSteps[3].status = 'in-progress';
  } else if (progress > 50) {
    baseSteps[1].status = 'completed';
    baseSteps[2].status = 'in-progress';
  } else if (progress > 25) {
    baseSteps[1].status = 'completed';
    baseSteps[2].status = 'in-progress';
  }

  return {
    steps: baseSteps,
    progress,
    status: 'Validating portal connection...'
  };
};
