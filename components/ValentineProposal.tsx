'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';
import Confetti from '@/components/Confetti';
import ParticleExplosion from '@/components/ParticleExplosion';
import ShakeAnimation from '@/components/ShakeAnimation';

interface ValentineProposalProps {
  userName: string;
}

export default function ValentineProposal({ userName }: ValentineProposalProps) {
  const [noClicks, setNoClicks] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [shouldShake, setShouldShake] = useState(false);
  const [pulseOn, setPulseOn] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const newYesScale = 1 + noClicks * 0.35;
    const newNoScale = Math.max(0.15, 1 - noClicks * 0.18);
    setYesScale(newYesScale);
    setNoScale(newNoScale);
  }, [noClicks]);

  useEffect(() => {
    if (noClicks > 0) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    }
  }, [noClicks]);

  useEffect(() => {
    const interval = setInterval(() => setPulseOn(v => !v), 800);
    return () => clearInterval(interval);
  }, []);

  const handleNo = () => {
    setNoClicks(noClicks + 1);
    playClickSound();

    // Random position change for button
    if (noButtonRef.current && noClicks < 6) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 100;
      noButtonRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
  };

  const handleYes = () => {
    setShowSuccess(true);
    playSuccessSound();
  };

  const handleRestart = () => {
    setNoClicks(0);
    setShowSuccess(false);
  };

  const playClickSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99];

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.05 + 0.3);

      oscillator.start(audioContext.currentTime + index * 0.05);
      oscillator.stop(audioContext.currentTime + index * 0.05 + 0.3);
    });
  };

  const getFunMessages = () => {
    const messages = [
      'Hmm, are you sure? 👀',
      'Come on! 🥺',
      'Think about it... 💭',
      'You\'re breaking my heart! 💔',
      'Pretty please? 🙏',
      'The Yes button is right there! ☝️',
      'Don\'t be shy! 😊',
      'I promise it\'ll be fun! 🎉',
      'One more chance? 🥺💕',
      'You know you want to! 😉',
    ];
    return messages[Math.min(noClicks - 1, messages.length - 1)] || messages[messages.length - 1];
  };

  if (showSuccess) {
    return (
      <>
        <Confetti />
        <FloatingHearts />
        <ParticleExplosion />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background p-4 overflow-hidden">
          <div className="text-center animate-in zoom-in-50 duration-700">
            <div className="mb-6 animate-bounce" style={{ animation: 'bounce 1s infinite' }}>
              <h1 className="text-8xl mb-4">💘</h1>
            </div>
            <div className="mb-6">
              <div className="inline-block">
                <h2 className="text-5xl font-bold text-primary mb-2 animate-in slide-in-from-bottom duration-500">Yay!</h2>
                <h3 className="text-4xl font-bold text-primary mb-6 animate-in slide-in-from-bottom duration-700 delay-100">
                  You just made my day! 💕
                </h3>
              </div>
            </div>
            <p className="text-2xl text-foreground/80 mb-8 font-medium">
              {userName} said YES!
            </p>
            <p className="text-lg text-foreground/60 mb-10">
              This is going to be the best Valentine's Day ever! 🎉✨
            </p>
            <Button
              onClick={handleRestart}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg rounded-full transition-all duration-300 hover:scale-110 font-bold shadow-lg hover:shadow-xl"
            >
              Ask Again 💖
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FloatingHearts />
      {shouldShake && <ShakeAnimation />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="text-center animate-in fade-in-50 duration-1000">
            <div className="mb-8">
              <div className={`text-7xl mb-4 transition-all duration-300 ${pulseOn ? 'scale-125' : 'scale-100'}`}>
                💖
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-primary text-pretty leading-tight mb-8">
                {userName}, will you be my Valentine?
              </h2>
            </div>

            {/* Fun message when No is clicked */}
            {noClicks > 0 && (
              <div className="mb-8 min-h-10 animate-in fade-in-50 duration-500">
                <p className="text-xl text-foreground/75 font-medium">{getFunMessages()}</p>
              </div>
            )}

            {/* Buttons Container */}
            <div className="flex gap-4 justify-center items-center flex-wrap relative min-h-24">
              {/* Yes Button */}
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${yesScale})`,
                }}
                className="relative px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground rounded-full font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 cursor-pointer whitespace-nowrap shadow-lg active:scale-95"
              >
                Yes 💕
              </button>

              {/* No Button */}
              {noClicks < 8 && (
                <button
                  ref={noButtonRef}
                  onClick={handleNo}
                  style={{
                    transform: `scale(${noScale})`,
                    opacity: Math.max(0.2, 1 - noClicks * 0.1),
                  }}
                  className="relative px-8 py-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent hover:to-accent text-accent-foreground rounded-full font-bold text-xl transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg active:scale-95"
                >
                  No 😅
                </button>
              )}
            </div>

            {/* Cheeky message when button gets too small */}
            {noClicks >= 8 && (
              <div className="mt-8 animate-in fade-in-50 duration-500">
                <p className="text-xl text-primary font-bold mb-4 animate-pulse">
                  Looks like you don&apos;t have a choice anymore! 😉
                </p>
              </div>
            )}

            {/* Click count feedback */}
            {noClicks > 0 && (
              <div className="mt-8 text-sm text-foreground/50 font-medium">
                {noClicks === 1 && '😢 Oof, one no...'}
                {noClicks === 2 && `😞 That's two nos...`}
                {noClicks >= 3 && noClicks < 8 && `😭 That's ${noClicks} nos so far...`}
                {noClicks >= 8 && '🤷 The No button went bye-bye!'}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
