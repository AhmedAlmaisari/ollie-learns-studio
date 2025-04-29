
import { useState } from "react";
import { Check, X, HelpCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import OllieAvatar from "@/components/OllieAvatar";
import MainLayout from "@/layouts/MainLayout";
import { toast } from "@/hooks/use-toast";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 1,
      question: "What is the solution to x + 5 = 12?",
      options: ["x = 5", "x = 7", "x = 8", "x = 17"],
      correctAnswer: "x = 7",
      hint: "Subtract 5 from both sides of the equation."
    },
    {
      id: 2,
      question: "If a rectangle has a width of 4 units and a length of 9 units, what is its area?",
      options: ["13 square units", "26 square units", "36 square units", "45 square units"],
      correctAnswer: "36 square units",
      hint: "Area of a rectangle = length × width"
    },
    {
      id: 3,
      question: "Simplify: 3(x + 2) - 5",
      options: ["3x + 1", "3x + 6 - 5", "3x + 6", "3x + 1"],
      correctAnswer: "3x + 1",
      hint: "First distribute 3 to the terms inside the parenthesis, then simplify."
    }
  ];
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (option: string) => {
    if (!showFeedback) {
      setSelectedOption(option);
    }
  };
  
  const showHint = () => {
    toast({
      title: "Hint",
      description: currentQuestion.hint,
    });
  };
  
  const checkAnswer = () => {
    setShowFeedback(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
      if (score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0) === questions.length) {
        setTimeout(() => {
          setShowBadge(true);
        }, 1000);
      }
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setQuizCompleted(false);
    setShowBadge(false);
    setScore(0);
  };
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {!quizCompleted ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Math Quiz</h1>
                <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
              <OllieAvatar greeting={showFeedback ? (selectedOption === currentQuestion.correctAnswer ? "Great job!" : "Don't worry, learning is a journey!") : "Take your time to think!"} />
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedOption === option
                        ? showFeedback
                          ? option === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-omni-mint bg-omni-mint/10"
                        : "border-gray-200 hover:border-gray-300"
                    } ${showFeedback && option === currentQuestion.correctAnswer ? "border-green-500 bg-green-50" : ""}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {showFeedback && (
                        option === currentQuestion.correctAnswer ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : selectedOption === option ? (
                          <X className="h-5 w-5 text-red-500" />
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  onClick={showHint}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  Hint
                </Button>
                
                {!showFeedback ? (
                  <Button
                    type="button"
                    onClick={checkAnswer}
                    disabled={!selectedOption}
                    className="bg-omni-mint hover:bg-omni-mint/90 text-black"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextQuestion}
                    className="bg-omni-sky hover:bg-omni-sky/90 text-black"
                  >
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quiz Progress</span>
                <span className="text-sm text-gray-500">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-omni-mint h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
            <div className="flex justify-center mb-6">
              <OllieAvatar size="lg" position="center" greeting={score === questions.length ? "Amazing job! Perfect score!" : "Good effort! Let's keep learning!"} />
            </div>
            
            <div className="mb-8">
              <div className="text-5xl font-bold text-omni-mint mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-gray-600">
                {score === questions.length 
                  ? "Perfect score! You're a math genius!" 
                  : score > questions.length / 2 
                    ? "Good job! Keep practicing to improve!" 
                    : "Keep learning! You'll get better with practice!"
                }
              </p>
            </div>
            
            {showBadge && (
              <div className="relative mb-8 animate-badge-pop">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  <span>+1</span>
                </div>
                <div className="bg-omni-yellow rounded-lg p-4 border-2 border-yellow-400">
                  <div className="flex items-center gap-3">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div className="text-left">
                      <h3 className="font-bold">Quiz Master</h3>
                      <p className="text-xs text-gray-600">Ace a quiz with 100% score</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={restartQuiz}
              >
                Try Again
              </Button>
              
              <Button
                className="bg-omni-mint hover:bg-omni-mint/90 text-black"
                onClick={() => window.location.href = '/dashboard'}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Quiz;
