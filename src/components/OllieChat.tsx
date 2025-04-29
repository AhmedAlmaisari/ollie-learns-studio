
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OllieAvatar from "@/components/OllieAvatar";

interface OllieChatProps {
  className?: string;
}

const OllieChat = ({ className = "" }: OllieChatProps) => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ollie', content: string}[]>([
    { sender: 'ollie', content: "How can I help with your learning today?" }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', content: chatInput }]);
    
    // Clear input
    const userMessage = chatInput;
    setChatInput("");
    
    // Simulate Ollie response
    setTimeout(() => {
      let response = "I'm here to help you with your learning journey!";
      
      if (userMessage.toLowerCase().includes("math")) {
        response = "Mathematics is a fascinating subject! Would you like to start with algebra or geometry?";
      } else if (userMessage.toLowerCase().includes("quiz")) {
        response = "I can help you prepare for your quiz. What topic are you studying?";
      } else if (userMessage.toLowerCase().includes("help")) {
        response = "I'm always happy to help! You can ask me about any subject, request practice problems, or get explanations on difficult concepts.";
      }
      
      setChatMessages(prev => [...prev, { sender: 'ollie', content: response }]);
    }, 1000);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Chat with Ollie</h2>
        <OllieAvatar size="sm" />
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
        {chatMessages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ollie' && (
              <div className="mr-2 flex-shrink-0">
                <OllieAvatar size="sm" />
              </div>
            )}
            
            <div 
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-omni-sky text-black rounded-tr-none' 
                  : 'bg-omni-mint text-black rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            
            {message.sender === 'user' && (
              <div className="ml-2 flex-shrink-0">
                <div className="h-8 w-8 bg-omni-lavender rounded-full flex items-center justify-center">
                  <span className="text-xs">You</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask Ollie anything about your learning..."
          className="flex-1"
        />
        
        <Button 
          onClick={handleSendMessage}
          disabled={!chatInput.trim()}
          className="bg-omni-mint hover:bg-omni-mint/90 text-black"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OllieChat;
