
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check, AlertTriangle, MessageSquare, File, RefreshCw, Paperclip } from "lucide-react";
import { 
  ResizablePanelGroup,
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useNotifications } from "@/context/NotificationsContext";
import { formatDistance } from "date-fns";
import { FilePreview, FileAttachment } from "./FilePreview";

// Mock activity data
const activityData = [
  {
    id: "a1",
    type: "status",
    title: "Status changed to Pending Action",
    user: "John Smith",
    timestamp: new Date(2024, 3, 25, 14, 30),
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

// Activity icon by type
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "system":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
        <Check className="h-4 w-4 text-green-600" />
      </div>;
    case "status":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
        <RefreshCw className="h-4 w-4 text-orange-600" />
      </div>;
    case "document":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
        <File className="h-4 w-4 text-purple-600" />
      </div>;
    case "note":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
        <MessageSquare className="h-4 w-4 text-blue-600" />
      </div>;
    case "warning":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
      </div>;
    default:
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
        <Check className="h-4 w-4 text-gray-600" />
      </div>;
  }
};

interface Note {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments: FileAttachment[];
}

export function ActivityTab() {
  const { id } = useParams();
  const { addNotification } = useNotifications();
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [newNote, setNewNote] = useState("");
  const [hasUnreadNotes, setHasUnreadNotes] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for unread notes
  useEffect(() => {
    const unreadExists = notes.some(note => !note.read);
    setHasUnreadNotes(unreadExists);
  }, [notes]);

  // Handle keyboard shortcut for note submission
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && document.activeElement === textareaRef.current) {
        addNote();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [newNote, attachments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Create URL for preview
      const fileUrl = URL.createObjectURL(file);
      
      // Add to attachments
      const newAttachment: FileAttachment = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: file.type,
        url: fileUrl
      };
      
      setAttachments([...attachments, newAttachment]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
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

  const addNote = () => {
    if (!newNote.trim() && attachments.length === 0) return;
    
    const newNoteObj: Note = {
      id: `n${Date.now()}`,
      user: "Me",
      avatar: "M",
      content: newNote,
      timestamp: new Date(),
      read: true,
      attachments: [...attachments]
    };
    
    setNotes([newNoteObj, ...notes]);
    setNewNote("");
    setAttachments([]);
    
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

  const markAllAsRead = () => {
    setNotes(notes.map(note => ({ ...note, read: true })));
  };

  const handleNoteHover = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, read: true } : note
    ));
  };

  const formatTimestamp = (date: Date): string => {
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  };

  const getRelativeTime = (date: Date): string => {
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-lg">
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        {/* Timeline Panel */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Activity Timeline</h2>
            <div className="relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200"></div>
              
              {/* Timeline events */}
              <div className="space-y-6">
                {activityData.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline icon */}
                    <div className="absolute -left-6 mt-1 bg-white">
                      <ActivityIcon type={activity.type} />
                    </div>
                    
                    {/* Content */}
                    <div>
                      <div className="flex flex-col">
                        <h3 className="font-medium">{activity.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          By {activity.user} • {formatTimestamp(activity.timestamp)}
                        </div>
                      </div>
                      {activity.description && (
                        <p className="mt-1 text-sm">{activity.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        {/* Resizable Handle */}
        <ResizableHandle withHandle />
        
        {/* Notes Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
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
                  <Card 
                    key={note.id} 
                    className={`p-3 ${!note.read ? "bg-purple-50 border-purple-200" : ""}`}
                    onMouseEnter={() => handleNoteHover(note.id)}
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
                                onDelete={() => removeNoteAttachment(note.id, attachment.id)}
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
                ))}
              </div>
            </ScrollArea>
            
            {/* Note composition area */}
            <div className="p-4 border-t">
              <Textarea
                ref={textareaRef}
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
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
                  onClick={addNote} 
                  disabled={!newNote.trim() && attachments.length === 0}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
