
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteCard } from "./NoteCard";
import { NoteComposer } from "./NoteComposer";
import { Note, useNotes } from "@/hooks/useNotes";

interface NotesThreadProps {
  notes: Note[];
  addNote: (content: string, attachments: any[]) => void;
  removeNoteAttachment: (noteId: string, attachmentId: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function NotesThread({ notes, addNote, removeNoteAttachment, scrollRef }: NotesThreadProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Notes</h2>
        </div>
      </div>
      
      {/* Scrollable notes area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard 
              key={note.id}
              note={note}
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
