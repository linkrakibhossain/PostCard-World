export type Language = 'bn' | 'en';

export type PageRoute =
  | 'home'
  | 'postcards'
  | 'quotes'
  | 'gallery'
  | 'categories'
  | 'favorites'
  | 'generator';

export type BorderStyle =
  | 'classic-gold'
  | 'airmail'
  | 'double-frame'
  | 'stamp-edge'
  | 'minimal-line';

export type TextPosition = 'top' | 'center' | 'bottom';
export type TextAlign = 'left' | 'center' | 'right';

export type FontStyleId =
  | 'elegant-bengali'
  | 'handwritten'
  | 'vintage-serif'
  | 'typewriter'
  | 'classic'
  | 'calligraphy'
  | 'old-newspaper';

export type VintageEffectId =
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'bw'
  | 'film-grain'
  | 'dust'
  | 'scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type ExportSizeId =
  | 'postcard'
  | 'ig-square'
  | 'ig-story'
  | 'fb-post'
  | 'wa-status';

export type ExportFormat = 'png' | 'jpg';

export type ArtworkMotif =
  | 'couple-dusk'
  | 'love-letter'
  | 'vintage-rose'
  | 'rainy-window'
  | 'umbrella-lane'
  | 'moonlit-night'
  | 'railway-station'
  | 'old-cafe'
  | 'vintage-house'
  | 'classic-cinema'
  | 'misty-nature'
  | 'quiet-lake'
  | 'river-boat'
  | 'golden-sunset'
  | 'warm-coffee'
  | 'pressed-flowers'
  | 'wax-envelope'
  | 'aged-paper'
  | 'old-newspaper'
  | 'film-frame'
  | 'bengali-arch'
  | 'teardrop-window'
  | 'distant-horizon'
  | 'ring-promise'
  | 'candle-celebration'
  | 'autumn-memory'
  | 'typewriter-desk'
  | 'crimson-valentine';

export interface ArtworkPalette {
  bgFrom: string;
  bgVia: string;
  bgTo: string;
  accent: string;
  glow: string;
  inkDefault: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  emoji: string;
  name: {
    bn: string;
    en: string;
  };
  description: {
    bn: string;
    en: string;
  };
}

export interface PostcardStyleConfig {
  textPosition: TextPosition;
  fontStyle: FontStyleId;
  textColor: string;
  borderStyle: BorderStyle;
  vintageEffect: VintageEffectId;
  palette: ArtworkPalette;
  motif: ArtworkMotif;
  postmarkText: string;
}

export interface PostcardTemplate {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  category: string;
  collections: Array<'popular' | 'new' | 'romantic' | 'rainy' | 'letter'>;
  image: string; // e.g. "/assets/postcards/vp001.webp" or "" for bespoke procedural vintage art
  defaultQuote: string;
  defaultQuoteEn: string;
  style: PostcardStyleConfig;
}

export interface QuoteItem {
  id: string;
  text: string;
  textEn: string;
  category: string;
  author?: string;
}

export interface GalleryItem {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  category: string;
  image: string; // e.g. "/assets/gallery/g001.webp" or "" for procedural pre-made artwork
  embeddedText: string;
  embeddedSubtext?: string;
  palette: ArtworkPalette;
  motif: ArtworkMotif;
  vintageEffect: VintageEffectId;
  borderStyle: BorderStyle;
  postmarkText: string;
}

export interface TextCustomization {
  fontStyle: FontStyleId;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  align: TextAlign;
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  textPosition: TextPosition;
}

export interface GeneratorState {
  templateId: string;
  recipient: string;
  quoteText: string;
  sender: string;
  dateText: string;
  textStyle: TextCustomization;
  vintageEffect: VintageEffectId;
  exportSize: ExportSizeId;
  exportFormat: ExportFormat;
}

export interface FavoritesState {
  postcards: string[];
  quotes: string[];
  gallery: string[];
}
