import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  CategoryItem,
  GalleryItem,
  Language,
  PostcardTemplate,
  QuoteItem,
} from '../types/postcard';
import { translations } from '../i18n/translations';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { categories } from '../data/categories';
import { PostcardCard } from './PostcardCard';
import { QuoteCard } from './QuoteCard';
import { GalleryCard } from './GalleryCard';

interface GlobalSearchBarProps {
  language: Language;
  favorites: { postcards: string[]; quotes: string[]; gallery: string[] };
  onTogglePostcardFav: (id: string) => void;
  onToggleQuoteFav: (id: string) => void;
  onToggleGalleryFav: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onSelectCategory: (catId: string) => void;
  onViewGallery: (item: GalleryItem) => void;
  onDownloadGallery: (item: GalleryItem) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  language,
  favorites,
  onTogglePostcardFav,
  onToggleQuoteFav,
  onToggleGalleryFav,
  onUseTemplate,
  onUseQuote,
  onSelectCategory,
  onViewGallery,
  onDownloadGallery,
}) => {
  const t = translations[language];
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) {
      return null;
    }

    const matchedCategories: CategoryItem[] = categories.filter(
      (c) =>
        c.name.bn.toLowerCase().includes(trimmed) ||
        c.name.en.toLowerCase().includes(trimmed) ||
        c.description.bn.toLowerCase().includes(trimmed) ||
        c.description.en.toLowerCase().includes(trimmed)
    );

    const matchedCatIds = new Set(matchedCategories.map((c) => c.id));

    const matchedPostcards: PostcardTemplate[] = postcards.filter(
      (p) =>
        p.title.bn.toLowerCase().includes(trimmed) ||
        p.title.en.toLowerCase().includes(trimmed) ||
        p.defaultQuote.toLowerCase().includes(trimmed) ||
        p.defaultQuoteEn.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        matchedCatIds.has(p.category)
    );

    const matchedQuotes: QuoteItem[] = quotes.filter(
      (q) =>
        q.text.toLowerCase().includes(trimmed) ||
        q.textEn.toLowerCase().includes(trimmed) ||
        q.category.toLowerCase().includes(trimmed) ||
        matchedCatIds.has(q.category)
    );

    const matchedGallery: GalleryItem[] = gallery.filter(
      (g) =>
        g.title.bn.toLowerCase().includes(trimmed) ||
        g.title.en.toLowerCase().includes(trimmed) ||
        g.embeddedText.toLowerCase().includes(trimmed) ||
        g.category.toLowerCase().includes(trimmed) ||
        matchedCatIds.has(g.category)
    );

    return {
      categories: matchedCategories,
      postcards: matchedPostcards,
      quotes: matchedQuotes,
      gallery: matchedGallery,
      total:
        matchedCategories.length +
        matchedPostcards.length +
        matchedQuotes.length +
        matchedGallery.length,
    };
  }, [trimmed]);

  return (
    <section
      aria-label="Global Search"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2"
    >
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-4 h-4 text-[#C8A25A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search.placeholder}
          aria-label={t.search.placeholder}
          className="w-full min-h-[46px] pl-11 pr-20 py-2.5 rounded-lg bg-[#16110D] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm sm:text-base text-[#F5ECD8] placeholder:text-[#8E7E68] transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded text-xs text-[#C8A25A] hover:text-[#F5ECD8] flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.search.clear}</span>
          </button>
        )}
      </div>

      {/* Live Search Results Panel */}
      {results && (
        <div className="mt-6 rounded-xl bg-[#140F0C] border border-[#C8A25A]/30 p-5 sm:p-7 space-y-8">
          <div className="flex items-center justify-between gap-4 border-b border-[#C8A25A]/15 pb-3">
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#E3BA73]">
              {t.search.resultsTitle} ({results.total})
            </h2>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#B8A890] hover:text-[#F5ECD8] cursor-pointer"
            >
              {t.search.clear}
            </button>
          </div>

          {results.total === 0 ? (
            <p className="text-sm text-[#B8A890] py-4 text-center">
              {t.search.noResults}
            </p>
          ) : (
            <>
              {results.categories.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] mb-3">
                    {t.search.categoriesMatch}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setQuery('');
                        }}
                        className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#1E1712] border border-[#C8A25A]/30 hover:border-[#C8A25A] text-sm text-[#F5ECD8] cursor-pointer transition-colors"
                      >
                        {cat.emoji} {cat.name[language]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.postcards.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] mb-3">
                    {t.search.postcardsMatch} ({results.postcards.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.postcards.slice(0, 6).map((p) => (
                      <PostcardCard
                        key={p.id}
                        template={p}
                        language={language}
                        isFavorite={favorites.postcards.includes(p.id)}
                        onToggleFavorite={onTogglePostcardFav}
                        onUseTemplate={(tpl) => {
                          setQuery('');
                          onUseTemplate(tpl);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {results.quotes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] mb-3">
                    {t.search.quotesMatch} ({results.quotes.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.quotes.slice(0, 6).map((q) => (
                      <QuoteCard
                        key={q.id}
                        quote={q}
                        language={language}
                        isFavorite={favorites.quotes.includes(q.id)}
                        onToggleFavorite={onToggleQuoteFav}
                        onUseQuote={(qt) => {
                          setQuery('');
                          onUseQuote(qt);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {results.gallery.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] mb-3">
                    {t.search.galleryMatch} ({results.gallery.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.gallery.slice(0, 6).map((g) => (
                      <GalleryCard
                        key={g.id}
                        item={g}
                        language={language}
                        isFavorite={favorites.gallery.includes(g.id)}
                        onToggleFavorite={onToggleGalleryFav}
                        onView={onViewGallery}
                        onDownload={onDownloadGallery}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};
