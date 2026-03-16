"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "lantern" | "star" | "crescent" | "geometric";
  side: "left" | "right";
}

export function IslamicBackground() {
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create floating elements for both sides
    const elements: FloatingElement[] = [];
    
    // Left side elements
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        x: 2 + Math.random() * 12,
        y: 10 + (i * 12),
        size: 20 + Math.random() * 25,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
        type: ["lantern", "star", "crescent", "geometric"][Math.floor(Math.random() * 4)] as FloatingElement["type"],
        side: "left",
      });
    }
    
    // Right side elements
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i + 8,
        x: 86 + Math.random() * 12,
        y: 10 + (i * 12),
        size: 20 + Math.random() * 25,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
        type: ["lantern", "star", "crescent", "geometric"][Math.floor(Math.random() * 4)] as FloatingElement["type"],
        side: "right",
      });
    }
    
    setFloatingElements(elements);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Full Screen Mosque Image Background */}
      <div className="absolute inset-0">
        <img 
          src="/images/islamic-bg.jpg" 
          alt="Islamic Background" 
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      {/* LEFT SIDE - Floating Lanterns & Stars */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 pointer-events-none">
        {floatingElements.filter(el => el.side === "left").map((el) => (
          <div
            key={el.id}
            className="absolute animate-float-left"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            {el.type === "lantern" && (
              <div className="relative">
                <svg width={el.size} height={el.size * 1.4} viewBox="0 0 40 56" className="drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                  {/* Lantern top */}
                  <path d="M15 0h10v4H15z" fill="#D4AF37" />
                  <path d="M18 4h4v3h-4z" fill="#B8860B" />
                  {/* Lantern body */}
                  <path d="M8 10h24l-2 35H10L8 10z" fill="url(#lanternGrad)" opacity="0.9" />
                  <path d="M12 15h16v25H12z" fill="#FFF3B0" opacity="0.3" />
                  {/* Glow */}
                  <circle cx="20" cy="28" r="8" fill="#FFD700" opacity="0.4" className="animate-pulse" />
                  <defs>
                    <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#8B6914" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            {el.type === "star" && (
              <svg width={el.size} height={el.size} viewBox="0 0 24 24" className="text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-twinkle-star">
                <path fill="currentColor" d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
              </svg>
            )}
            {el.type === "crescent" && (
              <svg width={el.size} height={el.size} viewBox="0 0 24 24" className="text-primary drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] animate-float-gentle">
                <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {el.type === "geometric" && (
              <div 
                className="border-2 border-primary/60 rotate-45 animate-spin-slow"
                style={{ width: el.size, height: el.size }}
              />
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Different Floating Elements */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 pointer-events-none">
        {floatingElements.filter(el => el.side === "right").map((el) => (
          <div
            key={el.id}
            className="absolute animate-float-right"
            style={{
              right: `${100 - el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            {el.type === "lantern" && (
              <div className="relative">
                <svg width={el.size} height={el.size * 1.4} viewBox="0 0 40 56" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                  <path d="M15 0h10v4H15z" fill="#10B981" />
                  <path d="M18 4h4v3h-4z" fill="#059669" />
                  <path d="M8 10h24l-2 35H10L8 10z" fill="url(#lanternGrad2)" opacity="0.9" />
                  <path d="M12 15h16v25H12z" fill="#D1FAE5" opacity="0.3" />
                  <circle cx="20" cy="28" r="8" fill="#34D399" opacity="0.4" className="animate-pulse" />
                  <defs>
                    <linearGradient id="lanternGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#065F46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            {el.type === "star" && (
              <svg width={el.size} height={el.size} viewBox="0 0 24 24" className="text-accent drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-twinkle-star">
                <path fill="currentColor" d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
              </svg>
            )}
            {el.type === "crescent" && (
              <svg width={el.size} height={el.size} viewBox="0 0 24 24" className="text-accent drop-shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-float-gentle">
                <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {el.type === "geometric" && (
              <div 
                className="border-2 border-accent/60 rotate-45 animate-spin-slow-reverse"
                style={{ width: el.size, height: el.size }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Center Rising Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-rise"
            style={{
              left: `${20 + Math.random() * 60}%`,
              bottom: "-30px",
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          >
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-primary/50' : 'bg-accent/50'} blur-[1px]`} />
          </div>
        ))}
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-48 h-96 bg-primary/10 blur-[80px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-0 w-48 h-96 bg-accent/10 blur-[80px] animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-primary/15 blur-[100px] animate-breathe" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 150px 50px rgba(0,0,0,0.5)',
      }} />
    </div>
  );
}
