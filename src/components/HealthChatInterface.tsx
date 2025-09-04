import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send, Mic, Heart, Shield, AlertTriangle, Users, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isEmergency?: boolean;
  quickReplies?: string[];
  showActions?: boolean;
}

interface HealthChatInterfaceProps {
  language: string;
}

const translations = {
  en: {
    greeting: "Namaste! I'm Swasthya Mitra, your health assistant. I can help with prevention tips, symptoms education, vaccines, or nearby clinics. What do you need today?",
    placeholder: "Type your health question...",
    quickReplies: ["Symptoms", "Vaccines", "Clinics", "Alerts", "Prevention"],
    title: "Swasthya Mitra"
  },
  hi: {
    greeting: "नमस्ते! मैं स्वास्थ्य मित्र हूं, आपका स्वास्थ्य सहायक। मैं रोकथाम के टिप्स, लक्षणों की शिक्षा, टीकाकरण या नज़दीकी क्लिनिक की जानकारी में मदद कर सकता हूं। आज आपको क्या चाहिए?",
    placeholder: "अपना स्वास्थ्य प्रश्न टाइप करें...",
    quickReplies: ["लक्षण", "टीके", "क्लिनिक", "चेतावनी", "रोकथाम"],
    title: "स्वास्थ्य मित्र"
  },
  mr: {
    greeting: "नमस्कार! मी स्वास्थ्य मित्र आहे, तुमचा आरोग्य सहाय्यक। मी प्रतिबंधात्मक टिप्स, लक्षणांचे शिक्षण, लसीकरण किंवा जवळच्या क्लिनिकची माहिती देऊ शकतो. आज तुम्हाला काय हवे?",
    placeholder: "तुमचा आरोग्य प्रश्न टाइप करा...",
    quickReplies: ["लक्षणे", "लसी", "क्लिनिक", "इशारे", "प्रतिबंध"],
    title: "स्वास्थ्य मित्र"
  },
  bn: {
    greeting: "নমস্কার! আমি স্বাস্থ্য মিত্র, আপনার স্বাস্থ্য সহায়ক। আমি প্রতিরোধমূলক টিপস, উপসর্গের শিক্ষা, টিকাদান বা কাছাকাছি ক্লিনিকের তথ্য দিতে পারি। আজ আপনার কী প্রয়োজন?",
    placeholder: "আপনার স্বাস্থ্য প্রশ্ন টাইপ করুন...",
    quickReplies: ["উপসর্গ", "টিকা", "ক্লিনিক", "সতর্কতা", "প্রতিরোধ"],
    title: "স্বাস্থ্য মিত্র"
  },
  or: {
    greeting: "ନମସ୍କାର! ମୁଁ ସ୍ୱାସ୍ଥ୍ୟ ମିତ୍ର, ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ମୁଁ ପ୍ରତିରୋଧ ଟିପ୍ସ, ଲକ୍ଷଣ ଶିକ୍ଷା, ଟିକାକରଣ କିମ୍ବା ନିକଟସ୍ଥ କ୍ଲିନିକ୍ ର ସୂଚନା ଦେଇପାରେ। ଆଜି ଆପଣଙ୍କର କଣ ଦରକାର?",
    placeholder: "ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ଟାଇପ୍ କରନ୍ତୁ...",
    quickReplies: ["ଲକ୍ଷଣ", "ଟିକା", "କ୍ଲିନିକ୍", "ଚେତାବନୀ", "ପ୍ରତିରୋଧ"],
    title: "ସ୍ୱାସ୍ଥ୍ୟ ମିତ୍ର"
  }
};

export const HealthChatInterface = ({ language }: HealthChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Initial greeting message
    setMessages([{
      id: 1,
      text: t.greeting,
      isUser: false,
      quickReplies: t.quickReplies
    }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const simulateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency detection
    const emergencyKeywords = ['chest pain', 'breathing', 'unconscious', 'bleeding', 'seizure', 'fever high'];
    const isEmergency = emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isEmergency) {
      return {
        id: Date.now(),
        text: `🚨 URGENT ACTION NEEDED

WHAT TO DO NOW:
• Call 102 immediately
• Stay calm and don't leave patient alone
• If breathing problems - sit patient upright

NEAREST EMERGENCY CARE:
Finding closest facilities...

Health information only. Not a medical diagnosis. If symptoms worsen, seek a clinician.`,
        isUser: false,
        isEmergency: true,
        showActions: true
      };
    }

    // Symptoms education
    if (lowerMessage.includes('symptom') || lowerMessage.includes('fever') || lowerMessage.includes('cough')) {
      return {
        id: Date.now(),
        text: `FEVER & COUGH EDUCATION

WHAT TO DO NOW:
• Monitor temperature twice daily
• Drink plenty of safe fluids
• Rest and avoid contact with others

WHEN TO SEEK CARE:
• Temperature > 100.4°F (38°C) for 3+ days
• Difficulty breathing
• Severe weakness or dehydration

PREVENTION IN 3 STEPS:
• Wash hands frequently with soap
• Wear mask in crowded places  
• Get adequate rest and nutrition

Health information only. Not a medical diagnosis. If symptoms worsen, seek a clinician.`,
        isUser: false,
        quickReplies: ["Find Clinic", "Prevention Tips", "Vaccines"]
      };
    }

    // Vaccination
    if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination')) {
      return {
        id: Date.now(),
        text: `VACCINATION SCHEDULE

FOR ADULTS:
• COVID-19 booster: Every 6 months
• Flu vaccine: Yearly (before monsoon)
• Tetanus: Every 10 years

FOR CHILDREN (0-2 years):
• Birth: BCG, Hepatitis B, OPV
• 6 weeks: DPT, IPV, Hib, Rotavirus
• 10 weeks: DPT, IPV, Hib, Rotavirus
• 14 weeks: DPT, IPV, Hib, Rotavirus

NEXT STEPS:
Visit nearest PHC on Tuesdays/Thursdays. Carry vaccination card.

Health information only. Consult healthcare provider for personalized advice.`,
        isUser: false,
        quickReplies: ["Find PHC", "Child Vaccines", "Adult Vaccines"]
      };
    }

    // Default response
    return {
      id: Date.now(),
      text: `I understand you're asking about "${userMessage}". 

I can help you with:
• 🩺 Symptoms education and when to seek care
• 💉 Vaccination schedules for all ages  
• 🏥 Nearby clinics and health centers
• 📢 Local health alerts and outbreaks
• 🛡️ Prevention tips and health education

What would you like to know more about?

Health information only. Not a medical diagnosis. If symptoms worsen, seek a clinician.`,
      isUser: false,
      quickReplies: ["Symptoms Guide", "Find Clinics", "Vaccines", "Prevention"]
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = simulateResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">{t.title}</h1>
            <p className="text-sm text-white/80">Health Assistant • Always Here to Help</p>
          </div>
        </div>
        
        {/* Quick action chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {[
            { icon: Shield, label: "Prevention" },
            { icon: AlertTriangle, label: "Symptoms" },
            { icon: Calendar, label: "Vaccines" },
            { icon: MapPin, label: "Clinics" },
            { icon: Users, label: "Alerts" }
          ].map(({ icon: Icon, label }) => (
            <Button 
              key={label}
              size="sm" 
              variant="secondary" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 shrink-0"
              onClick={() => handleSendMessage(label)}
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <Card className="flex-1 p-4 bg-chat-bg border-0 rounded-none overflow-y-auto max-h-96">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            isEmergency={message.isEmergency}
            quickReplies={message.quickReplies}
            onQuickReply={handleQuickReply}
            showActions={message.showActions}
          />
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-accent-foreground animate-pulse" />
            </div>
            <Card className="bg-chat-bubble-bot p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </Card>

      {/* Input */}
      <div className="p-4 border-t bg-white rounded-b-lg shadow-soft">
        <div className="flex gap-3 items-end">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 min-h-[44px] border-muted focus:border-primary"
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="min-w-[44px] h-11 bg-primary hover:bg-primary-hover"
          >
            <Send className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="min-w-[44px] h-11 border-muted"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Emergency? Call 102 • Health info only, not medical diagnosis
        </p>
      </div>
    </div>
  );
};