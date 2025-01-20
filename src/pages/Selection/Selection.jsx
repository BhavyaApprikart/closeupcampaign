import style from './Selection.module.css';
import logo from '../../assets/logo.png';
import singer from '../../assets/singer.png';
import starticon from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Selection = () => {

   const navigate = useNavigate();
   const[friendname, setFriendName] = useState("")
   const nameRegex =  /^[a-zA-Z]{4,30}$/;
   const [selectedFeature1, setSelectedFeature1] = useState('');
   const [selectedFeature2, setSelectedFeature2] = useState('');

   const handleChangeFeature1 = (event) => {
    setSelectedFeature1(event.target.value);
  };

  const handleChangeFeature2 = (event) => {
    setSelectedFeature2(event.target.value);
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

  const handleGenerateLyrics = () => {
    navigate('/register', {
      state: {
        friendname,
        selectedFeature1,
        selectedFeature2,
      },
    });
  };


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
       <span id="friendnameError"></span> 
      <div className={style.forminputbox}>
      <input placeholder='Enter Recipient’s name'  
      type="text"
      name="friendname"               
      value={friendname} 
      onChange={(e) => {  setFriendName(e.target.value)
      if(!nameRegex.test(e.target.value)) {
          document.getElementById("friendnameError").textContent = "Please enter a valid name.";
      }else{
          document.getElementById("friendnameError").textContent = "";
      }
    }} required />
     </div>

     <div className={style.forminputbox}>
     <select value={selectedFeature1} onChange={handleChangeFeature1}>
     <option value="" disabled>Select Feature 1</option>
     {options.map((option) => (
       <option key={option.value} value={option.value}>
         {option.label}
       </option>
     ))}
   </select>
    </div>

     <div className={style.forminputbox}>
     <select value={selectedFeature2} onChange={handleChangeFeature2}>
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
       <input type="checkbox" id="agree" name="agree" required />
       I agree to “Terms & Conditions”.
     </div>

     <div className={style.btnwrapper} >
       <button className={style.button} onClick={handleGenerateLyrics} > Generate lyrics </button>
       <img src={starticon} alt="start icon"/>
    </div>

    </div>

     </div>

    </div>
  )
}

export default Selection