import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SendHorizonal, Sparkles, TrendingUp, FileText, DollarSign, AlertCircle, Calendar } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const montoSubjects = [
  { icon: DollarSign, text: "Show me payment trends", category: "Analytics" },
  { icon: FileText, text: "Outstanding invoices summary", category: "Invoices" },
  { icon: TrendingUp, text: "Cash flow forecast", category: "Analytics" },
  { icon: AlertCircle, text: "Exception reports", category: "Issues" },
  { icon: Calendar, text: "Upcoming payment deadlines", category: "Payments" },
  { icon: FileText, text: "Portal sync status", category: "Connections" }
];

export function ChatAIModal({ isOpen, onClose }: ChatAIModalProps) {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your Monto AI Assistant. I can help you with payments, invoices, analytics, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(textToSend),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("payment") || lowerMessage.includes("trend")) {
      return "Based on your recent data, I see payment volumes have increased 15% this month. Your average payment processing time is 2.3 days. Would you like me to show you the detailed breakdown?";
    }
    if (lowerMessage.includes("invoice") || lowerMessage.includes("outstanding")) {
      return "You currently have 23 outstanding invoices totaling $145,290. 5 invoices are overdue by more than 30 days. Shall I prioritize them by amount or due date?";
    }
    if (lowerMessage.includes("cash flow") || lowerMessage.includes("forecast")) {
      return "Your 30-day cash flow forecast shows positive $89,450 net inflow. Expected receivables: $234,100, Expected payables: $144,650. The forecast looks healthy!";
    }
    if (lowerMessage.includes("exception") || lowerMessage.includes("error")) {
      return "I found 3 active exceptions: 2 duplicate invoice alerts and 1 validation error. The duplicate invoices are worth $12,400 total. Would you like me to help resolve these?";
    }
    if (lowerMessage.includes("deadline") || lowerMessage.includes("due")) {
      return "You have 8 payments due in the next 7 days totaling $67,890. The largest payment ($23,400) is due to Microsoft on Friday. Would you like me to set up reminders?";
    }
    if (lowerMessage.includes("portal") || lowerMessage.includes("sync")) {
      return "All portal connections are healthy: Ariba (synced 2h ago), SAP (synced 4h ago), Oracle (synced 1h ago). Last sync brought in 12 new invoices. Everything looks good!";
    }
    
    return "I can help you with payments analysis, invoice management, cash flow forecasting, exception handling, and portal sync status. What specific area would you like to explore?";
  };

  const handleSubjectClick = (subject: string) => {
    handleSendMessage(subject);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Monto AI Assistant
          </DialogTitle>
          <DialogDescription>
            Get insights about your payments, invoices, and financial data
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 max-h-[60vh]">
          {/* Quick Subjects */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Quick Topics</h4>
            <div className="grid grid-cols-2 gap-2">
              {montoSubjects.map((subject, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubjectClick(subject.text)}
                  className="justify-center h-auto py-2 px-3"
                >
                  <span className="text-sm font-normal">{subject.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat messages display area */}
          <div className="flex-1 min-h-[300px] max-h-[350px] overflow-y-auto border rounded-md p-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  <div className="text-sm">{msg.content}</div>
                  <div className={`text-xs mt-1 opacity-70`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Ask about payments, invoices, analytics..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 resize-none min-h-[60px]"
              rows={2}
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!message.trim() || isTyping}
              size="icon"
              className="h-[60px] w-12"
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}