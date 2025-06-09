import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface View2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUserId: string;
  // In a real application, you'd fetch the 2FA code here or pass it securely
  // For now, we'll use a placeholder
}

export function View2FAModal({ isOpen, onClose, portalUserId }: View2FAModalProps) {
  const dummy2FACode = "123-456-789"; // Placeholder 2FA code

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `2FA code copied!` });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View 2FA Code</DialogTitle>
          <DialogDescription>
            This is a placeholder for displaying the 2FA code for portal user ID: {portalUserId}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="2fa-code">2FA Code</Label>
            <div className="relative">
              <Input
                id="2fa-code"
                type="text"
                readOnly
                value={dummy2FACode}
                className="font-mono pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => copyToClipboard(dummy2FACode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 