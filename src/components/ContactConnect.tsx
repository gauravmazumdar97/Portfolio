import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, User, Linkedin, Send, MapPin, Phone } from 'lucide-react';

/** Art in /public (replace file to update the graphic). */
const CONNECT_ILLUSTRATION = '/connect-illustration2.png';

type Props = {
  email: string;
  displayName: string;
  linkedInUrl?: string;
  phone?: string;
  location?: string;
};

export const ContactConnect: React.FC<Props> = ({
  email,
  displayName,
  linkedInUrl,
  phone,
  location,
}) => {
  const [form, setForm] = useState({ name: '', fromEmail: '', message: '' });
  const [sentHint, setSentHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'visitor'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\nReply to: ${form.fromEmail}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSentHint(true);
    window.setTimeout(() => setSentHint(false), 4000);
  };

  const year = new Date().getFullYear();

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-24 md:pt-12">
      <motion.div
        className="mb-12 flex justify-center md:mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="inline-block border border-blue-500 px-10 py-3 text-xl font-semibold tracking-wide text-blue-400 transition-[border-color,box-shadow,color,background-color] duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.35)] md:text-2xl"
          whileHover={{ scale: 1.02 }}
        >
          Let&apos;s Connect
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:mx-0 lg:max-w-xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="pointer-events-none absolute inset-6 rounded-3xl bg-blue-600/10 blur-3xl"
            aria-hidden
          />
          <motion.img
            src={CONNECT_ILLUSTRATION}
            alt={`Illustration for Let's Connect — hand holding a phone with messaging icons`}
            className="relative z-10 w-full cursor-default object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-[filter,transform] duration-300 hover:drop-shadow-[0_24px_60px_rgba(59,130,246,0.15)]"
            loading="lazy"
            decoding="async"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input-hover w-full rounded-xl border border-blue-500/20 bg-zinc-900/90 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white">
                Your Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={form.fromEmail}
                  onChange={(e) => setForm((f) => ({ ...f, fromEmail: e.target.value }))}
                  className="input-hover w-full rounded-xl border border-blue-500/20 bg-zinc-900/90 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Write your message..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="input-hover w-full resize-y rounded-xl border border-blue-500/20 bg-zinc-900/90 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
              />
            </div>

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-950/35 transition hover:bg-blue-500 hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.45)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
            >
              <Send className="h-4 w-4" />
              Send
            </motion.button>

            {sentHint && (
              <p className="text-center text-sm text-blue-400/90">
                Opening your mail app — send the message from there.
              </p>
            )}
          </form>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-center text-sm text-zinc-500">
          {displayName} © {year}
        </p>
        {(phone || location) && (
          <div className="flex max-w-md flex-col items-center gap-2 text-center text-xs text-zinc-600 sm:flex-row sm:justify-center sm:gap-6">
            {phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                {phone}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                {location}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          <a
            href={`mailto:${email}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
