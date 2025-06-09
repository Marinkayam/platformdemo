import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Mock portal options (replace with actual data later)
const PORTAL_OPTIONS = ["Coupa", "Ariba", "Oracle", "SAP", "Workday"];

interface AddPortalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: { 
    id?: string;
    portal: string;
    username: string;
    password?: string;
    portalUrl?: string;
    userType: "Monto User" | "Customer User";
  };
  onSubmit: (data: any) => void;
}

export function AddPortalUserModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: AddPortalUserModalProps) {
  const [portal, setPortal] = useState(initialData?.portal || "");
  const [username, setUsername] = useState(initialData?.username || "");
  const [password, setPassword] = useState(initialData?.password || "");
  const [portalUrl, setPortalUrl] = useState(initialData?.portalUrl || "");

  const isReadOnly = mode === "edit" && initialData?.userType === "Monto User";

  useEffect(() => {
    if (isOpen && initialData) {
      setPortal(initialData.portal || "");
      setUsername(initialData.username || "");
      setPassword(initialData.password || "");
      setPortalUrl(initialData.portalUrl || "");
    } else if (!isOpen) {
      // Reset form when modal closes
      setPortal("");
      setUsername("");
      setPassword("");
      setPortalUrl("");
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    // In a real app, you'd send this data to an API
    onSubmit({
      id: initialData?.id, // Keep ID for edit mode
      portal,
      username,
      password,
      portalUrl,
      userType: initialData?.userType || "Customer User", // Default to Customer User for new ones
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add Portal User" : "Edit Portal User"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Enter the details for the new portal user." 
              : "Edit the details of the portal user."}
            {isReadOnly && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="ml-2">
                    Monto User
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  This user was added by Monto. You can view credentials but not edit them.
                </TooltipContent>
              </Tooltip>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="portal">Portal</Label>
            <Select value={portal} onValueChange={setPortal} disabled={isReadOnly}>
              <SelectTrigger id="portal">
                <SelectValue placeholder="Select a portal" />
              </SelectTrigger>
              <SelectContent>
                {PORTAL_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isReadOnly}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isReadOnly}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portalUrl">Portal URL (Optional)</Label>
            <Input
              id="portalUrl"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              disabled={isReadOnly}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!isReadOnly && (
            <Button onClick={handleSubmit}>
              {mode === "create" ? "Add User" : "Save Changes"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}