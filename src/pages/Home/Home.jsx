import style from './Home.module.css';
import logo from '../../assets/logo.png';
import starticon from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className={style.container}>
    

    <div className={style.maincontentbox}>

    <div className={style.logowrapper}>
         <img src={logo} alt="logo" />
     </div>

    <div className={style.content}>
     <p>Express your love with a personalized love song.</p>
    </div>
    
    <div className={style.btnwrapper} onClick={()=>navigate('/selection')}>
        <button className={style.button}> Start </button>
        <img src={starticon} alt="start icon"/>
    </div>

    </div>


    </div>
  )
}

export default Home