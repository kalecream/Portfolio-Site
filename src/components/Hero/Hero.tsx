import { images } from '../../constants';
import SocialMedia from '../SocialMedia';
import './Hero.scss';

const Hero = () => (
  <section className="hero">
    <div className="hero__badge">
      <small className="p-text">Hey, I am</small>
      <h1 className="head-text">Faraji</h1>
      <div className="flex hero__badge-container">
        <SocialMedia />
        <span className="hero__role"></span>
      </div>
    </div>
    <img className="hero__img" src={images.profile} alt="profile_dp" />
  </section>
);

export default Hero;
