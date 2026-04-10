import React from 'react';
import { motion } from 'motion/react';

const ORBIT_DURATION = 28;

const DEVICON = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}`;

type OrbitIcon = { label: string; src: string; invert?: boolean };

/** Outer ring — larger dashed path (like reference ~5 evenly spaced) */
const OUTER_ICONS: OrbitIcon[] = [
  { label: 'React', src: DEVICON('react/react-original.svg') },
  { label: 'Angular', src: DEVICON('angularjs/angularjs-original.svg') },
  { label: 'MongoDB', src: DEVICON('mongodb/mongodb-original.svg') },
  { label: 'Java', src: DEVICON('java/java-original.svg') },
  { label: 'Express', src: DEVICON('express/express-original.svg'), invert: true },
];

/** Inner ring — smaller path, staggered so icons sit between outer posts */
const INNER_ICONS: OrbitIcon[] = [
  { label: 'Node.js', src: DEVICON('nodejs/nodejs-original.svg') },
  { label: 'JavaScript', src: DEVICON('javascript/javascript-original.svg') },
  { label: 'MySQL', src: DEVICON('mysql/mysql-original.svg') },
];

const orbitTransition = {
  duration: ORBIT_DURATION,
  repeat: Infinity,
  ease: 'linear' as const,
};

function IconNode({ icon }: { icon: OrbitIcon }) {
  return (
    <motion.div
      className="flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-blue-500/40 bg-black/90 shadow-[0_0_20px_rgba(37,99,235,0.22)] backdrop-blur-sm sm:h-[3.35rem] sm:w-[3.35rem]"
      animate={{ rotate: -360 }}
      transition={orbitTransition}
    >
      <img
        src={icon.src}
        alt=""
        className={
          icon.invert
            ? 'h-[1.65rem] w-[1.65rem] object-contain invert sm:h-[1.85rem] sm:w-[1.85rem]'
            : 'h-[1.65rem] w-[1.65rem] object-contain sm:h-[1.85rem] sm:w-[1.85rem]'
        }
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

export const HeroOrbit: React.FC<{ name: string }> = ({ name }) => {
  const outerCount = OUTER_ICONS.length;
  const innerCount = INNER_ICONS.length;
  const innerPhase = 180 / innerCount;

  const allLabels = [...OUTER_ICONS, ...INNER_ICONS].map((i) => i.label).join(', ');

  return (
    <div className="relative mx-auto flex w-full max-w-[30rem] justify-center sm:max-w-[36rem]">
      <div
        className="relative aspect-square w-full [--r-inner:min(8.35rem,38vw)] [--r-outer:min(12.5rem,54vw)] sm:[--r-inner:9.65rem] sm:[--r-outer:14.25rem] md:[--r-inner:10.15rem] md:[--r-outer:15.25rem]"
        role="img"
        aria-label={`${name}; technology icons on two orbits: ${allLabels}.`}
      >
        {/* Center backlight — radial wash behind portrait & orbits */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[210%] w-[210%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_88%_88%_at_50%_50%,rgba(56,189,248,0.34)_0%,rgba(37,99,235,0.18)_32%,rgba(37,99,235,0.06)_52%,transparent_78%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[175%] w-[175%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.11)_0%,rgba(125,211,252,0.07)_22%,transparent_62%)] blur-3xl"
          aria-hidden
        />
        {/* Outer dashed orbit */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-500/35"
          style={{
            width: 'calc(2 * var(--r-outer))',
            height: 'calc(2 * var(--r-outer))',
          }}
          aria-hidden
        />
        {/* Inner dashed orbit */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-500/45"
          style={{
            width: 'calc(2 * var(--r-inner))',
            height: 'calc(2 * var(--r-inner))',
          }}
          aria-hidden
        />

        {/* Single rotation drives both rings; each icon locked to its radius */}
        <motion.div className="absolute inset-0 z-[1]" animate={{ rotate: 360 }} transition={orbitTransition}>
          {OUTER_ICONS.map((icon, i) => {
            const angle = (360 / outerCount) * i - 90;
            return (
              <div
                key={`outer-${icon.label}`}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(-1 * var(--r-outer))) rotate(${-angle}deg)`,
                }}
              >
                <IconNode icon={icon} />
              </div>
            );
          })}
          {INNER_ICONS.map((icon, i) => {
            const angle = (360 / innerCount) * i - 90 + innerPhase;
            return (
              <div
                key={`inner-${icon.label}`}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(-1 * var(--r-inner))) rotate(${-angle}deg)`,
                }}
              >
                <IconNode icon={icon} />
              </div>
            );
          })}
        </motion.div>

        {/* Portrait above orbits */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
          <div className="relative h-[min(48%,14.25rem)] w-[min(48%,14.25rem)] sm:h-[min(50%,15.75rem)] sm:w-[min(50%,15.75rem)]">
            <div className="absolute inset-[-48%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.4)_0%,rgba(37,99,235,0.18)_48%,transparent_78%)] blur-3xl" />
            <img
              src="/profile_2.jpeg"
              alt={name}
              className="relative z-10 h-full w-full rounded-full border-[3px] border-blue-500/50 object-cover object-[center_15%] shadow-[0_0_48px_rgba(37,99,235,0.38)] sm:border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
