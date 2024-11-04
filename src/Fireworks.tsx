import React from 'react';

const Fireworks: React.FC = () => {
  return (
    <div className="fireworks-container">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="firework" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`
        }} />
      ))}
    </div>
  );
};

export default Fireworks;