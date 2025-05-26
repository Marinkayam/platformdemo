
import { useState } from "react";
import { Copy, Eye, EyeOff, Lock, Link, RefreshCw, UserCircle, X, Edit3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${field} copied to clipboard!`,
      duration: 2000,
    });
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

  const credentials = agent.credentials || {
    username: "ar@example.com",
    password: "••••••••",
    twoFA: "",
    portalLink: "https://google.com"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold text-gray-900 mb-2">
                {agent.portalName}
              </DialogTitle>
              <Badge 
                variant="outline"
                className={`rounded-full px-2.5 py-1 text-xs font-medium mb-2 ${getStatusColor(agent.status)}`}
              >
                {agent.status}
              </Badge>
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
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
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
                <div className="text-sm text-gray-900">{credentials.username}</div>
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
                <div className="text-sm text-gray-900">
                  {showPassword ? credentials.password : "••••••••"}
                </div>
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
                <div className="text-sm text-gray-900">
                  {credentials.twoFA || "<2FA>"}
                </div>
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
                <div className="text-sm text-gray-900 truncate">{credentials.portalLink}</div>
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
              <Button variant="outline" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditMode(false)}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
