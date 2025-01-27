import style from './Selection.module.css';
import logo from '../../assets/logo.png';
import singer from '../../assets/singer.png';
import starticon from '../../assets/Vector.png';
import erroricon from '../../assets/radix-icons_cross-circled.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Selection = () => {

   const navigate = useNavigate();
   const[friendname, setFriendName] = useState("")
   const nameRegex =  /^[a-zA-Z]{3,10}$/;
   const [selectedFeature1, setSelectedFeature1] = useState('');
   const [selectedFeature2, setSelectedFeature2] = useState('');
   const [errors, setErrors] = useState(null);

   const handleChangeFeature1 = (event) => {
    setSelectedFeature1(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature1: '' }));
  };

  const handleerrorboxclick = () => {
    setErrors((prevErrors) => ({ ...prevErrors, friendname: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature1: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature2: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, agree: '' }));
  };

  const handleChangeFeature2 = (event) => {
    setSelectedFeature2(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFeature2: '' }));
  };

  const handleChangeFriendName = (event) => {
    setFriendName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, friendname: '' }));
  };

  const handleCheckboxChange = () => {
    setErrors((prevErrors) => ({ ...prevErrors, agree: '' }));
  };

  const handleGenerateLyrics = () => {

    const newErrors = {};
    if (!friendname) {
         newErrors.friendname = `Your name must be between 3-10 characters. If it's longer, please use a nickname.`;  
    }
    if (!nameRegex.test(friendname)) {
          newErrors.friendname = `Your name must be between 3-10 characters. If it's longer, please use a nickname.`;  
    } 
    if (!selectedFeature1) {
      newErrors.selectedFeature1 = 'Please select Feature 1.';
    }
    if (!selectedFeature2) {
      newErrors.selectedFeature2 = 'Please select Feature 2.';
    }
    if (!document.getElementById('agree').checked) {
      newErrors.agree = 'You must agree to the terms and conditions.';
    }

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
    <div className={style.container}>
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
         <img src={logo} alt="logo" /> 
     </div>

     <div className={style.singerdesp}>
       <div className={style.singercard}>  <img src={singer} alt="singerimage" />  </div>
       <p className={style.singertextlines}> Get your personalized song crafted by
       <span id={style.singername}> Dhvani Bhanushali </span> just for your loved one! </p>
     </div>
    
    <div className={style.formbox}>
      <div className={style.forminputbox}>
      <input placeholder='Enter Recipient’s name'  
      type="text"
      name="friendname"               
      value={friendname} 
      onChange={handleChangeFriendName}
      required />
     </div>

     <div className={style.forminputbox}>
     <select value={selectedFeature1} onChange={handleChangeFeature1} required >
     <option value="" disabled>Select Feature 1</option>
     {options.map((option) => (
       <option key={option.value} value={option.value}>
         {option.label}
       </option>
     ))}
   </select>
    </div>

     <div className={style.forminputbox}>
     <select value={selectedFeature2} onChange={handleChangeFeature2} required >
     <option value="" disabled>Select Feature 2</option>
     {options
       .filter((option) => option.value !== selectedFeature1)
       .map((option) => (
         <option key={option.value} value={option.value}>
           {option.label}
         </option>
       ))}
     </select>
     </div>

     <div className={style.formcheckbox}>
     <input type="checkbox" id="agree" name="agree" onChange={handleCheckboxChange} required />
     <label htmlFor="agree">I agree to “Terms & Conditions”.</label>
   </div>

     <div className={style.btnwrapper} onClick={handleGenerateLyrics} >
       <button className={style.button} > Next </button>
       <img src={starticon} alt="start icon"/>
    </div>

    </div>

   { (errors && Object.keys(errors).length > 0 
         && (errors.friendname || errors.selectedFeature1 || errors.selectedFeature2 || errors.agree) ) 
        && ( 
        <div className={style.errordisplay}   onClick={handleerrorboxclick}>
        <img src={erroricon} alt="Error icon"/>
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