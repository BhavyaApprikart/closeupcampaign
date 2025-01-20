import style from './Home2.module.css';
import logo from '../../assets/logo.png'; 
import bgvideo from '../../assets/Intro video closeup (1).mp4';
import starticon from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';

const Home2 = () => {

  const navigate = useNavigate();

  return (
    <div className={style.container}>
    
            <video autoPlay muted className={style.backgroundVideo}>
            <source src={bgvideo} type="video/mp4" />
            Your browser does not support the video tag.
           </video>

    <div className={style.maincontentbox}>
    <div className={style.btnwrapper} onClick={()=>navigate('/selection')}>
        <button className={style.button}> Start </button>
        <img src={starticon} alt="start icon"/>
    </div>

    </div>


    </div>
  )
}

export default Home2;