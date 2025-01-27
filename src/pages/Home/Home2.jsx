import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import style from './Home2.module.css';
import starticon from '../../assets/Vector.png';
import animationData from '../../assets/Splash-sc Initial (1280-720).json';
import animationDataformobile from '../../assets/Mobile-Splash-sc.json';
import startButtonAnimationDesktop from '../../assets/Splash-sc END (1280-720).json';
import startButtonAnimationMobile from '../../assets/Mobile-Splash-sc (END).json';
import Spinner from './Spinner';


const Home2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const [playFullScreenAnimation, setPlayFullScreenAnimation] = useState(false); // Track if the full-screen animation should play

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  const handleStartClick = () => {
    setPlayFullScreenAnimation(true); // Trigger full-screen animation
  };

  const handleFullScreenAnimationComplete = () => {
    navigate('/selection'); // Navigate after the animation finishes
  };

  useEffect(() => {
    // Check if the screen is mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches); // Update state based on the screen size

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize); // Listen for screen size changes

    return () => {
      mediaQuery.removeEventListener('change', handleResize); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    // Simulate loading for spinner (can be tied to animation loading in a real use case)
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after animation is ready
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.container}>
      {isLoading ? (
        <Spinner /> // Show spinner while loading
      ) : playFullScreenAnimation ? ( // Show full-screen animation if triggered
        <div className={style.fullScreenAnimation}>
          <Lottie
            animationData={
              isMobile
                ? startButtonAnimationMobile
                : startButtonAnimationDesktop
            }
            loop={false} // Play only once
            autoplay={true}
            onComplete={handleFullScreenAnimationComplete} // Navigate after animation finishes
          />
        </div>
      ) : (
        <>
          <div className={style.animationContainer}>
            <Lottie
              animationData={isMobile ? animationDataformobile : animationData} // Conditional animation for the main content
              loop={false}
              autoplay={true}
              onComplete={handleAnimationComplete} // Animation completion logic
            />
          </div>
          {isAnimationComplete && ( // Show content only after animation finishes
            <div className={style.content}>
              <div className={style.btnwrapper}>
                <button className={style.button} onClick={handleStartClick}>
                  Start
                </button>
                <img src={starticon} alt="start icon" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home2;
