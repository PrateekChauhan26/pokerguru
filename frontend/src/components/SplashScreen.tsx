import React, { useRef, useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleVideoEnd = () => {
    setShowSplash(false);
    setTimeout(onFinish, 600); // Wait for animation
  };

  return (
    <div className={`splash-root${showSplash ? '' : ' splash-fade-out'}`}>  
      {showSplash && (
        <video
          ref={videoRef}
          src="/pokerguru.mp4"
          className="splash-video"
          autoPlay
          playsInline
          muted
          onEnded={handleVideoEnd}
        />
      )}
    </div>
  );
};

export default SplashScreen;
