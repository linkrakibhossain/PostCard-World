import React from 'react';
import { Heart, Eye, Download } from 'lucide-react';
import { GalleryItem, Language } from '../types/postcard';
import { translations } from '../i18n/translations';
import { getCategoryById } from '../data/categories';
import { VintageArtworkLayer } from './VintageArtworkLayer';

interface GalleryArtworkFrameProps {
  item: GalleryItem;
  large?: boolean;
}

export const GalleryArtworkFrame: React.FC<GalleryArtworkFrameProps> = ({
  item,
  large = false,
}) => {
  return (
    <div
      className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow-2xl"
      style={{
        boxShadow:
          '0 18px 42px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,162,90,0.28)',
      }}
    >
      <VintageArtworkLayer
        image={item.image}
        alt={item.title.en}
        palette={item.palette}
        motif={item.motif}
        vintageEffect={item.vintageEffect}
        compact={!large}
      />

      {/* Only render embedded archival frame & text when using placeholder art (real images already have embedded text) */}
      {!item.image && (
        <>
          <div
            className={`absolute ${large ? 'inset-4 sm:inset-5' : 'inset-2.5'} rounded-sm pointer-events-none`}
            style={{
              border:
                item.borderStyle === 'stamp-edge'
                  ? `1.5px dashed ${item.palette.accent}88`
                  : `1.5px solid ${item.palette.accent}77`,
            }}
          />
          {item.borderStyle === 'double-frame' && (
            <div
              className={`absolute ${large ? 'inset-6 sm:inset-7' : 'inset-3.5'} rounded-sm pointer-events-none`}
              style={{ border: `1px solid ${item.palette.accent}40` }}
            />
          )}

          <div
            className={`absolute ${
              large ? 'top-7 left-7 text-[10px]' : 'top-4 left-4 text-[8px]'
            } font-mono tracking-widest uppercase opacity-65 pointer-events-none`}
            style={{ color: item.palette.accent }}
          >
            {item.postmarkText}
          </div>

          <div
            className={`relative z-10 h-full w-full flex flex-col items-center justify-center text-center ${
              large ? 'px-10 sm:px-14' : 'px-5 sm:px-6'
            }`}
          >
            <p
              className={`font-editorial font-semibold leading-relaxed ${
                large ? 'text-xl sm:text-2xl md:text-3xl' : 'text-sm sm:text-base'
              }`}
              style={{
                color: item.palette.inkDefault,
                textShadow: '0 2px 14px rgba(0,0,0,0.75)',
              }}
            >
              {item.embeddedText}
            </p>
            {item.embeddedSubtext && (
              <span
                className={`mt-2.5 font-mono uppercase tracking-widest opacity-80 ${
                  large ? 'text-xs' : 'text-[9px]'
                }`}
                style={{ color: item.palette.accent }}
              >
                {item.embeddedSubtext}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

interface GalleryCardProps {
  item: GalleryItem;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onView: (item: GalleryItem) => void;
  onDownload: (item: GalleryItem) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  language,
  isFavorite,
  onToggleFavorite,
  onView,
  onDownload,
}) => {
  const t = translations[language];
  const cat = getCategoryById(item.category);

  return (
    <article className="group rounded-xl bg-[#16110D] border border-[#C8A25A]/20 hover:border-[#C8A25A]/45 transition-colors overflow-hidden flex flex-col">
      <div
        onClick={() => onView(item)}
        className="p-3 pb-0 cursor-pointer"
      >
        <div className="transition-transform duration-300 group-hover:scale-[1.015]">
          <GalleryArtworkFrame item={item} />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="text-xs text-[#B8A890] flex items-center gap-1.5">
            {cat && (
              <span>
                {cat.emoji} {cat.name[language]}
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>{item.postmarkText}</span>
          </div>
          <h3 className="font-editorial text-base font-semibold text-[#F5ECD8] mt-1 line-clamp-1">
            {item.title[language]}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#C8A25A]/10">
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            aria-label={isFavorite ? t.cards.removeFavorite : t.cards.addFavorite}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-[#C8A25A]/20 bg-[#1D1611] hover:border-[#C8A25A]/45 text-[#D6C7AE] transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-[#9B2A2F] text-[#9B2A2F]' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => onView(item)}
            className="min-h-[44px] px-3.5 rounded-lg border border-[#C8A25A]/25 bg-[#1D1611] hover:border-[#C8A25A]/55 text-xs font-semibold text-[#F5ECD8] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.cards.viewArtwork}</span>
          </button>

          <button
            type="button"
            onClick={() => onDownload(item)}
            className="flex-1 min-h-[44px] px-3.5 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-xs sm:text-sm font-semibold border border-[#C8A25A]/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>{t.cards.downloadArtwork}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
