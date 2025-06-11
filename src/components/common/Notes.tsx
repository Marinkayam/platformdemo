import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface Note {
  id: string;
  author: string;
  authorInitials: string;
  timestamp: string;
  content: string;
  attachments?: { name: string; url: string }[];
}

interface NotesProps {
  entityId: string;
  entityType: string;
  className?: string;
}

const initialMockNotes: Note[] = [
  {
    id: "note-1",
    author: "Alex Wong",
    authorInitials: "AW",
    timestamp: new Date(2024, 3, 24, 9, 45).toISOString(), // April 24, 2024 at 09:45
    content: "I\'ve verified all the vendor details and the documentation looks complete.",
  },
  {
    id: "note-2",
    author: "John Smith",
    authorInitials: "JS",
    timestamp: new Date(2024, 3, 25, 14, 29).toISOString(), // April 25, 2024 at 14:29
    content: "This invoice needs approval from finance before we can process the payment. I\'ve flagged it for review.",
    attachments: [{ name: "Financial_Review.pdf", url: "/path/to/financial_review.pdf" }],
  },
];

export function Notes({ entityId, entityType, className }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialMockNotes);
  const [newNoteContent, setNewNoteContent] = useState("");

  const handleAddNote = () => {
    if (newNoteContent.trim() === "") return;

    const newNote: Note = {
      id: `note-${notes.length + 1}`,
      author: "Current User", // Replace with actual current user data
      authorInitials: "CU", // Replace with actual current user data
      timestamp: new Date().toISOString(),
      content: newNoteContent.trim(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNewNoteContent("");
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">Notes</h3>
      <div className="space-y-4 mb-6">
        {notes.map((note) => (
          <Card key={note.id} className="p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-purple-100 text-purple-700 font-medium text-sm">
                  {note.authorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm text-[#01173E]">{note.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(note.timestamp), "MMMM dd, yyyy 'at' HH:mm")}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                {note.attachments && note.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 text-xs text-gray-700">
                        <Paperclip className="h-3 w-3" />
                        <span>{attachment.name}</span>
                        <button className="text-gray-400 hover:text-gray-600">x</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 rounded-xl shadow-sm">
        <div className="font-medium text-sm mb-2">Add a note...</div>
        <Textarea
          placeholder="Write your note here..."
          className="mb-3 min-h-[80px]"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm text-gray-600">
            <Paperclip className="h-4 w-4" />
            Attach
          </Button>
          <Button className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-white text-sm"
            onClick={handleAddNote}
            disabled={newNoteContent.trim() === ""}
          >
            <Send className="h-4 w-4" />
            Add Note
          </Button>
        </div>
      </Card>
    </div>
  );
} 