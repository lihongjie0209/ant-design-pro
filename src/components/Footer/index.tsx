import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div
      style={{
        padding: '16px 24px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: '14px',
        background: 'transparent',
      }}
    >
      &copy; {year} My App
    </div>
  );
};

export default Footer;
