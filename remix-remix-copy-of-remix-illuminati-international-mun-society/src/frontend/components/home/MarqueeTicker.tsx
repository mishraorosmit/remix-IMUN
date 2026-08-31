import React from 'react';

interface MarqueeTickerProps {
  variant?: 'dark' | 'crimson' | 'paper';
  text?: string[];
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  variant = 'dark',
  text,
}) => {
  const defaultItems = [
    'ILLUMINATI INTERNATIONAL MODEL UNITED NATIONS',
    'ODISHA’S PREMIER MUN ECOSYSTEM',
    '750+ ACTIVE DELEGATES',
    '1,000+ STUDENTS MENTORED GLOBALLY',
    'INTERNATIONAL EXCHANGES: MEXICO (DBBMUN) & USA',
    '7+ YEARS IN MUN CIRCUIT // 60+ CONFERENCES',
    '2023 GOVERNOR AWARDEE LEADERSHIP',
    'DIPLOMACY · RESOLUTION · ORATORY · CRISIS MANAGEMENT',
  ];

  const items = text || defaultItems;

  const bgClasses = {
    dark: 'bg-[#0B192C] text-[#E6D5B8] border-[#0B192C]',
    crimson: 'bg-[#C5A059] text-[#E6D5B8] border-[#C5A059]',
    paper: 'bg-[#F8F4E6] text-[#0B192C] border-[#0B192C]',
  }[variant];

  return (
    <div
      className={`w-full overflow-hidden border-y select-none py-3 relative z-20 ${bgClasses}`}
    >
      <div className="flex w-max animate-marquee font-editorial text-[14px] md:text-[15px] font-normal tracking-wide uppercase">
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <span key={`mq-1-${idx}`} className="flex items-center gap-4 shrink-0">
              <span className="text-[#C5A059] text-sm">★</span>
              <span className="whitespace-nowrap">{item}</span>
              <span className="opacity-30 font-light">•</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`mq-2-${idx}`} className="flex items-center gap-4 shrink-0">
              <span className="text-[#C5A059] text-sm">★</span>
              <span className="whitespace-nowrap">{item}</span>
              <span className="opacity-30 font-light">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
