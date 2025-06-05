import React, { useState } from 'react';
import '../Styles/CommunityPage.css'; // You can create this for styling if needed

const CommunityPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false); // Stop loading when iframe has loaded
  };

  return (
    <div className="community-container">
      {isLoading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading AgriNews...</p>
        </div>
      )}

      <iframe
        src="https://agrinews.in/"
        title="AgriNews"
        onLoad={handleIframeLoad}
        style={{
          display: isLoading ? 'none' : 'block',
          width: '100%',
          height: '90vh',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
};

export default CommunityPage;
