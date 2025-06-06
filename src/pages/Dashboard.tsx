import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Star, User, ArrowRight, BookOpen, Send } from "lucide-react";
import OllieAvatar from "@/components/OllieAvatar";
import AchievementBadge from "@/components/AchievementBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ollie', content: string}[]>([
    { sender: 'ollie', content: "How can I help with your learning today?" }
  ]);

  const modules = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      completed: true,
      position: "left"
    },
    {
      id: 2,
      title: "Algebra Fundamentals",
      completed: true,
      position: "right"
    },
    {
      id: 3,
      title: "Working with Equations",
      completed: false,
      position: "left",
      active: true
    },
    {
      id: 4,
      title: "Graphing and Functions",
      completed: false,
      position: "right"
    },
    {
      id: 5,
      title: "Advanced Problem Solving",
      completed: false,
      position: "left"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Complete your first lesson",
      icon: <BookOpen className="w-6 h-6" />,
      earned: true
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Ace a quiz with 100% score",
      icon: <Star className="w-6 h-6" />,
      earned: true
    },
    {
      id: 3,
      title: "Dedicated Learner",
      description: "Complete 5 lessons in a row",
      icon: <Check className="w-6 h-6" />,
      earned: false
    }
  ];

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
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Profile Card */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Profile</h2>
                <div className="bg-omni-mint rounded-full p-1.5">
                  <User className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-omni-peach rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-lg font-medium">Jane Doe</h3>
                <p className="text-gray-500 text-sm mb-4">Mathematics - Intermediate</p>
                
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div className="bg-omni-sky h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-gray-500 self-end">Level 3 (45% to Level 4)</p>
                
                <div className="flex gap-3 mt-6">
                  {achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      earned={achievement.earned}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning Roadmap */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Your Learning Path</h2>
                  <p className="text-gray-500 text-sm">Mathematics curriculum</p>
                </div>
                <OllieAvatar greeting="You're making great progress!" />
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2"></div>
                
                <div className="relative z-10 space-y-8">
                  {modules.map((module) => (
                    <div 
                      key={module.id} 
                      className={`flex ${
                        module.position === 'left' 
                          ? 'justify-start pr-8 md:pr-0' 
                          : 'justify-end pl-8 md:pl-0'
                      }`}
                    >
                      <div 
                        className={`relative w-full md:w-5/6 p-4 rounded-lg border ${
                          module.active 
                            ? 'border-omni-mint bg-omni-mint/10' 
                            : module.completed 
                              ? 'border-gray-200 bg-white' 
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className={`font-medium ${module.active ? 'text-black' : 'text-gray-700'}`}>
                            {module.title}
                          </h3>
                          
                          <div 
                            className={`rounded-full w-8 h-8 flex items-center justify-center ${
                              module.completed 
                                ? 'bg-green-500 text-white' 
                                : module.active 
                                  ? 'bg-omni-mint' 
                                  : 'bg-gray-200'
                            }`}
                          >
                            {module.completed ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <span>{module.id}</span>
                            )}
                          </div>
                        </div>
                        
                        {module.active && (
                          <div className="mt-3">
                            <Button 
                              className="bg-omni-mint hover:bg-omni-mint/90 text-black w-full md:w-auto"
                            >
                              Start Next Lesson
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`absolute left-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm top-4 -translate-x-1/2 ${
                          module.completed 
                            ? 'bg-green-500' 
                            : module.active 
                              ? 'bg-omni-mint' 
                              : 'bg-gray-300'
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Link 
                to="/quiz" 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <span className="font-medium">Try a Quiz</span>
                <div className="bg-omni-sky rounded-full p-1.5">
                  <Star className="h-4 w-4" />
                </div>
              </Link>
              
              <Link 
                to="/workspace" 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <span className="font-medium">Create Summary</span>
                <div className="bg-omni-peach rounded-full p-1.5">
                  <BookOpen className="h-4 w-4" />
                </div>
              </Link>
              
              <Link 
                to="/custom-content" 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <span className="font-medium">Custom Content</span>
                <div className="bg-omni-lavender rounded-full p-1.5">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Ollie Chat Box */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
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
      </div>
    </MainLayout>
  );
};

export default Dashboard;
