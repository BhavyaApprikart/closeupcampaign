import style from './Selection.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Selection = () => {

   const navigate = useNavigate();
   const[friendname, setFriendName] = useState("")
   const nameRegex =  /^[a-zA-Z]{3,10}$/;
   const [selectedFeature1, setSelectedFeature1] = useState('');
   const [selectedFeature2, setSelectedFeature2] = useState('');
   const [errors, setErrors] = useState(null);
   const [isOpen1, setIsOpen1] = useState(false);
   const [isOpen2, setIsOpen2] = useState(false);

 // Asset states
 const [logo, setLogo] = useState('');
 const [singer, setSinger] = useState('');
 const [startIcon, setStartIcon] = useState('');
 const [errorIcon, setErrorIcon] = useState('');
 // Asset loading
 useEffect(() => {
   const loadAssets = async () => {
     try {
       // Asset URLs
       const logoUrl =
         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/logo.png';
       const singerUrl =
         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/singer.png';
       const startIconUrl =
         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Vector.png';
       const errorIconUrl =
         'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/radix-icons_cross-circled.svg';

       // Set asset states
       setLogo(logoUrl);
       setSinger(singerUrl);
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

   const handleChangeFeature1 = (event) => {
    setSelectedFeature1(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature1: '' }));
    setIsOpen1(false);
  };

  const handleerrorboxclick = () => {
    setErrors((prevErrors) => ({ ...prevErrors, friendname: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature1: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature2: '' }));
    // setErrors((prevErrors) => ({ ...prevErrors, agree: '' }));
  };

  const handleChangeFeature2 = (event) => {
    setSelectedFeature2(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature2: '' }));
    setIsOpen2(false);
  };

  const handleChangeFriendName = (event) => {
    setFriendName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, friendname: '' }));
  };

  // const handleCheckboxChange = () => {
  //   setErrors((prevErrors) => ({ ...prevErrors, agree: '' }));
  // };

  const handleGenerateLyrics = () => {

    const newErrors = {};
    if (!friendname) {
         newErrors.friendname = `Name must be between 3-10 characters. If it's longer, please use a nickname. Name should not include spaces, special characters or digits.`;  
    }
    if (!nameRegex.test(friendname)) {
          newErrors.friendname = `Name must be between 3-10 characters. If it's longer, please use a nickname. Name should not include spaces, special characters or digits..`;  
    } 
    if (!selectedFeature1) {
      newErrors.selectedFeature1 = 'Please select Feature 1.';
    }
    if (!selectedFeature2) {
      newErrors.selectedFeature2 = 'Please select Feature 2.';
    }
    // if (!document.getElementById('agree').checked) {
    //   newErrors.agree = 'You must agree to the terms and conditions.';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      navigate('/register', {
        state: {
          friendname,
          selectedFeature1,
          selectedFeature2,
        },
      });
    }
  };

  const options = [
    { value: 'Smile', label: 'Smile' },
    { value: 'Nose', label: 'Nose' },
    { value: 'Hairs', label: 'Hairs' },
    { value: 'Eyes', label: 'Eyes' },
    { value: 'Laugh', label: 'Laugh' },
    { value: 'Cheeks', label: 'Cheeks' },
    { value: 'Skin tone', label: 'Skin tone' },
    { value: 'Lips', label: 'Lips' },
  ];


  return (
    <div className={style.container} style={{ height: 'var(--app-height)' }} >
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
      {  logo && <img src={logo} alt="logo" /> }
     </div>

     <div className={style.singerdesp}>
       <div className={style.singercard}> {singer && <img src={singer} alt="singerimage" />}  </div>
       <p className={style.singertextlines}> Share what you love most about your partner!
       <span id={style.singername}> Dhvani Bhanushali </span> will sing a personalized song on your behalf.</p>
     </div>
    
    <div className={style.formbox}>

      <div className={style.forminputbox}>
      <input placeholder={`Partner’s first/nick name`}
      type="text"
      name="friendname"               
      value={friendname} 
      onChange={handleChangeFriendName}
      required />
     </div>

       <div className={`${style.formselectbox} ${isOpen1 ? style.open : ""}`} >
          <select value={selectedFeature1} onChange={handleChangeFeature1} 
              onFocus={() => setIsOpen1(true)}  
              onBlur={() => setIsOpen1(false)}  
             required >
              <option value="" disabled>What do you love most about them?</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
        </select>
    </div>

    <div className={`${style.formselectbox} ${isOpen2 ? style.open : ""}`} >
     <select value={selectedFeature2} onChange={handleChangeFeature2} 
          onFocus={() => setIsOpen2(true)}  
          onBlur={() => setIsOpen2(false)}  
          required >
      <option value="" disabled>What else you adore about them?</option>
          {options
            .filter((option) => option.value !== selectedFeature1)
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
     </div>

  </div>

    <div className={style.disclaimerwrapper}>
    <p id={style.disclaimer}> *This Campaign uses AI technology to create a personalized song using Your Loved One’s Name & Characteristics. While we aim for accuracy & quality, errors may occur. This service is for individuals 18+ years only. </p>
    </div>

    <div className={style.btnwrapper} onClick={handleGenerateLyrics} >
    <button className={style.button} > Next </button>
    { startIcon && <img src={startIcon} alt="start icon"/>}
    </div>  

   { (errors && Object.keys(errors).length > 0 
         && (errors.friendname || errors.selectedFeature1 || errors.selectedFeature2 || errors.agree) ) 
        && ( 
        <div className={style.errordisplay}   onClick={handleerrorboxclick}>
               { errorIcon && <img src={errorIcon} alt="Error icon"/>}
        <div className={style.errorwrapper}>
          <h3>Error</h3>
          {errors.friendname && <span>{errors.friendname}</span>}
          {errors.selectedFeature1 && <span>{errors.selectedFeature1}</span>}
          {errors.selectedFeature2 && <span>{errors.selectedFeature2}</span>}
          {errors.agree && <span>{errors.agree}</span>}
         </div>
        </div>
       ) }

     </div>

    </div>
  )
}

export default Selection