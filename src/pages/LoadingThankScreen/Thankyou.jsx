import style from './Thankyou.module.css';
import logo from '../../assets/logo.png';
import thankyou from '../../assets/Flower bouq. 2.png';
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



const Thankyou = () => {
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
        <img src={thankyou} alt="Thank you image"/>
        <div className={style.thankyoutextbg}> <p id={style.thankyoutext}>Thank You!</p> </div>
        <p> For letting us create something special for you. </p>
    </div>

    <div className={style.messagebox}>
     <p> Your personalized love song, sung by <span id={style.name}>“Dhvani Bhanushali”</span> is ready & will reach your Whatsapp soon.</p>
    </div>
    
    </div>

    </div>
  )
}

export default Thankyou