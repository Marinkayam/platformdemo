import { Note } from "@/types/invoice";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NotesIndicatorProps {
  notes?: Note[];
  invoiceId: string;
}

export function NotesIndicator({ notes = [], invoiceId }: NotesIndicatorProps) {
  const navigate = useNavigate();
  const unreadNotes = notes.filter(note => !note.isRead);
  const hasNewNotes = unreadNotes.some(note => note.isNew);

  if (unreadNotes.length === 0) {
    return <span className="text-muted-foreground text-sm">-</span>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/invoices/${invoiceId}?tab=activity`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={handleClick}
            className="flex items-center gap-1 text-sm hover:text-primary transition-colors cursor-pointer group"
          >
            <div className="relative">
              <MessageSquare className="h-3 w-3" />
              {hasNewNotes && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              )}
            </div>
            <span className="font-medium">{unreadNotes.length}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-80 p-4" side="top">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Unread Notes ({unreadNotes.length})</h4>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {unreadNotes.slice(0, 3).map(note => (
                <div key={note.id} className="text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{note.createdBy}</span>
                    <span className="text-muted-foreground">{formatDate(note.createdAt)}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {note.content.length > 100 
                      ? `${note.content.substring(0, 100)}...` 
                      : note.content
                    }
                  </p>
                  {note.isNew && (
                    <span className="inline-block px-1.5 py-0.5 bg-destructive text-destructive-foreground text-xs rounded">
                      NEW
                    </span>
                  )}
                </div>
              ))}
              {unreadNotes.length > 3 && (
                <p className="text-xs text-muted-foreground font-medium">
                  +{unreadNotes.length - 3} more notes
                </p>
              )}
            </div>
            <p className="text-xs text-primary font-medium">
              Click to view all notes in Activity tab
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}