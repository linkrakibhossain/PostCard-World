import React, { useEffect, useState } from 'react';
import { Eye, Lock, Download, CheckCircle2, X, Loader2 } from 'lucide-react';
import { GATE_SECONDS, SPONSOR_URL } from '../config/downloadGate';
import { Language } from '../types/postcard';
import { translations } from '../i18n/translations';

interface DownloadGateModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onConfirmDownload: () => Promise<void>;
}

type GatePhase = 'initial' | 'counting' | 'ready' | 'downloading';

export const DownloadGateModal: React.FC<DownloadGateModalProps> = ({
  isOpen,
  language,
  onClose,
  onConfirmDownload,
}) => {
  const t = translations[language].downloadGate;
  const [phase, setPhase] = useState<GatePhase>('initial');
  const [secondsLeft, setSecondsLeft] = useState<number>(GATE_SECONDS);

  // Reset gate state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('initial');
      setSecondsLeft(GATE_SECONDS);
    }
  }, [isOpen]);

  // Countdown timer once sponsor button is clicked
  useEffect(() => {
    if (!isOpen || phase !== 'counting') return;

    if (secondsLeft <= 0) {
      setPhase('ready');
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhase('ready');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isOpen, phase, secondsLeft]);

  if (!isOpen) return null;

  const handleVisitSponsor = () => {
    window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
    if (phase === 'initial') {
      setSecondsLeft(GATE_SECONDS);
      setPhase('counting');
    }
  };

  const handleDownloadNow = async () => {
    if (phase !== 'ready') return;
    setPhase('downloading');
    try {
      await onConfirmDownload();
      onClose();
    } catch {
      setPhase('ready');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-gate-title"
    >
      <div className="relative w-full max-w-md rounded-xl bg-[#16110D] border border-[#C8A25A]/45 shadow-2xl p-6 sm:p-8 text-[#F5ECD8]">
        {/* Decorative inner hairline */}
        <div className="absolute inset-2.5 rounded-lg border border-[#C8A25A]/15 pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label={t.cancelBtn}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg text-[#B8A890] hover:text-[#F5ECD8] hover:bg-[#241B15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wax seal ornament */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#7C1D26]/30 border border-[#C8A25A]/50 flex items-center justify-center text-xl mb-4">
            💌
          </div>

          <h2
            id="download-gate-title"
            className="font-editorial text-xl sm:text-2xl font-bold text-[#F5ECD8] mb-2"
          >
            {t.title}
          </h2>

          <p className="text-sm text-[#B8A890] mb-6 leading-relaxed max-w-sm">
            {t.description}
          </p>

          {/* Sponsor Action Button */}
          <button
            type="button"
            onClick={handleVisitSponsor}
            className="w-full min-h-[46px] px-5 py-3 rounded-lg bg-[#7C1D26] hover:bg-[#96242F] text-[#F5ECD8] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors border border-[#C8A25A]/40 cursor-pointer shadow-lg"
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span>{t.visitSponsorBtn}</span>
          </button>

          {/* Countdown or Ready State */}
          <div className="w-full mt-5 p-4 rounded-lg bg-[#0E0B09] border border-[#C8A25A]/25">
            {phase === 'initial' && (
              <p className="text-xs text-[#B8A890] leading-relaxed">
                {t.stepNote}
              </p>
            )}

            {phase === 'counting' && (
              <div className="flex flex-col items-center">
                <p className="text-xs text-[#C8A25A] mb-2">
                  {t.sponsorOpenedNote}
                </p>
                <div
                  className="font-editorial text-4xl sm:text-5xl font-bold text-[#E3BA73] tabular-nums my-1"
                  aria-live="polite"
                >
                  {secondsLeft}
                </div>
                <p className="text-xs text-[#B8A890] mt-1">{t.preparingText}</p>
              </div>
            )}

            {(phase === 'ready' || phase === 'downloading') && (
              <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm font-semibold py-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.readyBadge}</span>
              </div>
            )}
          </div>

          {/* Locked / Download Now Button */}
          <div className="w-full mt-4">
            {phase === 'ready' || phase === 'downloading' ? (
              <button
                type="button"
                onClick={handleDownloadNow}
                disabled={phase === 'downloading'}
                className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#C8A25A] hover:bg-[#D8B46E] text-[#140E0A] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
              >
                {phase === 'downloading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.downloadingText}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 shrink-0" />
                    <span>{t.downloadNowBtn}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#241B15] text-[#8F7F6A] border border-[#C8A25A]/15 font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>{t.lockedBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
