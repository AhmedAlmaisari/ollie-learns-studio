
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ChatPanelProps {
  showPanel: boolean;
  setShowPanel: (show: boolean) => void;
  panelContent: {
    title: string;
    content: React.ReactNode;
  };
}

const ChatPanel = ({ showPanel, setShowPanel, panelContent }: ChatPanelProps) => {
  return (
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
  );
};

export default ChatPanel;
