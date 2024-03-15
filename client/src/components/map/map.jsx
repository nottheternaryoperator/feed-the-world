import React from 'react';
import './Map.css'; // Import the corresponding CSS file

const Map = () => {
  return (
    <div className="container">
      <div className="content-container">
        {/* Your content here */}
      </div>
      <div className="map-container">
        {/* Embedded map goes here */}
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.6873492157753!2d-122.41942078481855!3d37.77492987975535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580aa2b7b444d%3A0x539d606d22f61ad4!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1647515223080!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
