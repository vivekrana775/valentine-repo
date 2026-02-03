'use client';

import React from "react"

import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: string;
  delay: string;
  duration: string;
  drift: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${4 + Math.random() * 4}s`,
      drift: (Math.random() - 0.5) * 100,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-120vh) scale(0.3) rotate(360deg);
          }
        }
        
        @keyframes drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(var(--drift)); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 0px rgba(236, 72, 153, 0));
            text-shadow: none;
          }
          50% { 
            filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.6));
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
          }
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-3xl md:text-4xl animate-bounce"
          style={{
            left: heart.left,
            bottom: '-50px',
            animation: `float-up ${heart.duration} ease-in-out ${heart.delay} infinite, pulse-glow ${3}s ease-in-out ${heart.delay} infinite`,
            '--drift': `${heart.drift}px`,
          } as React.CSSProperties & { '--drift': string }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
