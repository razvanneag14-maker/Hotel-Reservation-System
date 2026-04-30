/**
 * COLORS — Single source of truth for all colors in the app.
 * Import this anywhere you need a color value in TSX.
 * These values are mirrored as CSS custom properties in index.css.
 *
 * The color scheme is derived from the logo:
 * - Warm amber/gold accent (#C49A3C) matching the logo building icon
 * - Deep charcoal backgrounds for contrast
 * - Clean warm-toned text hierarchy
 */
export const COLORS = {
  // ── Brand Accent — Warm amber gold from the logo ──
  gold: '#C49A3C',
  goldLight: '#D4AF5C',
  goldDark: '#A07E2E',
  goldMuted: 'rgba(196, 154, 60, 0.15)',

  // ── Backgrounds — Deep charcoal tones ──
  bgDarkest: '#08111E',
  bgPage: '#0C1829',
  bgCard: 'rgba(14, 28, 55, 0.65)',
  bgCardSolid: '#0E1C37',
  bgCardHover: 'rgba(14, 28, 55, 0.85)',
  bgGlass: 'rgba(255, 255, 255, 0.05)',
  bgInput: 'rgba(255, 255, 255, 0.08)',
  bgInputFocus: 'rgba(255, 255, 255, 0.12)',
  bgOverlay: 'rgba(0, 0, 0, 0.6)',

  // ── Text — Warm white hierarchy ──
  textPrimary: '#ECEEF2',
  textSecondary: '#8B9CB8',
  textMuted: '#586A82',
  textHeading: '#FFFFFF',
  textOnGold: '#0C1829',

  // ── Status ──
  success: '#2ECC71',
  successBg: 'rgba(46, 204, 113, 0.12)',
  warning: '#F39C12',
  warningBg: 'rgba(243, 156, 18, 0.12)',
  error: '#E74C3C',
  errorBg: 'rgba(231, 76, 60, 0.12)',
  info: '#3498DB',
  infoBg: 'rgba(52, 152, 219, 0.12)',

  // ── Borders ──
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderMedium: 'rgba(255, 255, 255, 0.18)',
  borderGold: 'rgba(196, 154, 60, 0.3)',
  borderGoldStrong: 'rgba(196, 154, 60, 0.6)',

  // ── Shadows ──
  shadowDark: 'rgba(0, 0, 0, 0.3)',
  shadowGold: 'rgba(196, 154, 60, 0.15)',
  shadowCard: '0 8px 32px rgba(0, 0, 0, 0.3)',
  shadowCardHover: '0 12px 48px rgba(0, 0, 0, 0.4)',
  shadowGlow: '0 0 20px rgba(196, 154, 60, 0.2)',

  // ── Stars ──
  starFilled: '#F1C40F',
  starEmpty: '#3A4A5E',

  // ── Base ──
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // ── Gradients ──
  gradientPrimary: 'linear-gradient(135deg, #0E1C37 0%, #162D5A 100%)',
  gradientGold: 'linear-gradient(135deg, #C49A3C 0%, #D4AF5C 100%)',
  gradientDark: 'linear-gradient(180deg, #0C1829 0%, #08111E 100%)',
  gradientHero: 'linear-gradient(135deg, #0C1829 0%, #0E1C37 40%, #162D5A 100%)',
  gradientCardShine: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
} as const;

export type ColorKey = keyof typeof COLORS;
