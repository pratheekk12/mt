import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/mt.png"
      {...props}
      style={{ height: '50px', width: '100px' }}
    />
  );
};

export default Logo;
