// ============================================================
// NEXUS LIFE — titles.js
// Title & Badge Render System v1.0
//
// Usage:
//   import { renderTitleBadge, renderTitleCard, renderBadgeItem, injectTitleStyles } from './titles.js'
//
//   injectTitleStyles()                   — inject CSS once (called at init)
//   renderTitleBadge(title, options)      → HTML string (small badge for hero)
//   renderTitleCard(title, state, options)→ HTML string (full card for achievements)
//   renderBadgeItem(badge, unlocked)      → HTML string (badge card)
// ============================================================

import { CLASS_COLOR } from './icons.js'


// ============================================================
// RARITY CONFIG
// ============================================================
export const RARITY_CONFIG = {
  common: {
    color:       '#aaaaaa',
    colorAlt:    '#888888',
    shimmerDur:  '4s',
    glow:        'none',
    borderColor: 'rgba(170,170,170,0.15)',
    bgGradient:  'linear-gradient(135deg,rgba(170,170,170,0.03) 0%,rgba(170,170,170,0.01) 100%)',
    animation:   '',
    particle:    false,
  },
  rare: {
    color:       '#44aaff',
    colorAlt:    '#00ccff',
    shimmerDur:  '3s',
    glow:        '0 0 8px rgba(68,170,255,0.25)',
    borderColor: 'rgba(68,170,255,0.35)',
    bgGradient:  'linear-gradient(135deg,rgba(68,170,255,0.06) 0%,rgba(0,204,255,0.03) 100%)',
    animation:   'rareTwinkle 3s ease-in-out infinite',
    particle:    false,
  },
  epic: {
    color:       '#b044ff',
    colorAlt:    '#dd88ff',
    shimmerDur:  '2s',
    glow:        '0 0 14px rgba(176,68,255,0.35)',
    borderColor: 'rgba(176,68,255,0.45)',
    bgGradient:  'linear-gradient(135deg,rgba(176,68,255,0.08) 0%,rgba(221,136,255,0.04) 100%)',
    animation:   'epicFloat 2.5s ease-in-out infinite',
    particle:    false,
  },
  legendary: {
    color:       '#ffd700',
    colorAlt:    '#ff9500',
    colorAlt2:   '#ff6b00',
    shimmerDur:  '1.2s',
    glow:        '0 0 20px rgba(255,215,0,0.45), 0 0 40px rgba(255,149,0,0.2)',
    borderColor: 'rgba(255,215,0,0.6)',
    bgGradient:  'linear-gradient(135deg,rgba(255,215,0,0.09) 0%,rgba(255,107,0,0.05) 50%,rgba(255,215,0,0.07) 100%)',
    animation:   'legendaryPulse 1.8s ease-in-out infinite',
    particle:    true,
  },
}

export const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary']


// ============================================================
// CLASS ICONS SVG (full <svg> element strings)
// ============================================================
export const CLASS_ICONS_SVG = {
  warrior: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M4 16L16 4M12 4h4v4M8 16H4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/><path d="M7 13l3-3" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>`,
  mage:    (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><circle cx="10" cy="11" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 4v2M10 15v2M4 11H2M16 11h2M5.5 6.5l1.4 1.4M13.1 14.1l1.4 1.4M5.5 15.5l1.4-1.4M13.1 7.9l1.4-1.4" stroke="currentColor" stroke-width="1.2"/><circle cx="10" cy="11" r="1.5" fill="currentColor"/></svg>`,
  explorer:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" stroke-width="1"/><polygon points="10,6 12,11 10,10 8,11" fill="currentColor" opacity="0.9"/><polygon points="10,14 8,9 10,10 12,9" fill="currentColor" opacity="0.35"/></svg>`,
  merchant:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><ellipse cx="10" cy="6" rx="5" ry="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 6v4c0 1.1 2.24 2 5 2s5-.9 5-2V6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 10v3c0 1.1 2.24 2 5 2s5-.9 5-2v-3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 5.5l1 .5 1-.5" stroke="currentColor" stroke-width="1" opacity="0.6"/></svg>`,
  artist:  (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M10 3L15 8l-5 9-5-9z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M5 8h10M7 5l-2 3M13 5l2 3" stroke="currentColor" stroke-width="1" opacity="0.7"/><path d="M10 8l-2 4M10 8l2 4" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>`,
  diplomat:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M3 12c0 0 2-3 4-3h3c1 0 1.5.5 1.5 1s-.5 1-1.5 1H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M3 12l-1.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M17 12c0 0-2-3-4-3H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M17 12l1.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 10V8a1 1 0 012 0v2" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,
}

// CLASS_COLOR imported from icons.js — single source of truth


// ============================================================
// CSS INJECTION
// ============================================================
export function injectTitleStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('nexus-title-styles')) return

  const css = `
/* ──────────────────────────────────────────────────── */
/* NEXUS LIFE — Title & Badge Styles (auto-injected)    */
/* ──────────────────────────────────────────────────── */

/* KEYFRAMES */
@keyframes shimmerSlide {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50%     { background-position: 100% 50%; }
}
@keyframes nxIconPulse {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.65; }
}
@keyframes nxRarePing {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: 0.8; transform: scale(1.015); }
}
@keyframes legendaryPulse {
  0%,100% {
    border-color: rgba(255,215,0,0.55);
    box-shadow: 0 0 16px rgba(255,215,0,0.35), 0 0 32px rgba(255,149,0,0.15);
  }
  50% {
    border-color: rgba(255,149,0,0.9);
    box-shadow: 0 0 28px rgba(255,215,0,0.65), 0 0 56px rgba(255,107,0,0.3), inset 0 0 12px rgba(255,215,0,0.08);
  }
}
@keyframes epicFloat {
  0%,100% { box-shadow: 0 0 10px rgba(176,68,255,0.25); }
  50%     { box-shadow: 0 0 22px rgba(176,68,255,0.5), 0 0 40px rgba(221,136,255,0.15); }
}
@keyframes rareTwinkle {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.82; }
}
@keyframes sparkle {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--sx,8px), var(--sy,-12px)) scale(0); opacity: 0; }
}
@keyframes legendaryCardShimmer {
  0%   { left: -120%; }
  100% { left: 120%; }
}
@keyframes nxLegRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes nxEpicRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}

/* ──────────────────────────────
   .nx-title-badge  (small hero badge)
────────────────────────────── */
.nx-title-badge {
  display: inline-block;
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  padding: 4px 14px;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  white-space: nowrap;
  vertical-align: middle;
}
.nx-title-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: shimmerSlide var(--shimmer-dur, 3s) linear infinite;
  pointer-events: none;
}

/* badge rarity variants */
.nx-title-badge.rarity-common {
  --shimmer-dur: 5s;
  color: #aaaaaa;
  background: rgba(170,170,170,0.08);
  border: 1px solid rgba(170,170,170,0.15);
}
.nx-title-badge.rarity-common::after { opacity: 0.2; }

.nx-title-badge.rarity-rare {
  --shimmer-dur: 3s;
  color: #44aaff;
  background: linear-gradient(90deg, rgba(68,170,255,0.1), rgba(0,204,255,0.08));
  border: 1px solid rgba(68,170,255,0.35);
  animation: rareTwinkle 3s ease-in-out infinite;
}

.nx-title-badge.rarity-epic {
  --shimmer-dur: 2s;
  color: #dd88ff;
  background: linear-gradient(90deg, rgba(176,68,255,0.12), rgba(221,136,255,0.08));
  border: 1px solid rgba(176,68,255,0.45);
  animation: epicFloat 2.5s ease-in-out infinite;
}
.nx-title-badge.rarity-epic::after { opacity: 0.55; }

.nx-title-badge.rarity-legendary {
  --shimmer-dur: 1.2s;
  color: #ffd700;
  background: linear-gradient(90deg, rgba(255,215,0,0.15), rgba(255,107,0,0.1), rgba(255,215,0,0.15));
  border: 1px solid rgba(255,215,0,0.6);
  animation: legendaryPulse 1.8s ease-in-out infinite;
  text-shadow: 0 0 8px rgba(255,215,0,0.6);
}
.nx-title-badge.rarity-legendary::after {
  background: linear-gradient(105deg, transparent 20%, rgba(255,215,0,0.35) 50%, transparent 80%);
  background-size: 200% 100%;
  animation: shimmerSlide 1.2s linear infinite;
  opacity: 1;
}

/* ──────────────────────────────
   .nx-title-card  (full card — achievements)
────────────────────────────── */
.nx-title-card {
  position: relative;
  overflow: hidden;
  padding: 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: 1px solid;
  background: rgba(1,10,15,0.7);
}
.nx-title-card:hover {
  transform: translateY(-2px);
}

/* corner accents */
.nx-title-card::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 12px; height: 12px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  opacity: 0.6;
  pointer-events: none;
}
.nx-title-card::after {
  content: '';
  position: absolute;
  bottom: -1px; right: -1px;
  width: 12px; height: 12px;
  border-bottom: 2px solid currentColor;
  border-right: 2px solid currentColor;
  opacity: 0.6;
  pointer-events: none;
}

/* shimmer sweep layer */
.nx-title-card .nx-card-shimmer {
  position: absolute;
  top: 0; bottom: 0;
  width: 60%;
  background: linear-gradient(105deg, transparent, rgba(255,255,255,0.06), transparent);
  pointer-events: none;
  animation: legendaryCardShimmer var(--card-shimmer-dur, 4s) linear infinite;
}

/* rarity card themes */
.nx-title-card.rarity-common {
  --card-shimmer-dur: 6s;
  border-color: rgba(170,170,170,0.18);
  background: linear-gradient(135deg, rgba(170,170,170,0.03), rgba(170,170,170,0.01));
  color: #aaaaaa;
}
.nx-title-card.rarity-common:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.nx-title-card.rarity-rare {
  --card-shimmer-dur: 3.5s;
  border-color: rgba(68,170,255,0.35);
  background: linear-gradient(135deg, rgba(68,170,255,0.06), rgba(0,204,255,0.03));
  color: #44aaff;
  animation: rareTwinkle 3s ease-in-out infinite;
}
.nx-title-card.rarity-rare:hover {
  box-shadow: 0 4px 20px rgba(68,170,255,0.18);
  border-color: rgba(68,170,255,0.55);
}

.nx-title-card.rarity-epic {
  --card-shimmer-dur: 2.5s;
  border-color: rgba(176,68,255,0.45);
  background: linear-gradient(135deg, rgba(176,68,255,0.08), rgba(221,136,255,0.04));
  color: #b044ff;
  animation: epicFloat 2.5s ease-in-out infinite;
}
.nx-title-card.rarity-epic:hover {
  box-shadow: 0 4px 24px rgba(176,68,255,0.3);
  border-color: rgba(176,68,255,0.7);
}

.nx-title-card.rarity-legendary {
  --card-shimmer-dur: 1.5s;
  border-color: rgba(255,215,0,0.55);
  background: linear-gradient(135deg, rgba(255,215,0,0.09), rgba(255,107,0,0.05), rgba(255,215,0,0.07));
  color: #ffd700;
  animation: legendaryPulse 1.8s ease-in-out infinite;
}
.nx-title-card.rarity-legendary:hover {
  box-shadow: 0 6px 32px rgba(255,215,0,0.35);
  border-color: rgba(255,215,0,0.85);
}

/* locked state */
.nx-title-card.nx-locked {
  opacity: 0.35;
  filter: grayscale(0.8);
}
.nx-title-card.nx-locked:hover {
  transform: none;
}

/* ──────────────────────────────
   Title card inner elements
────────────────────────────── */
.nx-title-name {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  font-weight: 700;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientShift 4s ease infinite;
  display: inline-block;
  margin-bottom: 4px;
}
.nx-title-name.rarity-common {
  background-image: linear-gradient(90deg, #aaaaaa, #cccccc, #aaaaaa);
  animation-duration: 8s;
}
.nx-title-name.rarity-rare {
  background-image: linear-gradient(90deg, #44aaff, #00ccff, #44aaff);
  animation-duration: 5s;
}
.nx-title-name.rarity-epic {
  background-image: linear-gradient(90deg, #b044ff, #dd88ff, #b044ff);
  animation-duration: 3.5s;
}
.nx-title-name.rarity-legendary {
  background-image: linear-gradient(90deg, #ffd700, #ff9500, #ff6b00, #ff9500, #ffd700);
  animation-duration: 2.5s;
}

/* ──────────────────────────────
   Title card inner elements
────────────────────────────── */
.nx-title-name {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  font-weight: 700;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientShift 4s ease infinite;
  display: inline-block;
  margin-bottom: 4px;
}
.nx-title-name.rarity-common {
  background-image: linear-gradient(90deg, #aaaaaa, #cccccc, #aaaaaa);
  animation-duration: 8s;
}
.nx-title-name.rarity-rare {
  background-image: linear-gradient(90deg, #44aaff, #00ccff, #44aaff);
  animation-duration: 5s;
}
.nx-title-name.rarity-epic {
  background-image: linear-gradient(90deg, #b044ff, #dd88ff, #b044ff);
  animation-duration: 3.5s;
}
.nx-title-name.rarity-legendary {
  background-image: linear-gradient(90deg, #ffd700, #ff9500, #ff6b00, #ff9500, #ffd700);
  animation-duration: 2.5s;
}

/* Rarity badge — now sits in the card-top row, not absolutely positioned */
.nx-rarity-badge {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  letter-spacing: 1.5px;
  padding: 2px 7px;
  border: 1px solid currentColor;
  text-transform: uppercase;
  opacity: 0.85;
  white-space: nowrap;
  flex-shrink: 0;
}

.nx-class-icon-wrap {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--cls-color, rgba(0,245,255,0.3));
  box-shadow: 0 0 8px var(--cls-color, rgba(0,245,255,0.15));
  flex-shrink: 0;
}

/* Equip button — uses CSS variable so rarity JS can override */
.nx-equip-btn {
  display: block;
  width: 100%;
  margin-top: 10px;
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  padding: 8px;
  background: transparent;
  border: 1px solid var(--nx-btn-color, rgba(0,245,255,0.35));
  color: var(--nx-btn-color, #00f5ff);
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.nx-equip-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: shimmerSlide 2.5s linear infinite;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s;
}
.nx-equip-btn:hover {
  background: rgba(var(--nx-btn-rgb, 0,245,255), 0.1);
  border-color: var(--nx-btn-color, #00f5ff);
  box-shadow: 0 0 10px rgba(var(--nx-btn-rgb, 0,245,255), 0.25);
}
.nx-equip-btn:hover::after { opacity: 1; }
.nx-equip-btn.nx-btn-equipped {
  border-color: var(--nx-btn-color, #ffd700);
  background: rgba(var(--nx-btn-rgb, 0,245,255), 0.12);
  cursor: default;
  opacity: 0.8;
}
.nx-equip-btn.nx-btn-equipped::after { display: none; }

.nx-equipped-tag {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  letter-spacing: 1.5px;
  padding: 3px 8px;
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.5);
  color: #ffd700;
  animation: legendaryPulse 2s ease-in-out infinite;
}

.nx-lock-icon {
  position: absolute;
  top: 8px; left: 8px;
  opacity: 0.5;
}

/* ──────────────────────────────
   .nx-badge-item  (badge card)
────────────────────────────── */
.nx-badge-item {
  position: relative;
  padding: 14px 8px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid;
  background: rgba(1,10,15,0.6);
  overflow: hidden;
}
.nx-badge-item:hover {
  transform: translateY(-1px);
}

.nx-badge-item.rarity-common {
  border-color: rgba(170,170,170,0.15);
  background: rgba(170,170,170,0.02);
}
.nx-badge-item.rarity-rare {
  border-color: rgba(68,170,255,0.3);
  background: rgba(68,170,255,0.04);
}
.nx-badge-item.rarity-rare:hover {
  box-shadow: 0 0 12px rgba(68,170,255,0.2);
  border-color: rgba(68,170,255,0.5);
}
.nx-badge-item.rarity-epic {
  border-color: rgba(176,68,255,0.35);
  background: rgba(176,68,255,0.05);
  animation: epicFloat 3s ease-in-out infinite;
}
.nx-badge-item.rarity-epic:hover {
  box-shadow: 0 0 16px rgba(176,68,255,0.3);
}
.nx-badge-item.rarity-legendary {
  border-color: rgba(255,215,0,0.5);
  background: rgba(255,215,0,0.05);
  animation: legendaryPulse 2s ease-in-out infinite;
}
.nx-badge-item.rarity-legendary:hover {
  box-shadow: 0 0 24px rgba(255,215,0,0.4);
}

.nx-badge-item.nx-locked {
  opacity: 0.28;
  filter: grayscale(1);
}
.nx-badge-item.nx-locked:hover {
  transform: none;
  box-shadow: none;
}

.nx-badge-icon {
  font-size: 28px;
  margin-bottom: 6px;
  display: block;
}
.nx-badge-name {
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  letter-spacing: 1px;
  color: #c8f0f5;
  line-height: 1.3;
  margin-bottom: 4px;
}
.nx-badge-desc {
  font-size: 10px;
  color: #5a8a90;
  line-height: 1.3;
}
.nx-badge-cat {
  font-family: 'Orbitron', monospace;
  font-size: 6px;
  letter-spacing: 1px;
  padding: 2px 5px;
  margin-top: 5px;
  display: inline-block;
  background: rgba(176,68,255,0.08);
  border: 1px solid rgba(176,68,255,0.2);
  color: #b044ff;
}
.nx-badge-rarity-pip {
  position: absolute;
  top: 4px; right: 4px;
  font-family: 'Orbitron', monospace;
  font-size: 6px;
  letter-spacing: 0.5px;
  padding: 1px 5px;
  border: 1px solid currentColor;
  text-transform: uppercase;
}
.nx-badge-rarity-pip.rarity-common { color: #888888; }
.nx-badge-rarity-pip.rarity-rare   { color: #44aaff; }
.nx-badge-rarity-pip.rarity-epic   { color: #b044ff; }
.nx-badge-rarity-pip.rarity-legendary { color: #ffd700; animation: legendaryPulse 2s ease-in-out infinite; }

.nx-badge-unlock-date {
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  color: #00f5ff;
  margin-top: 5px;
}

/* title card desc + category */
.nx-title-desc {
  font-size: 11px;
  color: #5a8a90;
  line-height: 1.5;
  margin-bottom: 8px;
}
.nx-title-category {
  font-family: 'Orbitron', monospace;
  font-size: 8px;
  letter-spacing: 1px;
  padding: 2px 8px;
  background: rgba(0,245,255,0.06);
  border: 1px solid rgba(0,245,255,0.12);
  color: #00f5ff;
  display: inline-block;
}
.nx-title-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 8px;
}
.nx-title-card-top-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.nx-title-card-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}
.nx-title-card-body { position: relative; z-index: 1; }
`

  const style = document.createElement('style')
  style.id = 'nexus-title-styles'
  style.textContent = css
  document.head.appendChild(style)
}

// Auto-inject on import
injectTitleStyles()


// ============================================================
// LOCK ICON SVG
// ============================================================
const LOCK_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle" aria-hidden="true"><rect x="3" y="7" width="10" height="7" stroke="currentColor" stroke-width="1.2"/><path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="8" cy="11" r="1.5" fill="currentColor" opacity="0.7"/></svg>`

const DEFAULT_TITLE_SVG = `<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle" aria-hidden="true"><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>`

const DEFAULT_BADGE_SVG = `<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle" aria-hidden="true"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`


// ============================================================
// renderTitleBadge(title, options) → HTML string
// Used in hero profile section (small badge)
// ============================================================
export function renderTitleBadge(title, options = {}) {
  const { showIcon = true } = options
  if (!title) return ''
  const r = title.rarity || 'common'
  const icon = showIcon && title.icon ? `<span style="margin-right:5px">${title.icon}</span>` : ''
  return `<span class="nx-title-badge rarity-${r}">${icon}${title.name || ''}</span>`
}


// ============================================================
// renderTitleCard(title, state, options) → HTML string
// Full card for achievements page
// ============================================================
export function renderTitleCard(title, state = {}, options = {}) {
  const { unlocked = false, equipped = false } = state
  const { isOwnProfile = false, onEquipFn = 'equipTitle' } = options
  const r = title.rarity || 'common'
  const cfg = RARITY_CONFIG[r] || RARITY_CONFIG.common

  const lockedClass   = !unlocked ? ' nx-locked' : ''
  const equippedClass = equipped ? ' nx-equipped' : ''

  // class icon
  const cat = (title.category || '').toLowerCase()
  const clsColor = CLASS_COLOR[cat] || 'rgba(0,245,255,0.4)'
  const classIconHtml = CLASS_ICONS_SVG[cat]
    ? `<div class="nx-class-icon-wrap" style="--cls-color:${clsColor};color:${clsColor}">${CLASS_ICONS_SVG[cat](16)}</div>`
    : ''

  // rarity label
  const rarityLabel = r.toUpperCase()

  // status badge
  let statusHtml = ''
  if (equipped) {
    statusHtml = `<span class="nx-equipped-tag">EQUIPPED</span>`
  } else if (unlocked) {
    statusHtml = `<span style="font-family:'Orbitron',monospace;font-size:7px;letter-spacing:1px;padding:3px 8px;border:1px solid rgba(68,255,136,0.4);color:#44ff88;background:rgba(68,255,136,0.06)">UNLOCKED</span>`
  } else {
    statusHtml = `<span style="font-family:'Orbitron',monospace;font-size:7px;letter-spacing:1px;padding:3px 8px;border:1px solid rgba(90,138,144,0.3);color:#5a8a90">LOCKED</span>`
  }

  // icon — use SVG map, fallback to default star
  const titleSvgPath = TITLE_SVG_MAP[title.name] || `<path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>`
  const iconHtml = renderIconFrame(titleSvgPath, r, 52)

  // equip button — rarity-aware colors
  const btnColorMap = {
    common:    { color: '#aaaaaa', rgb: '170,170,170' },
    rare:      { color: '#44aaff', rgb: '68,170,255' },
    epic:      { color: '#dd88ff', rgb: '221,136,255' },
    legendary: { color: '#ffd700', rgb: '255,215,0' },
  }
  const btnC = btnColorMap[r] || btnColorMap.common
  const btnStyle = `style="--nx-btn-color:${btnC.color};--nx-btn-rgb:${btnC.rgb}"`

  let btnHtml = ''
  if (unlocked && isOwnProfile) {
    if (equipped) {
      btnHtml = `<button class="nx-equip-btn nx-btn-equipped" ${btnStyle} disabled>ใส่อยู่แล้ว</button>`
    } else {
      btnHtml = `<button class="nx-equip-btn" ${btnStyle} onclick="${onEquipFn}(${title.id})">+ ใส่ฉายานี้</button>`
    }
  }

  // lock overlay icon
  const lockHtml = !unlocked
    ? `<div class="nx-lock-icon">${LOCK_SVG}</div>`
    : ''

  return `
<div class="nx-title-card rarity-${r}${lockedClass}${equippedClass}" style="color:${cfg.color}">
  <div class="nx-card-shimmer"></div>
  ${lockHtml}
  <div class="nx-title-card-body">
    <div class="nx-title-card-top">
      <div class="nx-title-card-top-left">
        ${classIconHtml}
        <div>${iconHtml}</div>
      </div>
      <div class="nx-title-card-badges">
        <span class="nx-rarity-badge" style="color:${cfg.color};border-color:${cfg.borderColor}">${rarityLabel}</span>
        ${statusHtml}
      </div>
    </div>
    <div class="nx-title-name rarity-${r}">${title.name || '—'}</div>
    <div class="nx-title-desc">${title.description || ''}</div>
    <span class="nx-title-category">${(title.category || '').toUpperCase()}</span>
    ${btnHtml}
  </div>
</div>`
}


// ============================================================
// renderBadgeItem(badge, unlocked) → HTML string
// Badge card for profile & achievements
// ============================================================
export function renderBadgeItem(badge, unlocked = false, options = {}) {
  const { showDate = false, unlockedAt = null } = options
  const r = badge.rarity || 'common'
  const lockedClass = !unlocked ? ' nx-locked' : ''

  const svgPath = BADGE_SVG_MAP[badge.name] || `<polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" stroke="currentColor" stroke-width="1.2" fill="none"/>`
  const iconHtml = renderIconFrame(svgPath, r, 56)

  let dateHtml = ''
  if (showDate && unlocked && unlockedAt) {
    const d = new Date(unlockedAt)
    const dateStr = d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
    dateHtml = `<div class="nx-badge-unlock-date">${dateStr}</div>`
  }

  const lockIconHtml = !unlocked
    ? `<div style="position:absolute;top:6px;left:6px;opacity:0.4">${LOCK_SVG}</div>`
    : ''

  return `
<div class="nx-badge-item rarity-${r}${lockedClass}" title="${badge.description || badge.name || ''}">
  ${lockIconHtml}
  <span class="nx-badge-rarity-pip rarity-${r}">${r.toUpperCase()}</span>
  ${iconHtml}
  <div class="nx-badge-name">${badge.name || '—'}</div>
  <div class="nx-badge-desc">${badge.description || ''}</div>
  ${badge.category ? `<div class="nx-badge-cat">${(badge.category || '').toUpperCase()}</div>` : ''}
  ${dateHtml}
</div>`
}

// ============================================================
// BADGE ICON MAP  (keyed by badge name)
// ============================================================
const BADGE_SVG_MAP = {
  'First Blood': `<circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="0.8" fill="currentColor"/><path d="M8 1v2M8 11v2M1 8h2M11 8h2" stroke="currentColor" stroke-width="1.2"/>`,
  'Week Warrior': `<path d="M8 13c-2.5 0-4-1.6-4-4 0-1.2.4-2.4 1.6-3.6 0 1.6.8 2.4.8 2.4s.4-2 1.6-3.6c.4 1.6 1.6 2.8 1.6 2.8s.8-.8.4-2C11.6 6.4 12 7.6 12 9c0 2.4-1.6 4-4 4z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M6.5 10.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5" stroke="currentColor" stroke-width="1" opacity="0.6"/>`,
  'Monthly Crusher': `<path d="M8 1v3M8 12v3M1 8h3M12 8h3M3 3l2 2M11 11l2 2M3 13l2-2M11 5l2-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.2"/>`,
  'Gold Walker': `<circle cx="8" cy="9" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5L3.5 2h9L10.5 5.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/><path d="M8 7v2.5l1.5 1" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>`,
  'Globe Trotter': `<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M8 2c-1.6 1.6-1.6 8.4 0 12M8 2c1.6 1.6 1.6 8.4 0 12" stroke="currentColor" stroke-width="1" fill="none"/><path d="M2 8h12" stroke="currentColor" stroke-width="1"/><path d="M3 5.5h10M3 10.5h10" stroke="currentColor" stroke-width="1" opacity="0.5"/>`,
  'Social Butterfly': `<circle cx="8" cy="4" r="2" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="12" r="2" stroke="currentColor" stroke-width="1.2"/><circle cx="13" cy="12" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M8 6l-3.5 4.5M8 6l3.5 4.5M3.5 12h9" stroke="currentColor" stroke-width="1" opacity="0.7"/>`,
  'Proof Master': `<rect x="2" y="5" width="12" height="9" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 5V4l1.5-1.5h3L11 4v1" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 9.5l1 1 2-2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>`,
  'Founder': `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="currentColor" opacity="0.35"/>`,
}

// ============================================================
// TITLE ICON MAP  (keyed by title name)
// ============================================================
const TITLE_SVG_MAP = {
  'The Unbreakable': `<path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M8 6v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`,
  'นักวิ่งมือใหม่': `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>`,
  'นักอ่านมือใหม่': `<path d="M8 13V4" stroke="currentColor" stroke-width="1.2"/><path d="M3 4c0 0 2 0 5 1.5C11 4 13 4 13 4v9c0 0-2 0-5-1.5C5 13 3 13 3 13z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>`,
  'จอมเวทแห่งการเรียนรู้': `<circle cx="8" cy="9" r="3.5" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8 3v2M8 13v1M3 9H2M13 9h1M4.5 5.5l1.2 1.2M10.3 11.3l1.2 1.2M4.5 12.5l1.2-1.2M10.3 6.7l1.2-1.2" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="9" r="1.2" fill="currentColor"/>`,
  'นักสำรวจผู้กล้า': `<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2"/><polygon points="8,4 9.5,9 8,8 6.5,9" fill="currentColor"/><polygon points="8,12 6.5,7 8,8 9.5,7" fill="currentColor" opacity="0.4"/><path d="M8 2v1M8 13v1M2 8h1M13 8h1" stroke="currentColor" stroke-width="1" opacity="0.4"/>`,
  'Pathfinder': `<path d="M8 1a4 4 0 014 4c0 3-4 8-4 8S4 8 4 5a4 4 0 014-4z" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="8" cy="5" r="1.5" fill="currentColor"/><path d="M3.5 11.5c-1.5.5-2.5 1-2.5 1.5s3 1.5 7 1.5 7-1 7-1.5-1-.9-2.5-1.4" stroke="currentColor" stroke-width="1" opacity="0.5"/>`,
  'นักวางแผนการเงิน': `<ellipse cx="8" cy="5" rx="4.5" ry="1.5" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M3.5 5v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V5" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M3.5 8v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V8" stroke="currentColor" stroke-width="1.2" fill="none"/>`,
  'เสน่ห์ล้นเหลือ': `<circle cx="5" cy="5" r="2.2" stroke="currentColor" stroke-width="1.2"/><circle cx="11" cy="5" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 14c0-2.5 1.5-4 3.5-4M14.5 14c0-2.5-1.5-4-3.5-4M5 10c1 0 3 .5 3 2s2-2 3-2" stroke="currentColor" stroke-width="1.1"/>`,
  'จ้าวแห่งเดือน': `<path d="M2 12L4 5l4 4 4-4 2 7z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M2 12h12" stroke="currentColor" stroke-width="1.3"/><circle cx="2" cy="5" r="1.2" fill="currentColor"/><circle cx="8" cy="3" r="1.2" fill="currentColor"/><circle cx="14" cy="5" r="1.2" fill="currentColor"/>`,
  'Founder': `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="currentColor" opacity="0.35"/>`,
}

// ============================================================
// HEXAGON FRAME RENDERER
// ============================================================
function renderIconFrame(svgPath, rarity = 'common', size = 48) {
  const cfg = RARITY_CONFIG[rarity] || RARITY_CONFIG.common
  const hex = `polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)`
  const innerSize = Math.round(size * 0.52)

  // Rotating ring for legendary/epic
  let extraRing = ''
  if (rarity === 'legendary') {
    extraRing = `<div style="position:absolute;inset:-3px;background:conic-gradient(from 0deg,${cfg.color},${cfg.colorAlt},${cfg.colorAlt2||cfg.colorAlt},${cfg.color});clip-path:${hex};animation:nxLegRing 3s linear infinite;opacity:0.7;"></div>`
  } else if (rarity === 'epic') {
    extraRing = `<div style="position:absolute;inset:-2px;background:conic-gradient(from 0deg,${cfg.color},transparent,${cfg.colorAlt},transparent,${cfg.color});clip-path:${hex};animation:nxEpicRing 4s linear infinite;opacity:0.55;"></div>`
  }

  // Thin border ring (1.5px stroke simulation via clip-path layers)
  const borderOpacity = rarity === 'common' ? '0.25' : rarity === 'rare' ? '0.5' : '0.65'

  // Inner glow intensity
  const glowSize = rarity === 'legendary' ? '20' : rarity === 'epic' ? '14' : rarity === 'rare' ? '8' : '4'
  const glowOpacity = rarity === 'legendary' ? '55' : rarity === 'epic' ? '44' : rarity === 'rare' ? '33' : '22'

  // SVG icon glow
  const iconGlow = rarity === 'common'
    ? `drop-shadow(0 0 2px ${cfg.color}66)`
    : rarity === 'legendary'
      ? `drop-shadow(0 0 6px ${cfg.color}ee) drop-shadow(0 0 12px ${cfg.colorAlt}88)`
      : `drop-shadow(0 0 5px ${cfg.color}cc) drop-shadow(0 0 2px ${cfg.colorAlt||cfg.color}66)`

  return `<div style="position:relative;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
    ${extraRing}
    <div style="position:absolute;inset:0;clip-path:${hex};background:${cfg.color};opacity:${borderOpacity};"></div>
    <div style="position:absolute;inset:1.5px;clip-path:${hex};background:rgba(2,8,14,0.92);"></div>
    <div style="position:absolute;inset:1.5px;clip-path:${hex};background:radial-gradient(ellipse at 50% 30%,${cfg.color}${glowOpacity} 0%,transparent 70%);"></div>
    <svg width="${innerSize}" height="${innerSize}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      style="position:relative;z-index:1;color:${cfg.color};filter:${iconGlow}">
      ${svgPath}
    </svg>
  </div>`
}
