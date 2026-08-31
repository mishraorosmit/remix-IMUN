import React from 'react';

interface TactileArchivalPhotoProps {
  src: string;
  alt: string;
  caption: string;
  categoryTag: string;
  archiveCode: string;
  aspectRatio?: string;
  className?: string;
  overlayBadge?: string;
}

export const TactileArchivalPhoto: React.FC<TactileArchivalPhotoProps> = ({
  src,
  alt,
  caption,
  categoryTag,
  archiveCode,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  overlayBadge,
}) => {
  return (
    <div className={`relative bg-[#E6D5B8] p-3 border-2 border-[#0B192C] shadow-sm select-none rounded-[4px] ${className}`}>
      {/* Code Header */}
      <div className="flex items-center justify-between text-[10px] font-mono-tag font-semibold pb-2 mb-2 border-b border-[#0B192C]/20 text-[#0B192C] uppercase">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#C5A059] inline-block rounded-full" />
          <span className="text-[#C5A059] font-bold">{categoryTag}</span>
        </div>
        <span className="tracking-wider opacity-80">{archiveCode}</span>
      </div>

      {/* Image Container */}
      <div className={`relative ${aspectRatio} w-full overflow-hidden border border-[#0B192C]/30 bg-[#0B192C] rounded-[2px]`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-[1.02]"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent pointer-events-none" />

        {overlayBadge && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0B192C]/90 text-[#E6D5B8] text-[9px] font-mono-tag font-bold uppercase rounded-[2px] border border-[#C5A059]/40">
            {overlayBadge}
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="pt-2 text-[12px] font-editorial text-[#0B192C]/85 italic leading-snug">
        {caption}
      </div>
    </div>
  );
};
