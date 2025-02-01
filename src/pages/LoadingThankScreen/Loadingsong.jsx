import style from './Loadingsong.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Spinner from '../Home/Spinner.jsx';
// import desktopldanimation from '../../assets/Loading-sc.json'
// import mobileldanimation from '../../assets/INITIAL Mobile-Loading-sc.json'
// import desktopendanimation from '../../assets/END Loading-sc.json'
// import mobileendanimation from '../../assets/END Mobile-Loading-sc.json'

const Loadingsong = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const [playFullScreenAnimation, setPlayFullScreenAnimation] = useState(false); // Track if the full-screen animation should play

  const [animationData, setAnimationData] = useState(null);
  const [animationDataMobile, setAnimationDataMobile] = useState(null);
  const [startButtonAnimationDesktop, setStartButtonAnimationDesktop] = useState(null);
  const [startButtonAnimationMobile, setStartButtonAnimationMobile] = useState(null);

  useEffect(() => {
    // Dynamically load assets
    const loadAssets = async () => {
      try {
        const animationDataUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/INITIAL%20Loading-sc.json';
       
          const animationDataMobileUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/INITIAL%20Mobile-Loading-sc.json';
        const startButtonAnimationDesktopUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/END%20Loading-sc.json';
        const startButtonAnimationMobileUrl =
          'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/END%20Mobile-Loading-sc.json';

        // Load assets dynamically
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


  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  const handleStartClick = () => {
    setPlayFullScreenAnimation(true); // Trigger full-screen animation
  };

  const handleFullScreenAnimationComplete = () => {
    navigate('/thankyou'); // Navigate after the animation finishes
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


    const navigate = useNavigate();
    const location = useLocation();
    const { friendname, selectedFeature1, selectedFeature2 } = location.state || {};
    const [progress, setProgress] = useState(10);
    const [currentText, setCurrentText] = useState('Writing lyrics for your loved ones..');
    

    useEffect(() => {

      const texts = [
        'Writing lyrics for your loved ones..',
        `Finding words for ${selectedFeature1}..`,
        `Generating verse for ${selectedFeature2}..`,
        'Finally! Adding magic touch to your song..'
      ];

      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress >= 100 ? 100 : prevProgress + 10;
          setCurrentText(texts[Math.floor(newProgress / 30)]);
          return newProgress;
        });
      }, 2000);
  
      if (progress === 100) {
        setCurrentText(texts[3]);
            setTimeout(() => {
              handleStartClick();
            }, 1000);
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [progress,selectedFeature1,selectedFeature2]);

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
            style={{position:'absolute',left:0,right:0,width:'100vw',height:'100svh'}}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
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
              style={{position:'absolute',left:0,right:0,width:'100vw',height:'100vh'}}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          </div>
          {isAnimationComplete && ( // Show content only after animation finishes
            <div className={style.maincontentbox}>
            <div className={style.content}>
                <p>Here are your selections</p>
        
                <div className={style.progressContainer}>
                <div className={style.progressBar}>
                  <div className={style.progress} style={{ width: `${progress}%` }}>
                  </div>
                </div>
                <p className={style.progressText}>{`${progress}%`}</p>
              </div>
                { currentText && <p id={style.loadingtext}>{currentText}</p>}
            </div>
            <div className={style.pinkbox}>
             <p>Creating a personalized love song for {friendname && <span id={style.splfeature}> {friendname} </span>} including features, { selectedFeature1 && <span id={style.splfeature}>{selectedFeature1}</span>} & { selectedFeature2 && <span id={style.splfeature}>{selectedFeature2}</span>}.</p>
            </div>

            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Loadingsong