
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface OllieAvatarProps {
  greeting?: string;
  position?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
}

const OllieAvatar = ({ 
  greeting = "Hey there! Ready to learn?",
  position = "left", 
  size = "md" 
}: OllieAvatarProps) => {
  const [showGreeting, setShowGreeting] = useState(false);
  
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };
  
  const positionClasses = {
    left: "left-0 ml-2",
    right: "right-0 mr-2",
    center: "mx-auto",
  };

  const handleClick = () => {
    setShowGreeting(!showGreeting);
    if (!showGreeting) {
      toast({
        title: "Ollie says:",
        description: greeting,
      });
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleClick}
        className={`${sizeClasses[size]} ${positionClasses[position]} relative cursor-pointer bg-omni-mint rounded-full overflow-hidden border-2 border-white shadow-md transition-transform hover:scale-105 active:scale-95`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full bg-white"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-2/4 h-1/6 bg-omni-coral rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/6 bg-white rounded-full border border-omni-mint"></div>
        <div className="absolute top-1/3 right-1/3 w-1/3 h-1/6 bg-white rounded-full border border-omni-mint"></div>
        <div className="absolute top-1/3 left-1/3 w-1/6 h-1/6 bg-black rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1/6 h-1/6 bg-black rounded-full"></div>
      </button>
    </div>
  );
};

export default OllieAvatar;
