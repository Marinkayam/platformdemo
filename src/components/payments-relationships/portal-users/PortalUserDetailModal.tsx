
import React from "react";
import { PortalUser } from "@/types/portalUser";
import { PortalUser as PortalUserModal } from "../PortalUser";

interface PortalUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUser;
  onEditPortalUser: (user: PortalUser) => void;
  onDeletePortalUser?: (userId: string) => void;
}

export function PortalUserDetailModal({ 
  isOpen, 
  onClose, 
  portalUser, 
  onEditPortalUser,
  onDeletePortalUser 
}: PortalUserDetailModalProps) {
  return (
    <PortalUserModal
      isOpen={isOpen}
      onClose={onClose}
      portalUser={portalUser}
      onEditPortalUser={onEditPortalUser}
      onDeletePortalUser={onDeletePortalUser}
    />
  );
}
