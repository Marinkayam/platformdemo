
import React from 'react';
import { PortalUser } from '@/types/portalUser';

interface UserTypeColumnProps {
  userType: PortalUser['userType'];
}

export function UserTypeColumn({ userType }: UserTypeColumnProps) {
  const isMontoUser = userType === 'Monto User';
  
  return (
    <span 
      className={`text-sm ${
        isMontoUser 
          ? 'text-primary font-semibold' 
          : 'text-gray-700 font-medium'
      }`}
    >
      {userType}
    </span>
  );
}
