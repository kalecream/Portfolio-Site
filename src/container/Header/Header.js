import React from 'react';
import {motion} from 'framer-motion';
import {AppWrap} from '../../wrapper';
import {images} from '../../constants';

import './Header.scss';

const scaleVariants = {
  animate:{
    scale:[0,1],
    opacity:[0,1],
    transition:{
      duration:1,
      ease:'easeInOut'
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
        onViewportEnter={()=>{
          (console.log('hello'))
        }}
        animate={{x: [-100,0], opacity:[0,1]}}
        transition={{duration:0.6}}
        className='app_header-info' 
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex" >
            <span>👋🏿</span>
            <div style={{marginLeft:20}}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Faraji</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">Web Developer</p>
            <p className="p-text">Designer</p>
            <p className="p-text">Freelancer</p>
          </div>
        </div>
      </motion.div>
    <motion.div
       animate={{opacity:[0,1]}}
       transition={{duration:0.6, delayChildren:0.6}}
       className='app__header-img'
    >
      <img src={images.profile} alt="profile_dp" />
      <motion.img
         animate={{scale:[0,1]}}
         transition={{duration:1, easeInOut:0.6}}
         className='overlay_circle'
         src={images.circle}
         alt="circle"
      />
    </motion.div>
    <motion.div 
      variant={scaleVariants}  
      animate={scaleVariants.animate}
      className='app__header-circles'
    >
      {[images.javascript, images.react, images.sass].map((circle,index)=>(
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt="circle" />
        </div>
      ))}
    </motion.div> 
    </div>
  )


export default AppWrap(Header, 'home');