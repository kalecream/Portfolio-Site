import { JSX } from 'react';
import { images } from '../../constants';
import './Skills.scss';

interface SkillProps {
  name: string;
  bkgColor: string;
  icon: string | undefined;
}

interface WorkProp {
  title: string;
  company: string;
  desc: string;
}

interface ExperienceProp {
  year: number;
  job?: WorkProp;
}

const Skills: SkillProps[] = [
  { name: 'React', bkgColor: '#61DAFB', icon: images.react },
];

const Experiences: ExperienceProp[] = [
  {
    year: 2021,
    job: {
      title: 'Developer and QA',
      company: 'SMS - Smart Mobile Solutions',
      desc: '',
    },
  },
];

const SkillsComponent = () => {
  return (
    <section className="skills">
      <h2 className="section-header">Skills & Experiences</h2>
      <div className="skills__container">
        <div className="skills-list">
        {Skills.map((skill) => (
          <div className="flex skills-item">
            <img src={skill.icon} />
            <p className="p-text">{skill.name}</p>
          </div>
        ))}
        </div>
        
        <div className="skills__exp">
          {Experiences?.map((experience) => (
            <>
              <div className="skills__exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              {experience.job && (
                <div className="skills__exp-work">
                  <h4 className="bold-text">{experience.job?.title}</h4>
                  <p className="p-text">{experience.job?.company}</p>
                  <p>{experience.job?.desc}</p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsComponent;
