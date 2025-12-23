import React, { useState, useEffect } from 'react';
import './AccessibilityNav.css';

const LOCATIONS = {
  entrance: { name: 'Store Entrance', next: ['fruits', 'vegetables', 'dairy'], description: 'Welcome to the store' },
  fruits: { name: 'Fruits Section', next: ['vegetables', 'bakery'], description: 'Fresh fruits available' },
  vegetables: { name: 'Vegetables Section', next: ['fruits', 'dairy'], description: 'Fresh vegetables here' },
  dairy: { name: 'Dairy Section', next: ['frozen', 'checkout'], description: 'Milk and dairy products' },
  bakery: { name: 'Bakery Section', next: ['checkout'], description: 'Fresh bread and pastries' },
  frozen: { name: 'Frozen Foods', next: ['checkout'], description: 'Frozen items section' },
  checkout: { name: 'Checkout Counter', next: ['entrance'], description: 'Payment counter ahead' }
};

const AccessibilityNav = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('entrance');
  const [transcript, setTranscript] = useState('');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const navigate = (destination) => {
    if (LOCATIONS[currentLocation].next.includes(destination)) {
      setCurrentLocation(destination);
      speak(`Moving to ${LOCATIONS[destination].name}. ${LOCATIONS[destination].description}`);
    } else {
      speak('Cannot navigate there from current location');
    }
  };

  const startVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      speak('Voice recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);

      if (command.includes('where am i')) {
        speak(`You are at ${LOCATIONS[currentLocation].name}`);
      } else if (command.includes('help')) {
        speak(`Available sections: ${LOCATIONS[currentLocation].next.join(', ')}`);
      } else {
        const destination = Object.keys(LOCATIONS).find(key => command.includes(key));
        if (destination) navigate(destination);
        else speak('Command not recognized');
      }
    };

    recognition.start();
  };

  useEffect(() => {
    speak(`${LOCATIONS[currentLocation].name}. ${LOCATIONS[currentLocation].description}`);
  }, [currentLocation]);

  return (
    <div className="accessibility-nav" role="main" aria-label="Shopping Navigation System">
      <h1>Accessibility Navigation System</h1>
      
      <div className="current-location" aria-live="polite">
        <h2>Current Location: {LOCATIONS[currentLocation].name}</h2>
        <p>{LOCATIONS[currentLocation].description}</p>
      </div>

      <div className="controls">
        <button 
          onClick={startVoiceCommand}
          aria-label="Start voice command"
          className={isListening ? 'listening' : ''}
        >
          {isListening ? '🎤 Listening...' : '🎤 Voice Command'}
        </button>
        
        <button onClick={() => speak(`You are at ${LOCATIONS[currentLocation].name}`)}>
          📍 Where Am I?
        </button>
      </div>

      {transcript && <p className="transcript" aria-live="polite">You said: "{transcript}"</p>}

      <nav className="navigation-options" aria-label="Available destinations">
        <h3>Navigate To:</h3>
        <div className="nav-buttons">
          {LOCATIONS[currentLocation].next.map(dest => (
            <button 
              key={dest}
              onClick={() => navigate(dest)}
              aria-label={`Navigate to ${locations[dest].name}`}
            >
              ➡️ {LOCATIONS[dest].name}
            </button>
          ))}
        </div>
      </nav>

      <div className="instructions" aria-label="Voice commands help">
        <h3>Voice Commands:</h3>
        <ul>
          <li>"Where am I?" - Get current location</li>
          <li>"Help" - List available sections</li>
          <li>Say section name to navigate (e.g., "fruits", "checkout")</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibilityNav;
