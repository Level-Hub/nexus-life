/**
 * nexus-effects.js — NEXUS LIFE Visual Effects Module
 * ────────────────────────────────────────────────────
 * ใช้งาน: import { showQuestComplete, showLevelUp, stampCanvasWithGPS } from './nexus-effects.js'
 *
 * ฟังก์ชันทั้งหมด:
 *   showQuestComplete({ questTitle, xp, gold, statType, statPoints, passBonus, passType })
 *   showLevelUp({ oldLevel, newLevel, newTitle })
 *   showTitleUnlock({ titleName, titleDesc })
 *   stampCanvasWithGPS(canvas, username)  → Promise<canvas>
 */

// ─────────────────────────────────────────
//  INJECT STYLES (ครั้งเดียว)
// ─────────────────────────────────────────
;(function injectStyles() {
  if (document.getElementById('nexus-effects-css')) return
  const style = document.createElement('style')
  style.id = 'nexus-effects-css'
  style.textContent = `
/* ══════════════════════════════════════════
   NEXUS EFFECTS — QUEST COMPLETE SCREEN
══════════════════════════════════════════ */
#nexus-qc-overlay {
  position: fixed; inset: 0; z-index: 99000;
  background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
  transition: background 0.35s ease;
}
#nexus-qc-overlay.visible {
  background: rgba(0,10,15,0.92);
  pointer-events: all;
}

/* scan-line sweep */
#nexus-qc-overlay::before {
  content:'';
  position:absolute; inset:0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0,245,255,0.015) 3px,
    rgba(0,245,255,0.015) 4px
  );
  pointer-events:none;
}

.nqc-panel {
  position: relative;
  width: min(520px, 90vw);
  background: #010a0f;
  border: 1px solid rgba(0,245,255,0.35);
  padding: 0;
  overflow: hidden;
  transform: scale(0.82) translateY(40px);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
}
#nexus-qc-overlay.visible .nqc-panel {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* corner brackets */
.nqc-panel::before {
  content:''; position:absolute; top:-1px; left:-1px;
  width:20px; height:20px;
  border-top:2px solid #00f5ff; border-left:2px solid #00f5ff;
}
.nqc-panel::after {
  content:''; position:absolute; bottom:-1px; right:-1px;
  width:20px; height:20px;
  border-bottom:2px solid #00f5ff; border-right:2px solid #00f5ff;
}

/* top bar */
.nqc-topbar {
  background: rgba(0,245,255,0.06);
  border-bottom: 1px solid rgba(0,245,255,0.18);
  padding: 10px 20px;
  display: flex; align-items: center; gap: 8px;
  font-family: 'Orbitron', monospace;
  font-size: 9px; letter-spacing: 3px;
  color: rgba(0,245,255,0.6);
}
.nqc-topbar-dot {
  width:6px; height:6px; border-radius:50%;
  background:#00f5ff;
  animation: nqcDotPulse 1s ease-in-out infinite;
}
@keyframes nqcDotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }

/* hero area */
.nqc-hero {
  padding: 36px 28px 20px;
  text-align: center;
  position: relative;
}

/* particle container */
.nqc-particles {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
}
.nqc-particle {
  position: absolute;
  width: 4px; height: 4px; border-radius: 50%;
  background: #00f5ff;
  animation: nqcParticleFly var(--dur,1.4s) ease-out var(--delay,0s) forwards;
  opacity: 0;
}
@keyframes nqcParticleFly {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx,0px), var(--ty,-120px)) scale(0); opacity: 0; }
}

/* success icon ring */
.nqc-icon-wrap {
  width: 80px; height: 80px;
  margin: 0 auto 20px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}
.nqc-icon-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid rgba(0,245,255,0.3);
  animation: nqcRingExpand 0.6s 0.3s ease-out both;
}
@keyframes nqcRingExpand {
  from { transform:scale(0.4); opacity:0; }
  to   { transform:scale(1);   opacity:1; }
}
.nqc-icon-ring-2 {
  position: absolute; inset: -8px; border-radius: 50%;
  border: 1px solid rgba(0,245,255,0.15);
  animation: nqcRingExpand 0.7s 0.4s ease-out both;
}
.nqc-icon-svg {
  width: 40px; height: 40px;
  animation: nqcIconPop 0.5s 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
  color: #00f5ff;
  filter: drop-shadow(0 0 12px rgba(0,245,255,0.8));
}
@keyframes nqcIconPop {
  from { transform: scale(0) rotate(-20deg); opacity:0; }
  to   { transform: scale(1) rotate(0deg);   opacity:1; }
}

.nqc-label {
  font-family: 'Orbitron', monospace;
  font-size: 9px; letter-spacing: 4px;
  color: rgba(0,245,255,0.6);
  margin-bottom: 8px;
  animation: nqcFadeUp 0.4s 0.4s ease both;
}
.nqc-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 900; color: #fff;
  line-height: 1.3;
  margin-bottom: 24px;
  animation: nqcFadeUp 0.4s 0.5s ease both;
}
@keyframes nqcFadeUp {
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
}

/* reward row */
.nqc-rewards {
  display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
  margin-bottom: 24px;
  animation: nqcFadeUp 0.4s 0.6s ease both;
}
.nqc-reward-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px;
  background: rgba(0,245,255,0.06);
  border: 1px solid rgba(0,245,255,0.25);
  font-family: 'Orbitron', monospace;
  font-size: 13px; font-weight: 900;
  color: #00f5ff;
  position: relative; overflow: hidden;
}
.nqc-reward-chip.gold-chip { color: #ffd700; border-color: rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); }
.nqc-reward-chip.stat-chip { color: #ff66aa; border-color: rgba(255,102,170,0.3); background: rgba(255,102,170,0.05); }
.nqc-reward-chip::before {
  content: '';
  position: absolute; left: -100%; top: 0; bottom: 0; width: 60%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  animation: nqcChipShine 1.2s 0.8s ease forwards;
}
@keyframes nqcChipShine { to { left: 200%; } }

/* counter number */
.nqc-xp-num {
  display: inline-block;
  animation: nqcCountUp 0.8s 0.7s ease both;
}

/* pass bonus badge */
.nqc-pass-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 14px;
  background: linear-gradient(135deg, rgba(255,170,0,0.15), rgba(255,215,0,0.08));
  border: 1px solid rgba(255,215,0,0.4);
  font-family: 'Orbitron', monospace;
  font-size: 9px; letter-spacing: 2px; color: #ffd700;
  margin-bottom: 20px;
  animation: nqcFadeUp 0.4s 0.65s ease both;
}

/* XP bar fill */
.nqc-xpbar-wrap {
  margin: 0 28px 24px;
  animation: nqcFadeUp 0.4s 0.75s ease both;
}
.nqc-xpbar-label {
  display: flex; justify-content: space-between;
  font-family: 'Orbitron', monospace;
  font-size: 8px; letter-spacing: 2px; color: rgba(0,245,255,0.5);
  margin-bottom: 6px;
}
.nqc-xpbar-track {
  height: 4px; background: rgba(0,245,255,0.08); overflow: hidden;
}
.nqc-xpbar-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(0,245,255,0.6), #00f5ff);
  width: 0%;
  transition: width 1s 1s cubic-bezier(0.22,1,0.36,1);
  box-shadow: 0 0 8px rgba(0,245,255,0.6);
}

/* close btn */
.nqc-close-btn {
  display: block; width: calc(100% - 56px);
  margin: 0 28px 28px;
  padding: 14px;
  background: rgba(0,245,255,0.08);
  border: 1px solid rgba(0,245,255,0.3);
  color: #00f5ff;
  font-family: 'Orbitron', monospace;
  font-size: 11px; letter-spacing: 3px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  animation: nqcFadeUp 0.4s 0.9s ease both;
  clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
}
.nqc-close-btn:hover {
  background: rgba(0,245,255,0.15);
  box-shadow: 0 0 20px rgba(0,245,255,0.2);
}

/* ══════════════════════════════════════════
   NEXUS EFFECTS — LEVEL UP SCREEN
══════════════════════════════════════════ */
#nexus-lu-overlay {
  position: fixed; inset: 0; z-index: 99100;
  background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
  transition: background 0.4s ease;
}
#nexus-lu-overlay.visible {
  background: rgba(0,5,10,0.96);
  pointer-events: all;
}

.nlu-panel {
  position: relative;
  width: min(480px, 88vw);
  text-align: center;
  padding: 0;
  transform: scale(0.7);
  opacity: 0;
  transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
}
#nexus-lu-overlay.visible .nlu-panel {
  transform: scale(1);
  opacity: 1;
}

/* burst rays */
.nlu-rays {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  pointer-events: none;
}
.nlu-ray {
  position: absolute;
  width: 2px;
  background: linear-gradient(to top, rgba(0,245,255,0.6), transparent);
  transform-origin: 50% 100%;
  bottom: 0; left: -1px;
  border-radius: 1px;
  animation: nluRayShoot 0.8s 0.3s ease-out both;
}
@keyframes nluRayShoot {
  from { height: 0; opacity: 0.8; }
  to   { height: var(--len, 200px); opacity: 0; }
}

/* level number */
.nlu-old-level {
  font-family: 'Orbitron', monospace;
  font-size: 11px; letter-spacing: 3px;
  color: rgba(0,245,255,0.4);
  margin-bottom: 8px;
  animation: nluFade 0.4s 0.2s ease both;
}
.nlu-arrow {
  font-size: 20px; color: rgba(0,245,255,0.5);
  animation: nluFade 0.4s 0.3s ease both;
  margin-bottom: 8px;
}
.nlu-label {
  font-family: 'Orbitron', monospace;
  font-size: 10px; letter-spacing: 5px;
  color: #00f5ff;
  margin-bottom: 16px;
  animation: nluFade 0.4s 0.2s ease both;
}
.nlu-level-num {
  font-family: 'Orbitron', monospace;
  font-size: clamp(72px, 18vw, 110px);
  font-weight: 900; line-height: 1;
  color: #fff;
  text-shadow: 0 0 60px rgba(0,245,255,0.5), 0 0 120px rgba(0,245,255,0.2);
  animation: nluNumPop 0.7s 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
  position: relative;
}
.nlu-level-num::after {
  content: attr(data-level);
  position: absolute; inset: 0;
  color: transparent;
  -webkit-text-stroke: 2px rgba(0,245,255,0.4);
  filter: blur(3px);
  z-index: -1;
}
@keyframes nluNumPop {
  from { transform: scale(0.4); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
.nlu-up-text {
  font-family: 'Orbitron', monospace;
  font-size: 14px; letter-spacing: 6px;
  color: #00f5ff; font-weight: 700;
  text-shadow: 0 0 20px rgba(0,245,255,0.6);
  margin-bottom: 6px;
  animation: nluFade 0.5s 0.6s ease both;
}
.nlu-title-text {
  font-family: 'Sarabun', sans-serif;
  font-size: 15px; color: rgba(255,255,255,0.7);
  margin-bottom: 40px;
  animation: nluFade 0.5s 0.7s ease both;
}
@keyframes nluFade {
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:translateY(0); }
}

.nlu-close-btn {
  padding: 14px 48px;
  background: transparent;
  border: 1px solid rgba(0,245,255,0.4);
  color: #00f5ff;
  font-family: 'Orbitron', monospace;
  font-size: 10px; letter-spacing: 3px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  animation: nluFade 0.4s 0.85s ease both;
  clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
}
.nlu-close-btn:hover {
  background: rgba(0,245,255,0.1);
  box-shadow: 0 0 24px rgba(0,245,255,0.25);
}

/* ring glow under number */
.nlu-glow-ring {
  width: 200px; height: 200px;
  border-radius: 50%;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse, rgba(0,245,255,0.12) 0%, transparent 70%);
  pointer-events: none;
  animation: nluGlowPulse 2s ease-in-out infinite;
}
@keyframes nluGlowPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }

/* ══════════════════════════════════════════
   NEXUS EFFECTS — TITLE UNLOCK
══════════════════════════════════════════ */
#nexus-title-toast {
  position: fixed;
  top: 24px; left: 50%; transform: translateX(-50%) translateY(-120px);
  z-index: 99200;
  background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,170,0,0.08));
  border: 1px solid rgba(255,215,0,0.5);
  padding: 14px 24px;
  display: flex; align-items: center; gap: 12px;
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  pointer-events: none;
  max-width: 90vw;
}
#nexus-title-toast.show {
  transform: translateX(-50%) translateY(0);
}
.ntt-icon { font-size: 20px; flex-shrink: 0; }
.ntt-label {
  font-family: 'Orbitron', monospace;
  font-size: 8px; letter-spacing: 3px; color: rgba(255,215,0,0.7);
}
.ntt-name {
  font-family: 'Orbitron', monospace;
  font-size: 14px; font-weight: 900; color: #ffd700;
  text-shadow: 0 0 12px rgba(255,215,0,0.6);
}
  `
  document.head.appendChild(style)
})()

// ─────────────────────────────────────────
//  HELPER: สร้าง overlay DOM (ครั้งเดียว)
// ─────────────────────────────────────────
function getOrCreate(id, html) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.innerHTML = html
    document.body.appendChild(el)
  }
  return el
}

// ─────────────────────────────────────────
//  HELPER: สร้าง particle burst
// ─────────────────────────────────────────
function spawnParticles(container, count = 18) {
  container.innerHTML = ''
  const colors = ['#00f5ff','#44ff88','#ffd700','#ff66aa','#ffffff']
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    p.className = 'nqc-particle'
    const angle = (i / count) * 360
    const dist = 60 + Math.random() * 80
    const rad = (angle * Math.PI) / 180
    const tx = Math.cos(rad) * dist
    const ty = Math.sin(rad) * dist - 30
    const dur = 0.8 + Math.random() * 0.6
    const delay = Math.random() * 0.3
    p.style.cssText = `
      --tx:${tx}px; --ty:${ty}px; --dur:${dur}s; --delay:${delay}s;
      background:${colors[i % colors.length]};
      top:50%; left:50%;
      width:${3 + Math.random() * 5}px;
      height:${3 + Math.random() * 5}px;
    `
    container.appendChild(p)
  }
}

// ─────────────────────────────────────────
//  HELPER: counter animation
// ─────────────────────────────────────────
function animateCount(el, target, duration = 800) {
  let start = null
  const step = (ts) => {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(ease * target)
    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = target
  }
  requestAnimationFrame(step)
}

// ─────────────────────────────────────────
//  PUBLIC: showQuestComplete
// ─────────────────────────────────────────
/**
 * @param {object} opts
 * @param {string}  opts.questTitle
 * @param {number}  opts.xp
 * @param {number}  [opts.gold]
 * @param {string}  [opts.statType]
 * @param {number}  [opts.statPoints]
 * @param {number}  [opts.passBonus]   - เช่น 2.0 (Premium) หรือ 1.5 (Standard)
 * @param {string}  [opts.passType]    - 'premium' | 'standard'
 * @param {number}  [opts.xpCurrent]  - XP ปัจจุบันหลัง quest (สำหรับ XP bar)
 * @param {number}  [opts.xpMax]      - XP สูงสุดของ level
 * @param {Function} [opts.onClose]
 */
export function showQuestComplete(opts = {}) {
  const {
    questTitle = 'QUEST COMPLETE',
    xp = 0, gold = 0,
    statType = null, statPoints = 0,
    passBonus = 1.0, passType = null,
    xpCurrent = 0, xpMax = 100,
    onClose = null
  } = opts

  const overlay = getOrCreate('nexus-qc-overlay', `
    <div class="nqc-panel">
      <div class="nqc-topbar">
        <div class="nqc-topbar-dot"></div>
        QUEST VERIFIED — REWARD DISPATCHED
      </div>
      <div class="nqc-hero">
        <div class="nqc-particles" id="nqcParticles"></div>
        <div class="nqc-icon-wrap">
          <div class="nqc-icon-ring"></div>
          <div class="nqc-icon-ring-2"></div>
          <svg class="nqc-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="nqc-label">// MISSION ACCOMPLISHED</div>
        <div class="nqc-title" id="nqcTitle"></div>
        <div class="nqc-rewards" id="nqcRewards"></div>
        <div id="nqcPassBadge" style="display:none;justify-content:center">
          <div class="nqc-pass-badge" id="nqcPassBadgeInner"></div>
        </div>
      </div>
      <div class="nqc-xpbar-wrap">
        <div class="nqc-xpbar-label">
          <span>XP PROGRESS</span>
          <span id="nqcXpLabel">0 / 0</span>
        </div>
        <div class="nqc-xpbar-track">
          <div class="nqc-xpbar-fill" id="nqcXpFill"></div>
        </div>
      </div>
      <button class="nqc-close-btn" id="nqcCloseBtn">CONTINUE →</button>
    </div>
  `)

  // inject content
  document.getElementById('nqcTitle').textContent = questTitle

  // rewards
  const rewardsEl = document.getElementById('nqcRewards')
  const xpNumEl = document.createElement('div')
  xpNumEl.className = 'nqc-reward-chip'
  xpNumEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polygon points="8,1 10,6 15,6 11,10 13,15 8,12 3,15 5,10 1,6 6,6" fill="#00f5ff"/></svg><span id="nqcXpNum">0</span> XP`
  rewardsEl.innerHTML = ''
  rewardsEl.appendChild(xpNumEl)
  if (gold > 0) {
    const goldChip = document.createElement('div')
    goldChip.className = 'nqc-reward-chip gold-chip'
    goldChip.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#ffd700" stroke-width="1.5"/><text x="8" y="12" text-anchor="middle" fill="#ffd700" font-size="8" font-family="monospace">G</text></svg>+${gold} GOLD`
    rewardsEl.appendChild(goldChip)
  }
  if (statType && statPoints > 0) {
    const statChip = document.createElement('div')
    statChip.className = 'nqc-reward-chip stat-chip'
    statChip.innerHTML = `+${statPoints} ${statType.toUpperCase()}`
    rewardsEl.appendChild(statChip)
  }

  // pass bonus
  const passBadgeWrap = document.getElementById('nqcPassBadge')
  const passBadgeInner = document.getElementById('nqcPassBadgeInner')
  if (passBonus > 1.0 && passType) {
    const label = passType === 'premium' ? '⭐ PREMIUM PASS · 2.0× XP BOOST' : '✦ STANDARD PASS · 1.5× XP BOOST'
    passBadgeInner.textContent = label
    passBadgeWrap.style.display = 'flex'
  } else {
    passBadgeWrap.style.display = 'none'
  }

  // XP bar
  const pct = xpMax > 0 ? Math.min(100, (xpCurrent / xpMax) * 100) : 0
  document.getElementById('nqcXpLabel').textContent = `${xpCurrent.toLocaleString()} / ${xpMax.toLocaleString()}`
  document.getElementById('nqcXpFill').style.width = '0%'

  // close handler
  const closeBtn = document.getElementById('nqcCloseBtn')
  const closeHandler = () => {
    overlay.classList.remove('visible')
    setTimeout(() => { overlay.style.display = 'none' }, 400)
    if (typeof onClose === 'function') onClose()
  }
  closeBtn.onclick = closeHandler
  overlay.onclick = (e) => { if (e.target === overlay) closeHandler() }

  // show
  overlay.style.display = 'flex'
  requestAnimationFrame(() => {
    overlay.classList.add('visible')
    spawnParticles(document.getElementById('nqcParticles'))
    // animate XP counter with delay
    setTimeout(() => animateCount(document.getElementById('nqcXpNum'), xp, 800), 400)
    // animate XP bar with delay
    setTimeout(() => {
      document.getElementById('nqcXpFill').style.width = pct + '%'
    }, 100)
  })
}

// ─────────────────────────────────────────
//  PUBLIC: showLevelUp
// ─────────────────────────────────────────
/**
 * @param {object} opts
 * @param {number}  opts.oldLevel
 * @param {number}  opts.newLevel
 * @param {string}  [opts.newTitle]   - ชื่อ rank/title ของ level ใหม่
 * @param {Function} [opts.onClose]
 */
export function showLevelUp(opts = {}) {
  const { oldLevel = 1, newLevel = 2, newTitle = '', onClose = null } = opts

  // สร้าง rays config
  const rayCount = 12
  const raysHtml = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i / rayCount) * 360
    const len = 140 + Math.random() * 100
    return `<div class="nlu-ray" style="transform:rotate(${angle}deg);--len:${len}px;animation-delay:${(i*0.04).toFixed(2)}s"></div>`
  }).join('')

  const overlay = getOrCreate('nexus-lu-overlay', `
    <div class="nlu-panel">
      <div class="nlu-glow-ring"></div>
      <div class="nlu-rays" id="nluRays">${raysHtml}</div>
      <div class="nlu-label">// LEVEL UP</div>
      <div class="nlu-old-level" id="nluOldLevel">LV.${oldLevel}</div>
      <div class="nlu-arrow">↑</div>
      <div class="nlu-level-num" id="nluLevelNum" data-level="${newLevel}">${newLevel}</div>
      <div class="nlu-up-text">LEVEL UP!</div>
      <div class="nlu-title-text" id="nluTitleText"></div>
      <button class="nlu-close-btn" id="nluCloseBtn">CONTINUE →</button>
    </div>
  `)

  // update content
  document.getElementById('nluOldLevel').textContent = `LV.${oldLevel}`
  const numEl = document.getElementById('nluLevelNum')
  numEl.textContent = newLevel
  numEl.setAttribute('data-level', newLevel)
  document.getElementById('nluTitleText').textContent = newTitle || ''

  // rebuild rays fresh
  const raysEl = document.getElementById('nluRays')
  raysEl.innerHTML = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i / rayCount) * 360
    const len = 140 + Math.floor(Math.random() * 120)
    return `<div class="nlu-ray" style="transform:rotate(${angle}deg);--len:${len}px;animation-delay:${(i*0.04).toFixed(2)}s"></div>`
  }).join('')

  const closeBtn = document.getElementById('nluCloseBtn')
  const closeHandler = () => {
    overlay.classList.remove('visible')
    setTimeout(() => { overlay.style.display = 'none' }, 400)
    if (typeof onClose === 'function') onClose()
  }
  closeBtn.onclick = closeHandler

  overlay.style.display = 'flex'
  requestAnimationFrame(() => overlay.classList.add('visible'))
}

// ─────────────────────────────────────────
//  PUBLIC: showTitleUnlock
// ─────────────────────────────────────────
/**
 * @param {object} opts
 * @param {string} opts.titleName
 * @param {string} [opts.titleDesc]
 */
export function showTitleUnlock(opts = {}) {
  const { titleName = '', titleDesc = '' } = opts

  const toast = getOrCreate('nexus-title-toast', `
    <div class="ntt-icon">👑</div>
    <div>
      <div class="ntt-label">// ฉายาใหม่</div>
      <div class="ntt-name" id="nttName"></div>
    </div>
  `)

  document.getElementById('nttName').textContent = titleName

  toast.classList.remove('show')
  void toast.offsetWidth // reflow
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 4000)
}

// ─────────────────────────────────────────
//  PUBLIC: stampCanvasWithGPS
// ─────────────────────────────────────────
/**
 * เพิ่ม GPS + timestamp stamp ลงบน canvas
 * @param {HTMLCanvasElement} canvas
 * @param {string} username
 * @returns {Promise<HTMLCanvasElement>}
 */
export function stampCanvasWithGPS(canvas, username = 'NEXUS') {
  return new Promise((resolve) => {
    const applyStamp = (locationStr) => {
      const ctx = canvas.getContext('2d')
      const w = canvas.width
      const h = canvas.height

      const now = new Date()
      const dateStr = now.toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'numeric' })
      const timeStr = now.toLocaleTimeString('th-TH', { hour:'2-digit', minute:'2-digit', second:'2-digit' })

      const fontSize = Math.max(14, Math.round(w * 0.026))
      const lineH    = fontSize * 1.5
      const padX     = fontSize * 0.6
      const lines    = [
        `NEXUS LIFE  ·  ${username.toUpperCase()}`,
        `${dateStr}  ${timeStr}`,
        locationStr
      ]
      const totalH = lines.length * lineH + fontSize * 0.6

      // dark strip
      ctx.fillStyle = 'rgba(0,0,0,0.65)'
      ctx.fillRect(0, h - totalH, w, totalH)

      // cyan top border line
      ctx.fillStyle = 'rgba(0,245,255,0.7)'
      ctx.fillRect(0, h - totalH, w, 1.5)

      // text lines
      ctx.font = `bold ${fontSize}px monospace`
      ctx.textBaseline = 'top'
      lines.forEach((line, i) => {
        // dim color for GPS line
        ctx.fillStyle = i === 2 ? 'rgba(0,245,255,0.65)' : '#00f5ff'
        ctx.fillText(line, padX, h - totalH + fontSize * 0.3 + i * lineH)
      })

      // NEXUS watermark icon (top-right)
      ctx.font = `bold ${Math.max(11, Math.round(w * 0.02))}px monospace`
      ctx.fillStyle = 'rgba(0,245,255,0.3)'
      ctx.textAlign = 'right'
      ctx.fillText('NEXUS LIFE', w - padX, padX)
      ctx.textAlign = 'left'

      resolve(canvas)
    }

    // ขอ GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(5)
          const lng = pos.coords.longitude.toFixed(5)
          const acc = Math.round(pos.coords.accuracy)
          applyStamp(`GPS  ${lat}, ${lng}  ±${acc}m`)
        },
        () => {
          // ถ้า user deny → stamp โดยไม่มี GPS
          applyStamp('GPS  ไม่ได้รับอนุญาต')
        },
        { timeout: 6000, maximumAge: 30000 }
      )
    } else {
      applyStamp('GPS  ไม่รองรับ')
    }
  })
}
