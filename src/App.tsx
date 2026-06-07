/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import BackgroundHearts from "./components/BackgroundHearts";
import Envelope from "./components/Envelope";
import Letter from "./components/Letter";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main 
      id="romantic-app-root"
      className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-stone-50 to-pink-50 flex flex-col justify-between items-center relative overflow-x-hidden p-6 selection:bg-rose-200 selection:text-rose-900"
    >
      {/* Dynamic ambient float of red/pink hearts */}
      <BackgroundHearts />

      {/* Decorative floral or heart crown headers (clean and understated) */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex justify-center py-4">
        <motion.div 
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-rose-100/40 shadow-[0_2px_12px_rgba(251,113,113,0.05)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-400 stroke-[2.5px] animate-pulse" />
          <span className="font-playfair text-xs font-semibold tracking-wider text-rose-800 uppercase">
            A Special Message
          </span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-400 stroke-[2.5px] animate-pulse" />
        </motion.div>
      </header>

      {/* Central interactive stage */}
      <div className="w-full flex-1 flex items-center justify-center relative z-10 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: -120, 
                scale: 0.9,
                rotate: -2,
                transition: { duration: 0.65, ease: "easeInOut" }
              }}
              className="w-full flex justify-center items-center"
            >
              <Envelope onOpen={() => setIsOpen(true)} isOpen={isOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.85, y: 120 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  damping: 24,
                  stiffness: 80,
                  delay: 0.2
                } 
              }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="w-full flex justify-center items-center"
            >
              <Letter onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
