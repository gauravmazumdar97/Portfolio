import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Download,
  ChevronDown,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Code2,
  Menu,
  X,
} from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroOrbit } from './components/HeroOrbit';
import { HeroAnimatedTitle } from './components/HeroAnimatedTitle';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ProfileOverview } from './components/ProfileOverview';
import { Splash } from './components/Splash';
import { ResumePrint } from './components/ResumePrint';
import { ContactConnect } from './components/ContactConnect';
import resumeData from './resume.json';
import { cn } from './lib/utils';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** Hero tagline — word-stagger row (portfolio-style motion, e.g. chkstepan.com) */
const HERO_TAGLINE_WORDS = [
  'I',
  'build',
  'clear,',
  'performant',
  'full-stack',
  'experiences',
];

/** Shared easing — calm, product-style deceleration */
const EASE = [0.22, 1, 0.36, 1] as const;

const sectionHeadingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const sectionHeadingItem = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: EASE,
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const skillRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

const springNav = { type: 'spring' as const, stiffness: 380, damping: 32 };
const tapScale = { scale: 0.98 };
const hoverLift = { y: -2, transition: { duration: 0.22, ease: EASE } };

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-72px', amount: 0.35 }}
      variants={sectionHeadingContainer}
    >
      <motion.p
        variants={sectionHeadingItem}
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-zinc-400"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={sectionHeadingItem}
        className="group flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
      >
        <motion.span
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/20 transition-[box-shadow,background-color] duration-300 group-hover:bg-sky-500/15 group-hover:ring-sky-400/35"
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={springNav}
        >
          <Icon className="h-5 w-5 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
        </motion.span>
        <span className="transition-colors duration-300 group-hover:text-sky-50">{title}</span>
      </motion.h2>
      <motion.div
        variants={sectionHeadingItem}
        className="mt-5 h-px w-20 origin-left bg-gradient-to-r from-sky-500 via-violet-500/80 to-transparent"
      />
    </motion.div>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const RESUME_PDF_PATH = '/Gaurav_2025_Resume_Updated_SHARING.pdf';

  const handleDownloadResume = () => {
    const a = document.createElement('a');
    a.href = RESUME_PDF_PATH;
    a.download = 'Gaurav_2025_Resume_Updated_SHARING.pdf';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = SECTIONS.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 selection:bg-sky-500/30">
      <div className="pointer-events-none fixed inset-0 -z-[5] mesh-bg opacity-90" />
      <AnimatePresence>
        {!isLoaded && <Splash onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {isLoaded && (
        <>
          <AnimatedBackground />

          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500"
            style={{ scaleX }}
          />

          <nav className="fixed left-0 right-0 top-0 z-50 px-3 pt-4 md:flex md:justify-center md:px-6">
            <motion.div
              className="glass-nav flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:min-h-[3.25rem] md:w-full md:max-w-5xl"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            >
              <motion.button
                type="button"
                className="text-[15px] font-semibold tracking-tight text-white"
                onClick={() => scrollTo('hero')}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                whileHover={{ scale: 1.02 }}
                whileTap={tapScale}
              >
                GM<span className="text-sky-400">.</span>
              </motion.button>

              <div className="hidden items-center gap-0.5 md:flex">
                {SECTIONS.slice(1).map((section) => (
                  <motion.button
                    key={section.id}
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      'relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200',
                      activeSection === section.id
                        ? 'text-white'
                        : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white',
                    )}
                    whileHover={hoverLift}
                    whileTap={tapScale}
                  >
                    {activeSection === section.id && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-white/[0.08] shadow-[0_0_24px_rgba(255,255,255,0.04)]"
                        transition={springNav}
                      />
                    )}
                    <span className="relative z-10">{section.label}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={tapScale}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="flex"
                  >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </nav>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-zinc-950/95 backdrop-blur-xl md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {SECTIONS.map((section, i) => (
                  <motion.button
                    key={section.id}
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: EASE }}
                    whileHover={{ x: 4 }}
                    whileTap={tapScale}
                    className={cn(
                      'w-full max-w-xs rounded-xl py-4 text-lg font-semibold tracking-tight transition-colors',
                      activeSection === section.id
                        ? 'text-sky-400'
                        : 'text-zinc-300 hover:text-white',
                    )}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          >
            {SECTIONS.map((section) => (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                className="group relative flex items-center justify-end"
                whileHover={{ scale: 1.12 }}
                whileTap={tapScale}
              >
                <span
                  className={cn(
                    'pointer-events-none absolute right-7 rounded-md bg-zinc-800/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-300 opacity-0 shadow-lg ring-1 ring-white/10 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100',
                    activeSection === section.id
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-1',
                  )}
                >
                  {section.label}
                </span>
                <motion.div
                  className={cn(
                    'h-2 w-2 rounded-full ring-2 ring-offset-2 ring-offset-zinc-950',
                    activeSection === section.id
                      ? 'bg-sky-400 ring-sky-400/40'
                      : 'bg-zinc-600 ring-transparent group-hover:bg-zinc-400',
                  )}
                  animate={{
                    scale: activeSection === section.id ? 1.25 : 1,
                  }}
                  transition={springNav}
                />
              </motion.button>
            ))}
          </motion.div>

          <main>
            <section
              id="hero"
              className="relative flex min-h-screen flex-col justify-center overflow-visible px-6 pb-20 pt-28"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.07) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.07) 1px, transparent 1px)
                  `,
                  backgroundSize: '44px 44px',
                }}
                aria-hidden
              />
              <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
                <motion.div
                  className="flex flex-col text-center lg:text-left"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="mb-6 inline-flex cursor-default items-center gap-2 self-center rounded-full border border-blue-500/30 bg-blue-600/[0.12] px-4 py-1.5 ring-1 ring-blue-500/15 transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-400/50 hover:bg-blue-600/[0.18] hover:ring-blue-400/25 lg:self-start"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-35" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-300/95">
                      Open to opportunities
                    </span>
                  </motion.div>

                  <HeroAnimatedTitle
                    name={resumeData.basics.name}
                    taglineWords={HERO_TAGLINE_WORDS}
                  />

                  <motion.p
                    className="mb-6 text-base font-medium leading-relaxed text-zinc-300 md:text-lg lg:max-w-xl"
                    initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
                  >
                    {resumeData.basics.title}
                  </motion.p>

                  <motion.div
                    className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.58, ease: EASE }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => scrollTo('experience')}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
                      whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(37,99,235,0.35)' }}
                      whileTap={tapScale}
                    >
                      View portfolio
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => scrollTo('contact')}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/45 bg-black/30 px-8 py-3.5 text-[15px] font-semibold text-blue-300 backdrop-blur-sm transition hover:border-blue-400 hover:bg-blue-950/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={tapScale}
                    >
                      Contact me
                    </motion.button>
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={handleDownloadResume}
                    className="mb-2 inline-flex items-center justify-center gap-2 self-center text-sm font-medium text-zinc-500 underline decoration-blue-500/40 underline-offset-4 transition hover:text-blue-400 lg:self-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.64, duration: 0.4 }}
                  >
                    <Download className="h-4 w-4" />
                    Download resume
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex w-full justify-center lg:justify-end lg:self-start"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
                    className="w-full max-w-[min(100%,34rem)] translate-x-8 -translate-y-4 sm:translate-x-12 sm:-translate-y-5 lg:translate-x-16 lg:-translate-y-8 xl:translate-x-24 xl:-translate-y-10"
                    whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: EASE } }}
                  >
                    <HeroOrbit name={resumeData.basics.name} />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.45, ease: EASE }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400">
                    Scroll
                  </span>
                  <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 bg-white/[0.02] p-1.5 transition-[border-color,background-color,box-shadow] duration-300 group-hover:border-blue-500/35 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <motion.div
                      className="h-1.5 w-1 rounded-full bg-blue-400/80"
                      animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </section>

            <MarqueeStrip
              segments={[
                resumeData.basics.name.split(/\s+/)[0] || 'Portfolio',
                'Full-stack',
                'React',
                'Node.js',
                'TypeScript-ready',
                resumeData.basics.location.split(',')[0] || 'London',
              ]}
            />

            <ProfileOverview
              summary={resumeData.basics.summary}
              yearsExperience={(resumeData.basics as { yearsExperience: number }).yearsExperience}
              companies={resumeData.experience.length}
              skillAreas={resumeData.skills.length}
            />

            <section id="experience" className="relative overflow-hidden px-6 py-24 md:py-32">
              <div className="mx-auto max-w-5xl">
                <SectionHeading eyebrow="Work history" title="Experience" icon={Briefcase} />

                <div className="relative space-y-5 md:space-y-6">
                  <div
                    className="pointer-events-none absolute left-12 top-6 bottom-6 hidden w-px bg-gradient-to-b from-sky-500/45 via-violet-500/20 to-fuchsia-500/25 md:block"
                    aria-hidden
                  />
                  {resumeData.experience.map((exp, index) => {
                    const expLogo = 'logo' in exp ? (exp as { logo?: string }).logo : undefined;
                    const expLogoAlt = 'logoAlt' in exp ? (exp as { logoAlt?: string }).logoAlt : '';
                    return (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-48px', amount: 0.2 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.6,
                        ease: EASE,
                      }}
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.25, ease: EASE },
                      }}
                      className={cn(
                        'surface-card group relative overflow-hidden rounded-2xl border border-white/[0.07]',
                        'bg-gradient-to-br from-zinc-900/55 via-zinc-900/35 to-zinc-950/50',
                        'p-6 transition-[border-color,box-shadow] duration-300 hover:border-sky-500/35 hover:shadow-[0_24px_56px_-28px_rgba(0,0,0,0.55)] md:p-0',
                      )}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-sky-500/15 via-blue-500/[0.07] to-violet-500/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                      <div className="relative z-[1] flex flex-col md:flex-row md:gap-0">
                        <div className="relative hidden w-[min(100%,13.5rem)] shrink-0 flex-col gap-5 border-white/[0.06] md:flex md:border-r md:bg-zinc-950/25 md:p-8 md:pl-10">
                          <div
                            className="relative z-[1] h-4 w-4 shrink-0 rounded-full border-2 border-sky-400/80 bg-zinc-950 shadow-[0_0_14px_rgba(56,189,248,0.45)]"
                            aria-hidden
                          >
                            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-300 to-violet-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-medium leading-snug text-sky-300/95">
                              {exp.dates}
                            </p>
                            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
                              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" />
                              {exp.location}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1 md:p-8 md:pl-10">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                            {expLogo && (
                              <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-inner ring-1 ring-black/10 sm:mx-0 md:h-[4.5rem] md:w-[4.5rem]">
                                <img
                                  src={expLogo}
                                  alt={expLogoAlt || exp.company}
                                  className="max-h-full max-w-full object-contain"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-center text-xl font-semibold tracking-tight text-white sm:text-left md:text-2xl">
                              {exp.role}
                            </h3>
                            <p className="text-center text-base text-zinc-400 sm:text-left">{exp.company}</p>
                            <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-500 md:hidden">
                              <span className="inline-flex items-start gap-2">
                                <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                                {exp.dates}
                              </span>
                              <span className="inline-flex items-start gap-2">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                          {exp.bullets.length > 0 && (
                            <ul className="mt-6 space-y-2.5 text-[15px] leading-relaxed text-zinc-400">
                              {exp.bullets.map((bullet, i) => (
                                <li key={i} className="flex gap-3">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/85" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              id="skills"
              className="relative overflow-hidden border-y border-white/[0.04] bg-zinc-900/25 py-24 md:py-32"
            >
              <div className="mx-auto max-w-6xl px-6">
                <SectionHeading eyebrow="Toolkit" title="Skills & technology" icon={Code2} />

                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5"
                  variants={skillCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-48px', amount: 0.12 }}
                >
                  {resumeData.skills.map((skillGroup, index) => {
                    const accents = [
                      'from-sky-400 via-sky-500/90 to-cyan-500/70',
                      'from-violet-400 via-violet-500/85 to-fuchsia-500/65',
                      'from-fuchsia-400 via-pink-500/80 to-rose-500/65',
                      'from-emerald-400 via-teal-500/80 to-cyan-600/65',
                      'from-amber-400 via-orange-500/75 to-rose-500/60',
                    ] as const;
                    const bar = accents[index % accents.length];
                    return (
                      <motion.article
                        key={index}
                        variants={skillRowVariants}
                        className={cn(
                          'group relative flex min-h-[8.5rem] flex-col overflow-hidden rounded-2xl border border-white/[0.08]',
                          'bg-gradient-to-br from-zinc-900/70 via-zinc-950/80 to-zinc-950',
                          'p-5 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_18px_40px_-28px_rgba(0,0,0,0.65)]',
                          'transition-[border-color,box-shadow] duration-300 hover:border-sky-500/30 hover:shadow-[0_24px_56px_-28px_rgba(14,165,233,0.15)]',
                          'md:p-6',
                        )}
                        whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-sky-600/20 via-blue-600/[0.12] to-violet-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden
                        />
                        <div
                          className={cn(
                            'relative z-[1] mb-4 h-1 w-14 rounded-full bg-gradient-to-r shadow-[0_0_20px_rgba(56,189,248,0.25)]',
                            bar,
                          )}
                          aria-hidden
                        />
                        <h3 className="relative z-[1] mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                          {skillGroup.category}
                        </h3>
                        <div className="relative z-[1] mt-auto flex min-h-0 flex-wrap content-start gap-2">
                          {skillGroup.items.map((skill, i) => (
                            <motion.span
                              key={i}
                              className="rounded-lg border border-white/[0.08] bg-zinc-950/55 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-zinc-300 ring-1 ring-white/[0.04] backdrop-blur-[2px] transition-colors sm:px-3 sm:text-xs"
                              whileHover={{
                                scale: 1.04,
                                borderColor: 'rgba(56, 189, 248, 0.38)',
                                color: 'rgb(255 255 255)',
                                transition: { duration: 0.18, ease: EASE },
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </div>
            </section>

            <section id="education" className="relative overflow-hidden px-6 py-24 md:py-32">
              <div className="mx-auto max-w-5xl">
                <SectionHeading eyebrow="Academics" title="Education" icon={GraduationCap} />

                <ul className="flex flex-col gap-4">
                  {resumeData.education.map((edu, index) => {
                    const logo = 'logo' in edu ? (edu as { logo?: string }).logo : undefined;
                    const logoAlt = 'logoAlt' in edu ? (edu as { logoAlt?: string }).logoAlt : '';
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.06, duration: 0.55, ease: EASE }}
                        whileHover={{
                          y: -2,
                          borderColor: 'rgba(59, 130, 246, 0.28)',
                          transition: { duration: 0.22, ease: EASE },
                        }}
                        className="surface-card group/edu relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-zinc-900/45 to-zinc-950/40 p-5 transition-[border-color,box-shadow] duration-300 hover:border-blue-500/25 hover:shadow-[0_24px_56px_-28px_rgba(59,130,246,0.15)] sm:flex-row sm:items-center sm:gap-6 sm:p-6 md:gap-8"
                      >
                        <div
                          className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-blue-500/[0.14] via-sky-500/[0.08] to-violet-500/[0.12] opacity-0 transition-opacity duration-300 group-hover/edu:opacity-100"
                          aria-hidden
                        />
                        <div className="group/logo relative z-[1] mx-auto flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-inner ring-1 ring-black/8 transition-[box-shadow,transform] duration-300 hover:ring-blue-500/25 sm:mx-0 sm:h-[5.25rem] sm:w-[5.25rem]">
                          {logo ? (
                            <img
                              src={logo}
                              alt={logoAlt || edu.institution}
                              className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover/logo:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <GraduationCap className="h-11 w-11 text-blue-600 sm:h-12 sm:w-12" />
                          )}
                        </div>

                        <div className="relative z-[1] min-w-0 flex-1 text-center sm:text-left">
                          <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                            {edu.institution}
                          </h3>
                          <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{edu.degree}</p>
                          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500 sm:hidden">
                            <Calendar className="h-3.5 w-3.5 shrink-0 opacity-70" />
                            {edu.dates}
                          </p>
                        </div>

                        <div className="relative z-[1] hidden shrink-0 self-stretch border-white/[0.06] sm:flex sm:justify-end sm:border-l sm:pl-6 md:pl-8">
                          <span className="inline-flex max-w-full items-center gap-2 self-center rounded-full border border-white/[0.08] bg-zinc-950/60 px-3.5 py-2 text-right text-xs font-medium leading-snug text-zinc-400 md:max-w-none md:text-sm">
                            <Calendar className="h-3.5 w-3.5 shrink-0 opacity-70 md:h-4 md:w-4" />
                            {edu.dates}
                          </span>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </section>

            <section
              id="contact"
              className="relative overflow-hidden border-t border-blue-500/15 bg-black"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(37, 99, 235, 0.12), transparent 60%)',
                }}
              />
              <div className="relative">
                <ContactConnect
                  email={resumeData.basics.email}
                  displayName={resumeData.basics.name}
                  linkedInUrl={resumeData.basics.links.find((l) => l.label === 'LinkedIn')?.url}
                  phone={resumeData.basics.phone}
                  location={resumeData.basics.location}
                />
              </div>
            </section>
          </main>
          <ResumePrint />
        </>
      )}
    </div>
  );
}
