
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Check } from "lucide-react";

interface SubjectCardProps {
  title: string;
  icon?: React.ReactNode;
  progress?: number;
  color?: string;
  to: string;
}

const SubjectCard = ({ 
  title, 
  icon = <BookOpen />, 
  progress = 0, 
  color = "bg-omni-mint", 
  to 
}: SubjectCardProps) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      className="block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`omni-card ${hover ? 'transform -translate-y-1' : ''} h-full flex flex-col justify-between`}>
        <div className="flex flex-col items-center gap-4 p-4">
          <div className={`${color} p-4 rounded-lg`}>
            {icon}
          </div>
          <h3 className="text-center">{title}</h3>
        </div>
        <div className="mt-3">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 text-gray-600">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${progress}%` }} 
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${color}`}
              ></div>
            </div>
          </div>
          {progress === 100 && (
            <div className="flex items-center text-green-500 text-sm justify-center">
              <Check className="w-4 h-4 mr-1" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
