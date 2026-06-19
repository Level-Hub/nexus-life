// ============================================================
// NEXUS LIFE — sidebar.js  v2.0
// Shared Sidebar Component
// + Bell Notification Dropdown (realtime, delete-safe)
// + Auto Theme Color per page
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
  { id: 'messages',     label: 'MESSAGES',      href: './messages.html',     icon: 'msg' },
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

// ─── NOTIFICATION STATE ───────────────────────────────────────
let _notifUserId   = null
let _notifList     = []       // array ของ notification objects
let _deletedIds    = new Set() // track ที่ลบแล้ว ป้องกัน realtime event ดึงกลับมา
let _notifChannel  = null
let _notifOpen     = false

// ─── CSS ──────────────────────────────────────────────────────
const SIDEBAR_CSS = `
<style id="sidebar-css">
/* ── GLOBAL TOKENS — sidebar override ── */
:root {
  --bg:       #010a0f;
  --bg2:      #020d14;
  --border:   rgba(0,245,255,0.12);
  --panel:    rgba(0,245,255,0.04);
  --text:     #e8f0f2;
  --text-dim: #7a9099;
  --t-fast:   0.15s;
  --t-base:   0.3s;
  --t-slow:   0.55s;
  --sb-accent: #00f5ff;
}
/* ── SIDEBAR ── */
.sidebar{position:fixed;top:0;left:0;bottom:0;width:220px;background:rgba(1,10,15,0.95);border-right:1px solid rgba(0,245,255,0.12);backdrop-filter:blur(20px);z-index:200;display:flex;flex-direction:column;transition:transform 0.3s ease}
.sidebar-logo{padding:20px 20px 16px;border-bottom:1px solid rgba(0,245,255,0.12);display:flex;align-items:center;justify-content:space-between}
.sidebar-logo-inner{display:flex;flex-direction:column;gap:4px}
.sidebar-logo-text{font-family:'Orbitron',monospace;font-weight:900;font-size:14px;letter-spacing:3px;color:var(--sb-accent);text-shadow:0 0 16px var(--sb-accent);display:flex;align-items:center;gap:8px}
.logo-dot{width:6px;height:6px;background:var(--sb-accent);border-radius:50%;animation:sb-pulse 2s infinite;flex-shrink:0}
@keyframes sb-pulse{0%,100%{opacity:1;box-shadow:0 0 8px var(--sb-accent)}50%{opacity:0.3;box-shadow:none}}
.sidebar-tagline{font-family:'Orbitron',monospace;font-size:8px;letter-spacing:2px;color:#5a8a90}

/* ── NOTIFICATION DROPDOWN ── */
.sb-notif-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 14px 10px;border-bottom:1px solid rgba(0,245,255,0.1);flex-shrink:0}
.sb-notif-hdr-title{font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;color:var(--sb-accent)}
.sb-notif-hdr-actions{display:flex;gap:8px}
.sb-notif-action{font-family:'Orbitron',monospace;font-size:8px;letter-spacing:1px;padding:4px 8px;background:transparent;border:1px solid rgba(0,245,255,0.15);color:#5a8a90;cursor:pointer;transition:all 0.2s}
.sb-notif-action:hover{border-color:var(--sb-accent);color:var(--sb-accent)}
.sb-notif-action.danger:hover{border-color:#ff003c;color:#ff003c}

.sb-notif-list{overflow-y:auto;flex:1}
.sb-notif-list::-webkit-scrollbar{width:2px}
.sb-notif-list::-webkit-scrollbar-thumb{background:rgba(0,245,255,0.15)}

.sb-notif-item{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(0,245,255,0.06);cursor:pointer;transition:background 0.15s;position:relative}
.sb-notif-item:hover{background:rgba(0,245,255,0.04)}
.sb-notif-item.unread{border-left:2px solid var(--sb-accent);background:rgba(0,245,255,0.03)}
.sb-notif-item.unread::after{content:'';position:absolute;top:50%;right:10px;transform:translateY(-50%);width:5px;height:5px;background:var(--sb-accent);border-radius:50%;box-shadow:0 0 6px var(--sb-accent)}
.sb-notif-icon{width:28px;height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(0,245,255,0.06);border:1px solid rgba(0,245,255,0.12);font-size:12px}
.sb-notif-body{flex:1;min-width:0;padding-right:16px}
.sb-notif-title{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;color:#fff;margin-bottom:2px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sb-notif-item.unread .sb-notif-title{color:var(--sb-accent)}
.sb-notif-text{font-size:10px;color:#5a8a90;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sb-notif-time{font-family:'Orbitron',monospace;font-size:8px;color:#3a5a60;margin-top:3px}
.sb-notif-del{width:22px;height:22px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:transparent;border:none;color:#3a5a60;cursor:pointer;font-size:10px;margin-top:2px;opacity:0;transition:opacity 0.2s}
.sb-notif-item:hover .sb-notif-del{opacity:1}
.sb-notif-del:hover{color:#ff003c}

.sb-notif-empty{text-align:center;padding:32px 20px;font-family:'Orbitron',monospace;font-size:9px;letter-spacing:2px;color:#3a5a60}
.sb-notif-footer{padding:8px 14px;border-top:1px solid rgba(0,245,255,0.08);flex-shrink:0;text-align:center}
.sb-notif-footer a{font-family:'Orbitron',monospace;font-size:8px;letter-spacing:2px;color:#5a8a90;text-decoration:none;transition:color 0.2s}
.sb-notif-footer a:hover{color:var(--sb-accent)}

/* ── REST OF SIDEBAR ── */
.sidebar-user{padding:16px 20px;border-bottom:1px solid rgba(0,245,255,0.12);display:flex;align-items:center;gap:12px;cursor:pointer;transition:background 0.2s}
.sidebar-user:hover{background:rgba(0,245,255,0.04)}
.su-avatar{width:40px;height:40px;border-radius:50%;border:2px solid var(--sb-cls,var(--sb-accent));overflow:hidden;background:rgba(0,245,255,0.04);flex-shrink:0}
.su-avatar img{width:100%;height:100%;object-fit:cover}
.su-info{overflow:hidden}
.su-name{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.su-class{font-family:'Orbitron',monospace;font-size:9px;color:var(--sb-cls,var(--sb-accent));letter-spacing:1px}
.su-lv{font-family:'Orbitron',monospace;font-size:8px;color:#5a8a90;margin-top:1px}
.nav-menu{flex:1;padding:12px 0;overflow-y:auto}
.nav-menu::-webkit-scrollbar{width:2px}
.nav-menu::-webkit-scrollbar-thumb{background:rgba(0,245,255,0.15)}
.nav-item{display:flex;align-items:center;gap:12px;padding:12px 20px;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;color:#5a8a90;text-decoration:none;border-left:2px solid transparent;transition:all 0.2s;position:relative}
.nav-item:hover{color:var(--sb-accent);background:rgba(0,245,255,0.04)}
.nav-item.active{color:var(--sb-accent);border-left-color:var(--sb-accent);background:rgba(0,245,255,0.06)}
.nav-item svg{flex-shrink:0;opacity:0.6;transition:opacity 0.2s}
.nav-item:hover svg,.nav-item.active svg{opacity:1}
.nav-badge{margin-left:auto;background:#ff003c;color:#fff;font-size:8px;padding:2px 6px;border-radius:10px;font-family:'Orbitron',monospace;min-width:18px;text-align:center}
.nav-section-label{padding:16px 20px 6px;font-family:'Orbitron',monospace;font-size:8px;letter-spacing:3px;color:#5a8a90;opacity:0.5}
.sidebar-bottom{padding:16px 20px;border-top:1px solid rgba(0,245,255,0.12)}
.signout-btn{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Orbitron',monospace;font-size:9px;letter-spacing:2px;color:#5a8a90;background:transparent;border:1px solid rgba(0,245,255,0.12);cursor:pointer;transition:all 0.3s}
.signout-btn:hover{color:#ff003c;border-color:#ff003c;background:rgba(255,0,60,0.06)}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:190}
.sidebar-overlay.open{display:block}

/* ── TOPBAR (mobile) ── */
.topbar{display:none;position:fixed;top:0;left:0;right:0;z-index:150;padding:12px 16px;background:rgba(1,10,15,0.97);border-bottom:1px solid rgba(0,245,255,0.12);backdrop-filter:blur(20px);align-items:center;justify-content:space-between}
.topbar-left{display:flex;align-items:center;gap:10px}
.topbar-logo{font-family:'Orbitron',monospace;font-size:14px;font-weight:900;letter-spacing:3px;color:var(--sb-accent);text-shadow:0 0 12px var(--sb-accent)}
.topbar-right{display:flex;align-items:center;gap:8px}
.burger{width:36px;height:36px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;background:transparent;border:1px solid rgba(0,245,255,0.15);cursor:pointer}
.burger span{display:block;width:18px;height:1px;background:var(--sb-accent)}

/* topbar bell (mobile) */
.tb-bell-btn{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid rgba(0,245,255,0.15);cursor:pointer}
.tb-bell-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:#ff003c;border-radius:50%;display:none;box-shadow:0 0 6px #ff003c;animation:bell-dot-pulse 1.5s ease-in-out infinite}

/* mobile notif panel — full width below topbar */
.tb-notif-panel{
  position:fixed;top:61px;left:0;right:0;
  background:rgba(1,10,15,0.99);border-bottom:1px solid rgba(0,245,255,0.18);
  backdrop-filter:blur(24px);z-index:9998;
  max-height:70vh;display:flex;flex-direction:column;
  transform:translateY(-12px);opacity:0;pointer-events:none;
  transition:all 0.22s cubic-bezier(0.2,0.9,0.4,1.1)
}
.tb-notif-panel.open{transform:translateY(0);opacity:1;pointer-events:auto}

@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .topbar{display:flex}
}
@media(min-width:769px){
  .tb-notif-panel{display:none!important}
  .tb-bell-btn{display:none!important}
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

  // Bell icon from icons.js
  const bellSVG = getIcon('bell')

  // Notification panel HTML (shared content, rendered dynamically)
  const notifPanelInner = `
    <div class="sb-notif-hdr">
      <span class="sb-notif-hdr-title">// NOTIFICATIONS</span>
      <div class="sb-notif-hdr-actions">
        <button class="sb-notif-action" onclick="window._sbMarkAllRead()">MARK ALL</button>
        <button class="sb-notif-action danger" onclick="window._sbDeleteAllRead()">CLEAR ALL</button>
      </div>
    </div>
    <div class="sb-notif-list" id="sbNotifList"><div class="sb-notif-empty">กำลังโหลด...</div></div>
    <div class="sb-notif-footer"></div>`

  return `
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-inner">
        <div class="sidebar-logo-text"><div class="logo-dot"></div>NEXUS LIFE</div>
        <div class="sidebar-tagline">// REAL LIFE MMO</div>
      </div>
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
  <!-- Mobile Topbar -->
  <div class="topbar" id="topbar">
    <div class="topbar-left">
      <div class="topbar-logo">NEXUS</div>
    </div>
    <div class="topbar-right">
      <!-- Mobile Bell -->
      <button class="tb-bell-btn" id="tbBellBtn" title="การแจ้งเตือน">${bellSVG}<span class="tb-bell-dot" id="tbBellDot"></span></button>
      <button class="burger" id="burgerBtn"><span></span><span></span><span></span></button>
    </div>
  </div>
  <!-- Mobile Notif Panel (full-width below topbar) -->
  <div class="tb-notif-panel" id="tbNotifPanel">
    ${notifPanelInner.replace('id="sbNotifList"','id="tbNotifList"')}
  </div>`
}

// ─── LOAD BADGES ─────────────────────────────────────────────
async function loadBadges(userId, userCity) {
  const city = userCity || 'กรุงเทพมหานคร'

  const TZ = 'Asia/Bangkok'
  const todayStr    = new Date().toLocaleDateString('sv-SE', { timeZone: TZ })
  const tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrowStr = tomorrowDate.toLocaleDateString('sv-SE', { timeZone: TZ })
  const nowThai     = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }))
  const dayOfWeek   = nowThai.getDay() === 0 ? 7 : nowThai.getDay()
  const monday      = new Date(nowThai.getTime() - (dayOfWeek - 1) * 86400000)
  const mondayStr   = monday.toLocaleDateString('sv-SE', { timeZone: TZ })

  const toThaiDate = (ts) => {
    if (!ts) return ''
    return new Date(ts).toLocaleDateString('sv-SE', { timeZone: TZ })
  }

  // Quest badge
  const { data: quests } = await supabase.from('quests')
    .select('id, type').eq('is_active', true).eq('type', 'daily')
  const { data: uqAll } = await supabase.from('user_quests')
    .select('quest_id, status, submitted_at, created_at')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false })
    .limit(50)

  const doneToday = new Set(
    (uqAll || [])
      .filter(uq => {
        const d = toThaiDate(uq.submitted_at || uq.created_at)
        return d === todayStr && (uq.status === 'approved' || uq.status === 'pending_review')
      })
      .map(uq => uq.quest_id)
  )
  const remaining = (quests || []).filter(q => !doneToday.has(q.id)).length
  const qBadge = document.getElementById('navQuestBadge')
  if (qBadge) {
    if (remaining > 0) {
      qBadge.textContent = remaining > 99 ? '99+' : remaining
      qBadge.style.display = 'inline'
    } else {
      qBadge.style.display = 'none'
    }
  }

  // Verify badge
  const { data: pending } = await supabase
    .from('user_quests')
    .select('id, users!inner(city)')
    .eq('status', 'pending_review')
    .eq('users.city', city)
    .neq('user_id', userId)
  const { data: myVotes } = await supabase
    .from('quest_verifications')
    .select('user_quest_id')
    .eq('voter_id', userId)
  const votedIds = new Set((myVotes || []).map(v => v.user_quest_id))
  const notVotedCount = (pending || []).filter(p => !votedIds.has(p.id)).length
  const vBadge = document.getElementById('navVerifyBadge')
  if (vBadge) {
    if (notVotedCount > 0) {
      vBadge.textContent = notVotedCount > 99 ? '99+' : notVotedCount
      vBadge.style.display = 'inline'
    } else {
      vBadge.style.display = 'none'
    }
  }

  // Messages badge — ลบออกจาก nav แล้ว ไม่ต้องโหลด
}

// ─── NOTIFICATION SYSTEM ──────────────────────────────────────
async function loadNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return
  // กรอง deletedIds ออก
  _notifList = (data || []).filter(n => !_deletedIds.has(n.id))
  renderNotifDropdown()
  updateBellDot()
}

function renderNotifDropdown() {
  // render ทั้ง desktop (#sbNotifList) และ mobile (#tbNotifList)
  const lists = [
    document.getElementById('sbNotifList'),
    document.getElementById('tbNotifList'),
  ].filter(Boolean)

  const html = _notifList.length === 0
    ? `<div class="sb-notif-empty">ไม่มีการแจ้งเตือน</div>`
    : _notifList.map(n => {
        const icon = getNotifIcon(n)
        const time = timeAgo(n.created_at)
        return `
          <div class="sb-notif-item ${n.is_read ? '' : 'unread'}" id="sbnotif-${n.id}" onclick="window._sbMarkRead(${n.id})">
            <div class="sb-notif-icon">${icon}</div>
            <div class="sb-notif-body">
              <div class="sb-notif-title">${esc(n.title || 'แจ้งเตือน')}</div>
              <div class="sb-notif-text">${esc(n.body || '')}</div>
              <div class="sb-notif-time">${time}</div>
            </div>
            <button class="sb-notif-del" onclick="event.stopPropagation();window._sbDeleteNotif(${n.id})" title="ลบ">✕</button>
          </div>`
      }).join('')

  lists.forEach(el => { el.innerHTML = html })
}

function updateBellDot() {
  const unread = _notifList.filter(n => !n.is_read).length
  const dots = [
    document.getElementById('tbBellDot'),
  ]
  dots.forEach(d => {
    if (!d) return
    d.style.display = unread > 0 ? 'block' : 'none'
  })
}

function getNotifIcon(n) {
  const t = ((n.title || '') + (n.body || '')).toLowerCase()
  if (t.includes('level') || t.includes('เลเวล')) return '⚡'
  if (t.includes('quest') || t.includes('เควส') || t.includes('หลักฐาน')) return '📋'
  if (t.includes('badge') || t.includes('แบดจ์')) return '🏅'
  if (t.includes('ฉายา') || t.includes('title')) return '👑'
  if (t.includes('guild') || t.includes('กิลด์')) return '🏰'
  if (t.includes('crystal')) return '💎'
  if (t.includes('streak')) return '🔥'
  if (t.includes('message') || t.includes('ข้อความ')) return '💬'
  return '🔔'
}

function esc(s) { return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

function timeAgo(ts) {
  if (!ts) return ''
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return 'เมื่อกี้'
  if (m < 60) return `${m} น.ที่แล้ว`
  if (h < 24) return `${h} ชม.ที่แล้ว`
  if (d < 7) return `${d} วันที่แล้ว`
  return new Date(ts).toLocaleDateString('th-TH', { day:'numeric', month:'short' })
}

// ── Actions (window-exposed เพราะ onclick inline) ──
window._sbMarkRead = async function(id) {
  const notif = _notifList.find(n => n.id === id)
  if (!notif || notif.is_read) return
  await supabase.from('notifications').update({ is_read: true }).eq('id', id)
  notif.is_read = true
  renderNotifDropdown()
  updateBellDot()
}

window._sbDeleteNotif = async function(id) {
  // Optimistic UI — ลบออกก่อน
  _deletedIds.add(id)
  const backup = [..._notifList]
  _notifList = _notifList.filter(n => n.id !== id)
  renderNotifDropdown()
  updateBellDot()

  // ลบ DB — ถ้า fail rollback กลับ
  const { error } = await supabase.from('notifications').delete().eq('id', id).eq('user_id', _notifUserId)
  if (error) {
    console.error('[sidebar] delete notif failed:', error.message)
    _deletedIds.delete(id)
    _notifList = backup
    renderNotifDropdown()
    updateBellDot()
  }
}

window._sbMarkAllRead = async function() {
  const unread = _notifList.filter(n => !n.is_read)
  if (!unread.length) return
  const { error } = await supabase.from('notifications')
    .update({ is_read: true })
    .eq('user_id', _notifUserId)
    .eq('is_read', false)
  if (!error) {
    _notifList.forEach(n => n.is_read = true)
    renderNotifDropdown()
    updateBellDot()
  }
}

window._sbDeleteAllRead = async function() {
  if (!_notifList.length) return
  const backup = [..._notifList]
  _notifList.forEach(n => _deletedIds.add(n.id))
  _notifList = []
  renderNotifDropdown()
  updateBellDot()

  const { error } = await supabase.from('notifications')
    .delete()
    .eq('user_id', _notifUserId)
  if (error) {
    console.error('[sidebar] delete all failed:', error.message)
    backup.forEach(n => _deletedIds.delete(n.id))
    _notifList = backup
    renderNotifDropdown()
    updateBellDot()
  }
}

// ── Bell toggle ──
function initBellToggle() {
  // Mobile bell
  const tbBtn   = document.getElementById('tbBellBtn')
  const tbPanel = document.getElementById('tbNotifPanel')
  if (tbBtn && tbPanel) {
    tbBtn.addEventListener('click', e => {
      e.stopPropagation()
      _notifOpen = !_notifOpen
      tbPanel.classList.toggle('open', _notifOpen)
    })
  }

  // click outside → close
  document.addEventListener('click', e => {
    const inTbPanel = tbPanel?.contains(e.target) || tbBtn?.contains(e.target)
    if (!inTbPanel && _notifOpen) {
      _notifOpen = false
      tbPanel?.classList.remove('open')
    }
  })
}

// ── Realtime subscribe ──
function subscribeNotifRealtime(userId) {
  if (_notifChannel) {
    supabase.removeChannel(_notifChannel)
  }
  _notifChannel = supabase.channel(`sb_notif_${userId}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, payload => {
      // ถ้า id อยู่ใน deletedIds แปลว่าเราลบไปแล้ว ignore
      if (_deletedIds.has(payload.new.id)) return
      // ถ้ามีอยู่แล้วก็ไม่เพิ่มซ้ำ
      if (_notifList.find(n => n.id === payload.new.id)) return
      _notifList.unshift(payload.new)
      renderNotifDropdown()
      updateBellDot()
    })
    .on('postgres_changes', {
      event: 'DELETE', schema: 'public', table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, payload => {
      _notifList = _notifList.filter(n => n.id !== payload.old.id)
      renderNotifDropdown()
      updateBellDot()
    })
    .subscribe()
}

// ─── AUTO THEME COLOR ─────────────────────────────────────────
// ดึง --accent หรือ --cyan จากหน้านั้น แล้ว set เป็น --sb-accent ให้ sidebar
function applyThemeColor() {
  const rootStyle = getComputedStyle(document.documentElement)
  // ลำดับ priority: --accent → --cyan (ถ้าไม่ใช่ค่า default #00f5ff)
  const accent = rootStyle.getPropertyValue('--accent').trim()
  const cyan   = rootStyle.getPropertyValue('--cyan').trim()

  let themeColor = '#00f5ff' // default
  if (accent && accent !== '') {
    themeColor = accent
  } else if (cyan && cyan !== '' && cyan !== '#00f5ff') {
    themeColor = cyan
  }

  // set ลงไปเป็น --sb-accent ทับ
  document.documentElement.style.setProperty('--sb-accent', themeColor)
}

// ─── LOAD USER ───────────────────────────────────────────────
async function loadSidebarUser(userId, activePage = '') {
  const { data: p } = await supabase.from('users')
    .select('id,username,display_name,class,level,avatar_seed,avatar_url,city,is_admin')
    .eq('id', userId).single()
  if (!p) return null

  const cls = p.class || 'warrior'
  const avatarUrl = p.avatar_url
    ? p.avatar_url
    : p.avatar_seed
      ? (() => {
          const [style, s, bg] = p.avatar_seed.split(':')
          return `https://api.dicebear.com/9.x/${style||'pixel-art'}/svg?seed=${encodeURIComponent(s||'nexus')}&backgroundColor=${bg||'0a1628'}&size=40`
        })()
      : `https://api.dicebear.com/9.x/pixel-art/svg?seed=nexus&size=40`

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
  if (suLv) suLv.textContent = `LV.${p.level || 1}`

  if (p.is_admin) {
    const nav = document.querySelector('.nav-menu')
    if (nav) {
      const adminHTML = `
        <div class="nav-section-label">SYSTEM</div>
        <a class="nav-item${activePage === 'admin' ? ' active' : ''}" href="./admin.html" style="color:#ff9500;border-left-color:${activePage === 'admin' ? '#ff9500' : 'transparent'}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1" width="6" height="6" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="9" width="6" height="6" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="9" width="6" height="6" stroke="currentColor" stroke-width="1.2"/></svg>
          ADMIN
        </a>`
      nav.insertAdjacentHTML('beforeend', adminHTML)
    }
  }

  return p
}

// ─── INIT EVENTS ─────────────────────────────────────────────
function initEvents() {
  const overlay = document.getElementById('sidebarOverlay')
  const burger  = document.getElementById('burgerBtn')
  const signout = document.getElementById('signoutBtn')

  if (overlay) overlay.addEventListener('click', closeSidebar)
  if (burger)  burger.addEventListener('click', openSidebar)
  if (signout) signout.addEventListener('click', handleSignOut)

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
export async function initSidebar(activePage = '', options = {}) {
  const {
    skipAuth  = false,
    container = '#sidebar-root'
  } = options

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

  // Apply theme color ก่อน inject CSS (ดึง --accent จากหน้านั้น)
  applyThemeColor()

  if (!document.getElementById('sidebar-css')) {
    document.head.insertAdjacentHTML('beforeend', SIDEBAR_CSS)
  }

  const root = document.querySelector(container)
  if (root) {
    root.innerHTML = buildSidebarHTML(activePage)
  } else {
    document.body.insertAdjacentHTML('afterbegin', buildSidebarHTML(activePage))
  }

  initEvents()
  initBellToggle()

  // Load user + badges + notifications พร้อมกัน
  _notifUserId = userId
  const profile = await loadSidebarUser(userId, activePage)
  if (profile) {
    await Promise.all([
      loadBadges(userId, profile.city),
      loadNotifications(userId),
    ])
  }

  // Subscribe realtime notifications
  subscribeNotifRealtime(userId)

  return { user: session.user, profile }
}

// ─── UTILITY EXPORTS ─────────────────────────────────────────
export async function refreshSidebarBadges(userId, city) {
  await loadBadges(userId, city)
}

export function updateSidebarAvatar(avatarSeedOrUrl) {
  const img = document.getElementById('suAvatar')
  if (!img || !avatarSeedOrUrl) return
  if (avatarSeedOrUrl.startsWith('http') || avatarSeedOrUrl.startsWith('/')) {
    img.src = avatarSeedOrUrl
    return
  }
  const [style, s, bg] = avatarSeedOrUrl.split(':')
  img.src = `https://api.dicebear.com/9.x/${style||'pixel-art'}/svg?seed=${encodeURIComponent(s||'nexus')}&backgroundColor=${bg||'0a1628'}&size=40`
}

export function updateSidebarName(displayName) {
  const el = document.getElementById('suName')
  if (el) el.textContent = displayName
}
