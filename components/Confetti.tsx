'use client';

import React from "react"

import { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  left: string;
  delay: string;
  duration: string;
  emoji: string;
  swayAmount: number;
  swayDelay: number;
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const emojis = ['💕', '💖', '💝', '✨', '🎉', '💘', '🌹', '💐', '🎊', '💞'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      duration: `${2.5 + Math.random() * 2}s`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      swayAmount: (Math.random() - 0.5) * 150,
      swayDelay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg) translateX(var(--sway));
          }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(var(--sway)); }
        }
        
        @keyframes spin-rotate {
          0% { transform: rotateZ(0deg) rotateX(0deg); }
          100% { transform: rotateZ(720deg) rotateX(360deg); }
        }
      `}</style>
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute text-3xl md:text-4xl"
          style={{
            left: item.left,
            top: '-50px',
            animation: `confetti-fall ${item.duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) ${item.delay} both`,
            '--sway': `${item.swayAmount}px`,
          } as React.CSSProperties & { '--sway': string }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
