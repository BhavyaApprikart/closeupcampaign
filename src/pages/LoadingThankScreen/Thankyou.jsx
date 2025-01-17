import style from './Thankyou.module.css';
import logo from '../../assets/logo.png';
import thankyou from '../../assets/Flower bouq. 2.png';

const Thankyou = () => {
  return (
    <div className={style.container}>
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
     <p> Your personalized love song, sung by <span id={style.name}>“Dhvani Bhanushali”</span> is ready & will reach your your Whatsapp soon.</p>
    </div>
    
    </div>

    </div>
  )
}

export default Thankyou