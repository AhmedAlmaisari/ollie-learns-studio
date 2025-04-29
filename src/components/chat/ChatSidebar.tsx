
import React from "react";
import { Button } from "@/components/ui/button";

const ChatSidebar = () => {
  return (
    <div className="hidden lg:block w-64 bg-gray-50 border-r p-4">
      <h2 className="font-bold mb-4">Recent Topics</h2>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">DNA Structure</Button>
        <Button variant="ghost" className="w-full justify-start">Algebra</Button>
        <Button variant="ghost" className="w-full justify-start">Astronomy</Button>
      </div>
    </div>
  );
};

export default ChatSidebar;
