import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface HeartParticle {
  id: number;
  x: number; // percentage from left
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = [
  "text-rose-200",
  "text-rose-300",
  "text-pink-200",
  "text-pink-300",
  "text-rose-400",
  "text-red-200",
];

export default function BackgroundHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate an initial beautiful, random selection of hearts
    const initialHearts: HeartParticle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 8, // sizes between 8px and 28px
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15, // float speeds between 15s and 30s
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft warm pink glow backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-100/30 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-100/35 blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-amber-50/20 blur-3xl" />

      {/* Animated floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute bottom-[-5%] ${heart.color} opacity-40`}
          initial={{ 
            y: 0, 
            x: `${heart.x}%`, 
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 20 - 10 
          }}
          animate={{
            y: "-110vh",
            opacity: [0, 0.45, 0.45, 0],
            scale: [0.6, 1.1, 1.1, 0.8],
            rotate: [Math.random() * 20 - 10, Math.random() * 60 - 30, Math.random() * 100 - 50],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          style={{ width: heart.size, height: heart.size }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-sm"
          >
            <path d="M11.645 20.91l-.007-.003-.003-.001a1.944 1.944 0 01-.893-.833l-.012-.022c-.119-.228-.276-.532-.452-.892-.352-.722-.843-1.742-1.385-2.887-1.084-2.29-2.425-5.118-3.324-6.907C4.198 6.507 3.5 4.5 3.5 2.5A4.5 4.5 0 018 2c1.61 0 3.09 1.002 4 2.5 1-.91 2.39-2.5 4-2.5a4.5 4.5 0 014.5 4.5c0 2-.698 4.007-2.074 6.7-.899 1.789-2.24 4.617-3.324 6.907-.542 1.145-1.033 2.165-1.385 2.887a15.82 15.82 0 01-.464.914l-.012.022a1.944 1.944 0 01-.893.833h-.003l-.007.003z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
