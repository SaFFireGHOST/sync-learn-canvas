import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  onMenuToggle: () => void;
}

const VideoPlayer = ({ onMenuToggle }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([70]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
    if (videoRef.current) {
      videoRef.current.currentTime = (value[0] / 100) * videoRef.current.duration;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 aspect-video">
        {/* Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Placeholder for video - in real app, use actual video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            setProgress((video.currentTime / video.duration) * 100);
          }}
        >
          {/* Add video source when available */}
        </video>

        {/* Play overlay when paused */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3">
        {/* Progress Bar */}
        <Slider
          value={[progress]}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="cursor-pointer"
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="hover:bg-primary/10"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="hover:bg-primary/10"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                className="w-24"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">0:00 / 0:00</span>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
