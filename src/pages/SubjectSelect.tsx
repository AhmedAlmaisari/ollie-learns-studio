
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Brain, Calculator, Flask, Globe, Lightbulb, ArrowRight } from "lucide-react";
import OllieAvatar from "@/components/OllieAvatar";
import SubjectCard from "@/components/SubjectCard";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const SubjectSelect = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<number>(0);
  
  const subjects = [
    { 
      id: "math", 
      title: "Mathematics", 
      icon: <Calculator className="h-6 w-6" />, 
      color: "bg-omni-mint", 
      progress: 0 
    },
    { 
      id: "science", 
      title: "Science", 
      icon: <Flask className="h-6 w-6" />, 
      color: "bg-omni-sky", 
      progress: 0 
    },
    { 
      id: "history", 
      title: "History", 
      icon: <Globe className="h-6 w-6" />, 
      color: "bg-omni-peach", 
      progress: 0 
    },
    { 
      id: "language", 
      title: "Language Arts", 
      icon: <BookOpen className="h-6 w-6" />, 
      color: "bg-omni-lavender", 
      progress: 0 
    },
    { 
      id: "philosophy", 
      title: "Philosophy", 
      icon: <Brain className="h-6 w-6" />, 
      color: "bg-omni-yellow", 
      progress: 0 
    },
    { 
      id: "innovation", 
      title: "Innovation", 
      icon: <Lightbulb className="h-6 w-6" />, 
      color: "bg-omni-coral", 
      progress: 0 
    },
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <OllieAvatar greeting="What would you like to learn today?" />
          <div className="ml-4">
            <h1 className="text-2xl font-bold mb-2">Choose Your Subject</h1>
            <p className="text-gray-600">Select a subject to begin your learning journey</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div 
              key={subject.id} 
              className={`transition-all duration-200 ${selectedSubject === subject.id ? 'ring-2 ring-omni-mint rounded-xl' : ''}`}
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <SubjectCard
                title={subject.title}
                icon={subject.icon}
                progress={subject.progress}
                color={subject.color}
                to="#"
              />
            </div>
          ))}
        </div>

        {selectedSubject && (
          <div className="mt-10 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">What's your skill level in {subjects.find(s => s.id === selectedSubject)?.title}?</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                  <span>Master</span>
                </div>
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full bg-omni-mint hover:bg-omni-mint/90 text-black font-medium"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SubjectSelect;
