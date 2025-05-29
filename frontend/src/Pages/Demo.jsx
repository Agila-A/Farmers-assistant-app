// src/Pages/DemoPage.jsx
import React from 'react';
import '../Styles/Demo.css';

const Demo = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Welcome to the App Demo 🎥</h2>
    <p>Here you can add a tutorial video or guide.</p>
    {/* Embed a video or tutorial */}
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/your-demo-video-id" 
      title="Demo Video" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen
    ></iframe>
  </div>
);

export default Demo;
