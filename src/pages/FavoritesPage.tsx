import React, { useState } from 'react';
import {
  FavoritesState,
  GalleryItem,
  Language,
  PageRoute,
  PostcardTemplate,
  QuoteItem,
} from '../types/postcard';
import { translations } from '../i18n/translations';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { PostcardCard } from '../components/PostcardCard';
import { QuoteCard } from '../components/QuoteCard';
import { GalleryCard } from '../components/GalleryCard';

interface FavoritesPageProps {
  language: Language;
  favorites: FavoritesState;
  onTogglePostcardFav: (id: string) => void;
  onToggleQuoteFav: (id: string) => void;
  onToggleGalleryFav: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onViewGallery: (item: GalleryItem) => void;
  onDownloadGallery: (item: GalleryItem) => void;
  onNavigate: (page: PageRoute) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  language,
  favorites,
  onTogglePostcardFav,
  onToggleQuoteFav,
  onToggleGalleryFav,
  onUseTemplate,
  onUseQuote,
  onViewGallery,
  onDownloadGallery,
  onNavigate,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'postcards' | 'quotes' | 'gallery'>(
    'postcards'
  );

  const favPostcards = postcards.filter((p) =>
    favorites.postcards.includes(p.id)
  );
  const favQuotes = quotes.filter((q) => favorites.quotes.includes(q.id));
  const favGallery = gallery.filter((g) => favorites.gallery.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <header className="border-b border-[#C8A25A]/20 pb-6">
        <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#F5ECD8]">
          {t.favoritesPage.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#B8A890] max-w-2xl">
          {t.favoritesPage.subtitle}
        </p>
      </header>

      {/* Segmented Tabs */}
      <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#16110D] border border-[#C8A25A]/20">
        <button
          type="button"
          onClick={() => setActiveTab('postcards')}
          className={`min-h-[42px] px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer tabular-nums ${
            activeTab === 'postcards'
              ? 'bg-[#7C1D26] text-[#F5ECD8]'
              : 'text-[#D6C7AE] hover:text-[#F5ECD8]'
          }`}
        >
          {t.favoritesPage.tabPostcards} ({favPostcards.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quotes')}
          className={`min-h-[42px] px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer tabular-nums ${
            activeTab === 'quotes'
              ? 'bg-[#7C1D26] text-[#F5ECD8]'
              : 'text-[#D6C7AE] hover:text-[#F5ECD8]'
          }`}
        >
          {t.favoritesPage.tabQuotes} ({favQuotes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          className={`min-h-[42px] px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer tabular-nums ${
            activeTab === 'gallery'
              ? 'bg-[#7C1D26] text-[#F5ECD8]'
              : 'text-[#D6C7AE] hover:text-[#F5ECD8]'
          }`}
        >
          {t.favoritesPage.tabGallery} ({favGallery.length})
        </button>
      </div>

      {activeTab === 'postcards' &&
        (favPostcards.length === 0 ? (
          <div className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-10 text-center space-y-4">
            <p className="text-sm text-[#B8A890]">
              {t.favoritesPage.emptyPostcards}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('postcards')}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-sm font-semibold text-[#F5ECD8] cursor-pointer"
            >
              {t.favoritesPage.browsePostcards}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favPostcards.map((p) => (
              <PostcardCard
                key={p.id}
                template={p}
                language={language}
                isFavorite
                onToggleFavorite={onTogglePostcardFav}
                onUseTemplate={onUseTemplate}
              />
            ))}
          </div>
        ))}

      {activeTab === 'quotes' &&
        (favQuotes.length === 0 ? (
          <div className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-10 text-center space-y-4">
            <p className="text-sm text-[#B8A890]">
              {t.favoritesPage.emptyQuotes}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('quotes')}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-sm font-semibold text-[#F5ECD8] cursor-pointer"
            >
              {t.favoritesPage.browseQuotes}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {favQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                language={language}
                isFavorite
                onToggleFavorite={onToggleQuoteFav}
                onUseQuote={onUseQuote}
              />
            ))}
          </div>
        ))}

      {activeTab === 'gallery' &&
        (favGallery.length === 0 ? (
          <div className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-10 text-center space-y-4">
            <p className="text-sm text-[#B8A890]">
              {t.favoritesPage.emptyGallery}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-sm font-semibold text-[#F5ECD8] cursor-pointer"
            >
              {t.favoritesPage.browseGallery}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favGallery.map((g) => (
              <GalleryCard
                key={g.id}
                item={g}
                language={language}
                isFavorite
                onToggleFavorite={onToggleGalleryFav}
                onView={onViewGallery}
                onDownload={onDownloadGallery}
              />
            ))}
          </div>
        ))}
    </div>
  );
};
