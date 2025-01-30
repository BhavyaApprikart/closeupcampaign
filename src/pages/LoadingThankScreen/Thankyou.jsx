import style from './Thankyou.module.css';
import { useEffect, useState } from 'react';
// import logo from '../../assets/logo.png';
// import thankyou from '../../assets/Flower bouq. 2.png';
// import topleftpinksheet from '../../assets/pink sheet 2.png';
// import topleftletter from '../../assets/letter 3.png';
// import topleftheart from '../../assets/pink heart 1.png';
// import toprightletter from '../../assets/Card+Note.png';
// import xoxo from '../../assets/XOXO 1.png';
// import xoxobackground from '../../assets/pencil scratch 2.png';
// import giftbox from '../../assets/gift (2).png';
// import bottomleftbackground from '../../assets/stroke.png';
// import bottomrightpinkpaper from '../../assets/Cut paper 1.png';
// import bottomrightroses from '../../assets/rose 2.png';


const Thankyou = () => {

  // Asset states
  const [assets, setAssets] = useState({});

    // Dynamic asset loading
    useEffect(() => {
      const loadAssets = async () => {
        try {
          const assetUrls = {
            logo: 'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/logo.png',
            topleftpinksheet:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/pink%20sheet%202.png',
            topleftletter:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/letter%203.png',
            topleftheart:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/pink%20heart%201.png',
            toprightletter:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Card%2BNote.png',
            xoxo: 'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/XOXO%201.png',
            xoxobackground:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/pencil%20scratch%202.png',
            giftbox: 'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/gift%20(2).png',
            bottomleftbackground:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/stroke.png',
            bottomrightpinkpaper:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Cut%20paper%201.png',
            bottomrightroses:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/rose%202.png',
            thankyou:
              'https://closeup-project.s3.ap-south-1.amazonaws.com/registration-assets/Flower%20bouq.%202.png',
          };
  
          // Dynamically fetch and store assets
          setAssets(assetUrls);
        } catch (error) {
          console.error('Failed to load assets:', error);
        }
      };
  
      loadAssets();
    }, []);


  return (
    <div className={style.container}>

    {assets.topleftpinksheet && (
      <img
        id={style.topleftpinksheet}
        src={assets.topleftpinksheet}
        alt="Pink Sheet"
      />
    )}
    
    {assets.topleftletter && (
      <img
        id={style.topleftletter}
        src={assets.topleftletter}
        alt="Letter"
      />
    )}
    
    {assets.topleftheart && (
      <img
        id={style.topleftheart}
        src={assets.topleftheart}
        alt="Heart"
      />
    )}
    
    {assets.toprightletter && (
      <img
        id={style.toprightletter}
        src={assets.toprightletter}
        alt="Top Right Letter"
      />
    )}
    
    {assets.xoxobackground && (
      <img
        id={style.xoxobackground}
        src={assets.xoxobackground}
        alt="XOXO Background"
      />
    )}
    
    {assets.xoxo && (
      <img
        id={style.xoxo}
        src={assets.xoxo}
        alt="XOXO"
      />
    )}
    
    {assets.giftbox && (
      <img
        id={style.giftbox}
        src={assets.giftbox}
        alt="Gift Box"
      />
    )}
    
    {assets.bottomleftbackground && (
      <img
        id={style.bottomleftbackground}
        src={assets.bottomleftbackground}
        alt="Bottom Left Background"
      />
    )}
    
    {assets.bottomrightpinkpaper && (
      <img
        id={style.bottomrightpinkpaper}
        src={assets.bottomrightpinkpaper}
        alt="Bottom Right Pink Paper"
      />
    )}
    
    {assets.bottomrightroses && (
      <img
        id={style.bottomrightroses}
        src={assets.bottomrightroses}
        alt="Bottom Right Roses"
      />
    )}
    
    <div className={style.maincontentbox}>

     <div className={style.logowrapper}>
        { assets.logo &&  <img src={assets.logo} alt="logo" />}
     </div>

    <div className={style.content}>
       { assets.thankyou && <img src={assets.thankyou} alt="Thank you image"/>}
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