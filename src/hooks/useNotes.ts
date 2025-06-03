
import { useState, useRef } from "react";
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

// Activity interface for timeline
export interface Activity {
  id: string;
  type: "status" | "document" | "note" | "system" | "exception";
  title: string;
  user: string;
  timestamp: Date;
  description: string | null;
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
    read: true,
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

// Activity timeline data
const initialActivityData: Activity[] = [
  {
    id: "a1",
    type: "status",
    title: "Status changed to Pending Action",
    user: "John Smith",
    timestamp: new Date(2024, 3,  25, 14, 30),
    description: "Invoice requires approval from finance department"
  },
  {
    id: "a2",
    type: "document",
    title: "Document uploaded",
    user: "Maria Garcia",
    timestamp: new Date(2024, 3, 24, 11, 15),
    description: "Supporting_Document.pdf"
  },
  {
    id: "a3",
    type: "note",
    title: "Note added",
    user: "Alex Wong",
    timestamp: new Date(2024, 3, 24, 9, 45),
    description: "Verified vendor details"
  },
  {
    id: "a4",
    type: "system",
    title: "Invoice created",
    user: "System",
    timestamp: new Date(2024, 3, 23, 16, 20),
    description: null
  }
];

export function useNotes() {
  const { addNotification } = useNotifications();
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [activities, setActivities] = useState<Activity[]>(initialActivityData);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const addActivity = (
    type: "status" | "document" | "note" | "system" | "exception",
    title: string,
    description: string | null = null,
    user: string = "Me"
  ) => {
    const newActivity: Activity = {
      id: `a${Date.now()}`,
      type,
      title,
      user,
      timestamp: new Date(),
      description
    };

    setActivities([newActivity, ...activities]);
    
    return newActivity;
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
    activities,
    scrollRef,
    addNote,
    addActivity,
    removeNoteAttachment
  };
}
