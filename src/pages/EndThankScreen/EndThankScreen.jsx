import Lottie from 'lottie-react';
import style from './EndThankScreen.module.css';
import { useEffect, useState } from 'react';
import Spinner from '../Home/Spinner';


const EndThankScreen = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [animationData, setAnimationData] = useState(null);
    const [hasPlayed, setHasPlayed] = useState(false); // Ensures animation plays only once

    useEffect(() => {
        // Load animation data only once
        const loadAssets = async () => {
          try {
            const animationDataUrl = 'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Campaign+End+Desktop+(1280-720)+sc.json';
            const animationDataMobileUrl = 'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Campaign+End+Mobile+(375-667)+sc+.json';
    
            const response = await fetch(isMobile ? animationDataMobileUrl : animationDataUrl);
            const data = await response.json();
            
            setAnimationData(data);
          } catch (error) {
            console.error('Failed to load assets:', error);
          }
        };
    
        if (!hasPlayed) {
          loadAssets();
        }
      }, [isMobile, hasPlayed]); // Load only once
    
      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        // Simulate loading delay before animation plays
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);
    
      const handleAnimationComplete = () => {
        setHasPlayed(true); // Prevents reloading animation again
      };

  return (
    <div className={style.container}>
      {isLoading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        animationData && (
          <div className={style.animationContainer}>
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={!hasPlayed} // Plays only if it hasn't played before
              onComplete={handleAnimationComplete} // Set flag after animation completes
              style={{ position: 'absolute', left: 0, right: 0, width: '100vw', height: '100svh' }}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>
        )
      )}
    </div>
  )
}

export default EndThankScreen