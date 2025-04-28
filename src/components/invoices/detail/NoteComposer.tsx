
import React, { useRef, useState } from "react";
import { Paperclip, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FilePreview, FileAttachment } from "./FilePreview";
import { useFileAttachments } from "@/hooks/useFileAttachments";

interface NoteComposerProps {
  onAddNote: (content: string, attachments: FileAttachment[]) => void;
}

export function NoteComposer({ onAddNote }: NoteComposerProps) {
  const [newNote, setNewNote] = useState("");
  const { attachments, addAttachment, removeAttachment, clearAttachments } = useFileAttachments();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      addAttachment(file);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const submitNote = () => {
    if (!newNote.trim() && attachments.length === 0) return;
    
    onAddNote(newNote, attachments);
    setNewNote("");
    clearAttachments();
    
    // Focus on textarea for next input
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle keyboard shortcut for submitting
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      submitNote();
    }
  };

  return (
    <div className="p-4 border-t">
      <Textarea
        ref={textareaRef}
        placeholder="Add a note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-[100px] mb-2"
      />
      
      {/* Display attached files */}
      {attachments.length > 0 && (
        <div className="mb-3">
          {attachments.map(attachment => (
            <FilePreview
              key={attachment.id}
              file={attachment}
              onDelete={() => removeAttachment(attachment.id)}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
          </label>
          <span className="text-xs text-gray-500">⌘ + Enter to send</span>
        </div>
        <Button 
          onClick={submitNote} 
          disabled={!newNote.trim() && attachments.length === 0}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Add Note
        </Button>
      </div>
    </div>
  );
}
