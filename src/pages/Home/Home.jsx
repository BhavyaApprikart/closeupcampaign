import style from './Home.module.css';
import logo from '../../assets/logo.png';
import topleftpinksheet from '../../assets/pink sheet 2.png';
import topleftletter from '../../assets/letter 3.png';
import topleftheart from '../../assets/pink heart 1.png';
import toprightletter from '../../assets/pink card.png';
import xoxo from '../../assets/XOXO 1.png';
import xoxobackground from '../../assets/pencil scratch 2.png';
import giftbox from '../../assets/gift (2).png';
import bottomleftbackground from '../../assets/stroke.png';
import bottomrightpinkpaper from '../../assets/Cut paper 1.png';
import bottomrightroses from '../../assets/rose 2.png';
import starticon from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';
import closeupLetter from "../../assets/Closeup logo-01 3.png";
import eLetter from "../../assets/e.png"
import LLetter from "../../assets/L (Stroke).svg"
import lovesymbol from "../../assets/Closeup logo Variation (3) 1.png"
import nLetter from "../../assets/n.png"
import EstrokeLetter from "../../assets/EStroke.png"
import sLetter from "../../assets/s.png"
import TLetter from "../../assets/T.png"
import ULetter from "../../assets/u.png"
import VStrokeLetter from "../../assets/VStroke.png"


const Home = () => {

  const navigate = useNavigate();

  const handleStartClick = () => {
    const elements = document.querySelectorAll(`.${style.fadeOut}`);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(style[`animateFadeOut${index % 4}`]);
      }, index * 100); // Stagger the animations
    });

    setTimeout(() => {
      navigate('/selection');
    }, 2000); // Match the duration of the fade-out animation
  };

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

         <img id={style.closeuplogoletter} src={closeupLetter} alt="logo" />
         <img id={style.LLetter}      src={LLetter}  alt="logo" />
         <img id={style.lovesymbol}   src={lovesymbol}  alt="logo" />
         <img id={style.VLetter}      src={VStrokeLetter}  alt="logo" />
         <img id={style.ELetter}      src={EstrokeLetter}  alt="logo" />

         <img id={style.TLetter} src={TLetter} alt="logo" />
         <img id={style.ULetter} src={ULetter} alt="logo" />
         <img id={style.nLetter} src={nLetter} alt="logo" />
         <img id={style.eLetter} src={eLetter} alt="logo" />
         <img id={style.sLetter} src={sLetter} alt="logo" />

     </div>

    <div className={`${style.content} ${style.fadeOut}`}>
     <p>Express your love with a personalized love song.</p>
    </div>
    
    <div className={`${style.btnwrapper} ${style.fadeOut}`}  onClick={handleStartClick}>
        <button className={style.button}> Start </button>
        <img src={starticon} alt="start icon"/>
    </div>

    </div>


    </div>
  )
}

export default Home