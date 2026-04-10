import React from 'react';

type MarqueeStripProps = {
  segments: string[];
};

/** Infinite horizontal strip — similar energy to portfolio sites like [chkstepan.com](https://chkstepan.com/) */
export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ segments }) => {
  const chunk = segments.filter(Boolean).join(' ✦ ');
  const cell = `${chunk} ✦ `;
  const repeated = Array(10).fill(cell).join('');

  return (
    <div
      className="relative z-[1] overflow-hidden border-y border-white/[0.06] bg-zinc-950/85 py-3.5 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-white/10 hover:bg-zinc-900/90"
      aria-hidden
    >
      <div className="marquee-track flex w-max">
        <p className="shrink-0 whitespace-nowrap px-8 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-500 transition-colors duration-300 hover:text-zinc-400 sm:text-[11px]">
          {repeated}
        </p>
        <p className="shrink-0 whitespace-nowrap px-8 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-500 transition-colors duration-300 hover:text-zinc-400 sm:text-[11px]">
          {repeated}
        </p>
      </div>
    </div>
  );
};
