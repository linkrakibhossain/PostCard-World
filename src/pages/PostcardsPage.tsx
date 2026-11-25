import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Language, PostcardTemplate } from '../types/postcard';
import { translations } from '../i18n/translations';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { PostcardCard } from '../components/PostcardCard';

interface PostcardsPageProps {
  language: Language;
  initialCategory?: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
}

export const PostcardsPage: React.FC<PostcardsPageProps> = ({
  language,
  initialCategory = 'all',
  favorites,
  onToggleFavorite,
  onUseTemplate,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return postcards.filter((p) => {
      const catMatch =
        selectedCategory === 'all' || p.category === selectedCategory;
      const textMatch =
        !q ||
        p.title.bn.toLowerCase().includes(q) ||
        p.title.en.toLowerCase().includes(q) ||
        p.defaultQuote.toLowerCase().includes(q) ||
        p.defaultQuoteEn.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <header className="border-b border-[#C8A25A]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#F5ECD8]">
            {t.postcardsPage.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#B8A890] max-w-2xl">
            {t.postcardsPage.subtitle}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#C8A25A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-lg bg-[#16110D] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8] placeholder:text-[#8E7E68]"
          />
        </div>
      </header>

      {/* Category Filter Tabs */}
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
          {t.postcardsPage.allCategories}
        </button>
        {categories.map((cat) => (
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
        {filtered.length} {t.postcardsPage.showingCount}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-10 text-center text-sm text-[#B8A890]">
          {t.postcardsPage.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <PostcardCard
              key={tpl.id}
              template={tpl}
              language={language}
              isFavorite={favorites.includes(tpl.id)}
              onToggleFavorite={onToggleFavorite}
              onUseTemplate={onUseTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
