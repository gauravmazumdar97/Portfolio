import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const [value, setValue] = useState(active ? target : 0);
  useEffect(() => {
    if (!active) return;
    setValue(0);
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);
  return value;
}

type StatProps = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
  /** `bento` cells look best centered */
  align?: 'start' | 'center';
};

const StatBlock: React.FC<StatProps> = ({
  prefix = '',
  value,
  suffix = '',
  label,
  active,
  align = 'start',
}) => {
  const reduce = useReducedMotion();
  const n = useCountUp(value, active && !reduce, 1200);
  const display = reduce ? (active ? value : 0) : n;

  return (
    <div
      className={cn(
        'relative z-[1] flex flex-col gap-1.5',
        align === 'center' && 'items-center text-center',
        align === 'start' && 'text-center sm:text-left sm:items-start',
      )}
    >
      <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-white md:text-3xl">
        {prefix ? <span className="text-sky-400/90">{prefix}</span> : null}
        {display}
        {suffix ? <span className="text-zinc-500">{suffix}</span> : null}
      </p>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">{label}</p>
    </div>
  );
};

type StatsStripProps = {
  yearsExperience: number;
  companies: number;
  skillAreas: number;
  /** `strip` | `panel` | `bento` (glass tiles, for profile overview) */
  layout?: 'strip' | 'panel' | 'bento';
  className?: string;
};

const bentoWrap =
  'group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.07] to-zinc-950/90 p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.04] transition-[border-color,box-shadow,background-image] duration-300 hover:border-sky-500/35 hover:from-sky-950/25 hover:via-zinc-900/90 hover:to-zinc-950 hover:shadow-[0_24px_60px_-24px_rgba(14,165,233,0.18)] md:p-6';

/** Scroll-triggered stat counters — inspired by showcase portfolios (e.g. [chkstepan.com](https://chkstepan.com/)) */
export const StatsStrip: React.FC<StatsStripProps> = ({
  yearsExperience,
  companies,
  skillAreas,
  layout = 'strip',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px', amount: 0.3 });

  const reduce = useReducedMotion();

  const bentoTile = {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 32,
      filter: reduce ? 'blur(0px)' : 'blur(10px)',
      scale: reduce ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.65, ease: EASE },
    },
  };

  if (layout === 'bento') {
    return (
      <motion.div
        ref={ref}
        className={cn('grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4', className)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.08 },
          },
        }}
      >
        <motion.div variants={bentoTile} className={bentoWrap}>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-60 transition group-hover:opacity-100"
            aria-hidden
          />
          <StatBlock
            prefix="+"
            value={yearsExperience}
            label="Years experience"
            active={inView}
            align="center"
          />
        </motion.div>
        <motion.div variants={bentoTile} className={bentoWrap}>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-60 transition group-hover:opacity-100"
            aria-hidden
          />
          <StatBlock prefix="+" value={companies} label="Companies" active={inView} align="center" />
        </motion.div>
        <motion.div variants={bentoTile} className={bentoWrap}>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/8 via-transparent to-transparent opacity-60 transition group-hover:opacity-100"
            aria-hidden
          />
          <StatBlock
            value={skillAreas}
            suffix="+"
            label="Skill focus areas"
            active={inView}
            align="center"
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'grid grid-cols-1 gap-8 py-8 sm:grid-cols-3 sm:gap-6',
        layout === 'panel'
          ? 'rounded-2xl border border-white/[0.08] bg-zinc-950/55 px-6 md:px-10'
          : 'mb-10 border-y border-white/[0.06]',
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <StatBlock prefix="+" value={yearsExperience} label="Years experience" active={inView} />
      <StatBlock prefix="+" value={companies} label="Companies" active={inView} />
      <StatBlock value={skillAreas} suffix="+" label="Skill focus areas" active={inView} />
    </motion.div>
  );
};
