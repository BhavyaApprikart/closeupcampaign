import style from './Register.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Example: Extract parameters
  const utm_source = queryParams.get('utm_source');
  const utm_medium = queryParams.get('utm_medium');
  const utm_campaign = queryParams.get('utm_campaign');
  const utm_content = queryParams.get('utm_content');
  const utm_term = queryParams.get('utm_term');
  console.log("UTM Source:", utm_source);
  console.log("UTM Medium:", utm_medium);
  console.log("UTM Campaign:", utm_campaign);
  console.log("UTM Content:", utm_content);
  console.log("UTM Term:", utm_term);

  const { friendname, selectedFeature1, selectedFeature2 } = location.state || {};
  const[ showotpscreen, setShowOtpScreen] = useState(false);
  const[ username,setUserName] = useState('');
  const[ usermobileno,setUserMobileNo] = useState('');
  const[ userotp,setUserOtp] = useState('');
  const [errors, setErrors] = useState({});
  const otpRegex = /^\d{4}$/;
  const nameRegex =  /^[a-zA-Z]{3,10}$/;
  const indianPhoneNumberRegex = /^[6-9]\d{9}$/;

   // Asset states
 const [logo, setLogo] = useState('');
 const [startIcon, setStartIcon] = useState('');
 const [errorIcon, setErrorIcon] = useState('');
 // Asset loading
 useEffect(() => {
  const loadAssets = async () => {
    try {
      // Asset URLs
      const logoUrl =
        'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/logo.png';
      const startIconUrl =
        'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Vector.png';
      const errorIconUrl =
        'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/radix-icons_cross-circled.svg';

      // Set asset states
      setLogo(logoUrl);
      setStartIcon(startIconUrl);
      setErrorIcon(errorIconUrl);
    } catch (error) {
      console.error('Failed to load assets:', error);
    }
  };

  loadAssets();
}, []);

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOTPButtonClick = async () => {

    const newErrors = {};

    if (!nameRegex.test(username)) {
        newErrors.username = `Name must be between 3-10 characters. If it's longer, please use a nickname. Name should not include spaces, special characters or digits.`;
    }

    if (!username) {
      newErrors.friendname = `Name must be between 3-10 characters. If it's longer, please use a nickname. Name should not include spaces, special characters or digits.`;  
    }

    if (!usermobileno) {
      newErrors.usermobileno = 'Please enter a 10-digit mobile number.';
    }

    if (!indianPhoneNumberRegex.test(usermobileno)) {
      newErrors.usermobileno = 'Please enter a valid 10-digit mobile number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
           try {
                 const response = await axios.get(`https://admin.closeuplovetunes.in/api/get_otp/?mobile=${usermobileno}&name=${username}&friend_name=${friendname}&feature1=${selectedFeature1}&feature2=${selectedFeature2}&utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}&utm_content=${utm_content}&utm_term=${utm_term}`);
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
      newErrors.userotp = 'Please enter OTP.';
    }

     if (!document.getElementById('agree1').checked) {
      newErrors.agree1 = 'You must agree to the terms and conditions.';
     }

    //  if (!document.getElementById('agree2').checked) {
    //    newErrors.agree2 = 'You must agree to the privacy policies.';
    //  }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  try {
          const response = await axios.get(`https://admin.closeuplovetunes.in/api/validate_otp/?mobile=${usermobileno}&otp=${userotp}&name=${username}&friend_name=${friendname}&feature1=${selectedFeature1}&feature2=${selectedFeature2}&utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}&utm_content=${utm_content}&utm_term=${utm_term}`);
                   
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
                            setErrors({ errorresponse: response.data.msg });
                     }

               } catch(error) {
                       console.error('Error:', error);
      }
};

const handleChangeUsername = (event) => {
  const trimmedname = event.target.value.replace(/^\s+|\s+$/g, '');
  setUserName(trimmedname);
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

const handleCheckboxChange1 = () => {
  setErrors((prevErrors) => ({ ...prevErrors, agree1: '' }));
};

const handleCheckboxChange2 = () => {
      // setErrors((prevErrors) => ({ ...prevErrors, agree2: '' }));
};


  const handleerrorboxclick = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: '',
      usermobileno: '',
      userotp: '',
      errorresponse: '',
      agree1: '',  // Clear agree1 error
    }));
  };
  

  return (
    <div className={style.container}  style={{ height: 'var(--app-height)' }} >
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
          { logo && <img src={logo} alt="logo" /> }
     </div>
 
     {  
      showotpscreen ? 
      <>
      <div className={style.singerdesp}>
        <p> One Last Check!</p>
        <p>We have sent a verification code on your WhatsApp!!</p>
      </div>

      <div className={style.formbox}>
      <div className={style.forminputbox}>
      <input placeholder='Enter Verification Code' 
          type="text"
          name="userotp"               
          value={userotp} 
          onChange={handleChangeUserOtp}
          required/>
      </div>

        <div className={style.formcheckbox}>
        <input type="checkbox" id="agree1" name="agree1" onChange={handleCheckboxChange1} required />
        <label htmlFor="agree1">I understand & consent to HUL & its partners to process my information for creation of personalized AI generated song featuring my Name, my loved one’s Name & characteristics. I agree to the <span  onClick={() => window.open('/TermsAndConditions', '_blank')} id={style.tclink}> T&C </span> of this campaign. </label>
      </div>

      <div className={style.formcheckbox}>
      <input type="checkbox" id="agree2" name="agree2" onChange={handleCheckboxChange2} required />
      <label htmlFor="agree2"> I consent to receiving marketing communications (news, offers, updates, etc.) & online advertising tailored to your interests from trusted Unilever Brands via email, SMS, WhatsApp, etc.<span  onClick={() => window.open('https://www.unilevernotices.com/vendor-customer-privacy-notice/india-vendor.html', '_blank')} id={style.tclink}>  Privacy Notice  </span> </label>
      </div>

      </div>

      <div className={style.btnwrapper}  onClick={handleRegButtonClick} >
      <button className={style.button} > Submit </button>
           { startIcon && <img src={startIcon} alt="start icon"/>}
      </div>

      </>
      :
      <>
      <div className={style.singerdesp}>
      <p> Enter your contact details to recieve your Verification code on WhatsApp </p>
      </div>
      <div className={style.formbox}>
      <div className={style.forminputbox}>
       <input placeholder='Your First Name' 
       type="text"
       name="username"               
       value={username} 
       onChange={handleChangeUsername}
       required />
      </div>

       <div className={style.forminputbox}>
       <input placeholder='Your Whatsapp Number' 
       type="text"
       name="usermobileno"               
       value={usermobileno} 
       onChange={handleChangeUserMobileNo}
       required />
      </div>
      <span id={style.spanfornuminput}>We will send your song on this number.</span>
      </div>

       <div className={style.btnwrapper}  onClick={handleOTPButtonClick} >
       <button className={style.button} >  Send Verification code  </button>
           { startIcon && <img src={startIcon} alt="start icon"/> }
       </div>

      </>

  }

   {  // <div className={style.btnwrapper}  onClick={showotpscreen ? handleRegButtonClick : handleOTPButtonClick} >
      // <button className={style.button} > { showotpscreen ? "Submit" : "Send Verification code"}  </button>
      //      { startIcon && <img src={startIcon} alt="start icon"/>}
      // </div>
      }


      { (errors) && (Object.keys(errors).length > 0) 
        && (errors.username || errors.usermobileno || errors.userotp || errors.errorresponse || errors.agree1 )
        && (
        <div className={style.errordisplay} onClick={handleerrorboxclick} >
               { errorIcon && <img src={errorIcon} alt="Error icon" />}
          <div className={style.errorwrapper}>
            <h3>Error</h3>
            {errors.username && <span>{errors.username}</span>}
            {errors.usermobileno && <span>{errors.usermobileno}</span>}
            {errors.userotp && <span>{errors.userotp}</span>}
            {errors.agree1 && <span>{errors.agree1}</span>}
            {errors.errorresponse && <span>{errors.errorresponse}</span>}
          </div>
        </div>
      )}

    </div>

    </div>
  )
}

export default Register;