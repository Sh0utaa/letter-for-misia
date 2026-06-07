import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Calendar, MapPin, Sparkles, RefreshCw } from "lucide-react";
import { calculateTimeRemaining, formatTimeRemaining, TimeRemaining } from "../utils/countdown";

interface LetterProps {
  onClose: () => void;
}

export default function Letter({ onClose }: LetterProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    // Tick the countdown every second
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      id="love-letter-paper"
      className="relative w-full max-w-2xl bg-[#fdfaf2] text-stone-800 shadow-[0_20px_50px_rgba(120,40,60,0.25)] rounded-2xl border-4 border-double border-amber-800/20 overflow-hidden mx-4 my-8 md:my-12 z-40"
    >
      {/* Visual texture paper grid watermark */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle, #000 10%, transparent 11%),
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 100% 28px",
        }}
      />

      {/* Decorative vintage rose-watermark or corner ornaments */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-rose-200/40 rounded-tl-xl m-4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-rose-200/40 rounded-tr-xl m-4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-rose-200/40 rounded-bl-xl m-4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-rose-200/40 rounded-br-xl m-4 pointer-events-none" />

      {/* Letter Body Content */}
      <div className="px-6 py-10 sm:px-12 sm:py-14 relative z-10 font-sans leading-relaxed">
        
        {/* Romantic Letter Heading */}
        <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-rose-900 tracking-tight mb-8">
          Hey Misia,
        </h1>

        {/* Narrative letter paragraphs */}
        <div className="space-y-6 text-base sm:text-lg text-stone-700 font-sans tracking-wide leading-relaxed">
          <p>
            There wasn't an option to leave a note with the flowers, so I'm sending your card here! I hope they brighten up your room and remind you of me every time you look at them.
          </p>

          <p>
            I love you and miss you so much. I know long-distance gets really tough sometimes, and it's hard not being able to just be there physically whenever we need each other. Moments like these will hopefully make you feel like I'm next to you somehow.
          </p>

          <p>
            No matter the distance, you are the best girl on this planet and the most important person in my life. No matter how far apart we are right now, my heart is completely with you.
          </p>

          <p className="font-medium text-rose-800">
            only <span className="font-semibold text-rose-600 font-mono text-xl">{timeRemaining.days}</span> days until we see each other!
          </p>
        </div>

        {/* Romantic Sign-off */}
        <div className="mt-12 pt-6 border-t border-rose-100/60 flex justify-between items-end">
          <div className="space-y-1">
            <p className="font-sans text-stone-600 italic text-sm">Kocham cię,</p>
            <p className="font-cursive text-4xl text-rose-800 pt-1 tracking-wide">
              Shota
            </p>
          </div>
          
          {/* Back Action Trigger Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 hover:bg-stone-100 text-stone-500 hover:text-rose-600 font-mono text-xs font-semibold rounded-lg border border-transparent hover:border-stone-200 transition-all cursor-pointer shadow-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fold Back</span>
          </button>
        </div>

      </div>

      {/* Sweet hidden aesthetic stamp inside the footer base of paper */}
      <div className="h-2 bg-gradient-to-r from-red-300 via-rose-400 to-pink-300" />
    </motion.div>
  );
}
