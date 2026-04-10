import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

type Word = { text: string; className: string };

const lineContainer = {
  hidden: {},
  visible: (reduce: boolean) => ({
    transition: {
      staggerChildren: reduce ? 0 : 0.065,
      delayChildren: reduce ? 0 : 0.08,
    },
  }),
};

const wordItem = {
  hidden: (reduce: boolean) => ({
    opacity: reduce ? 1 : 0,
    y: reduce ? 0 : 28,
    filter: reduce ? 'blur(0px)' : 'blur(14px)',
    rotateX: reduce ? 0 : -12,
  }),
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

function buildNameWords(name: string): Word[] {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? name;
  const rest = parts.slice(1);
  return [
    { text: 'Hey,', className: 'text-zinc-500' },
    { text: "I'm", className: 'text-zinc-500' },
    { text: first, className: 'text-blue-400' },
    ...rest.map((t) => ({ text: t, className: 'text-white' })),
  ];
}

type HeroAnimatedTitleProps = {
  name: string;
  /** Second headline row — word-by-word reveal */
  taglineWords: string[];
};

export const HeroAnimatedTitle: React.FC<HeroAnimatedTitleProps> = ({ name, taglineWords }) => {
  const reduce = useReducedMotion();
  const nameWords = buildNameWords(name);

  const taglineAsWords: Word[] = taglineWords.map((text, i) => ({
    text,
    className:
      i === 0
        ? 'text-white'
        : i === taglineWords.length - 1
          ? 'text-sky-400/95'
          : 'text-zinc-400',
  }));

  return (
    <div className="mb-4 space-y-4 [perspective:1200px]">
      <motion.h1
        className="text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
        custom={reduce}
        variants={lineContainer}
        initial="hidden"
        animate="visible"
      >
        <span className="flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 lg:justify-start">
          {nameWords.map((w, i) => (
            <motion.span
              key={`n-${w.text}-${i}`}
              custom={reduce}
              variants={wordItem}
              className={`inline-block origin-bottom ${w.className}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {w.text}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <motion.div
        custom={reduce}
        variants={lineContainer}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: reduce ? 0 : 0.4 }}
      >
        <p className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-2xl font-semibold leading-snug tracking-tight md:text-3xl lg:justify-start lg:text-4xl">
          {taglineAsWords.map((w, i) => (
            <motion.span
              key={`t-${w.text}-${i}`}
              custom={reduce}
              variants={wordItem}
              className={`inline-block origin-bottom ${w.className}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {w.text}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};
