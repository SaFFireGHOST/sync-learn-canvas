import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  user: string;
  timestamp: string;
  videoTime: string;
  content: string;
}

const CommentsPanel = () => {
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      user: "John Doe",
      timestamp: "2 min ago",
      videoTime: "12:34",
      content: "Can someone explain this integration step?",
    },
    {
      id: "2",
      user: "Sarah Miller",
      timestamp: "5 min ago",
      videoTime: "08:15",
      content: "Great explanation on limits! Very clear.",
    },
    {
      id: "3",
      user: "Alex Kim",
      timestamp: "8 min ago",
      videoTime: "05:22",
      content: "Could we go over the chain rule again?",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In real app, add comment to list
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {comment.user.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{comment.videoTime}</span>
                  </div>
                  <p className="text-sm mt-2">{comment.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          placeholder="Add a timestamped comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default CommentsPanel;
