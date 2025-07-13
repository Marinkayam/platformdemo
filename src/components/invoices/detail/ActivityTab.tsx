
import React from "react";
import { NotesThread } from "./NotesThread";
import { useNotes } from "@/hooks/useNotes";

export function ActivityTab() {
  const { notes, addNote, removeNoteAttachment, scrollRef } = useNotes();

  return (
    <div className="bg-white rounded-lg">
      <div className="min-h-[600px] rounded-lg border p-6">
        {/* Activity Timeline - Coming Soon */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Coming Soon</p>
          </div>
        </div>
        
        {/* Notes Section */}
        <div>
          <NotesThread 
            notes={notes}
            addNote={addNote}
            removeNoteAttachment={removeNoteAttachment}
            scrollRef={scrollRef}
          />
        </div>
      </div>
    </div>
  );
}
