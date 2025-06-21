
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PortalRecord } from "@/types/portalRecord";
import { toast } from "@/hooks/use-toast";

interface SyncRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PortalRecord;
  onSync: () => void;
}

export function SyncRecordModal({ isOpen, onClose, record, onSync }: SyncRecordModalProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSync = async () => {
    setIsSyncing(true);
    setProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          onSync();
          toast({
            title: "Sync Complete",
            description: `Portal record ${record.portalRecordId} has been synced successfully.`,
          });
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Portal Record - {record.portalRecordId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Sync Details</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Portal:</strong> {record.portal}</p>
              <p><strong>Last Synced:</strong> {record.lastSynced}</p>
              <p><strong>Connection Status:</strong> {record.connectionStatus}</p>
            </div>
          </div>

          {isSyncing && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Syncing portal record...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500">{progress}% complete</p>
            </div>
          )}

          {!isSyncing && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                This will sync the latest data from {record.portal} for this record. 
                Any conflicts will be flagged for resolution.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSyncing}>
            Cancel
          </Button>
          <Button onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? "Syncing..." : "Start Sync"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
