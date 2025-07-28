import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Agent } from "@/types/smartConnection";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AgentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  onSave: (updatedAgent: Agent) => void;
}

export function AgentDetailsModal({ isOpen, onClose, agent, onSave }: AgentDetailsModalProps) {
  const [username, setUsername] = useState(agent.portalUser || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedAgent = {
        ...agent,
        portalUser: username,
        status: "Connected" as const
      };
      onSave(updatedAgent);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-error-main" />
            Agent Details - {agent.portalName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Connection Failed:</strong> Authentication failed. Please verify your credentials and save to retry validation.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!username || !password || isLoading}
            >
              {isLoading ? "Saving..." : "Save & Test Connection"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}