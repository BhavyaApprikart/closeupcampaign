import style from './Register.module.css';
import logo from '../../assets/logo.png';
import starticon from '../../assets/Vector.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import erroricon from '../../assets/radix-icons_cross-circled.svg';


const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { friendname, selectedFeature1, selectedFeature2 } = location.state || {};
  const[ showotpscreen, setShowOtpScreen] = useState(false);
  const[ username,setUserName] = useState('');
  const[ usermobileno,setUserMobileNo] = useState('');
  const[ userotp,setUserOtp] = useState('');
  const [errors, setErrors] = useState({});
  const otpRegex = /^\d{4}$/;
  const nameRegex =  /^[a-zA-Z]{3,10}$/;
  const indianPhoneNumberRegex = /^[6-9]\d{9}$/;

  const handleOTPButtonClick = async () => {

    const newErrors = {};

    if (!nameRegex.test(username)) {
        newErrors.username = `Your name must be between 3-10 characters. If it's longer, please use a nickname.`;
    }

    if (!username) {
      newErrors.friendname = `Your name must be between 3-10 characters. If it's longer, please use a nickname.`;  
    }

    if (!usermobileno) {
      newErrors.usermobileno = 'Please enter a 10-digit mobile number.';
    }

    if (!indianPhoneNumberRegex.test(usermobileno)) {
      newErrors.usermobileno = 'Please enter a 10-digit mobile number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
           try {
                 const response = await axios.get(`https://admin.closeuplovetunes.in/api/get_otp/?mobile=${usermobileno}&name=${username}`);
                 console.log('Sending OTP API Response:', response.data);

                 if(response.data.status === "success"){
                           setShowOtpScreen(true);
                  }      
                  else{
                       setErrors({ errorresponse: response.data.msg });
                 }
               } catch (error) {
                 console.error('Error:', error);
                 // Handle error if the API call fails
           }
   
};


const handleRegButtonClick = async () => {

  const newErrors = {};

    if (!otpRegex.test(userotp)) {
      newErrors.userotp = 'Please enter a valid OTP.';
    }

    if (!userotp) {
      newErrors.userotp = 'Please enter a valid OTP.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  try {
          const response = await axios.get(`https://admin.closeuplovetunes.in/api/validate_otp/?mobile=${usermobileno}&otp=${userotp}&name=${username}&friend_name=${friendname}&feature1=${selectedFeature1}&feature2=${selectedFeature2}`);
                   
                   console.log('Register API Response:', response.data);

                     if(response.data.status === "success"){

                             navigate('/loadingsong', {
                              state: {
                                friendname,
                                selectedFeature1,
                                selectedFeature2,
                              },
                            });
                     }      
                     else{
                         setErrors({ otp: 'Invalid OTP. Please try again.' });
                     }

               } catch(error) {
                       console.error('Error:', error);
      }
};

const handleChangeUsername = (event) => {
  setUserName(event.target.value);
  setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, errorresponse: '' }));
};

const handleChangeUserMobileNo = (event) => {
  setUserMobileNo(event.target.value);
  setErrors((prevErrors) => ({ ...prevErrors, usermobileno: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, errorresponse: '' }));
};

const handleChangeUserOtp = (event) => {
  setUserOtp(event.target.value);
  setErrors((prevErrors) => ({ ...prevErrors, userotp: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, errorresponse: '' }));
};

const handleerrorboxclick = () => {
  setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, usermobileno: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, userotp: '' }));
  setErrors((prevErrors) => ({ ...prevErrors, errorresponse: '' }));
};

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
      <div className={style.forminputbox} style={{marginTop:'1rem'}}>
      <input placeholder='Enter OTP' 
          type="text"
          name="userotp"               
          value={userotp} 
          onChange={handleChangeUserOtp}
          required/>
      </div>
      </div>
      :
      <div className={style.formbox}>

      <div className={style.forminputbox}>
       <input placeholder='Enter Name' 
       type="text"
       name="username"               
       value={username} 
       onChange={handleChangeUsername}
       required />
      </div>
     <div className={style.forminputbox}>
       <input placeholder='Enter Mobile no.' 
       type="text"
       name="usermobileno"               
       value={usermobileno} 
       onChange={handleChangeUserMobileNo}
       required />
     </div>
    </div>
    }

      <div className={style.btnwrapper}  onClick={showotpscreen ? handleRegButtonClick : handleOTPButtonClick} >
      <button className={style.button} > { showotpscreen ? "Register" : "Send OTP"}  </button>
      <img src={starticon} alt="start icon"/>
      </div>



      { errors && Object.keys(errors).length > 0 
        && (errors.username || errors.usermobileno || errors.userotp || errors.errorresponse  )
        && (
        <div className={style.errordisplay} onClick={handleerrorboxclick} >
          <img src={erroricon} alt="Error icon" />
          <div className={style.errorwrapper}>
            <h3>Error</h3>
            {errors.username && <span>{errors.username}</span>}
            {errors.usermobileno && <span>{errors.usermobileno}</span>}
            {errors.userotp && <span>{errors.userotp}</span>}
            {errors.errorresponse && <span>{errors.errorresponse}</span>}
          </div>
        </div>
      )}

    </div>

    </div>
  )
}

export default Register;