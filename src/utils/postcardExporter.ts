import {
  ArtworkMotif,
  ArtworkPalette,
  BorderStyle,
  ExportFormat,
  ExportSizeId,
  GalleryItem,
  GeneratorState,
  PostcardTemplate,
  VintageEffectId,
} from '../types/postcard';
import {
  exportSizeSpecs,
  fontStyleMap,
  vintageEffectMeta,
} from '../data/styleOptions';

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawMotifOnCanvas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  motif: ArtworkMotif,
  accent: string
) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.28;
  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w / 400, h / 260) * 0.86;
  ctx.translate(cx - 200 * scale, cy - 130 * scale);
  ctx.scale(scale, scale);
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (motif) {
    case 'wax-envelope':
    case 'love-letter': {
      ctx.strokeRect(65, 55, 270, 150);
      ctx.beginPath();
      ctx.moveTo(65, 55);
      ctx.lineTo(200, 148);
      ctx.lineTo(335, 55);
      ctx.moveTo(65, 205);
      ctx.lineTo(160, 125);
      ctx.moveTo(335, 205);
      ctx.lineTo(240, 125);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(200, 148, 18, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case 'rainy-window':
    case 'teardrop-window': {
      ctx.beginPath();
      ctx.roundRect(90, 25, 220, 210, 110);
      ctx.moveTo(200, 25);
      ctx.lineTo(200, 235);
      ctx.moveTo(90, 135);
      ctx.lineTo(310, 135);
      ctx.stroke();
      const drops = [
        [130, 65, 118, 95],
        [165, 48, 150, 86],
        [235, 60, 222, 96],
        [270, 80, 255, 118],
        [145, 160, 132, 198],
        [255, 155, 240, 196],
      ];
      drops.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
      break;
    }
    case 'umbrella-lane': {
      ctx.beginPath();
      ctx.moveTo(125, 135);
      ctx.bezierCurveTo(125, 78, 275, 78, 275, 135);
      ctx.quadraticCurveTo(238, 122, 200, 135);
      ctx.quadraticCurveTo(162, 122, 125, 135);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 84);
      ctx.lineTo(200, 205);
      ctx.bezierCurveTo(200, 218, 216, 218, 216, 205);
      ctx.stroke();
      break;
    }
    case 'vintage-rose':
    case 'crimson-valentine': {
      ctx.beginPath();
      ctx.arc(200, 108, 44, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(200, 106, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 140);
      ctx.lineTo(200, 225);
      ctx.stroke();
      break;
    }
    case 'moonlit-night':
    case 'distant-horizon': {
      ctx.beginPath();
      ctx.arc(210, 92, 42, 0.4, Math.PI * 1.75);
      ctx.stroke();
      const stars = [
        [110, 65],
        [145, 42],
        [295, 62],
        [322, 95],
        [92, 112],
      ];
      stars.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.beginPath();
      ctx.moveTo(30, 205);
      ctx.quadraticCurveTo(150, 185, 370, 202);
      ctx.stroke();
      break;
    }
    case 'couple-dusk':
    case 'golden-sunset': {
      ctx.beginPath();
      ctx.arc(200, 138, 56, 0, Math.PI * 2);
      ctx.moveTo(40, 185);
      ctx.lineTo(360, 185);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(182, 144, 11, 0, Math.PI * 2);
      ctx.moveTo(168, 185);
      ctx.lineTo(174, 157);
      ctx.lineTo(190, 157);
      ctx.lineTo(194, 185);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(215, 147, 10, 0, Math.PI * 2);
      ctx.moveTo(204, 185);
      ctx.lineTo(208, 159);
      ctx.lineTo(222, 159);
      ctx.lineTo(228, 185);
      ctx.stroke();
      break;
    }
    case 'railway-station': {
      ctx.beginPath();
      ctx.arc(200, 78, 26, 0, Math.PI * 2);
      ctx.moveTo(200, 62);
      ctx.lineTo(200, 78);
      ctx.lineTo(212, 86);
      ctx.moveTo(35, 215);
      ctx.lineTo(175, 132);
      ctx.moveTo(365, 215);
      ctx.lineTo(225, 132);
      ctx.moveTo(80, 196);
      ctx.lineTo(320, 196);
      ctx.moveTo(115, 175);
      ctx.lineTo(285, 175);
      ctx.stroke();
      break;
    }
    case 'old-cafe':
    case 'warm-coffee': {
      ctx.beginPath();
      ctx.moveTo(145, 130);
      ctx.lineTo(250, 130);
      ctx.lineTo(250, 168);
      ctx.bezierCurveTo(250, 192, 230, 205, 198, 205);
      ctx.bezierCurveTo(165, 205, 145, 192, 145, 168);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(198, 212, 78, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case 'ring-promise': {
      ctx.beginPath();
      ctx.arc(176, 138, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(224, 138, 40, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    default: {
      ctx.beginPath();
      ctx.arc(200, 125, 58, 0, Math.PI * 2);
      ctx.moveTo(75, 195);
      ctx.lineTo(325, 195);
      ctx.stroke();
      break;
    }
  }
  ctx.restore();
}

function drawVintageOverlays(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  effectId: VintageEffectId
) {
  const meta = vintageEffectMeta[effectId];

  // Subtle paper vignette
  const vig = ctx.createRadialGradient(
    w * 0.5,
    h * 0.5,
    Math.min(w, h) * 0.25,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.72
  );
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(6,4,3,0.52)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  if (meta.overlayType === 'paper' || meta.overlayType === 'warm') {
    const warmGrad = ctx.createRadialGradient(
      w * 0.45,
      h * 0.4,
      0,
      w * 0.5,
      h * 0.5,
      w * 0.65
    );
    warmGrad.addColorStop(0, 'rgba(235, 186, 114, 0.16)');
    warmGrad.addColorStop(1, 'rgba(92, 62, 32, 0.14)');
    ctx.fillStyle = warmGrad;
    ctx.fillRect(0, 0, w, h);
  }

  if (meta.overlayType === 'grain') {
    ctx.save();
    for (let i = 0; i < 6500; i++) {
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      const alpha = Math.random() * 0.08;
      ctx.fillStyle =
        i % 2 === 0
          ? `rgba(255,244,225,${alpha})`
          : `rgba(12,8,6,${alpha})`;
      ctx.fillRect(gx, gy, 2.2, 2.2);
    }
    ctx.restore();
  }

  if (meta.overlayType === 'dust') {
    ctx.save();
    for (let i = 0; i < 110; i++) {
      const dx = Math.random() * w;
      const dy = Math.random() * h;
      const r = 0.8 + Math.random() * 2.2;
      ctx.fillStyle = `rgba(245, 236, 216, ${0.18 + Math.random() * 0.35})`;
      ctx.beginPath();
      ctx.arc(dx, dy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (meta.overlayType === 'scratch') {
    ctx.save();
    ctx.strokeStyle = 'rgba(245, 236, 216, 0.14)';
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 16; i++) {
      const sx = Math.random() * w;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + (Math.random() - 0.5) * 18, h);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (meta.overlayType === 'coffee') {
    ctx.save();
    ctx.strokeStyle = 'rgba(138, 86, 44, 0.36)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(w * 0.89, h * 0.88, Math.min(w, h) * 0.13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(98, 56, 24, 0.22)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w * 0.89, h * 0.88, Math.min(w, h) * 0.115, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawBordersAndSeal(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  borderStyle: BorderStyle,
  accent: string,
  postmarkText: string
) {
  ctx.save();
  const pad = Math.round(Math.min(w, h) * 0.045);

  if (borderStyle === 'classic-gold') {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 3;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pad + 14, pad + 14, w - (pad + 14) * 2, h - (pad + 14) * 2);
  } else if (borderStyle === 'double-frame') {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.58;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.strokeRect(pad + 18, pad + 18, w - (pad + 18) * 2, h - (pad + 18) * 2);
  } else if (borderStyle === 'airmail') {
    const stripe = 36;
    for (let x = 0; x < w; x += stripe * 2) {
      ctx.fillStyle = x % (stripe * 4) === 0 ? 'rgba(155, 42, 47, 0.72)' : 'rgba(200, 162, 90, 0.6)';
      ctx.fillRect(x, 0, stripe, 12);
      ctx.fillRect(x, h - 12, stripe, 12);
    }
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
  } else if (borderStyle === 'stamp-edge') {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.setLineDash([12, 10]);
    ctx.lineWidth = 3;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.setLineDash([]);
  } else {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
  }

  // Decorative Postage Stamp & Postmark in top-right
  const stampW = Math.round(Math.min(w, h) * 0.115);
  const stampH = Math.round(stampW * 1.18);
  const stampX = w - pad - 24 - stampW;
  const stampY = pad + 24;

  ctx.globalAlpha = 0.52;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(stampX, stampY, stampW, stampH);
  ctx.globalAlpha = 0.25;
  ctx.strokeRect(stampX + 6, stampY + 6, stampW - 12, stampH - 12);

  // Small heart inside postage stamp
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = accent;
  ctx.font = `${Math.round(stampW * 0.36)}px Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('❦', stampX + stampW / 2, stampY + stampH / 2);

  // Circular postmark
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.arc(stampX - 10, stampY + stampH - 6, stampW * 0.42, 0, Math.PI * 2);
  ctx.stroke();

  // Bottom subtle archive postmark text
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = accent;
  ctx.font = `600 ${Math.round(Math.min(w, h) * 0.017)}px "Courier Prime", monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(postmarkText.toUpperCase(), pad + 26, pad + 42);

  ctx.restore();
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/);
    if (!words[0]) {
      lines.push('');
      continue;
    }
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
  }
  return lines;
}

async function paintBaseScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  image: string,
  palette: ArtworkPalette,
  motif: ArtworkMotif,
  vintageEffect: VintageEffectId
) {
  const loadedImg = await loadImage(image);
  const effectMeta = vintageEffectMeta[vintageEffect];

  // Offscreen scene buffer so ctx.filter applies only to background artwork
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = w;
  bgCanvas.height = h;
  const bgCtx = bgCanvas.getContext('2d');
  if (!bgCtx) return;

  bgCtx.filter = effectMeta.cssFilter === 'none' ? 'none' : effectMeta.cssFilter;

  if (loadedImg) {
    // Cover-crop the image
    const imgRatio = loadedImg.width / loadedImg.height;
    const canvasRatio = w / h;
    let drawW = w;
    let drawH = h;
    let offsetX = 0;
    let offsetY = 0;
    if (imgRatio > canvasRatio) {
      drawW = h * imgRatio;
      offsetX = -(drawW - w) / 2;
    } else {
      drawH = w / imgRatio;
      offsetY = -(drawH - h) / 2;
    }
    bgCtx.drawImage(loadedImg, offsetX, offsetY, drawW, drawH);
  } else {
    const grad = bgCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, palette.bgFrom);
    grad.addColorStop(0.52, palette.bgVia);
    grad.addColorStop(1, palette.bgTo);
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, w, h);

    const glowGrad = bgCtx.createRadialGradient(
      w * 0.72,
      h * 0.28,
      0,
      w * 0.72,
      h * 0.28,
      Math.max(w, h) * 0.55
    );
    glowGrad.addColorStop(0, `${palette.glow}66`);
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = glowGrad;
    bgCtx.fillRect(0, 0, w, h);

    drawMotifOnCanvas(bgCtx, w, h, motif, palette.accent);
  }

  ctx.drawImage(bgCanvas, 0, 0);

  // Scrim for guaranteed contrast
  const scrim = ctx.createLinearGradient(0, 0, 0, h);
  scrim.addColorStop(0, 'rgba(12,8,6,0.28)');
  scrim.addColorStop(0.5, 'rgba(12,8,6,0.42)');
  scrim.addColorStop(1, 'rgba(12,8,6,0.62)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, w, h);

  drawVintageOverlays(ctx, w, h, vintageEffect);
}

export async function exportCustomPostcard(
  template: PostcardTemplate,
  state: GeneratorState
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const sizeSpec = exportSizeSpecs[state.exportSize];
  const scale = sizeSpec.exportScale;
  const w = sizeSpec.logicalWidth * scale;
  const h = sizeSpec.logicalHeight * scale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  await paintBaseScene(
    ctx,
    w,
    h,
    template.image,
    template.style.palette,
    template.style.motif,
    state.vintageEffect
  );

  drawBordersAndSeal(
    ctx,
    w,
    h,
    template.style.borderStyle,
    template.style.palette.accent,
    template.style.postmarkText
  );

  // Typography setup
  const padX = Math.round(w * 0.1);
  const padY = Math.round(h * 0.14);
  const maxTextWidth = w - padX * 2;
  const fontFamily = fontStyleMap[state.textStyle.fontStyle].canvasFamily;
  const baseFontPx = Math.round(state.textStyle.fontSize * scale * 1.15);
  const fontWeight = state.textStyle.bold ? '700' : '400';
  const fontStyle = state.textStyle.italic ? 'italic' : 'normal';

  ctx.save();
  ctx.fillStyle = state.textStyle.textColor;
  ctx.textAlign = state.textStyle.align;
  ctx.textBaseline = 'top';
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${state.textStyle.letterSpacing * scale}px`;
  }

  ctx.font = `${fontStyle} ${fontWeight} ${baseFontPx}px ${fontFamily}`;
  const quoteLines = wrapTextLines(ctx, state.quoteText, maxTextWidth);
  const lineH = Math.round(baseFontPx * state.textStyle.lineHeight);
  const totalQuoteH = quoteLines.length * lineH;

  const metaFontPx = Math.round(baseFontPx * 0.62);
  const recipientGap = state.recipient.trim() ? Math.round(metaFontPx * 1.9) : 0;
  const senderGap =
    state.sender.trim() || state.dateText.trim()
      ? Math.round(metaFontPx * 2.1)
      : 0;
  const blockH = recipientGap + totalQuoteH + senderGap;

  let startY: number;
  if (state.textStyle.textPosition === 'top') {
    startY = padY + Math.round(h * 0.04);
  } else if (state.textStyle.textPosition === 'bottom') {
    startY = h - padY - blockH - Math.round(h * 0.02);
  } else {
    startY = Math.round((h - blockH) / 2);
  }

  const anchorX =
    state.textStyle.align === 'left'
      ? padX
      : state.textStyle.align === 'right'
        ? w - padX
        : w / 2;

  ctx.shadowColor = 'rgba(0,0,0,0.65)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 3;

  // Draw Recipient
  if (state.recipient.trim()) {
    ctx.save();
    ctx.font = `600 ${metaFontPx}px ${fontFamily}`;
    ctx.fillStyle = template.style.palette.accent;
    ctx.fillText(state.recipient.trim(), anchorX, startY);
    ctx.restore();
  }

  // Draw Main Quote
  const quoteStartY = startY + recipientGap;
  ctx.font = `${fontStyle} ${fontWeight} ${baseFontPx}px ${fontFamily}`;
  ctx.fillStyle = state.textStyle.textColor;
  quoteLines.forEach((line, idx) => {
    ctx.fillText(line, anchorX, quoteStartY + idx * lineH);
  });

  // Draw Sender + Optional Date
  const footerParts = [state.sender.trim(), state.dateText.trim()].filter(
    Boolean
  );
  if (footerParts.length > 0) {
    ctx.save();
    ctx.font = `italic 500 ${Math.round(metaFontPx * 0.94)}px ${fontFamily}`;
    ctx.fillStyle = state.textStyle.textColor;
    ctx.globalAlpha = 0.88;
    ctx.fillText(
      footerParts.join('  ·  '),
      anchorX,
      quoteStartY + totalQuoteH + Math.round(metaFontPx * 0.75)
    );
    ctx.restore();
  }

  ctx.restore();

  triggerCanvasDownload(
    canvas,
    `postcard-world-${template.id}-${state.exportSize}.${state.exportFormat}`,
    state.exportFormat
  );
}

export async function exportGalleryArtwork(
  item: GalleryItem,
  format: ExportFormat = 'png'
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const sizeSpec = exportSizeSpecs.postcard;
  const w = sizeSpec.logicalWidth * sizeSpec.exportScale;
  const h = sizeSpec.logicalHeight * sizeSpec.exportScale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  await paintBaseScene(
    ctx,
    w,
    h,
    item.image,
    item.palette,
    item.motif,
    item.vintageEffect
  );

  // If image is empty, draw embedded pre-designed typography
  if (!item.image) {
    drawBordersAndSeal(
      ctx,
      w,
      h,
      item.borderStyle,
      item.palette.accent,
      item.postmarkText
    );

    const padX = Math.round(w * 0.12);
    const maxTextWidth = w - padX * 2;
    const fontSize = Math.round(w * 0.036);
    const fontFamily = `'Noto Serif Bengali', 'Cormorant Garamond', Georgia, serif`;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = item.palette.inkDefault;
    ctx.shadowColor = 'rgba(0,0,0,0.65)';
    ctx.shadowBlur = 16;
    ctx.font = `600 ${fontSize}px ${fontFamily}`;

    const lines = wrapTextLines(ctx, item.embeddedText, maxTextWidth);
    const lineH = Math.round(fontSize * 1.48);
    const totalH = lines.length * lineH;
    const startY = (h - totalH) / 2 + lineH / 2;

    lines.forEach((line, idx) => {
      ctx.fillText(line, w / 2, startY + idx * lineH);
    });

    if (item.embeddedSubtext) {
      ctx.font = `500 ${Math.round(fontSize * 0.42)}px "Courier Prime", monospace`;
      ctx.fillStyle = item.palette.accent;
      ctx.fillText(
        item.embeddedSubtext,
        w / 2,
        startY + totalH + Math.round(fontSize * 0.7)
      );
    }
    ctx.restore();
  }

  triggerCanvasDownload(
    canvas,
    `postcard-world-gallery-${item.id}.${format}`,
    format
  );
}

function triggerCanvasDownload(
  canvas: HTMLCanvasElement,
  filename: string,
  format: ExportFormat
) {
  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality = format === 'jpg' ? 0.94 : undefined;

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    },
    mime,
    quality
  );
}
