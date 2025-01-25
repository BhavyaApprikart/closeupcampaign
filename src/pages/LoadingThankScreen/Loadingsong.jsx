import style from './Loadingsong.module.css';
import logo from '../../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import topleftpinksheet from '../../assets/pink sheet 2.png';
import topleftletter from '../../assets/letter 3.png';
import topleftheart from '../../assets/pink heart 1.png';
import toprightletter from '../../assets/Card+Note.png';
import xoxo from '../../assets/XOXO 1.png';
import xoxobackground from '../../assets/pencil scratch 2.png';
import giftbox from '../../assets/gift (2).png';
import bottomleftbackground from '../../assets/stroke.png';
import bottomrightpinkpaper from '../../assets/Cut paper 1.png';
import bottomrightroses from '../../assets/rose 2.png';
import whiteheart from '../../assets/progressionbarheart.png';


const Loadingsong = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { friendname, selectedFeature1, selectedFeature2 } = location.state || {};
    const [progress, setProgress] = useState(10);
    const [currentText, setCurrentText] = useState('Writing lyrics for your loved ones..');
 
    const texts = [
      'Writing lyrics for your loved ones..',
      `Finding words for ${selectedFeature1}..`,
      `Generating verse for ${selectedFeature2}..`,
      'Finally! Adding magic touch to your song..'
    ];


    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress >= 100 ? 100 : prevProgress + 10;
          setCurrentText(texts[Math.floor(newProgress / 30)]);
          return newProgress;
        });
      }, 2000);
  
      // if (progress === 100) {
      //   setCurrentText(texts[3]);
      //   setTimeout(() => {
      //     navigate('/thankyou');
      //   }, 2000);
      // }
  
      return () => {
        clearInterval(timer);
      };
    }, [progress, navigate]);

  return (
    <div className={style.container}>

    <img id={style.topleftpinksheet} src={topleftpinksheet} alt="logo" />
    <img id={style.topleftletter}  src={topleftletter} alt="logo" />
    <img id={style.topleftheart}  src={topleftheart} alt="logo" />
    <img id={style.toprightletter}  src={toprightletter} alt="logo" />

        <img id={style.xoxobackground} src={xoxobackground} alt="logo" /> 
        <img id={style.xoxo} src={xoxo} alt="logo" /> 
      
    <img id={style.giftbox} src={giftbox} alt="logo" />

    <img id={style.bottomleftbackground} src={bottomleftbackground} alt="logo" />

    <img id={style.bottomrightpinkpaper} src={bottomrightpinkpaper} alt="logo" />
    <img id={style.bottomrightroses}  src={bottomrightroses} alt="logo" />

    <div className={style.maincontentbox}>

    <div className={style.logowrapper}>
         <img src={logo} alt="logo" />
     </div>

    <div className={style.content}>
        <p>Here are your selections</p>

        <div className={style.progressContainer}>
        <div className={style.progressBar}>
          <div className={style.progress} style={{ width: `${progress}%` }}>
             <img className={style.heart} src={whiteheart}  alt="whiteheart"/> 
          </div>
        </div>
        <p className={style.progressText}>{`${progress}%`}</p>
      </div>

     { currentText && <p id={style.loadingtext}>{currentText}</p>}

    </div>

    <div className={style.pinkbox}>
     <p>Create a personalized love song for {friendname && <span id={style.splfeature}> {friendname} </span>} including features, { selectedFeature1 && <span id={style.splfeature}>{selectedFeature1}</span>} & { selectedFeature2 && <span id={style.splfeature}>{selectedFeature2}</span>}.</p>
    </div>
    
    </div>

    </div>
  )
}

export default Loadingsong