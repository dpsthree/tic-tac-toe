import React from 'react';

export const Fireworks: React.FC = () => {
  return (
    <div className="fireworks-container">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};