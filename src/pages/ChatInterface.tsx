import { useState, useRef, useEffect } from "react";
import { Mic, Send, ExternalLink, HelpCircle, Check, X, Dna, Laptop, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import OllieAvatar from "@/components/OllieAvatar";
import MainLayout from "@/layouts/MainLayout";

// Define message types for our chat
type MessageType = 'text' | 'quiz' | 'diagram' | 'video' | 'badge' | 'artifact';

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
  artifactType?: 'dna' | 'astronomy';
  artifactContent?: React.ReactNode;
  artifactButtons?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ollie',
      content: "Hi there! I'm Ollie, your learning assistant. What would you like to learn about today? Try typing '/DNA' to learn about DNA structure or ask about astronomy!",
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
      case "/dna":
        generateDNAArtifact();
        break;
      default:
        respondWithUnknownCommand(command);
    }
  };

  const respondWithUnknownCommand = (command: string) => {
    const response: Message = {
      id: Date.now().toString(),
      sender: 'ollie',
      content: `I'm not familiar with the command "${command}". Try /quiz followed by a subject name or /DNA to learn about DNA structure.`,
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
      generateDNAArtifact();
      return;
    } else if (userInput.toLowerCase().includes("astronomy") || 
               userInput.toLowerCase().includes("space") || 
               userInput.toLowerCase().includes("planet") || 
               userInput.toLowerCase().includes("star")) {
      generateAstronomyArtifact();
      return;
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

  const handleCameraClick = () => {
    toast({
      title: "Camera feature",
      description: "This would open your camera in a real implementation."
    });
  };

  const handleImageClick = () => {
    toast({
      title: "Upload image",
      description: "This would open an image picker in a real implementation."
    });
  };

  const generateDNAArtifact = () => {
    const dnaArtifact: Message = {
      id: Date.now().toString(),
      sender: 'ollie',
      content: "DNA (deoxyribonucleic acid) is a molecule composed of two polynucleotide chains that form a double helix carrying genetic instructions.",
      type: 'artifact',
      timestamp: new Date(),
      artifactType: 'dna',
      artifactContent: (
        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Dna className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-medium">DNA Structure</h3>
          </div>
          
          <div className="aspect-video bg-blue-50 rounded-md mb-3 overflow-hidden">
            <img 
              src="https://cdn.kastatic.org/googleusercontent/ADt3OwmJlSMOcHQxNXkxqgpmWXtuZC1McUwgODdvR7KKFg5rPaHa6XYH9jnA-LiVuE7B2oKZeqjUxIIXCqYud9w" 
              alt="DNA Double Helix" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">Key Features:</span>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Double helix structure discovered by Watson and Crick in 1953</li>
              <li>Made of nucleotides containing a sugar, phosphate, and nitrogenous base</li>
              <li>Four types of nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C)</li>
              <li>Base pairing is specific: A pairs with T, and G pairs with C</li>
            </ul>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            The specific sequence of bases carries the genetic information.
          </div>
        </div>
      ),
      artifactButtons: [
        {
          label: "View 3D Model",
          onClick: () => {
            setPanelContent({
              title: "DNA 3D Model",
              content: (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-50 w-full max-w-md aspect-square rounded-lg flex items-center justify-center mb-4">
                    <img 
                      src="https://cdn.kastatic.org/googleusercontent/YuGbEam9Ixl0NzmznP9H6E8MKOBIeYKQiCWL-XA2XVgeVD9Iim6OYiImvOzQiVJNwd4GbTYL-5bUS1IQSuLQc6w" 
                      alt="DNA 3D Structure" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="space-y-4 max-w-md px-4">
                    <h3 className="text-lg font-medium">DNA Double Helix Structure</h3>
                    <p className="text-sm">
                      This 3D model shows how the two strands of DNA twist around each other to form a double helix. The colored components represent different parts of the DNA molecule:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li><span className="text-blue-500 font-medium">Blue</span>: Sugar-phosphate backbone</li>
                      <li><span className="text-red-500 font-medium">Red</span>: Adenine (A)</li>
                      <li><span className="text-green-500 font-medium">Green</span>: Thymine (T)</li>
                      <li><span className="text-yellow-500 font-medium">Yellow</span>: Guanine (G)</li>
                      <li><span className="text-purple-500 font-medium">Purple</span>: Cytosine (C)</li>
                    </ul>
                  </div>
                </div>
              )
            });
            setShowPanel(true);
          },
          icon: <ExternalLink className="h-4 w-4" />
        }
      ]
    };
    
    setMessages(prev => [...prev, dnaArtifact]);
  };

  const generateAstronomyArtifact = () => {
    const astronomyArtifact: Message = {
      id: Date.now().toString(),
      sender: 'ollie',
      content: "Astronomy is the study of celestial objects like stars, planets, and galaxies, as well as the physics and chemistry of the universe.",
      type: 'artifact',
      timestamp: new Date(),
      artifactType: 'astronomy',
      artifactContent: (
        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M21.17 8s-.38 2.72-2.38 3.25"></path>
              <path d="M3.95 6.06S6.57 6.44 7.1 4.44"></path>
              <path d="M10.88 21.94s-.38-2.72 1.62-3.25"></path>
              <path d="M2.83 16s2.72-.38 3.25 1.62"></path>
            </svg>
            <h3 className="text-lg font-medium">Exploring the Cosmos</h3>
          </div>
          
          <div className="aspect-video bg-indigo-50 rounded-md mb-3 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&auto=format&fit=crop" 
              alt="Galaxy" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">Key Concepts:</span>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our solar system contains 8 planets orbiting the Sun</li>
              <li>The universe is expanding, with galaxies moving away from each other</li>
              <li>Stars form from clouds of gas and dust called nebulae</li>
              <li>Black holes are regions where gravity is so strong that nothing can escape</li>
            </ul>
          </div>
        </div>
      ),
      artifactButtons: [
        {
          label: "View in VR",
          onClick: () => {
            setPanelContent({
              title: "Solar System VR Experience",
              content: (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="bg-indigo-50 w-full max-w-md aspect-video rounded-lg flex items-center justify-center mb-4 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&auto=format&fit=crop" 
                      alt="VR Solar System" 
                      className="max-w-full max-h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Laptop className="h-12 w-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="space-y-4 max-w-md px-4">
                    <h3 className="text-lg font-medium">Virtual Reality Solar System Tour</h3>
                    <p className="text-sm">
                      In a full VR experience, you would be able to:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Fly between planets and moons</li>
                      <li>Witness cosmic events like solar flares</li>
                      <li>Explore the surface of Mars and other planets</li>
                      <li>View the scale and distances of our solar system</li>
                    </ul>
                    <div className="mt-4 bg-yellow-100 p-3 rounded-md">
                      <p className="text-xs text-yellow-800">This is a demonstration. In a real app, this would launch a VR experience.</p>
                    </div>
                  </div>
                </div>
              )
            });
            setShowPanel(true);
          },
          icon: <Laptop className="h-4 w-4" />
        },
        {
          label: "AR View",
          onClick: () => {
            toast({
              title: "AR Experience",
              description: "AR mode would launch on a mobile device to overlay planets in your room."
            });
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a1 1 0 0 0-1 1v.38A4 4 0 0 0 9.53 4 1 1 0 1 0 8.47 5.12 2 2 0 0 1 10 7v.38a1 1 0 0 0 2 0V7a2 2 0 0 1 1.53-1.94 1 1 0 1 0-1.06-1.12A4 4 0 0 0 11 3.38V3a1 1 0 0 0-1-1Z"></path>
            <path d="M12 21a1 1 0 0 0-1 1v.38a1 1 0 0 0 2 0V22a1 1 0 0 0-1-1Z"></path>
            <path d="M21 12a1 1 0 0 0-1-1h-.38a4 4 0 0 0-.62-1.47 1 1 0 1 0-1.12 1.06A2 2 0 0 1 19 12v.38a1 1 0 0 0 2 0Z"></path>
            <path d="M2 12a1 1 0 0 0 1 1h.38a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1Z"></path>
            <path d="M19 14.86a1 1 0 0 0-1.41 0l-.35.35a1 1 0 0 0 1.41 1.41l.35-.35a1 1 0 0 0 0-1.41Z"></path>
            <path d="M5.65 4.94a1 1 0 0 0-1.41 0l-.35.35a1 1 0 0 0 1.41 1.41l.35-.35a1 1 0 0 0 0-1.41Z"></path>
            <path d="M8.59 17.76a1 1 0 0 0-1.41 0l-.35.35a1 1 0 1 0 1.41 1.41l.35-.35a1 1 0 0 0 0-1.41Z"></path>
            <path d="M4.94 18.35a1 1 0 0 0 0-1.41l-.35-.35a1 1 0 0 0-1.41 1.41l.35.35a1 1 0 0 0 1.41 0Z"></path>
          </svg>
        }
      ]
    };
    
    setMessages(prev => [...prev, astronomyArtifact]);
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
