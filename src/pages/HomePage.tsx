import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Language,
  PageRoute,
  PostcardTemplate,
} from '../types/postcard';
import { translations } from '../i18n/translations';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { PostcardCard } from '../components/PostcardCard';
import { PostcardPreviewFrame } from '../components/PostcardPreviewFrame';

interface HomePageProps {
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onUseTemplate: (template: PostcardTemplate) => void;
  onNavigate: (page: PageRoute) => void;
  onSelectCategory: (catId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  favorites,
  onToggleFavorite,
  onUseTemplate,
  onNavigate,
  onSelectCategory,
}) => {
  const t = translations[language];

  const heroTemplate = postcards[0];
  const popularCards = postcards.filter((p) => p.collections.includes('popular')).slice(0, 3);
  const newCards = postcards.filter((p) => p.collections.includes('new')).slice(0, 3);
  const romanticCards = postcards.filter((p) => p.collections.includes('romantic')).slice(0, 3);
  const rainyCards = postcards.filter((p) => p.collections.includes('rainy')).slice(0, 3);
  const letterCards = postcards.filter((p) => p.collections.includes('letter')).slice(0, 3);

  const sections = [
    { title: t.home.popularSection, items: popularCards, catFilter: 'all' },
    { title: t.home.newSection, items: newCards, catFilter: 'all' },
    { title: t.home.romanticSection, items: romanticCards, catFilter: 'romantic' },
    { title: t.home.rainySection, items: rainyCards, catFilter: 'brishti' },
    { title: t.home.letterSection, items: letterCards, catFilter: 'prempotro' },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Typography */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A25A] font-semibold">
              {t.hero.kicker}
            </p>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#F5ECD8] leading-[1.24] text-balance">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#C9B9A1] leading-relaxed max-w-xl">
              {t.hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('generator')}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm sm:text-base font-semibold border border-[#C8A25A]/45 shadow-lg transition-colors cursor-pointer"
              >
                {t.hero.primaryCta}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-[#17120E] hover:bg-[#221A14] text-[#E3BA73] text-sm sm:text-base font-semibold border border-[#C8A25A]/30 hover:border-[#C8A25A]/60 transition-colors cursor-pointer"
              >
                {t.hero.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right Live Vintage Postcard Showcase */}
          <div className="lg:col-span-6">
            <div
              onClick={() => onUseTemplate(heroTemplate)}
              className="cursor-pointer group"
            >
              <div className="transition-transform duration-300 group-hover:scale-[1.01]">
                <PostcardPreviewFrame
                  template={heroTemplate}
                  recipient={t.hero.sampleRecipient}
                  quoteText={t.hero.sampleQuote}
                  sender={t.hero.sampleSender}
                  dateText="১৯৭৪ · ARCHIVE"
                  textStyle={{
                    fontStyle: 'elegant-bengali',
                    fontSize: 22,
                    bold: false,
                    italic: false,
                    align: 'center',
                    letterSpacing: 0,
                    lineHeight: 1.6,
                    textColor: '#F5ECD8',
                    textPosition: 'center',
                  }}
                  vintageEffect="warm-vintage"
                  exportSize="postcard"
                />
              </div>
              <p className="mt-3 text-xs text-[#9E8F79] text-center font-ui tracking-wide">
                {t.hero.previewCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 border-b border-[#C8A25A]/18 pb-4 mb-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5ECD8]">
            {t.home.chooseCategory}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('categories')}
            className="text-xs sm:text-sm text-[#C8A25A] hover:text-[#F5ECD8] flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>{t.home.viewAllCategories}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#16110D] hover:bg-[#221A14] border border-[#C8A25A]/25 hover:border-[#C8A25A]/60 text-sm text-[#F5ECD8] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span aria-hidden="true">{cat.emoji}</span>
              <span>{cat.name[language]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Curated Collections */}
      {sections.map((section) => (
        <section key={section.title} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 border-b border-[#C8A25A]/18 pb-4 mb-6">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#F5ECD8]">
              {section.title}
            </h2>
            <button
              type="button"
              onClick={() =>
                section.catFilter === 'all'
                  ? onNavigate('postcards')
                  : onSelectCategory(section.catFilter)
              }
              className="text-xs sm:text-sm text-[#C8A25A] hover:text-[#F5ECD8] flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>{t.home.exploreAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((tpl) => (
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
        </section>
      ))}
    </div>
  );
};
