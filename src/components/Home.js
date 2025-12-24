import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch (e) { return 'light' }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  const [isAnimating, setIsAnimating] = useState(false);
  const toggleTheme = () => {
    setIsAnimating(true);
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    setTimeout(() => setIsAnimating(false), 420);
  };

  return (
    <div>
      <button
        className={`theme-toggle ${theme === 'dark' ? 'is-dark' : ''} ${isAnimating ? 'is-animating' : ''}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        aria-pressed={theme === 'dark'}
      >
        <span className="icon-wrap">
          <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <section className="hero">
        <div className="container">
          <img src={`${process.env.PUBLIC_URL}/fazii.jpeg`} alt="Fazim" className="hero-image" />
          <h2>FAZIM R</h2>
          <p>Software Developer</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <a href="/Fazim resume lat.pdf" download="Fazim_Resume.pdf" className="btn btn-secondary">Download Resume</a>
          </div>
        </div>
      </section>
      
      <section className="intro">
        <div className="container">
          <div className="intro-content">
            <h3>Building Tomorrow's Solutions Today</h3>
            <p>Passionate about creating innovative software solutions that make a real-world impact. Specializing in AI/ML applications, full-stack development, and accessible technology solutions.</p>
            <div className="highlights">
              <div className="highlight">
                <h4>🤖 AI/ML Expert</h4>
                <p>Developing intelligent systems for real-world applications</p>
              </div>
              <div className="highlight">
                <h4>💻 Full-Stack Developer</h4>
                <p>End-to-end web and mobile application development</p>
              </div>
              <div className="highlight">
                <h4>♿ Accessibility Advocate</h4>
                <p>Creating inclusive technology for everyone</p>
              </div>
            </div>
          </div>
          <img src={`${process.env.PUBLIC_URL}/code.png`} alt="Code" className="intro-image" />
        </div>
      </section>
      
      <section className="skills">
        <div className="container">
          <h3>Technical Expertise</h3>
          <div className="skills-layout">
            <img src={`${process.env.PUBLIC_URL}/cod.png`} alt="Coding" className="skills-side-image" />
            <div className="skill-categories">
              <div className="skill-category">
                <div className="skill-icon">🎨</div>
                <h4>Frontend Development</h4>
                <div className="skill-tags">
                  <span className="skill-logo"><span className="logo-icon">📄</span> HTML5/CSS3</span>
                  <span className="skill-logo"><span className="logo-icon">⚡</span> JavaScript</span>
                  <span className="skill-logo"><span className="logo-icon">🅱️</span> Bootstrap</span>
                  <span className="skill-logo"><span className="logo-icon">📱</span> Responsive Design</span>
                </div>
              </div>
              <div className="skill-category">
                <div className="skill-icon">⚙️</div>
                <h4>Programming & Tools</h4>
                <div className="skill-tags">
                  <span className="skill-logo"><span className="logo-icon">🐍</span> Python</span>
                  <span className="skill-logo"><span className="logo-icon">☕</span> Java</span>
                  <span className="skill-logo"><span className="logo-icon">🗄️</span> SQL</span>
                  <span className="skill-logo"><span className="logo-icon">🔀</span> Git</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="featured-projects">
        <div className="container">
          <h3>Featured Projects</h3>
          <div className="projects-layout">
            <div className="featured-grid">
              <div className="featured-project">
                <h4>Plant Disease Detection AI</h4>
                <p>Machine learning system for agricultural disease identification with 95% accuracy</p>
                <Link to="/projects" className="project-link">Learn More →</Link>
              </div>
              <div className="featured-project">
                <h4>Accessibility Navigation System</h4>
                <p>Voice-guided navigation tool for visually impaired individuals with obstacle detection</p>
                <Link to="/projects" className="project-link">Learn More →</Link>
              </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/sys.png`} alt="System" className="projects-side-image" />
          </div>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <div className="cta-layout">
            <div className="cta-content">
              <h3>Let's Work Together</h3>
              <p>Ready to bring your ideas to life? Let's discuss your next project.</p>
              <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
            </div>
            <img src={`${process.env.PUBLIC_URL}/coo.png`} alt="Collaboration" className="cta-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;