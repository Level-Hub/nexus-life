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

    <!-- ── SHOP EXCLUSIVE GRADIENTS ── -->
    <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#330066"/>
      <stop offset="50%"  stop-color="#9900ff"/>
      <stop offset="100%" stop-color="#cc44ff"/>
    </linearGradient>

    <linearGradient id="frostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#88ddff"/>
      <stop offset="50%"  stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#44aaff"/>
    </linearGradient>

    <linearGradient id="voidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#000033"/>
      <stop offset="50%"  stop-color="#8800ff"/>
      <stop offset="100%" stop-color="#aa44ff"/>
    </linearGradient>

    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"    stop-color="#ff0080"/>
      <stop offset="20%"   stop-color="#ff4400"/>
      <stop offset="40%"   stop-color="#ffaa00"/>
      <stop offset="60%"   stop-color="#44ff00"/>
      <stop offset="80%"   stop-color="#00ddff"/>
      <stop offset="100%"  stop-color="#8800ff"/>
    </linearGradient>

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

  // Warrior — ascending greatsword with battle aura (RUBY + GOLD, glowWarm)
  warrior: `<circle cx="10" cy="10" r="8.3" fill="url(#rubyGrad)" fill-opacity="0.05" stroke="url(#rubyGrad)" stroke-width="0.5" opacity="0.35"/>
            <path d="M10 1.5v13" stroke="url(#rubyGrad)" stroke-width="2.2" stroke-linecap="round" filter="url(#glowWarm)"/>
            <path d="M10 1.5v13" stroke="url(#goldStroke)" stroke-width="0.6" stroke-linecap="round" opacity="0.7"/>
            <path d="M9.3 2l0.7 1.4 0.7-1.4z" fill="url(#goldStroke)" opacity="0.8"/>
            <path d="M5.5 7.2h9" stroke="url(#goldGrad)" stroke-width="1.7" stroke-linecap="round"/>
            <path d="M5.5 7.2c-0.8 0.3-1 1-0.8 1.8M14.5 7.2c0.8 0.3 1 1 0.8 1.8" stroke="url(#goldStroke)" stroke-width="1" opacity="0.6" fill="none" stroke-linecap="round"/>
            <rect x="8.6" y="14.5" width="2.8" height="3.6" rx="0.6" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1"/>
            <circle cx="10" cy="18.2" r="1.2" fill="url(#goldRadial)" filter="url(#glowGold)"/>
            <path d="M4 11c-1 1-1.3 2.3-0.6 3.4M16 11c1 1 1.3 2.3 0.6 3.4" stroke="url(#fireGrad)" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.8"/>`,

  // Mage — arcane staff with floating orb & orbiting sigil (AMETHYST + glowPurple)
  mage: `<ellipse cx="9.5" cy="6" rx="6" ry="2.1" stroke="url(#purpleGrad)" stroke-width="0.9" fill="none" opacity="0.55" transform="rotate(-12 9.5 6)"/>
         <path d="M9 18.5V6.5" stroke="url(#amethystGrad)" stroke-width="1.6" stroke-linecap="round"/>
         <path d="M9 18.5l-2.2 1.2M9 18.5l2.2 1.2" stroke="url(#amethystGrad)" stroke-width="1.3" stroke-linecap="round"/>
         <circle cx="9.5" cy="5.5" r="3" fill="url(#amethystGrad)" fill-opacity="0.35" stroke="url(#purpleGrad)" stroke-width="1.4" filter="url(#glowPurple)"/>
         <circle cx="8.5" cy="4.5" r="0.9" fill="white" opacity="0.6"/>
         <path d="M15 4l1.2-1.6M16 7.5l1.7 0.4M3.5 3l1.5 1.3M3 8l1.8-0.7" stroke="url(#purpleGrad)" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
         <circle cx="16.8" cy="2.5" r="0.6" fill="url(#amethystGrad)"/>
         <circle cx="2.3" cy="9" r="0.55" fill="url(#cyanGrad)" opacity="0.85"/>`,

  // Explorer — ornate compass over distant peaks (EMERALD)
  explorer: `<path d="M2 16l3.5-8 3.5 4.5 2.7-6.2L16 16z" fill="url(#emeraldGrad)" fill-opacity="0.08" stroke="url(#emeraldGrad)" stroke-width="1.1" stroke-linejoin="round"/>
             <circle cx="10" cy="10" r="7.3" stroke="url(#emeraldGrad)" stroke-width="1.6" fill="none"/>
             <circle cx="10" cy="10" r="5.2" stroke="url(#cyanGrad)" stroke-width="0.5" opacity="0.3" fill="none"/>
             <path d="M10 3.5v1.3M10 15.2v1.3M3.5 10h1.3M15.2 10h1.3" stroke="url(#emeraldGrad)" stroke-width="1.1"/>
             <polygon points="10,6 12,11 10,10 8,11" fill="url(#rubyGrad)" filter="url(#glowWarm)"/>
             <polygon points="10,14 8,9 10,10 12,9" fill="url(#cyanGrad)" opacity="0.45"/>
             <circle cx="10" cy="10" r="0.9" fill="url(#goldGrad)"/>`,

  // Merchant — gilded coin pouch with floating coins (GOLD, glowGold)
  merchant: `<path d="M7.2 6.2V5a2.8 2.8 0 015.6 0v1.2" stroke="url(#goldStroke)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
             <path d="M5 6.2h10l1.6 10.3a1.6 1.6 0 01-1.6 1.8H5a1.6 1.6 0 01-1.6-1.8z" fill="url(#goldGrad)" fill-opacity="0.15" stroke="url(#goldStroke)" stroke-width="1.4" stroke-linejoin="round" filter="url(#glowGold)"/>
             <circle cx="10" cy="12" r="3" fill="url(#goldRadial)" stroke="url(#goldStroke)" stroke-width="1.2"/>
             <path d="M10 10.3v3.4M9 11.2c0-.7.5-1.1 1-1.1s1 .4 1 .9-.4.8-1 1-1 .5-1 1 .5.9 1 .9 1-.3 1-.9" stroke="url(#goldGrad)" stroke-width="0.7" fill="none" opacity="0.85"/>
             <circle cx="3" cy="4" r="1.5" fill="url(#goldRadial)" opacity="0.85"/>
             <circle cx="17.2" cy="3.2" r="1.1" fill="url(#goldRadial)" opacity="0.75"/>`,

  // Artist — gemstone palette with paint drops & brush (AMETHYST → CYAN, gemShine)
  artist: `<path d="M3 9.2c0-4.2 3.5-7.2 8-7.2s8 2.6 8 6.1c0 2.1-1.6 3.6-3.6 3.6h-2c-1 0-1.5.7-1.5 1.5 0 1 .7 1.5 1.5 1.5h.4c.85 0 1.6.7 1.6 1.6 0 1.6-1.6 2.7-3.7 2.7C5.5 18.5 2 14.7 2 9.7z" fill="url(#amethystGrad)" fill-opacity="0.1" stroke="url(#purpleGrad)" stroke-width="1.3" stroke-linejoin="round" filter="url(#gemShine)"/>
           <circle cx="6.5" cy="8" r="1.35" fill="url(#rubyGrad)"/>
           <circle cx="10" cy="6" r="1.35" fill="url(#cyanGrad)"/>
           <circle cx="13.5" cy="8" r="1.35" fill="url(#emeraldGrad)"/>
           <circle cx="7" cy="12.3" r="1.35" fill="url(#goldGrad)"/>
           <path d="M14.5 3l3-1.6-1 3.3z" fill="url(#amethystGrad)" stroke="url(#purpleGrad)" stroke-width="0.8" stroke-linejoin="round"/>`,

  // Diplomat — laurel-wrapped balance scale (SAPPHIRE + CYAN, glow)
  diplomat: `<path d="M10 2v15" stroke="url(#sapphireGrad)" stroke-width="1.4" stroke-linecap="round"/>
             <path d="M4 5h12" stroke="url(#cyanGrad)" stroke-width="1.3" stroke-linecap="round"/>
             <path d="M4 5l-2.6 5.2a2.6 2.6 0 005.2 0z" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.12" stroke-linejoin="round"/>
             <path d="M16 5l-2.6 5.2a2.6 2.6 0 005.2 0z" stroke="url(#sapphireGrad)" stroke-width="1.2" fill="url(#sapphireGrad)" fill-opacity="0.12" stroke-linejoin="round"/>
             <path d="M6 17.5h8" stroke="url(#sapphireGrad)" stroke-width="1.4" stroke-linecap="round"/>
             <path d="M10 17.5v-1.5" stroke="url(#cyanGrad)" stroke-width="1.2"/>
             <circle cx="10" cy="2" r="1.3" fill="url(#sapphireGrad)" filter="url(#glow)"/>
             <path d="M2.5 13c1.2-1 2.6-1 3.8 0M13.7 13c1.2-1 2.6-1 3.8 0" stroke="url(#emeraldGrad)" stroke-width="1" opacity="0.6" stroke-linecap="round" fill="none"/>`,
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

  // ════════════════════════════════════════════════
  // NEW ICON SET v3.1 — 16×16, stroke/fill="currentColor"
  // CSS-themeable (no gradient/filter dependency)
  // ════════════════════════════════════════════════

  // ── City System ──
  city_war: `<rect x="1" y="7" width="3" height="7" stroke="currentColor" stroke-width="1.2" fill="none"/>
             <rect x="6.5" y="3" width="3" height="11" stroke="currentColor" stroke-width="1.2" fill="none"/>
             <rect x="12" y="6" width="3" height="8" stroke="currentColor" stroke-width="1.2" fill="none"/>
             <path d="M5 11l6-6M11 11L5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,

  city_tournament: `<ellipse cx="8" cy="11.5" rx="6.5" ry="3" stroke="currentColor" stroke-width="1.3" fill="none"/>
                    <ellipse cx="8" cy="11.5" rx="3.3" ry="1.3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
                    <path d="M4 8.5V2M4 2l3.2 1.6L4 5.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="currentColor" fill-opacity="0.15"/>
                    <path d="M12 8.5V3.5M12 3.5l3 1.3-3 1.3" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="currentColor" fill-opacity="0.15"/>`,

  neighborhood: `<path d="M1.5 14V9l2.5-2L6.5 9v5z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
                 <path d="M7.5 14V7l3.5-3L14.5 7v7z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
                 <path d="M3.2 14v-2h1.6v2M9.8 14v-2.5h2V14" stroke="currentColor" stroke-width="1" fill="none"/>`,

  contributors: `<circle cx="5" cy="6" r="2.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
                 <circle cx="10" cy="6" r="2.3" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
                 <path d="M1.5 14c0-2.8 1.6-4.5 3.5-4.5s3.5 1.7 3.5 4.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
                 <path d="M7.5 9.7c1.8 0.2 3 1.8 3 4.3" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
                 <path d="M12.5 3.5v3M11 5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>`,

  city_buff: `<rect x="2" y="8" width="3.2" height="6" stroke="currentColor" stroke-width="1.2" fill="none"/>
              <rect x="6.2" y="4" width="3.2" height="10" stroke="currentColor" stroke-width="1.2" fill="none"/>
              <rect x="10.4" y="6" width="3.2" height="8" stroke="currentColor" stroke-width="1.2" fill="none"/>
              <path d="M11.5 3.2V1M10.4 2.1l1.1-1.1 1.1 1.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <path d="M4 2.5l0.5-1.3 0.5 1.3M3.4 1.8h2.2" stroke="currentColor" stroke-width="0.9" opacity="0.6" fill="none"/>`,

  // ── Leaderboard / Ranking ──
  podium: `<rect x="6" y="6" width="4" height="8" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/>
           <rect x="1" y="9" width="4" height="5" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/>
           <rect x="11" y="10.5" width="4" height="3.5" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/>
           <path d="M8 3.5l1.2 2.2H6.8z" fill="currentColor"/>`,

  global_rank: `<circle cx="8" cy="6.8" r="5.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
                <path d="M8 1.5c-1.9 1.6-1.9 8.4 0 10.6M8 1.5c1.9 1.6 1.9 8.4 0 10.6" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.55"/>
                <path d="M2.7 6.8h10.6" stroke="currentColor" stroke-width="0.9" opacity="0.55"/>
                <path d="M6 11.5l2 3 2-3z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>`,

  city_rank_lb: `<rect x="9" y="2" width="6" height="12" stroke="currentColor" stroke-width="1.2" fill="none"/>
                 <path d="M11 5h3M11 8h3M11 11h2" stroke="currentColor" stroke-width="1" opacity="0.7" stroke-linecap="round" fill="none"/>
                 <path d="M1.5 14V9l2-1.5L5.5 9v5z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round"/>`,

  guild_rank: `<path d="M8 1.5L2.5 4v4c0 3.3 2.4 5.8 5.5 6.5 3.1-0.7 5.5-3.2 5.5-6.5V4z" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.06" stroke-linejoin="round"/>
               <path d="M6.5 9.5L8 7.5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  medal_gold: `<circle cx="8" cy="10" r="4.2" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.14"/>
               <path d="M6 5L4 1h8L10 5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
               <path d="M7 9.5l1.2-1.7v4.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  medal_silver: `<circle cx="8" cy="10" r="4.2" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.09"/>
                 <path d="M6 5L4 1h8L10 5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                 <path d="M6.5 8.7c0-0.85 0.7-1.5 1.5-1.5s1.5 0.65 1.5 1.5c0 1.5-3 2.3-3 3.5h3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  medal_bronze: `<circle cx="8" cy="10" r="4.2" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.06"/>
                 <path d="M6 5L4 1h8L10 5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                 <path d="M6.6 8h1.8L6.8 9.8c1 0 2 0.5 2 1.6s-1 1.7-2.1 1.7c-0.7 0-1.3-0.2-1.7-0.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  // ── Messages ──
  inbox: `<path d="M2 3h12v6.2" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
          <path d="M2 3v6.2M2 9.2h3.6l1.4 2h2l1.4-2H14" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
          <path d="M2 9.2v3.3a1 1 0 001 1h10a1 1 0 001-1V9.2" stroke="currentColor" stroke-width="1.2" fill="none"/>`,

  send_msg: `<path d="M14 2L2 7.4l4.6 1.8L9 14z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round"/>
             <path d="M14 2L6.6 9.2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" fill="none"/>`,

  emoji: `<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3" fill="none"/>
          <circle cx="5.6" cy="6.4" r="0.9" fill="currentColor"/>
          <circle cx="10.4" cy="6.4" r="0.9" fill="currentColor"/>
          <path d="M5 10c1 1.2 5 1.2 6 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>`,

  sticker: `<path d="M2 3a1 1 0 011-1h7l4 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
            <path d="M10 2v4h4" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
            <path d="M6.7 6.8l0.9 1.8 2 0.3-1.4 1.4 0.3 2-1.8-0.9-1.8 0.9 0.3-2-1.4-1.4 2-0.3z" fill="currentColor" fill-opacity="0.55"/>`,

  attach: `<path d="M10.6 5.4L6 10a2.5 2.5 0 003.5 3.5l5-5a4 4 0 00-5.7-5.7l-5 5a1.5 1.5 0 002.1 2.1L10 5.7" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  mic: `<rect x="6" y="1.5" width="4" height="8" rx="2" stroke="currentColor" stroke-width="1.3" fill="none"/>
        <path d="M3.5 8a4.5 4.5 0 009 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>
        <path d="M8 12.5V15M5.5 15h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>`,

  read_receipt: `<path d="M1 8l2.5 2.5L9 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5"/>
                 <path d="M6 8l2.5 2.5L15 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  chevron_left: `<path d="M10.5 2.5L4.5 8l6 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  voice_play: `<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
               <path d="M6.5 5.3v5.4l4.3-2.7z" fill="currentColor"/>`,

  // ── PvP / Guild War ──
  duel: `<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.45"/>
         <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
         <path d="M4 4l1.5 0.4M12 4l-1.5 0.4M4 12l1.5-0.4M12 12l-1.5-0.4" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.7" fill="none"/>`,

  guildwar: `<path d="M3 1.8L1 2.9v3c0 2.3 1 3.8 2 4.4 1-0.6 2-2.1 2-4.4v-3z" stroke="currentColor" stroke-width="1.1" fill="currentColor" fill-opacity="0.08" stroke-linejoin="round"/>
             <path d="M13 1.8l2 1.1v3c0 2.3-1 3.8-2 4.4-1-0.6-2-2.1-2-4.4v-3z" stroke="currentColor" stroke-width="1.1" fill="currentColor" fill-opacity="0.08" stroke-linejoin="round"/>
             <path d="M5 8l3 3M11 8l-3 3M8 11v3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>`,

  tournament: `<path d="M3 14V2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>
               <path d="M3 2l5 1.6L3 5.2z" fill="currentColor" fill-opacity="0.75"/>
               <path d="M9.5 14V5.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.55"/>
               <path d="M9.5 5.5l4 1.3-4 1.3z" fill="currentColor" fill-opacity="0.4"/>
               <path d="M1 14h14" stroke="currentColor" stroke-width="1.2" fill="none"/>`,

  bracket: `<path d="M2 2v3h3M2 13v-3h3M5 3.5h2.5M5 11.5h2.5M7.5 3.5v8M7.5 7.5h3.5M11 4v3h3M11 12v-3h3" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  history: `<circle cx="8" cy="8.5" r="6" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M8 5.2v3.3l2.4 1.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <path d="M8 1.5a6 6 0 00-5 2.6" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <path d="M3.4 1.5v2.6H1" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  challenge: `<path d="M4 8V4a1.4 1.4 0 012.8 0v3" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
              <path d="M6.8 7V3a1.4 1.4 0 012.8 0v4" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
              <path d="M9.6 7V4a1.4 1.4 0 012.8 0v5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/>
              <path d="M4 8v1.8c0 2.4 2 3.9 4.7 3.9s4.7-1.5 4.7-3.9V9" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.06" stroke-linejoin="round"/>
              <path d="M4 8L1.6 9.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>`,

  win: `<path d="M8 1.5l5.5 2v4c0 4-2.5 6.3-5.5 7-3-0.7-5.5-3-5.5-7v-4z" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.08" stroke-linejoin="round"/>
        <path d="M5.5 8l2 2 3.5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  loss: `<path d="M8 1.5l5.5 2v4c0 4-2.5 6.3-5.5 7-3-0.7-5.5-3-5.5-7v-4z" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.05" stroke-linejoin="round" opacity="0.65"/>
         <path d="M5.5 6.2l5 5M10.5 6.2l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,

  pvp_rank: `<path d="M2 14L9 7M14 2L7 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
             <path d="M2 14l0.7-2.7 2 2zM14 2l-0.7 2.7-2-2z" fill="currentColor" opacity="0.8"/>
             <path d="M11 11l2 2M13 9l2 2" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round" fill="none"/>`,

  // ── Guild Management ──
  manage: `<path d="M2 4h6M11 4h3M2 8h2.5M7 8h7M2 12h8.5M13 12h1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>
           <circle cx="8.5" cy="4" r="1.5" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
           <circle cx="5" cy="8" r="1.5" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>
           <circle cx="11.5" cy="12" r="1.5" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.2"/>`,

  officer_badge: `<path d="M8 1.5L2.5 3.7v3.8c0 3.4 2.4 6 5.5 6.8 3.1-0.8 5.5-3.4 5.5-6.8V3.7z" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.06" stroke-linejoin="round"/>
                  <path d="M8 5l1 2 2.2 0.3-1.6 1.5 0.4 2.2L8 9.9l-2 1.1 0.4-2.2-1.6-1.5L7 7z" fill="currentColor" fill-opacity="0.65"/>`,

  kick: `<circle cx="6" cy="4.5" r="2.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
         <path d="M1.5 14c0-3 2-4.8 4.5-4.8s4.5 1.8 4.5 4.8" stroke="currentColor" stroke-width="1.2" fill="none"/>
         <path d="M11 8h4M15 8l-2-2M15 8l-2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  promote: `<circle cx="6" cy="4.5" r="2.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M1.5 14c0-3 2-4.8 4.5-4.8s4.5 1.8 4.5 4.8" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M13 11V5M10.5 7.5L13 5l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  demote: `<circle cx="6" cy="4.5" r="2.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
           <path d="M1.5 14c0-3 2-4.8 4.5-4.8s4.5 1.8 4.5 4.8" stroke="currentColor" stroke-width="1.2" fill="none"/>
           <path d="M13 5v6M10.5 8.5L13 11l2.5-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  // ── Social ──
  follow: `<circle cx="6" cy="5" r="2.8" stroke="currentColor" stroke-width="1.2" fill="none"/>
           <path d="M1 14c0-3.3 2.2-5.3 5-5.3s5 2 5 5.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
           <path d="M13 5.5v4M11 7.5h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>`,

  unfollow: `<circle cx="6" cy="5" r="2.8" stroke="currentColor" stroke-width="1.2" fill="none"/>
             <path d="M1 14c0-3.3 2.2-5.3 5-5.3s5 2 5 5.3" stroke="currentColor" stroke-width="1.2" fill="none"/>
             <path d="M11 7.5h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>`,

  suggest: `<path d="M8 1.5a4.5 4.5 0 00-2.5 8.2c0.3 0.2 0.5 0.5 0.5 0.9V11h4v-0.4c0-0.4 0.2-0.7 0.5-0.9A4.5 4.5 0 008 1.5z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round"/>
            <path d="M6 13h4M6.5 14.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <path d="M8 4v3M6.5 6l1.5 1 1.5-1" stroke="currentColor" stroke-width="0.9" opacity="0.6" stroke-linecap="round" fill="none"/>`,

  // ── UI Utilities ──
  filter: `<path d="M1.5 2h13l-5 6v4.3l-3 1.7V8z" stroke="currentColor" stroke-width="1.3" fill="currentColor" fill-opacity="0.08" stroke-linejoin="round"/>`,

  sort: `<path d="M4 11V2M4 2L1.5 4.5M4 2l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
         <path d="M12 5v9M12 14l2.5-2.5M12 14l-2.5-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.6"/>`,
}


// ============================================================
// GUILD ICONS — AAA Grade (20 icons, 24×24 viewBox)
// These are exclusively for guild emblems / selection picker.
// Each uses multi-stop gradients + filter for premium look.
// ============================================================
export const GUILD_ICONS = {

  // ── 1. FORTRESS — stone castle with towers ──
  fortress: `
    <rect x="3" y="10" width="18" height="12" fill="url(#goldGrad)" fill-opacity="0.10" stroke="url(#goldGrad)" stroke-width="1.4"/>
    <rect x="5" y="6" width="4" height="7" fill="url(#goldGrad)" fill-opacity="0.14" stroke="url(#goldStroke)" stroke-width="1.3"/>
    <rect x="15" y="6" width="4" height="7" fill="url(#goldGrad)" fill-opacity="0.14" stroke="url(#goldStroke)" stroke-width="1.3"/>
    <rect x="10" y="4" width="4" height="9" fill="url(#goldGrad)" fill-opacity="0.18" stroke="url(#goldStroke)" stroke-width="1.4"/>
    <path d="M5 6h1v-2h1v2h1V4H5z" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1"/>
    <path d="M15 6h1v-2h1v2h1V4h-3z" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1"/>
    <path d="M10 4h1v-2h1v2h1V2h-3z" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1"/>
    <rect x="10" y="15" width="4" height="7" fill="url(#goldGrad)" fill-opacity="0.15" stroke="url(#goldStroke)" stroke-width="1.2"/>
    <path d="M3 22h18" stroke="url(#goldStroke)" stroke-width="1.3"/>
    <filter id="guildGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`,

  // ── 2. DRAGON — wyrm in profile ──
  dragon: `
    <path d="M4 16c0-5 3-9 7-9 2.5 0 4.5 1.5 5.5 4" stroke="url(#rubyGrad)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M16.5 11c1 1.5 1.5 3.5 1 5.5-1 4-5 6-9 5" stroke="url(#rubyGrad)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8 21c-2 0-4-1-4-3s2-3 4-2" stroke="url(#fireGrad)" stroke-width="1.4" fill="none"/>
    <circle cx="18" cy="8" r="2.5" fill="url(#rubyGrad)" fill-opacity="0.15" stroke="url(#rubyGrad)" stroke-width="1.3"/>
    <circle cx="18.8" cy="7.2" r="0.8" fill="url(#rubyGrad)" filter="url(#glowWarm)"/>
    <path d="M14 7c1-2 3-3 5-2.5" stroke="url(#rubyGrad)" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M15 5c0.5-2 2-2.5 3-2" stroke="url(#rubyGrad)" stroke-width="1.1" stroke-linecap="round" opacity="0.6"/>
    <path d="M4 16l-2 2 3-0.5" stroke="url(#fireGrad)" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M8 21l2 2" stroke="url(#fireGrad)" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>`,

  // ── 3. WOLF — snarling wolf head ──
  wolf: `
    <path d="M5 20c0-5 2-9 7-9s7 4 7 9" fill="url(#platinumGrad)" fill-opacity="0.08" stroke="url(#platinumGrad)" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M8 11c-1-2-2-4-3-6l4 3" fill="url(#platinumGrad)" fill-opacity="0.2" stroke="url(#platinumGrad)" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M16 11c1-2 2-4 3-6l-4 3" fill="url(#platinumGrad)" fill-opacity="0.2" stroke="url(#platinumGrad)" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="9" cy="14" r="1.4" fill="url(#sapphireGrad)" filter="url(#glow)"/>
    <circle cx="15" cy="14" r="1.4" fill="url(#sapphireGrad)" filter="url(#glow)"/>
    <path d="M10 18c0.7-0.7 2.6-0.7 3.3 0" stroke="url(#platinumGrad)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    <path d="M10.5 20l1-1.5 1 1.5" stroke="url(#rubyGrad)" stroke-width="1" stroke-linecap="round" fill="none"/>
    <path d="M12 16.5v-1" stroke="url(#platinumGrad)" stroke-width="1.2" stroke-linecap="round"/>`,

  // ── 4. PHOENIX — rising fire bird ──
  phoenix: `
    <path d="M12 20c0-6 3-10 6-13-2 0-4 1-5 3V6c-2 2-2 6-1 9-1-1-2-2-2-4-1 2-1 5 0 7-1-1-1-2-1-3-1 3 0 5 1 7z" fill="url(#fireGrad)" fill-opacity="0.2" stroke="url(#fireGrad)" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M12 20c0-6-3-10-6-13 2 0 4 1 5 3" fill="url(#fireGrad)" fill-opacity="0.12" stroke="url(#fireGrad)" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="12" cy="18" r="2" fill="url(#goldGrad)" fill-opacity="0.3" filter="url(#glowGold)"/>
    <path d="M10 4c1-2 3-2 4 0" stroke="url(#goldStroke)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M8 7c0-2 1.5-3 2.5-2" stroke="url(#fireGrad)" stroke-width="1.1" fill="none" opacity="0.7"/>
    <path d="M16 7c0-2-1.5-3-2.5-2" stroke="url(#fireGrad)" stroke-width="1.1" fill="none" opacity="0.7"/>`,

  // ── 5. HAWK — falcon in dive ──
  hawk: `
    <path d="M12 4l-8 10 4-1-3 8 7-9-3 0 5-8z" fill="url(#sapphireGrad)" fill-opacity="0.15" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M16 6l4 8-4-1 3 8-5-9 3 0-4-7z" fill="url(#sapphireGrad)" fill-opacity="0.10" stroke="url(#cyanGrad)" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="12" cy="6" r="1.5" fill="url(#goldGrad)" filter="url(#glowGold)"/>
    <path d="M10 14l2 4 2-4" stroke="url(#cyanGrad)" stroke-width="1.2" stroke-linejoin="round" fill="none"/>`,

  // ── 6. INFERNO — triple flame ──
  inferno: `
    <path d="M12 21c0-4 2-8 4-10-1 0-2 0.5-2.5 2 0-3-1.5-7-3.5-9 0 3-1 5-2 7-0.5-1-0.5-2-0.5-3.5-2 3-2 7 0 10-1-0.5-1.5-2-1.5-3.5-1 2-1 5 0 7h6z" fill="url(#fireGrad)" fill-opacity="0.25" stroke="url(#fireGrad)" stroke-width="1.4" stroke-linejoin="round" filter="url(#glowWarm)"/>
    <circle cx="12" cy="18" r="2.5" fill="url(#goldGrad)" fill-opacity="0.4" filter="url(#glowGold)"/>`,

  // ── 7. DIAMOND — faceted gem ──
  diamond: `
    <polygon points="12,3 20,10 12,21 4,10" fill="url(#sapphireGrad)" fill-opacity="0.15" stroke="url(#sapphireGrad)" stroke-width="1.5" filter="url(#gemShine)"/>
    <polygon points="12,3 20,10 12,9 4,10" fill="url(#sapphireGrad)" fill-opacity="0.25" stroke="url(#cyanGrad)" stroke-width="1"/>
    <polygon points="12,9 20,10 12,21" fill="url(#sapphireGrad)" fill-opacity="0.08"/>
    <polygon points="12,9 4,10 12,21" fill="url(#platinumGrad)" fill-opacity="0.08"/>
    <path d="M4 10l8-1 8 1" stroke="url(#cyanGrad)" stroke-width="1"/>
    <path d="M9 5.5l3 3.5 3-3.5" stroke="url(#platinumGrad)" stroke-width="1" fill="none" opacity="0.6"/>`,

  // ── 8. SKULL CROWN — crowned skull ──
  skull_crown: `
    <path d="M8 14v-2a4 4 0 018 0v2" stroke="url(#rubyGrad)" stroke-width="1.4" fill="none"/>
    <rect x="7" y="14" width="10" height="6" rx="0" stroke="url(#rubyGrad)" stroke-width="1.3" fill="url(#rubyGrad)" fill-opacity="0.08"/>
    <circle cx="10" cy="12" r="1.3" fill="url(#rubyGrad)" opacity="0.9"/>
    <circle cx="14" cy="12" r="1.3" fill="url(#rubyGrad)" opacity="0.9"/>
    <path d="M10 17v3M12 16v4M14 17v3" stroke="url(#rubyGrad)" stroke-width="1.1"/>
    <path d="M7 8l1 3M12 6v3M17 8l-1 3" stroke="url(#goldStroke)" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M5 7l2 1M12 4l0 1M19 7l-2 1M7 8h10" stroke="url(#goldStroke)" stroke-width="1.1" fill="none"/>`,

  // ── 9. TOWER SHIELD — kite shield with emblem ──
  tower_shield: `
    <path d="M12 3l8 3v7c0 5-4 9-8 10C8 22 4 18 4 13V6z" fill="url(#shieldGrad)" fill-opacity="0.9" stroke="url(#goldStroke)" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M12 5l6 2.5v6c0 3.5-3 6.5-6 7.5-3-1-6-4-6-7.5v-6z" fill="url(#sapphireGrad)" fill-opacity="0.12" stroke="url(#goldStroke)" stroke-width="1" opacity="0.6"/>
    <path d="M12 9v8M8 13h8" stroke="url(#goldGrad)" stroke-width="1.4" stroke-linecap="round" filter="url(#glowGold)"/>`,

  // ── 10. CROSSED SWORDS — dueling blades ──
  crossed_swords: `
    <path d="M5 5l14 14" stroke="url(#platinumGrad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 5L5 19" stroke="url(#platinumGrad)" stroke-width="2" stroke-linecap="round"/>
    <rect x="3" y="3" width="3" height="3" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1" transform="rotate(45 4.5 4.5)"/>
    <rect x="18" y="3" width="3" height="3" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1" transform="rotate(45 19.5 4.5)"/>
    <circle cx="12" cy="12" r="2.5" fill="url(#rubyGrad)" fill-opacity="0.3" stroke="url(#rubyGrad)" stroke-width="1.2" filter="url(#glowWarm)"/>`,

  // ── 11. LION — rampant lion head ──
  lion: `
    <circle cx="12" cy="13" r="5.5" fill="url(#goldGrad)" fill-opacity="0.12" stroke="url(#goldStroke)" stroke-width="1.4"/>
    <path d="M8 10c-1-3 0-6 2-7 0 2 1 3 2 3s2-1 2-3c2 1 3 4 2 7" fill="url(#goldGrad)" fill-opacity="0.2" stroke="url(#goldGrad)" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="10" cy="13" r="1.1" fill="url(#goldGrad)" opacity="0.9"/>
    <circle cx="14" cy="13" r="1.1" fill="url(#goldGrad)" opacity="0.9"/>
    <path d="M10 16c0.7 0.8 2.6 0.8 3.3 0" stroke="url(#goldStroke)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M12 17v1" stroke="url(#goldStroke)" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M6 13c-2 0-3-1-3-3" stroke="url(#goldGrad)" stroke-width="1.1" fill="none" opacity="0.5"/>
    <path d="M18 13c2 0 3-1 3-3" stroke="url(#goldGrad)" stroke-width="1.1" fill="none" opacity="0.5"/>`,

  // ── 12. ANCIENT AXE — war axe with runes ──
  ancient_axe: `
    <path d="M14 5c2-1 5 0 5 3s-3 4-5 3" fill="url(#platinumGrad)" fill-opacity="0.15" stroke="url(#platinumGrad)" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M14 8c0 4-4 8-4 14" stroke="url(#orangeGrad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 5c-2-1-5 0-5 3s3 4 5 3" fill="url(#platinumGrad)" fill-opacity="0.1" stroke="url(#platinumGrad)" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M12 10h2M11 12h3" stroke="url(#cyanGrad)" stroke-width="1" opacity="0.6"/>`,

  // ── 13. TRIDENT — three-pronged spear ──
  trident: `
    <path d="M12 4v16" stroke="url(#sapphireGrad)" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M8 8V4l2 3" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
    <path d="M16 8V4l-2 3" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
    <path d="M12 8V4" stroke="url(#cyanGrad)" stroke-width="1.4"/>
    <path d="M8 12v-4" stroke="url(#cyanGrad)" stroke-width="1.3"/>
    <path d="M16 12v-4" stroke="url(#cyanGrad)" stroke-width="1.3"/>
    <ellipse cx="12" cy="19" rx="3" ry="1.5" fill="url(#sapphireGrad)" fill-opacity="0.25" stroke="url(#sapphireGrad)" stroke-width="1"/>`,

  // ── 14. ECLIPSE — sun behind moon ──
  eclipse: `
    <circle cx="12" cy="12" r="8" fill="url(#goldGrad)" fill-opacity="0.15" stroke="url(#goldStroke)" stroke-width="1.4" filter="url(#glowGold)"/>
    <circle cx="14.5" cy="10" r="6" fill="#010a0f" stroke="url(#amethystGrad)" stroke-width="1.4"/>
    <path d="M12 4c-4 0.5-7 4-7 8s3 7.5 7 8" stroke="url(#goldGrad)" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.7"/>`,

  // ── 15. CROWN OF THORNS — thorned crown ──
  thorn_crown: `
    <path d="M4 16l2-6 2 4 2-7 2 6 2-6 2 7 2-4 2 6" stroke="url(#goldGrad)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#glowGold)"/>
    <path d="M4 16h16" stroke="url(#goldStroke)" stroke-width="1.3"/>
    <path d="M4 20h16" stroke="url(#goldStroke)" stroke-width="1.3"/>
    <path d="M4 16v4M20 16v4" stroke="url(#goldStroke)" stroke-width="1.3"/>`,

  // ── 16. RUNE STONE — ancient carved stone ──
  rune_stone: `
    <rect x="5" y="4" width="14" height="17" rx="2" fill="url(#amethystGrad)" fill-opacity="0.10" stroke="url(#amethystGrad)" stroke-width="1.4"/>
    <path d="M9 8l3 8 3-8" stroke="url(#cyanGrad)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M8 12h8" stroke="url(#cyanGrad)" stroke-width="1.2"/>
    <path d="M9 16h2M13 16h2" stroke="url(#amethystGrad)" stroke-width="1.1" opacity="0.7"/>
    <path d="M5 8h2M17 8h2" stroke="url(#amethystGrad)" stroke-width="1" opacity="0.4"/>`,

  // ── 17. THUNDER HAMMER — war hammer with lightning ──
  thunder_hammer: `
    <rect x="9" y="3" width="6" height="9" rx="1" fill="url(#platinumGrad)" fill-opacity="0.15" stroke="url(#platinumGrad)" stroke-width="1.5"/>
    <path d="M12 12v9" stroke="url(#orangeGrad)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M12 5l-2.5 3.5h2l-2 4 5-5.5H13z" fill="url(#lightningGrad)" fill-opacity="0.7" stroke="url(#lightningGrad)" stroke-width="0.8" filter="url(#glowGold)"/>`,

  // ── 18. CELESTIAL EYE — all-seeing eye with stars ──
  celestial_eye: `
    <ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="url(#purpleGrad)" stroke-width="1.4" filter="url(#glowPurple)"/>
    <circle cx="12" cy="12" r="3.5" fill="url(#amethystGrad)" fill-opacity="0.2" stroke="url(#amethystGrad)" stroke-width="1.3"/>
    <circle cx="12" cy="12" r="1.5" fill="url(#purpleGrad)" filter="url(#glowPurple)"/>
    <path d="M5 8l1.5-2M19 8l-1.5-2M12 4v2M4 12H2M22 12h-2" stroke="url(#purpleGrad)" stroke-width="1" opacity="0.6" stroke-linecap="round"/>
    <circle cx="5" cy="6" r="0.8" fill="url(#amethystGrad)" opacity="0.7"/>
    <circle cx="19" cy="6" r="0.8" fill="url(#amethystGrad)" opacity="0.7"/>`,

  // ── 19. KRAKEN — tentacled sea beast ──
  kraken: `
    <circle cx="12" cy="10" r="4" fill="url(#sapphireGrad)" fill-opacity="0.15" stroke="url(#cyanGrad)" stroke-width="1.4"/>
    <circle cx="10.5" cy="9" r="1" fill="url(#cyanGrad)" opacity="0.9"/>
    <circle cx="13.5" cy="9" r="1" fill="url(#cyanGrad)" opacity="0.9"/>
    <path d="M8 14c-1 2-2 5-1 7" stroke="url(#sapphireGrad)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
    <path d="M12 14v7" stroke="url(#sapphireGrad)" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M16 14c1 2 2 5 1 7" stroke="url(#sapphireGrad)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
    <path d="M9 14c-2 1-4 3-4 6" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.7" fill="none"/>
    <path d="M15 14c2 1 4 3 4 6" stroke="url(#cyanGrad)" stroke-width="1.1" opacity="0.7" fill="none"/>
    <path d="M8 14c0-3 1.5-5 4-4s5 3 4 4" stroke="url(#cyanGrad)" stroke-width="1.2" fill="none"/>`,

  // ── 20. VORTEX STAR — swirling star of power ──
  vortex_star: `
    <polygon points="12,2 14.5,9 21,9 15.5,13.5 17.5,21 12,16.5 6.5,21 8.5,13.5 3,9 9.5,9"
      fill="url(#amethystGrad)" fill-opacity="0.18" stroke="url(#purpleGrad)" stroke-width="1.4"
      stroke-linejoin="round" filter="url(#glowPurple)"/>
    <circle cx="12" cy="12" r="3" fill="url(#amethystGrad)" fill-opacity="0.4" stroke="url(#purpleGrad)" stroke-width="1.1"/>
    <path d="M12 9v1.5M12 13.5V15M9 12h1.5M13.5 12H15" stroke="url(#purpleGrad)" stroke-width="1" opacity="0.7"/>`,
}

// Helper — render a guild icon at given px size
export function getGuildIcon(key, size = 40) {
  const content = GUILD_ICONS[key]
  if (!content) return ''
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true" class="nx-icon">${content}</svg>`
}

// Ordered list of all guild icon keys
export const GUILD_ICON_KEYS = Object.keys(GUILD_ICONS)


// ============================================================
// STICKER ICONS — chat stickers (sold in shop, category: 'sticker')
// แยกอ็อบเจกต์ของตัวเองโดยสมบูรณ์ ไม่ไปรวมกับ ICONS/getIcon() เลย
// เพื่อไม่ให้ key ชนกับไอคอนปุ่มทั่วไป (เช่น crown/fire/wave ที่มีอยู่แล้ว)
// ทุกเส้นเป็นภาพวาดใหม่ทั้งหมด ไม่ได้นำ path จากไอคอนอื่นมาใช้ซ้ำ
// viewBox ใหญ่กว่าไอคอนทั่วไป (32x32) เพราะโชว์ในแชทขนาดใหญ่กว่ามาก
// ── PACK: Meme Sticker Pack (pack_id: meme_v1) ──
// ============================================================
export const STICKER_ICONS = {

  // 1. หัวเราะลั่นจนน้ำตาไหล
  meme_laugh: `
    <circle cx="16" cy="16" r="13" fill="url(#goldGrad)" fill-opacity="0.1" stroke="url(#goldStroke)" stroke-width="1.6"/>
    <path d="M9 13c1-2.2 3.2-2.2 4.2 0M18.8 13c1-2.2 3.2-2.2 4.2 0" stroke="url(#goldStroke)" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M8.5 19c2 3.4 5 5.2 7.5 5.2s5.5-1.8 7.5-5.2" fill="url(#fireGrad)" fill-opacity="0.22" stroke="url(#goldStroke)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 22.5v2.5M16 23.5v3M20 22.5v2.5" stroke="#1a1200" stroke-width="1.1" opacity="0.4"/>
    <path d="M5.5 10.5l2 3.5M26.5 10.5l-2 3.5" stroke="url(#cyanGrad)" stroke-width="1.4" stroke-linecap="round" opacity="0.85" filter="url(#glow)"/>
  `,

  // 2. ไฟลุก / โดนใจมาก
  meme_fire: `
    <path d="M16 28.5c-5.3 0-9.5-3.7-9.5-9 0-3.2 1.1-5.9 3.7-8.5-0.3 2 0.4 3.3 0.4 3.3s0.6-5.3 4.2-8.4c1 4.2 3.6 6.3 3.6 6.3s2.1-2.1 1.1-4.7c4.2 3.7 4.8 6.9 4.8 9.5 0 5.3-4.2 10-8.3 10z"
      fill="url(#fireGrad)" fill-opacity="0.28" stroke="url(#fireGrad)" stroke-width="1.6" stroke-linejoin="round" filter="url(#glowWarm)"/>
    <path d="M16 24.5c-2.1 0-3.7-1.6-3.7-3.7 0-1.1 0.4-2.1 1.2-3 0 1.4 0.7 2.2 0.7 2.2s0.3-1.7 1.2-2.7c0.3 1.4 1.2 2.2 1.2 2.2s1.1-0.8 0.6-1.9c1.9 1.4 2.4 2.6 2.4 4 0 2.1-1.6 3.9-3.6 3.9z"
      fill="url(#goldGrad)" fill-opacity="0.55"/>
  `,

  // 3. ปรบมือ
  meme_clap: `
    <path d="M9 19l3.6-9.3c0.4-1.1 2.1-0.8 2 0.4l-0.7 6.4" stroke="url(#cyanGrad)" stroke-width="1.6" fill="url(#cyanGrad)" fill-opacity="0.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 19l-3.6-9.3c-0.4-1.1-2.1-0.8-2 0.4l0.7 6.4" stroke="url(#cyanGrad)" stroke-width="1.6" fill="url(#cyanGrad)" fill-opacity="0.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 18.5c-0.4 4.3 2.8 7 7 7s7.4-2.7 7-7" stroke="url(#cyanGrad)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M16 5.5v-3M11 7.5l-2.3-2.3M21 7.5l2.3-2.3M9 11l-3-1M23 11l3-1" stroke="url(#lightningGrad)" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>
  `,

  // 4. ร้องไห้หนักมาก
  meme_cry: `
    <circle cx="16" cy="13.5" r="8.7" fill="url(#sapphireGrad)" fill-opacity="0.08" stroke="url(#cyanGrad)" stroke-width="1.5"/>
    <path d="M11.3 11.5c0.5-1.1 2.2-1.1 2.7 0M18 11.5c0.5-1.1 2.2-1.1 2.7 0" stroke="url(#cyanGrad)" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M12 17.5c1.3 1.4 2.7 2.1 4 2.1s2.7-0.7 4-2.1" stroke="url(#cyanGrad)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path d="M11 15.5c-1.3 3.5-2 8-1.4 13.5M21 15.5c1.3 3.5 2 8 1.4 13.5" stroke="url(#sapphireGrad)" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="9" cy="22" r="0.9" fill="url(#cyanGrad)" opacity="0.7"/>
    <circle cx="23" cy="24.5" r="0.9" fill="url(#cyanGrad)" opacity="0.7"/>
  `,

  // 5. อึ้ง / มโนกระเจิง
  meme_mindblown: `
    <circle cx="16" cy="19" r="6.8" fill="url(#platinumGrad)" fill-opacity="0.1" stroke="url(#platinumGrad)" stroke-width="1.5"/>
    <circle cx="13.6" cy="18" r="1.1" fill="url(#platinumGrad)"/>
    <circle cx="18.4" cy="18" r="1.1" fill="url(#platinumGrad)"/>
    <ellipse cx="16" cy="22.2" rx="2.1" ry="1.3" fill="url(#platinumGrad)" opacity="0.55"/>
    <path d="M16 9.5v-4M10.8 10.7l-3-3.2M21.2 10.7l3-3.2M8.5 15l-4.3-1.1M23.5 15l4.3-1.1" stroke="url(#fireGrad)" stroke-width="1.7" stroke-linecap="round" filter="url(#glowWarm)"/>
    <circle cx="16" cy="5" r="1.4" fill="url(#fireGrad)"/>
    <circle cx="7" cy="13" r="1" fill="url(#goldGrad)"/>
    <circle cx="25" cy="13" r="1" fill="url(#goldGrad)"/>
  `,

  // 6. ใจสลาย
  meme_heartbreak: `
    <path d="M16 26.5C6.8 19 4.6 12.4 8.8 8.2c2.6-2.6 6.3-1.5 7.2 1 0.9-2.5 4.6-3.6 7.2-1 4.2 4.2 2 10.8-7.2 18.3z"
      fill="url(#rubyGrad)" fill-opacity="0.14" stroke="url(#rubyGrad)" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M16.5 8.5l-2.2 5.5 3.4 2.3-2.4 5.7" stroke="#0a0800" stroke-width="2.6" stroke-linejoin="round" fill="none"/>
    <path d="M16.5 8.5l-2.2 5.5 3.4 2.3-2.4 5.7" stroke="url(#platinumGrad)" stroke-width="1.1" stroke-linejoin="round" fill="none"/>
  `,

  // 7. ทักทาย / สวัสดี (โบกมือ — ดีไซน์ใหม่ ไม่ใช้ path เดียวกับไอคอน wave เดิม)
  meme_hi: `
    <path d="M19.5 22.5v-7c0-1.1 0.9-2 2-2s2 0.9 2 2v6.5c0 3.3-2.2 6-5.9 6h-3.3c-2.2 0-4-1.1-5-2.8l-3.2-5c-0.7-1.1 0.2-2.5 1.5-2.2 0.9 0.2 1.6 0.9 2 1.7l1.4 2.3"
      stroke="url(#cyanGrad)" stroke-width="1.5" fill="url(#cyanGrad)" fill-opacity="0.08" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.8 21v-9c0-1.1 0.9-2 2-2s2 0.9 2 2v8.5" stroke="url(#cyanGrad)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M12 21v-7.5c0-1.1 0.9-2 2-2s2 0.9 2 2v7" stroke="url(#cyanGrad)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M9.5 9c-1.8 1.7-1.8 4.6 0 6.3M24.5 9c1.8 1.7 1.8 4.6 0 6.3M8 4.7c-3 2.8-3 7.5 0 10.3M26 4.7c3 2.8 3 7.5 0 10.3"
      stroke="url(#lightningGrad)" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>
  `,

  // 8. โอเค (สัญลักษณ์มือ OK)
  meme_ok: `
    <circle cx="12.5" cy="11" r="3.3" fill="none" stroke="url(#goldStroke)" stroke-width="1.6"/>
    <path d="M15.6 8.7c1.6-1 3.2 0.1 3.1 1.7M16.1 12.4c1.6 1 3.5 0.2 3.7-1.5" stroke="url(#goldStroke)" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.75"/>
    <path d="M10.5 23v-6.3c0-1.1 0.9-2 2-2s2 0.9 2 2v0.3M14.5 23v-7.3c0-1.1 0.9-2 2-2s2 0.9 2 2v6.8M18.5 23v-6.3c0-1.1 0.9-2 2-2s2 0.9 2 2v7.3c0 3.3-2.2 6-5.9 6h-4.2c-2.2 0-4.1-1.3-5-3.2l-2.2-4.8c-0.6-1.3 0.7-2.6 2-2 0.9 0.4 1.5 1.1 1.9 2l1.3 2.3"
      stroke="url(#goldGrad)" stroke-width="1.5" fill="url(#goldGrad)" fill-opacity="0.07" stroke-linecap="round" stroke-linejoin="round"/>
  `,

  // 9. GG (ถ้วยแชมป์)
  meme_gg: `
    <path d="M10.5 6h11v6.3c0 3.2-2.2 5.4-5.5 5.4s-5.5-2.2-5.5-5.4z" fill="url(#goldGrad)" fill-opacity="0.18" stroke="url(#goldStroke)" stroke-width="1.6"/>
    <path d="M10.5 8.3H6.8c0 3.2 1.6 5.3 4.3 5.6M21.5 8.3h3.7c0 3.2-1.6 5.3-4.3 5.6" stroke="url(#goldStroke)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <rect x="14" y="17.7" width="4" height="4.3" fill="url(#goldGrad)" stroke="url(#goldStroke)" stroke-width="1.2"/>
    <path d="M8.5 26.5l1.7-3.2h11.6l1.7 3.2z" fill="url(#goldGrad)" fill-opacity="0.22" stroke="url(#goldStroke)" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="16" cy="10" r="2.1" fill="url(#goldGrad)" filter="url(#glowGold)"/>
  `,

  // 10. ชนะ / เก่งมาก (เหรียญรางวัล)
  meme_win: `
    <circle cx="16" cy="12.5" r="6.8" fill="url(#goldGrad)" fill-opacity="0.18" stroke="url(#goldStroke)" stroke-width="1.6" filter="url(#glowGold)"/>
    <polygon points="16,7.7 17.5,11.1 21.2,11.5 18.5,14 19.2,17.7 16,15.8 12.8,17.7 13.5,14 10.8,11.5 14.5,11.1"
      fill="url(#goldGrad)" fill-opacity="0.5" stroke="url(#goldStroke)" stroke-width="1"/>
    <path d="M12.3 18.3l-3 9.2 4.9-2 2 4 3-7.3M19.7 18.3l3 9.2-4.9-2-2 4-3-7.3"
      stroke="url(#rubyGrad)" stroke-width="1.5" fill="url(#rubyGrad)" fill-opacity="0.13" stroke-linejoin="round"/>
  `,
}

// Helper — render a sticker at given px size (default 80, used much bigger than UI icons)
export function getStickerIcon(key, size = 80) {
  const content = STICKER_ICONS[key]
  if (!content) return ''
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true" class="nx-sticker">${content}</svg>`
}

// Ordered list of all sticker keys (used to render the sticker picker grid)
export const STICKER_ICON_KEYS = Object.keys(STICKER_ICONS)


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

  // ── New icon set v3.1 — explicit map ──
  city_war:         SYSTEM_ICONS.city_war,
  city_tournament:  SYSTEM_ICONS.city_tournament,
  neighborhood:     SYSTEM_ICONS.neighborhood,
  contributors:     SYSTEM_ICONS.contributors,
  city_buff:        SYSTEM_ICONS.city_buff,
  podium:           SYSTEM_ICONS.podium,
  global_rank:      SYSTEM_ICONS.global_rank,
  city_rank_lb:     SYSTEM_ICONS.city_rank_lb,
  guild_rank:       SYSTEM_ICONS.guild_rank,
  medal_gold:       SYSTEM_ICONS.medal_gold,
  medal_silver:     SYSTEM_ICONS.medal_silver,
  medal_bronze:     SYSTEM_ICONS.medal_bronze,
  inbox:            SYSTEM_ICONS.inbox,
  send_msg:         SYSTEM_ICONS.send_msg,
  emoji:            SYSTEM_ICONS.emoji,
  sticker:          SYSTEM_ICONS.sticker,
  attach:           SYSTEM_ICONS.attach,
  mic:              SYSTEM_ICONS.mic,
  read_receipt:     SYSTEM_ICONS.read_receipt,
  chevron_left:     SYSTEM_ICONS.chevron_left,
  voice_play:       SYSTEM_ICONS.voice_play,
  duel:             SYSTEM_ICONS.duel,
  guildwar:         SYSTEM_ICONS.guildwar,
  tournament:       SYSTEM_ICONS.tournament,
  bracket:          SYSTEM_ICONS.bracket,
  history:          SYSTEM_ICONS.history,
  challenge:        SYSTEM_ICONS.challenge,
  win:              SYSTEM_ICONS.win,
  loss:             SYSTEM_ICONS.loss,
  pvp_rank:         SYSTEM_ICONS.pvp_rank,
  manage:           SYSTEM_ICONS.manage,
  officer_badge:    SYSTEM_ICONS.officer_badge,
  kick:             SYSTEM_ICONS.kick,
  promote:          SYSTEM_ICONS.promote,
  demote:           SYSTEM_ICONS.demote,
  follow:           SYSTEM_ICONS.follow,
  unfollow:         SYSTEM_ICONS.unfollow,
  suggest:          SYSTEM_ICONS.suggest,
  filter:           SYSTEM_ICONS.filter,
  sort:             SYSTEM_ICONS.sort,
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
