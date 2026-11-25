import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Language, PageRoute } from '../types/postcard';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentPage: PageRoute;
  language: Language;
  favoritesCount: number;
  onNavigate: (page: PageRoute) => void;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  language,
  favoritesCount,
  onNavigate,
  onToggleLanguage,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[language];

  const navItems: Array<{ id: PageRoute; label: string }> = [
    { id: 'home', label: t.nav.home },
    { id: 'postcards', label: t.nav.postcards },
    { id: 'quotes', label: t.nav.quotes },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'categories', label: t.nav.categories },
    { id: 'favorites', label: t.nav.favorites },
  ];

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E0B09]/92 backdrop-blur-md border-b border-[#C8A25A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#F5ECD8] whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer hover:text-[#E3BA73] transition-colors"
        >
          <span aria-hidden="true">💌</span>
          <span>PostCard World</span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#E3BA73]'
                    : 'text-[#D6C7AE] hover:text-[#F5ECD8]'
                }`}
              >
                {item.id === 'favorites' && (
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      favoritesCount > 0 ? 'fill-[#9B2A2F] text-[#9B2A2F]' : ''
                    }`}
                  />
                )}
                <span>{item.label}</span>
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className="text-xs text-[#C8A25A] tabular-nums">
                    ({favoritesCount})
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#C8A25A]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label="Switch language"
            className="min-h-[38px] px-3 py-1.5 rounded-md border border-[#C8A25A]/30 bg-[#17120E] hover:border-[#C8A25A]/60 text-xs font-semibold tracking-wider text-[#E3BA73] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            {language === 'bn' ? 'BN / EN' : 'EN / BN'}
          </button>

          <button
            type="button"
            onClick={() => handleNav('generator')}
            className="hidden sm:inline-flex min-h-[40px] px-4 py-2 rounded-md bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 border border-[#C8A25A]/35 transition-colors cursor-pointer"
          >
            {t.nav.createPostcard}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={mobileOpen}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-[#C8A25A]/25 bg-[#17120E] text-[#F5ECD8] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#C8A25A]/20 bg-[#130E0B] px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full min-h-[44px] px-3.5 rounded-lg text-left text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#201914] text-[#E3BA73] border border-[#C8A25A]/30'
                    : 'text-[#D6C7AE] hover:bg-[#1A1410] hover:text-[#F5ECD8]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className="text-xs text-[#C8A25A] tabular-nums">
                    {favoritesCount}
                  </span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNav('generator')}
            className="w-full min-h-[46px] mt-2 px-4 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm font-semibold text-center border border-[#C8A25A]/35 cursor-pointer"
          >
            {t.nav.createPostcard}
          </button>
        </div>
      )}
    </header>
  );
};
