import { motion } from "framer-motion";
import { BookOpen, Users, Video } from "lucide-react";
import RoomCard from "@/components/RoomCard";
import heroImage from "@/assets/hero-study.jpg";
import thumbMath from "@/assets/thumb-math.jpg";
import thumbPhysics from "@/assets/thumb-physics.jpg";
import thumbBiology from "@/assets/thumb-biology.jpg";

const studyRooms = [
  {
    id: "1",
    title: "Advanced Calculus",
    subject: "Mathematics",
    thumbnail: thumbMath,
    activeMembers: 12,
    totalDuration: "2h 30m",
  },
  {
    id: "2",
    title: "Quantum Physics",
    subject: "Physics",
    thumbnail: thumbPhysics,
    activeMembers: 8,
    totalDuration: "1h 45m",
  },
  {
    id: "3",
    title: "Cell Biology",
    subject: "Biology",
    thumbnail: thumbBiology,
    activeMembers: 15,
    totalDuration: "3h 10m",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </div>
        
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StudySync
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Collaborate, learn, and grow together in real-time study sessions
            </p>
            
            <div className="flex gap-8 justify-center mt-8">
              <div className="flex items-center gap-2 text-foreground/80">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">35 Active Learners</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Video className="w-5 h-5 text-secondary" />
                <span className="font-medium">3 Live Rooms</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <BookOpen className="w-5 h-5 text-accent" />
                <span className="font-medium">15+ Topics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Study Rooms Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Active Study Rooms</h2>
            <p className="text-muted-foreground">Join a session and start learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <RoomCard {...room} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
