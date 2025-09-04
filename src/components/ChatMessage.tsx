import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User, AlertTriangle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isEmergency?: boolean;
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
  showActions?: boolean;
}

export const ChatMessage = ({ 
  message, 
  isUser, 
  isEmergency = false,
  quickReplies,
  onQuickReply,
  showActions = false
}: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="w-8 h-8 mt-1">
        <AvatarImage src={isUser ? undefined : "/health-bot-avatar.png"} />
        <AvatarFallback className={cn(
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "max-w-xs sm:max-w-md",
        isUser ? "items-end" : "items-start"
      )}>
        <Card className={cn(
          "p-3 text-sm shadow-soft transition-all duration-300",
          isUser 
            ? "bg-chat-bubble-user text-white ml-auto" 
            : isEmergency 
              ? "bg-emergency-bg border-emergency text-foreground shadow-emergency"
              : "bg-chat-bubble-bot border-border",
          isEmergency && "animate-pulse"
        )}>
          {isEmergency && (
            <div className="flex items-center gap-2 mb-2 text-emergency">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold text-xs uppercase">URGENT</span>
            </div>
          )}
          
          <div className="whitespace-pre-wrap leading-relaxed">
            {message}
          </div>

          {showActions && !isUser && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
              <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                <Phone className="w-3 h-3 mr-1" />
                Call 102
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                Find Clinic
              </Button>
            </div>
          )}
        </Card>

        {quickReplies && quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                size="sm"
                variant="secondary"
                className="h-8 px-3 text-xs rounded-full"
                onClick={() => onQuickReply?.(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};