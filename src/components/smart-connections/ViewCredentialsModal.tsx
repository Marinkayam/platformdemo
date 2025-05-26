
import { useState } from "react";
import { Copy, Eye, EyeOff, Lock, Link, RefreshCw, UserCircle, X, Edit3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ViewCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: string;
    portalName: string;
    status: "Connected" | "Disconnected" | "Error";
    credentials?: {
      username: string;
      password: string;
      twoFA?: string;
      portalLink: string;
    };
  };
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

export function ViewCredentialsModal({ 
  isOpen, 
  onClose, 
  agent, 
  connectionInfo 
}: ViewCredentialsModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const credentials = agent.credentials || {
    username: "ar@example.com",
    password: "••••••••",
    twoFA: "",
    portalLink: "https://google.com"
  };

  // Form state for edit mode
  const [editedCredentials, setEditedCredentials] = useState(credentials);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${field} copied to clipboard!`,
      duration: 2000,
    });
  };

  const handlePortalLinkClick = () => {
    window.open(credentials.portalLink, '_blank', 'noopener,noreferrer');
  };

  const handleSave = () => {
    // Validate fields
    if (!editedCredentials.username || !editedCredentials.password) {
      toast({
        description: "Username and password are required",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Here you would typically make an API call to save the credentials
    console.log("Saving credentials:", editedCredentials);
    
    setIsEditMode(false);
    toast({
      description: "Credentials updated successfully!",
      duration: 3000,
    });
  };

  const handleCancel = () => {
    setEditedCredentials(credentials);
    setIsEditMode(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-50 text-green-700 border-green-200";
      case "Disconnected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Error":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <DialogTitle 
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                  onClick={handlePortalLinkClick}
                >
                  {agent.portalName}
                </DialogTitle>
                <Badge 
                  variant="outline"
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(agent.status)}`}
                >
                  {agent.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {connectionInfo.receivable} → {connectionInfo.payable}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 h-12 px-3 border rounded-lg bg-gray-50">
              <UserCircle className="h-4 w-4 text-gray-500" />
              <div className="flex-1">
                <label className="text-xs text-gray-500 block">Username</label>
                {isEditMode ? (
                  <Input
                    value={editedCredentials.username}
                    onChange={(e) => setEditedCredentials({...editedCredentials, username: e.target.value})}
                    className="text-sm border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{credentials.username}</div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleCopy(credentials.username, "Username")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 h-12 px-3 border rounded-lg bg-gray-50">
              <Lock className="h-4 w-4 text-gray-500" />
              <div className="flex-1">
                <label className="text-xs text-gray-500 block">Password</label>
                {isEditMode ? (
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={editedCredentials.password}
                    onChange={(e) => setEditedCredentials({...editedCredentials, password: e.target.value})}
                    className="text-sm border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                  />
                ) : (
                  <div className="text-sm text-gray-900">
                    {showPassword ? credentials.password : "••••••••"}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center gap-3 h-12 px-3 border rounded-lg bg-gray-50">
              <RefreshCw className="h-4 w-4 text-gray-500" />
              <div className="flex-1">
                <label className="text-xs text-gray-500 block">2FA</label>
                {isEditMode ? (
                  <Input
                    value={editedCredentials.twoFA || ""}
                    onChange={(e) => setEditedCredentials({...editedCredentials, twoFA: e.target.value})}
                    placeholder="Enter 2FA code"
                    className="text-sm border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                  />
                ) : (
                  <div className="text-sm text-gray-900">
                    {credentials.twoFA || "<2FA>"}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 h-12 px-3 border rounded-lg bg-gray-50">
              <Link className="h-4 w-4 text-gray-500" />
              <div className="flex-1">
                <label className="text-xs text-gray-500 block">Portal Link</label>
                {isEditMode ? (
                  <Input
                    value={editedCredentials.portalLink}
                    onChange={(e) => setEditedCredentials({...editedCredentials, portalLink: e.target.value})}
                    className="text-sm border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                  />
                ) : (
                  <div className="text-sm text-gray-900 truncate">{credentials.portalLink}</div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleCopy(credentials.portalLink, "Portal Link")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isEditMode && (
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
