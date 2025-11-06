import { motion } from "framer-motion";
import { MessageCircle, Bot, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PauseOverlayProps {
  onAskDoubt: () => void;
  onAskAI: () => void;
  onOpenBoard: () => void;
  onClose: () => void;
}

const PauseOverlay = ({ onAskDoubt, onAskAI, onOpenBoard, onClose }: PauseOverlayProps) => {
  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-4 right-4 z-10 glass-card p-4 border-2 border-primary/20"
    >
      <div className="flex flex-col gap-2 min-w-[200px]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Quick Actions</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Button
          onClick={onAskDoubt}
          variant="outline"
          className="gap-2 justify-start hover-lift"
        >
          <MessageCircle className="w-4 h-4" />
          Ask a Doubt
        </Button>

        <Button
          onClick={onAskAI}
          variant="outline"
          className="gap-2 justify-start hover-lift"
        >
          <Bot className="w-4 h-4" />
          Ask AI Bot
        </Button>

        <Button
          onClick={onOpenBoard}
          variant="outline"
          className="gap-2 justify-start hover-lift"
        >
          <Pencil className="w-4 h-4" />
          Open Board
        </Button>
      </div>
    </motion.div>
  );
};

export default PauseOverlay;
