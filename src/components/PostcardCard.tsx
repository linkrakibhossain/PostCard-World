import React from 'react';
import { Heart } from 'lucide-react';
import { Language, PostcardTemplate } from '../types/postcard';
import { translations } from '../i18n/translations';
import { getCategoryById } from '../data/categories';
import { PostcardPreviewFrame } from './PostcardPreviewFrame';

interface PostcardCardProps {
  template: PostcardTemplate;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({
  template,
  language,
  isFavorite,
  onToggleFavorite,
  onUseTemplate,
}) => {
  const t = translations[language];
  const cat = getCategoryById(template.category);
  const previewQuote =
    language === 'bn' ? template.defaultQuote : template.defaultQuoteEn;

  return (
    <article className="group rounded-xl bg-[#16110D] border border-[#C8A25A]/20 hover:border-[#C8A25A]/45 transition-colors overflow-hidden flex flex-col">
      {/* Artwork Preview */}
      <div
        onClick={() => onUseTemplate(template)}
        className="p-3 pb-0 cursor-pointer"
      >
        <div className="transition-transform duration-300 group-hover:scale-[1.015]">
          <PostcardPreviewFrame
            template={template}
            recipient=""
            quoteText={previewQuote}
            sender=""
            textStyle={{
              fontStyle: template.style.fontStyle,
              fontSize: 18,
              bold: false,
              italic: false,
              align: 'center',
              letterSpacing: 0,
              lineHeight: 1.55,
              textColor: template.style.textColor,
              textPosition: template.style.textPosition,
            }}
            vintageEffect={template.style.vintageEffect}
            exportSize="postcard"
            compact
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="text-xs text-[#B8A890] flex items-center gap-1.5">
            {cat && (
              <span>
                {cat.emoji} {cat.name[language]}
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span className="truncate">{template.style.postmarkText}</span>
          </div>
          <h3 className="font-editorial text-base font-semibold text-[#F5ECD8] mt-1 line-clamp-1">
            {template.title[language]}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#C8A25A]/10">
          <button
            type="button"
            onClick={() => onToggleFavorite(template.id)}
            aria-label={isFavorite ? t.cards.removeFavorite : t.cards.addFavorite}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-[#C8A25A]/20 bg-[#1D1611] hover:border-[#C8A25A]/45 text-[#D6C7AE] transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-[#9B2A2F] text-[#9B2A2F]' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => onUseTemplate(template)}
            className="flex-1 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm font-semibold border border-[#C8A25A]/30 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.cards.useTemplate}
          </button>
        </div>
      </div>
    </article>
  );
};
