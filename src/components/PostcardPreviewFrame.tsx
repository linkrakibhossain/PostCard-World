import React from 'react';
import {
  BorderStyle,
  ExportSizeId,
  PostcardTemplate,
  TextCustomization,
  VintageEffectId,
} from '../types/postcard';
import { exportSizeSpecs, fontStyleMap } from '../data/styleOptions';
import { VintageArtworkLayer } from './VintageArtworkLayer';

interface PostcardPreviewFrameProps {
  template: PostcardTemplate;
  recipient: string;
  quoteText: string;
  sender: string;
  dateText?: string;
  textStyle: TextCustomization;
  vintageEffect: VintageEffectId;
  exportSize?: ExportSizeId;
  compact?: boolean;
  className?: string;
}

const BorderOverlay: React.FC<{
  borderStyle: BorderStyle;
  accent: string;
  postmarkText: string;
  compact?: boolean;
}> = ({ borderStyle, accent, postmarkText, compact }) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {borderStyle === 'airmail' && (
        <>
          <div
            className="absolute top-0 inset-x-0 h-1.5 opacity-80"
            style={{
              background:
                'repeating-linear-gradient(90deg, #9B2A2F 0 18px, transparent 18px 24px, #C8A25A 24px 42px, transparent 42px 48px)',
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-1.5 opacity-80"
            style={{
              background:
                'repeating-linear-gradient(90deg, #9B2A2F 0 18px, transparent 18px 24px, #C8A25A 24px 42px, transparent 42px 48px)',
            }}
          />
        </>
      )}

      <div
        className={`absolute ${compact ? 'inset-2.5' : 'inset-4 sm:inset-5'} rounded-sm`}
        style={{
          border:
            borderStyle === 'stamp-edge'
              ? `1.5px dashed ${accent}88`
              : `1.5px solid ${accent}77`,
        }}
      />

      {(borderStyle === 'classic-gold' || borderStyle === 'double-frame') && (
        <div
          className={`absolute ${compact ? 'inset-3.5' : 'inset-5 sm:inset-7'} rounded-sm`}
          style={{
            border: `1px solid ${accent}40`,
          }}
        />
      )}

      {/* Top-left archival postmark label */}
      <div
        className={`absolute ${
          compact ? 'top-4 left-4 text-[8px]' : 'top-7 left-7 sm:top-8 sm:left-8 text-[10px]'
        } font-mono tracking-widest uppercase opacity-65`}
        style={{ color: accent }}
      >
        {postmarkText}
      </div>

      {/* Top-right decorative stamp & circular seal */}
      <div
        className={`absolute ${
          compact ? 'top-3.5 right-3.5 w-7 h-8' : 'top-6 right-6 sm:top-8 sm:right-8 w-11 h-13 sm:w-12 sm:h-14'
        } flex items-center justify-center rounded-[2px]`}
        style={{
          border: `1px solid ${accent}80`,
          backgroundColor: 'rgba(14, 11, 9, 0.35)',
        }}
      >
        <div
          className="w-[82%] h-[82%] flex items-center justify-center"
          style={{ border: `1px solid ${accent}40`, color: accent }}
        >
          <span className={compact ? 'text-[10px]' : 'text-sm'}>❦</span>
        </div>
        {!compact && (
          <div
            className="absolute -left-5 -bottom-2 w-10 h-10 rounded-full opacity-40"
            style={{ border: `1px solid ${accent}` }}
          />
        )}
      </div>
    </div>
  );
};

export const PostcardPreviewFrame: React.FC<PostcardPreviewFrameProps> = ({
  template,
  recipient,
  quoteText,
  sender,
  dateText,
  textStyle,
  vintageEffect,
  exportSize = 'postcard',
  compact = false,
  className = '',
}) => {
  const sizeSpec = exportSizeSpecs[exportSize];
  const fontFamily = fontStyleMap[textStyle.fontStyle].cssFamily;

  const positionClass =
    textStyle.textPosition === 'top'
      ? 'justify-start pt-10 sm:pt-14 pb-6'
      : textStyle.textPosition === 'bottom'
        ? 'justify-end pt-6 pb-8 sm:pb-12'
        : 'justify-center py-8 sm:py-12';

  const alignClass =
    textStyle.align === 'left'
      ? 'text-left items-start'
      : textStyle.align === 'right'
        ? 'text-right items-end'
        : 'text-center items-center';

  // Responsive font size scaling for compact card previews vs live studio preview
  const computedFontSize = compact
    ? 'clamp(0.82rem, 1.3vw, 0.96rem)'
    : `clamp(0.95rem, ${(textStyle.fontSize / 26).toFixed(2)}rem, ${(
        textStyle.fontSize * 0.068
      ).toFixed(2)}rem)`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg shadow-2xl ${sizeSpec.aspectClass} ${className}`}
      style={{
        boxShadow:
          '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(200, 162, 90, 0.25)',
      }}
    >
      <VintageArtworkLayer
        image={template.image}
        alt={template.title.en}
        palette={template.style.palette}
        motif={template.style.motif}
        vintageEffect={vintageEffect}
        compact={compact}
      />

      <BorderOverlay
        borderStyle={template.style.borderStyle}
        accent={template.style.palette.accent}
        postmarkText={template.style.postmarkText}
        compact={compact}
      />

      {/* Typography Content */}
      <div
        className={`relative z-10 h-full w-full flex flex-col ${positionClass} ${alignClass} ${
          compact ? 'px-5 sm:px-6' : 'px-8 sm:px-14'
        }`}
      >
        {recipient.trim() && (
          <div
            className={`${compact ? 'text-[10px] mb-1.5' : 'text-xs sm:text-sm mb-2.5'} font-semibold tracking-wide`}
            style={{
              fontFamily,
              color: template.style.palette.accent,
              textShadow: '0 2px 8px rgba(0,0,0,0.75)',
            }}
          >
            {recipient}
          </div>
        )}

        <p
          className={`max-w-[92%] break-words whitespace-pre-line ${
            compact ? 'line-clamp-3' : ''
          }`}
          style={{
            fontFamily,
            fontSize: computedFontSize,
            fontWeight: textStyle.bold ? 700 : 400,
            fontStyle: textStyle.italic ? 'italic' : 'normal',
            letterSpacing: `${textStyle.letterSpacing}px`,
            lineHeight: textStyle.lineHeight,
            color: textStyle.textColor,
            textShadow: '0 2px 14px rgba(0,0,0,0.75)',
          }}
        >
          {quoteText}
        </p>

        {(sender.trim() || (dateText && dateText.trim())) && (
          <div
            className={`${compact ? 'text-[10px] mt-2' : 'text-xs sm:text-sm mt-3.5'} italic opacity-90`}
            style={{
              fontFamily,
              color: textStyle.textColor,
              textShadow: '0 2px 8px rgba(0,0,0,0.75)',
            }}
          >
            {[sender.trim(), dateText?.trim()].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  );
};
