
import { useState } from "react";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned?: boolean;
  onEarn?: () => void;
  className?: string;
}

const AchievementBadge = ({ 
  title, 
  description, 
  icon, 
  earned = false,
  onEarn,
  className = "" 
}: AchievementBadgeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!earned && onEarn) {
      setIsAnimating(true);
      setTimeout(() => {
        onEarn();
        setIsAnimating(false);
      }, 600);
    }
  };

  return (
    <div 
      className={`relative flex flex-col items-center ${className}`}
      onClick={handleClick}
    >
      <div 
        className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center ${
          earned ? 'bg-omni-yellow border-2 border-yellow-400' : 'bg-gray-200 border-2 border-gray-300'
        } ${isAnimating ? 'animate-badge-pop' : ''}`}
      >
        <div className={`${earned ? 'opacity-100' : 'opacity-40'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {!earned && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-30 rounded-full flex items-center justify-center">
          <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs">
            Locked
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
