import { images } from '../../constants';
import './Skills.scss';

interface SkillProps {
  name: string;
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
  { name: 'React', icon: images.react },
  { name: 'Javascript', icon: images.javascript },
  { name: 'Sass', icon: images.sass },
  { name: 'GraphQL', icon: images.graphql },
  { name: 'Figma', icon: images.figma },
  { name: 'Flutter', icon: images.flutter },
];

const Experiences: ExperienceProp[] = [
  {
    year: 2023,
    job: {
      title: 'Developer and QA',
      company: 'SMS - Smart Mobile Solutions',
      desc: 'Experienced professional with a background in Quality Assurance (QA) and development. Successfully managed QA responsibilities for multiple projects at SMS, ensuring timely resolution of tickets for demos and providing valuable insights for ticket enhancements. Additionally, I contributed as a developer on the MedOps team, specializing in React Native. Proven ability to excel in QA and development roles, demonstrating versatility and a strong skill set.',
    },
  },
  {
    year: 2021,
    job: {
      title: "Freelance Web Development",
      company: "TheInstaBooze",
      desc: "I, alongside a colleague, developed the theinstabooze website using HTML, CSS, JS and GSAP"
    }
  },
  {
    year: 2020,
    job: {
      title: "Frontend Developer",
      company: "TheInstaBooze",
      desc: "Development of the Dailabottle site, from design to production and inclusion of google analytics"
    }
  }
];

const SkillsComponent = () => {
  return (
    <section className="skills">
      <h2 className="section-header">Skills & Experiences</h2>
      <div className="skills__container">
        <div className="skills-list">
          {Skills.map((skill) => (
            <div className="flex skills-item">
              <img src={skill.icon} alt={skill.name} title={skill.name} />
              {/* <p className="p-text">{skill.name}</p> */}
            </div>
          ))}
        </div>

        <div className="skills__exp">
          {Experiences?.map((experience) => (
            <div className="skills__exp-item">
              <div className="skills__exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              {experience.job && (
                <div className="skills__exp-work">
                  <h4 className="bold-text">{experience.job?.title}</h4>
                  <p className="p-text">{experience.job?.company}</p>
                  {/* <p>{experience.job?.desc}</p> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsComponent;
