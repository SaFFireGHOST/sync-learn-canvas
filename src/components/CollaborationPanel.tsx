import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentsPanel from "./CommentsPanel";
import ChatPanel from "./ChatPanel";
import AIBotPanel from "./AIBotPanel";
import { MessageSquare, Users, Bot } from "lucide-react";

interface CollaborationPanelProps {
  activeTab: "comments" | "chat" | "ai";
  onTabChange: (tab: "comments" | "chat" | "ai") => void;
}

const CollaborationPanel = ({ activeTab, onTabChange }: CollaborationPanelProps) => {
  return (
    <div className="glass-card h-[600px] flex flex-col">
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as any)} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="comments" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2">
            <Users className="w-4 h-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Bot className="w-4 h-4" />
            AI Bot
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="comments" className="h-full mt-0">
            <CommentsPanel />
          </TabsContent>
          <TabsContent value="chat" className="h-full mt-0">
            <ChatPanel />
          </TabsContent>
          <TabsContent value="ai" className="h-full mt-0">
            <AIBotPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CollaborationPanel;
