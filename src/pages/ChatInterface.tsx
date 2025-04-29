
import { useState, useRef, useEffect } from "react";
import { Mic, Send, ExternalLink, HelpCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import OllieAvatar from "@/components/OllieAvatar";
import MainLayout from "@/layouts/MainLayout";

// Define message types for our chat
type MessageType = 'text' | 'quiz' | 'diagram' | 'video' | 'badge';

interface MessageOption {
  text: string;
  correct: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'ollie';
  content: string;
  type: MessageType;
  timestamp: Date;
  options?: MessageOption[];
  hint?: string;
  diagramUrl?: string;
  videoUrl?: string;
  selectedOption?: number;
  answeredCorrectly?: boolean;
  badgeImage?: string;
  badgeTitle?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ollie',
      content: "Hi there! I'm Ollie, your learning assistant. What would you like to learn about today?",
      type: 'text',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState<{title: string, content: React.ReactNode}>({
    title: '',
    content: null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      type: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Process command or generate response
    if (inputMessage.startsWith("/")) {
      processCommand(inputMessage);
    } else {
      setTimeout(() => generateResponse(inputMessage), 1000);
    }
  };

  const processCommand = (command: string) => {
    const parts = command.split(" ");
    const cmd = parts[0].toLowerCase();
    
    switch(cmd) {
      case "/quiz":
        const subject = parts[1] || "general";
        setActiveSubject(subject);
        generateQuiz(subject);
        break;
      default:
        respondWithUnknownCommand(command);
    }
  };

  const respondWithUnknownCommand = (command: string) => {
    const response: Message = {
      id: Date.now().toString(),
      sender: 'ollie',
      content: `I'm not familiar with the command "${command}". Try /quiz followed by a subject name.`,
      type: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, response]);
  };

  const generateResponse = (userInput: string) => {
    // Simple response logic for demo purposes
    // In a real app, you would call an AI API here
    let response: Message;
    
    if (userInput.toLowerCase().includes("dna")) {
      response = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: "DNA (deoxyribonucleic acid) is a molecule that contains the biological instructions for life. It consists of nucleotides joined in a double helix structure.",
        type: 'text',
        timestamp: new Date()
      };
      
      // Add a follow-up message with a diagram
      setTimeout(() => {
        const diagramMessage: Message = {
          id: Date.now().toString(),
          sender: 'ollie',
          content: "Here's how the DNA double helix is structured with its base pairs:",
          type: 'diagram',
          timestamp: new Date(),
          diagramUrl: "https://cdn.kastatic.org/googleusercontent/ADt3OwmJlSMOcHQxNXkxqgpmWXtuZC1McUwgODdvR7KKFg5rPaHa6XYH9jnA-LiVuE7B2oKZeqjUxIIXCqYud9w",
          hint: "The bases always pair in a specific way: Adenine with Thymine, and Cytosine with Guanine."
        };
        setMessages(prev => [...prev, diagramMessage]);
      }, 2000);
      
    } else if (userInput.toLowerCase().includes("math") || userInput.toLowerCase().includes("algebra")) {
      response = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: "Algebra is a branch of mathematics that substitutes letters for numbers. Let me show you how to solve a basic equation.",
        type: 'text',
        timestamp: new Date()
      };
      
      // Add a follow-up message with a diagram
      setTimeout(() => {
        generateQuiz("algebra");
      }, 2000);
      
    } else {
      response = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: `That's an interesting topic! What specific aspect of ${userInput} would you like to learn about?`,
        type: 'text',
        timestamp: new Date()
      };
    }
    
    setMessages(prev => [...prev, response]);
  };

  const generateQuiz = (subject: string) => {
    let quizMessage: Message;
    
    if (subject.toLowerCase() === "dna") {
      quizMessage = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: "Which base pairs with Adenine in DNA?",
        type: 'quiz',
        timestamp: new Date(),
        options: [
          { text: "Guanine", correct: false },
          { text: "Cytosine", correct: false },
          { text: "Thymine", correct: true },
          { text: "Adenine", correct: false }
        ],
        hint: "Remember the base pairing rule: A-T, C-G"
      };
    } else if (subject.toLowerCase() === "algebra") {
      quizMessage = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: "If x + 5 = 12, what is the value of x?",
        type: 'quiz',
        timestamp: new Date(),
        options: [
          { text: "x = 5", correct: false },
          { text: "x = 7", correct: true },
          { text: "x = 8", correct: false },
          { text: "x = 17", correct: false }
        ],
        hint: "Subtract 5 from both sides of the equation."
      };
    } else {
      quizMessage = {
        id: Date.now().toString(),
        sender: 'ollie',
        content: `Let's test your knowledge on ${subject}. What's the capital of France?`,
        type: 'quiz',
        timestamp: new Date(),
        options: [
          { text: "London", correct: false },
          { text: "Berlin", correct: false },
          { text: "Paris", correct: true },
          { text: "Madrid", correct: false }
        ],
        hint: "It's known as the 'City of Light'"
      };
    }
    
    setMessages(prev => [...prev, quizMessage]);
  };

  const handleOptionSelect = (messageId: string, optionIndex: number) => {
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === messageId) {
          const isCorrect = message.options?.[optionIndex].correct;
          
          // If this is the first time answering or changing answer
          if (message.selectedOption === undefined || message.selectedOption !== optionIndex) {
            // If answer is correct and wasn't previously answered correctly
            if (isCorrect && !message.answeredCorrectly) {
              setTimeout(() => {
                const badgeMessage: Message = {
                  id: Date.now().toString(),
                  sender: 'ollie',
                  content: "Great job! You've earned a badge!",
                  type: 'badge',
                  timestamp: new Date(),
                  badgeImage: "🏆",
                  badgeTitle: "Quiz Master"
                };
                setMessages(prev => [...prev, badgeMessage]);
              }, 1000);
            }
          }
          
          return {
            ...message,
            selectedOption: optionIndex,
            answeredCorrectly: isCorrect
          };
        }
        return message;
      })
    );
  };

  const handleShowDiagram = (diagramUrl: string) => {
    setPanelContent({
      title: "Diagram View",
      content: <img src={diagramUrl} alt="Diagram" className="max-w-full h-auto rounded-lg" />
    });
    setShowPanel(true);
  };

  const handleVoiceInput = () => {
    // In a real implementation, this would use the Web Speech API
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone."
      });
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        setInputMessage("Tell me about DNA structure");
        setIsRecording(false);
        toast({
          title: "Voice recording completed",
        });
      }, 3000);
    } else {
      toast({
        title: "Voice recording cancelled",
      });
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] max-w-6xl mx-auto">
        {/* Main Chat Window */}
        <div className="flex flex-col w-full bg-white rounded-lg shadow-sm">
          {/* Chat Messages */}
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
          
          {/* Input Area */}
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
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message or command (try /quiz DNA)..."
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
            
            <div className="flex justify-start mt-2">
              <Badge variant="outline" className="text-xs bg-gray-50">
                Try: /quiz DNA
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Side Panel */}
        <Sheet open={showPanel} onOpenChange={setShowPanel}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>{panelContent.title}</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              {panelContent.content}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </MainLayout>
  );
};

export default ChatInterface;
