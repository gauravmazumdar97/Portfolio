import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import { StatsStrip } from './StatsStrip';

const EASE = [0.22, 1, 0.36, 1] as const;
const springNav = { type: 'spring' as const, stiffness: 380, damping: 32 };

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const headingItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
};

const cardCol = (reduce: boolean) => ({
  hidden: {
    opacity: reduce ? 1 : 0,
    y: reduce ? 0 : 36,
    filter: reduce ? 'blur(0px)' : 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: EASE },
  },
});

type ProfileOverviewProps = {
  summary: string;
  yearsExperience: number;
  companies: number;
  skillAreas: number;
};

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  summary,
  yearsExperience,
  companies,
  skillAreas,
}) => {
  const reduce = useReducedMotion();

  return (
    <section
      id="profile-summary"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.07] px-6 py-20 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[min(100vw,520px)] w-[min(100vw,520px)] -translate-y-1/2 rounded-full bg-sky-500/[0.09] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-500/[0.08] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px', amount: 0.3 }}
          variants={headingContainer}
        >
          <motion.p
            variants={headingItem}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500"
          >
            Profile & snapshot
          </motion.p>
          <motion.h2
            variants={headingItem}
            className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-tight"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/25 to-violet-500/15 ring-1 ring-sky-500/25"
              whileHover={{ scale: 1.06, rotate: -3 }}
              transition={springNav}
            >
              <Sparkles className="h-5 w-5 text-sky-300" />
            </motion.span>
            About me
          </motion.h2>
          <motion.div
            variants={headingItem}
            className="relative mt-6 h-px max-w-xs origin-left overflow-hidden bg-white/[0.06]"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500/80"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
              style={{ transformOrigin: 'left center' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={
            reduce
              ? false
              : { opacity: 0, y: 44, scale: 0.98, filter: 'blur(14px)' }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          whileHover={
            reduce
              ? undefined
              : { y: -4, transition: { duration: 0.35, ease: EASE } }
          }
          viewport={{ once: true, margin: '-64px', amount: 0.15 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="group/profile relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-zinc-950/50 p-6 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.05] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-sky-500/35 hover:bg-zinc-900/65 hover:shadow-[0_40px_100px_-48px_rgba(56,189,248,0.16)] md:p-10 lg:p-12"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.07)_0%,transparent_40%,rgba(139,92,246,0.06)_100%)] transition-opacity duration-300 group-hover/profile:opacity-90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-violet-500/[0.1] opacity-0 transition-opacity duration-300 group-hover/profile:opacity-100"
            aria-hidden
          />

          {/* chkstepan-style corner marks */}
          <span className="pointer-events-none absolute left-4 top-4 text-zinc-600/50" aria-hidden>
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </span>
          <span className="pointer-events-none absolute right-4 top-4 text-zinc-600/50" aria-hidden>
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </span>
          <span className="pointer-events-none absolute bottom-4 left-4 text-zinc-600/50" aria-hidden>
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </span>
          <span className="pointer-events-none absolute bottom-4 right-4 text-zinc-600/50" aria-hidden>
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </span>

          <div
            className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl"
            aria-hidden
          />

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.2,
                  delayChildren: reduce ? 0 : 0.06,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px', amount: 0.25 }}
            className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:gap-x-14"
          >
            <motion.div variants={cardCol(reduce)} className="lg:col-span-7">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[13px] font-medium tabular-nums text-zinc-600">01</span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/90">
                  Professional summary
                </p>
              </div>
              <p className="text-[15px] leading-[1.8] text-zinc-300 md:text-[17px] md:leading-[1.75]">
                {summary}
              </p>
              <motion.div
                className="mt-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
              >
                <span className="h-px w-8 bg-gradient-to-r from-sky-500/50 to-transparent" />
                Clarity &amp; intent
                <ArrowUpRight className="h-3.5 w-3.5 text-sky-500/70" aria-hidden />
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardCol(reduce)}
              className="relative border-t border-white/[0.08] pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-12"
            >
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-mono text-[13px] font-medium tabular-nums text-zinc-600">02</span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/90">
                  By the numbers
                </p>
              </div>
              <StatsStrip
                layout="bento"
                className="mb-0"
                yearsExperience={yearsExperience}
                companies={companies}
                skillAreas={skillAreas}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
