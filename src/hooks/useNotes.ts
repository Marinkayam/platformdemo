
import { useState, useEffect, useRef } from "react";
import { FileAttachment } from "@/components/invoices/detail/FilePreview";
import { useNotifications } from "@/context/NotificationsContext";

// Note interface
export interface Note {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments: FileAttachment[];
}

// Mock notes data
const initialNotesData = [
  {
    id: "n1",
    user: "Alex Wong",
    avatar: "AW",
    content: "I've verified all the vendor details and the documentation looks complete.",
    timestamp: new Date(2024, 3, 24, 9, 45),
    read: true,
    attachments: []
  },
  {
    id: "n2",
    user: "John Smith",
    avatar: "JS",
    content: "This invoice needs approval from finance before we can process the payment. I've flagged it for review.",
    timestamp: new Date(2024, 3, 25, 14, 29),
    read: false,
    attachments: [
      {
        id: "a1",
        name: "Financial_Review.pdf",
        type: "application/pdf",
        url: "#"
      }
    ]
  }
];

export function useNotes() {
  const { addNotification } = useNotifications();
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [hasUnreadNotes, setHasUnreadNotes] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check for unread notes
  useEffect(() => {
    const unreadExists = notes.some(note => !note.read);
    setHasUnreadNotes(unreadExists);
  }, [notes]);

  const markAllAsRead = () => {
    setNotes(notes.map(note => ({ ...note, read: true })));
  };

  const handleNoteHover = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, read: true } : note
    ));
  };

  const addNote = (content: string, attachments: FileAttachment[]) => {
    const newNoteObj: Note = {
      id: `n${Date.now()}`,
      user: "Me",
      avatar: "M",
      content: content,
      timestamp: new Date(),
      read: true,
      attachments: [...attachments]
    };
    
    setNotes([newNoteObj, ...notes]);
    
    // Add notification
    addNotification({
      title: "Note Added",
      message: "Your note has been added to the invoice.",
      type: "success"
    });
    
    // Scroll to top of notes
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const removeNoteAttachment = (noteId: string, attachmentId: string) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          attachments: note.attachments.filter(att => att.id !== attachmentId)
        };
      }
      return note;
    }));
  };

  return {
    notes,
    hasUnreadNotes,
    scrollRef,
    markAllAsRead,
    handleNoteHover,
    addNote,
    removeNoteAttachment
  };
}
