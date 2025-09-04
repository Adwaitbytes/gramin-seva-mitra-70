import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HealthChatInterface } from "@/components/HealthChatInterface";
import { HealthStats } from "@/components/HealthStats";
import { 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  Phone, 
  Star,
  CheckCircle,
  Globe,
  MessageCircle
} from "lucide-react";
import healthHero from "@/assets/health-hero.jpg";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    setShowChat(true);
  };

  if (!showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-chat-bg to-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 text-primary" />
                Trusted by 2.3M+ Rural Families
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">Swasthya Mitra</span>
              <br />
              <span className="text-2xl md:text-3xl font-medium text-muted-foreground">
                स्वास्थ्य मित्र • আপনার স্বাস্থ্য সাথী • ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your multilingual health assistant for rural communities. Get instant health education, 
              symptom guidance, vaccination schedules, and find nearby clinics - available in English, Hindi, Marathi, Bengali, and Odia.
            </p>

            <div className="relative max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-medium">
              <img 
                src={healthHero} 
                alt="Rural families accessing health services through mobile technology" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "Multilingual Support",
                description: "Get health guidance in English, Hindi, Marathi, Bengali, and Odia",
                color: "text-primary"
              },
              {
                icon: Shield,
                title: "Emergency Detection",
                description: "Instant red-flag symptom detection with urgent care guidance",
                color: "text-emergency"
              },
              {
                icon: MapPin,
                title: "Find Healthcare",
                description: "Locate nearby PHCs, CHCs, and hospitals with directions",
                color: "text-accent"
              }
            ].map((feature) => (
              <Card key={feature.title} className="text-center p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <HealthStats />

          {/* Language Selection */}
          <div className="max-w-md mx-auto">
            {!selectedLanguage ? (
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageSelect={handleLanguageSelect}
                onContinue={handleContinue}
              />
            ) : (
              <Card className="text-center p-6 shadow-medium">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Language Selected!</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to start your health conversation
                </p>
                <Button onClick={handleContinue} className="w-full h-12">
                  Start Health Chat
                </Button>
              </Card>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted Healthcare Information</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {[
                "Ministry of Health & Family Welfare",
                "National Health Mission",
                "WHO Guidelines",
                "ICMR Approved"
              ].map((org) => (
                <Badge key={org} variant="outline" className="px-3 py-1">
                  {org}
                </Badge>
              ))}
            </div>
          </div>

          {/* Emergency Notice */}
          <Card className="mt-8 bg-emergency-bg border-emergency/20 max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-emergency mx-auto mb-3" />
              <p className="text-sm text-foreground">
                <strong className="text-emergency">Medical Emergency?</strong>
                <br />
                Call 102 (Ambulance) • 108 (Emergency) immediately
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-medium overflow-hidden">
        <HealthChatInterface language={selectedLanguage} />
      </div>
    </div>
  );
};

export default Index;
