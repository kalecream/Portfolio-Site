import React from 'react';
import { BsTwitter, BsInstagram } from 'react-icons/bs';


const SocialMedia = () => (
  <div className="app__social">
    <div>
    <a href="https://twitter.com/farajisp" target="_blank" rel="noopener noreferrer"><BsTwitter /></a>
      
    </div>

    <div>
    <a href="https://www.instagram.com/faraji.sparks/" target="_blank" rel="noopener noreferrer"><BsInstagram  /></a>
    </div>
  </div>
);

export default SocialMedia;