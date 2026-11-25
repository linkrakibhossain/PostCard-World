import React, { useMemo, useState } from 'react';
import {
  Shuffle,
  Download,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
} from 'lucide-react';
import {
  ExportFormat,
  ExportSizeId,
  FontStyleId,
  GeneratorState,
  Language,
  PostcardTemplate,
  TextCustomization,
  TextPosition,
  VintageEffectId,
} from '../types/postcard';
import { translations } from '../i18n/translations';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import {
  exportSizeSpecs,
  textColorSwatches,
} from '../data/styleOptions';
import { PostcardPreviewFrame } from '../components/PostcardPreviewFrame';
import { VintageArtworkLayer } from '../components/VintageArtworkLayer';

interface GeneratorPageProps {
  language: Language;
  state: GeneratorState;
  onChangeState: React.Dispatch<React.SetStateAction<GeneratorState>>;
  onTriggerDownload: () => void;
}

const FONT_IDS: FontStyleId[] = [
  'elegant-bengali',
  'handwritten',
  'vintage-serif',
  'typewriter',
  'classic',
  'calligraphy',
  'old-newspaper',
];

const VINTAGE_EFFECT_IDS: VintageEffectId[] = [
  'original',
  'sepia',
  'old-paper',
  'faded',
  'bw',
  'film-grain',
  'dust',
  'scratch',
  'coffee-stain',
  'warm-vintage',
];

const EXPORT_SIZE_IDS: ExportSizeId[] = [
  'postcard',
  'ig-square',
  'ig-story',
  'fb-post',
  'wa-status',
];

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  language,
  state,
  onChangeState,
  onTriggerDownload,
}) => {
  const t = translations[language];
  const [templateCatFilter, setTemplateCatFilter] = useState<string>('all');
  const [quoteCatFilter, setQuoteCatFilter] = useState<string>('all');
  const [customDraftText, setCustomDraftText] = useState<string>('');

  const activeTemplate: PostcardTemplate = useMemo(
    () => postcards.find((p) => p.id === state.templateId) || postcards[0],
    [state.templateId]
  );

  const filteredTemplates = useMemo(
    () =>
      postcards.filter(
        (p) => templateCatFilter === 'all' || p.category === templateCatFilter
      ),
    [templateCatFilter]
  );

  const filteredQuotes = useMemo(
    () =>
      quotes.filter(
        (q) => quoteCatFilter === 'all' || q.category === quoteCatFilter
      ),
    [quoteCatFilter]
  );

  const updateTextStyle = (patch: Partial<TextCustomization>) => {
    onChangeState((prev) => ({
      ...prev,
      textStyle: { ...prev.textStyle, ...patch },
    }));
  };

  const handleSelectTemplate = (tpl: PostcardTemplate) => {
    onChangeState((prev) => ({
      ...prev,
      templateId: tpl.id,
      vintageEffect: tpl.style.vintageEffect,
      textStyle: {
        ...prev.textStyle,
        fontStyle: tpl.style.fontStyle,
        textColor: tpl.style.textColor,
        textPosition: tpl.style.textPosition,
      },
    }));
  };

  const handleSelectQuote = (quoteText: string) => {
    onChangeState((prev) => ({
      ...prev,
      quoteText,
    }));
  };

  const handleApplyOwnText = () => {
    if (!customDraftText.trim()) return;
    onChangeState((prev) => ({
      ...prev,
      quoteText: customDraftText.trim(),
    }));
  };

  const handleSurpriseMe = () => {
    const randomTpl =
      postcards[Math.floor(Math.random() * postcards.length)];
    const matchingQuotes = quotes.filter(
      (q) => q.category === randomTpl.category
    );
    const pool = matchingQuotes.length > 0 ? matchingQuotes : quotes;
    const randomQuote = pool[Math.floor(Math.random() * pool.length)];
    const randomFont = FONT_IDS[Math.floor(Math.random() * FONT_IDS.length)];

    onChangeState((prev) => ({
      ...prev,
      templateId: randomTpl.id,
      quoteText: language === 'bn' ? randomQuote.text : randomQuote.textEn,
      vintageEffect: randomTpl.style.vintageEffect,
      textStyle: {
        ...prev.textStyle,
        fontStyle: randomFont,
        textColor: randomTpl.style.textColor,
        textPosition: randomTpl.style.textPosition,
      },
    }));
  };

  const handleResetTextStyle = () => {
    updateTextStyle({
      fontStyle: activeTemplate.style.fontStyle,
      fontSize: 22,
      bold: false,
      italic: false,
      align: 'center',
      letterSpacing: 0,
      lineHeight: 1.6,
      textColor: activeTemplate.style.textColor,
      textPosition: activeTemplate.style.textPosition,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 lg:pb-12">
      {/* Page Header + Surprise Me */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C8A25A]/20 pb-5 mb-8">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5ECD8]">
            {t.generator.pageTitle}
          </h1>
          <p className="mt-1.5 text-sm text-[#B8A890]">
            {t.generator.pageSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSurpriseMe}
          className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1F1712] hover:bg-[#2A1F18] text-[#E3BA73] text-sm font-semibold border border-[#C8A25A]/45 flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Shuffle className="w-4 h-4" />
          <span>{t.generator.surpriseMe}</span>
        </button>
      </div>

      {/* Main Responsive Split: Preview + Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Live Preview Column */}
        <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#C8A25A]">
            <span className="uppercase tracking-widest font-semibold">
              {t.generator.livePreviewLabel}
            </span>
            <span className="tabular-nums text-[#9E8F79]">
              {t.exportSizes[state.exportSize]}
            </span>
          </div>

          <div className="rounded-xl bg-[#120D0A] border border-[#C8A25A]/25 p-3 sm:p-5 flex items-center justify-center">
            <div
              className={`w-full ${
                state.exportSize === 'ig-story' ||
                state.exportSize === 'wa-status'
                  ? 'max-w-[300px] sm:max-w-[330px]'
                  : state.exportSize === 'ig-square'
                    ? 'max-w-[440px]'
                    : 'max-w-full'
              }`}
            >
              <PostcardPreviewFrame
                template={activeTemplate}
                recipient={state.recipient}
                quoteText={state.quoteText}
                sender={state.sender}
                dateText={state.dateText}
                textStyle={state.textStyle}
                vintageEffect={state.vintageEffect}
                exportSize={state.exportSize}
              />
            </div>
          </div>

          {/* Desktop Download Action */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex rounded-lg bg-[#16110D] border border-[#C8A25A]/30 p-1 shrink-0">
              {(['png', 'jpg'] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() =>
                    onChangeState((prev) => ({ ...prev, exportFormat: fmt }))
                  }
                  className={`min-h-[38px] px-3 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    state.exportFormat === fmt
                      ? 'bg-[#C8A25A] text-[#140E0A]'
                      : 'text-[#D6C7AE] hover:text-[#F5ECD8]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onTriggerDownload}
              className="flex-1 min-h-[48px] px-6 py-3 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-base font-semibold border border-[#C8A25A]/45 flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{t.generator.downloadHdBtn}</span>
            </button>
          </div>
        </div>

        {/* Customization Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Select Postcard Template */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
                {t.generator.step1Title}
              </h2>
              <select
                value={templateCatFilter}
                onChange={(e) => setTemplateCatFilter(e.target.value)}
                aria-label={t.generator.step1Title}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 text-xs text-[#F5ECD8] focus:outline-none focus:border-[#C8A25A]"
              >
                <option value="all">{t.generator.allTemplatesOption}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {filteredTemplates.map((tpl) => {
                const isSelected = tpl.id === activeTemplate.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`group relative aspect-[3/2] rounded-md overflow-hidden border-2 transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-[#E3BA73] ring-2 ring-[#E3BA73]/30'
                        : 'border-[#C8A25A]/20 hover:border-[#C8A25A]/55'
                    }`}
                    title={tpl.title[language]}
                  >
                    <VintageArtworkLayer
                      image={tpl.image}
                      alt={tpl.title[language]}
                      palette={tpl.style.palette}
                      motif={tpl.style.motif}
                      vintageEffect={tpl.style.vintageEffect}
                      compact
                    />
                    <span className="relative z-10 block px-1.5 py-1 text-[10px] font-medium text-[#F5ECD8] bg-gradient-to-t from-black/85 to-transparent absolute bottom-0 inset-x-0 truncate">
                      {tpl.title[language]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Select Quote OR Write Your Own */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
                {t.generator.step2Title}
              </h2>
              <select
                value={quoteCatFilter}
                onChange={(e) => setQuoteCatFilter(e.target.value)}
                aria-label={t.generator.step2Title}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 text-xs text-[#F5ECD8] focus:outline-none focus:border-[#C8A25A]"
              >
                <option value="all">{t.generator.allQuotesOption}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {filteredQuotes.map((q) => {
                const quoteStr = language === 'bn' ? q.text : q.textEn;
                const isSelected = state.quoteText === quoteStr;
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'bg-[#231914] border-[#C8A25A]/60'
                        : 'bg-[#0E0B09]/70 border-[#C8A25A]/15 hover:border-[#C8A25A]/35'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-[#EDE2CE] leading-relaxed line-clamp-2">
                      {quoteStr}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectQuote(quoteStr)}
                      className="min-h-[36px] px-3 py-1.5 rounded-md bg-[#7C1D26] hover:bg-[#96242F] text-xs font-semibold text-[#F5ECD8] shrink-0 cursor-pointer whitespace-nowrap"
                    >
                      {t.cards.useQuote}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Write Your Own Textarea */}
            <div className="pt-4 border-t border-[#C8A25A]/15 space-y-3">
              <h3 className="text-sm font-semibold text-[#E3BA73]">
                {t.generator.ownTextHeading}
              </h3>
              <textarea
                rows={3}
                value={customDraftText}
                onChange={(e) => setCustomDraftText(e.target.value)}
                placeholder={t.generator.ownTextPlaceholder}
                className="w-full p-3 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8] placeholder:text-[#8E7E68]"
              />
              <button
                type="button"
                onClick={handleApplyOwnText}
                className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1F1712] hover:bg-[#2C2019] text-sm font-semibold text-[#E3BA73] border border-[#C8A25A]/40 cursor-pointer transition-colors"
              >
                {t.generator.applyOwnText}
              </button>
            </div>
          </section>

          {/* Step 3: Recipient, Main Quote Live Field, Sender, Optional Date */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-4">
            <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
              {t.generator.fieldsHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.recipientLabel}
                </label>
                <input
                  type="text"
                  value={state.recipient}
                  onChange={(e) =>
                    onChangeState((prev) => ({
                      ...prev,
                      recipient: e.target.value,
                    }))
                  }
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.senderLabel}
                </label>
                <input
                  type="text"
                  value={state.sender}
                  onChange={(e) =>
                    onChangeState((prev) => ({
                      ...prev,
                      sender: e.target.value,
                    }))
                  }
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#B8A890] mb-1.5">
                {t.generator.mainTextLabel}
              </label>
              <textarea
                rows={3}
                value={state.quoteText}
                onChange={(e) =>
                  onChangeState((prev) => ({
                    ...prev,
                    quoteText: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#B8A890] mb-1.5">
                {t.generator.dateLabel}
              </label>
              <input
                type="text"
                value={state.dateText}
                onChange={(e) =>
                  onChangeState((prev) => ({
                    ...prev,
                    dateText: e.target.value,
                  }))
                }
                placeholder={t.generator.datePlaceholder}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 focus:border-[#C8A25A] focus:outline-none text-sm text-[#F5ECD8] placeholder:text-[#7E6F5B]"
              />
            </div>
          </section>

          {/* Step 4: Simple Text Customization */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
                {t.generator.customizeHeading}
              </h2>
              <button
                type="button"
                onClick={handleResetTextStyle}
                className="min-h-[36px] px-3 rounded-lg border border-[#C8A25A]/25 text-xs text-[#C8A25A] hover:text-[#F5ECD8] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.generator.resetTextStyle}</span>
              </button>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs text-[#B8A890] mb-1.5">
                {t.generator.fontFamily}
              </label>
              <select
                value={state.textStyle.fontStyle}
                onChange={(e) =>
                  updateTextStyle({ fontStyle: e.target.value as FontStyleId })
                }
                className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 text-sm text-[#F5ECD8] focus:outline-none focus:border-[#C8A25A]"
              >
                {FONT_IDS.map((fid) => (
                  <option key={fid} value={fid}>
                    {t.fonts[fid]}
                  </option>
                ))}
              </select>
            </div>

            {/* Bold / Italic / Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.bold} / {t.generator.italic}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateTextStyle({ bold: !state.textStyle.bold })
                    }
                    className={`flex-1 min-h-[44px] rounded-lg border flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer ${
                      state.textStyle.bold
                        ? 'bg-[#7C1D26] border-[#C8A25A]/50 text-[#F5ECD8]'
                        : 'bg-[#0E0B09] border-[#C8A25A]/25 text-[#D6C7AE]'
                    }`}
                  >
                    <Bold className="w-4 h-4" />
                    <span>{t.generator.bold}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateTextStyle({ italic: !state.textStyle.italic })
                    }
                    className={`flex-1 min-h-[44px] rounded-lg border flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer ${
                      state.textStyle.italic
                        ? 'bg-[#7C1D26] border-[#C8A25A]/50 text-[#F5ECD8]'
                        : 'bg-[#0E0B09] border-[#C8A25A]/25 text-[#D6C7AE]'
                    }`}
                  >
                    <Italic className="w-4 h-4" />
                    <span>{t.generator.italic}</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.alignment}
                </span>
                <div className="flex gap-2">
                  {(
                    [
                      { id: 'left', icon: AlignLeft, label: t.generator.alignLeft },
                      { id: 'center', icon: AlignCenter, label: t.generator.alignCenter },
                      { id: 'right', icon: AlignRight, label: t.generator.alignRight },
                    ] as const
                  ).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateTextStyle({ align: item.id })}
                        aria-label={item.label}
                        className={`flex-1 min-h-[44px] rounded-lg border flex items-center justify-center cursor-pointer ${
                          state.textStyle.align === item.id
                            ? 'bg-[#7C1D26] border-[#C8A25A]/50 text-[#F5ECD8]'
                            : 'bg-[#0E0B09] border-[#C8A25A]/25 text-[#D6C7AE]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sliders: Font Size, Letter Spacing, Line Height */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs text-[#B8A890] mb-1">
                  <span>{t.generator.fontSize}</span>
                  <span className="tabular-nums text-[#E3BA73]">
                    {state.textStyle.fontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={34}
                  step={1}
                  value={state.textStyle.fontSize}
                  onChange={(e) =>
                    updateTextStyle({ fontSize: Number(e.target.value) })
                  }
                  className="w-full accent-[#C8A25A] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#B8A890] mb-1">
                  <span>{t.generator.letterSpacing}</span>
                  <span className="tabular-nums text-[#E3BA73]">
                    {state.textStyle.letterSpacing}px
                  </span>
                </div>
                <input
                  type="range"
                  min={-1}
                  max={4}
                  step={0.5}
                  value={state.textStyle.letterSpacing}
                  onChange={(e) =>
                    updateTextStyle({ letterSpacing: Number(e.target.value) })
                  }
                  className="w-full accent-[#C8A25A] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#B8A890] mb-1">
                  <span>{t.generator.lineHeight}</span>
                  <span className="tabular-nums text-[#E3BA73]">
                    {state.textStyle.lineHeight}
                  </span>
                </div>
                <input
                  type="range"
                  min={1.2}
                  max={2.1}
                  step={0.1}
                  value={state.textStyle.lineHeight}
                  onChange={(e) =>
                    updateTextStyle({ lineHeight: Number(e.target.value) })
                  }
                  className="w-full accent-[#C8A25A] cursor-pointer"
                />
              </div>
            </div>

            {/* Text Position & Text Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <span className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.textPosition}
                </span>
                <div className="flex gap-2">
                  {(
                    [
                      { id: 'top', label: t.generator.posTop },
                      { id: 'center', label: t.generator.posCenter },
                      { id: 'bottom', label: t.generator.posBottom },
                    ] as Array<{ id: TextPosition; label: string }>
                  ).map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => updateTextStyle({ textPosition: pos.id })}
                      className={`flex-1 min-h-[42px] px-2 rounded-lg border text-xs font-medium cursor-pointer ${
                        state.textStyle.textPosition === pos.id
                          ? 'bg-[#7C1D26] border-[#C8A25A]/50 text-[#F5ECD8]'
                          : 'bg-[#0E0B09] border-[#C8A25A]/25 text-[#D6C7AE]'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs text-[#B8A890] mb-1.5">
                  {t.generator.textColor}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {textColorSwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => updateTextStyle({ textColor: swatch.hex })}
                      aria-label={swatch.label}
                      title={swatch.label}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${
                        state.textStyle.textColor.toLowerCase() ===
                        swatch.hex.toLowerCase()
                          ? 'border-[#E3BA73] scale-110'
                          : 'border-[#C8A25A]/30'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  ))}
                  <input
                    type="color"
                    value={state.textStyle.textColor}
                    onChange={(e) =>
                      updateTextStyle({ textColor: e.target.value })
                    }
                    aria-label={t.generator.textColor}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border border-[#C8A25A]/30"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Vintage Effects */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-3">
            <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
              {t.generator.vintageEffectsHeading}
            </h2>
            <div className="flex flex-wrap gap-2">
              {VINTAGE_EFFECT_IDS.map((effId) => (
                <button
                  key={effId}
                  type="button"
                  onClick={() =>
                    onChangeState((prev) => ({ ...prev, vintageEffect: effId }))
                  }
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    state.vintageEffect === effId
                      ? 'bg-[#7C1D26] text-[#F5ECD8] border-[#C8A25A]/55'
                      : 'bg-[#0E0B09] text-[#D6C7AE] border-[#C8A25A]/20 hover:border-[#C8A25A]/45'
                  }`}
                >
                  {t.effects[effId]}
                </button>
              ))}
            </div>
          </section>

          {/* Step 6: Export Size & Format */}
          <section className="rounded-xl bg-[#16110D] border border-[#C8A25A]/20 p-5 space-y-4">
            <h2 className="font-editorial text-lg font-bold text-[#F5ECD8]">
              {t.generator.exportSizeHeading}
            </h2>
            <div className="flex flex-wrap gap-2">
              {EXPORT_SIZE_IDS.map((szId) => (
                <button
                  key={szId}
                  type="button"
                  onClick={() =>
                    onChangeState((prev) => ({ ...prev, exportSize: szId }))
                  }
                  className={`min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    state.exportSize === szId
                      ? 'bg-[#7C1D26] text-[#F5ECD8] border-[#C8A25A]/55'
                      : 'bg-[#0E0B09] text-[#D6C7AE] border-[#C8A25A]/20 hover:border-[#C8A25A]/45'
                  }`}
                >
                  {t.exportSizes[szId]} · {exportSizeSpecs[szId].ratioLabel}
                </button>
              ))}
            </div>

            <div className="lg:hidden flex items-center justify-between pt-2 border-t border-[#C8A25A]/15">
              <span className="text-xs text-[#B8A890]">
                {t.generator.exportFormatHeading}
              </span>
              <div className="flex rounded-lg bg-[#0E0B09] border border-[#C8A25A]/30 p-1">
                {(['png', 'jpg'] as ExportFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() =>
                      onChangeState((prev) => ({ ...prev, exportFormat: fmt }))
                    }
                    className={`min-h-[36px] px-3 rounded-md text-xs font-semibold uppercase cursor-pointer ${
                      state.exportFormat === fmt
                        ? 'bg-[#C8A25A] text-[#140E0A]'
                        : 'text-[#D6C7AE]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Sticky Download Bar (<= 15% mobile viewport height) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0E0B09]/95 backdrop-blur-md border-t border-[#C8A25A]/30 px-4 py-2.5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onTriggerDownload}
          className="w-full min-h-[46px] px-5 py-2.5 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] text-sm font-semibold border border-[#C8A25A]/45 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>{t.generator.downloadHdBtn}</span>
        </button>
      </div>
    </div>
  );
};
