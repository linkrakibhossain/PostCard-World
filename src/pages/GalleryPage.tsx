import React, { useMemo, useState } from 'react';
import { X, Download, Heart } from 'lucide-react';
import { GalleryItem, Language } from '../types/postcard';
import { translations } from '../i18n/translations';
import { categories } from '../data/categories';
import { gallery } from '../data/gallery';
import { GalleryArtworkFrame, GalleryCard } from '../components/GalleryCard';

interface GalleryPageProps {
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDownloadGallery: (item: GalleryItem) => void;
  viewingItem: GalleryItem | null;
  onChangeViewingItem: (item: GalleryItem | null) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  language,
  favorites,
  onToggleFavorite,
  onDownloadGallery,
  viewingItem,
  onChangeViewingItem,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryCategories = useMemo(() => {
    const usedIds = new Set(gallery.map((g) => g.category));
    return categories.filter((c) => usedIds.has(c.id));
  }, []);

  const filtered = useMemo(() => {
    return gallery.filter(
      (item) => selectedCategory === 'all' || item.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <header className="border-b border-[#C8A25A]/20 pb-6">
        <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#F5ECD8]">
          {t.galleryPage.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#B8A890] max-w-2xl">
          {t.galleryPage.subtitle}
        </p>
        <p className="mt-2 text-xs text-[#C8A25A]">
          {t.galleryPage.viewOnlyNotice}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#7C1D26] text-[#F5ECD8] border-[#C8A25A]/50'
              : 'bg-[#16110D] text-[#D6C7AE] border-[#C8A25A]/20 hover:border-[#C8A25A]/45'
          }`}
        >
          {t.galleryPage.allCategories}
        </button>
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#7C1D26] text-[#F5ECD8] border-[#C8A25A]/50'
                : 'bg-[#16110D] text-[#D6C7AE] border-[#C8A25A]/20 hover:border-[#C8A25A]/45'
            }`}
          >
            {cat.emoji} {cat.name[language]}
          </button>
        ))}
      </div>

      <p className="text-xs text-[#9E8F79] tabular-nums">
        {filtered.length} {t.galleryPage.showingCount}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-10 text-center text-sm text-[#B8A890]">
          {t.galleryPage.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              language={language}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              onView={onChangeViewingItem}
              onDownload={onDownloadGallery}
            />
          ))}
        </div>
      )}

      {/* Lightbox View Modal (View -> Download) */}
      {viewingItem && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-xl bg-[#16110D] border border-[#C8A25A]/35 p-4 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#F5ECD8]">
                  {viewingItem.title[language]}
                </h2>
                <p className="text-xs text-[#9E8F79]">{t.cards.nonEditableNote}</p>
              </div>
              <button
                type="button"
                onClick={() => onChangeViewingItem(null)}
                aria-label={t.galleryPage.closeModal}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#B8A890] hover:text-[#F5ECD8] hover:bg-[#241B15] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <GalleryArtworkFrame item={viewingItem} large />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => onToggleFavorite(viewingItem.id)}
                className="min-h-[44px] px-4 rounded-lg border border-[#C8A25A]/25 bg-[#1D1611] text-sm text-[#F5ECD8] flex items-center gap-2 cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(viewingItem.id)
                      ? 'fill-[#9B2A2F] text-[#9B2A2F]'
                      : ''
                  }`}
                />
                <span>
                  {favorites.includes(viewingItem.id)
                    ? t.cards.removeFavorite
                    : t.cards.addFavorite}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onDownloadGallery(viewingItem)}
                className="min-h-[44px] px-6 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm font-semibold border border-[#C8A25A]/35 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.cards.downloadArtwork}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
