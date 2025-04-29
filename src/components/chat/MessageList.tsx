
import React from "react";
import OllieAvatar from "@/components/OllieAvatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, ExternalLink, Check, X } from "lucide-react";
import { handleOptionSelect, handleShowDiagram } from "@/hooks/use-chat";

interface MessageOption {
  text: string;
  correct: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'ollie';
  content: string;
  type: 'text' | 'quiz' | 'diagram' | 'video' | 'badge' | 'artifact';
  timestamp: Date;
  options?: MessageOption[];
  hint?: string;
  diagramUrl?: string;
  videoUrl?: string;
  selectedOption?: number;
  answeredCorrectly?: boolean;
  badgeImage?: string;
  badgeTitle?: string;
  artifactType?: 'dna' | 'astronomy';
  artifactContent?: React.ReactNode;
  artifactButtons?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
}

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.sender === 'ollie' && (
            <div className="mr-2 mt-1">
              <OllieAvatar size="sm" />
            </div>
          )}
          
          <div 
            className={`rounded-2xl p-4 max-w-[75%] ${
              message.sender === 'user' 
                ? 'bg-omni-sky text-black rounded-tr-none' 
                : 'bg-omni-mint text-black rounded-tl-none'
            }`}
          >
            {message.type === 'text' && (
              <p className="text-sm md:text-base">{message.content}</p>
            )}
            
            {message.type === 'diagram' && (
              <>
                <p className="text-sm md:text-base mb-2">{message.content}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2 bg-white/50"
                  onClick={() => handleShowDiagram(message.diagramUrl || '')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Diagram
                </Button>
              </>
            )}
            
            {message.type === 'artifact' && (
              <div className="space-y-3">
                <p className="text-sm md:text-base">{message.content}</p>
                
                <div className="bg-white/20 rounded-lg p-1 backdrop-blur-sm">
                  {message.artifactContent}
                </div>
                
                {message.artifactButtons && message.artifactButtons.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.artifactButtons.map((button, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm"
                        className="bg-white/50 backdrop-blur-sm"
                        onClick={button.onClick}
                      >
                        {button.icon && <span className="mr-1">{button.icon}</span>}
                        {button.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {message.type === 'quiz' && (
              <div>
                <div className="flex items-center mb-2">
                  <p className="text-sm md:text-base">{message.content}</p>
                  {message.hint && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 bg-white">
                        <p className="text-sm">{message.hint}</p>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <div className="space-y-2 mt-3">
                  {message.options?.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-2 rounded-md transition-colors ${
                        message.selectedOption === index
                          ? option.correct
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : 'bg-white/70 hover:bg-white/90 border border-gray-200'
                      }`}
                      onClick={() => handleOptionSelect(message.id, index)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{option.text}</span>
                        {message.selectedOption === index && (
                          option.correct ? 
                          <Check className="h-4 w-4 text-green-500" /> : 
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {message.type === 'badge' && (
              <div className="text-center">
                <p className="text-sm md:text-base mb-2">{message.content}</p>
                <div className="inline-block animate-badge-pop bg-omni-yellow rounded-lg p-4 border-2 border-yellow-400">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{message.badgeImage}</span>
                    <div className="text-left">
                      <p className="font-bold">{message.badgeTitle}</p>
                      <p className="text-xs">Achievement unlocked!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {message.sender === 'user' && (
            <div className="ml-2 mt-1">
              <div className="h-8 w-8 bg-omni-lavender rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">You</span>
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
