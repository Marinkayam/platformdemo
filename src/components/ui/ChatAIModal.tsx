import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";

interface ChatAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatAIModal({ isOpen, onClose }: ChatAIModalProps) {
  const [message, setMessage] = React.useState("");

  const handleSendMessage = () => {
    // Implement AI chat logic here
    console.log("Sending message:", message);
    setMessage(""); // Clear input after sending
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src="/chat-ai-logo.png" alt="Chat AI" className="w-6 h-6" />
            Chat with AI Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about your Monto data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Chat messages display area */}
          <div className="min-h-[200px] max-h-[400px] overflow-y-auto border rounded-md p-3 text-sm text-gray-700">
            {/* Example chat message */}
            <div className="flex justify-start mb-2">
              <div className="bg-gray-100 p-2 rounded-lg max-w-[80%]">
                Hello! How can I help you today?
              </div>
            </div>
            {/* Add more messages here dynamically */}
          </div>
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none"
              rows={2}
            />
            <Button type="submit" onClick={handleSendMessage} disabled={!message.trim()}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 