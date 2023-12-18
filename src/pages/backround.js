// Background.js

import React from 'react';

const Background = ({ backgroundImage, children }) => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundStyles}>
      {children}
    </div>
  );
};

export default Background;
