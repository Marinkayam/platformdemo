
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TwoFactorCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
}

export function TwoFactorCodeModal({ isOpen, onClose, onConfirm }: TwoFactorCodeModalProps) {
  const [code, setCode] = useState("");

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  const handleConfirm = () => {
    if (code.length === 6) {
      onConfirm(code);
      setCode("");
    }
  };

  const formatCodeDisplay = (code: string) => {
    const digits = code.padEnd(6, "_").split("");
    return digits.join(" ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            2FA Code Received
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-sm">
            After redirection in the AP portal, your 2FA code will appear here.
            (Don't close this window)
          </p>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Enter 2FA Code:
            </label>
            <div className="text-center">
              <div className="font-mono text-2xl tracking-wider text-gray-900 bg-gray-50 border rounded-lg py-4 mb-4">
                {formatCodeDisplay(code)}
              </div>
              <Input
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="text-center text-lg tracking-wider"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={code.length !== 6}
              className="bg-[#7B59FF] hover:bg-[#6B4FE6]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
