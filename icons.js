// ============================================================
// NEXUS LIFE — icons.js  v3.0  (WORLD-CLASS UPGRADE)
// Central SVG Icon Library — AAA-grade gradients, 3D hover,
// particle rings, premium SVG filters, metallic/gem surfaces.
//
// Usage:
//   import { ICONS, getIcon, CLASS_ICON, QUEST_ICON, injectGlobalDefs } from './icons.js'
//
//   injectGlobalDefs()             — call ONCE at app init (also auto-called on import)
//   getIcon('trophy')              → <svg>...</svg> string
//   getIcon('trophy', 20, { prestige: true })
//   CLASS_ICON.warrior             → SVG path string (inner content only)
//   QUEST_ICON.daily               → SVG path string
// ============================================================

// ─── VIEWBOX ─────────────────────────────────────────────────
// NAV icons    → 16×16
// SYSTEM icons → 16×16
// CLASS icons  → 20×20  (hero display)
// QUEST icons  → 16×16
// ─────────────────────────────────────────────────────────────


// ============================================================
// GLOBAL SVG DEFS  v3.0 — multi-layer gradients + premium filters
// Inject once; all icons reference via fill="url(#...)" / filter="url(#...)"
// ============================================================
const GLOBAL_SVG_DEFS = `
<svg id="nexus-icon-defs" xmlns="http://www.w3.org/2000/svg"
  width="0" height="0" style="position:absolute;overflow:hidden;pointer-events:none;top:0;left:0">
  <defs>

    <!-- ══════════════════════════════════════════════
         PREMIUM GRADIENTS  (4-stop metallic/gem)
    ══════════════════════════════════════════════ -->

    <!-- ── GOLD — burnished metal ── -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#fff0a0"/>
      <stop offset="28%"  stop-color="#ffd700"/>
      <stop offset="65%"  stop-color="#ff9500"/>
      <stop offset="100%" stop-color="#cc6600"/>
    </linearGradient>

    <!-- ── GOLD STROKE — bright highlight edge ── -->
    <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#fffacc"/>
      <stop offset="40%"  stop-color="#ffe566"/>
      <stop offset="100%" stop-color="#ffaa00"/>
    </linearGradient>

    <!-- ── GOLD RADIAL — coin surface ── -->
    <radialGradient id="goldRadial" cx="35%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#fff5b0"/>
      <stop offset="40%"  stop-color="#ffd700"/>
      <stop offset="80%"  stop-color="#cc8800"/>
      <stop offset="100%" stop-color="#996600"/>
    </radialGradient>

    <!-- ── PLATINUM — brushed silver ── -->
    <linearGradient id="platinumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="25%"  stop-color="#c8e8ff"/>
      <stop offset="60%"  stop-color="#88bbdd"/>
      <stop offset="100%" stop-color="#446688"/>
    </linearGradient>

    <!-- ── RUBY — deep red gem ── -->
    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ff8888"/>
      <stop offset="25%"  stop-color="#ff2244"/>
      <stop offset="70%"  stop-color="#cc0022"/>
      <stop offset="100%" stop-color="#880011"/>
    </linearGradient>

    <!-- ── SAPPHIRE — deep blue gem ── -->
    <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#88ddff"/>
      <stop offset="25%"  stop-color="#44aaff"/>
      <stop offset="65%"  stop-color="#0055cc"/>
      <stop offset="100%" stop-color="#002299"/>
    </linearGradient>

    <!-- ── EMERALD — vivid green gem ── -->
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#aaffcc"/>
      <stop offset="30%"  stop-color="#44ff88"/>
      <stop offset="70%"  stop-color="#00cc55"/>
      <stop offset="100%" stop-color="#006633"/>
    </linearGradient>

    <!-- ── AMETHYST — purple gem ── -->
    <linearGradient id="amethystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#eebcff"/>
      <stop offset="30%"  stop-color="#cc66ff"/>
      <stop offset="65%"  stop-color="#9922ee"/>
      <stop offset="100%" stop-color="#660099"/>
    </linearGradient>

    <!-- ── FIRE — molten core ── -->
    <linearGradient id="fireGrad" x1="0%" y1="0%" x2="30%" y2="100%">
      <stop offset="0%"   stop-color="#ffff88"/>
      <stop offset="25%"  stop-color="#ffcc00"/>
      <stop offset="55%"  stop-color="#ff5500"/>
      <stop offset="100%" stop-color="#bb1100"/>
    </linearGradient>

    <!-- ── LIGHTNING — electric arc ── -->
    <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="30%"  stop-color="#ffffaa"/>
      <stop offset="70%"  stop-color="#ffdd00"/>
      <stop offset="100%" stop-color="#ff9900"/>
    </linearGradient>

    <!-- ── CYAN / teal — nav/system ── -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#88ffff"/>
      <stop offset="40%"  stop-color="#00f5ff"/>
      <stop offset="100%" stop-color="#0088bb"/>
    </linearGradient>

    <!-- ── BLUE — rare quality ── -->
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#66bbff"/>
      <stop offset="50%"  stop-color="#2288ff"/>
      <stop offset="100%" stop-color="#004499"/>
    </linearGradient>

    <!-- ── PURPLE — mage/epic ── -->
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#eebcff"/>
      <stop offset="40%"  stop-color="#cc66ff"/>
      <stop offset="100%" stop-color="#8800dd"/>
    </linearGradient>

    <!-- ── GREEN — explorer ── -->
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#aaffcc"/>
      <stop offset="45%"  stop-color="#44ff88"/>
      <stop offset="100%" stop-color="#00aa44"/>
    </linearGradient>

    <!-- ── RED — warrior ── -->
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ff9988"/>
      <stop offset="40%"  stop-color="#ff4422"/>
      <stop offset="100%" stop-color="#aa0011"/>
    </linearGradient>

    <!-- ── ORANGE — merchant ── -->
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ffee88"/>
      <stop offset="40%"  stop-color="#ffcc44"/>
      <stop offset="100%" stop-color="#dd6600"/>
    </linearGradient>

    <!-- ── SHIELD body fill ── -->
    <linearGradient id="shieldGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%"   stop-color="#2a5577"/>
      <stop offset="50%"  stop-color="#1a3355"/>
      <stop offset="100%" stop-color="#0a1a33"/>
    </linearGradient>


    <!-- ══════════════════════════════════════════════
         PREMIUM FILTERS
    ══════════════════════════════════════════════ -->

    <!-- Soft glow (nav icons) -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.0" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <!-- Strong prestige glow (trophy, crown) -->
    <filter id="glowStrong" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.8" result="blur1"/>
      <feGaussianBlur stdDeviation="1.2" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur1"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Gold glow with warm tint -->
    <filter id="glowGold" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.2" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="1.8 0.6 0   0 0.12
                0.6 0.9 0   0 0.03
                0   0   0.1 0 0
                0   0   0   1 0" result="tinted"/>
      <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="#ffd700" flood-opacity="0.5"/>
      <feMerge>
        <feMergeNode in="tinted"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Purple/epic glow -->
    <filter id="glowPurple" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.4" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0.6 0.1 0.8 0 0.08
                0.1 0.2 0.6 0 0
                0.8 0.3 1.8 0 0.08
                0   0   0   1 0" result="tinted"/>
      <feMerge>
        <feMergeNode in="tinted"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Warm red glow (warrior, fire) -->
    <filter id="glowWarm" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.0" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="1.8 0.3 0.0 0 0.15
                0.3 0.5 0.0 0 0.0
                0.0 0.0 0.2 0 0.0
                0   0   0   1 0" result="tinted"/>
      <feMerge>
        <feMergeNode in="tinted"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Drop shadow (class icons) -->
    <filter id="dropShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.0" flood-color="rgba(0,0,0,0.7)"/>
    </filter>

    <!-- Cyan glow (nav) -->
    <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0.2 0.5 1.0 0 0
                0.4 0.8 0.9 0 0.04
                0.6 0.8 1.5 0 0.06
                0   0   0   1 0" result="tinted"/>
      <feMerge>
        <feMergeNode in="tinted"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Inner highlight (3D gem face) -->
    <filter id="gemShine" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
      <feOffset dx="-1" dy="-1" result="offset"/>
      <feFlood flood-color="white" flood-opacity="0.4" result="white"/>
      <feComposite in="white" in2="offset" operator="in" result="shine"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="shine"/>
      </feMerge>
    </filter>

  </defs>
</svg>`


// ============================================================
// INJECT GLOBAL DEFS + WORLD-CLASS HOVER CSS
// ============================================================
export function injectGlobalDefs() {
  if (typeof document === 'undefined') return
  if (document.getElementById('nexus-icon-defs')) return
  document.body.insertAdjacentHTML('afterbegin', GLOBAL_SVG_DEFS)

  if (!document.getElementById('nexus-icon-css-v3')) {
    const style = document.createElement('style')
    style.id = 'nexus-icon-css-v3'
    style.textContent = `
/* ════════════════════════════════════════════════
   NEXUS LIFE — Icon CSS v3.0  World-Class Edition
════════════════════════════════════════════════ */

/* ── Base icon wrapper ── */
.nx-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  will-change: transform, filter;
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), filter 0.22s ease;
  cursor: pointer;
  position: relative;
}
.nx-icon:hover {
  transform: scale(1.22) rotate(-3deg);
  filter: brightness(1.4) drop-shadow(0 0 5px currentColor);
}

/* ── Prestige icons (trophy, crown, star, shield) ── */
.nx-icon-prestige {
  will-change: transform, filter;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), filter 0.28s ease;
  cursor: pointer;
  animation: nxPrestigeBreath 3s ease-in-out infinite;
}
.nx-icon-prestige:hover {
  transform: scale(1.35) rotate(5deg) perspective(80px) rotateY(8deg);
  filter: brightness(1.6) drop-shadow(0 0 8px gold) drop-shadow(0 0 16px rgba(255,200,0,0.5));
  animation-play-state: paused;
}
@keyframes nxPrestigeBreath {
  0%,100% { filter: brightness(1.0) drop-shadow(0 0 3px rgba(255,215,0,0.3)); }
  50%     { filter: brightness(1.15) drop-shadow(0 0 7px rgba(255,180,0,0.6)); }
}

/* ── Particle ring sparkle for prestige hover ── */
.nx-icon-prestige::before,
.nx-icon-prestige::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: gold;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s;
}
.nx-icon-prestige:hover::before {
  opacity: 1;
  top: -6px; left: 50%;
  transform: translateX(-50%);
  animation: nxSparkle1 0.6s ease-out forwards;
  box-shadow: 0 0 4px gold, 0 0 8px rgba(255,200,0,0.8);
}
.nx-icon-prestige:hover::after {
  opacity: 1;
  top: 50%; left: -6px;
  animation: nxSparkle2 0.7s ease-out 0.1s forwards;
  box-shadow: 0 0 4px #ff9500, 0 0 8px rgba(255,140,0,0.8);
  background: #ff9500;
}
@keyframes nxSparkle1 {
  0%   { transform: translate(-50%, 0) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -14px) scale(0); opacity: 0; }
}
@keyframes nxSparkle2 {
  0%   { transform: translate(0, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-12px, -50%) scale(0); opacity: 0; }
}

/* ── Hover 3D tilt for class icons ── */
.nx-icon-class {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
  will-change: transform, filter;
  cursor: pointer;
}
.nx-icon-class:hover {
  transform: scale(1.28) perspective(60px) rotateX(-6deg) rotateY(6deg);
  filter: brightness(1.5) saturate(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.5));
}
`
    document.head.appendChild(style)
  }
}

// Auto-inject on import
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGlobalDefs)
  } else {
    injectGlobalDefs()
  }
}


// ============================================================
// GROUP 1 — NAV ICONS (16×16)
// ============================================================
export const NAV_ICONS = {

  // Dashboard — 4 squares grid
  grid: `<rect x="1" y="1" width="6" height="6" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <rect x="9" y="1" width="6" height="6" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <rect x="1" y="9" width="6" height="6" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <rect x="9" y="9" width="6" height="6" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <rect x="3" y="3" width="2" height="2" fill="url(#cyanGrad)" opacity="0.5"/>
         <rect x="11" y="3" width="2" height="2" fill="url(#cyanGrad)" opacity="0.5"/>`,

  // Quests — list lines
  list: `<path d="M2 4h12M2 8h8M2 12h10" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linecap="square"/>
         <circle cx="14.5" cy="8" r="1" fill="url(#goldGrad)" opacity="0.6"/>`,

  // Feed — speech bubble
  chat: `<path d="M1 2h14v9H9.5L7 14v-3H1z" stroke="url(#blueGrad)" stroke-width="1.3" stroke-linejoin="round" fill="url(#blueGrad)" fill-opacity="0.07"/>
         <path d="M4 6h8M4 9h5" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.5"/>`,

  // Verify — checkbox
  check: `<rect x="1" y="1" width="14" height="14" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.06"/>
          <path d="M3 8l3 3 7-7" stroke="url(#emeraldGrad)" stroke-width="1.6" stroke-linecap="square"/>`,

  // Leaderboard — bar chart
  bar: `<rect x="1" y="8" width="4" height="7" stroke="url(#blueGrad)" stroke-width="1.2" fill="url(#blueGrad)" fill-opacity="0.1"/>
        <rect x="6" y="4" width="4" height="11" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
        <rect x="11" y="1" width="4" height="14" stroke="url(#goldGrad)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.12" filter="url(#glowGold)"/>`,

  // Social — two people
  users: `<circle cx="5" cy="5" r="2.5" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
          <circle cx="11" cy="5" r="2.5" stroke="url(#blueGrad)" stroke-width="1.2" fill="url(#blueGrad)" fill-opacity="0.1"/>
          <path d="M1 14c0-3 1.8-4.5 4-4.5M15 14c0-3-1.8-4.5-4-4.5M8 10c2 0 4 1.2 4 4H4c0-2.8 2-4 4-4z" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Messages
  msg: `<path d="M1 2h14v10H9l-3 3v-3H1z" stroke="url(#blueGrad)" stroke-width="1.3" stroke-linejoin="round" fill="url(#blueGrad)" fill-opacity="0.07"/>
        <path d="M4 6h8M4 9h5" stroke="url(#sapphireGrad)" stroke-width="0.9" opacity="0.5"/>`,

  // City
  building: `<rect x="2" y="8" width="4" height="6" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.08"/>
             <rect x="6" y="4" width="4" height="10" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.08"/>
             <rect x="10" y="6" width="4" height="8" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.08"/>
             <path d="M3 10h2M7 6h2M7 9h2M11 8h2" stroke="url(#cyanGrad)" stroke-width="0.8" opacity="0.4"/>`,

  // Map pin
  map: `<circle cx="8" cy="7" r="3" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.12"/>
        <path d="M8 1v2M8 11v2M1 7h2M11 7h2" stroke="url(#cyanGrad)" stroke-width="1.2"/>
        <circle cx="8" cy="7" r="1" fill="url(#emeraldGrad)" opacity="0.8"/>`,

  // Guild
  guild: `<circle cx="5" cy="5" r="3" stroke="url(#amethystGrad)" stroke-width="1.2" fill="url(#amethystGrad)" fill-opacity="0.1"/>
          <circle cx="11" cy="5" r="3" stroke="url(#amethystGrad)" stroke-width="1.2" fill="url(#amethystGrad)" fill-opacity="0.1"/>
          <path d="M1 14c0-3 2-5 4-5M10 9c2 0 5 2 5 5" stroke="url(#amethystGrad)" stroke-width="1.2"/>`,

  // PvP — diagonal sword
  sword: `<path d="M3 13L13 3M10 3h3v3M6 13H3v-3" stroke="url(#rubyGrad)" stroke-width="1.4" stroke-linecap="square"/>
          <path d="M7 7l1 1" stroke="url(#goldStroke)" stroke-width="1.5" stroke-linecap="round"/>`,

  // Profile
  person: `<circle cx="8" cy="5" r="3" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
           <path d="M2 14c0-4 2.7-6 6-6s6 2 6 6" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Achievements — star (gold prestige!)
  star: `<polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6"
           stroke="url(#goldStroke)" stroke-width="1.4" fill="url(#goldGrad)" fill-opacity="0.15" filter="url(#glowGold)"/>`,

  // Shop — cart
  cart: `<path d="M2 2h2l2 8h6l2-6H5" stroke="url(#cyanGrad)" stroke-width="1.3" stroke-linecap="square"/>
         <circle cx="7" cy="13" r="1.2" fill="url(#cyanGrad)"/>
         <circle cx="12" cy="13" r="1.2" fill="url(#cyanGrad)"/>`,

  // Wallet
  wallet: `<rect x="1" y="4" width="14" height="10" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.06"/>
           <path d="M1 8h14" stroke="url(#goldStroke)" stroke-width="1.2"/>
           <circle cx="11" cy="11" r="1.8" fill="url(#goldRadial)" filter="url(#glowGold)"/>`,
}


// ============================================================
// GROUP 2 — CLASS ICONS (20×20)
// ============================================================
export const CLASS_ICONS = {

  // Warrior — crossed swords (RUBY + warm glow)
  warrior: `<path d="M4 16L16 4M12 4h4v4M8 16H4v-4"
              stroke="url(#rubyGrad)" stroke-width="2.0" stroke-linecap="square" stroke-linejoin="miter"
              filter="url(#glowWarm)"/>
            <path d="M7 13l3-3" stroke="url(#rubyGrad)" stroke-width="1.2" opacity="0.65"/>
            <circle cx="10" cy="10" r="1.2" fill="url(#goldGrad)" opacity="0.7"/>`,

  // Mage — crystal orb (AMETHYST + glow)
  mage: `<circle cx="10" cy="11" r="4" stroke="url(#amethystGrad)" stroke-width="1.8" fill="none" filter="url(#glowPurple)"/>
         <path d="M10 4v2M10 15v2M4 11H2M16 11h2M5.5 6.5l1.4 1.4M13.1 14.1l1.4 1.4M5.5 15.5l1.4-1.4M13.1 7.9l1.4-1.4" stroke="url(#amethystGrad)" stroke-width="1.3"/>
         <circle cx="10" cy="11" r="2.0" fill="url(#amethystGrad)" filter="url(#glowPurple)"/>
         <circle cx="10" cy="10" r="0.8" fill="white" opacity="0.5"/>`,

  // Explorer — compass (EMERALD)
  explorer: `<circle cx="10" cy="10" r="7" stroke="url(#emeraldGrad)" stroke-width="1.8" fill="none"/>
             <circle cx="10" cy="10" r="5" stroke="url(#emeraldGrad)" stroke-width="0.6" opacity="0.3"/>
             <path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="url(#emeraldGrad)" stroke-width="1.1"/>
             <polygon points="10,6 12,11 10,10 8,11" fill="url(#rubyGrad)" opacity="0.95"/>
             <polygon points="10,14 8,9 10,10 12,9" fill="url(#cyanGrad)" opacity="0.4"/>`,

  // Merchant — coin stack (GOLD)
  merchant: `<ellipse cx="10" cy="6" rx="5" ry="2" stroke="url(#goldGrad)" stroke-width="1.8" fill="url(#goldGrad)" fill-opacity="0.12"/>
             <path d="M5 6v4c0 1.1 2.24 2 5 2s5-.9 5-2V6" stroke="url(#goldGrad)" stroke-width="1.6" fill="none"/>
             <path d="M5 10v3c0 1.1 2.24 2 5 2s5-.9 5-2v-3" stroke="url(#goldGrad)" stroke-width="1.6" fill="none"/>
             <path d="M8 5.5l1 .5 1-.5" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.8"/>
             <ellipse cx="10" cy="6" rx="2" ry="0.8" fill="url(#goldStroke)" opacity="0.4"/>`,

  // Artist — diamond gem (AMETHYST → CYAN)
  artist: `<path d="M10 3L15 8l-5 9-5-9z" stroke="url(#amethystGrad)" stroke-width="1.8" fill="url(#amethystGrad)" fill-opacity="0.1" stroke-linejoin="round" filter="url(#gemShine)"/>
           <path d="M5 8h10M7 5l-2 3M13 5l2 3" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.8"/>
           <path d="M10 8l-2 4M10 8l2 4" stroke="url(#amethystGrad)" stroke-width="1" opacity="0.6"/>
           <circle cx="10" cy="8" r="0.8" fill="white" opacity="0.7"/>`,

  // Diplomat — handshake (SAPPHIRE)
  diplomat: `<path d="M3 12c0 0 2-3 4-3h3c1 0 1.5.5 1.5 1s-.5 1-1.5 1H8" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
             <path d="M3 12l-1.5 1.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round"/>
             <path d="M17 12c0 0-2-3-4-3H9.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
             <path d="M17 12l1.5 1.5" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round"/>
             <path d="M8 10V8a1 1 0 012 0v2" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/>`,
}


// ============================================================
// GROUP 3 — QUEST TYPE ICONS (16×16)
// ============================================================
export const QUEST_ICONS = {

  // Daily — sun (GOLD)
  daily: `<circle cx="8" cy="8" r="3" stroke="url(#goldGrad)" stroke-width="1.5" fill="url(#goldGrad)" fill-opacity="0.2" filter="url(#glowGold)"/>
          <path d="M8 1v2M8 11v2M1 8h2M11 8h2M3 3l1.4 1.4M10.6 10.6l1.4 1.4M3 13l1.4-1.4M10.6 5.4l1.4-1.4" stroke="url(#goldStroke)" stroke-width="1.3"/>`,

  // Weekly — calendar (SAPPHIRE)
  weekly: `<rect x="2" y="3" width="12" height="11" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07"/>
           <path d="M2 7h12M6 3V1M10 3V1" stroke="url(#cyanGrad)" stroke-width="1.2"/>
           <rect x="5" y="9" width="2" height="2" fill="url(#sapphireGrad)" opacity="0.9"/>
           <rect x="9" y="9" width="2" height="2" fill="url(#cyanGrad)" opacity="0.6"/>`,

  // Challenge — lightning bolt (LIGHTNING)
  challenge: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7"
                stroke="url(#lightningGrad)" stroke-width="1.5"
                fill="url(#lightningGrad)" fill-opacity="0.2"
                stroke-linejoin="round" filter="url(#glowGold)"/>`,

  // Guild quest — shield (CYAN)
  guild_quest: `<path d="M8 2L2 5v5c0 3.3 2.5 5.8 6 7 3.5-1.2 6-3.7 6-7V5z"
                  stroke="url(#cyanGrad)" stroke-width="1.4" fill="url(#cyanGrad)" fill-opacity="0.08" stroke-linejoin="round"/>
                <path d="M5.5 8h5M8 5.5v5" stroke="url(#cyanGrad)" stroke-width="1.3"/>`,

  // Story — open book (ORANGE)
  story: `<path d="M8 14V4" stroke="url(#orangeGrad)" stroke-width="1.3"/>
          <path d="M3 4c0 0 2 0 5 2 3-2 5-2 5-2v10c0 0-2 0-5-2-3 2-5 2-5 2z"
            stroke="url(#orangeGrad)" stroke-width="1.3" fill="url(#orangeGrad)" fill-opacity="0.07" stroke-linejoin="round"/>`,
}


// ============================================================
// GROUP 4 — SYSTEM ICONS (16×16)
// ============================================================
export const SYSTEM_ICONS = {

  // Trophy — GOLD prestige, strong glow
  trophy: `<path d="M4 2h8v7a4 4 0 01-8 0z"
             stroke="url(#goldStroke)" stroke-width="1.5" fill="url(#goldGrad)" fill-opacity="0.18" filter="url(#glowStrong)"/>
           <path d="M2 4H4M12 4h2M8 13v2M5 15h6" stroke="url(#goldStroke)" stroke-width="1.4" stroke-linecap="square"/>
           <path d="M2 4c0 3 2 4 2 4M14 4c0 3-2 4-2 4" stroke="url(#goldGrad)" stroke-width="1.3"/>
           <path d="M6 8a2 2 0 004 0" stroke="url(#goldStroke)" stroke-width="1" opacity="0.5"/>`,

  // Crown — GOLD prestige
  crown: `<path d="M2 12L4 5l4 4 4-4 2 7z"
            stroke="url(#goldStroke)" stroke-width="1.5" fill="url(#goldGrad)" fill-opacity="0.2"
            stroke-linejoin="round" filter="url(#glowGold)"/>
          <path d="M2 12h12" stroke="url(#goldStroke)" stroke-width="1.4"/>
          <circle cx="2"  cy="5" r="1.4" fill="url(#goldRadial)" filter="url(#glowGold)"/>
          <circle cx="8"  cy="3" r="1.4" fill="url(#goldRadial)" filter="url(#glowGold)"/>
          <circle cx="14" cy="5" r="1.4" fill="url(#goldRadial)" filter="url(#glowGold)"/>`,

  // Diamond / Crystal — SAPPHIRE gem
  diamond: `<path d="M8 2L13 6l-5 8-5-8z"
              stroke="url(#sapphireGrad)" stroke-width="1.4" fill="url(#sapphireGrad)" fill-opacity="0.12" stroke-linejoin="round" filter="url(#gemShine)"/>
            <path d="M3 6h10M6 4l-3 2M10 4l3 2" stroke="url(#cyanGrad)" stroke-width="1.2"/>
            <path d="M6 6l2 4M10 6l-2 4" stroke="url(#blueGrad)" stroke-width="0.8" opacity="0.5"/>
            <circle cx="8" cy="6" r="0.8" fill="white" opacity="0.6"/>`,

  // Shield — SAPPHIRE prestige
  shield: `<path d="M8 2L2 5v5c0 2.8 2.3 5 6 6 3.7-1 6-3.2 6-6V5z"
             stroke="url(#sapphireGrad)" stroke-width="1.5"
             fill="url(#shieldGrad)" fill-opacity="0.5"
             stroke-linejoin="round" filter="url(#glow)"/>
           <path d="M8 5v4l2 2" stroke="url(#cyanGrad)" stroke-width="1" stroke-linecap="round" opacity="0.7"/>`,

  // Fire — FIRE gradient
  fire: `<path d="M8 14c-3 0-5-2-5-5 0-1.5.5-3 2-4.5 0 2 1 3 1 3s.5-2.5 2-4.5c.5 2 2 3.5 2 3.5s1-1 .5-2.5c2 2 2.5 3.5 2.5 5 0 3-2 5-5 5z"
           stroke="url(#fireGrad)" stroke-width="1.3"
           fill="url(#fireGrad)" fill-opacity="0.2" filter="url(#glowWarm)"/>
         <circle cx="8" cy="11" r="1.8" fill="url(#goldRadial)" opacity="0.75"/>`,

  // Bell — CYAN
  bell: `<path d="M8 2a4 4 0 014 4v4l1.5 2h-11L4 10V6a4 4 0 014-4z" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.08"/>
         <path d="M6 12a2 2 0 004 0" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Bell off
  bell_off: `<path d="M8 2a4 4 0 014 4v4l1.5 2H4.5" stroke="url(#cyanGrad)" stroke-width="1.2" fill="none"/>
             <path d="M6 12a2 2 0 004 0M2 2l12 12" stroke="url(#rubyGrad)" stroke-width="1.3"/>`,

  // Search — CYAN
  search: `<circle cx="6.5" cy="6.5" r="4" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
           <path d="M9.5 9.5L13 13" stroke="url(#cyanGrad)" stroke-width="1.6" stroke-linecap="square"/>`,

  // Stats / Chart — BLUE/GOLD
  stats: `<path d="M2 14V8h3v6M7 14V4h2v10M11 14V6h3v8" stroke="url(#blueGrad)" stroke-width="1.3" stroke-linecap="square"/>
          <path d="M1 14h14" stroke="url(#cyanGrad)" stroke-width="1.3"/>
          <path d="M3.5 8l2-2 2 4 2-6 2 4" stroke="url(#goldGrad)" stroke-width="0.7" fill="none" opacity="0.5"/>`,

  // Scroll — ORANGE
  scroll: `<path d="M4 3h9a1 1 0 011 1v8a1 1 0 01-1 1H4" stroke="url(#orangeGrad)" stroke-width="1.2" fill="none"/>
           <path d="M4 3a2 2 0 000 4M4 7a2 2 0 000 4M4 11a2 2 0 000 2" stroke="url(#orangeGrad)" stroke-width="1.2"/>
           <path d="M7 6h5M7 9h5M7 12h3" stroke="url(#orangeGrad)" stroke-width="1" opacity="0.6"/>`,

  // Camera — CYAN
  camera: `<rect x="2" y="5" width="12" height="9" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.06"/>
           <circle cx="8" cy="9.5" r="2.5" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.1"/>
           <path d="M5 5V4l1.5-1.5h3L11 4v1" stroke="url(#cyanGrad)" stroke-width="1.2"/>
           <circle cx="8" cy="9.5" r="1" fill="url(#cyanGrad)" opacity="0.5"/>`,

  // Edit — CYAN
  edit: `<path d="M2 14l1-4L11 2l3 3-8 8z" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.07" stroke-linejoin="round"/>
         <path d="M9 4l3 3M3 10l3 3" stroke="url(#sapphireGrad)" stroke-width="1.1"/>`,

  // Send / Upload — CYAN
  send: `<path d="M8 2l-4 4h3v6h2V6h3z" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.1" stroke-linejoin="round"/>
         <path d="M3 14h10" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Refresh — EMERALD
  refresh: `<path d="M13 8a5 5 0 11-1.5-3.5" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
            <path d="M11.5 4.5V2l2.5 2.5-2.5 2.5V4.5z" stroke="url(#emeraldGrad)" stroke-width="1.2" fill="url(#emeraldGrad)" fill-opacity="0.2"/>`,

  // Gift — AMETHYST
  gift: `<rect x="2" y="7" width="12" height="8" stroke="url(#amethystGrad)" stroke-width="1.2" fill="url(#amethystGrad)" fill-opacity="0.07"/>
         <path d="M2 7h12v2H2zM8 7V15" stroke="url(#amethystGrad)" stroke-width="1.2"/>
         <path d="M8 7c0 0-1-3 0-4.5C9 1 10 2 9 4" stroke="url(#rubyGrad)" stroke-width="1.3" stroke-linecap="round"/>
         <path d="M8 7c0 0 1-3 0-4.5C7 1 6 2 7 4" stroke="url(#emeraldGrad)" stroke-width="1.3" stroke-linecap="round"/>`,

  // City skyline — BLUE
  city: `<path d="M1 14V8l3-2V4l2 1V3l2 2V1l2 2V3l2-1v2l3 2v6z" stroke="url(#sapphireGrad)" stroke-width="1.3" fill="url(#sapphireGrad)" fill-opacity="0.08" stroke-linejoin="round"/>
         <path d="M6 14v-3h2v3M8 14v-3h2v3" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Signal — CYAN
  signal: `<circle cx="8" cy="12" r="1.8" fill="url(#cyanGrad)"/>
           <path d="M5 9.5a4.2 4.2 0 016 0" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
           <path d="M3 7a7 7 0 0110 0" stroke="url(#cyanGrad)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
           <path d="M1 4.5a9.8 9.8 0 0114 0" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,

  // Pin — RUBY
  pin: `<path d="M8 2a4 4 0 014 4c0 3-4 8-4 8S4 9 4 6a4 4 0 014-4z" stroke="url(#rubyGrad)" stroke-width="1.3" fill="url(#rubyGrad)" fill-opacity="0.1"/>
        <circle cx="8" cy="6" r="1.8" fill="url(#rubyGrad)" filter="url(#glowWarm)"/>`,

  // Compass — EMERALD
  compass: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.07"/>
            <polygon points="8,4 9.5,9 8,8 6.5,9" fill="url(#rubyGrad)"/>
            <polygon points="8,12 6.5,7 8,8 9.5,7" fill="url(#cyanGrad)" opacity="0.45"/>`,

  // Sword (standalone) — RUBY
  sword: `<path d="M3 13L13 3M10 3h3v3M6 13H3v-3" stroke="url(#rubyGrad)" stroke-width="1.4" stroke-linecap="square"/>
          <path d="M7 7l1 1" stroke="url(#goldStroke)" stroke-width="1.5" stroke-linecap="round"/>`,

  // Person — CYAN
  person: `<circle cx="8" cy="5" r="3" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
           <path d="M2 14c0-4 2.7-6 6-6s6 2 6 6" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Axes — RUBY/ORANGE
  axes: `<path d="M3 13L11 5M10 3l3 3M5 13l-2 .5.5-2" stroke="url(#rubyGrad)" stroke-width="1.4" stroke-linecap="round"/>
         <path d="M13 13L5 5M6 3L3 6M11 13l2 .5-.5-2" stroke="url(#orangeGrad)" stroke-width="1.4" stroke-linecap="round"/>`,

  // Hammer — GOLD
  hammer: `<path d="M3 13l5-5" stroke="url(#orangeGrad)" stroke-width="2.2" stroke-linecap="square"/>
           <rect x="7" y="3" width="6" height="4" transform="rotate(45 10 5)" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.2"/>`,

  // Level up — EMERALD
  levelup: `<path d="M8 2l-5 6h3.5v6h3V8H13z" stroke="url(#emeraldGrad)" stroke-width="1.4" fill="url(#emeraldGrad)" fill-opacity="0.15" stroke-linejoin="round"/>`,

  // XP burst — GOLD
  xp: `<path d="M8 2l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5z"
         stroke="url(#goldStroke)" stroke-width="1.4" fill="url(#goldGrad)" fill-opacity="0.15" filter="url(#glowGold)"/>`,

  // Crystal currency — CYAN
  crystal: `<path d="M8 1l4 4-1 6H5L4 5zM4 5h8" stroke="url(#cyanGrad)" stroke-width="1.4" fill="url(#cyanGrad)" fill-opacity="0.1" stroke-linejoin="round"/>
            <path d="M8 1L5 5M8 1l3 4" stroke="url(#sapphireGrad)" stroke-width="1.1" opacity="0.6"/>
            <circle cx="8" cy="8" r="0.8" fill="white" opacity="0.5"/>`,

  // Gold coin — GOLD radial
  gold: `<circle cx="8" cy="8" r="6" stroke="url(#goldStroke)" stroke-width="1.4" fill="url(#goldRadial)" fill-opacity="0.25" filter="url(#glowGold)"/>
         <path d="M6 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" stroke="url(#goldGrad)" stroke-width="1.2" fill="none"/>
         <path d="M8 4v1M8 11v1" stroke="url(#goldStroke)" stroke-width="1.3"/>`,

  // Chest — ORANGE/GOLD
  chest: `<rect x="2" y="7" width="12" height="7" stroke="url(#orangeGrad)" stroke-width="1.3" fill="url(#orangeGrad)" fill-opacity="0.1"/>
          <path d="M2 7a4 4 0 018 0" stroke="url(#goldStroke)" stroke-width="1.3" fill="none"/>
          <path d="M2 10h12M6 10v2h4v-2" stroke="url(#orangeGrad)" stroke-width="1.2"/>
          <circle cx="8" cy="11" r="0.8" fill="url(#goldGrad)" opacity="0.7"/>`,

  // Copy — CYAN
  copy: `<rect x="5" y="5" width="9" height="9" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <path d="M5 5V3H2v9h3" stroke="url(#sapphireGrad)" stroke-width="1.2"/>`,

  // Close / X — RUBY
  close: `<path d="M2 2l12 12M14 2L2 14" stroke="url(#rubyGrad)" stroke-width="1.8" stroke-linecap="square"/>`,

  // Plus — EMERALD
  plus: `<path d="M8 2v12M2 8h12" stroke="url(#emeraldGrad)" stroke-width="1.8" stroke-linecap="square"/>`,

  // Warning triangle — GOLD
  warning: `<path d="M8 2L14 13H2z" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldGrad)" fill-opacity="0.08" stroke-linejoin="round"/>
            <path d="M8 6v4" stroke="url(#goldStroke)" stroke-width="1.4" stroke-linecap="square"/>
            <circle cx="8" cy="11.5" r="0.9" fill="url(#goldGrad)"/>`,

  // Lock — BLUE
  lock: `<rect x="3" y="7" width="10" height="7" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07"/>
         <path d="M5 7V5a3 3 0 016 0v2" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/>
         <circle cx="8" cy="11" r="1.8" fill="url(#cyanGrad)" opacity="0.8"/>`,

  // Settings / Gear — CYAN
  settings: `<circle cx="8" cy="8" r="2.5" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.1"/>
             <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6l1.4 1.4M3 13l1.4-1.4M11.6 4.4l1.4-1.4" stroke="url(#cyanGrad)" stroke-width="1.2"/>`,

  // Strength (STR) — RUBY
  strength: `<path d="M4 11c0 0 1-4 4-4s4 2 4 2" stroke="url(#rubyGrad)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
             <path d="M3 9l1 2 2-1" stroke="url(#rubyGrad)" stroke-width="1.2" stroke-linecap="round"/>
             <circle cx="10" cy="6" r="2" stroke="url(#rubyGrad)" stroke-width="1.2" fill="url(#rubyGrad)" fill-opacity="0.1"/>
             <path d="M12 6c1 0 2 .5 2 2s-1 2-2 2" stroke="url(#rubyGrad)" stroke-width="1.2" fill="none"/>`,

  // Intel (INT) — AMETHYST
  intel: `<path d="M5 10V8a3 3 0 016 0v2" stroke="url(#amethystGrad)" stroke-width="1.2" fill="none"/>
          <path d="M4 10h8v2a2 2 0 01-4 0 2 2 0 01-4 0v-2z" stroke="url(#amethystGrad)" stroke-width="1.2" fill="url(#amethystGrad)" fill-opacity="0.08"/>
          <path d="M8 5V3M5.5 5.5L4 4M10.5 5.5L12 4" stroke="url(#amethystGrad)" stroke-width="1.1"/>`,

  // Business (BIZ) — ORANGE
  biz: `<rect x="3" y="6" width="10" height="8" stroke="url(#orangeGrad)" stroke-width="1.2" fill="url(#orangeGrad)" fill-opacity="0.08"/>
        <path d="M5 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="url(#orangeGrad)" stroke-width="1.2" fill="none"/>
        <path d="M3 10h10" stroke="url(#goldStroke)" stroke-width="1.2"/>`,

  // Exploration stat — EMERALD
  explore_stat: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.2" fill="url(#emeraldGrad)" fill-opacity="0.07"/>
                 <polygon points="8,4 9.5,9 8,8 6.5,9" fill="url(#rubyGrad)"/>
                 <polygon points="8,12 6.5,7 8,8 9.5,7" fill="url(#emeraldGrad)" opacity="0.4"/>`,

  // Diplomacy stat — SAPPHIRE
  diplo_stat: `<path d="M2 10l2-2h3l1 1h2l1-1h2l1 2" stroke="url(#sapphireGrad)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
               <path d="M2 10l-.5 1.5M14 10l.5 1.5" stroke="url(#sapphireGrad)" stroke-width="1.2" stroke-linecap="round"/>`,

  // Group — CYAN
  group: `<circle cx="5" cy="5" r="2.5" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
          <circle cx="11" cy="5" r="2.5" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.1"/>
          <path d="M1 14c0-3 1.8-4.5 4-4.5s4 1.5 4 4.5" stroke="url(#cyanGrad)" stroke-width="1.2"/>
          <path d="M11 9.5c2.2 0 4 1.5 4 4.5" stroke="url(#sapphireGrad)" stroke-width="1.2"/>`,

  // Save — CYAN
  save: `<rect x="2" y="2" width="12" height="12" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.06"/>
         <rect x="5" y="2" width="6" height="5" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.1"/>
         <rect x="4" y="9" width="8" height="5" stroke="url(#cyanGrad)" stroke-width="1.2"/>
         <path d="M10 3v3" stroke="url(#cyanGrad)" stroke-width="1.2" opacity="0.5"/>`,

  // Medal — GOLD
  medal: `<circle cx="8" cy="10" r="4" stroke="url(#goldStroke)" stroke-width="1.3" fill="url(#goldRadial)" fill-opacity="0.2" filter="url(#glowGold)"/>
          <path d="M5 6L3 2h10L11 6" stroke="url(#goldGrad)" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
          <path d="M8 8.5v1.5l1 1" stroke="url(#goldStroke)" stroke-width="1.1" opacity="0.8"/>`,

  // Tag — CYAN
  tag: `<path d="M2 2h6l6 6-6 6-6-6z" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.08" stroke-linejoin="round"/>
        <circle cx="6" cy="6" r="1.4" fill="url(#cyanGrad)"/>`,

  // Rank 1 (GOLD)
  rank1: `<circle cx="8" cy="8" r="6" stroke="url(#goldStroke)" stroke-width="1.7" fill="url(#goldRadial)" fill-opacity="0.2" filter="url(#glowGold)"/>
          <path d="M7 5.5L6 7h2V11" stroke="url(#goldGrad)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Rank 2 (PLATINUM)
  rank2: `<circle cx="8" cy="8" r="6" stroke="url(#platinumGrad)" stroke-width="1.7"/>
          <path d="M6 6.5C6 5.7 6.9 5 8 5s2 .7 2 1.5c0 1.5-4 3-4 4.5h4" stroke="url(#platinumGrad)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  // Rank 3 (ORANGE)
  rank3: `<circle cx="8" cy="8" r="6" stroke="url(#orangeGrad)" stroke-width="1.7"/>
          <path d="M6.5 5h3l-2 3c1.2 0 2.5.8 2.5 2s-1 2-2.5 2H6.5" stroke="url(#orangeGrad)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  // Phone — CYAN
  phone: `<rect x="4" y="1" width="8" height="14" rx="1" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.06"/>
          <circle cx="8" cy="13" r="0.9" fill="url(#cyanGrad)"/>
          <path d="M6 3h4" stroke="url(#sapphireGrad)" stroke-width="1" opacity="0.5"/>`,

  // Document — BLUE
  doc: `<path d="M4 2h6l4 4v10H4z" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07" stroke-linejoin="round"/>
        <path d="M10 2v4h4" stroke="url(#cyanGrad)" stroke-width="1.2" fill="none"/>
        <path d="M6 9h5M6 12h3" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.6"/>`,

  // Frame / Picture — AMETHYST
  frame: `<rect x="2" y="2" width="12" height="12" stroke="url(#amethystGrad)" stroke-width="1.2" fill="url(#amethystGrad)" fill-opacity="0.06"/>
          <rect x="4" y="4" width="8" height="8" stroke="url(#amethystGrad)" stroke-width="1" opacity="0.5"/>
          <path d="M4 10l3-3 2 2 2-3 2 4" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.75"/>`,

  // Globe — SAPPHIRE
  globe: `<circle cx="8" cy="8" r="6" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07"/>
          <path d="M8 2c-2 2-2 10 0 12M8 2c2 2 2 10 0 12" stroke="url(#cyanGrad)" stroke-width="1" fill="none"/>
          <path d="M2 8h12" stroke="url(#sapphireGrad)" stroke-width="1"/>
          <path d="M3 5h10M3 11h10" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.5"/>`,

  // Wave — CYAN
  wave: `<path d="M5 12c-1-1-2-3-1-5l4-5c.5-.7 1.5-.5 1.5.3v3l3-3c.7-.7 1.7 0 1.3 1L11 7l2-1c.7-.3 1.3.5.8 1.2L10 12c-1 1-3 2-5 0z" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.08" stroke-linejoin="round"/>`,

  // Paw — ORANGE
  paw: `<circle cx="8" cy="10" r="3" stroke="url(#orangeGrad)" stroke-width="1.2" fill="url(#orangeGrad)" fill-opacity="0.1"/>
        <circle cx="4" cy="7" r="1.5" stroke="url(#orangeGrad)" stroke-width="1.1" fill="url(#orangeGrad)" fill-opacity="0.1"/>
        <circle cx="12" cy="7" r="1.5" stroke="url(#orangeGrad)" stroke-width="1.1" fill="url(#orangeGrad)" fill-opacity="0.1"/>
        <circle cx="6" cy="5" r="1.2" stroke="url(#orangeGrad)" stroke-width="1.1"/>
        <circle cx="10" cy="5" r="1.2" stroke="url(#orangeGrad)" stroke-width="1.1"/>`,

  // Wrench — SAPPHIRE
  wrench: `<path d="M11 3a3 3 0 00-3 4L3 12a1.4 1.4 0 002 2l5-5a3 3 0 004-3 3 3 0 00-1-.5L12 7l-1-1 1.5-1.5A3 3 0 0011 3z" stroke="url(#sapphireGrad)" stroke-width="1.3" fill="url(#sapphireGrad)" fill-opacity="0.07" stroke-linejoin="round"/>`,

  // Bank — GOLD
  bank: `<rect x="2" y="7" width="12" height="7" stroke="url(#goldStroke)" stroke-width="1.2" fill="url(#goldGrad)" fill-opacity="0.08"/>
         <path d="M2 7l6-5 6 5" stroke="url(#goldGrad)" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
         <path d="M4 7v7M7 7v7M10 7v7M13 7v7" stroke="url(#goldStroke)" stroke-width="1" opacity="0.5"/>
         <path d="M1 14h14" stroke="url(#goldStroke)" stroke-width="1.3"/>`,

  // Announce / Megaphone — CYAN
  announce: `<path d="M3 6h2v4H3z" stroke="url(#cyanGrad)" stroke-width="1.2" fill="url(#cyanGrad)" fill-opacity="0.1"/>
             <path d="M5 6L12 3v10L5 10" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.08" stroke-linejoin="round"/>
             <path d="M3 10l1 4" stroke="url(#cyanGrad)" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M13 6.5c1 .5 1 3.5 0 4" stroke="url(#cyanGrad)" stroke-width="1.3" fill="none"/>`,

  // Clipboard — BLUE
  clipboard: `<rect x="3" y="3" width="10" height="12" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07"/>
              <path d="M6 3V2h4v1" stroke="url(#cyanGrad)" stroke-width="1.2"/>
              <path d="M5 7h6M5 10h6M5 13h4" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.6"/>`,

  // Skull — RUBY
  skull: `<path d="M4 10V8a4 4 0 018 0v2" stroke="url(#rubyGrad)" stroke-width="1.3" fill="none"/>
          <rect x="3" y="10" width="10" height="5" stroke="url(#rubyGrad)" stroke-width="1.2" fill="url(#rubyGrad)" fill-opacity="0.07"/>
          <circle cx="6" cy="8" r="1.1" fill="url(#rubyGrad)" opacity="0.9"/>
          <circle cx="10" cy="8" r="1.1" fill="url(#rubyGrad)" opacity="0.9"/>
          <path d="M6 13v2M8 12v3M10 13v2" stroke="url(#rubyGrad)" stroke-width="1.1"/>`,

  // Upload img — CYAN/EMERALD
  upload_img: `<rect x="2" y="5" width="12" height="9" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.06"/>
               <path d="M5 5V4l1.5-1.5h3L11 4v1" stroke="url(#cyanGrad)" stroke-width="1.2"/>
               <path d="M8 8V13M6 10l2-2 2 2" stroke="url(#emeraldGrad)" stroke-width="1.3" stroke-linecap="square"/>`,

  // Checkin — EMERALD
  checkin: `<path d="M8 1a4 4 0 014 4c0 3-4 8-4 8S4 8 4 5a4 4 0 014-4z" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.1"/>
            <path d="M6 5l1.5 1.5L10 4" stroke="url(#emeraldGrad)" stroke-width="1.4" stroke-linecap="round"/>`,

  // Title badge — GOLD
  title_badge: `<path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z"
                  stroke="url(#goldStroke)" stroke-width="1.4" fill="url(#goldGrad)" fill-opacity="0.2"
                  stroke-linejoin="round" filter="url(#glowGold)"/>`,

  // Dice — AMETHYST
  dice: `<rect x="2" y="2" width="12" height="12" rx="2" stroke="url(#amethystGrad)" stroke-width="1.3" fill="url(#amethystGrad)" fill-opacity="0.08"/>
         <circle cx="5"  cy="5"  r="1.1" fill="url(#amethystGrad)"/>
         <circle cx="11" cy="5"  r="1.1" fill="url(#amethystGrad)"/>
         <circle cx="5"  cy="11" r="1.1" fill="url(#amethystGrad)"/>
         <circle cx="11" cy="11" r="1.1" fill="url(#amethystGrad)"/>
         <circle cx="5"  cy="8"  r="1.1" fill="url(#amethystGrad)"/>
         <circle cx="11" cy="8"  r="1.1" fill="url(#amethystGrad)"/>`,

  // Lightning bolt — LIGHTNING
  lightning: `<polygon points="10,1 4,9 8,9 6,15 12,7 8,7"
                stroke="url(#lightningGrad)" stroke-width="1.4"
                fill="url(#lightningGrad)" fill-opacity="0.22"
                stroke-linejoin="round" filter="url(#glowGold)"/>`,

  // Check circle — EMERALD
  check_circle: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.3" fill="url(#emeraldGrad)" fill-opacity="0.08"/>
                 <path d="M5 8l2 2 4-4" stroke="url(#emeraldGrad)" stroke-width="1.6" stroke-linecap="square"/>`,

  // X circle — RUBY
  x_circle: `<circle cx="8" cy="8" r="6" stroke="url(#rubyGrad)" stroke-width="1.3" fill="url(#rubyGrad)" fill-opacity="0.08"/>
             <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="url(#rubyGrad)" stroke-width="1.6" stroke-linecap="square"/>`,

  // Zoom — CYAN
  zoom: `<circle cx="6.5" cy="6.5" r="4" stroke="url(#cyanGrad)" stroke-width="1.3" fill="url(#cyanGrad)" fill-opacity="0.07"/>
         <path d="M9.5 9.5L13 13" stroke="url(#cyanGrad)" stroke-width="1.6" stroke-linecap="square"/>
         <path d="M5 6.5h3M6.5 5v3" stroke="url(#emeraldGrad)" stroke-width="1.2" stroke-linecap="square"/>`,

  // Target — RUBY
  target: `<circle cx="8" cy="8" r="6" stroke="url(#rubyGrad)" stroke-width="1.2"/>
           <circle cx="8" cy="8" r="3" stroke="url(#rubyGrad)" stroke-width="1.2"/>
           <circle cx="8" cy="8" r="1.2" fill="url(#rubyGrad)" filter="url(#glowWarm)"/>`,

  // Calendar — SAPPHIRE
  calendar: `<rect x="2" y="3" width="12" height="11" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.07"/>
             <path d="M2 7h12M6 3V1M10 3V1" stroke="url(#cyanGrad)" stroke-width="1.2"/>
             <rect x="5" y="9" width="2" height="2" fill="url(#sapphireGrad)" opacity="0.9"/>
             <rect x="9" y="9" width="2" height="2" fill="url(#cyanGrad)" opacity="0.6"/>`,

  // Pioneer compass — EMERALD
  pioneer: `<circle cx="8" cy="8" r="6" stroke="url(#emeraldGrad)" stroke-width="1.2" fill="url(#emeraldGrad)" fill-opacity="0.07"/>
            <polygon points="8,4 9.5,9 8,8 6.5,9" fill="url(#rubyGrad)"/>
            <polygon points="8,12 6.5,7 8,8 9.5,7" fill="url(#sapphireGrad)" opacity="0.45"/>
            <path d="M8 2v1M8 13v1M2 8h1M13 8h1" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.5"/>`,

  // Hide — BLUE/RUBY
  hide: `<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="none"/>
         <path d="M2 2l12 12" stroke="url(#rubyGrad)" stroke-width="1.5" stroke-linecap="square"/>`,

  // Star filled — GOLD prestige
  star_filled: `<polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6"
                  stroke="url(#goldStroke)" stroke-width="1.3"
                  fill="url(#goldGrad)" fill-opacity="0.85" filter="url(#glowGold)"/>`,
}


// ============================================================
// COMBINED MAP
// ============================================================
export const ICONS = {
  ...NAV_ICONS,
  ...SYSTEM_ICONS,
  quest_daily:      QUEST_ICONS.daily,
  quest_weekly:     QUEST_ICONS.weekly,
  quest_challenge:  QUEST_ICONS.challenge,
  quest_guild:      QUEST_ICONS.guild_quest,
  quest_story:      QUEST_ICONS.story,
  class_warrior:    CLASS_ICONS.warrior,
  class_mage:       CLASS_ICONS.mage,
  class_explorer:   CLASS_ICONS.explorer,
  class_merchant:   CLASS_ICONS.merchant,
  class_artist:     CLASS_ICONS.artist,
  class_diplomat:   CLASS_ICONS.diplomat,
  dice:             SYSTEM_ICONS.dice,
  lightning:        SYSTEM_ICONS.lightning,
  check_circle:     SYSTEM_ICONS.check_circle,
  x_circle:         SYSTEM_ICONS.x_circle,
  zoom:             SYSTEM_ICONS.zoom,
  target:           SYSTEM_ICONS.target,
  calendar:         SYSTEM_ICONS.calendar,
  pioneer:          SYSTEM_ICONS.pioneer,
  hide:             SYSTEM_ICONS.hide,
  star_filled:      SYSTEM_ICONS.star_filled,
  str:              SYSTEM_ICONS.strength,
  int:              SYSTEM_ICONS.intel,
  biz:              SYSTEM_ICONS.biz,
  exp_stat:         SYSTEM_ICONS.explore_stat,
  dip:              SYSTEM_ICONS.diplo_stat,
  strength:         SYSTEM_ICONS.strength,
  intel:            SYSTEM_ICONS.intel,
  explore_stat:     SYSTEM_ICONS.explore_stat,
  diplo_stat:       SYSTEM_ICONS.diplo_stat,
  chart:            SYSTEM_ICONS.stats,
  upload:           SYSTEM_ICONS.send,
  palette:          SYSTEM_ICONS.frame,
  cre:              SYSTEM_ICONS.frame,
  warning:          SYSTEM_ICONS.warning,
  settings:         SYSTEM_ICONS.settings,
  copy:             SYSTEM_ICONS.copy,
  announce:         SYSTEM_ICONS.announce,
  clipboard:        SYSTEM_ICONS.clipboard,
  bank:             SYSTEM_ICONS.bank,
  axes:             SYSTEM_ICONS.axes,
  skull:            SYSTEM_ICONS.skull,
  xp:               SYSTEM_ICONS.xp,
  crystal:          SYSTEM_ICONS.crystal,
  gold:             SYSTEM_ICONS.gold,
  chest:            SYSTEM_ICONS.chest,
  tag:              SYSTEM_ICONS.tag,
  rank1:            SYSTEM_ICONS.rank1,
  rank2:            SYSTEM_ICONS.rank2,
  rank3:            SYSTEM_ICONS.rank3,
  phone:            SYSTEM_ICONS.phone,
  doc:              SYSTEM_ICONS.doc,
  paw:              SYSTEM_ICONS.paw,
  wrench:           SYSTEM_ICONS.wrench,
  wave:             SYSTEM_ICONS.wave,
  title_badge:      SYSTEM_ICONS.title_badge,
  upload_img:       SYSTEM_ICONS.upload_img,
  checkin:          SYSTEM_ICONS.checkin,
  pin:              SYSTEM_ICONS.pin,
  compass:          SYSTEM_ICONS.compass,
  search:           SYSTEM_ICONS.search,
  hammer:           SYSTEM_ICONS.hammer,
  signal:           SYSTEM_ICONS.signal,
  group:            SYSTEM_ICONS.group,
}


// ============================================================
// HELPER — getIcon(name, size, options)
//
// options.prestige = true  → adds nx-icon-prestige class (gold glow + sparkle)
// options.raw = true       → no wrapper class (backward-compat)
// options.class = true     → adds nx-icon-class (3D tilt hover)
// ============================================================
export function getIcon(name, size = 16, options = {}) {
  // Support legacy: getIcon('trophy', 20, 'currentColor') — third arg was color
  const opts = (typeof options === 'string') ? {} : options
  const { prestige = false, raw = false } = opts

  const content = ICONS[name]
  if (!content) {
    console.warn(`[ICONS] icon not found: "${name}"`)
    return ''
  }
  const isClass = name.startsWith('class_')
  const vb = isClass ? '0 0 20 20' : '0 0 16 16'

  let cls = ''
  if (!raw) {
    if (prestige) cls = 'nx-icon nx-icon-prestige'
    else if (isClass) cls = 'nx-icon nx-icon-class'
    else cls = 'nx-icon'
  }
  const classAttr = cls ? ` class="${cls}"` : ''

  return `<svg width="${size}" height="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true"${classAttr}>${content}</svg>`
}


// ============================================================
// CLASS_COLOR — single source of truth
// ============================================================
export const CLASS_COLOR = {
  warrior:  '#ff4444',
  mage:     '#cc66ff',
  explorer: '#44ff88',
  merchant: '#ffcc44',
  artist:   '#cc66ff',
  diplomat: '#44aaff',
}


// ============================================================
// TOAST CSS — with premium gradient icon colors
// ============================================================
const TOAST_ICON_CSS = `
<style id="nexus-toast-icons">
.toast { display:flex; align-items:center; gap:10px; }
.toast::before {
  content:'';
  display:block;
  width:16px;
  height:16px;
  flex-shrink:0;
  background-repeat:no-repeat;
  background-position:center;
  background-size:contain;
  opacity:0.9;
}
.toast.success::before {
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='6' stroke='%2344ff88' stroke-width='1.3'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='%23aaffcc' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E");
}
.toast.error::before {
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='6' stroke='%23ff4422' stroke-width='1.3'/%3E%3Cpath d='M5.5 5.5l5 5M10.5 5.5l-5 5' stroke='%23ff9988' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E");
}
.toast.info::before {
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='6' stroke='%2300f5ff' stroke-width='1.3'/%3E%3Cpath d='M8 7v4' stroke='%2388ffff' stroke-width='1.4' stroke-linecap='square'/%3E%3Ccircle cx='8' cy='5.5' r='0.9' fill='%2300f5ff'/%3E%3C/svg%3E");
}
.toast.gold::before {
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='6' stroke='%23ffd700' stroke-width='1.3'/%3E%3Cpath d='M6 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2' stroke='%23ffee88' stroke-width='1.2'/%3E%3Cpath d='M8 4v1M8 11v1' stroke='%23ffd700' stroke-width='1.2'/%3E%3C/svg%3E");
}
</style>`

if (typeof document !== 'undefined' && !document.getElementById('nexus-toast-icons')) {
  document.head.insertAdjacentHTML('beforeend', TOAST_ICON_CSS)
}


// ============================================================
// SIDEBAR COMPAT
// ============================================================
export default ICONS
