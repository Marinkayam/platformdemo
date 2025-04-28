
import React from "react";
import { useParams } from "react-router-dom";
import { 
  ResizablePanelGroup,
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { ActivityTimeline } from "./ActivityTimeline";
import { NotesThread } from "./NotesThread";

export function ActivityTab() {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-lg">
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        {/* Timeline Panel */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <ActivityTimeline />
        </ResizablePanel>
        
        {/* Resizable Handle */}
        <ResizableHandle withHandle />
        
        {/* Notes Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <NotesThread />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
