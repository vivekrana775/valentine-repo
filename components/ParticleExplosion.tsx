'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  emoji: string;
}

export default function ParticleExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const emojis = ['💘', '💕', '💖', '✨', '🌹', '💐', '🎉'];
    const newParticles = Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const speed = 4 + Math.random() * 6;
      return {
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 24 + Math.random() * 24,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });
    setParticles(newParticles);

    let animationFrameId: number;
    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
          }))
          .filter(p => p.y < window.innerHeight + 100)
      );

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-4xl"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}px`,
            opacity: Math.max(0, 1 - (particle.y / window.innerHeight) * 2),
            pointerEvents: 'none',
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}
