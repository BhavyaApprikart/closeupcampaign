import style from './Register.module.css';
import logo from '../../assets/logo.png';
import starticon from '../../assets/Vector.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { friendname, selectedFeature1, selectedFeature2 } = location.state || {};

  const[ showotpscreen, setShowOtpScreen] = useState(false);
  const[ username,setUserName] = useState('');
  const[ usermobileno,setUserMobileNo] = useState('');
  const[ userotp,setUserOtp] = useState('');

  const otpRegex = /^\d{4}$/;
  const nameRegex =  /^[a-zA-Z]{4,30}$/;
  const indianPhoneNumberRegex = /^[789]\d{9}$/;



  const handleOTPButtonClick = async () => {

             try {
                 const response = await axios.get(`https://admin.closeuplovetunes.in/api/get_otp/?mobile=${usermobileno}&name=${username}`);
                 console.log(' OTP API Response:', response.data);

                 if(response.data.status === "success"){
                           setShowOtpScreen(true);
                  }      
                  else{
                       document.getElementById("errorresponse").textContent = response.data.msg;
                 }
               } catch (error) {
                 console.error('Error:', error);
                 // Handle error if the API call fails
               }
      
};


const handleRegButtonClick = async () => {

         try {
              const response = await axios.get(`https://admin.closeuplovetunes.in/api/validate_otp/?mobile=${usermobileno}&otp=${userotp}&name=${username}&friend_name=${friendname}&feature1=${selectedFeature1}&feature2=${selectedFeature2}`);
                   
                   console.log('Register API Response:', response.data);

                     if(response.data.status === "success"){
                             navigate(`/loadingsong`);
                     }      
                     else{
                         document.getElementById("errorresponse").textContent = response.data.msg;
                     }

               } catch(error) {
                       console.error('Error:', error);
             }

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
      <span id="errorresponse"></span> 

      <div className={style.forminputbox}>
      <span id="userotpError"></span> 
      <input placeholder='Enter OTP' 
          type="text"
          name="userotp"               
          value={userotp} 
          onChange={(e) => { setUserOtp(e.target.value)
          // if(!otpRegex.test(e.target.value)) {
          //     document.getElementById("userotpError").textContent = "Please enter a valid OTP.";
          // }else{
          //     document.getElementById("userotpError").textContent = "";
          // }
         }} 
       required/>
      </div>
      </div>
      :
      <div className={style.formbox}>
         <span id="errorresponse"></span> 
      <div className={style.forminputbox}>
        <span id="usernameError"></span> 
       <input placeholder='Enter name' 
       type="text"
       name="username"               
       value={username} 
       onChange={(e) => { setUserName(e.target.value)
      //  if(!nameRegex.test(e.target.value)) {
      //      document.getElementById("usernameError").textContent = "Please enter a valid name.";
      //  }else{
      //      document.getElementById("usernameError").textContent = "";
      //  }
     }}  
       required/>
      </div>
     <div className={style.forminputbox}>
       <span id="usermobilenoError"></span> 
       <input placeholder='Enter Mobile no.' 
       type="text"
       name="usermobileno"               
       value={usermobileno} 
       onChange={(e) => { setUserMobileNo(e.target.value)
      //  if(!indianPhoneNumberRegex.test(e.target.value)) {
      //      document.getElementById("usermobilenoError").textContent = "Please enter a valid mobile number.";
      //  }else{
      //      document.getElementById("usermobilenoError").textContent = "";
      //  }
     }}  
       required />
     </div>
    </div>
    }

      <div className={style.btnwrapper}  onClick={showotpscreen ? handleRegButtonClick : handleOTPButtonClick} >
      <button className={style.button} > { showotpscreen ? "Register" : "Send OTP"}  </button>
      <img src={starticon} alt="start icon"/>
      </div>

    </div>

    </div>
  )
}

export default Register;