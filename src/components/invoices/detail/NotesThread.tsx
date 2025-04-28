
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteCard } from "./NoteCard";
import { NoteComposer } from "./NoteComposer";
import { useNotes } from "@/hooks/useNotes";

export function NotesThread() {
  const { 
    notes, 
    hasUnreadNotes, 
    scrollRef, 
    markAllAsRead, 
    handleNoteHover, 
    addNote, 
    removeNoteAttachment 
  } = useNotes();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Notes</h2>
          {hasUnreadNotes && (
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></span>
              <span className="text-sm text-purple-600 font-medium">New notes</span>
            </div>
          )}
        </div>
        {hasUnreadNotes && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {/* Scrollable notes area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard 
              key={note.id}
              note={note}
              onMouseEnter={() => handleNoteHover(note.id)}
              onDeleteAttachment={(attachmentId) => removeNoteAttachment(note.id, attachmentId)}
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* Note composition area */}
      <NoteComposer onAddNote={addNote} />
    </div>
  );
}
