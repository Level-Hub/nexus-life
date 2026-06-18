// ============================================================
// NEXUS LIFE — titles.js  v3.0  (WORLD-CLASS UPGRADE)
// Title & Badge Render System — AAA-grade particle FX,
// metallic text, 3D perspective, multi-layer animations.
//
// Usage:
//   import { renderTitleBadge, renderTitleCard, renderBadgeItem, injectTitleStyles } from './titles.js'
//
//   injectTitleStyles()                    — inject CSS once (auto-called on import)
//   renderTitleBadge(title, options)       → HTML string
//   renderTitleCard(title, state, options) → HTML string
//   renderBadgeItem(badge, unlocked)       → HTML string
// ============================================================

import { CLASS_COLOR } from './icons.js'


// ============================================================
// RARITY CONFIG  (backward-compat, enhanced)
// ============================================================
export const RARITY_CONFIG = {
  common: {
    color:       '#aaaaaa',
    colorAlt:    '#888888',
    shimmerDur:  '5s',
    glow:        'none',
    borderColor: 'rgba(170,170,170,0.18)',
    bgGradient:  'linear-gradient(135deg,rgba(170,170,170,0.04) 0%,rgba(170,170,170,0.01) 100%)',
    animation:   '',
    particle:    false,
    metallic:    'linear-gradient(90deg,#666 0%,#aaa 30%,#ccc 50%,#999 70%,#666 100%)',
  },
  rare: {
    color:       '#44aaff',
    colorAlt:    '#00f0ff',
    shimmerDur:  '2.8s',
    glow:        '0 0 10px rgba(68,170,255,0.3)',
    borderColor: 'rgba(68,170,255,0.4)',
    bgGradient:  'linear-gradient(135deg,rgba(68,170,255,0.07) 0%,rgba(0,240,255,0.04) 100%)',
    animation:   'rareTwinkle 3s ease-in-out infinite',
    particle:    false,
    metallic:    'linear-gradient(90deg,#1a5aaa 0%,#44aaff 30%,#88ddff 50%,#44aaff 70%,#1a5aaa 100%)',
  },
  epic: {
    color:       '#cc66ff',
    colorAlt:    '#ee99ff',
    shimmerDur:  '1.8s',
    glow:        '0 0 18px rgba(204,102,255,0.4)',
    borderColor: 'rgba(204,102,255,0.5)',
    bgGradient:  'linear-gradient(135deg,rgba(204,102,255,0.1) 0%,rgba(238,153,255,0.05) 100%)',
    animation:   'epicFloat 2.5s ease-in-out infinite',
    particle:    false,
    metallic:    'linear-gradient(90deg,#660099 0%,#cc66ff 30%,#ee99ff 50%,#cc66ff 70%,#660099 100%)',
  },
  legendary: {
    color:       '#ffd700',
    colorAlt:    '#ff9500',
    colorAlt2:   '#ff6b00',
    shimmerDur:  '1.0s',
    glow:        '0 0 24px rgba(255,215,0,0.5), 0 0 48px rgba(255,149,0,0.25)',
    borderColor: 'rgba(255,215,0,0.65)',
    bgGradient:  'linear-gradient(135deg,rgba(255,215,0,0.1) 0%,rgba(255,107,0,0.06) 50%,rgba(255,215,0,0.08) 100%)',
    animation:   'legendaryPulse 1.6s ease-in-out infinite',
    particle:    true,
    metallic:    'linear-gradient(90deg,#996600 0%,#ffd700 25%,#fff5aa 50%,#ffd700 75%,#996600 100%)',
  },
}

export const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary']


// ============================================================
// CLASS ICONS SVG (full <svg> elements) — v3 upgraded
// ============================================================
export const CLASS_ICONS_SVG = {
  warrior: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M4 16L16 4M12 4h4v4M8 16H4v-4" stroke="url(#rubyGrad)" stroke-width="2.0" stroke-linecap="square" stroke-linejoin="miter" filter="url(#glowWarm)"/><path d="M7 13l3-3" stroke="url(#rubyGrad)" stroke-width="1.2" opacity="0.65"/><circle cx="10" cy="10" r="1.2" fill="url(#goldGrad)" opacity="0.7"/></svg>`,
  mage:    (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><circle cx="10" cy="11" r="4" stroke="url(#amethystGrad)" stroke-width="1.8" fill="none" filter="url(#glowPurple)"/><path d="M10 4v2M10 15v2M4 11H2M16 11h2M5.5 6.5l1.4 1.4M13.1 14.1l1.4 1.4M5.5 15.5l1.4-1.4M13.1 7.9l1.4-1.4" stroke="url(#amethystGrad)" stroke-width="1.3"/><circle cx="10" cy="11" r="2.0" fill="url(#amethystGrad)" filter="url(#glowPurple)"/><circle cx="10" cy="10" r="0.8" fill="white" opacity="0.5"/></svg>`,
  explorer:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="url(#emeraldGrad)" stroke-width="1.8" fill="none"/><circle cx="10" cy="10" r="5" stroke="url(#emeraldGrad)" stroke-width="0.6" opacity="0.3"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="url(#emeraldGrad)" stroke-width="1.1"/><polygon points="10,6 12,11 10,10 8,11" fill="url(#rubyGrad)" opacity="0.95"/><polygon points="10,14 8,9 10,10 12,9" fill="url(#cyanGrad)" opacity="0.4"/></svg>`,
  merchant:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><ellipse cx="10" cy="6" rx="5" ry="2" stroke="url(#goldGrad)" stroke-width="1.8" fill="url(#goldGrad)" fill-opacity="0.12"/><path d="M5 6v4c0 1.1 2.24 2 5 2s5-.9 5-2V6" stroke="url(#goldGrad)" stroke-width="1.6" fill="none"/><path d="M5 10v3c0 1.1 2.24 2 5 2s5-.9 5-2v-3" stroke="url(#goldGrad)" stroke-width="1.6" fill="none"/><path d="M8 5.5l1 .5 1-.5" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.8"/></svg>`,
  artist:  (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M10 3L15 8l-5 9-5-9z" stroke="url(#amethystGrad)" stroke-width="1.8" fill="url(#amethystGrad)" fill-opacity="0.1" stroke-linejoin="round"/><path d="M5 8h10M7 5l-2 3M13 5l2 3" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.8"/><circle cx="10" cy="8" r="0.8" fill="white" opacity="0.7"/></svg>`,
  diplomat:(size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"><path d="M3 12c0 0 2-3 4-3h3c1 0 1.5.5 1.5 1s-.5 1-1.5 1H8" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M3 12l-1.5 1.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round"/><path d="M17 12c0 0-2-3-4-3H9.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M17 12l1.5 1.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round"/><path d="M8 10V8a1 1 0 012 0v2" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/></svg>`,
}


// ============================================================
// TITLE EFFECT MAP
// ============================================================
const TITLE_EFFECT_MAP = {

  'นักวิ่งมือใหม่': {
    effectClass: 'nx-fx-lightning',
    icon: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.4" fill="url(#lightningGrad)" fill-opacity="0.25" stroke-linejoin="round"/>`,
  },
  'นักวิ่งขั้นเทพ': {
    effectClass: 'nx-fx-lightning',
    icon: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.6" fill="url(#lightningGrad)" fill-opacity="0.35" stroke-linejoin="round"/>`,
  },
  'Speed Demon': {
    effectClass: 'nx-fx-lightning',
    icon: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.6" fill="url(#lightningGrad)" fill-opacity="0.35" stroke-linejoin="round"/>`,
  },

  'Week Warrior': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 14c-3 0-5-2-5-5 0-1.5.5-3 2-4.5 0 2 1 3 1 3s.5-2.5 2-4.5c.5 2 2 3.5 2 3.5s1-1 .5-2.5c2 2 2.5 3.5 2.5 5 0 3-2 5-5 5z" stroke="url(#fireGrad)" stroke-width="1.3" fill="url(#fireGrad)" fill-opacity="0.2"/><circle cx="8" cy="11" r="1.6" fill="url(#goldRadial)" opacity="0.75"/>`,
  },
  'Monthly Crusher': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 14c-3 0-5-2-5-5 0-1.5.5-3 2-4.5 0 2 1 3 1 3s.5-2.5 2-4.5c.5 2 2 3.5 2 3.5s1-1 .5-2.5c2 2 2.5 3.5 2.5 5 0 3-2 5-5 5z" stroke="url(#fireGrad)" stroke-width="1.4" fill="url(#fireGrad)" fill-opacity="0.3"/>`,
  },

  'The Unbreakable': {
    effectClass: 'nx-fx-shield',
    icon: `<path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" stroke="url(#sapphireGrad)" stroke-width="1.5" fill="url(#shieldGrad)" fill-opacity="0.4" stroke-linejoin="round"/><path d="M8 6v3l1.5 1.5" stroke="url(#cyanGrad)" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  'Iron Will': {
    effectClass: 'nx-fx-shield',
    icon: `<path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" stroke="url(#sapphireGrad)" stroke-width="1.5" fill="url(#shieldGrad)" fill-opacity="0.4" stroke-linejoin="round"/>`,
  },

  'นักอ่านมือใหม่': {
    effectClass: 'nx-fx-glow',
    icon: `<path d="M8 13V4" stroke="url(#orangeGrad)" stroke-width="1.3"/><path d="M3 4c0 0 2 0 5 1.5C11 4 13 4 13 4v9c0 0-2 0-5-1.5C5 13 3 13 3 13z" stroke="url(#orangeGrad)" stroke-width="1.3" fill="none" stroke-linejoin="round"/>`,
  },
  'จอมเวทแห่งการเรียนรู้': {
    effectClass: 'nx-fx-glow-purple',
    icon: `<circle cx="8" cy="9" r="3.5" stroke="url(#amethystGrad)" stroke-width="1.3" fill="none"/><path d="M8 3v2M8 13v1M3 9H2M13 9h1M4.5 5.5l1.2 1.2M10.3 11.3l1.2 1.2M4.5 12.5l1.2-1.2M10.3 6.7l1.2-1.2" stroke="url(#amethystGrad)" stroke-width="1.1"/><circle cx="8" cy="9" r="1.3" fill="url(#amethystGrad)"/>`,
  },

  'นักสำรวจผู้กล้า': {
    effectClass: 'nx-fx-spin-ring',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.3"/><polygon points="8,4 9.5,9 8,8 6.5,9" fill="url(#rubyGrad)"/><polygon points="8,12 6.5,7 8,8 9.5,7" fill="url(#cyanGrad)" opacity="0.45"/>`,
  },
  'Pathfinder': {
    effectClass: 'nx-fx-spin-ring',
    icon: `<path d="M8 1a4 4 0 014 4c0 3-4 8-4 8S4 8 4 5a4 4 0 014-4z" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="none"/><circle cx="8" cy="5" r="1.6" fill="url(#emeraldGrad)"/>`,
  },

  'จ้าวแห่งเดือน': {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<path d="M2 12L4 5l4 4 4-4 2 7z" stroke="url(#goldStroke)" stroke-width="1.4" fill="url(#goldGrad)" fill-opacity="0.18" stroke-linejoin="round"/><path d="M2 12h12" stroke="url(#goldStroke)" stroke-width="1.4"/><circle cx="2" cy="5" r="1.3" fill="url(#goldRadial)"/><circle cx="8" cy="3" r="1.3" fill="url(#goldRadial)"/><circle cx="14" cy="5" r="1.3" fill="url(#goldRadial)"/>`,
  },
  'นักวางแผนการเงิน': {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<ellipse cx="8" cy="5" rx="4.5" ry="1.5" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/><path d="M3.5 5v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V5" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/><path d="M3.5 8v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V8" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/>`,
  },
  'Gold Walker': {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#goldStroke)" stroke-width="1.4" filter="url(#glowGold)"/><path d="M6 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" stroke="url(#goldGrad)" stroke-width="1.3" fill="none"/><path d="M8 4v1M8 11v1" stroke="url(#goldStroke)" stroke-width="1.3"/>`,
  },

  'Founder': {
    effectClass: 'nx-fx-legendary-star',
    icon: `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="url(#goldStroke)" stroke-width="1.5" fill="none"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="url(#goldGrad)" opacity="0.5"/>`,
  },

  'เสน่ห์ล้นเหลือ': {
    effectClass: 'nx-fx-glow-blue',
    icon: `<circle cx="5" cy="5" r="2.3" stroke="url(#sapphireGrad)" stroke-width="1.3"/><circle cx="11" cy="5" r="2.3" stroke="url(#cyanGrad)" stroke-width="1.3"/><path d="M1.5 14c0-2.5 1.5-4 3.5-4M14.5 14c0-2.5-1.5-4-3.5-4M5 10c1 0 3 .5 3 2s2-2 3-2" stroke="url(#sapphireGrad)" stroke-width="1.2"/>`,
  },
  'Social Butterfly': {
    effectClass: 'nx-fx-glow-blue',
    icon: `<circle cx="8" cy="4" r="2" stroke="url(#cyanGrad)" stroke-width="1.3"/><circle cx="3" cy="12" r="2" stroke="url(#sapphireGrad)" stroke-width="1.3"/><circle cx="13" cy="12" r="2" stroke="url(#amethystGrad)" stroke-width="1.3"/><path d="M8 6l-3.5 4.5M8 6l3.5 4.5M3.5 12h9" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.7"/>`,
  },

  // ── PHYSICAL / STREAK category ──
  'นักวิ่งผ่านร้อน': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 14c-3 0-5-2-5-5 0-1.5.5-3 2-4.5 0 2 1 3 1 3s.5-2.5 2-4.5c.5 2 2 3.5 2 3.5s1-1 .5-2.5c2 2 2.5 3.5 2.5 5 0 3-2 5-5 5z" stroke="url(#fireGrad)" stroke-width="1.4" fill="url(#fireGrad)" fill-opacity="0.22"/><path d="M6 10c0 1.1.9 2 2 2" stroke="url(#goldStroke)" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  'ร่างกายเหล็ก': {
    effectClass: 'nx-fx-shield',
    icon: `<path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" stroke="url(#sapphireGrad)" stroke-width="1.4" fill="url(#shieldGrad)" fill-opacity="0.35" stroke-linejoin="round"/><path d="M5.5 8.5l2 2 3-3" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  'นักกีฬาตัวจริง': {
    effectClass: 'nx-fx-lightning',
    icon: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.5" fill="url(#lightningGrad)" fill-opacity="0.2" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.2" fill="url(#goldGrad)" opacity="0.8"/>`,
  },
  'เจ้าแห่งความเจ็บปวด': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 2v12" stroke="url(#rubyGrad)" stroke-width="1.6" stroke-linecap="round"/><path d="M4 6l4-4 4 4M4 10l4 4 4-4" stroke="url(#rubyGrad)" stroke-width="1.3" stroke-linecap="round" fill="none"/><circle cx="8" cy="8" r="2" fill="url(#rubyGrad)" fill-opacity="0.2"/>`,
  },
  'Phoenix': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 3c-1 0-2.5 1-3 3 .5-.5 1-.8 2-.5C5.5 7 5 9 6 10.5c.3-1 .8-1.5 1.5-1.5-.5 1-.3 2.5.5 3.5.5-1.5 1-2 2-2-.5 1 0 2.5.5 3 .5-1.5 1-2.5 1.5-4C13 7.5 11.5 3 8 3z" stroke="url(#fireGrad)" stroke-width="1.3" fill="url(#fireGrad)" fill-opacity="0.18" stroke-linejoin="round"/>`,
  },

  // ── KNOWLEDGE / LEARNING category ──
  'ราชาแห่งความรู้': {
    effectClass: 'nx-fx-glow-purple',
    icon: `<path d="M3 4c0 0 2 0 5 1.5C11 4 13 4 13 4v9c0 0-2 0-5-1.5C5 13 3 13 3 13z" stroke="url(#amethystGrad)" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M8 4v9" stroke="url(#amethystGrad)" stroke-width="1.1"/><path d="M5.5 6.5h5M5.5 9h5M5.5 11.5h3" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.6"/>`,
  },
  'นักปราชญ์': {
    effectClass: 'nx-fx-glow-purple',
    icon: `<circle cx="8" cy="7" r="4.5" stroke="url(#amethystGrad)" stroke-width="1.3"/><path d="M5.5 5L6.5 7M10.5 5L9.5 7M7 7h2" stroke="url(#cyanGrad)" stroke-width="1.2" stroke-linecap="round"/><path d="M5.5 12h5l-1 2h-3z" stroke="url(#amethystGrad)" stroke-width="1.1" fill="none"/><path d="M6 12v1.5M10 12v1.5" stroke="url(#amethystGrad)" stroke-width="1.1"/>`,
  },
  'อัจฉริยะ': {
    effectClass: 'nx-fx-glow-purple',
    icon: `<path d="M5 10V8a3 3 0 016 0v2" stroke="url(#amethystGrad)" stroke-width="1.3" fill="none"/><path d="M4 10h8v2a2 2 0 01-4 0 2 2 0 01-4 0v-2z" stroke="url(#amethystGrad)" stroke-width="1.3" fill="url(#amethystGrad)" fill-opacity="0.1"/><path d="M8 5V3M5.5 5.5L4 4M10.5 5.5L12 4" stroke="url(#amethystGrad)" stroke-width="1.1"/><circle cx="8" cy="5" r="0.8" fill="url(#amethystGrad)" opacity="0.9"/>`,
  },

  // ── EXPLORATION / TRAVEL category ──
  'นักสำรวจตัวจริง': {
    effectClass: 'nx-fx-spin-ring',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.3"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="url(#emeraldGrad)" stroke-width="1.1"/><polygon points="8,5 9.5,8 8,7.5 6.5,8" fill="url(#rubyGrad)"/><polygon points="8,11 6.5,8 8,8.5 9.5,8" fill="url(#cyanGrad)" opacity="0.5"/>`,
  },
  'เจ้าแห่งแผนที่': {
    effectClass: 'nx-fx-spin-ring',
    icon: `<path d="M2 3l4 1.5 4-1.5 4 1.5v9l-4-1.5-4 1.5-4-1.5z" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M6 4.5v9M10 3v9" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.5"/><circle cx="8" cy="9" r="1.8" fill="url(#rubyGrad)" fill-opacity="0.3" stroke="url(#rubyGrad)" stroke-width="1"/>`,
  },
  'World Wanderer': {
    effectClass: 'nx-fx-spin-ring',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#sapphireGrad)" stroke-width="1.3"/><path d="M8 2c-1.6 2-1.6 8 0 12M8 2c1.6 2 1.6 8 0 12" stroke="url(#cyanGrad)" stroke-width="1" fill="none"/><path d="M2 8h12M3 5h10M3 11h10" stroke="url(#sapphireGrad)" stroke-width="0.9" opacity="0.55"/>`,
  },

  // ── SOCIAL / GUILD category ──
  'หัวหน้ากลุ่ม': {
    effectClass: 'nx-fx-glow-blue',
    icon: `<circle cx="8" cy="5" r="2.5" stroke="url(#cyanGrad)" stroke-width="1.3"/><path d="M2 14c0-3.5 2.5-5 6-5s6 1.5 6 5" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/><path d="M8 9v2l1.5 1.5" stroke="url(#goldStroke)" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  'เจ้าพ่อเครือข่าย': {
    effectClass: 'nx-fx-glow-blue',
    icon: `<circle cx="8" cy="4" r="2" stroke="url(#cyanGrad)" stroke-width="1.3"/><circle cx="3" cy="13" r="1.8" stroke="url(#sapphireGrad)" stroke-width="1.2"/><circle cx="13" cy="13" r="1.8" stroke="url(#amethystGrad)" stroke-width="1.2"/><path d="M8 6l-4 5.5M8 6l4 5.5M4 13h8" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.75"/>`,
  },

  // ── GENERAL / QUEST category ──
  'ผู้แสวงหา': {
    effectClass: 'nx-fx-glow',
    icon: `<path d="M8 1a4 4 0 014 4c0 3-4 8-4 8S4 8 4 5a4 4 0 014-4z" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/><circle cx="8" cy="5" r="1.6" fill="url(#cyanGrad)"/>`,
  },
  'นักล่าเป้าหมาย': {
    effectClass: 'nx-fx-glow',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#rubyGrad)" stroke-width="1.2"/><circle cx="8" cy="8" r="3.5" stroke="url(#rubyGrad)" stroke-width="1.2"/><circle cx="8" cy="8" r="1.3" fill="url(#rubyGrad)" filter="url(#glowWarm)"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="url(#rubyGrad)" stroke-width="1.2"/>`,
  },
  'ราชาภารกิจ': {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<path d="M4 6h8l1 8H3z" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.1" stroke-linejoin="round"/><path d="M2 6l2-3 2 1.5L8 2l2 1.5 2-1.5 2 3" stroke="url(#goldStroke)" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M6 10h4M6 12h3" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.7"/>`,
  },
  'ราชาแห่งควอสต์': {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<path d="M4 6h8l1 8H3z" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.1" stroke-linejoin="round"/><path d="M2 6l2-3 2 1.5L8 2l2 1.5 2-1.5 2 3" stroke="url(#goldStroke)" stroke-width="1.3" fill="none" stroke-linejoin="round"/>`,
  },

  // ── SPECIAL / LEGENDARY category ──
  'ตำนาน': {
    effectClass: 'nx-fx-legendary-star',
    icon: `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="url(#goldStroke)" stroke-width="1.5" filter="url(#glowGold)" fill="none"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="url(#goldGrad)" opacity="0.55"/>`,
  },
  'Immortal': {
    effectClass: 'nx-fx-legendary-star',
    icon: `<path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" stroke="url(#goldStroke)" stroke-width="1.5" fill="url(#goldGrad)" fill-opacity="0.08" stroke-linejoin="round" filter="url(#glowGold)"/><polygon points="8,5 9.5,9 8,8 6.5,9" fill="url(#rubyGrad)"/>`,
  },

  // ── SHOP EXCLUSIVE TITLES ──────────────────────────────────
  'The Shadow': {
    effectClass: 'nx-fx-shadow-pulse',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#shadowGrad)" stroke-width="1.3" fill="url(#shadowGrad)" fill-opacity="0.08"/><path d="M5 6c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.2-.7 2.2-1.7 2.7L8 14l-1.3-5.3C5.7 8.2 5 7.2 5 6z" stroke="url(#shadowGrad)" stroke-width="1.2" fill="none"/>`,
  },
  'Neon Ghost': {
    effectClass: 'nx-fx-glow-blue',
    icon: `<path d="M5 14V8a3 3 0 016 0v6l-1.5-1.5-1.5 1.5-1.5-1.5L5 14z" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.08"/><circle cx="6.5" cy="8.5" r="0.8" fill="url(#cyanGrad)"/><circle cx="9.5" cy="8.5" r="0.8" fill="url(#cyanGrad)"/>`,
  },
  'Thunder God': {
    effectClass: 'nx-fx-lightning',
    icon: `<polygon points="10,1 3,9 8,9 6,15 13,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.6" fill="url(#lightningGrad)" fill-opacity="0.3" stroke-linejoin="round" filter="url(#glowWarm)"/><circle cx="8" cy="8" r="1.5" fill="url(#goldGrad)" opacity="0.9"/>`,
  },
  'Frost Queen': {
    effectClass: 'nx-fx-frost',
    icon: `<path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="url(#frostGrad)" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="8" r="2.2" stroke="url(#frostGrad)" stroke-width="1.2" fill="url(#frostGrad)" fill-opacity="0.15"/><circle cx="8" cy="8" r="0.8" fill="url(#frostGrad)"/>`,
  },
  'Blood Moon': {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 2a6 6 0 100 12A4 4 0 018 2z" stroke="url(#rubyGrad)" stroke-width="1.3" fill="url(#rubyGrad)" fill-opacity="0.15" filter="url(#glowWarm)"/><circle cx="8" cy="8" r="2.5" stroke="url(#rubyGrad)" stroke-width="1.2" fill="none"/><circle cx="8" cy="8" r="0.9" fill="url(#rubyGrad)" opacity="0.9"/>`,
  },
  'Solar Flare': {
    effectClass: 'nx-fx-fire',
    icon: `<circle cx="8" cy="8" r="3" stroke="url(#fireGrad)" stroke-width="1.4" fill="url(#goldGrad)" fill-opacity="0.25" filter="url(#glowGold)"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M12.5 3.5L11 5M5 11l-1.5 1.5" stroke="url(#fireGrad)" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  'Chaos Bringer': {
    effectClass: 'nx-fx-chaos',
    icon: `<path d="M8 2l1.8 5.5H16l-4.9 3.5 1.8 5.5L8 13l-4.9 3.5 1.8-5.5L0 7.5h6.2z" stroke="url(#rubyGrad)" stroke-width="1.2" fill="url(#rubyGrad)" fill-opacity="0.12" stroke-linejoin="round"/><circle cx="8" cy="9" r="2" fill="url(#amethystGrad)" fill-opacity="0.5"/>`,
  },
  'Eternal Legend': {
    effectClass: 'nx-fx-legendary-star',
    icon: `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="url(#goldStroke)" stroke-width="1.5" filter="url(#glowGold)" fill="url(#goldGrad)" fill-opacity="0.15"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="url(#goldGrad)" opacity="0.6"/><circle cx="8" cy="8" r="1" fill="url(#goldRadial)"/>`,
  },
  'Void Walker': {
    effectClass: 'nx-fx-void',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#voidGrad)" stroke-width="1.3" fill="none"/><circle cx="8" cy="8" r="3.5" stroke="url(#amethystGrad)" stroke-width="1.1" fill="url(#voidGrad)" fill-opacity="0.2"/><circle cx="8" cy="8" r="1.3" fill="url(#amethystGrad)" opacity="0.9"/><path d="M8 2v1M8 13v1M2 8h1M13 8h1M4 4l.7.7M11.3 11.3l.7.7M4 12l.7-.7M11.3 4.7l.7-.7" stroke="url(#amethystGrad)" stroke-width="1" stroke-linecap="round"/>`,
  },
  'Rainbow Nexus': {
    effectClass: 'nx-fx-rainbow',
    icon: `<path d="M2 12c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="url(#rainbowGrad)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M4 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="url(#cyanGrad)" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M6 12c0-1.1.9-2 2-2s2 .9 2 2" stroke="url(#goldStroke)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  },
}

// ── Category-based fallback icon map ──
// ถ้า title name ไม่อยู่ใน TITLE_EFFECT_MAP จะใช้ category แทน
const CATEGORY_EFFECT_MAP = {
  physical:    {
    effectClass: 'nx-fx-fire',
    icon: `<path d="M8 13c-2.5 0-4-1.5-4-4 0-1.2.4-2.4 1.6-3.5 0 1.5.8 2.3.8 2.3s.4-2 1.6-3.5c.4 1.5 1.6 2.7 1.6 2.7s.8-.7.4-2C11.6 6.5 12 7.7 12 9c0 2.5-1.6 4-4 4z" stroke="url(#fireGrad)" stroke-width="1.3" fill="url(#fireGrad)" fill-opacity="0.18"/><circle cx="8" cy="10" r="1.3" fill="url(#goldRadial)" opacity="0.7"/>`,
  },
  streak:      {
    effectClass: 'nx-fx-fire',
    icon: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7" stroke="url(#lightningGrad)" stroke-width="1.4" fill="url(#lightningGrad)" fill-opacity="0.2" stroke-linejoin="round"/>`,
  },
  knowledge:   {
    effectClass: 'nx-fx-glow-purple',
    icon: `<path d="M3 4c0 0 2 0 5 1.5C11 4 13 4 13 4v9c0 0-2 0-5-1.5C5 13 3 13 3 13z" stroke="url(#amethystGrad)" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M8 4v9" stroke="url(#amethystGrad)" stroke-width="1.1"/><path d="M5.5 7h5M5.5 10h3" stroke="url(#cyanGrad)" stroke-width="0.9" opacity="0.6"/>`,
  },
  learning:    {
    effectClass: 'nx-fx-glow-purple',
    icon: `<circle cx="8" cy="7" r="4" stroke="url(#amethystGrad)" stroke-width="1.3"/><path d="M8 3v1M5 5l.8.8M11 5l-.8.8" stroke="url(#amethystGrad)" stroke-width="1.1"/><circle cx="8" cy="7" r="1.5" fill="url(#amethystGrad)" opacity="0.6"/>`,
  },
  exploration: {
    effectClass: 'nx-fx-spin-ring',
    icon: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.3"/><path d="M8 2.5v2M8 11.5v2M2.5 8h2M11.5 8h2" stroke="url(#emeraldGrad)" stroke-width="1"/><polygon points="8,5 9.5,9 8,7.5 6.5,9" fill="url(#rubyGrad)"/><polygon points="8,11 6.5,7 8,8.5 9.5,7" fill="url(#cyanGrad)" opacity="0.45"/>`,
  },
  social:      {
    effectClass: 'nx-fx-glow-blue',
    icon: `<circle cx="5" cy="5" r="2.2" stroke="url(#cyanGrad)" stroke-width="1.3"/><circle cx="11" cy="5" r="2.2" stroke="url(#sapphireGrad)" stroke-width="1.3"/><path d="M1.5 14c0-2.5 1.5-4 3.5-4M14.5 14c0-2.5-1.5-4-3.5-4M5 10c1 0 3 .5 3 2s2-2 3-2" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,
  },
  guild:       {
    effectClass: 'nx-fx-glow-blue',
    icon: `<path d="M8 2l6 4v5a6 6 0 01-6 3 6 6 0 01-6-3V6z" stroke="url(#amethystGrad)" stroke-width="1.3" fill="none" stroke-linejoin="round"/><circle cx="8" cy="8" r="2" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,
  },
  quest:       {
    effectClass: 'nx-fx-glow',
    icon: `<rect x="3" y="3" width="10" height="12" stroke="url(#cyanGrad)" stroke-width="1.3"/><path d="M6 3V2h4v1" stroke="url(#cyanGrad)" stroke-width="1.2"/><path d="M5.5 7.5l1.5 1.5 3-3" stroke="url(#emeraldGrad)" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 11.5h5" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.5"/>`,
  },
  general:     {
    effectClass: 'nx-fx-glow',
    icon: `<polygon points="8,2 10,6.5 15,6.5 11,9.5 13,14 8,11 3,14 5,9.5 1,6.5 6,6.5" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.1" stroke-linejoin="round"/>`,
  },
  finance:     {
    effectClass: 'nx-fx-gold-pulse',
    icon: `<ellipse cx="8" cy="5" rx="4.5" ry="1.5" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/><path d="M3.5 5v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V5" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/><path d="M3.5 8v3c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V8" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/>`,
  },
  special:     {
    effectClass: 'nx-fx-legendary-star',
    icon: `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="url(#goldStroke)" stroke-width="1.5" fill="none" filter="url(#glowGold)"/>`,
  },
}

const DEFAULT_TITLE_ICON_PATH = `<polygon points="8,2 10,6.5 15,6.5 11,9.5 13,14 8,11 3,14 5,9.5 1,6.5 6,6.5" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.1" stroke-linejoin="round"/>`

// ── Resolve title effect (name → category → default) ──
function resolveTitleEffect(titleName, category) {
  if (TITLE_EFFECT_MAP[titleName]) return TITLE_EFFECT_MAP[titleName]
  const cat = (category || '').toLowerCase()
  if (CATEGORY_EFFECT_MAP[cat]) return CATEGORY_EFFECT_MAP[cat]
  return { effectClass: 'nx-fx-glow', icon: DEFAULT_TITLE_ICON_PATH }
}


// ============================================================
// CSS INJECTION  v3.0  —  World-Class Edition
// ============================================================
export function injectTitleStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('nexus-title-styles-v3')) return

  const css = `
/* ═══════════════════════════════════════════════════════════
   NEXUS LIFE — Title & Badge Styles v3.0   World-Class Edition
═══════════════════════════════════════════════════════════ */

/* ── KEYFRAMES — Metallic shimmer ── */
@keyframes shimmerSlide {
  0%   { background-position: -300% center; }
  100% { background-position: 300% center; }
}
@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50%     { background-position: 100% 50%; }
}
@keyframes nxIconPulse {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.6; }
}
@keyframes nxRarePing {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.015); }
}

/* ── Rarity card pulses ── */
@keyframes legendaryPulse {
  0%,100% {
    border-color: rgba(255,215,0,0.6);
    box-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,149,0,0.18);
  }
  50% {
    border-color: rgba(255,200,0,1);
    box-shadow: 0 0 36px rgba(255,215,0,0.75), 0 0 70px rgba(255,107,0,0.35), inset 0 0 16px rgba(255,215,0,0.1);
  }
}
@keyframes epicFloat {
  0%,100% { box-shadow: 0 0 12px rgba(204,102,255,0.3); }
  50%     { box-shadow: 0 0 28px rgba(204,102,255,0.6), 0 0 50px rgba(238,153,255,0.2); }
}
@keyframes rareTwinkle {
  0%,100% { opacity: 1; box-shadow: 0 0 6px rgba(68,170,255,0.2); }
  50%     { opacity: 0.85; box-shadow: 0 0 14px rgba(68,170,255,0.4); }
}

/* ── Shimmer sweep ── */
@keyframes legendaryCardShimmer {
  0%   { left: -140%; }
  100% { left: 140%; }
}

/* ── Hex frame pulsers ── */
@keyframes nxLegRing     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes nxEpicRing    { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
@keyframes nxHexLegPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 0.95; filter: blur(0.5px); } }
@keyframes nxHexEpicPulse { 0%,100% { opacity: 0.45; } 50% { opacity: 0.8; } }
@keyframes nxHexRarePulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.65; } }

/* ── Light-ray sweep across text ── */
@keyframes nxTextRay {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* ── 3D perspective breathing ── */
@keyframes nxPerspBreath {
  0%,100% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  33%     { transform: perspective(120px) rotateX(1.5deg) rotateY(-1deg); }
  66%     { transform: perspective(120px) rotateX(-1deg) rotateY(1.5deg); }
}

/* ── LIGHTNING FX ── */
@keyframes nxShake {
  0%,100% { transform: translateX(0); }
  15%     { transform: translateX(-2.5px) rotate(-1.5deg); }
  30%     { transform: translateX(2.5px) rotate(1.5deg); }
  45%     { transform: translateX(-1.5px); }
  60%     { transform: translateX(1.5px); }
  75%     { transform: translateX(-0.5px); }
}
@keyframes nxLightningFlash {
  0%,89%,100% { opacity: 0; }
  90%         { opacity: 1; }
  95%         { opacity: 0.4; }
}
@keyframes nxBoltSweep {
  0%   { transform: scaleX(0) translateX(-50%); opacity: 0; }
  10%  { transform: scaleX(1) translateX(0); opacity: 0.6; }
  40%  { transform: scaleX(1.2) translateX(10%); opacity: 0.3; }
  100% { transform: scaleX(0) translateX(100%); opacity: 0; }
}

/* ── FIRE FX ── */
@keyframes nxFlicker {
  0%,100% { transform: scaleY(1) scaleX(1); opacity: 0.9; }
  20%     { transform: scaleY(1.04) scaleX(0.97); opacity: 0.75; }
  40%     { transform: scaleY(0.97) scaleX(1.03); opacity: 1; }
  60%     { transform: scaleY(1.05) scaleX(0.96); opacity: 0.8; }
  80%     { transform: scaleY(0.98) scaleX(1.02); opacity: 0.95; }
}
@keyframes nxFireGlow {
  0%,100% { box-shadow: 0 0 8px rgba(255,90,0,0.4), inset 0 0 4px rgba(255,150,0,0.1); }
  50%     { box-shadow: 0 0 22px rgba(255,60,0,0.7), 0 -4px 12px rgba(255,200,0,0.3), inset 0 0 8px rgba(255,100,0,0.15); }
}

/* ── SHIELD FX ── */
@keyframes nxShieldPing {
  0%   { box-shadow: 0 0 0 0 rgba(0,245,255,0.7); }
  70%  { box-shadow: 0 0 0 10px rgba(0,245,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,245,255,0); }
}
@keyframes nxShieldScale {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.04); }
}

/* ── GOLD FX ── */
@keyframes nxGoldGlow {
  0%,100% { box-shadow: 0 0 8px rgba(255,215,0,0.45), inset 0 0 6px rgba(255,215,0,0.06); }
  50%     { box-shadow: 0 0 24px rgba(255,215,0,0.85), 0 0 48px rgba(255,149,0,0.3), inset 0 0 12px rgba(255,215,0,0.14); }
}
@keyframes nxCoinSpin {
  0%   { transform: scaleX(1); }
  50%  { transform: scaleX(0.1); }
  100% { transform: scaleX(1); }
}

/* ── SPIN RING (Compass) ── */
@keyframes nxSpinRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── PURPLE GLOW ── */
@keyframes nxPurpleWave {
  0%,100% { box-shadow: 0 0 10px rgba(204,102,255,0.35); }
  50%     { box-shadow: 0 0 28px rgba(238,153,255,0.65), 0 0 8px rgba(150,50,255,0.4); }
}

/* ── BLUE GLOW ── */
@keyframes nxBlueGlow {
  0%,100% { box-shadow: 0 0 8px rgba(68,170,255,0.35); }
  50%     { box-shadow: 0 0 20px rgba(0,204,255,0.65), 0 0 6px rgba(0,150,255,0.4); }
}

/* ── LEGENDARY STAR ── */
@keyframes nxLegStar {
  0%,100% {
    box-shadow: 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,149,0,0.22);
    border-color: rgba(255,215,0,0.65);
  }
  50% {
    box-shadow: 0 0 36px rgba(255,215,0,0.85), 0 0 70px rgba(255,107,0,0.4);
    border-color: rgba(255,220,0,1);
  }
}

/* ── PARTICLE float-up ── */
@keyframes nxParticleRise {
  0%   { transform: translate(var(--px,0px), 0) scale(1); opacity: 0.9; }
  100% { transform: translate(var(--px,0px), -20px) scale(0); opacity: 0; }
}
@keyframes nxParticleOrbit {
  from { transform: rotate(0deg) translateX(var(--pr,12px)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--pr,12px)) rotate(-360deg); }
}
@keyframes nxSparkle {
  0%   { transform: scale(0) rotate(0deg); opacity: 0; }
  30%  { transform: scale(1.2) rotate(90deg); opacity: 1; }
  70%  { transform: scale(0.9) rotate(180deg); opacity: 0.7; }
  100% { transform: scale(0) rotate(270deg); opacity: 0; }
}

/* ═══════════════════════════════════════════════════════════
   .nx-title-badge  — World-Class Small Badge
═══════════════════════════════════════════════════════════ */
.nx-title-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  position: relative;
  overflow: visible;
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  padding: 4px 12px 4px 8px;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  white-space: nowrap;
  vertical-align: middle;
  will-change: transform, box-shadow;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s ease;
}
.nx-title-badge:hover {
  transform: scale(1.08) translateY(-1px);
  filter: brightness(1.25);
}

/* ── Metallic light ray sweep ── */
.nx-title-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255,255,255,0.22) 40%,
    rgba(255,255,255,0.08) 50%,
    transparent 70%
  );
  background-size: 300% 100%;
  animation: shimmerSlide var(--shimmer-dur, 3s) linear infinite;
  pointer-events: none;
}

/* Badge icon wrapper */
.nx-badge-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  position: relative;
  z-index: 2;
  will-change: transform;
}

/* ── Rarity variants ── */
.nx-title-badge.rarity-common {
  --shimmer-dur: 6s;
  color: #aaaaaa;
  background: rgba(170,170,170,0.07);
  border: 1px solid rgba(170,170,170,0.18);
  text-shadow: 0 0 4px rgba(170,170,170,0.2);
}
.nx-title-badge.rarity-common .nx-title-text {
  background: linear-gradient(90deg,#888 0%,#ccc 30%,#ddd 50%,#ccc 70%,#888 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nxTextRay 5s linear infinite;
}

.nx-title-badge.rarity-rare {
  --shimmer-dur: 2.8s;
  color: #44aaff;
  background: linear-gradient(90deg, rgba(68,170,255,0.1), rgba(0,240,255,0.07));
  border: 1px solid rgba(68,170,255,0.4);
  animation: rareTwinkle 3s ease-in-out infinite;
}
.nx-title-badge.rarity-rare .nx-title-text {
  background: linear-gradient(90deg,#0060bb 0%,#44aaff 30%,#aaeeff 50%,#44aaff 70%,#0060bb 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nxTextRay 2.8s linear infinite;
}

.nx-title-badge.rarity-epic {
  --shimmer-dur: 1.8s;
  color: #cc66ff;
  background: linear-gradient(90deg, rgba(204,102,255,0.12), rgba(238,153,255,0.07));
  border: 1px solid rgba(204,102,255,0.5);
  animation: epicFloat 2.5s ease-in-out infinite;
}
.nx-title-badge.rarity-epic .nx-title-text {
  background: linear-gradient(90deg,#660099 0%,#cc66ff 30%,#ffccff 50%,#cc66ff 70%,#660099 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nxTextRay 1.8s linear infinite;
}

.nx-title-badge.rarity-legendary {
  --shimmer-dur: 1.0s;
  color: #ffd700;
  background: linear-gradient(90deg, rgba(255,215,0,0.14), rgba(255,107,0,0.09), rgba(255,215,0,0.14));
  border: 1px solid rgba(255,215,0,0.65);
  animation: legendaryPulse 1.6s ease-in-out infinite;
}
.nx-title-badge.rarity-legendary .nx-title-text {
  background: linear-gradient(90deg,#996600 0%,#ffd700 20%,#fff8a0 40%,#ff9500 60%,#ffd700 80%,#996600 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nxTextRay 1.0s linear infinite;
}
.nx-title-badge.rarity-legendary::after {
  background: linear-gradient(105deg, transparent 15%, rgba(255,240,80,0.4) 40%, rgba(255,255,200,0.15) 50%, transparent 75%);
  background-size: 300% 100%;
  animation: shimmerSlide 1.0s linear infinite;
}

/* ── PARTICLE dot — Legendary animated orbit ── */
.nx-title-badge.rarity-legendary .nx-particle-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: gold;
  top: 50%;
  left: 50%;
  pointer-events: none;
  z-index: 5;
  box-shadow: 0 0 4px gold;
}
.nx-title-badge.rarity-legendary .nx-particle-dot:nth-child(1) { --pr: 18px; animation: nxParticleOrbit 1.8s linear infinite; }
.nx-title-badge.rarity-legendary .nx-particle-dot:nth-child(2) { --pr: 18px; animation: nxParticleOrbit 1.8s linear 0.6s infinite; background: #ff9500; box-shadow: 0 0 4px #ff9500; }
.nx-title-badge.rarity-legendary .nx-particle-dot:nth-child(3) { --pr: 18px; animation: nxParticleOrbit 1.8s linear 1.2s infinite; background: #ffe566; box-shadow: 0 0 4px #ffe566; }

/* ── SPARKLE dots — Epic ── */
.nx-title-badge.rarity-epic .nx-sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 5;
}
.nx-title-badge.rarity-epic .nx-sparkle:nth-child(1) {
  top: -2px; left: 30%;
  background: #ee99ff;
  box-shadow: 0 0 4px #cc66ff;
  animation: nxSparkle 2.2s ease-in-out infinite;
}
.nx-title-badge.rarity-epic .nx-sparkle:nth-child(2) {
  top: -2px; right: 25%;
  background: #cc88ff;
  box-shadow: 0 0 4px #aa44ff;
  animation: nxSparkle 2.2s ease-in-out 0.7s infinite;
}

/* ── Rare sparkle ── */
.nx-title-badge.rarity-rare .nx-sparkle {
  position: absolute;
  width: 3px; height: 3px;
  border-radius: 50%;
  pointer-events: none;
  top: -1px; right: 20%;
  background: #88ddff;
  box-shadow: 0 0 4px #44aaff;
  animation: nxSparkle 3s ease-in-out infinite;
  z-index: 5;
}

/* ── Hover: 3D perspective + particle burst ── */
.nx-title-badge:hover {
  transform: scale(1.1) translateY(-2px) perspective(100px) rotateX(-3deg);
}

/* ═══════════════════════════════════════════════
   SPECIAL FX CLASSES
═══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   EFFECT TEXT ANIMATIONS — ตัวหนังสือแต่ละฉายา
   (override rarity color ด้วย effectClass)
══════════════════════════════════════════════════ */

/* LIGHTNING — ตัวหนังสือสีเหลืองไฟฟ้า วิ่งสายฟ้า */
@keyframes lightningText {
  0%,90%,100% { background-position: -300% center; opacity:1; }
  92%          { opacity:0.3; }
  94%          { opacity:1; background-position:300% center; }
  96%          { opacity:0.5; }
  98%          { opacity:1; }
}
.nx-title-badge.nx-fx-lightning .nx-title-text {
  background: linear-gradient(90deg,#886600,#ffe566,#ffffff,#ffe566,#ffaa00,#886600) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: lightningText 2s linear infinite !important;
}

/* FIRE — ตัวหนังสือสีไฟ ส้ม-แดง-เหลือง ลุกไหม้ */
@keyframes fireText {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.nx-title-badge.nx-fx-fire .nx-title-text {
  background: linear-gradient(90deg,#cc2200,#ff4400,#ff8800,#ffcc00,#ff4400,#cc2200) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: fireText 1.5s ease-in-out infinite !important;
}

/* SHIELD — ตัวหนังสือสีฟ้าเหล็ก แข็งแกร่ง */
@keyframes shieldText {
  0%,100% { background-position: 0% center; }
  50%     { background-position: 100% center; }
}
.nx-title-badge.nx-fx-shield .nx-title-text {
  background: linear-gradient(90deg,#003366,#0066cc,#66ccff,#ffffff,#66ccff,#0066cc,#003366) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shieldText 3s ease-in-out infinite !important;
}

/* GLOW — ตัวหนังสือสีขาว/ฟ้า เรืองแสง */
@keyframes glowText {
  0%,100% { filter: brightness(1); opacity:1; }
  50%      { filter: brightness(1.4); opacity:0.85; }
}
.nx-title-badge.nx-fx-glow .nx-title-text {
  background: linear-gradient(90deg,#aaccff,#ffffff,#aaccff) !important;
  background-size: 200% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shimmerSlide 2.5s linear infinite, glowText 2s ease-in-out infinite !important;
}

/* GLOW-BLUE — ตัวหนังสือ cyan เรืองแสงฟ้า */
.nx-title-badge.nx-fx-glow-blue .nx-title-text {
  background: linear-gradient(90deg,#004488,#00aaff,#44ffff,#ffffff,#44ffff,#00aaff,#004488) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shimmerSlide 2s linear infinite !important;
}

/* GLOW-PURPLE — ตัวหนังสือม่วง เวทย์มนตร์ */
.nx-title-badge.nx-fx-glow-purple .nx-title-text {
  background: linear-gradient(90deg,#440066,#9900ff,#dd66ff,#ffffff,#dd66ff,#9900ff,#440066) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shimmerSlide 1.8s linear infinite !important;
}

/* GOLD-PULSE — ตัวหนังสือทอง เต้นเป็นจังหวะ */
@keyframes goldText {
  0%   { background-position: 0% center; }
  100% { background-position: 300% center; }
}
.nx-title-badge.nx-fx-gold-pulse .nx-title-text {
  background: linear-gradient(90deg,#664400,#cc8800,#ffd700,#fff8a0,#ffaa00,#ffd700,#cc8800,#664400) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: goldText 1.5s linear infinite !important;
}

/* SPIN-RING — ตัวหนังสือเขียว นักสำรวจ */
@keyframes explorerText {
  0%,100% { background-position: 0% center; }
  50%      { background-position: 100% center; }
}
.nx-title-badge.nx-fx-spin-ring .nx-title-text {
  background: linear-gradient(90deg,#004422,#00aa55,#44ff88,#ffffff,#44ff88,#00aa55,#004422) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shimmerSlide 2.5s linear infinite !important;
}

/* LEGENDARY-STAR — ตัวหนังสือทองระยิบระยับ */
.nx-title-badge.nx-fx-legendary-star .nx-title-text {
  background: linear-gradient(90deg,#996600,#ffd700,#fff8a0,#ff9500,#ffd700,#fff8a0,#996600) !important;
  background-size: 300% !important;
  -webkit-background-clip: text !important; background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: goldText 0.9s linear infinite !important;
  text-shadow: 0 0 20px rgba(255,215,0,0.5);
}

/* ── LIGHTNING ── */
.nx-title-badge.nx-fx-lightning .nx-badge-icon-wrap {
  animation: nxShake 2.2s ease-in-out infinite;
}
/* Lightning bolt line across badge */
.nx-title-badge.nx-fx-lightning::before {
  content: '';
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffe566 40%, #ffffff 50%, #ffe566 60%, transparent);
  transform: scaleX(0);
  transform-origin: left;
  animation: nxBoltSweep 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 4;
  opacity: 0;
  animation: nxLightningFlash 3s ease-in-out infinite;
}

/* ── FIRE ── */
.nx-title-badge.nx-fx-fire {
  animation: nxFireGlow 1.5s ease-in-out infinite, nxFlicker 1.8s ease-in-out infinite !important;
}
.nx-title-badge.nx-fx-fire.rarity-legendary {
  animation: nxFireGlow 1.2s ease-in-out infinite, nxFlicker 1.3s ease-in-out infinite, legendaryPulse 1.6s ease-in-out infinite !important;
}

/* ── SHIELD ── */
.nx-title-badge.nx-fx-shield {
  animation: nxShieldPing 2s ease-out infinite, nxShieldScale 2s ease-in-out infinite !important;
}

/* ── GOLD ── */
.nx-title-badge.nx-fx-gold-pulse {
  animation: nxGoldGlow 1.8s ease-in-out infinite !important;
}

/* ── SPIN RING — dashed rotating outline ── */
.nx-title-badge.nx-fx-spin-ring::before {
  content: '';
  position: absolute;
  inset: -2px;
  border: 1.5px dashed rgba(68,255,136,0.5);
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  animation: nxSpinRing 3.5s linear infinite;
  pointer-events: none;
  z-index: 3;
}

/* ── PURPLE GLOW ── */
.nx-title-badge.nx-fx-glow-purple {
  animation: nxPurpleWave 2s ease-in-out infinite !important;
}

/* ── WARM GLOW ── */
.nx-title-badge.nx-fx-glow {
  animation: nxGoldGlow 3s ease-in-out infinite !important;
  --shimmer-dur: 1.6s;
}

/* ── BLUE GLOW ── */
.nx-title-badge.nx-fx-glow-blue {
  animation: nxBlueGlow 2.3s ease-in-out infinite !important;
}

/* ── LEGENDARY STAR (Founder) ── */
.nx-title-badge.nx-fx-legendary-star {
  animation: nxLegStar 1.6s ease-in-out infinite !important;
}
.nx-title-badge.nx-fx-legendary-star .nx-badge-icon-wrap {
  animation: nxShake 4s ease-in-out infinite;
}


/* ═══════════════════════════════════════════════
   .nx-title-card  (full card)
═══════════════════════════════════════════════ */
.nx-title-card {
  position: relative;
  overflow: hidden;
  padding: 16px;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease;
  border: 1px solid;
  background: rgba(1,10,15,0.75);
  will-change: transform;
  transform-style: preserve-3d;
  backdrop-filter: blur(4px);
}
.nx-title-card:hover {
  transform: translateY(-3px) perspective(300px) rotateX(1.5deg);
}

/* Corner accent marks */
.nx-title-card::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 14px; height: 14px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  opacity: 0.7;
  pointer-events: none;
}
.nx-title-card::after {
  content: '';
  position: absolute;
  bottom: -1px; right: -1px;
  width: 14px; height: 14px;
  border-bottom: 2px solid currentColor;
  border-right: 2px solid currentColor;
  opacity: 0.7;
  pointer-events: none;
}
.nx-title-card .nx-card-shimmer {
  position: absolute;
  top: 0; bottom: 0;
  width: 70%;
  background: linear-gradient(105deg, transparent, rgba(255,255,255,0.07), transparent);
  pointer-events: none;
  animation: legendaryCardShimmer var(--card-shimmer-dur, 4s) linear infinite;
}

/* Rarity card variants */
.nx-title-card.rarity-common   { --card-shimmer-dur:7s;   border-color: rgba(170,170,170,0.2);  background: linear-gradient(135deg,rgba(170,170,170,0.04),rgba(170,170,170,0.01)); color: #aaa; }
.nx-title-card.rarity-common:hover   { box-shadow: 0 6px 16px rgba(0,0,0,0.5); }
.nx-title-card.rarity-rare    { --card-shimmer-dur:3.5s;  border-color: rgba(68,170,255,0.4);  background: linear-gradient(135deg,rgba(68,170,255,0.07),rgba(0,240,255,0.04)); color: #44aaff; animation: rareTwinkle 3s ease-in-out infinite; }
.nx-title-card.rarity-rare:hover    { box-shadow: 0 6px 24px rgba(68,170,255,0.22); border-color: rgba(68,170,255,0.6); }
.nx-title-card.rarity-epic    { --card-shimmer-dur:2.5s;  border-color: rgba(204,102,255,0.5); background: linear-gradient(135deg,rgba(204,102,255,0.1),rgba(238,153,255,0.05)); color: #cc66ff; animation: epicFloat 2.5s ease-in-out infinite; }
.nx-title-card.rarity-epic:hover    { box-shadow: 0 6px 30px rgba(204,102,255,0.35); border-color: rgba(204,102,255,0.75); }
.nx-title-card.rarity-legendary { --card-shimmer-dur:1.5s; border-color: rgba(255,215,0,0.6); background: linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,107,0,0.06),rgba(255,215,0,0.08)); color: #ffd700; animation: legendaryPulse 1.6s ease-in-out infinite; }
.nx-title-card.rarity-legendary:hover { box-shadow: 0 8px 40px rgba(255,215,0,0.4), 0 0 20px rgba(255,149,0,0.2); border-color: rgba(255,215,0,0.9); }

.nx-title-card.nx-locked { opacity: 0.35; filter: grayscale(0.85); }
.nx-title-card.nx-locked:hover { transform: none; }

/* Card inner elements */
.nx-title-name {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  font-weight: 700;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% auto;
  animation: nxTextRay 3s linear infinite;
  display: inline-block;
  margin-bottom: 4px;
  letter-spacing: 1.5px;
  /* Multi-layer text shadow via filter */
  filter: drop-shadow(0 0 3px rgba(255,255,255,0.1));
}
/* Rarity metallic gradients for title name */
.nx-title-name.rarity-common    { background-image: linear-gradient(90deg,#666 0%,#bbb 30%,#eee 50%,#bbb 70%,#666 100%); animation-duration: 7s; }
.nx-title-name.rarity-rare      { background-image: linear-gradient(90deg,#003366 0%,#44aaff 25%,#aaeeff 50%,#44aaff 75%,#003366 100%); animation-duration: 3.5s; }
.nx-title-name.rarity-epic      { background-image: linear-gradient(90deg,#440066 0%,#cc66ff 20%,#ffccff 40%,#9933ff 60%,#cc66ff 80%,#440066 100%); animation-duration: 2.5s; }
.nx-title-name.rarity-legendary { background-image: linear-gradient(90deg,#996600 0%,#ffd700 15%,#fff8a0 30%,#ffaa00 45%,#ff6600 60%,#ffd700 75%,#ffeeaa 85%,#996600 100%); animation-duration: 1.4s; }

.nx-rarity-badge {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 7px;
  letter-spacing: 2px;
  padding: 2px 8px;
  border: 1px solid currentColor;
  text-transform: uppercase;
  opacity: 0.9;
  white-space: nowrap;
  flex-shrink: 0;
}
.nx-class-icon-wrap {
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.35);
  border: 1px solid var(--cls-color, rgba(0,245,255,0.35));
  box-shadow: 0 0 10px var(--cls-color, rgba(0,245,255,0.18));
  flex-shrink: 0;
}
.nx-equip-btn {
  display: block; width: 100%; margin-top: 10px;
  font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: 2.5px; padding: 8px;
  background: transparent;
  border: 1px solid var(--nx-btn-color, rgba(0,245,255,0.4));
  color: var(--nx-btn-color, #00f5ff);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  position: relative; overflow: hidden;
  will-change: transform;
}
.nx-equip-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%);
  background-size: 300% 100%; animation: shimmerSlide 2s linear infinite;
  pointer-events: none; opacity: 0; transition: opacity 0.25s;
}
.nx-equip-btn:hover {
  background: rgba(var(--nx-btn-rgb,0,245,255),0.12);
  border-color: var(--nx-btn-color,#00f5ff);
  box-shadow: 0 0 14px rgba(var(--nx-btn-rgb,0,245,255),0.3);
  transform: translateY(-1px);
}
.nx-equip-btn:hover::after { opacity: 1; }
.nx-equip-btn.nx-btn-equipped { border-color: var(--nx-btn-color,#ffd700); background: rgba(var(--nx-btn-rgb,0,245,255),0.12); cursor: default; opacity: 0.8; }
.nx-equip-btn.nx-btn-equipped::after { display: none; }

.nx-equipped-tag {
  display: inline-block; font-family: 'Orbitron', monospace; font-size: 7px; letter-spacing: 2px;
  padding: 3px 8px; background: rgba(255,215,0,0.12); border: 1px solid rgba(255,215,0,0.55);
  color: #ffd700; animation: legendaryPulse 2s ease-in-out infinite;
}
.nx-lock-icon { position: absolute; top: 8px; left: 8px; opacity: 0.5; }

/* ═══════════════════════════════════════════════
   .nx-badge-item  (badge card)
═══════════════════════════════════════════════ */
.nx-badge-item {
  position: relative; padding: 14px 8px; text-align: center;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
  border: 1px solid; background: rgba(1,10,15,0.65); overflow: hidden;
  will-change: transform;
}
.nx-badge-item:hover { transform: translateY(-2px) scale(1.02); }
.nx-badge-item.rarity-common  { border-color: rgba(170,170,170,0.22); }
.nx-badge-item.rarity-rare    { border-color: rgba(68,170,255,0.38); }
.nx-badge-item.rarity-rare:hover    { box-shadow: 0 0 16px rgba(68,170,255,0.25); border-color: rgba(68,170,255,0.6); }
.nx-badge-item.rarity-epic    { border-color: rgba(204,102,255,0.45); }
.nx-badge-item.rarity-epic:hover    { box-shadow: 0 0 22px rgba(204,102,255,0.35); border-color: rgba(204,102,255,0.7); }
.nx-badge-item.rarity-legendary { border-color: rgba(255,215,0,0.6); animation: legendaryPulse 2s ease-in-out infinite; }
.nx-badge-item.rarity-legendary:hover { box-shadow: 0 0 32px rgba(255,215,0,0.45); }
.nx-badge-item.nx-locked { opacity: 0.28; filter: grayscale(1); }
.nx-badge-item.nx-locked:hover { transform: none; box-shadow: none; }

.nx-badge-icon { font-size: 28px; margin-bottom: 6px; display: block; }
.nx-badge-name { font-family: 'Orbitron', monospace; font-size: 7px; letter-spacing: 1.5px; color: #c8f0f5; line-height: 1.3; margin-bottom: 4px; }
.nx-badge-desc { font-size: 10px; color: #5a8a90; line-height: 1.4; }
.nx-badge-cat  { font-family: 'Orbitron', monospace; font-size: 6px; letter-spacing: 1px; padding: 2px 5px; margin-top: 5px; display: inline-block; background: rgba(204,102,255,0.08); border: 1px solid rgba(204,102,255,0.22); color: #cc66ff; }
.nx-badge-rarity-pip { position: absolute; top: 4px; right: 4px; font-family: 'Orbitron', monospace; font-size: 6px; letter-spacing: 0.5px; padding: 1px 5px; border: 1px solid currentColor; text-transform: uppercase; }
.nx-badge-rarity-pip.rarity-common    { color: #888; }
.nx-badge-rarity-pip.rarity-rare      { color: #44aaff; }
.nx-badge-rarity-pip.rarity-epic      { color: #cc66ff; }
.nx-badge-rarity-pip.rarity-legendary { color: #ffd700; animation: legendaryPulse 2s ease-in-out infinite; }
.nx-badge-unlock-date { font-family: 'Orbitron', monospace; font-size: 7px; color: #00f5ff; margin-top: 5px; }

.nx-title-desc { font-size: 11px; color: #5a8a90; line-height: 1.5; margin-bottom: 8px; }
.nx-title-category { font-family: 'Orbitron', monospace; font-size: 8px; letter-spacing: 1px; padding: 2px 8px; background: rgba(0,245,255,0.06); border: 1px solid rgba(0,245,255,0.12); color: #00f5ff; display: inline-block; }
.nx-title-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; gap: 8px; }
.nx-title-card-top-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.nx-title-card-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
.nx-title-card-body { position: relative; z-index: 1; }
.nx-title-text { display: inline; }

/* ── SHOP EXCLUSIVE EFFECTS ── */

/* Shadow Pulse — เงามืดเต้นช้าๆ */
@keyframes shadowPulse {
  0%,100% { text-shadow: 0 0 8px #6600aa, 0 0 20px #330066; opacity:1; }
  50%      { text-shadow: 0 0 20px #9900ff, 0 0 40px #6600aa; opacity:0.8; }
}
@keyframes shadowFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-2px); }
}
.nx-title-badge.nx-fx-shadow-pulse .nx-title-text {
  background: linear-gradient(135deg, #9900ff, #330066, #cc44ff);
  background-size: 200%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: shadowPulse 3s ease-in-out infinite, shadowFloat 4s ease-in-out infinite;
}
.nx-title-badge.nx-fx-shadow-pulse .nx-badge-icon-wrap {
  animation: shadowFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 0 6px #9900ff);
}

/* Frost — น้ำแข็งกะพริบ */
@keyframes frostGlow {
  0%,100% { text-shadow: 0 0 6px #88ddff, 0 0 14px #44aaff; }
  50%      { text-shadow: 0 0 16px #ccf0ff, 0 0 32px #88ddff; }
}
@keyframes frostShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.nx-title-badge.nx-fx-frost .nx-title-text {
  background: linear-gradient(90deg, #88ddff, #ffffff, #44aaff, #ccf0ff, #88ddff);
  background-size: 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: frostShimmer 3s linear infinite, frostGlow 2s ease-in-out infinite;
}
.nx-title-badge.nx-fx-frost .nx-badge-icon-wrap {
  filter: drop-shadow(0 0 5px #88ddff) drop-shadow(0 0 10px #44aaff);
  animation: frostGlow 2s ease-in-out infinite;
}
.nx-title-badge.nx-fx-frost::after {
  content:''; position:absolute; inset:0; border-radius:inherit;
  background: linear-gradient(135deg, rgba(136,221,255,0.06), transparent);
  animation: frostShimmer 4s linear infinite;
}

/* Chaos — สีสุ่มเปลี่ยนตลอด */
@keyframes chaosColor {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 0%; }
  50%  { background-position: 100% 100%; }
  75%  { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}
@keyframes chaosShake {
  0%,100% { transform: rotate(0deg); }
  20%      { transform: rotate(-1deg); }
  40%      { transform: rotate(1deg); }
  60%      { transform: rotate(-0.5deg); }
  80%      { transform: rotate(0.5deg); }
}
.nx-title-badge.nx-fx-chaos .nx-title-text {
  background: linear-gradient(45deg, #ff0000, #ff6600, #ff0066, #aa00ff, #ff0000);
  background-size: 400% 400%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: chaosColor 2s ease infinite;
}
.nx-title-badge.nx-fx-chaos .nx-badge-icon-wrap {
  animation: chaosShake 0.5s ease-in-out infinite;
  filter: drop-shadow(0 0 6px #ff0066);
}
.nx-title-badge.nx-fx-chaos { animation: chaosShake 4s ease-in-out infinite; }

/* Void — หมุนวนดูดเข้าไป */
@keyframes voidPulse {
  0%,100% { text-shadow: 0 0 8px #8800ff, 0 0 20px #4400aa; opacity:1; }
  50%      { text-shadow: 0 0 20px #aa44ff, 0 0 40px #8800ff; opacity:0.7; }
}
@keyframes voidSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.nx-title-badge.nx-fx-void .nx-title-text {
  background: linear-gradient(135deg, #8800ff, #000033, #aa44ff, #330066);
  background-size: 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: voidPulse 2.5s ease-in-out infinite, frostShimmer 5s linear infinite;
}
.nx-title-badge.nx-fx-void .nx-badge-icon-wrap {
  animation: voidSpin 8s linear infinite;
  filter: drop-shadow(0 0 8px #8800ff);
}

/* Rainbow — สีรุ้งวิ่งตลอด */
@keyframes rainbowFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
@keyframes rainbowBounce {
  0%,100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-2px) scale(1.02); }
}
.nx-title-badge.nx-fx-rainbow .nx-title-text {
  background: linear-gradient(90deg,
    #ff0080, #ff4400, #ffaa00, #44ff00, #00ddff, #8800ff, #ff0080, #ff4400);
  background-size: 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: rainbowFlow 3s linear infinite;
}
.nx-title-badge.nx-fx-rainbow .nx-badge-icon-wrap {
  animation: rainbowBounce 2s ease-in-out infinite;
  filter: drop-shadow(0 0 4px #ff0080) drop-shadow(0 0 8px #00ddff);
}
.nx-title-badge.nx-fx-rainbow {
  animation: rainbowBounce 2s ease-in-out infinite;
}
`

  const style = document.createElement('style')
  style.id = 'nexus-title-styles-v3'
  style.textContent = css
  document.head.appendChild(style)
}

// Also remove old style ID if present (upgrade path)
if (typeof document !== 'undefined') {
  const old = document.getElementById('nexus-title-styles')
  if (old) old.remove()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTitleStyles)
  } else {
    injectTitleStyles()
  }
}


// ============================================================
// LOCK ICON SVG
// ============================================================
const LOCK_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle" aria-hidden="true"><rect x="3" y="7" width="10" height="7" stroke="currentColor" stroke-width="1.2"/><path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="8" cy="11" r="1.5" fill="currentColor" opacity="0.7"/></svg>`


// ============================================================
// PARTICLE HTML helpers
// ============================================================
function getParticleHTML(rarity) {
  if (rarity === 'legendary') {
    return `<span class="nx-particle-dot" aria-hidden="true"></span>
            <span class="nx-particle-dot" aria-hidden="true"></span>
            <span class="nx-particle-dot" aria-hidden="true"></span>`
  }
  if (rarity === 'epic') {
    return `<span class="nx-sparkle" aria-hidden="true"></span>
            <span class="nx-sparkle" aria-hidden="true"></span>`
  }
  if (rarity === 'rare') {
    return `<span class="nx-sparkle" aria-hidden="true"></span>`
  }
  return ''
}


// ============================================================
// renderTitleBadge(title, options) → HTML string
// ============================================================
export function renderTitleBadge(title, options = {}) {
  if (!title) return ''
  const r = title.rarity || 'common'
  const name = title.name || ''

  const fx = resolveTitleEffect(name, title.category)
  const effectClass = fx ? ` ${fx.effectClass}` : ''
  const iconPath = fx ? fx.icon : DEFAULT_TITLE_ICON_PATH

  const iconSvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${iconPath}</svg>`

  const particles = getParticleHTML(r)

  return `<span class="nx-title-badge rarity-${r}${effectClass}">${particles}<span class="nx-badge-icon-wrap">${iconSvg}</span><span class="nx-title-text">${name}</span></span>`
}


// ============================================================
// renderTitleCard(title, state, options) → HTML string
// ============================================================
export function renderTitleCard(title, state = {}, options = {}) {
  const { unlocked = false, equipped = false } = state
  const { isOwnProfile = false, onEquipFn = 'equipTitle' } = options
  const r = title.rarity || 'common'
  const cfg = RARITY_CONFIG[r] || RARITY_CONFIG.common

  const lockedClass   = !unlocked ? ' nx-locked' : ''
  const equippedClass = equipped ? ' nx-equipped' : ''

  const cat = (title.category || '').toLowerCase()
  const clsColor = CLASS_COLOR[cat] || 'rgba(0,245,255,0.4)'
  const classIconHtml = CLASS_ICONS_SVG[cat]
    ? `<div class="nx-class-icon-wrap" style="--cls-color:${clsColor};color:${clsColor}">${CLASS_ICONS_SVG[cat](16)}</div>`
    : ''

  const rarityLabel = r.toUpperCase()

  let statusHtml = ''
  if (equipped) {
    statusHtml = `<span class="nx-equipped-tag">EQUIPPED</span>`
  } else if (unlocked) {
    statusHtml = `<span style="font-family:'Orbitron',monospace;font-size:7px;letter-spacing:1px;padding:3px 8px;border:1px solid rgba(68,255,136,0.4);color:#44ff88;background:rgba(68,255,136,0.06)">UNLOCKED</span>`
  } else {
    statusHtml = `<span style="font-family:'Orbitron',monospace;font-size:7px;letter-spacing:1px;padding:3px 8px;border:1px solid rgba(90,138,144,0.3);color:#5a8a90">LOCKED</span>`
  }

  const fx = resolveTitleEffect(title.name, title.category)
  const titleSvgPath = fx ? fx.icon : DEFAULT_TITLE_ICON_PATH
  const iconHtml = renderIconFrame(titleSvgPath, r, 52)

  const btnColorMap = {
    common:    { color: '#aaaaaa', rgb: '170,170,170' },
    rare:      { color: '#44aaff', rgb: '68,170,255' },
    epic:      { color: '#ee99ff', rgb: '238,153,255' },
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

  const lockHtml = !unlocked ? `<div class="nx-lock-icon">${LOCK_SVG}</div>` : ''

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
// renderBadgeItem(badge, unlocked, options) → HTML string
// ============================================================
export function renderBadgeItem(badge, unlocked = false, options = {}) {
  const { showDate = false, unlockedAt = null } = options
  const r = badge.rarity || 'common'
  const lockedClass = !unlocked ? ' nx-locked' : ''

  const svgPath = BADGE_SVG_MAP[badge.name] || `<polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/>`
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
// BADGE ICON MAP (SVG paths by badge name)
// ============================================================
const BADGE_SVG_MAP = {
  'First Blood':     `<circle cx="8" cy="8" r="5" stroke="url(#rubyGrad)" stroke-width="1.3"/><circle cx="8" cy="8" r="2.2" stroke="url(#rubyGrad)" stroke-width="1.3"/><circle cx="8" cy="8" r="0.9" fill="url(#rubyGrad)" filter="url(#glowWarm)"/><path d="M8 1v2M8 11v2M1 8h2M11 8h2" stroke="url(#rubyGrad)" stroke-width="1.2"/>`,
  'Week Warrior':    `<path d="M8 13c-2.5 0-4-1.6-4-4 0-1.2.4-2.4 1.6-3.6 0 1.6.8 2.4.8 2.4s.4-2 1.6-3.6c.4 1.6 1.6 2.8 1.6 2.8s.8-.8.4-2C11.6 6.4 12 7.6 12 9c0 2.4-1.6 4-4 4z" stroke="url(#fireGrad)" stroke-width="1.3" fill="url(#fireGrad)" fill-opacity="0.15"/><circle cx="8" cy="10" r="1.4" fill="url(#goldRadial)" opacity="0.7"/>`,
  'Monthly Crusher': `<path d="M8 1v3M8 12v3M1 8h3M12 8h3M3 3l2 2M11 11l2 2M3 13l2-2M11 5l2-2" stroke="url(#goldStroke)" stroke-width="1.3" stroke-linecap="square"/><circle cx="8" cy="8" r="3.2" stroke="url(#goldGrad)" stroke-width="1.3" filter="url(#glowGold)"/>`,
  'Gold Walker':     `<circle cx="8" cy="9" r="4" stroke="url(#goldStroke)" stroke-width="1.4" filter="url(#glowGold)"/><path d="M5.5 5.5L3.5 2h9L10.5 5.5" stroke="url(#goldGrad)" stroke-width="1.3" stroke-linejoin="round" fill="none"/><path d="M8 7v2.5l1.5 1" stroke="url(#goldStroke)" stroke-width="1.2" stroke-linecap="round"/>`,
  'Globe Trotter':   `<circle cx="8" cy="8" r="6" stroke="url(#sapphireGrad)" stroke-width="1.3"/><path d="M8 2c-1.6 1.6-1.6 8.4 0 12M8 2c1.6 1.6 1.6 8.4 0 12" stroke="url(#cyanGrad)" stroke-width="1.1" fill="none"/><path d="M2 8h12" stroke="url(#sapphireGrad)" stroke-width="1.1"/><path d="M3 5.5h10M3 10.5h10" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.55"/>`,
  'Social Butterfly':`<circle cx="8" cy="4" r="2" stroke="url(#cyanGrad)" stroke-width="1.3"/><circle cx="3" cy="12" r="2" stroke="url(#sapphireGrad)" stroke-width="1.3"/><circle cx="13" cy="12" r="2" stroke="url(#amethystGrad)" stroke-width="1.3"/><path d="M8 6l-3.5 4.5M8 6l3.5 4.5M3.5 12h9" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.7"/>`,
  'Proof Master':    `<rect x="2" y="5" width="12" height="9" stroke="url(#sapphireGrad)" stroke-width="1.3"/><circle cx="8" cy="9.5" r="2.5" stroke="url(#cyanGrad)" stroke-width="1.3"/><path d="M5 5V4l1.5-1.5h3L11 4v1" stroke="url(#cyanGrad)" stroke-width="1.3"/><path d="M6.5 9.5l1 1 2-2" stroke="url(#emeraldGrad)" stroke-width="1.2" stroke-linecap="round"/>`,
  'Founder':         `<path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z" stroke="url(#goldStroke)" stroke-width="1.5" fill="none" filter="url(#glowGold)"/><path d="M8 4l.8 2.4L11 8l-2.2.8L8 11l-.8-2.2L5 8l2.2-.8z" fill="url(#goldGrad)" opacity="0.5"/>`,
}

// Legacy TITLE_SVG_MAP removed — all title icons now handled by
// TITLE_EFFECT_MAP (name-based) and CATEGORY_EFFECT_MAP (category-based fallback)



// ============================================================
// HEXAGON FRAME RENDERER  (v3 — multi-ring for legendary/epic)
// ============================================================
function renderIconFrame(svgPath, rarity = 'common', size = 48) {
  const cfg = RARITY_CONFIG[rarity] || RARITY_CONFIG.common
  const hex = `polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)`
  const innerSize = Math.round(size * 0.52)

  const borderOpacity = rarity === 'common' ? '0.28' : rarity === 'rare' ? '0.55' : '0.75'
  const glowOpacity   = rarity === 'legendary' ? '55' : rarity === 'epic' ? '42' : rarity === 'rare' ? '30' : '1a'

  const pulseAnim = rarity === 'legendary'
    ? 'nxHexLegPulse 1.6s ease-in-out infinite'
    : rarity === 'epic'
      ? 'nxHexEpicPulse 2.5s ease-in-out infinite'
      : rarity === 'rare'
        ? 'nxHexRarePulse 3s ease-in-out infinite'
        : 'none'

  const iconGlow = rarity === 'common'
    ? `drop-shadow(0 0 2px ${cfg.color}55)`
    : rarity === 'legendary'
      ? `drop-shadow(0 0 7px ${cfg.color}ff) drop-shadow(0 0 14px ${cfg.colorAlt}99)`
      : `drop-shadow(0 0 6px ${cfg.color}dd) drop-shadow(0 0 2px ${cfg.colorAlt||cfg.color}66)`

  // Outer spinning ring for legendary/epic
  const outerRing = rarity === 'legendary'
    ? `<div style="position:absolute;inset:-3px;border:1.5px dashed rgba(255,215,0,0.45);clip-path:${hex};animation:nxLegRing 4s linear infinite;pointer-events:none;"></div>`
    : rarity === 'epic'
      ? `<div style="position:absolute;inset:-3px;border:1.5px dashed rgba(204,102,255,0.4);clip-path:${hex};animation:nxEpicRing 5s linear infinite;pointer-events:none;"></div>`
      : ''

  const borderPulseLayer = `<div style="position:absolute;inset:0;clip-path:${hex};background:${cfg.color};opacity:${borderOpacity};animation:${pulseAnim};"></div>`

  return `<div style="position:relative;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
    ${outerRing}
    ${borderPulseLayer}
    <div style="position:absolute;inset:1.5px;clip-path:${hex};background:rgba(2,8,14,0.93);"></div>
    <div style="position:absolute;inset:1.5px;clip-path:${hex};background:radial-gradient(ellipse at 40% 25%,${cfg.color}${glowOpacity} 0%,transparent 65%);"></div>
    <svg width="${innerSize}" height="${innerSize}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      style="position:relative;z-index:1;filter:${iconGlow}">
      ${svgPath}
    </svg>
  </div>`
}
