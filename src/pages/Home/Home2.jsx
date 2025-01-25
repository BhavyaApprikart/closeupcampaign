import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import style from './Home2.module.css';
import logo from '../../assets/logo.png';
import starticon from '../../assets/Vector.png';
import animationData from '../../assets/Splash-sc.json';

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
            />
          </div>
          {isAnimationComplete && ( // Show content only after animation finishes
            <div className={style.content}>
              <img src={logo} alt="logo" className={style.logo} />
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
