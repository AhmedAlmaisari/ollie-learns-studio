
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import OllieAvatar from "@/components/OllieAvatar";
import MainLayout from "@/layouts/MainLayout";

const CustomContent = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (content.trim().length < 50) {
      toast({
        title: "Content too short",
        description: "Please enter at least 50 characters to begin learning.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Content received!",
      description: "Starting your personalized learning experience.",
    });
    
    // In a real app, we would save this content and process it
    // For now, just redirect to dashboard
    setTimeout(() => navigate("/dashboard"), 1500);
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Custom Learning Content</h1>
            <p className="text-gray-600">Paste any content you want to learn about</p>
          </div>
          <OllieAvatar greeting="I'll help you learn this content effectively!" />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-omni-mint rounded-full p-2">
              <Book className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Enter your learning content</h2>
              <p className="text-sm text-gray-500">Paste articles, notes, or any text you want to learn</p>
            </div>
          </div>
          
          <Textarea
            placeholder="Paste or type the content you want to learn here..."
            className="min-h-[300px] mb-6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={content.trim().length < 50}
              className="bg-omni-mint hover:bg-omni-mint/90 text-black flex items-center gap-2"
            >
              Start Learning
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomContent;
