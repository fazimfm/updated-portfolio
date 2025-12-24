import React, { useState } from 'react';

const Portfolio = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const videoMappings = {
    3: 'ebbill.mp4',
    4: 'weather (1).mp4',
    5: 'to do list.mp4',
    6: 'fmclg.mp4'
  };

  const githubMappings = {
    3: 'https://github.com/fazimfm/unit-eb-bill-calculator',
    4: 'https://github.com/fazimfm/weather-app',
    5: 'https://github.com/fazimfm/to-do-list',
    6: 'https://github.com/fazimfm/fm-clg-website'
  };

  const handleLiveDemo = (projectId) => {
    const video = videoMappings[projectId];
    if (video) {
      setCurrentVideo(`${process.env.PUBLIC_URL}/${video}`);
      setShowVideo(true);
    }
  };

  const handleGitHub = (projectId) => {
    const url = githubMappings[projectId];
    if (url) window.open(url, '_blank');
  };

  const projects = [
    { 
      id: 1, 
      title: 'Plant Disease Detection Using AI', 
      tech: 'Python, TensorFlow, OpenCV, Flask', 
      description: 'AI-powered plant disease detection system using deep learning to identify diseases from leaf images with 95% accuracy.',
      features: ['Image Classification', 'Disease Identification', 'Treatment Recommendations', 'Mobile App Integration']
    },
    { 
      id: 2, 
      title: 'Blind People Shopping Navigation With Voice Assistance And Obstacle Analysis', 
      tech: 'Python, Computer Vision, Speech Recognition, IoT', 
      description: 'Assistive technology solution for visually impaired individuals featuring voice-guided navigation and real-time obstacle detection.',
      features: ['Voice Navigation', 'Obstacle Detection', 'Product Recognition', 'Audio Feedback']
    },
    { 
      id: 3, 
      title: 'UNIT EB BILL CALCULATOR', 
      tech: 'JavaScript, HTML5, CSS3, Local Storage, Chart.js', 
      description: 'Comprehensive electricity bill calculator application designed for Tamil Nadu EB (Electricity Board) tariff structure. Features real-time unit consumption tracking, monthly bill estimation, usage analytics, and cost optimization suggestions for residential and commercial users.',
      features: ['Multi-Tariff Calculation', 'Usage Analytics Dashboard', 'Bill History & Trends', 'Cost Optimization Tips', 'Monthly Consumption Tracking', 'Tariff Comparison Tool', 'Export Bill Reports', 'Usage Alerts & Notifications']
    },
    { 
      id: 4, 
      title: 'Weather App', 
      tech: 'React, JavaScript, Weather API', 
      description: 'Real-time weather application with location-based forecasts, interactive maps, and detailed weather information.',
      features: ['Current Weather', 'Weather Forecast', 'Location Search', 'Interactive Maps']
    },
    { 
      id: 5, 
      title: 'To Do List', 
      tech: 'React, JavaScript, Local Storage', 
      description: 'Interactive task management application with priority levels, categories, and progress tracking for daily productivity.',
      features: ['Task Management', 'Priority Levels', 'Categories', 'Progress Tracking']
    },
    { 
      id: 6, 
      title: 'FM College Website', 
      tech: 'HTML, CSS, JavaScript', 
      description: 'Educational institution website with course information, faculty details, admission process, and student portal.',
      features: ['Course Information', 'Faculty Details', 'Admission Portal', 'Student Resources']
    }
  ];

  return (
    <section className="portfolio">
      <div className="container">
        <h2>My Projects</h2>
        <div className="project-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="tech-stack">{project.tech}</p>
              <p className="description">{project.description}</p>
              <div className="features">
                {project.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
              {project.id > 2 && (
                <div className="project-actions">
                  <button className="btn btn-primary" onClick={() => handleLiveDemo(project.id)}>Video Demo</button>
                  <button className="btn btn-secondary" onClick={() => handleGitHub(project.id)}>Github</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowVideo(false)}>×</button>
            <video controls autoPlay style={{ width: '100%', maxHeight: '80vh' }}>
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;