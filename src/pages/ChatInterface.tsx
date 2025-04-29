
import { useState, useRef, useEffect } from "react";
import { Mic, Send, ExternalLink, HelpCircle, Check, X, Dna, Laptop, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import OllieAvatar from "@/components/OllieAvatar";
import OllieChat from "@/components/OllieChat";
import MainLayout from "@/layouts/MainLayout";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import { useChat } from "@/hooks/use-chat";

const ChatInterface = () => {
  const { 
    messages, 
    inputMessage, 
    setInputMessage, 
    handleSend, 
    isRecording, 
    setIsRecording, 
    showPanel, 
    setShowPanel, 
    panelContent, 
    handleVoiceInput,
    handleCameraClick,
    handleImageClick,
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] max-w-6xl mx-auto">
        {/* Main Chat Window */}
        <div className="flex flex-col w-full bg-white rounded-lg shadow-sm">
          {/* Chat Messages */}
          <MessageList 
            messages={messages} 
            messagesEndRef={messagesEndRef} 
          />
          
          {/* Input Area */}
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSend={handleSend}
            isRecording={isRecording}
            handleVoiceInput={handleVoiceInput}
            handleCameraClick={handleCameraClick}
            handleImageClick={handleImageClick}
          />
        </div>
        
        {/* Side Panel */}
        <ChatPanel 
          showPanel={showPanel} 
          setShowPanel={setShowPanel} 
          panelContent={panelContent} 
        />
      </div>
    </MainLayout>
  );
};

export default ChatInterface;
