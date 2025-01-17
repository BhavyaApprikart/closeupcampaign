import style from './Register.module.css';
import logo from '../../assets/logo.png';
import starticon from '../../assets/Vector.png';
import { useState } from 'react';


const Register = () => {

  const [showotpscreen, setShowOtpScreen] = useState(false);

  return (
    <div className={style.container}>
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
         <img src={logo} alt="logo" /> 
     </div>

     <div className={style.singerdesp}>
     <p> Experience the Magic of <span id={style.singername}> Dhvani Bhanushali </span> Music – Anytime, Anywhere!</p>
     </div>
    
     {  
      showotpscreen ? 
      <div className={style.formbox}>
      <div className={style.forminputbox}>
      <input placeholder='Enter OTP' required/>
      </div>
      </div>
      :
      <div className={style.formbox}>
      <div className={style.forminputbox}>
       <input placeholder='Enter name' required/>
      </div>
     <div className={style.forminputbox}>
       <input placeholder='Enter Mobile no.' required/>
     </div>
    </div>
    }

      <div className={style.btnwrapper} >
      <button className={style.button}> { showotpscreen ? "Register" : "Send OTP"}  </button>
      <img src={starticon} alt="start icon"/>
      </div>

    </div>

    </div>
  )
}

export default Register;