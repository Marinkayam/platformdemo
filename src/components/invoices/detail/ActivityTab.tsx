
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check, AlertTriangle, MessageSquare, File, RefreshCw } from "lucide-react";
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
    read: true
  },
  {
    id: "n2",
    user: "John Smith",
    avatar: "JS",
    content: "This invoice needs approval from finance before we can process the payment. I've flagged it for review.",
    timestamp: new Date(2024, 3, 25, 14, 29),
    read: false
  }
];

// Activity icon by type
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "system":
      return <Check className="h-5 w-5 text-green-500" />;
    case "status":
      return <RefreshCw className="h-5 w-5 text-orange-500" />;
    case "document":
      return <File className="h-5 w-5 text-purple-500" />;
    case "note":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    default:
      return <Check className="h-5 w-5 text-green-500" />;
  }
};

export function ActivityTab() {
  const { id } = useParams();
  const { addNotification } = useNotifications();
  const [notes, setNotes] = useState(initialNotesData);
  const [newNote, setNewNote] = useState("");
  const [hasUnreadNotes, setHasUnreadNotes] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, [newNote]);

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteObj = {
      id: `n${Date.now()}`,
      user: "Me",
      avatar: "M",
      content: newNote,
      timestamp: new Date(),
      read: true
    };
    
    setNotes([newNoteObj, ...notes]);
    setNewNote("");
    
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
                    <div className="absolute -left-6 mt-1 bg-white p-1">
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
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">⌘ + Enter to send</span>
                <Button 
                  onClick={addNote} 
                  disabled={!newNote.trim()}
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
