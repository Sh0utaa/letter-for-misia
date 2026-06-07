import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function Envelope({ onOpen, isOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center select-none z-10 p-4">
      
      {/* Container holding the envelope inside a 3D space */}
      <motion.div
        className="relative w-80 sm:w-96 h-56 sm:h-64 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (!isOpen) onOpen();
        }}
        // Slight hover tilt to make it tactile and organic
        animate={isOpen ? {
          scale: 0.95,
          y: 20,
          opacity: 0.8,
        } : {
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? -2 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      >
        {/* Shadow cast on the ground below the envelope */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-rose-950/15 blur-md rounded-full transition-all duration-300 transform scale-x-110" />

        {/* 1. LAYER 0: ENVELOPE BACK PLATE */}
        <div className="absolute inset-0 bg-rose-900 border-2 border-rose-950/25 rounded-2xl shadow-xl overflow-hidden">
          {/* Subtle inside lining of the envelope pocket */}
          <div className="absolute inset-2 bg-[#dfc5cc] opacity-15 rounded-xl border border-dashed border-rose-300/40" />
        </div>

        {/* 2. LAYER 1: THE PAPER (Revealed as envelope opens, sliding upward) */}
        {!isOpen && (
          <motion.div
            className="absolute left-4 right-4 bottom-2 h-44 bg-[#fdfaf2] rounded-lg shadow-sm border border-amber-800/10 p-4 font-serif flex flex-col justify-between"
            initial={{ y: 0 }}
            animate={isHovered ? { y: -10 } : { y: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <div className="h-2 w-1/3 bg-rose-100 rounded" />
            <div className="space-y-1.5 opacity-40">
              <div className="h-1 bg-stone-300 rounded w-full" />
              <div className="h-1 bg-stone-300 rounded w-5/6" />
              <div className="h-1 bg-stone-300 rounded w-4/5" />
            </div>
            <div className="flex justify-end">
              <Heart className="w-3.5 h-3.5 fill-rose-300 stroke-rose-300" />
            </div>
          </motion.div>
        )}

        {/* 3. LAYER 2: LEFT & RIGHT SIDE FLAPS ACCENTS (Creating the envelope structure overlay) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {/* Bottom Flap Triangle */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 md:h-36 bg-rose-800 shadow-[0_-5px_15px_rgba(0,0,0,0.15)] border-t border-rose-700/50"
            style={{
              clipPath: "polygon(0 100%, 50% 35%, 100% 100%)",
            }}
          />

          {/* Left Flap Triangle */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-44 bg-rose-850/95 border-r border-rose-950/15" 
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />

          {/* Right Flap Triangle */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-44 bg-rose-850/95 border-l border-rose-950/15" 
            style={{
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
            }}
          />
        </div>

        {/* 4. LAYER 3: TOP FLAP (Animates rotating upwards to open) */}
        <motion.div
          className="absolute left-[2px] right-[2px] top-0 h-32 bg-rose-800 border-b border-rose-950/15"
          style={{
            originY: 0,
            clipPath: "polygon(0 0, 50% 98%, 100% 0)",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            zIndex: isOpen ? 0 : 10,
            filter: isOpen ? "brightness(0.9)" : "brightness(1)",
          }}
          animate={isOpen ? {
            rotateX: 180,
            y: -1,
          } : {
            rotateX: 0,
            y: 0,
          }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 90,
            delay: isOpen ? 0 : 0.4
          }}
        />

        {/* 5. LAYER 4: DETAILED WAX SEAL OR GOLD HEART BOW */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ zIndex: 15 }}
          animate={isOpen ? {
            scale: 0,
            rotate: 45,
            opacity: 0,
          } : {
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? -5 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Detailed Golden-Red Wax Circular Seal */}
          <div className="relative group/seal cursor-pointer">
            {/* Ambient gold glow on hover */}
            <div className="absolute -inset-1.5 bg-amber-400 rounded-full blur opacity-10 group-hover/seal:opacity-100 transition duration-500 animate-pulse" />
            
            {/* Red Wax base structure */}
            <div className="relative w-14 h-14 bg-red-700/95 border-2 border-red-800/80 rounded-full shadow-lg flex items-center justify-center transform active:scale-95 transition-transform">
              
              {/* Golden metallic inner ring */}
              <div className="w-10 h-10 border-2 border-dashed border-amber-300/40 rounded-full flex items-center justify-center">
                
                {/* Embedded Heart Emblem */}
                <Heart className="w-6 h-6 text-amber-100 fill-amber-200 stroke-amber-200 animate-pulse" />
              </div>

              {/* Little realistic drippings around red wax edges */}
              <div className="absolute top-[-3px] left-[15px] w-4 h-3 bg-red-700/95 rounded-full transform -rotate-12" />
              <div className="absolute bottom-[-1px] right-[10px] w-5 h-4 bg-red-700/95 rounded-full" />
              <div className="absolute left-[-2px] bottom-[15px] w-3 h-5 bg-red-700/95 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 6. LAYER 5: CLICK OVERLAY INTERCEPTOR (Ensures flawless clicking from any device) */}
        {!isOpen && (
          <div
            className="absolute inset-0 z-[60] rounded-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          />
        )}

      </motion.div>

      {/* Sweet instructional feedback floating indicator */}
      {!isOpen && (
        <motion.div
          id="click-to-open-prompt"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center gap-1 text-center"
        >
          <div className="flex items-center gap-1 text-rose-600/90 font-mono text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-rose-500/10 stroke-rose-600 animate-spin" style={{ animationDuration: "10s" }} />
            <span>Click Seal to Open</span>
          </div>
          <span className="text-[10px] text-stone-500 italic font-sans max-w-xs block px-2">
            A handmade digital surprise for Michaela
          </span>
        </motion.div>
      )}

    </div>
  );
}
