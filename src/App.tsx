import React, { useEffect, useState } from 'react';
import {
  FavoritesState,
  GalleryItem,
  GeneratorState,
  Language,
  PageRoute,
  PostcardTemplate,
  QuoteItem,
} from './types/postcard';
import { translations } from './i18n/translations';
import { postcards } from './data/postcards';
import { getCategoryById } from './data/categories';
import {
  exportCustomPostcard,
  exportGalleryArtwork,
} from './utils/postcardExporter';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchBar } from './components/GlobalSearchBar';
import { DownloadGateModal } from './components/DownloadGateModal';
import { HomePage } from './pages/HomePage';
import { PostcardsPage } from './pages/PostcardsPage';
import { QuotesPage } from './pages/QuotesPage';
import { GalleryPage } from './pages/GalleryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { GeneratorPage } from './pages/GeneratorPage';

const LANG_STORAGE_KEY = 'postcardworld_lang';
const FAV_STORAGE_KEY = 'postcardworld_favorites';

type DownloadTarget =
  | { type: 'postcard' }
  | { type: 'gallery'; item: GalleryItem }
  | null;

function readInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'bn' || saved === 'en') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'bn';
}

function readInitialFavorites(): FavoritesState {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FavoritesState>;
      return {
        postcards: Array.isArray(parsed.postcards) ? parsed.postcards : [],
        quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
        gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
      };
    }
  } catch {
    // Ignore parse/storage errors
  }
  return { postcards: [], quotes: [], gallery: [] };
}

export default function App() {
  const [language, setLanguage] = useState<Language>(readInitialLanguage);
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [favorites, setFavorites] = useState<FavoritesState>(
    readInitialFavorites
  );
  const [viewingGalleryItem, setViewingGalleryItem] =
    useState<GalleryItem | null>(null);
  const [downloadTarget, setDownloadTarget] = useState<DownloadTarget>(null);

  const initialTpl = postcards[0];
  const [generatorState, setGeneratorState] = useState<GeneratorState>(() => ({
    templateId: initialTpl.id,
    recipient: translations[readInitialLanguage()].generator.recipientDefault,
    quoteText:
      readInitialLanguage() === 'bn'
        ? initialTpl.defaultQuote
        : initialTpl.defaultQuoteEn,
    sender: translations[readInitialLanguage()].generator.senderDefault,
    dateText: '',
    textStyle: {
      fontStyle: initialTpl.style.fontStyle,
      fontSize: 22,
      bold: false,
      italic: false,
      align: 'center',
      letterSpacing: 0,
      lineHeight: 1.6,
      textColor: initialTpl.style.textColor,
      textPosition: initialTpl.style.textPosition,
    },
    vintageEffect: initialTpl.style.vintageEffect,
    exportSize: 'postcard',
    exportFormat: 'png',
  }));

  // Persist language choice & update <html lang>
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // Ignore storage error
    }
    document.documentElement.lang = language;
  }, [language]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage error
    }
  }, [favorites]);

  // SEO-friendly dynamic document title & meta description
  useEffect(() => {
    const baseTitle =
      'PostCard World – Vintage Postcard Generator | প্রেমের উক্তি দিয়ে সুন্দর পোস্টকার্ড তৈরি করুন';
    const baseDesc =
      'অনলাইনে তৈরি করুন সুন্দর Vintage Love Postcard। পছন্দের ডিজাইন ও প্রেমের উক্তি নির্বাচন করুন, নিজের লেখা যোগ করুন এবং HD পোস্টকার্ড ডাউনলোড করুন।';

    let nextTitle = baseTitle;
    let nextDesc = baseDesc;

    if (currentPage === 'categories' && selectedCategoryId) {
      const cat = getCategoryById(selectedCategoryId);
      if (cat) {
        nextTitle = `${cat.name[language]} – PostCard World`;
        nextDesc = cat.description[language];
      }
    } else if (currentPage === 'generator') {
      nextTitle = `${translations[language].generator.pageTitle} – PostCard World`;
    } else if (currentPage === 'gallery') {
      nextTitle = `${translations[language].galleryPage.title} – PostCard World`;
    } else if (currentPage === 'quotes') {
      nextTitle = `${translations[language].quotesPage.title} – PostCard World`;
    } else if (currentPage === 'postcards') {
      nextTitle = `${translations[language].postcardsPage.title} – PostCard World`;
    } else if (currentPage === 'favorites') {
      nextTitle = `${translations[language].favoritesPage.title} – PostCard World`;
    }

    document.title = nextTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', nextDesc);
    }
  }, [currentPage, selectedCategoryId, language]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (page !== 'categories') {
      setSelectedCategoryId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'bn' ? 'en' : 'bn';
      // Update default recipient/sender if untouched
      setGeneratorState((gs) => ({
        ...gs,
        recipient:
          gs.recipient === translations[prev].generator.recipientDefault
            ? translations[next].generator.recipientDefault
            : gs.recipient,
        sender:
          gs.sender === translations[prev].generator.senderDefault
            ? translations[next].generator.senderDefault
            : gs.sender,
      }));
      return next;
    });
  };

  const toggleFavorite = (
    bucket: keyof FavoritesState,
    id: string
  ) => {
    setFavorites((prev) => {
      const exists = prev[bucket].includes(id);
      return {
        ...prev,
        [bucket]: exists
          ? prev[bucket].filter((item) => item !== id)
          : [...prev[bucket], id],
      };
    });
  };

  const handleUseTemplate = (tpl: PostcardTemplate) => {
    setGeneratorState((prev) => ({
      ...prev,
      templateId: tpl.id,
      quoteText: language === 'bn' ? tpl.defaultQuote : tpl.defaultQuoteEn,
      vintageEffect: tpl.style.vintageEffect,
      textStyle: {
        ...prev.textStyle,
        fontStyle: tpl.style.fontStyle,
        textColor: tpl.style.textColor,
        textPosition: tpl.style.textPosition,
      },
    }));
    handleNavigate('generator');
  };

  const handleUseQuote = (quote: QuoteItem) => {
    setGeneratorState((prev) => ({
      ...prev,
      quoteText: language === 'bn' ? quote.text : quote.textEn,
    }));
    handleNavigate('generator');
  };

  const handleSelectCategory = (catId: string | null) => {
    setSelectedCategoryId(catId);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmDownload = async () => {
    if (!downloadTarget) return;
    if (downloadTarget.type === 'postcard') {
      const activeTpl =
        postcards.find((p) => p.id === generatorState.templateId) ||
        postcards[0];
      await exportCustomPostcard(activeTpl, generatorState);
    } else if (downloadTarget.type === 'gallery') {
      await exportGalleryArtwork(downloadTarget.item, 'png');
    }
  };

  const totalFavorites =
    favorites.postcards.length +
    favorites.quotes.length +
    favorites.gallery.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0E0B09] text-[#F5ECD8] vintage-grain-bg">
      <Navbar
        currentPage={currentPage}
        language={language}
        favoritesCount={totalFavorites}
        onNavigate={handleNavigate}
        onToggleLanguage={handleToggleLanguage}
      />

      <main className="flex-1">
        {currentPage !== 'generator' && (
          <GlobalSearchBar
            language={language}
            favorites={favorites}
            onTogglePostcardFav={(id) => toggleFavorite('postcards', id)}
            onToggleQuoteFav={(id) => toggleFavorite('quotes', id)}
            onToggleGalleryFav={(id) => toggleFavorite('gallery', id)}
            onUseTemplate={handleUseTemplate}
            onUseQuote={handleUseQuote}
            onSelectCategory={(catId) => handleSelectCategory(catId)}
            onViewGallery={(item) => {
              setViewingGalleryItem(item);
              setCurrentPage('gallery');
            }}
            onDownloadGallery={(item) =>
              setDownloadTarget({ type: 'gallery', item })
            }
          />
        )}

        {currentPage === 'home' && (
          <HomePage
            language={language}
            favorites={favorites.postcards}
            onToggleFavorite={(id) => toggleFavorite('postcards', id)}
            onUseTemplate={handleUseTemplate}
            onNavigate={handleNavigate}
            onSelectCategory={(catId) => handleSelectCategory(catId)}
          />
        )}

        {currentPage === 'postcards' && (
          <PostcardsPage
            language={language}
            favorites={favorites.postcards}
            onToggleFavorite={(id) => toggleFavorite('postcards', id)}
            onUseTemplate={handleUseTemplate}
          />
        )}

        {currentPage === 'quotes' && (
          <QuotesPage
            language={language}
            favorites={favorites.quotes}
            onToggleFavorite={(id) => toggleFavorite('quotes', id)}
            onUseQuote={handleUseQuote}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            language={language}
            favorites={favorites.gallery}
            onToggleFavorite={(id) => toggleFavorite('gallery', id)}
            onDownloadGallery={(item) =>
              setDownloadTarget({ type: 'gallery', item })
            }
            viewingItem={viewingGalleryItem}
            onChangeViewingItem={setViewingGalleryItem}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            language={language}
            selectedCategoryId={selectedCategoryId}
            favorites={favorites}
            onSelectCategory={handleSelectCategory}
            onTogglePostcardFav={(id) => toggleFavorite('postcards', id)}
            onToggleQuoteFav={(id) => toggleFavorite('quotes', id)}
            onToggleGalleryFav={(id) => toggleFavorite('gallery', id)}
            onUseTemplate={handleUseTemplate}
            onUseQuote={handleUseQuote}
            onViewGallery={(item) => {
              setViewingGalleryItem(item);
              setCurrentPage('gallery');
            }}
            onDownloadGallery={(item) =>
              setDownloadTarget({ type: 'gallery', item })
            }
          />
        )}

        {currentPage === 'favorites' && (
          <FavoritesPage
            language={language}
            favorites={favorites}
            onTogglePostcardFav={(id) => toggleFavorite('postcards', id)}
            onToggleQuoteFav={(id) => toggleFavorite('quotes', id)}
            onToggleGalleryFav={(id) => toggleFavorite('gallery', id)}
            onUseTemplate={handleUseTemplate}
            onUseQuote={handleUseQuote}
            onViewGallery={(item) => {
              setViewingGalleryItem(item);
              setCurrentPage('gallery');
            }}
            onDownloadGallery={(item) =>
              setDownloadTarget({ type: 'gallery', item })
            }
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'generator' && (
          <GeneratorPage
            language={language}
            state={generatorState}
            onChangeState={setGeneratorState}
            onTriggerDownload={() => setDownloadTarget({ type: 'postcard' })}
          />
        )}
      </main>

      <Footer language={language} onNavigate={handleNavigate} />

      <DownloadGateModal
        isOpen={downloadTarget !== null}
        language={language}
        onClose={() => setDownloadTarget(null)}
        onConfirmDownload={handleConfirmDownload}
      />
    </div>
  );
}
