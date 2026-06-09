// ============================================================
// NEXUS LIFE — sidebar.js
// Shared Sidebar Component v1.0
// ใช้งาน: import { initSidebar } from './sidebar.js'
//          await initSidebar('dashboard')
// ============================================================

import { supabase, requireAuth } from './supabase.js'
import { NAV_ICONS as ICONS, CLASS_ICONS, CLASS_COLOR, getIcon } from './icons.js'

// nav items ทั้งหมด — เพิ่ม/ลบที่นี่ที่เดียว
const NAV_ITEMS = [
  { section: 'MAIN' },
  { id: 'dashboard',    label: 'DASHBOARD',    href: './dashboard.html',    icon: 'grid' },
  { id: 'quests',       label: 'QUESTS',        href: './quests.html',       icon: 'list',   badge: 'navQuestBadge' },
  { id: 'feed',         label: 'FEED',          href: './feed.html',         icon: 'chat' },
  { id: 'verify',       label: 'VERIFY',        href: './verify.html',       icon: 'check',  badge: 'navVerifyBadge' },
  { id: 'leaderboard',  label: 'LEADERBOARD',   href: './leaderboard.html',  icon: 'bar' },
  { id: 'social',       label: 'SOCIAL',        href: './social.html',       icon: 'users' },
  { id: 'messages',     label: 'MESSAGES',      href: './messages.html',     icon: 'msg',    badge: 'navMsgBadge' },
  { section: 'WORLD' },
  { id: 'city',         label: 'CITY',          href: './city.html',         icon: 'building' },
  { id: 'map',          label: 'WORLD MAP',     href: './map.html',          icon: 'map' },
  { id: 'guild',        label: 'GUILD',         href: './guild.html',        icon: 'guild' },
  { id: 'pvp',          label: 'PVP DUEL',      href: './pvp.html',          icon: 'sword' },
  { section: 'PROFILE' },
  { id: 'profile',      label: 'PROFILE',       href: './profile.html',      icon: 'person' },
  { id: 'achievements', label: 'ACHIEVEMENTS',  href: './achievements.html', icon: 'star' },
  { section: 'ECONOMY' },
  { id: 'shop',         label: 'SHOP',          href: './shop.html',         icon: 'cart' },
  { id: 'wallet',       label: 'WALLET',        href: './wallet.html',       icon: 'wallet' },
]



// ─── CSS ──────────────────────────────────────────────────────
const SIDEBAR_CSS = `
<style id="sidebar-css">
.sidebar{position:fixed;top:0;left:0;bottom:0;width:220px;background:rgba(1,10,15,0.95);border-right:1px solid rgba(0,245,255,0.12);backdrop-filter:blur(20px);z-index:200;display:flex;flex-direction:column;transition:transform 0.3s ease}
.sidebar-logo{padding:24px 20px 20px;border-bottom:1px solid rgba(0,245,255,0.12)}
.sidebar-logo-text{font-family:'Orbitron',monospace;font-weight:900;font-size:14px;letter-spacing:3px;color:#00f5ff;text-shadow:0 0 16px #00f5ff;display:flex;align-items:center;gap:8px}
.logo-dot{width:6px;height:6px;background:#00f5ff;border-radius:50%;animation:sb-pulse 2s infinite;flex-shrink:0}
@keyframes sb-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00f5ff}50%{opacity:0.3;box-shadow:none}}
.sidebar-tagline{font-family:'Orbitron',monospace;font-size:8px;letter-spacing:2px;color:#5a8a90;margin-top:4px}
.sidebar-user{padding:16px 20px;border-bottom:1px solid rgba(0,245,255,0.12);display:flex;align-items:center;gap:12px;cursor:pointer;transition:background 0.2s}
.sidebar-user:hover{background:rgba(0,245,255,0.04)}
.su-avatar{width:40px;height:40px;border-radius:50%;border:2px solid var(--sb-cls,#00f5ff);overflow:hidden;background:rgba(0,245,255,0.04);flex-shrink:0}
.su-avatar img{width:100%;height:100%;object-fit:cover}
.su-info{overflow:hidden}
.su-name{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.su-class{font-family:'Orbitron',monospace;font-size:9px;color:var(--sb-cls,#00f5ff);letter-spacing:1px}
.su-lv{font-family:'Orbitron',monospace;font-size:8px;color:#5a8a90;margin-top:1px}
.nav-menu{flex:1;padding:12px 0;overflow-y:auto}
.nav-menu::-webkit-scrollbar{width:2px}
.nav-menu::-webkit-scrollbar-thumb{background:rgba(0,245,255,0.15)}
.nav-item{display:flex;align-items:center;gap:12px;padding:12px 20px;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;color:#5a8a90;text-decoration:none;border-left:2px solid transparent;transition:all 0.2s;position:relative}
.nav-item:hover{color:#00f5ff;background:rgba(0,245,255,0.04)}
.nav-item.active{color:#00f5ff;border-left-color:#00f5ff;background:rgba(0,245,255,0.06)}
.nav-item svg{flex-shrink:0;opacity:0.6;transition:opacity 0.2s}
.nav-item:hover svg,.nav-item.active svg{opacity:1}
.nav-badge{margin-left:auto;background:#ff003c;color:#fff;font-size:8px;padding:2px 6px;border-radius:10px;font-family:'Orbitron',monospace;min-width:18px;text-align:center}
.nav-section-label{padding:16px 20px 6px;font-family:'Orbitron',monospace;font-size:8px;letter-spacing:3px;color:#5a8a90;opacity:0.5}
.sidebar-bottom{padding:16px 20px;border-top:1px solid rgba(0,245,255,0.12)}
.signout-btn{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Orbitron',monospace;font-size:9px;letter-spacing:2px;color:#5a8a90;background:transparent;border:1px solid rgba(0,245,255,0.12);cursor:pointer;transition:all 0.3s}
.signout-btn:hover{color:#ff003c;border-color:#ff003c;background:rgba(255,0,60,0.06)}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:190}
.sidebar-overlay.open{display:block}
.topbar{display:none;position:fixed;top:0;left:0;right:0;z-index:150;padding:14px 20px;background:rgba(1,10,15,0.97);border-bottom:1px solid rgba(0,245,255,0.12);backdrop-filter:blur(20px);align-items:center;justify-content:space-between}
.topbar-logo{font-family:'Orbitron',monospace;font-size:14px;font-weight:900;letter-spacing:3px;color:#00f5ff;text-shadow:0 0 12px #00f5ff}
.burger{width:36px;height:36px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;background:transparent;border:1px solid rgba(0,245,255,0.12);cursor:pointer}
.burger span{display:block;width:18px;height:1px;background:#00f5ff}
@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .topbar{display:flex}
}
</style>`

// ─── HTML BUILDER ─────────────────────────────────────────────
function buildSidebarHTML(activePage) {
  const navHTML = NAV_ITEMS.map(item => {
    if (item.section) {
      return `<div class="nav-section-label">${item.section}</div>`
    }
    const isActive = item.id === activePage
    const badgeHTML = item.badge
      ? `<span class="nav-badge" id="${item.badge}" style="display:none">0</span>`
      : ''
    const svgContent = ICONS[item.icon] || ''
    return `<a class="nav-item${isActive ? ' active' : ''}" href="${item.href}">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">${svgContent}</svg>
      ${item.label}${badgeHTML}
    </a>`
  }).join('\n')

  return `
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-text"><div class="logo-dot"></div>NEXUS LIFE</div>
      <div class="sidebar-tagline">// REAL LIFE MMO</div>
    </div>
    <div class="sidebar-user" id="sidebarUser" onclick="window.location.href='./profile.html'">
      <div class="su-avatar" id="suAvatarWrap">
        <img id="suAvatar" src="https://api.dicebear.com/9.x/pixel-art/svg?seed=nexus&size=40" alt="">
      </div>
      <div class="su-info">
        <div class="su-name" id="suName">กำลังโหลด...</div>
        <div class="su-class" id="suClass">—</div>
        <div class="su-lv" id="suLv">LV.—</div>
      </div>
    </div>
    <nav class="nav-menu">${navHTML}</nav>
    <div class="sidebar-bottom">
      <button class="signout-btn" id="signoutBtn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2H2v10h3M9 4l3 3-3 3M12 7H5" stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>
        </svg>
        SIGN OUT
      </button>
    </div>
  </aside>
  <div class="topbar">
    <div class="topbar-logo">NEXUS</div>
    <button class="burger" id="burgerBtn"><span></span><span></span><span></span></button>
  </div>`
}

// ─── LOAD BADGES ─────────────────────────────────────────────
async function loadBadges(userId, userCity) {
  const city = userCity || 'กรุงเทพมหานคร'

  // Quest badge — in_progress quests
  const { count: qc } = await supabase.from('user_quests')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId).eq('status', 'in_progress')
  const qBadge = document.getElementById('navQuestBadge')
  if (qBadge && qc > 0) {
    qBadge.textContent = qc > 99 ? '99+' : qc
    qBadge.style.display = 'inline'
  }

  // Verify badge — pending in same city, not voted yet
  const { data: pendingV } = await supabase.from('user_quests')
    .select('id, users!inner(city)')
    .eq('status', 'pending_review')
    .eq('users.city', city)
    .neq('user_id', userId)
  const { data: myVotes } = await supabase.from('quest_verifications')
    .select('user_quest_id').eq('voter_id', userId)
  const votedIds = new Set((myVotes || []).map(v => v.user_quest_id))
  const notVoted = (pendingV || []).filter(p => !votedIds.has(p.id)).length
  const vBadge = document.getElementById('navVerifyBadge')
  if (vBadge && notVoted > 0) {
    vBadge.textContent = notVoted > 99 ? '99+' : notVoted
    vBadge.style.display = 'inline'
  }

  // Messages badge — unread DMs (ข้อความที่คนอื่นส่งมา ในช่วง 24 ชม.)
  const { count: mc } = await supabase.from('messages')
    .select('*', { count: 'exact', head: true })
    .like('channel', `%${userId}%`)
    .neq('sender_id', userId)
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())
  const mBadge = document.getElementById('navMsgBadge')
  if (mBadge && mc > 0) {
    mBadge.textContent = '●'
    mBadge.style.display = 'inline'
  }
}

// ─── LOAD USER ───────────────────────────────────────────────
async function loadSidebarUser(userId) {
  const { data: p } = await supabase.from('users')
    .select('id,username,display_name,class,level,avatar_seed,city')
    .eq('id', userId).single()
  if (!p) return null

  const cls = p.class || 'warrior'
  const avatarUrl = p.avatar_seed
    ? (() => {
        const [style, s, bg] = p.avatar_seed.split(':')
        return `https://api.dicebear.com/9.x/${style||'pixel-art'}/svg?seed=${encodeURIComponent(s||'nexus')}&backgroundColor=${bg||'0a1628'}&size=40`
      })()
    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=nexus&size=40`

  // Set CSS var for class color
  const suUser = document.getElementById('sidebarUser')
  if (suUser) suUser.style.setProperty('--sb-cls', CLASS_COLOR[cls] || '#00f5ff')

  const suAvatar = document.getElementById('suAvatar')
  const suName   = document.getElementById('suName')
  const suClass  = document.getElementById('suClass')
  const suLv     = document.getElementById('suLv')

  if (suAvatar) suAvatar.src = avatarUrl
  if (suName)   suName.textContent = p.display_name || p.username
  if (suClass) {
    const iconSvg = CLASS_ICONS[cls] ? `<svg width="12" height="12" viewBox="0 0 20 20" fill="none" style="display:inline-block;vertical-align:middle;margin-right:4px" aria-hidden="true">${CLASS_ICONS[cls]}</svg>` : ''
    suClass.innerHTML = `${iconSvg}${cls.toUpperCase()}`
  }
  if (suLv)     suLv.textContent = `LV.${p.level || 1}`

  return p
}

// ─── INIT EVENTS ─────────────────────────────────────────────
function initEvents() {
  const overlay  = document.getElementById('sidebarOverlay')
  const sidebar  = document.getElementById('sidebar')
  const burger   = document.getElementById('burgerBtn')
  const signout  = document.getElementById('signoutBtn')

  if (overlay) overlay.addEventListener('click', closeSidebar)
  if (burger)  burger.addEventListener('click', openSidebar)
  if (signout) signout.addEventListener('click', handleSignOut)

  // expose globals สำหรับ onclick inline ที่อาจยังมีใน HTML เก่า
  window.openSidebar  = openSidebar
  window.closeSidebar = closeSidebar
}

function openSidebar() {
  document.getElementById('sidebar')?.classList.add('open')
  document.getElementById('sidebarOverlay')?.classList.add('open')
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open')
  document.getElementById('sidebarOverlay')?.classList.remove('open')
}
async function handleSignOut() {
  await supabase.auth.signOut()
  window.location.href = './login.html'
}

// ─── MAIN EXPORT ─────────────────────────────────────────────
/**
 * initSidebar(activePage, options?)
 * @param {string} activePage  - nav id ปัจจุบัน เช่น 'dashboard', 'quests'
 * @param {object} options
 *   - skipAuth: boolean  (default false) — ถ้า true ไม่เรียก requireAuth
 *   - container: string  (default '#sidebar-root') — selector ที่จะ inject
 *
 * @returns {{ user, profile }} — session user และ profile data
 */
export async function initSidebar(activePage = '', options = {}) {
  const {
    skipAuth  = false,
    container = '#sidebar-root'
  } = options

  // 1. Auth check
  let session
  if (!skipAuth) {
    session = await requireAuth('./login.html')
    if (!session) return {}
  } else {
    const { data } = await supabase.auth.getSession()
    session = data?.session
  }

  const userId = session?.user?.id
  if (!userId) return {}

  // 2. Inject CSS
  if (!document.getElementById('sidebar-css')) {
    document.head.insertAdjacentHTML('beforeend', SIDEBAR_CSS)
  }

  // 3. Inject HTML
  const root = document.querySelector(container)
  if (root) {
    root.innerHTML = buildSidebarHTML(activePage)
  } else {
    // fallback: inject ก่อน body content แรก
    document.body.insertAdjacentHTML('afterbegin', buildSidebarHTML(activePage))
  }

  // 4. Init events
  initEvents()

  // 5. Load user + badges พร้อมกัน
  const profile = await loadSidebarUser(userId)
  if (profile) await loadBadges(userId, profile.city)

  return { user: session.user, profile }
}

// ─── UTILITY EXPORTS ─────────────────────────────────────────
/** อัพเดต badge ใหม่หลัง action (เรียกจากหน้าที่ต้องการ refresh badge) */
export async function refreshSidebarBadges(userId, city) {
  await loadBadges(userId, city)
}

/** เปลี่ยน avatar ใน sidebar โดยไม่ต้อง reload */
export function updateSidebarAvatar(avatarSeed) {
  const img = document.getElementById('suAvatar')
  if (!img || !avatarSeed) return
  const [style, s, bg] = avatarSeed.split(':')
  img.src = `https://api.dicebear.com/9.x/${style||'pixel-art'}/svg?seed=${encodeURIComponent(s||'nexus')}&backgroundColor=${bg||'0a1628'}&size=40`
}

/** อัพเดตชื่อใน sidebar */
export function updateSidebarName(displayName) {
  const el = document.getElementById('suName')
  if (el) el.textContent = displayName
}
