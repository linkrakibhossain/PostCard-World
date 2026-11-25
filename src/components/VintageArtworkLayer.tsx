import React, { useState } from 'react';
import {
  ArtworkMotif,
  ArtworkPalette,
  VintageEffectId,
} from '../types/postcard';
import { vintageEffectMeta } from '../data/styleOptions';

interface VintageArtworkLayerProps {
  image?: string;
  alt: string;
  palette: ArtworkPalette;
  motif: ArtworkMotif;
  vintageEffect: VintageEffectId;
  compact?: boolean;
}

const MotifIllustration: React.FC<{
  motif: ArtworkMotif;
  accent: string;
}> = ({ motif, accent }) => {
  const stroke = accent;
  switch (motif) {
    case 'wax-envelope':
    case 'love-letter':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <rect x="65" y="55" width="270" height="150" rx="4" stroke={stroke} strokeWidth="1.5" />
          <path d="M65 55 L200 148 L335 55" stroke={stroke} strokeWidth="1.5" />
          <path d="M65 205 L160 125 M335 205 L240 125" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <circle cx="200" cy="148" r="18" fill={stroke} fillOpacity="0.22" stroke={stroke} strokeWidth="1.5" />
          <path d="M194 148 C194 143 200 143 200 147 C200 143 206 143 206 148 C206 153 200 157 200 157 C200 157 194 153 194 148 Z" fill={stroke} opacity="0.8" />
        </svg>
      );
    case 'rainy-window':
    case 'teardrop-window':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <rect x="90" y="25" width="220" height="210" rx="110" stroke={stroke} strokeWidth="1.5" />
          <line x1="200" y1="25" x2="200" y2="235" stroke={stroke} strokeWidth="1.2" />
          <line x1="90" y1="135" x2="310" y2="135" stroke={stroke} strokeWidth="1.2" />
          {[
            [130, 65, 118, 95],
            [165, 48, 150, 86],
            [235, 60, 222, 96],
            [270, 80, 255, 118],
            [145, 160, 132, 198],
            [255, 155, 240, 196],
            [185, 172, 175, 206],
          ].map(([x1, y1, x2, y2], idx) => (
            <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
          ))}
        </svg>
      );
    case 'umbrella-lane':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M125 135 C125 78 275 78 275 135 Q238 122 200 135 Q162 122 125 135 Z" stroke={stroke} strokeWidth="1.6" fill={stroke} fillOpacity="0.1" />
          <line x1="200" y1="84" x2="200" y2="205" stroke={stroke} strokeWidth="1.5" />
          <path d="M200 205 C200 218 216 218 216 205" stroke={stroke} strokeWidth="1.5" />
          {[70, 100, 310, 340, 150, 260].map((x, idx) => (
            <line key={idx} x1={x} y1={24 + (idx % 3) * 18} x2={x - 14} y2={72 + (idx % 3) * 20} stroke={stroke} strokeWidth="1.1" opacity="0.65" />
          ))}
        </svg>
      );
    case 'vintage-rose':
    case 'crimson-valentine':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <circle cx="200" cy="108" r="44" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <path d="M200 72 C220 72 232 90 222 108 C236 112 232 134 210 138 C196 142 174 134 176 112 C164 96 180 72 200 72 Z" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.12" />
          <path d="M192 98 C198 90 212 94 208 106 C204 114 190 112 192 98 Z" stroke={stroke} strokeWidth="1.4" />
          <path d="M200 140 L200 225" stroke={stroke} strokeWidth="1.5" />
          <path d="M200 175 C175 165 165 178 184 190 Z" stroke={stroke} strokeWidth="1.3" />
          <path d="M200 190 C225 180 235 194 216 205 Z" stroke={stroke} strokeWidth="1.3" />
        </svg>
      );
    case 'moonlit-night':
    case 'distant-horizon':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-40" fill="none">
          <path d="M225 56 A46 46 0 1 0 268 124 A36 36 0 1 1 225 56 Z" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.14" />
          <circle cx="110" cy="65" r="2" fill={stroke} />
          <circle cx="145" cy="42" r="1.5" fill={stroke} />
          <circle cx="295" cy="62" r="2" fill={stroke} />
          <circle cx="322" cy="95" r="1.5" fill={stroke} />
          <circle cx="92" cy="112" r="1.5" fill={stroke} />
          <path d="M30 205 Q120 185 200 202 T370 198" stroke={stroke} strokeWidth="1.3" opacity="0.65" />
          <path d="M55 222 Q150 210 250 222 T355 218" stroke={stroke} strokeWidth="1" opacity="0.45" />
        </svg>
      );
    case 'couple-dusk':
    case 'golden-sunset':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <circle cx="200" cy="138" r="56" stroke={stroke} strokeWidth="1.4" fill={stroke} fillOpacity="0.1" />
          <line x1="40" y1="185" x2="360" y2="185" stroke={stroke} strokeWidth="1.3" />
          <circle cx="182" cy="144" r="11" stroke={stroke} strokeWidth="1.4" />
          <path d="M168 185 L174 157 L190 157 L194 185" stroke={stroke} strokeWidth="1.4" />
          <circle cx="215" cy="147" r="10" stroke={stroke} strokeWidth="1.4" />
          <path d="M204 185 L208 159 L222 159 L228 185" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case 'railway-station':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <circle cx="200" cy="78" r="26" stroke={stroke} strokeWidth="1.5" />
          <path d="M200 62 V78 L212 86" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="215" x2="175" y2="132" stroke={stroke} strokeWidth="1.5" />
          <line x1="365" y1="215" x2="225" y2="132" stroke={stroke} strokeWidth="1.5" />
          <line x1="80" y1="196" x2="320" y2="196" stroke={stroke} strokeWidth="1.2" opacity="0.7" />
          <line x1="115" y1="175" x2="285" y2="175" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
          <line x1="145" y1="156" x2="255" y2="156" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
        </svg>
      );
    case 'old-cafe':
    case 'warm-coffee':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M145 130 H250 V168 C250 192 230 205 198 205 C165 205 145 192 145 168 Z" stroke={stroke} strokeWidth="1.6" fill={stroke} fillOpacity="0.1" />
          <path d="M250 140 H266 C276 140 276 168 266 168 H250" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="198" cy="212" rx="78" ry="10" stroke={stroke} strokeWidth="1.3" />
          <path d="M178 112 C172 96 188 88 182 72" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M202 108 C196 90 214 82 206 64" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M224 114 C220 98 234 90 228 74" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'river-boat':
    case 'quiet-lake':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M125 162 Q200 192 275 162 L252 182 Q200 196 148 182 Z" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.12" />
          <path d="M188 164 L205 92 L245 152 Z" stroke={stroke} strokeWidth="1.4" fill={stroke} fillOpacity="0.08" />
          <path d="M40 198 Q120 188 200 198 T360 198" stroke={stroke} strokeWidth="1.2" opacity="0.7" />
          <path d="M70 216 Q150 208 230 216 T330 216" stroke={stroke} strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case 'classic-cinema':
    case 'film-frame':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <rect x="75" y="48" width="250" height="164" rx="4" stroke={stroke} strokeWidth="1.5" />
          <rect x="108" y="64" width="184" height="132" stroke={stroke} strokeWidth="1.2" />
          {[62, 92, 122, 152, 182].map((y) => (
            <React.Fragment key={y}>
              <rect x="85" y={y} width="12" height="14" rx="2" stroke={stroke} strokeWidth="1.1" />
              <rect x="303" y={y} width="12" height="14" rx="2" stroke={stroke} strokeWidth="1.1" />
            </React.Fragment>
          ))}
        </svg>
      );
    case 'bengali-arch':
    case 'vintage-house':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M90 215 V115 C90 70 140 50 200 50 C260 50 310 70 310 115 V215" stroke={stroke} strokeWidth="1.5" />
          <path d="M135 215 V125 C135 90 165 76 200 76 C235 76 265 90 265 125 V215" stroke={stroke} strokeWidth="1.2" />
          <line x1="70" y1="215" x2="330" y2="215" stroke={stroke} strokeWidth="1.5" />
          <circle cx="200" cy="128" r="18" stroke={stroke} strokeWidth="1.2" opacity="0.7" />
        </svg>
      );
    case 'ring-promise':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <circle cx="176" cy="138" r="40" stroke={stroke} strokeWidth="1.6" />
          <circle cx="224" cy="138" r="40" stroke={stroke} strokeWidth="1.6" />
          <polygon points="200,66 212,80 200,94 188,80" stroke={stroke} strokeWidth="1.4" fill={stroke} fillOpacity="0.18" />
        </svg>
      );
    case 'pressed-flowers':
    case 'autumn-memory':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M170 218 C180 160 198 110 220 55" stroke={stroke} strokeWidth="1.5" />
          <path d="M184 168 C154 150 148 130 176 138 Z" stroke={stroke} strokeWidth="1.3" fill={stroke} fillOpacity="0.1" />
          <path d="M196 134 C228 122 238 102 206 108 Z" stroke={stroke} strokeWidth="1.3" fill={stroke} fillOpacity="0.1" />
          <circle cx="220" cy="55" r="10" stroke={stroke} strokeWidth="1.4" />
          <circle cx="206" cy="48" r="8" stroke={stroke} strokeWidth="1.2" />
          <circle cx="234" cy="50" r="8" stroke={stroke} strokeWidth="1.2" />
          <circle cx="224" cy="39" r="8" stroke={stroke} strokeWidth="1.2" />
        </svg>
      );
    case 'typewriter-desk':
    case 'old-newspaper':
    case 'aged-paper':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-30" fill="none">
          <rect x="88" y="42" width="224" height="176" stroke={stroke} strokeWidth="1.3" />
          <line x1="112" y1="74" x2="288" y2="74" stroke={stroke} strokeWidth="1.5" />
          <line x1="112" y1="96" x2="288" y2="96" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="116" x2="262" y2="116" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="136" x2="278" y2="136" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="156" x2="236" y2="156" stroke={stroke} strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="176" x2="268" y2="176" stroke={stroke} strokeWidth="1" opacity="0.7" />
        </svg>
      );
    case 'candle-celebration':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <rect x="184" y="108" width="32" height="104" rx="3" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.1" />
          <path d="M200 54 C212 72 212 92 200 98 C188 92 188 72 200 54 Z" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.22" />
          <circle cx="200" cy="78" r="34" stroke={stroke} strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
        </svg>
      );
    case 'misty-nature':
    default:
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full opacity-35" fill="none">
          <path d="M40 190 L130 105 L205 170 L275 95 L360 190" stroke={stroke} strokeWidth="1.5" />
          <path d="M70 208 Q160 198 240 208 T350 205" stroke={stroke} strokeWidth="1.2" opacity="0.65" />
          <circle cx="290" cy="64" r="22" stroke={stroke} strokeWidth="1.3" />
        </svg>
      );
  }
};

export const VintageArtworkLayer: React.FC<VintageArtworkLayerProps> = ({
  image,
  alt,
  palette,
  motif,
  vintageEffect,
  compact = false,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const effect = vintageEffectMeta[vintageEffect];
  const hasRealImage = Boolean(image && image.trim().length > 0 && !imgFailed);

  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      style={{
        filter: effect.cssFilter,
        background: `radial-gradient(circle at 72% 28%, ${palette.glow}55 0%, transparent 55%), linear-gradient(145deg, ${palette.bgFrom} 0%, ${palette.bgVia} 52%, ${palette.bgTo} 100%)`,
      }}
    >
      {hasRealImage ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          {/* Subtle atmospheric vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 42%, rgba(8, 5, 4, 0.58) 100%)',
            }}
          />
          {/* Bespoke Vector Motif */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              compact ? 'p-3' : 'p-6'
            }`}
          >
            <MotifIllustration motif={motif} accent={palette.accent} />
          </div>
        </>
      )}

      {/* Subtle dark scrim for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,8,6,0.28) 0%, rgba(12,8,6,0.42) 50%, rgba(12,8,6,0.62) 100%)',
        }}
      />

      {/* Vintage Overlay Effects */}
      {effect.overlayType === 'paper' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #E7D2AC 0%, transparent 50%), radial-gradient(circle at 80% 85%, #C8A675 0%, transparent 55%)',
          }}
        />
      )}

      {effect.overlayType === 'grain' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.45'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {effect.overlayType === 'dust' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(1.5px 1.5px at 14% 22%, rgba(245,236,216,0.7), transparent), radial-gradient(1px 1px at 78% 18%, rgba(245,236,216,0.6), transparent), radial-gradient(1.5px 1.5px at 36% 74%, rgba(245,236,216,0.5), transparent), radial-gradient(1px 1px at 84% 68%, rgba(245,236,216,0.65), transparent), radial-gradient(2px 2px at 56% 32%, rgba(245,236,216,0.4), transparent)',
          }}
        />
      )}

      {effect.overlayType === 'scratch' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(92deg, transparent, transparent 74px, rgba(245,236,216,0.18) 74px, rgba(245,236,216,0.18) 75px, transparent 75px, transparent 160px)',
          }}
        />
      )}

      {effect.overlayType === 'coffee' && (
        <div
          className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none opacity-35"
          style={{
            border: '6px solid rgba(138, 86, 44, 0.45)',
            boxShadow: 'inset 0 0 18px rgba(96, 56, 28, 0.35)',
          }}
        />
      )}

      {effect.overlayType === 'warm' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(235, 178, 102, 0.35), transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
