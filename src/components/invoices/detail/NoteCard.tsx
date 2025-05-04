
import React from "react";
import { Card } from "@/components/ui/card";
import { FilePreview, FileAttachment } from "./FilePreview";
import { format } from "date-fns";

interface NoteCardProps {
  note: {
    id: string;
    user: string;
    avatar: string;
    content: string;
    timestamp: Date;
    read: boolean;
    attachments: FileAttachment[];
  };
  onDeleteAttachment: (attachmentId: string) => void;
}

export function NoteCard({ note, onDeleteAttachment }: NoteCardProps) {
  const formatExactTime = (date: Date): string => {
    return format(date, "MMMM d, yyyy 'at' HH:mm");
  };

  return (
    <Card 
      key={note.id} 
      className="p-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium text-sm">
          {note.avatar}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{note.user}</span>
            <span className="text-xs text-gray-500">{formatExactTime(note.timestamp)}</span>
          </div>
          <p className="text-sm">{note.content}</p>
          
          {/* Render attachments */}
          {note.attachments.length > 0 && (
            <div className="mt-2">
              {note.attachments.map((attachment) => (
                <FilePreview
                  key={attachment.id}
                  file={attachment}
                  onDelete={() => onDeleteAttachment(attachment.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
