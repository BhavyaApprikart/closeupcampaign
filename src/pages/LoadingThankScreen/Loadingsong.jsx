import style from './Loadingsong.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#F96E74',
      ...theme.applyStyles('dark', {
        backgroundColor:  '#F96E74',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 6,
      backgroundColor: '#ffffff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#f2f2f2',
      }),
    },
  }));


function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center',padding:'1.5rem 0'}}>
        <Box sx={{ width: '60%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };


const Loadingsong = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(10);


    //   useEffect(() => { 
    //         if(progress === 100)    {
    //             setTimeout(() => {
    //                 navigate('/thankyou')
    //             }, 2000);
    //         }

    //   }, [progress]);

     useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 2000);

      return () => {
        clearInterval(timer);
      };
    }, []);

  return (
    <div className={style.container}>
    <div className={style.maincontentbox}>

    <div className={style.logowrapper}>
         <img src={logo} alt="logo" />
     </div>

    <div className={style.content}>
        <p>Here are your selections</p>

         <LinearProgressWithLabel value={progress} />

        <p id={style.loadingtext}>Writing lyrics for your loved ones..</p>

    </div>

    <div className={style.pinkbox}>
     <p>Create a personalized love song for <span id={style.splfeature}>Nancy</span> including features, <span id={style.splfeature}>Smile</span> & <span id={style.splfeature}>Eyes</span>.</p>
    </div>
    
    </div>

    </div>
  )
}

export default Loadingsong