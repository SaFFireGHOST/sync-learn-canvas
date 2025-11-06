import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import CollaborationPanel from "@/components/CollaborationPanel";
import PauseOverlay from "@/components/PauseOverlay";
import Whiteboard from "@/components/Whiteboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StudyRoom = () => {
  const { roomId } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "chat" | "ai">("comments");

  const handlePause = (paused: boolean) => {
    setIsPaused(paused);
  };

  const handleAskDoubt = () => {
    setActiveTab("chat");
    setIsPaused(false);
  };

  const handleAskAI = () => {
    setActiveTab("ai");
    setIsPaused(false);
  };

  const handleOpenBoard = () => {
    setShowWhiteboard(true);
    setIsPaused(false);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <VideoPlayer onPause={handlePause} />
              
              <AnimatePresence>
                {isPaused && (
                  <PauseOverlay
                    onAskDoubt={handleAskDoubt}
                    onAskAI={handleAskAI}
                    onOpenBoard={handleOpenBoard}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Collaboration Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <CollaborationPanel activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>
        </div>
      </div>

      {/* Whiteboard Modal */}
      <AnimatePresence>
        {showWhiteboard && (
          <Whiteboard onClose={() => setShowWhiteboard(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyRoom;
