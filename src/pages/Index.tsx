
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OllieAvatar from "@/components/OllieAvatar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [name, setName] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-omni-mint/10 to-omni-sky/10">
      <div className="w-full max-w-md text-center">
        <div className="mb-10 animate-fade-in">
          <div className="flex justify-center mb-4">
            <OllieAvatar size="lg" position="center" />
          </div>
          <h1 className="text-3xl font-bold mb-2 md:text-4xl">Welcome to OmniLearn</h1>
          <p className="text-lg text-gray-600">Your AI-powered learning companion</p>
        </div>

        <div className="space-y-6 bg-white p-8 rounded-xl shadow-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-omni-mint focus:border-transparent outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>
          
          <Button
            disabled={!name.trim() || isStarting}
            onClick={() => {
              setIsStarting(true);
              // Simulating a loading state before navigation
              setTimeout(() => {
                window.location.href = "/chat";
              }, 800);
            }}
            className="w-full bg-omni-mint hover:bg-omni-mint/90 text-black font-medium"
          >
            {isStarting ? "Getting Ready..." : "Let's Chat with Ollie"}
            {!isStarting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link to="/subject-select">
              <Button variant="outline" className="w-full">Classic Mode</Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" className="w-full">Chat Mode</Button>
            </Link>
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/dashboard" className="text-omni-sky font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
