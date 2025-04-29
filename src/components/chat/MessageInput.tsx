
import React from "react";
import { Mic, Send, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSend: () => void;
  isRecording: boolean;
  handleVoiceInput: () => void;
  handleCameraClick: () => void;
  handleImageClick: () => void;
}

const MessageInput = ({
  inputMessage,
  setInputMessage,
  handleSend,
  isRecording,
  handleVoiceInput,
  handleCameraClick,
  handleImageClick
}: MessageInputProps) => {
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
          onClick={handleVoiceInput}
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleCameraClick}
        >
          <Camera className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleImageClick}
        >
          <Image className="h-5 w-5" />
        </Button>
        
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message or command (try /DNA or ask about astronomy)..."
          className="flex-1"
        />
        
        <Button 
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="bg-omni-mint hover:bg-omni-mint/80 text-black"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex justify-start mt-2 space-x-2">
        <Badge variant="outline" className="text-xs bg-gray-50">
          Try: /DNA
        </Badge>
        <Badge variant="outline" className="text-xs bg-gray-50">
          Ask: Tell me about astronomy
        </Badge>
      </div>
    </div>
  );
};

export default MessageInput;
