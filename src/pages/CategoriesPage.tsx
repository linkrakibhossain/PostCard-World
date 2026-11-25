import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  FavoritesState,
  GalleryItem,
  Language,
  PostcardTemplate,
  QuoteItem,
} from '../types/postcard';
import { translations } from '../i18n/translations';
import { categories, getCategoryById } from '../data/categories';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { PostcardCard } from '../components/PostcardCard';
import { QuoteCard } from '../components/QuoteCard';
import { GalleryCard } from '../components/GalleryCard';

interface CategoriesPageProps {
  language: Language;
  selectedCategoryId: string | null;
  favorites: FavoritesState;
  onSelectCategory: (catId: string | null) => void;
  onTogglePostcardFav: (id: string) => void;
  onToggleQuoteFav: (id: string) => void;
  onToggleGalleryFav: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onViewGallery: (item: GalleryItem) => void;
  onDownloadGallery: (item: GalleryItem) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  language,
  selectedCategoryId,
  favorites,
  onSelectCategory,
  onTogglePostcardFav,
  onToggleQuoteFav,
  onToggleGalleryFav,
  onUseTemplate,
  onUseQuote,
  onViewGallery,
  onDownloadGallery,
}) => {
  const t = translations[language];
  const activeCat = selectedCategoryId ? getCategoryById(selectedCategoryId) : null;

  if (activeCat) {
    const catPostcards = postcards.filter((p) => p.category === activeCat.id);
    const catQuotes = quotes.filter((q) => q.category === activeCat.id);
    const catGallery = gallery.filter((g) => g.category === activeCat.id);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        <div>
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className="min-h-[40px] px-3 py-1.5 rounded-lg text-sm text-[#C8A25A] hover:text-[#F5ECD8] flex items-center gap-1.5 cursor-pointer mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.categoriesPage.backToCategories}</span>
          </button>

          <header className="border-b border-[#C8A25A]/20 pb-6">
            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#F5ECD8] flex items-center gap-3">
              <span aria-hidden="true">{activeCat.emoji}</span>
              <span>{activeCat.name[language]}</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#B8A890] max-w-2xl">
              {activeCat.description[language]}
            </p>
            <div className="mt-3 text-xs text-[#9E8F79] flex items-center gap-2 tabular-nums">
              <span>
                {catPostcards.length} {t.categoriesPage.templatesLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {catQuotes.length} {t.categoriesPage.quotesLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {catGallery.length} {t.categoriesPage.galleryLabel}
              </span>
            </div>
          </header>
        </div>

        {catPostcards.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#E3BA73]">
              {t.categoriesPage.postcardsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catPostcards.map((p) => (
                <PostcardCard
                  key={p.id}
                  template={p}
                  language={language}
                  isFavorite={favorites.postcards.includes(p.id)}
                  onToggleFavorite={onTogglePostcardFav}
                  onUseTemplate={onUseTemplate}
                />
              ))}
            </div>
          </section>
        )}

        {catQuotes.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#E3BA73]">
              {t.categoriesPage.quotesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {catQuotes.map((q) => (
                <QuoteCard
                  key={q.id}
                  quote={q}
                  language={language}
                  isFavorite={favorites.quotes.includes(q.id)}
                  onToggleFavorite={onToggleQuoteFav}
                  onUseQuote={onUseQuote}
                />
              ))}
            </div>
          </section>
        )}

        {catGallery.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#E3BA73]">
              {t.categoriesPage.galleryHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catGallery.map((g) => (
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
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <header className="border-b border-[#C8A25A]/20 pb-6">
        <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#F5ECD8]">
          {t.categoriesPage.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#B8A890] max-w-2xl">
          {t.categoriesPage.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const pCount = postcards.filter((p) => p.category === cat.id).length;
          const qCount = quotes.filter((q) => q.category === cat.id).length;
          const gCount = gallery.filter((g) => g.category === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="text-left rounded-xl bg-[#16110D] hover:bg-[#1E1712] border border-[#C8A25A]/20 hover:border-[#C8A25A]/50 p-6 transition-colors cursor-pointer flex flex-col justify-between gap-4"
            >
              <div>
                <div className="text-2xl mb-3" aria-hidden="true">
                  {cat.emoji}
                </div>
                <h2 className="font-editorial text-xl font-bold text-[#F5ECD8]">
                  {cat.name[language]}
                </h2>
                <p className="mt-2 text-sm text-[#B8A890] leading-relaxed">
                  {cat.description[language]}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C8A25A]/12 text-xs text-[#C8A25A] flex items-center gap-2 tabular-nums">
                <span>
                  {pCount} {t.categoriesPage.templatesLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {qCount} {t.categoriesPage.quotesLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {gCount} {t.categoriesPage.galleryLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
