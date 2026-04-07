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

/** Shared easing — calm, product-style deceleration */
const EASE = [0.22, 1, 0.36, 1] as const;

const sectionHeadingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const sectionHeadingItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const skillChipVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
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
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={sectionHeadingItem}
        className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
      >
        <motion.span
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/20"
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={springNav}
        >
          <Icon className="h-5 w-5 text-sky-400" />
        </motion.span>
        {title}
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
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-sky-500/30">
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
                      'relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors',
                      activeSection === section.id ? 'text-white' : 'text-zinc-400 hover:text-white',
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
              className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-28"
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
                    className="mb-6 inline-flex items-center gap-2 self-center rounded-full border border-blue-500/30 bg-blue-600/[0.12] px-4 py-1.5 ring-1 ring-blue-500/15 lg:self-start"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-35" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-300/95">
                      Open to opportunities
                    </span>
                  </motion.div>

                  <motion.h1
                    className="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
                  >
                    <span className="text-zinc-500">Hey, I&apos;m </span>
                    <span className="text-blue-400">
                      {resumeData.basics.name.split(/\s+/)[0] || resumeData.basics.name}
                    </span>
                    {resumeData.basics.name.includes(' ') && (
                      <span className="text-white">
                        {' '}
                        {resumeData.basics.name.split(/\s+/).slice(1).join(' ')}
                      </span>
                    )}
                  </motion.h1>

                  <motion.p
                    className="mb-6 text-base font-medium leading-relaxed text-zinc-300 md:text-lg lg:max-w-xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
                  >
                    {resumeData.basics.title}
                  </motion.p>

                  <motion.p
                    className="mb-10 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-base lg:mx-0 lg:mr-auto"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
                  >
                    {resumeData.basics.summary}
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.36, ease: EASE }}
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
                    className="mt-4 inline-flex items-center justify-center gap-2 self-center text-sm font-medium text-zinc-500 underline decoration-blue-500/40 underline-offset-4 transition hover:text-blue-400 lg:self-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <Download className="h-4 w-4" />
                    Download resume
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex w-full justify-center lg:justify-end"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
                    className="w-full max-w-[min(100%,24rem)]"
                  >
                    <HeroOrbit name={resumeData.basics.name} />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.45, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                    Scroll
                  </span>
                  <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 bg-white/[0.02] p-1.5">
                    <motion.div
                      className="h-1.5 w-1 rounded-full bg-blue-400/80"
                      animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </section>

            <section id="experience" className="px-6 py-24 md:py-32">
              <div className="mx-auto max-w-5xl">
                <SectionHeading eyebrow="Work history" title="Experience" icon={Briefcase} />

                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-48px', amount: 0.2 }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.5,
                        ease: EASE,
                      }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.25, ease: EASE },
                      }}
                      className="surface-card group relative p-6 transition duration-300 hover:border-sky-500/20 hover:bg-zinc-900/55 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)] md:p-8"
                    >
                      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white md:text-2xl">
                            {exp.role}
                          </h3>
                          <p className="mt-1 text-base text-zinc-400">{exp.company}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 text-sm text-zinc-500 md:items-end">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0 opacity-70" />
                            {exp.dates}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0 opacity-70" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      {exp.bullets.length > 0 && (
                        <ul className="space-y-2.5 border-t border-white/[0.06] pt-5 text-[15px] leading-relaxed text-zinc-400">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/80" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            <section id="skills" className="border-y border-white/[0.04] bg-zinc-900/20 py-24 md:py-32">
              <div className="mx-auto max-w-5xl px-6">
                <SectionHeading eyebrow="Toolkit" title="Skills & technology" icon={Code2} />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {resumeData.skills.map((skillGroup, index) => (
                    <motion.div
                      key={index}
                      className="surface-card p-6 transition hover:border-violet-500/15 md:p-8"
                      variants={skillCardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-48px', amount: 0.15 }}
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.22, ease: EASE },
                      }}
                    >
                      <h3 className="mb-6 text-lg font-semibold text-sky-300/90">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <motion.span
                            key={i}
                            variants={skillChipVariants}
                            className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/[0.03]"
                            whileHover={{
                              scale: 1.04,
                              borderColor: 'rgba(56, 189, 248, 0.35)',
                              color: 'rgb(255 255 255)',
                              transition: { duration: 0.18, ease: EASE },
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="education" className="px-6 py-24 md:py-32">
              <div className="mx-auto max-w-5xl">
                <SectionHeading eyebrow="Academics" title="Education" icon={GraduationCap} />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {resumeData.education.map((edu, index) => {
                    const logo = 'logo' in edu ? (edu as { logo?: string }).logo : undefined;
                    const logoAlt = 'logoAlt' in edu ? (edu as { logoAlt?: string }).logoAlt : '';
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
                        whileHover={{
                          y: -4,
                          borderColor: 'rgba(59, 130, 246, 0.25)',
                          transition: { duration: 0.25, ease: EASE },
                        }}
                        className="surface-card overflow-hidden p-6 transition hover:border-blue-500/25 md:p-8"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                          <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-inner ring-1 ring-black/5 sm:mx-0 sm:h-28 sm:w-28">
                            {logo ? (
                              <img
                                src={logo}
                                alt={logoAlt || edu.institution}
                                className="max-h-full max-w-full rounded-lg object-contain"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <GraduationCap className="h-12 w-12 text-blue-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 text-center sm:text-left">
                            <h3 className="mb-2 text-lg font-semibold leading-snug text-white">
                              {edu.institution}
                            </h3>
                            <p className="mb-4 text-[15px] leading-relaxed text-zinc-400">{edu.degree}</p>
                            <p className="flex items-center justify-center gap-2 text-sm text-zinc-500 sm:justify-start">
                              <Calendar className="h-4 w-4 shrink-0 opacity-70" />
                              {edu.dates}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
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
