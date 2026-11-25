import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language, PageRoute } from '../types/postcard';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageRoute) => void;
}

type InfoModalType = 'privacy' | 'terms' | 'contact' | null;

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language];
  const [modal, setModal] = useState<InfoModalType>(null);

  const modalTitle =
    modal === 'privacy'
      ? t.footer.privacy
      : modal === 'terms'
        ? t.footer.terms
        : t.footer.contact;

  const modalBody =
    modal === 'privacy'
      ? t.footer.privacyBody
      : modal === 'terms'
        ? t.footer.termsBody
        : t.footer.contactBody;

  return (
    <>
      <footer className="border-t border-[#C8A25A]/20 bg-[#0B0807] text-[#B8A890] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-editorial text-xl font-bold text-[#F5ECD8] flex items-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">💌</span>
              <span>PostCard World</span>
            </button>
            <p className="mt-3 text-sm text-[#B8A890] leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] font-semibold mb-4">
              {t.footer.linksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('postcards')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.nav.postcards}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quotes')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.nav.quotes}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C8A25A] font-semibold mb-4">
              {t.footer.legalTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setModal('privacy')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModal('terms')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModal('contact')}
                  className="hover:text-[#F5ECD8] transition-colors cursor-pointer"
                >
                  {t.footer.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C8A25A]/15 py-5 px-4 sm:px-6 text-center text-xs text-[#8E7E68]">
          {t.footer.copyright}
        </div>
      </footer>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-xl bg-[#16110D] border border-[#C8A25A]/35 p-6 text-[#F5ECD8] shadow-2xl">
            <button
              type="button"
              onClick={() => setModal(null)}
              aria-label={t.footer.close}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-lg text-[#B8A890] hover:text-[#F5ECD8] hover:bg-[#241B15] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-editorial text-xl font-bold text-[#E3BA73] mb-3">
              {modalTitle}
            </h3>
            <p className="text-sm text-[#D6C7AE] leading-relaxed mb-6">
              {modalBody}
            </p>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="min-h-[40px] px-4 py-2 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-sm font-medium text-[#F5ECD8] cursor-pointer"
            >
              {t.footer.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
