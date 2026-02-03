'use client';

export default function ShakeAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-5px) translateY(-5px); }
          20% { transform: translateX(5px) translateY(5px); }
          30% { transform: translateX(-5px) translateY(5px); }
          40% { transform: translateX(5px) translateY(-5px); }
          50% { transform: translateX(-3px) translateY(-3px); }
          60% { transform: translateX(3px) translateY(3px); }
          70% { transform: translateX(-3px) translateY(3px); }
          80% { transform: translateX(3px) translateY(-3px); }
          90% { transform: translateX(-2px) translateY(0); }
        }
      `}</style>
      <div
        className="fixed inset-0"
        style={{
          animation: 'shake 0.5s ease-in-out 1',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
