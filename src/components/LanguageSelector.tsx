import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageSelect, onContinue }: LanguageSelectorProps) => {
  return (
    <Card className="p-6 max-w-md mx-auto shadow-medium">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <Globe className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Choose Your Language
        </h2>
        <p className="text-muted-foreground text-sm">
          भाषा चुनें • Select Language • ভাষা নির্বাচন করুন • ଭାଷା ବାଛନ୍ତୁ
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant={selectedLanguage === language.code ? "default" : "outline"}
            className="w-full h-14 justify-between text-left"
            onClick={() => onLanguageSelect(language.code)}
          >
            <div>
              <div className="font-medium">{language.name}</div>
              <div className="text-sm text-muted-foreground">{language.nativeName}</div>
            </div>
            {selectedLanguage === language.code && (
              <Check className="w-5 h-5 text-primary-foreground" />
            )}
          </Button>
        ))}
      </div>

      <Button 
        className="w-full h-12 font-medium" 
        onClick={onContinue}
        disabled={!selectedLanguage}
      >
        Continue • जारी रखें • চালিয়ে যান • ଆଗକୁ ବଢ଼ନ୍ତୁ
      </Button>
    </Card>
  );
};