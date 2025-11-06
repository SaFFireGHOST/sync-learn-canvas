import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import CollaborationPanel from "@/components/CollaborationPanel";
import PauseOverlay from "@/components/PauseOverlay";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const StudyRoom = () => {
  const { roomId } = useParams();
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "chat" | "ai" | "whiteboard">("comments");

  const handleMenuToggle = () => {
    setShowPauseMenu(!showPauseMenu);
  };

  const handleAskDoubt = () => {
    setActiveTab("chat");
    setShowPauseMenu(false);
  };

  const handleAskAI = () => {
    setActiveTab("ai");
    setShowPauseMenu(false);
  };

  const handleOpenBoard = () => {
    setActiveTab("whiteboard");
    setShowPauseMenu(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass border-b border-border/50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Rooms
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Advanced Calculus</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <ResizablePanelGroup direction="horizontal" className="gap-6">
          {/* Video Player Section */}
          <ResizablePanel defaultSize={65} minSize={30}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <div className="relative">
                <VideoPlayer onMenuToggle={handleMenuToggle} />
                
                <AnimatePresence>
                  {showPauseMenu && (
                    <PauseOverlay
                      onAskDoubt={handleAskDoubt}
                      onAskAI={handleAskAI}
                      onOpenBoard={handleOpenBoard}
                      onClose={() => setShowPauseMenu(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Collaboration Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <CollaborationPanel activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default StudyRoom;
