import './Services.scss';

const Services = () => {
  return (
    <section className="services">
      <h2 className="section__header" style={{fontFamily: "var(--headingFont)"}}>
        I know that<br/> <span className="highlight">Good Design</span> means{' '}
        <span className="highlight">Good Business</span>
      </h2>
      <div className="services-box">
        <div className="service">
          <figure>
            <img src="https://cdn.sanity.io/images/evc2qsht/production/a7f32771a360b2b0fce6def8e80e9050cbf3a5eb-1920x1080.png"></img>
          </figure>
          <h3>Website Developer</h3>
          <p>+5 plus websites</p>
        </div>
        <div className="service">
          <figure>
            <img src="https://cdn.sanity.io/images/evc2qsht/production/6e2fe1a580d3336e5f8a2bea24373cf00ca8c567-3022x1398.png"></img>
          </figure>
          <h3>Graphic Designer</h3>
          <p>Engaging and dynamic designs</p>
        </div>
        <div className="service">
          <figure>
            <img src="https://cdn.sanity.io/images/evc2qsht/production/61e9351b3ac68a3975dd1e799d010fe066e2c4f9-800x424.png"></img>
          </figure>
          <h3>Website Designer</h3>
          <p>Able to create fully realized mock-ups and wireframes</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
