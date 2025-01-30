import Lottie from 'lottie-react';
import style from './Thankyou.module.css';
import { useEffect, useState } from 'react';
import Spinner from '../Home/Spinner';
import thankyoudkanimation from '../../assets/Thank-you-sc.json'
import thankyoumobileanimation from '../../assets/Mobile-Thank-u-sc.json'

const Thankyou = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const [animationData, setAnimationData] = useState(thankyoudkanimation);
  const [animationDataMobile, setAnimationDataMobile] = useState(thankyoumobileanimation);


    // useEffect(() => {
  //   // Dynamically load assets
  //   const loadAssets = async () => {
  //     try {
  //         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Splash-sc%20Initial%20(1280-720).json';
  //       const animationDataMobileUrl =
  //         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Mobile-Splash-sc.json';
  //       const startButtonAnimationDesktopUrl =
  //         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Splash-sc%20END%20(1280-720).json';
  //       const startButtonAnimationMobileUrl =
  //         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Mobile-Splash-sc%20(END).json';

  //       // Load assets dynamically
  //       const [
  //         animationDataResponse,
  //         animationDataMobileResponse,
  //         startButtonDesktopResponse,
  //         startButtonMobileResponse,
  //       ] = await Promise.all([
  //         fetch(animationDataUrl).then((res) => res.json()),
  //         fetch(animationDataMobileUrl).then((res) => res.json()),
  //         fetch(startButtonAnimationDesktopUrl).then((res) => res.json()),
  //         fetch(startButtonAnimationMobileUrl).then((res) => res.json()),
  //       ]);

  //       setAnimationData(animationDataResponse);
  //       setAnimationDataMobile(animationDataMobileResponse);
  //       setStartButtonAnimationDesktop(startButtonDesktopResponse);
  //       setStartButtonAnimationMobile(startButtonMobileResponse);
  //     } catch (error) {
  //       console.error('Failed to load assets:', error);
  //     }
  //   };

  //   loadAssets();
  // }, []);
  
  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
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


  return (
    <div className={style.container}>
    {isLoading ? (
      <Spinner /> // Show spinner while loading
    ):(<div className={style.animationContainer}>
    <Lottie
      animationData={isMobile ? animationDataMobile : animationData} // Conditional animation for the main content
      loop={false}
      autoplay={true}
      onComplete={handleAnimationComplete} // Animation completion logic
      style={{position:'absolute',left:0,right:0,width:'100vw',height:'100vh',aspectRatio:'auto'}}
    />
    </div>)}
    </div>
  )
}

export default Thankyou