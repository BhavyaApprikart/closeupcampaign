import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import style from './Home2.module.css';
import starticon from '../../assets/Vector.png';
import animationData from '../../assets/Splash-sc Initial (1280-720).json';
import Spinner from './Spinner'; // Import a spinner component


const Home2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  const handleStartClick = () => {
    navigate('/selection'); // Navigate to the desired route
  };

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
      ) : (
        <>
          <div className={style.animationContainer}>
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              onComplete={handleAnimationComplete} // Animation completion logic
              width={'100%'}
              height={'100%'}
            />
          </div>
          {isAnimationComplete && ( // Show content only after animation finishes
            <div className={style.content}>
              <div className={style.btnwrapper} onClick={handleStartClick}>
                <button className={style.button} >
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