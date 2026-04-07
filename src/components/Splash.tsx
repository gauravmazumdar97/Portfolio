import React from 'react';
import { motion } from 'motion/react';

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 1.85 }}
      onAnimationComplete={onComplete}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(14, 165, 233, 0.15), transparent 60%)',
        }}
      />

      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
          GM<span className="text-sky-400">.</span>
        </div>
        <motion.div
          className="absolute -inset-5 rounded-full border border-white/[0.08]"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div className="relative h-1 w-44 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

      <motion.p
        className="mt-5 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Loading
      </motion.p>
    </motion.div>
  );
};
