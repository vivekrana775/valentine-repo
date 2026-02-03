'use client';

import React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FloatingHearts from '@/components/FloatingHearts';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

export default function NameInput({ onNameSubmit }: NameInputProps) {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <>
      <FloatingHearts />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10 animate-in fade-in-50 duration-1000">
            <div className="mb-6">
              <h1 className="text-8xl mb-4 animate-pulse">💖</h1>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 text-pretty">
              Valentine&apos;s Day
            </h2>
            <p className="text-lg text-foreground/70 font-medium">Let&apos;s make it special...</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in-50 duration-1000 delay-300">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                Who are you proposing to?
              </label>
              <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter their name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="text-lg h-14 border-2 border-primary/20 focus:border-primary rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm"
                  autoFocus
                />
                {isFocused && (
                  <div className="absolute inset-0 rounded-xl border-2 border-primary/30 blur-sm pointer-events-none animate-pulse"></div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let&apos;s Go 💘
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-foreground/60 mb-3">💡 Pro tip:</p>
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <p className="text-xs text-foreground/70">
                You can also share a direct link:
              </p>
              <p className="text-sm text-primary font-mono mt-2">
                yoursite.com?name=Alex
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
