import { motion } from "framer-motion";
import { MessageCircle, Bot, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PauseOverlayProps {
  onAskDoubt: () => void;
  onAskAI: () => void;
  onOpenBoard: () => void;
}

const PauseOverlay = ({ onAskDoubt, onAskAI, onOpenBoard }: PauseOverlayProps) => {
  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10"
    >
      <div className="flex flex-col gap-4">
        <motion.div
          custom={0}
          variants={buttonVariants}
        >
          <Button
            onClick={onAskDoubt}
            size="lg"
            className="glass-card gap-3 px-8 py-6 text-lg hover-lift border-2 border-primary/20"
          >
            <MessageCircle className="w-6 h-6" />
            Ask a Doubt
          </Button>
        </motion.div>

        <motion.div
          custom={1}
          variants={buttonVariants}
        >
          <Button
            onClick={onAskAI}
            size="lg"
            variant="secondary"
            className="glass-card gap-3 px-8 py-6 text-lg hover-lift border-2 border-secondary/20"
          >
            <Bot className="w-6 h-6" />
            Ask AI Bot
          </Button>
        </motion.div>

        <motion.div
          custom={2}
          variants={buttonVariants}
        >
          <Button
            onClick={onOpenBoard}
            size="lg"
            className="glass-card gap-3 px-8 py-6 text-lg hover-lift border-2 border-accent/20 bg-accent text-accent-foreground"
          >
            <Pencil className="w-6 h-6" />
            Open Board
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PauseOverlay;
