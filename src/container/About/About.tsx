import { useState, useEffect, SetStateAction, Key } from 'react';
import { motion } from 'framer-motion';
import './About.scss';
import { urlFor, client } from '../../client';

interface AboutProps {
  [x: string]: any;
  imgUrl: string;
  title: string;
  description: string;
}

const About = () => {
  const [abouts, setAbouts] = useState<AboutProps>({imgUrl: '', title: '',description:''});

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data: SetStateAction<AboutProps>) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">I Know that <span>Good Design</span> <br />means  <span>Good Business</span></h2>

      <div className="app__profiles">
        {abouts.map((about:AboutProps, index: Key | null) => (
          <motion.div
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={index}
          >
            <img src={urlFor(about.imgUrl).url()} alt={about?.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about?.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about?.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default About;
