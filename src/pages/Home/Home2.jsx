import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import style from './Home2.module.css';
import Spinner from './Spinner';

const Home2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const [playFullScreenAnimation, setPlayFullScreenAnimation] = useState(false); // Track if the full-screen animation should play

  const [startIcon, setStartIcon] = useState('');
  const [animationData, setAnimationData] = useState(null);
  const [animationDataMobile, setAnimationDataMobile] = useState(null);
  const [startButtonAnimationDesktop, setStartButtonAnimationDesktop] = useState(null);
  const [startButtonAnimationMobile, setStartButtonAnimationMobile] = useState(null);

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
    // Simulate loading for spinner
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after animation is ready
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Dynamically load assets
    const loadAssets = async () => {
      try {
        const startIconUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Vector.png';
        const animationDataUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Splash-sc%20Initial%20(1280-720).json';
        const animationDataMobileUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Mobile-Splash-sc.json';
        const startButtonAnimationDesktopUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Splash-sc%20END%20(1280-720).json';
        const startButtonAnimationMobileUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Mobile-Splash-sc%20(END).json';

        // Load assets dynamically
        setStartIcon(startIconUrl);
        const [
          animationDataResponse,
          animationDataMobileResponse,
          startButtonDesktopResponse,
          startButtonMobileResponse,
        ] = await Promise.all([
          fetch(animationDataUrl).then((res) => res.json()),
          fetch(animationDataMobileUrl).then((res) => res.json()),
          fetch(startButtonAnimationDesktopUrl).then((res) => res.json()),
          fetch(startButtonAnimationMobileUrl).then((res) => res.json()),
        ]);

        setAnimationData(animationDataResponse);
        setAnimationDataMobile(animationDataMobileResponse);
        setStartButtonAnimationDesktop(startButtonDesktopResponse);
        setStartButtonAnimationMobile(startButtonMobileResponse);
      } catch (error) {
        console.error('Failed to load assets:', error);
      }
    };

    loadAssets();
  }, []);

  return (
    <div className={style.container}>
      {isLoading ? (
          <Spinner/>
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
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
            onComplete={handleFullScreenAnimationComplete} // Navigate after animation finishes
            style={{position:'absolute',left:0,right:0,width:'100vw',height:'100svh'}}
            />
        </div>
      ) : (
        <>
          <div className={style.animationContainer}>
            <Lottie
              animationData={isMobile ? animationDataMobile : animationData} // Conditional animation for the main content
              loop={false}
              autoplay={true}
              onComplete={handleAnimationComplete} // Animation completion logic
              style={{position:'absolute',left:0,right:0,width:'100vw',height:'100svh'}}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              />
          </div>
          {isAnimationComplete && ( // Show content only after animation finishes
            <div className={style.content}>
              <div className={style.btnwrapper} onClick={handleStartClick} >
                <button className={style.button} >
                  Start
                </button>
                {startIcon && <img src={startIcon} alt="start icon" />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home2;
