
import React from "react";
import { 
  ResizablePanelGroup,
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { NotesThread } from "./NotesThread";
import { useNotes } from "@/hooks/useNotes";

export function ActivityTab() {
  const { notes, addNote, removeNoteAttachment, scrollRef } = useNotes();

  return (
    <div className="bg-white rounded-lg">
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        {/* Timeline Panel */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Coming Soon</p>
            </div>
          </div>
        </ResizablePanel>
        
        {/* Resizable Handle */}
        <ResizableHandle withHandle />
        
        {/* Notes Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <NotesThread 
            notes={notes}
            addNote={addNote}
            removeNoteAttachment={removeNoteAttachment}
            scrollRef={scrollRef}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
