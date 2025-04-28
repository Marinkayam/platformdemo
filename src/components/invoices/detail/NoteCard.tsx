
import React from "react";
import { Card } from "@/components/ui/card";
import { FilePreview, FileAttachment } from "./FilePreview";
import { formatDistance } from "date-fns";

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
  onMouseEnter: () => void;
  onDeleteAttachment: (attachmentId: string) => void;
}

export function NoteCard({ note, onMouseEnter, onDeleteAttachment }: NoteCardProps) {
  const getRelativeTime = (date: Date): string => {
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  return (
    <Card 
      key={note.id} 
      className={`p-3 ${!note.read ? "bg-purple-50 border-purple-200" : ""}`}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium text-sm`}>
          {note.avatar}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{note.user}</span>
            <span className="text-xs text-gray-500">{getRelativeTime(note.timestamp)}</span>
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
        {!note.read && (
          <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
        )}
      </div>
    </Card>
  );
}
