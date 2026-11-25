import React, { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { Language, QuoteItem } from '../types/postcard';
import { translations } from '../i18n/translations';
import { getCategoryById } from '../data/categories';

interface QuoteCardProps {
  quote: QuoteItem;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onUseQuote: (quote: QuoteItem) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  language,
  isFavorite,
  onToggleFavorite,
  onUseQuote,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const cat = getCategoryById(quote.category);

  const primaryText = language === 'bn' ? quote.text : quote.textEn;
  const secondaryText = language === 'bn' ? quote.textEn : quote.text;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(primaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API fallback ignored cleanly
    }
  };

  return (
    <article className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 hover:border-[#C8A25A]/45 transition-colors p-5 sm:p-6 flex flex-col justify-between gap-5">
      <div>
        {cat && (
          <div className="text-xs text-[#C8A25A] mb-3 tracking-wide">
            {cat.emoji} {cat.name[language]}
          </div>
        )}

        <blockquote className="font-editorial text-lg sm:text-xl text-[#F5ECD8] leading-relaxed">
          “{primaryText}”
        </blockquote>

        <p className="mt-2.5 text-xs text-[#9E8F79] leading-relaxed italic">
          {secondaryText}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#C8A25A]/12">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(quote.id)}
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
            onClick={handleCopy}
            className="min-h-[44px] px-3 rounded-lg border border-[#C8A25A]/20 bg-[#1D1611] hover:border-[#C8A25A]/45 text-xs font-medium text-[#D6C7AE] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.cards.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.cards.copyQuote}</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onUseQuote(quote)}
          className="min-h-[44px] px-4 py-2 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm font-semibold border border-[#C8A25A]/30 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t.cards.useQuote}
        </button>
      </div>
    </article>
  );
};
