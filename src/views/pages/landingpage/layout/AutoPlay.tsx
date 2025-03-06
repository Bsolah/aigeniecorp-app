import React, { useEffect, useRef } from 'react';
import aiVideo from "src/assets/videos/ai_genie.mp4";

const AutoPlayVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // The autoPlay attribute should handle this automatically,
    // but we can add this as a fallback for some browsers
    if (videoRef.current) {
      // Using catch to handle cases where browsers block autoplay
      videoRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error);
        // You might want to show some UI here to tell users to interact with the page
      });
    }
  }, []);

  return (
    <video 
      ref={videoRef} 
      width="100%" 
      muted 
      autoPlay 
      playsInline 
      loop
    >
      {/* Make sure this path matches where your video actually is */}
      <source src={aiVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default AutoPlayVideo;