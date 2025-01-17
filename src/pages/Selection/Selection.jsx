import style from './Selection.module.css';
import logo from '../../assets/logo.png';
import singer from '../../assets/singer.png';
import starticon from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';

const Selection = () => {

  const navigate = useNavigate();

  return (
    <div className={style.container}>
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
         <img src={logo} alt="logo" /> 
     </div>

     <div className={style.singerdesp}>
       <div className={style.singercard}>  <img src={singer} alt="singerimage" />  </div>
       <p> Get your personalized song crafted by
       <span id={style.singername}> Dhvani Bhanushali </span> just for your loved one! </p>
     </div>
    
    <div className={style.formbox}>
      <div className={style.forminputbox}>
      <input placeholder='Enter Recipient’s name' required/>
     </div>

     <div className={style.forminputbox}>
       <select > <option> Select Feature 1 </option></select>
    </div>

     <div className={style.forminputbox}>
        <select > <option> Select Feature 2 </option></select>
     </div>


     <div className={style.formcheckbox}>
       <input type="checkbox" id="agree" name="agree" required />
       I agree to “Terms & Conditions”.
     </div>

     <div className={style.btnwrapper} >
       <button className={style.button} onClick={()=>navigate('/loadingsong')}> Generate lyrics </button>
       <img src={starticon} alt="start icon"/>
    </div>

    </div>

     </div>

    </div>
  )
}

export default Selection