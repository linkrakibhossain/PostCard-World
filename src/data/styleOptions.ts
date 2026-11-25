import {
  BorderStyle,
  ExportSizeId,
  FontStyleId,
  VintageEffectId,
} from '../types/postcard';

export const fontStyleMap: Record<
  FontStyleId,
  { cssFamily: string; canvasFamily: string }
> = {
  'elegant-bengali': {
    cssFamily: "'Noto Serif Bengali', 'Cormorant Garamond', Georgia, serif",
    canvasFamily: "'Noto Serif Bengali', 'Cormorant Garamond', Georgia, serif",
  },
  handwritten: {
    cssFamily: "'Galada', 'Caveat', 'Noto Serif Bengali', cursive",
    canvasFamily: "'Galada', 'Caveat', 'Noto Serif Bengali', cursive",
  },
  'vintage-serif': {
    cssFamily: "'Tiro Bangla', 'Playfair Display', Georgia, serif",
    canvasFamily: "'Tiro Bangla', 'Playfair Display', Georgia, serif",
  },
  typewriter: {
    cssFamily: "'Courier Prime', 'Noto Serif Bengali', monospace",
    canvasFamily: "'Courier Prime', 'Noto Serif Bengali', monospace",
  },
  classic: {
    cssFamily: "'Cormorant Garamond', 'Noto Serif Bengali', Georgia, serif",
    canvasFamily: "'Cormorant Garamond', 'Noto Serif Bengali', Georgia, serif",
  },
  calligraphy: {
    cssFamily: "'Atma', 'Playfair Display', 'Noto Serif Bengali', cursive",
    canvasFamily: "'Atma', 'Playfair Display', 'Noto Serif Bengali', cursive",
  },
  'old-newspaper': {
    cssFamily: "'Playfair Display', 'Tiro Bangla', Georgia, serif",
    canvasFamily: "'Playfair Display', 'Tiro Bangla', Georgia, serif",
  },
};

export const vintageEffectMeta: Record<
  VintageEffectId,
  {
    cssFilter: string;
    overlayType: 'none' | 'paper' | 'grain' | 'dust' | 'scratch' | 'coffee' | 'warm';
  }
> = {
  original: {
    cssFilter: 'none',
    overlayType: 'none',
  },
  sepia: {
    cssFilter: 'sepia(0.68) contrast(1.04) brightness(0.95)',
    overlayType: 'none',
  },
  'old-paper': {
    cssFilter: 'sepia(0.38) contrast(0.96) brightness(1.02) saturate(0.85)',
    overlayType: 'paper',
  },
  faded: {
    cssFilter: 'contrast(0.84) brightness(1.06) saturate(0.75)',
    overlayType: 'none',
  },
  bw: {
    cssFilter: 'grayscale(1) contrast(1.12) brightness(0.96)',
    overlayType: 'none',
  },
  'film-grain': {
    cssFilter: 'contrast(1.06) saturate(0.92)',
    overlayType: 'grain',
  },
  dust: {
    cssFilter: 'sepia(0.18) contrast(1.02)',
    overlayType: 'dust',
  },
  scratch: {
    cssFilter: 'sepia(0.24) contrast(1.08) brightness(0.96)',
    overlayType: 'scratch',
  },
  'coffee-stain': {
    cssFilter: 'sepia(0.32) saturate(0.92)',
    overlayType: 'coffee',
  },
  'warm-vintage': {
    cssFilter: 'sepia(0.28) saturate(1.12) contrast(1.04) brightness(0.98)',
    overlayType: 'warm',
  },
};

export const exportSizeSpecs: Record<
  ExportSizeId,
  {
    id: ExportSizeId;
    logicalWidth: number;
    logicalHeight: number;
    exportScale: number;
    aspectClass: string;
    ratioLabel: string;
  }
> = {
  postcard: {
    id: 'postcard',
    logicalWidth: 900,
    logicalHeight: 600,
    exportScale: 3, // 2700 x 1800 HD
    aspectClass: 'aspect-[3/2]',
    ratioLabel: '3:2',
  },
  'ig-square': {
    id: 'ig-square',
    logicalWidth: 800,
    logicalHeight: 800,
    exportScale: 3, // 2400 x 2400 HD
    aspectClass: 'aspect-square',
    ratioLabel: '1:1',
  },
  'ig-story': {
    id: 'ig-story',
    logicalWidth: 640,
    logicalHeight: 1138,
    exportScale: 3, // 1920 x 3414 HD
    aspectClass: 'aspect-[9/16]',
    ratioLabel: '9:16',
  },
  'fb-post': {
    id: 'fb-post',
    logicalWidth: 960,
    logicalHeight: 504,
    exportScale: 3, // 2880 x 1512 HD
    aspectClass: 'aspect-[1.91/1]',
    ratioLabel: '1.91:1',
  },
  'wa-status': {
    id: 'wa-status',
    logicalWidth: 640,
    logicalHeight: 1138,
    exportScale: 3, // 1920 x 3414 HD
    aspectClass: 'aspect-[9/16]',
    ratioLabel: '9:16',
  },
};

export const textColorSwatches: Array<{ hex: string; label: string }> = [
  { hex: '#F5ECD8', label: 'Antique Cream' },
  { hex: '#FAF0DC', label: 'Ivory Parchment' },
  { hex: '#E3BA73', label: 'Vintage Gold' },
  { hex: '#F2C6B4', label: 'Blush Rose' },
  { hex: '#C6D7DD', label: 'Rainlight Silver' },
  { hex: '#FFFFFF', label: 'Pure White' },
  { hex: '#2A1B14', label: 'Espresso Ink' },
];

export const borderStyleLabels: Record<BorderStyle, string> = {
  'classic-gold': 'Classic Gold',
  airmail: 'Airmail Trim',
  'double-frame': 'Double Archival',
  'stamp-edge': 'Postage Frame',
  'minimal-line': 'Minimal Hairline',
};
