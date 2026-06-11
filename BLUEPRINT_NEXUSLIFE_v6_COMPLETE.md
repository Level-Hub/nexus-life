# 🎮 NEXUS LIFE — Real Life MMO
## Blueprint ฉบับสมบูรณ์ v6.0

> **Changelog v6.0 (อัพเดตจาก v5 → Frontend Standards + Best Practices ครบ 100%):**
> - ✅ เพิ่ม Section 24: Auth Standard — บังคับใช้ `requireAuth()` ทุกหน้า (ยกเว้น index/login/register)
> - ✅ เพิ่ม Section 25: Sidebar Badges Standard — `#navQuestBadge` และ `#navVerifyBadge` ครบทุกหน้า
> - ✅ เพิ่ม Section 26: Guild System — ข้อควรระวังการ query `guild_quests` และ member count
> - ✅ เพิ่ม Section 27: PvP System — ข้อควรระวัง `resolve_pvp_duel` RPC และ pg_cron
> - ✅ เพิ่ม Section 28: Quest Submission Standard — แยก `status` ตาม `proof_type` พร้อมตัวอย่างโค้ด
> - ✅ เพิ่ม Section 29: `.single()` vs `.maybeSingle()` — มาตรฐาน query ที่อาจไม่มีข้อมูล
> - ✅ เพิ่ม Section 30: Cron Jobs — SQL สำหรับตั้ง pg_cron ครบ 3 jobs
> - ✅ อัพเดต Section 21.2 Cron Jobs เพิ่ม `resolve_expired_pvp_duels` ทุก 30 นาที
> - ✅ อัพเดต Action Items — Backend + Frontend พร้อม 100%

> **Changelog v5.0 (อัพเดตจาก v4 → ตรงกับ DB จริง 100%):**
> - ✅ เพิ่มตาราง `city_stats`, `city_projects`, `city_project_contributions`, `city_wars`, `city_war_participants`
> - ✅ เพิ่มตาราง `guild_quests`, `guild_wars`, `pets`, `user_pets`, `profile_frames`
> - ✅ เพิ่มตาราง `territories`, `neighborhood_requests`
> - ✅ `grant_quest_xp`, `social_feed_view`, `leaderboard_monthly` — มีใน DB แล้ว
> - ✅ อัพเดต Schema ครบ 34 tables, 17 functions, 2 views

---

# 📋 สารบัญ

1. [Overview & Concept](#1-overview--concept)
2. [Class System](#2-class-system)
3. [Quest System](#3-quest-system)
4. [XP / Level / Rank System](#4-xp--level--rank-system)
5. [Stat System (6 ด้าน)](#5-stat-system-6-ด้าน)
6. [Profile & Avatar System](#6-profile--avatar-system)
7. [Title & Badge System](#7-title--badge-system)
8. [Pet & Frame System](#8-pet--frame-system)
9. [Guild System](#9-guild-system)
10. [PvP / Duel System](#10-pvp--duel-system)
11. [Economy & Currency](#11-economy--currency)
12. [World Map System](#12-world-map-system)
13. [Notification System](#13-notification-system)
14. [Onboarding Flow](#14-onboarding-flow)
15. [Supabase Schema — ตาราง (ตรงกับ DB จริง)](#15-supabase-schema--ตาราง-ตรงกับ-db-จริง)
16. [Page Structure (Sitemap)](#16-page-structure-sitemap)
17. [Build Priority](#17-build-priority)
18. [Monetization](#18-monetization)
19. [City Social System](#19-city-social-system)
20. [Community Verify System](#20-community-verify-system)
21. [Database Functions & Triggers](#21-database-functions--triggers)
22. [Views](#22-views)
23. [supabase.js Helper Reference](#23-supabasejs-helper-reference)
24. [Auth Standard (บังคับ)](#24-auth-standard-บังคับ)
25. [Sidebar Badges Standard (บังคับ)](#25-sidebar-badges-standard-บังคับ)
26. [Guild System — ข้อควรระวัง](#26-guild-system--ข้อควรระวัง)
27. [PvP System — ข้อควรระวัง](#27-pvp-system--ข้อควรระวัง)
28. [Quest Submission Standard](#28-quest-submission-standard)
29. [Query Standard: .single() vs .maybeSingle()](#29-query-standard-single-vs-maybesingle)
30. [Cron Jobs — SQL ตั้งค่า pg_cron](#30-cron-jobs--sql-ตั้งค่า-pg_cron)

---

# 1. Overview & Concept

## แนวคิดหลัก
NEXUS LIFE คือ Real Life MMO — แอปที่เปลี่ยนกิจกรรมในชีวิตจริง (ออกกำลังกาย, อ่านหนังสือ, เดินทาง, ออมเงิน ฯลฯ) ให้กลายเป็น Quest ใน Game ได้รับ XP, Level Up, ปลดล็อค Title/Badge และแข่งกับผู้เล่นคนอื่นบน Leaderboard

## Core Loop
```
ทำกิจกรรมจริง → ส่งหลักฐาน → Community Verify → รับ XP + Stat → Level Up → ปลดล็อคของ → แข่ง Leaderboard → กลับไปทำกิจกรรมต่อ
```

## Tech Stack
- **Frontend:** HTML/CSS/JS (Vanilla หรือ React)
- **Backend/DB:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Client Library:** `@supabase/supabase-js@2` via CDN ESM
- **Storage:** Supabase Storage buckets: `nexuslife` (proofs), `nexuslife-avatars` (avatars)
- **Map:** Mapbox GL JS หรือ Leaflet.js
- **Hosting:** Vercel หรือ Netlify

## ไฟล์หลักของโปรเจกต์
| ไฟล์ | หน้าที่ |
|------|---------|
| `config.js` | เก็บ `SUPABASE_URL` และ `SUPABASE_ANON_KEY` |
| `supabase.js` | Supabase client + helper functions ทั้งหมด |

---

# 2. Class System

## 2.1 อาชีพทั้ง 6

| Class | สี | ธีม | Stat หลัก | DB value |
|-------|----|-----|-----------|----------|
| ⚔️ Warrior | #ff4444 | นักกีฬา, สายฟิต | 💪 STR | `warrior` |
| 🔮 Mage | #aa44ff | นักอ่าน, นักเรียน | 🧠 INT | `mage` |
| 🗺️ Explorer | #44ff88 | นักเดินทาง, สำรวจ | 🗺️ EXP | `explorer` |
| 💰 Merchant | #ffaa00 | สายธุรกิจ, การเงิน | 💼 BIZ | `merchant` |
| 🎨 Artist | #ff66aa | สร้างสรรค์, ศิลปะ | 🎨 CRE | `artist` |
| 🤝 Diplomat | #00ccff | สังคม, ผู้นำ | 🤝 SOC | `diplomat` |

> **DB constraint:** `users.class CHECK (class IN ('warrior','mage','explorer','merchant','artist','diplomat'))`

## 2.2 Class Bonus

### ⚔️ WARRIOR
- Quest ที่ได้ STR bonus x1.5: วิ่ง / ออกกำลังกาย / เดิน / กีฬา
- **Class Bonus:** XP จาก Physical Quest +15%
- **Class Skill (passive):** Grace Day — Streak ไม่ขาดแม้ข้ามวัน 1 ครั้ง/เดือน (`grace_day_used` field ใน users)

### 🔮 MAGE
- Quest ที่ได้ INT bonus x1.5: อ่านหนังสือ, เรียนคอร์ส, Quiz, Journal
- **Class Bonus:** XP จาก Knowledge Quest +15%
- **Class Skill (passive):** Bonus XP เมื่ออ่านหนังสือติดกัน 7 วัน (+20%)

### 🗺️ EXPLORER
- Quest ที่ได้ EXP bonus x1.5: Check-in, เดินทาง, ถ่ายรูปสถานที่
- **Class Bonus:** XP จาก Exploration Quest +15%
- **Class Skill (passive):** เป็นคนแรก Check-in สถานที่ใหม่ → `is_pioneer = true` ใน `checkins`

### 💰 MERCHANT
- Quest ที่ได้ BIZ bonus x1.5: ออมเงิน, networking, side income
- **Class Bonus:** XP จาก Business Quest +15%
- **Class Skill (passive):** ทุก 10,000 บาทที่ออม → Bonus XP พิเศษ

### 🎨 ARTIST
- Quest ที่ได้ CRE bonus x1.5: วาดรูป, เขียน, ถ่ายภาพ, ดนตรี, วิดีโอ
- **Class Bonus:** XP จาก Creative Quest +15%
- **Class Skill (passive):** ผลงานที่ได้ Like จากผู้เล่นอื่น → bonus XP

### 🤝 DIPLOMAT
- Quest ที่ได้ SOC bonus x1.5: ชวนเพื่อน, Guild Quest, Verify หลักฐาน, Chat
- **Class Bonus:** XP จาก Social Quest +15%
- **Class Skill (passive):** คนใน Guild ที่ชวนมา Level Up → bonus XP
- **Community Verify:** ได้ +SOC 5 pts ต่อครั้ง (class bonus ใน `cast_verification_vote`)

## 2.3 กฎการเลือก Class
- เลือกได้ 1 อาชีพตอน Onboarding
- เปลี่ยน Class ได้ทุก 90 วัน (ตรวจ `class_changed_at` ใน `users`)
- เปลี่ยนก่อนกำหนดด้วย **Class Change Ticket** (shop item, crystal_cost = 49)

---

# 3. Quest System

## 3.1 ประเภท Quest

| ประเภท | DB value | รีเซ็ต | XP | จำนวน/วัน |
|--------|----------|--------|-----|-----------|
| Daily Quest | `daily` | ทุกเที่ยงคืน | 50–150 XP | 3–5 |
| Weekly Quest | `weekly` | ทุกวันจันทร์ 00:00 | 300–800 XP | 3 |
| Challenge Quest | `challenge` | ไม่รีเซ็ต | 500–2000 XP | ไม่จำกัด |
| Guild Quest | `guild` | ทุก 3 วัน | 200–600 XP/คน | 1–2 |
| Story Quest | `story` | ไม่รีเซ็ต | 1000–5000 XP | ไม่จำกัด |

> **DB constraint:** `quests.type CHECK (type IN ('daily','weekly','challenge','guild','story'))`

## 3.2 ระบบส่งหลักฐาน (Proof System)

### ประเภทหลักฐาน
| ประเภท | DB value | วิธีตรวจ |
|--------|----------|---------|
| รูปภาพ | `image` | Community Verify (Section 20) |
| GPS Check-in | `gps` | **Auto approve ทันที** |
| Screenshot | `screenshot` | Community Verify |
| Text/Journal | `text` | **Auto approve ทันที** |
| Link URL | `url` | Auto check URL valid |

> **DB constraint:** `quests.proof_type CHECK (proof_type IN ('image','gps','screenshot','text','url'))`

### Logic ใน submitQuestProof() (supabase.js)
```javascript
const autoApprove = proofType === 'text' || proofType === 'gps'
status = autoApprove ? 'approved' : 'pending_review'
```

### status ของ user_quests
| status | DB value | ความหมาย |
|--------|----------|----------|
| กำลังทำ | `in_progress` | เริ่มแล้ว ยังไม่ส่ง |
| รอ verify | `pending_review` | ส่งหลักฐานแล้ว รอ community vote |
| ผ่าน | `approved` | ผ่านแล้ว (XP จะ grant) |
| ไม่ผ่าน | `rejected` | Community reject |

> **DB constraint:** `user_quests.status CHECK (status IN ('in_progress','pending_review','approved','rejected'))`

### กระบวนการ Community Verify
```
ส่งหลักฐาน (image/screenshot)
    ↓
status = 'pending_review'
    ↓
ผู้เล่นคนอื่นในเมือง Vote ผ่าน cast_verification_vote()
    ↓
approve_count ≥ 3 → status = 'approved' → XP เข้าอัตโนมัติ
reject_count ≥ 3  → status = 'rejected' → แจ้ง user
    ↓
ถ้า 3 ชม. ไม่ครบ → auto_approve_expired_verifications() จัดการ
```

### Anti-Cheat
- ห้าม vote ตัวเอง: `voter_id ≠ user_id ของ quest` (enforce ใน RLS + function)
- ห้าม vote ซ้ำ: `UNIQUE(user_quest_id, voter_id)` ใน `quest_verifications`
- รูป hash ซ้ำ → ไม่ผ่าน (ตรวจใน frontend ก่อน upload)

## 3.3 Quest Streak

| Streak | Bonus |
|--------|-------|
| 3 วันติด | +10% XP |
| 7 วันติด | +20% XP + Badge "Week Warrior" |
| 30 วันติด | +30% XP + Title ปลดล็อค |
| 100 วันติด | +50% XP + Title "The Unbreakable" + Frame |

> Fields: `users.streak_current`, `users.streak_longest`, `users.streak_last_date`, `users.grace_day_used`
> จัดการผ่าน DB function: `update_streak(p_user_id)`

---

# 4. XP / Level / Rank System

## 4.1 Level System

Level คำนวณจาก `users.xp_total` (ไม่รีเซ็ต)

| Level | XP สะสม | ชื่อ Level |
|-------|---------|-----------|
| 1 | 0 | Novice |
| 5 | 900 | Apprentice |
| 10 | 5,500 | Veteran |
| 20 | 30,000 | Expert |
| 30 | 90,000 | Master |
| 50 | 400,000 | Legend |

**สูตร:** `XP(n) = XP(n-1) + (n * 50) + (n^1.5 * 30)`

Rank update ผ่าน DB function: `update_user_rank(p_user_id)`

## 4.2 Rank System

Rank คำนวณจาก `users.xp_this_month` (รีเซ็ตทุกต้นเดือนผ่าน `reset_monthly_xp()`)

| Rank | XP เดือนนี้ | DB value | สี |
|------|------------|----------|-----|
| 🥉 BRONZE | 0–999 | `bronze` | #cd7f32 |
| 🥈 SILVER | 1,000–2,999 | `silver` | #c0c0c0 |
| 🥇 GOLD | 3,000–7,999 | `gold` | #ffd700 |
| 💎 PLATINUM | 8,000–14,999 | `platinum` | #00f5ff |
| 💠 DIAMOND | 15,000–39,999 | `diamond` | #b044ff |
| 👑 LEGENDARY | Top 100 | `legendary` | #ff9500 |

> **DB default:** `users.rank DEFAULT 'bronze'`

## 4.3 XP Sources

| แหล่ง XP | จำนวน |
|----------|-------|
| Daily Quest | 50–150 XP |
| Weekly Quest | 300–800 XP |
| Challenge Quest | 500–2,000 XP |
| Guild Quest | 200–600 XP |
| Story Quest | 1,000–5,000 XP |
| Community Verify (vote) | 10 XP/ครั้ง |
| Vote ตรงกับ majority | +5 XP bonus |
| Streak Bonus | +10–50% |
| Class Bonus | +15% |
| Referral | 200 XP |
| First Check-in สถานที่ใหม่ | 100 XP bonus |

---

# 5. Stat System (6 ด้าน)

## 5.1 ค่า Stat ทั้ง 6

| Stat | Icon | DB column | Class หลัก | ได้จาก |
|------|------|-----------|-----------|--------|
| STR | 💪 | `str_points` | warrior | ออกกำลังกาย, วิ่ง |
| INT | 🧠 | `int_points` | mage | อ่านหนังสือ, เรียน |
| EXP | 🗺️ | `exp_points` | explorer | Check-in, เดินทาง |
| BIZ | 💼 | `biz_points` | merchant | ออม, networking |
| CRE | 🎨 | `cre_points` | artist | ผลงาน, เขียน |
| SOC | 🤝 | `soc_points` | diplomat | ชวนเพื่อน, verify, chat |

> ทั้งหมดอยู่ใน table `user_stats`, auto-created ผ่าน trigger `create_user_stats_on_insert`

## 5.2 การ update Stat

- ผ่าน DB function `increment_stat(p_user_id, p_stat_type, p_amount)`
- ใน `cast_verification_vote()`: Diplomat ได้ +5 SOC, class อื่นได้ +2 SOC
- `quests.stat_type` กำหนด stat ที่จะได้
- `quests.stat_points` กำหนดจำนวน points
- Class bonus x1.5 คำนวณใน `cast_verification_vote()` function

> **DB constraint:** `quests.stat_type CHECK (stat_type IN ('str','int','exp','biz','cre','soc'))`

---

# 6. Profile & Avatar System

## 6.1 โครงสร้าง users table (fields ครบ)

```
users
├── id (uuid, PK, references auth.users)
├── username (text, unique, NOT NULL)
├── display_name (text)
├── email (text)
├── class (text) — warrior/mage/explorer/merchant/artist/diplomat
├── level (integer, default 1)
├── xp_total (integer, default 0)
├── xp_this_month (integer, default 0)
├── rank (text, default 'bronze')
├── gold (integer, default 0)
├── crystal (integer, default 0)
├── avatar_seed (text)          ← ⚠️ ไม่ใช่ avatar_config jsonb
├── equipped_title_id (integer)
├── equipped_frame_id (integer)
├── equipped_pet_id (integer)
├── signature (text)
├── status_text (text)
├── status_emoji (text)
├── profile_public (boolean, default true)
├── stats_public (boolean, default true)
├── feed_public (boolean, default true)
├── location_public (boolean, default true)
├── streak_current (integer, default 0)
├── streak_longest (integer, default 0)
├── streak_last_date (date)
├── grace_day_used (boolean, default false)
├── class_changed_at (timestamp)
├── pvp_win_streak (integer, default 0)
├── followers_count (integer, default 0)
├── following_count (integer, default 0)
├── city (text, default 'กรุงเทพมหานคร')
├── last_lat (numeric)
├── last_lng (numeric)
├── map_visible (boolean, default true)
├── location_updated_at (timestamp)
└── created_at (timestamp, default now())
```

## 6.2 Avatar System

- ใช้ **`avatar_seed`** (text) — string สำหรับ generate Pixel Avatar แบบ deterministic
- render เป็น SVG หรือ Canvas 64x64 px จาก seed
- เปลี่ยน seed ได้ใน Profile Settings
- อัพโหลดไฟล์ได้ผ่าน `uploadAvatar(userId, file)` → bucket `nexuslife-avatars`

> **⚠️ สำคัญ:** ทุกที่ใน frontend ที่ดึง user ต้อง select `avatar_seed` ไม่ใช่ `avatar_config`

## 6.3 Privacy Settings

| ข้อมูล | Field | ตัวเลือก |
|--------|-------|---------|
| โปรไฟล์ | `profile_public` | true/false |
| Stat | `stats_public` | true/false |
| Activity Feed | `feed_public` | true/false |
| Location | `location_public` | true/false |
| Map | `map_visible` | true/false |

---

# 7. Title & Badge System

## 7.1 titles table

```
titles
├── id (serial, PK)
├── name (text, NOT NULL)
├── description (text)
├── icon (text)           ← emoji หรือ icon class
└── category (text)       — physical/knowledge/exploration/business/creative/social/special
```

> **DB constraint:** `titles.category CHECK (category IN ('physical','knowledge','exploration','business','creative','social','special'))`
> **⚠️ หมายเหตุ:** ไม่มี `unlock_criteria` column ใน DB — logic ปลดล็อคทำใน frontend/function

## 7.2 user_titles table

```
user_titles
├── id (serial, PK)
├── user_id (uuid)
├── title_id (integer)
├── unlocked_at (timestamp)
├── is_equipped (boolean, default false)
└── UNIQUE(user_id, title_id)
```

เปลี่ยน title ที่ใส่ผ่าน `equipTitle(userId, titleId)` ใน supabase.js

## 7.3 badges table

```
badges
├── id (serial, PK)
├── name (text, NOT NULL)
├── description (text)
├── icon (text)           ← ⚠️ ไม่ใช่ icon_url
├── category (text)
└── rarity (text, default 'common') — common/rare/epic/legendary
```

> **⚠️ หมายเหตุ:** ไม่มี `unlock_condition` jsonb ใน DB — logic ปลดล็อคทำใน frontend/function

## 7.4 user_badges table

```
user_badges
├── id (serial, PK)
├── user_id (uuid)
├── badge_id (integer)
├── unlocked_at (timestamp)
└── UNIQUE(user_id, badge_id)
```

---

# 8. Pet & Frame System

## 8.1 pets table ✅ (มีใน DB แล้ว)

```
pets
├── id (serial, PK)
├── name (text, NOT NULL)
├── emoji (text)
├── sprite_url (text)
├── unlock_condition (jsonb)
├── rarity (text, default 'common')
├── gold_cost (integer, default 0)
└── crystal_cost (integer, default 0)
```

## 8.2 user_pets table ✅ (มีใน DB แล้ว)

```
user_pets
├── id (serial, PK)
├── user_id (uuid)
├── pet_id (integer)
├── unlocked_at (timestamp)
└── is_equipped (boolean, default false)
```

> ใส่/ถอด pet ผ่าน `users.equipped_pet_id`

## 8.3 profile_frames table ✅ (มีใน DB แล้ว)

```
profile_frames
├── id (serial, PK)
├── name (text, NOT NULL)
├── css_class (text)
├── unlock_condition (jsonb)
└── rarity (text, default 'common')
```

> ใส่/ถอด frame ผ่าน `users.equipped_frame_id`

---

# 9. Guild System

## 9.1 guilds table

```
guilds
├── id (serial, PK)
├── name (text, unique, NOT NULL)
├── tag (text, NOT NULL)
├── description (text)
├── master_id (uuid)
├── guild_xp (integer, default 0)
├── guild_level (integer, default 1)
├── member_limit (integer, default 30)
├── is_public (boolean, default true)
├── city (text)
├── metadata (jsonb)      ← เก็บ icon_url และข้อมูลเสริม
└── created_at (timestamp)
```

> **⚠️ หมายเหตุ:** ไม่มี `icon_url` column แยก — เก็บใน `metadata` jsonb เช่น `{ "icon_url": "..." }`

## 9.2 guild_members table

```
guild_members
├── id (serial, PK)
├── guild_id (integer)
├── user_id (uuid)
├── role (text, default 'member') — master/officer/member
├── joined_at (timestamp)
└── UNIQUE(user_id)             ← user อยู่ได้แค่ 1 guild
```

## 9.3 guild_quests table ✅ (มีใน DB แล้ว)

```
guild_quests
├── id (serial, PK)
├── guild_id (integer)
├── quest_id (integer)
├── target_value (integer)
├── current_value (integer, default 0)
├── status (text, default 'active') — active/completed/expired
├── expires_at (timestamp)
└── created_at (timestamp)
```

> Guild Quest ของ guild ที่กำลังดำเนินอยู่ — track progress รวมของสมาชิกในกิลด์

## 9.4 guild_wars table ✅ (มีใน DB แล้ว)

```
guild_wars
├── id (serial, PK)
├── guild1_id (integer)
├── guild2_id (integer)
├── guild1_xp (integer, default 0)
├── guild2_xp (integer, default 0)
├── winner_guild_id (integer)
├── status (text, default 'pending') — pending/active/completed
├── starts_at (timestamp, default now())
├── ends_at (timestamp, NOT NULL)
└── created_at (timestamp)
```

## 9.5 territories table ✅ (มีใน DB แล้ว)

```
territories
├── id (serial, PK)
├── city (text, NOT NULL, unique)
├── province (text)
├── controlling_guild_id (integer)
├── guild_xp_this_week (integer, default 0)
└── updated_at (timestamp)
```

> Guild ที่มี Guild XP มากที่สุดในเมือง = ครอง Territory → ได้ Bonus XP +10% สำหรับ Quest ในเมืองนั้น

---

# 10. PvP / Duel System

## 10.1 pvp_duels table

```
pvp_duels
├── id (uuid, PK, gen_random_uuid())
├── challenger_id (uuid)
├── defender_id (uuid)        ← ⚠️ ไม่ใช่ opponent_id
├── status (text, default 'pending') — pending/active/completed/declined
├── duel_type (text, default '1v1')
├── challenger_xp (integer, default 0)
├── defender_xp (integer, default 0)
├── winner_id (uuid)
├── expires_at (timestamp)
├── started_at (timestamp)
├── completed_at (timestamp)
└── created_at (timestamp)
```

> **⚠️ Critical:** ต้องใช้ `defender_id` ทุกที่ใน frontend — ถ้าใช้ `opponent_id` จะ error

> จัดการผ่าน DB functions: `resolve_pvp_duel()`, `complete_duel()`
> Trigger: `update_duel_xp_on_quest_complete` — อัพเดต challenger/defender XP อัตโนมัติเมื่อทำ Quest สำเร็จ

## 10.2 โหมด PvP

### 1v1 Duel
- ท้าได้กับทุกคน (แนะนำ Level ใกล้เคียง ±5)
- เวลา: 24 ชั่วโมง
- แพ้/ชนะด้วย: XP ที่ได้ในช่วง 24 ชม. (นับจาก `challenger_xp` vs `defender_xp`)
- Trigger `update_duel_xp_on_quest_complete` อัพเดตอัตโนมัติ

### Monthly Tournament
- ตาราง `tournament_participants`
- เปิดทุกต้นเดือน
- รางวัล: Title "Champion", Trophy Frame, Bonus Gold

## 10.3 tournament_participants table

```
tournament_participants
├── id (serial, PK)
├── user_id (uuid)
├── tournament_month (text, NOT NULL)  ← format: 'YYYY-MM'
├── score (integer, default 0)
├── placement (integer)
└── registered_at (timestamp)
```

---

# 11. Economy & Currency

## 11.1 ประเภท Currency

| Currency | Field | ได้จาก | ใช้ซื้อ |
|----------|-------|--------|--------|
| ⭐ Gold | `users.gold` | Quest, Achievement, Level Up | Item cosmetic, Class Change |
| 💎 Crystal | `users.crystal` | Rank Reward, Tournament, ซื้อด้วยเงิน | Premium item, Booster |

## 11.2 wallet table

```
wallet
├── id (serial, PK)
├── user_id (uuid, unique)
├── balance_thb (integer, default 0)
├── crystal_purchased (integer, default 0)   ← Crystal ที่ซื้อด้วยเงินจริง lifetime
├── crystal_spent (integer, default 0)       ← Crystal ที่ใช้ไปแล้ว lifetime
└── updated_at (timestamp)
```

> Auto-created ผ่าน trigger `create_wallet_on_insert` เมื่อ user ใหม่สมัคร

## 11.3 transactions table

```
transactions
├── id (serial, PK)
├── user_id (uuid)
├── type (text, NOT NULL) — topup/spend/gift/refund/bonus
├── amount_thb (integer)
├── crystal_amount (integer, NOT NULL)
├── payment_method (text) — promptpay/truemoney/manual
├── slip_url (text)
├── slip_hash (text)
├── status (text, default 'pending') — pending/completed/failed/refunded
├── note (text)
├── admin_verified_by (uuid)
├── verified_at (timestamp)
└── created_at (timestamp)
```

## 11.4 shop_items table

```
shop_items
├── id (serial, PK)
├── name (text, NOT NULL)
├── description (text)
├── category (text) — frame/avatar/pet/booster/utility/season_pass/bundle/limited
├── crystal_cost (integer, NOT NULL)
├── is_consumable (boolean, default false)
├── duration_hours (integer)
├── is_limited (boolean, default false)
├── available_until (timestamp)
├── is_active (boolean, default true)
├── metadata (jsonb)   ← { css_class, item_type, item_id, multiplier, etc. }
└── created_at (timestamp)
```

## 11.5 user_purchases table

```
user_purchases
├── id (serial, PK)
├── user_id (uuid)
├── item_id (integer)
├── transaction_id (integer)
├── crystal_spent (integer, NOT NULL)
├── purchased_at (timestamp)
├── expires_at (timestamp)    ← null = ไม่หมดอายุ
└── is_active (boolean, default true)
```

## 11.6 Top-up Flow (Manual Phase 1)

```
/topup.html → เลือกจำนวน → แสดง QR PromptPay
    ↓
createTopupTransaction(userId, amountThb, slipUrl, slipHash) → status: 'pending'
    ↓
Admin เห็นใน /admin/transactions.html
    ↓
confirm_topup(p_transaction_id, p_admin_id) → เติม Crystal + notification
```

### อัตราแลกเปลี่ยน (คำนวณใน confirm_topup function)
| ซื้อ (บาท) | Crystal | Bonus |
|-----------|---------|-------|
| < 100 ฿ | ตาม amount_thb | — |
| 100–299 ฿ | x1.10 | +10% |
| 300–499 ฿ | x1.15 | +15% |
| ≥ 500 ฿ | x1.20 | +20% |

---

# 12. World Map System

## 12.1 checkins table

```
checkins
├── id (serial, PK)
├── user_id (uuid)
├── place_name (text)
├── latitude (numeric)
├── longitude (numeric)
├── city (text)
├── province (text)
├── district (text)
├── is_pioneer (boolean, default false)
└── created_at (timestamp)
```

## 12.2 Location fields ใน users

```
users
├── last_lat (numeric)
├── last_lng (numeric)
├── map_visible (boolean, default true)
└── location_updated_at (timestamp)
```

## 12.3 Privacy
- แสดงเฉพาะ "เขตอำเภอ" ไม่แสดง exact GPS
- ปิดได้ด้วย `map_visible = false` หรือ `location_public = false`

---

# 13. Notification System

## 13.1 notifications table

```
notifications
├── id (serial, PK)
├── user_id (uuid)
├── title (text)
├── body (text)
├── is_read (boolean, default false)
└── created_at (timestamp)
```

## 13.2 Realtime Subscription

```javascript
subscribeNotifications(userId, callback)
// Subscribe postgres_changes INSERT on notifications WHERE user_id = userId
```

## 13.3 Helper functions ใน supabase.js

| Function | หน้าที่ |
|----------|---------|
| `getNotifications(userId, limit)` | ดึง notifications |
| `getUnreadCount(userId)` | นับที่ยังไม่อ่าน |
| `markNotificationRead(id)` | mark อ่านแล้ว |
| `markAllNotificationsRead(userId)` | mark ทั้งหมด |

---

# 14. Onboarding Flow

```
1. index.html (Landing)
   ↓
2. register.html — signUp(email, password)
   ↓
3. ตั้งชื่อ username (unique, 3–20 ตัว)
   ↓
4. เลือก Class → บันทึก users.class
   ↓
5. สร้าง Pixel Avatar → บันทึก users.avatar_seed
   ↓
6. Tutorial Quest แรก (ตาม class)
   ↓
7. รับ XP แรก → เห็น Level Bar เคลื่อน
   ↓
8. แนะนำให้ Join Guild
   ↓
9. dashboard.html
```

> **Auth Guard:** ใช้ `requireAuth()` ทุกหน้าที่ต้อง login
> **Redirect ถ้า login แล้ว:** ใช้ `redirectIfLoggedIn()` ที่หน้า login/register

---

# 15. Supabase Schema — ตาราง (ตรงกับ DB จริง)

## ตารางทั้งหมดที่มีใน DB ✅ (34 tables)

| ตาราง | จำนวน col | หมายเหตุ |
|-------|-----------|---------|
| `users` | 37 | ตารางหลัก |
| `user_stats` | 9 | Auto-create via trigger |
| `quests` | 12 | Quest master data |
| `user_quests` | 15 | Quest ที่ user กำลังทำ/ทำแล้ว |
| `quest_verifications` | 5 | Community vote |
| `badges` | 7 | Badge master data |
| `user_badges` | 4 | Badge ที่ user ปลดล็อค |
| `titles` | 6 | Title master data |
| `user_titles` | 5 | Title ที่ user มี |
| `pets` | 8 | Pet master data ✅ |
| `user_pets` | 5 | Pet ที่ user มี ✅ |
| `profile_frames` | 5 | Frame catalog ✅ |
| `guilds` | 11 | Guild data |
| `guild_members` | 5 | สมาชิก Guild |
| `guild_quests` | 8 | Guild Quest ที่กำลังดำเนินอยู่ ✅ |
| `guild_wars` | 10 | Guild War events ✅ |
| `territories` | 6 | Guild territory ต่อเมือง ✅ |
| `pvp_duels` | 12 | PvP duel records |
| `tournament_participants` | 6 | Monthly tournament |
| `checkins` | 10 | Location check-in |
| `activity_feed` | 5 | Activity log |
| `notifications` | 6 | User notifications |
| `messages` | 5 | Chat messages |
| `social_follows` | 4 | Follow/unfollow |
| `city_reputation` | 8 | User reputation per city |
| `city_stats` | 9 | City prosperity system ✅ |
| `city_projects` | 12 | Weekly city projects ✅ |
| `city_project_contributions` | 5 | User contributions to projects ✅ |
| `city_wars` | 9 | City vs city events ✅ |
| `city_war_participants` | 5 | ผู้เข้าร่วม City War ✅ |
| `neighborhood_requests` | 10 | คำขอความช่วยเหลือในชุมชน ✅ |
| `wallet` | 6 | Wallet (auto-create via trigger) |
| `transactions` | 13 | Top-up transactions |
| `shop_items` | 12 | Shop catalog |
| `user_purchases` | 8 | Purchase history |

## Views ที่มีใน DB ✅

| View | สถานะ | ใช้งาน |
|------|-------|--------|
| `leaderboard_monthly` | ✅ มีแล้ว | `getLeaderboard()` |
| `social_feed_view` | ✅ มีแล้ว | `getSocialFeed()`, `getFollowingFeed()` |

---

## SQL ตารางทั้งหมด (Reference)

```sql
-- USERS
create table users (
  id uuid primary key references auth.users(id),
  username text unique not null,
  display_name text,
  email text,
  class text check (class in ('warrior','mage','explorer','merchant','artist','diplomat')),
  level integer default 1,
  xp_total integer default 0,
  xp_this_month integer default 0,
  rank text default 'bronze',
  gold integer default 0,
  crystal integer default 0,
  avatar_seed text,
  equipped_title_id integer,
  equipped_frame_id integer,
  equipped_pet_id integer,
  signature text,
  status_text text,
  status_emoji text,
  profile_public boolean default true,
  stats_public boolean default true,
  feed_public boolean default true,
  location_public boolean default true,
  streak_current integer default 0,
  streak_longest integer default 0,
  streak_last_date date,
  grace_day_used boolean default false,
  class_changed_at timestamp,
  pvp_win_streak integer default 0,
  followers_count integer default 0,
  following_count integer default 0,
  city text default 'กรุงเทพมหานคร',
  last_lat numeric,
  last_lng numeric,
  map_visible boolean default true,
  location_updated_at timestamp,
  created_at timestamp default now()
);

-- USER STATS (auto-created via trigger)
create table user_stats (
  id serial primary key,
  user_id uuid references users(id),
  str_points integer default 0,
  int_points integer default 0,
  exp_points integer default 0,
  biz_points integer default 0,
  cre_points integer default 0,
  soc_points integer default 0,
  updated_at timestamp default now()
);

-- QUESTS
create table quests (
  id serial primary key,
  title text not null,
  description text,
  type text check (type in ('daily','weekly','challenge','guild','story')),
  class_target text,
  xp_reward integer not null default 50,
  gold_reward integer default 10,
  stat_type text check (stat_type in ('str','int','exp','biz','cre','soc')),
  stat_points integer default 10,
  proof_type text check (proof_type in ('image','gps','screenshot','text','url')),
  is_active boolean default true,
  created_at timestamp default now()
);

-- USER QUESTS
create table user_quests (
  id serial primary key,
  user_id uuid references users(id),
  quest_id integer references quests(id),
  status text check (status in ('in_progress','pending_review','approved','rejected')) default 'in_progress',
  proof_url text,
  proof_text text,
  submitted_at timestamp,
  reviewed_at timestamp,
  reviewer_ids uuid[] default '{}',
  approve_count integer default 0,
  reject_count integer default 0,
  xp_granted boolean default false,
  created_at timestamp default now()
);

-- QUEST VERIFICATIONS
create table quest_verifications (
  id serial primary key,
  user_quest_id integer references user_quests(id) on delete cascade,
  voter_id uuid references users(id) on delete cascade,
  vote text check (vote in ('approve','reject')) not null,
  created_at timestamp default now(),
  unique(user_quest_id, voter_id)
);

-- TITLES
create table titles (
  id serial primary key,
  name text not null,
  description text,
  icon text,
  category text check (category in ('physical','knowledge','exploration','business','creative','social','special'))
);

-- USER TITLES
create table user_titles (
  id serial primary key,
  user_id uuid references users(id),
  title_id integer references titles(id),
  unlocked_at timestamp default now(),
  is_equipped boolean default false,
  unique(user_id, title_id)
);

-- BADGES
create table badges (
  id serial primary key,
  name text not null,
  description text,
  icon text,
  category text,
  rarity text default 'common' check (rarity in ('common','rare','epic','legendary'))
);

-- USER BADGES
create table user_badges (
  id serial primary key,
  user_id uuid references users(id),
  badge_id integer references badges(id),
  unlocked_at timestamp default now(),
  unique(user_id, badge_id)
);

-- PETS
create table pets (
  id serial primary key,
  name text not null,
  emoji text,
  sprite_url text,
  unlock_condition jsonb,
  rarity text default 'common',
  gold_cost integer default 0,
  crystal_cost integer default 0
);

-- USER PETS
create table user_pets (
  id serial primary key,
  user_id uuid references users(id),
  pet_id integer references pets(id),
  unlocked_at timestamp default now(),
  is_equipped boolean default false
);

-- PROFILE FRAMES
create table profile_frames (
  id serial primary key,
  name text not null,
  css_class text,
  unlock_condition jsonb,
  rarity text default 'common'
);

-- GUILDS
create table guilds (
  id serial primary key,
  name text unique not null,
  tag text not null,
  description text,
  master_id uuid references users(id),
  guild_xp integer default 0,
  guild_level integer default 1,
  member_limit integer default 30,
  is_public boolean default true,
  city text,
  metadata jsonb,
  created_at timestamp default now()
);

-- GUILD MEMBERS
create table guild_members (
  id serial primary key,
  guild_id integer references guilds(id),
  user_id uuid references users(id),
  role text default 'member' check (role in ('master','officer','member')),
  joined_at timestamp default now(),
  unique(user_id)
);

-- GUILD QUESTS
create table guild_quests (
  id serial primary key,
  guild_id integer references guilds(id),
  quest_id integer references quests(id),
  target_value integer,
  current_value integer default 0,
  status text default 'active' check (status in ('active','completed','expired')),
  expires_at timestamp,
  created_at timestamp default now()
);

-- GUILD WARS
create table guild_wars (
  id serial primary key,
  guild1_id integer references guilds(id),
  guild2_id integer references guilds(id),
  guild1_xp integer default 0,
  guild2_xp integer default 0,
  winner_guild_id integer references guilds(id),
  status text default 'pending' check (status in ('pending','active','completed')),
  starts_at timestamp default now(),
  ends_at timestamp not null,
  created_at timestamp default now()
);

-- TERRITORIES
create table territories (
  id serial primary key,
  city text unique not null,
  province text,
  controlling_guild_id integer references guilds(id),
  guild_xp_this_week integer default 0,
  updated_at timestamp default now()
);

-- PVP DUELS
create table pvp_duels (
  id uuid primary key default gen_random_uuid(),
  challenger_id uuid references users(id),
  defender_id uuid references users(id),
  status text default 'pending' check (status in ('pending','active','completed','declined')),
  duel_type text default '1v1',
  challenger_xp integer default 0,
  defender_xp integer default 0,
  winner_id uuid references users(id),
  expires_at timestamp,
  started_at timestamp,
  completed_at timestamp,
  created_at timestamp default now()
);

-- TOURNAMENT PARTICIPANTS
create table tournament_participants (
  id serial primary key,
  user_id uuid references users(id),
  tournament_month text not null,
  score integer default 0,
  placement integer,
  registered_at timestamp default now()
);

-- CHECKINS
create table checkins (
  id serial primary key,
  user_id uuid references users(id),
  place_name text,
  latitude numeric,
  longitude numeric,
  city text,
  province text,
  district text,
  is_pioneer boolean default false,
  created_at timestamp default now()
);

-- ACTIVITY FEED
create table activity_feed (
  id serial primary key,
  user_id uuid references users(id),
  type text,
  data jsonb,
  created_at timestamp default now()
);

-- NOTIFICATIONS
create table notifications (
  id serial primary key,
  user_id uuid references users(id),
  title text,
  body text,
  is_read boolean default false,
  created_at timestamp default now()
);

-- MESSAGES
create table messages (
  id serial primary key,
  sender_id uuid references users(id),
  channel text not null,
  content text not null,
  created_at timestamp default now()
);

-- SOCIAL FOLLOWS
create table social_follows (
  id serial primary key,
  follower_id uuid references users(id),
  following_id uuid references users(id),
  created_at timestamp default now(),
  unique(follower_id, following_id)
);

-- CITY REPUTATION
create table city_reputation (
  id serial primary key,
  user_id uuid references users(id),
  city_name text references city_stats(city_name),
  reputation_score integer default 0,
  is_council_member boolean default false,
  is_mayor boolean default false,
  last_decay_date date,
  updated_at timestamp default now()
);

-- CITY STATS
create table city_stats (
  city_name text primary key,
  province text,
  population integer default 0,
  prosperity_level integer default 1,
  xp_contributed_weekly integer default 0,
  xp_threshold_next integer default 1000,
  city_streak_days integer default 0,
  active_buffs jsonb default '{"xp_bonus": 0.05}',
  last_updated timestamp default now()
);

-- CITY PROJECTS
create table city_projects (
  id serial primary key,
  city_name text references city_stats(city_name),
  title text not null,
  description text,
  target_type text default 'xp',
  target_value integer not null,
  current_value integer default 0,
  reward_crystal integer default 20,
  reward_badge_id integer references badges(id),
  status text default 'active',
  starts_at timestamp default now(),
  ends_at timestamp not null,
  created_at timestamp default now()
);

-- CITY PROJECT CONTRIBUTIONS
create table city_project_contributions (
  id serial primary key,
  project_id integer references city_projects(id),
  user_id uuid references users(id),
  contribution_value integer default 0,
  updated_at timestamp default now()
);

-- CITY WARS
create table city_wars (
  id serial primary key,
  city_a text references city_stats(city_name),
  city_b text references city_stats(city_name),
  city_a_xp integer default 0,
  city_b_xp integer default 0,
  winner_city text,
  status text default 'upcoming' check (status in ('upcoming','active','completed')),
  starts_at timestamp not null,
  ends_at timestamp not null,
  created_at timestamp default now()
);

-- CITY WAR PARTICIPANTS
create table city_war_participants (
  id serial primary key,
  war_id integer references city_wars(id),
  user_id uuid references users(id),
  city_name text references city_stats(city_name),
  xp_contributed integer default 0
);

-- NEIGHBORHOOD REQUESTS
create table neighborhood_requests (
  id serial primary key,
  user_id uuid references users(id),
  city_name text references city_stats(city_name),
  request_type text default 'general',
  title text not null,
  body text,
  status text default 'open',
  helper_id uuid references users(id),
  expires_at timestamp default (now() + interval '24 hours'),
  created_at timestamp default now()
);

-- WALLET (auto-created via trigger)
create table wallet (
  id serial primary key,
  user_id uuid unique references users(id),
  balance_thb integer default 0,
  crystal_purchased integer default 0,
  crystal_spent integer default 0,
  updated_at timestamp default now()
);

-- TRANSACTIONS
create table transactions (
  id serial primary key,
  user_id uuid references users(id),
  type text not null check (type in ('topup','spend','gift','refund','bonus')),
  amount_thb integer,
  crystal_amount integer not null,
  payment_method text check (payment_method in ('promptpay','truemoney','manual')),
  slip_url text,
  slip_hash text,
  status text default 'pending' check (status in ('pending','completed','failed','refunded')),
  note text,
  admin_verified_by uuid references users(id),
  verified_at timestamp,
  created_at timestamp default now()
);

-- SHOP ITEMS
create table shop_items (
  id serial primary key,
  name text not null,
  description text,
  category text check (category in ('frame','avatar','pet','booster','utility','season_pass','bundle','limited')),
  crystal_cost integer not null,
  is_consumable boolean default false,
  duration_hours integer,
  is_limited boolean default false,
  available_until timestamp,
  is_active boolean default true,
  metadata jsonb,
  created_at timestamp default now()
);

-- USER PURCHASES
create table user_purchases (
  id serial primary key,
  user_id uuid references users(id),
  item_id integer references shop_items(id),
  transaction_id integer references transactions(id),
  crystal_spent integer not null,
  purchased_at timestamp default now(),
  expires_at timestamp,
  is_active boolean default true
);
```

---

# 16. Page Structure (Sitemap)

## ✅ ไฟล์ที่มีแล้ว
| ไฟล์ | สถานะ |
|------|-------|
| `index.html` | ✅ |
| `login.html` | ✅ |
| `register.html` | ✅ |
| `dashboard.html` | ✅ |
| `config.js` | ✅ |
| `supabase.js` | ✅ |

## 🔨 ต้องสร้างต่อ (เรียงตาม Priority)

| ลำดับ | ไฟล์ | Phase | หมายเหตุ |
|-------|------|-------|---------|
| 1 | `feed.html` | 1 | Social Feed — ใช้ `social_feed_view` ✅ |
| 2 | `quests.html` | 1 | Quest list + ส่งหลักฐาน |
| 3 | `city.html` | 1 | City Dashboard + Reputation + Projects |
| 4 | `profile.html` | 2 | Profile สาธารณะ |
| 5 | `profile/me.html` | 2 | Profile ตัวเอง + edit |
| 6 | `profile/settings.html` | 2 | ตั้งค่า Avatar/Privacy |
| 7 | `leaderboard.html` | 2 | ใช้ `leaderboard_monthly` view ✅ |
| 8 | `notifications.html` | 2 | ประวัติ notification |
| 9 | `verify.html` | 2 | Community Verify Queue |
| 10 | `achievements.html` | 2 | Title + Badge + Pet + Frame collection |
| 11 | `shop.html` | 3 | ร้านค้า Crystal |
| 12 | `wallet.html` | 3 | กระเป๋าเงิน + ประวัติ |
| 13 | `topup.html` | 3 | เติมเงิน QR + อัปสลิป |
| 14 | `map.html` | 3 | World Map + Check-in (Leaflet.js) |
| 15 | `guild.html` | 3 | รายชื่อ Guild ทั้งหมด |
| 16 | `guild/[id].html` | 3 | Guild Page + Chat + Guild Quest |
| 17 | `guild/create.html` | 3 | สร้าง Guild |
| 18 | `pvp.html` | 3 | PvP Duel |
| 19 | `neighborhood.html` | 3 | Neighborhood Requests |
| 20 | `admin/transactions.html` | 3 | Admin ยืนยันสลิป |

---

# 17. Build Priority

## Phase 1 — Core (2–3 สัปดาห์)
1. Auth: login + register + onboarding (class + avatar_seed)
2. `dashboard.html` — Quest วันนี้ + XP Bar + Level
3. Quest ส่งหลักฐาน (image upload + text)
4. Streak System (`update_streak`)
5. `feed.html` — Social Feed (city-based) — ใช้ `social_feed_view` ✅

## Phase 2 — Profile & Social (1–2 สัปดาห์)
6. `profile.html` + `profile/me.html`
7. Title + Badge + Pet + Frame System
8. Stat Bar (6 ด้าน)
9. `verify.html` — Community Verify
10. `leaderboard.html` — ใช้ `leaderboard_monthly` ✅
11. `notifications.html`

## Phase 3 — Guild, PvP & Commerce (2–3 สัปดาห์)
12. Guild System (สร้าง, เข้าร่วม, Guild Quest, Guild War)
13. Territories — แสดง Guild ที่ครองเมือง
14. PvP Duel (ใช้ `defender_id`)
15. Shop + Wallet + Topup + Admin transactions
16. World Map + Check-in
17. Neighborhood Requests

## Phase 4 — City System & Events (ongoing)
18. City Stats + City Projects + Contributions
19. City War (`city_wars`, `city_war_participants`)
20. City Buff + Prosperity (`update_city_prosperity`)
21. Monthly Tournament (`tournament_participants`)

---

# 18. Monetization

## 18.1 หลักการ
- Free-to-Play + Optional Premium
- Crystal ได้จาก gameplay (ฟรี) + ซื้อด้วยเงินจริง
- Gold ได้จาก gameplay เท่านั้น

## 18.2 สินค้าใน Shop (category ใน DB)

| category | ตัวอย่างสินค้า | crystal_cost |
|----------|-------------|-------------|
| `frame` | Neon Frame, Gold Elite Frame | 49–99 |
| `avatar` | Rainbow Title Color, Emoji Pack | 29–49 |
| `pet` | Mini Dragon, Space Cat | 69 |
| `booster` | XP Booster 2x (24h) | 19 |
| `utility` | Streak Shield, Class Change Ticket, Name Change | 15–59 |
| `season_pass` | Season Pass Standard (30d), Premium (30d) | 149–299 |
| `bundle` | Founder Pack | 199 |
| `limited` | Event Frame (Songkran, New Year) | 49–99 |

> Metadata jsonb ตัวอย่าง: `{"css_class":"frame-neon"}`, `{"type":"streak_shield","uses":1}`, `{"multiplier":2,"stat":"xp"}`

---

# 19. City Social System

## 19.1 ตารางที่มีใน DB ✅ (ทั้งหมดพร้อมใช้)

### city_stats ✅
- เก็บข้อมูล prosperity, population, active_buffs ต่อเมือง
- `city_name` เป็น PK — FK จากหลายตาราง (`city_reputation`, `city_projects`, `city_wars`, `neighborhood_requests`)
- `update_city_prosperity(p_city_name)` — คำนวณ prosperity จาก xp สะสม

### city_projects ✅
- โปรเจกต์ประจำสัปดาห์ของเมือง — ร่วมกัน contribute XP/Gold
- `city_project_contributions` เก็บ contribution ของแต่ละ user
- เมื่อ `current_value >= target_value` → reward crystal + badge ให้ผู้ร่วม

### city_wars ✅
- เมือง A vs เมือง B — แข่ง XP สะสมในช่วงเวลาที่กำหนด
- `city_war_participants` เก็บ XP ที่แต่ละ user contribute ใน war
- winner city ได้ buff พิเศษ

### city_reputation ✅
- User มีคะแนน reputation ต่อเมือง
- `add_city_reputation(p_user_id, p_city_name, p_amount)` — function พร้อมใช้
- `is_council_member`, `is_mayor` — ระบบตำแหน่งในเมือง

### neighborhood_requests ✅
- คำขอความช่วยเหลือในชุมชน — เปิด 3 ชม.
- `request_type`: general / urgent / skill_share / etc.
- `helper_id` — user ที่รับงาน

### social_follows ✅
- `follow_user()`, `unfollow_user()` — DB functions พร้อมใช้
- `users.followers_count` และ `following_count` อัพเดตผ่าน functions

### activity_feed ✅
- ดึงผ่าน `social_feed_view` — **พร้อมใช้งานแล้ว**

## 19.2 supabase.js helpers ที่เกี่ยวข้อง

| Function | หน้าที่ | สถานะ |
|----------|---------|-------|
| `getCityStats(cityName)` | ดึง city stats | ✅ ใช้ได้ |
| `getCityProjects(cityName)` | ดึง city projects | ✅ ใช้ได้ |
| `getUserContribution(projectId, userId)` | ดึง contribution | ✅ ใช้ได้ |
| `getCityReputation(userId, cityName)` | ดึง reputation | ✅ ใช้ได้ |

---

# 20. Community Verify System

## 20.1 ภาพรวม
- ผู้เล่นในเมืองเดียวกัน vote ว่าหลักฐาน Quest จริงหรือไม่
- approve ≥ 3 → ผ่าน, reject ≥ 3 → ไม่ผ่าน
- 3 ชม. ไม่มีคน vote ครบ → Auto approve

## 20.2 Functions ที่มีใน DB

| Function | หน้าที่ |
|----------|---------|
| `cast_verification_vote(p_user_quest_id, p_voter_id, p_vote)` | Vote + ให้ XP + update status |
| `auto_approve_expired_verifications()` | Auto approve ที่ค้าง 3 ชม. |

## 20.3 supabase.js helpers

| Helper | หน้าที่ |
|--------|---------|
| `getPendingVerifications(userId, city)` | ดึง queue รอ verify ในเมือง |
| `castVerificationVote(userQuestId, voterId, vote)` | ส่ง vote |
| `getQuestVotes(userQuestId)` | ดึง votes ของ quest |
| `subscribeQuestVerification(userQuestId, callback)` | Realtime vote count |

## 20.4 UX Flow ใน verify.html
```
1. โหลดหน้า → getPendingVerifications(userId, city)
2. แสดงการ์ดรูปหลักฐาน (ซ่อน quest ตัวเอง + ที่ vote แล้ว)
3. กด ✅ / ❌ → castVerificationVote() → อัพเดต UI
4. subscribeQuestVerification() แสดง count realtime
5. เมื่อ vote ครบ → การ์ดหายไปจาก queue
```

---

# 21. Database Functions & Triggers

## 21.1 Functions ทั้งหมดใน DB ✅ (17 รายการ)

| Function | Return Type | หน้าที่ |
|----------|------------|---------|
| `add_city_reputation(p_user_id, p_city_name, p_amount)` | void | เพิ่ม city reputation |
| `auto_approve_expired_verifications()` | integer | Auto approve quest ที่ค้าง 3 ชม. |
| `cast_verification_vote(p_user_quest_id, p_voter_id, p_vote)` | json | Vote verify + ให้ XP + update quest status |
| `complete_duel(...)` | void | จบ PvP duel |
| `confirm_topup(p_transaction_id, p_admin_id)` | void | Admin ยืนยัน topup → เติม Crystal |
| `follow_user(p_follower_id, p_following_id)` | void | ติดตาม user + update count |
| `grant_quest_xp(p_user_id, p_user_quest_id)` | void | ✅ Grant XP จาก Quest ที่ approved |
| `increment_stat(p_user_id, p_stat_type, p_amount)` | void | เพิ่ม stat point |
| `reset_monthly_xp()` | void | รีเซ็ต xp_this_month + rank ทุกต้นเดือน |
| `resolve_pvp_duel(...)` | json | คำนวณผล PvP duel |
| `unfollow_user(p_follower_id, p_following_id)` | void | เลิกติดตาม + update count |
| `update_city_prosperity(p_city_name)` | void | คำนวณ city prosperity |
| `update_duel_xp_on_quest_complete` | **trigger** | อัพเดต challenger/defender XP เมื่อทำ Quest สำเร็จ |
| `update_streak(p_user_id)` | void | อัพเดต streak_current + streak_longest |
| `update_user_rank(p_user_id)` | void | คำนวณ rank จาก xp_this_month |
| `create_user_stats_on_insert` | **trigger** | สร้าง user_stats auto เมื่อ insert users |
| `create_wallet_on_insert` | **trigger** | สร้าง wallet auto เมื่อ insert users |

## 21.2 Cron Jobs ที่ต้องตั้ง (Supabase pg_cron) ⚠️

| Job | Schedule | Function |
|-----|----------|---------|
| Auto approve expired verifications | ทุก 30 นาที | `auto_approve_expired_verifications()` |
| Reset monthly XP | วันที่ 1 ของทุกเดือน 00:00 | `reset_monthly_xp()` |
| Resolve expired PvP duels | ทุก 30 นาที | `resolve_expired_pvp_duels()` ⚠️ ต้องสร้างก่อน |

> ดู SQL ตั้งค่าครบใน Section 30

---

# 22. Views

## 22.1 leaderboard_monthly ✅ (มีใน DB แล้ว)

```sql
select
  id, username, display_name, class, level, rank,
  xp_this_month, equipped_title_id, avatar_seed, city,
  row_number() over (order by xp_this_month desc) as position
from users u
where profile_public = true;
```

ใช้งานผ่าน `getLeaderboard(limit, city)` ใน supabase.js

## 22.2 social_feed_view ✅ (มีใน DB แล้ว)

```sql
select
  af.id, af.user_id, af.type, af.data, af.created_at,
  u.username, u.display_name, u.avatar_seed, u.class, u.level, u.city
from activity_feed af
join users u on u.id = af.user_id
where u.feed_public = true
order by af.created_at desc;
```

ใช้งานผ่าน `getSocialFeed(city, limit)` และ `getFollowingFeed(userId, limit)` ใน supabase.js

---

# 23. supabase.js Helper Reference

## Auth Helpers
| Function | หน้าที่ |
|----------|---------|
| `signUp(email, password)` | สมัครสมาชิก |
| `signIn(email, password)` | เข้าสู่ระบบ |
| `signOut()` | ออกจากระบบ |
| `getSession()` | ดึง session |
| `getCurrentUser()` | ดึง user ปัจจุบัน |
| `requireAuth(redirectTo?)` | Guard — redirect ถ้าไม่ได้ login |
| `redirectIfLoggedIn(redirectTo?)` | redirect ถ้า login แล้ว |

## User Helpers
| Function | หน้าที่ |
|----------|---------|
| `getUserProfile(userId)` | ดึง profile พื้นฐาน |
| `getUserProfileFull(userId)` | ดึง profile + equipped title |
| `getUserStats(userId)` | ดึง stat ทั้ง 6 |
| `updateUserProfile(userId, updates)` | อัพเดต profile |
| `getUserBadges(userId)` | ดึง badges ที่ปลดล็อค |
| `getUserTitles(userId)` | ดึง titles ที่มี |
| `equipTitle(userId, titleId)` | เปลี่ยน title ที่ใส่อยู่ |

## Quest Helpers
| Function | หน้าที่ |
|----------|---------|
| `getQuests(classTarget?)` | ดึง quests active |
| `getUserQuests(userId)` | ดึง quests ของ user |
| `getTodayQuests(userId, userClass?)` | ดึง daily quests วันนี้ |
| `startQuest(userId, questId)` | เริ่ม quest (in_progress) |
| `submitQuestProof(userId, questId, proofType, text?, url?)` | ส่งหลักฐาน |
| `grantQuestXP(userId, userQuestId)` | ✅ เรียก `grant_quest_xp` — มีใน DB แล้ว |

## Community Verify Helpers
| Function | หน้าที่ |
|----------|---------|
| `getPendingVerifications(userId, city)` | ดึง queue verify |
| `castVerificationVote(userQuestId, voterId, vote)` | ส่ง vote |
| `getQuestVotes(userQuestId)` | ดึง votes |
| `subscribeQuestVerification(userQuestId, callback)` | Realtime |

## Activity Feed
| Function | หน้าที่ |
|----------|---------|
| `getSocialFeed(city?, limit?)` | Feed ของเมือง — ใช้ `social_feed_view` ✅ |
| `getFollowingFeed(userId, limit?)` | Feed ของคนที่ follow |
| `addActivity(userId, type, data?)` | เพิ่ม activity |
| `subscribeCityFeed(city, callback)` | Realtime feed |

## Leaderboard
| Function | หน้าที่ |
|----------|---------|
| `getLeaderboard(limit?, city?)` | ดึง leaderboard — ใช้ `leaderboard_monthly` view ✅ |

## City Social
| Function | หน้าที่ | สถานะ |
|----------|---------|-------|
| `getCityStats(cityName)` | ดึง city stats | ✅ ใช้ได้ |
| `getCityProjects(cityName)` | ดึง city projects | ✅ ใช้ได้ |
| `getUserContribution(projectId, userId)` | ดึง contribution | ✅ ใช้ได้ |
| `getCityReputation(userId, cityName)` | ดึง city reputation | ✅ ใช้ได้ |

## Social Follow
| Function | หน้าที่ |
|----------|---------|
| `followUser(followerId, followingId)` | เรียก `follow_user()` DB function |
| `unfollowUser(followerId, followingId)` | เรียก `unfollow_user()` DB function |
| `isFollowing(followerId, followingId)` | เช็คว่า follow อยู่ |
| `getFollowers(userId)` | รายชื่อ followers |
| `getFollowing(userId)` | รายชื่อคนที่ follow |

## Notification Helpers
| Function | หน้าที่ |
|----------|---------|
| `getNotifications(userId, limit?)` | ดึง notifications |
| `getUnreadCount(userId)` | นับที่ยังไม่อ่าน |
| `markNotificationRead(id)` | mark อ่านแล้ว |
| `markAllNotificationsRead(userId)` | mark ทั้งหมด |
| `subscribeNotifications(userId, callback)` | Realtime |

## Storage Helpers
| Function | หน้าที่ | Bucket |
|----------|---------|--------|
| `uploadProofImage(userId, questId, file)` | อัพโหลดหลักฐาน | `nexuslife` |
| `uploadAvatar(userId, file)` | อัพโหลด avatar | `nexuslife-avatars` |

## Realtime
| Function | Event | Table/Filter |
|----------|-------|-------------|
| `subscribeChatChannel(channel, cb)` | INSERT | `messages` WHERE channel |
| `subscribeCityFeed(city, cb)` | INSERT | `activity_feed` |
| `subscribeNotifications(userId, cb)` | INSERT | `notifications` WHERE user_id |
| `subscribeQuestVerification(userQuestId, cb)` | INSERT | `quest_verifications` WHERE user_quest_id |

## XP & Streak
| Function | หน้าที่ |
|----------|---------|
| `grantQuestXP(userId, userQuestId)` | ✅ เรียก `grant_quest_xp` — มีใน DB แล้ว |
| `updateStreak(userId)` | เรียก `update_streak()` DB function |

## Wallet & Shop
| Function | หน้าที่ |
|----------|---------|
| `getWallet(userId)` | ดึงยอด wallet |
| `getTransactions(userId, limit?)` | ประวัติ transactions |
| `getShopItems(category?)` | สินค้าใน shop |
| `getUserPurchases(userId)` | สิ่งที่ซื้อแล้ว |
| `createTopupTransaction(userId, amountThb, slipUrl, slipHash)` | สร้าง topup (pending) |

## Chat
| Function | หน้าที่ |
|----------|---------|
| `sendChatMessage(senderId, channel, content)` | ส่งข้อความ |
| `getChatHistory(channel, limit?)` | ประวัติ chat |
| `subscribeChatChannel(channel, cb)` | Realtime |

> **Channel naming convention:**
> - Global: `global`
> - เมือง: `city:{cityName}` เช่น `city:กรุงเทพมหานคร`
> - Guild: `guild:{guildId}`
> - DM: `dm:{userId}`

---

## ✅ Action Items — ทำครบแล้วทั้งหมด

| สถานะ | Action | หมายเหตุ |
|-------|--------|---------|
| ✅ Done | `social_feed_view` | มีใน DB แล้ว |
| ✅ Done | `leaderboard_monthly` view ใช้ `avatar_seed` | ถูกต้องแล้ว |
| ✅ Done | `grant_quest_xp` function | มีใน DB แล้ว |
| ✅ Done | pg_cron: `auto_approve_expired_verifications` ทุก 1 ชม. | ตั้งแล้ว |
| ✅ Done | pg_cron: `reset_monthly_xp` วันที่ 1 ของทุกเดือน | ตั้งแล้ว |
| ✅ Done | Frontend HTML ทั้ง 15 ไฟล์ — Auth + Badges แก้ครบ | ตรงตาม Section 24, 25 |
| ⚠️ Todo | pg_cron: `resolve_expired_pvp_duels` ทุก 30 นาที | ต้องสร้าง function ก่อน |
| ⚠️ Todo | ตั้งค่า RLS Policies ใน Supabase | ตามความต้องการ |
| ⚠️ Todo | Storage buckets `nexuslife` และ `nexuslife-avatars` — ตั้ง public access | |

> **Backend พร้อม 100%, Frontend พร้อม 100%** — พร้อม deploy จริง

---

# 24. Auth Standard (บังคับ)

> **บังคับใช้ทุกหน้า** ยกเว้น `index.html`, `login.html`, `register.html`

## ❌ ห้ามใช้ (วิธีเก่า)

```javascript
const { data: { session } } = await supabase.auth.getSession()
if (!session) { window.location.href = './login.html'; return }
currentUser = session.user
```

## ✅ ต้องใช้ (มาตรฐาน v6)

```javascript
import { requireAuth } from './supabase.js'

const session = await requireAuth('./login.html')
if (!session) return
const currentUser = session.user
```

## เหตุผล

- `getSession()` อาจ return session ที่หมดอายุแล้วโดยไม่ refresh token
- `requireAuth()` ใน `supabase.js` จัดการ token refresh และ redirect อัตโนมัติ
- ลด boilerplate ซ้ำซ้อนในทุกไฟล์

## ไฟล์ที่ต้องใช้ requireAuth (ทั้งหมด 15 ไฟล์)

`dashboard.html`, `profile.html`, `quests.html`, `verify.html`, `feed.html`,
`leaderboard.html`, `map.html`, `guild.html`, `pvp.html`, `city.html`,
`achievements.html`, `notifications.html`, `wallet.html`, `shop.html`, `topup.html`

---

# 25. Sidebar Badges Standard (บังคับ)

> **บังคับทุกหน้าหลัง login** — ต้องมี element และโหลดค่าทั้งคู่

## HTML ที่ต้องมีใน Sidebar

```html
<!-- ภายใต้ <a href="./quests.html"> -->
<span class="nav-badge" id="navQuestBadge" style="display:none">0</span>

<!-- ภายใต้ <a href="./verify.html"> -->
<span class="nav-badge" id="navVerifyBadge" style="display:none">0</span>
```

## โค้ดโหลด navQuestBadge

โหลดใน `loadProfile()` หรือ `init()` หลัง `currentUser` พร้อมแล้ว:

```javascript
const { count: questCount } = await supabase
  .from('user_quests')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', currentUser.id)
  .eq('status', 'in_progress')

if (questCount > 0) {
  const badge = document.getElementById('navQuestBadge')
  badge.textContent = questCount > 99 ? '99+' : questCount
  badge.style.display = 'inline'
}
```

## โค้ดโหลด navVerifyBadge

```javascript
// ดึง city ของ user
const { data: profile } = await supabase
  .from('users')
  .select('city')
  .eq('id', currentUser.id)
  .single()
const city = profile?.city

// ดึง user_quests ที่รอ verify ในเมืองเดียวกัน (ไม่ใช่ของตัวเอง)
const { data: pending } = await supabase
  .from('user_quests')
  .select('id, users!inner(city)')
  .eq('status', 'pending_review')
  .eq('users.city', city)
  .neq('user_id', currentUser.id)

// ดึง votes ที่เราทำไปแล้ว
const { data: myVotes } = await supabase
  .from('quest_verifications')
  .select('user_quest_id')
  .eq('voter_id', currentUser.id)

const votedIds = new Set(myVotes.map(v => v.user_quest_id))
const notVotedCount = pending.filter(p => !votedIds.has(p.id)).length

if (notVotedCount > 0) {
  const badge = document.getElementById('navVerifyBadge')
  badge.textContent = notVotedCount > 99 ? '99+' : notVotedCount
  badge.style.display = 'inline'
}
```

## สรุปตาราง — ไฟล์ไหนต้องทำอะไร

| ไฟล์ | navQuestBadge | navVerifyBadge |
|------|:---:|:---:|
| dashboard.html | ✅ มีแล้ว | ✅ มีแล้ว |
| profile.html | ✅ มีแล้ว | ✅ มีแล้ว |
| feed.html | ✅ เพิ่มแล้ว | ✅ มีแล้ว |
| wallet.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| shop.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| notifications.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| leaderboard.html | ✅ มีแล้ว | ✅ มีแล้ว |
| quests.html | ✅ มีแล้ว | ✅ มีแล้ว |
| city.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| achievements.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| verify.html | ✅ มีแล้ว | ✅ มีแล้ว |
| topup.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| map.html | ✅ เพิ่มแล้ว | ✅ มีแล้ว (โหลดแล้ว) |
| guild.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |
| pvp.html | ✅ เพิ่มแล้ว | ✅ เพิ่มแล้ว |

---

# 26. Guild System — ข้อควรระวัง

## ❌ ห้าม query แบบนี้ (ผิด)

```javascript
// ห้ามนับสมาชิกผ่าน nested select แบบนี้
const { data } = await supabase
  .from('guilds')
  .select('*, guild_members(count)')   // ❌ ไม่ work ถูกต้อง
```

## ✅ วิธีที่ถูกต้อง — นับสมาชิกแยก query

```javascript
// ดึง guild ก่อน
const { data: guilds } = await supabase
  .from('guilds')
  .select('*')

// แล้วนับสมาชิกแยก
const { count: memberCount } = await supabase
  .from('guild_members')
  .select('*', { count: 'exact', head: true })
  .eq('guild_id', guildId)
```

## Guild Quests — ต้องใช้ตาราง `guild_quests` เท่านั้น

```javascript
// ❌ ห้าม query จาก quests โดยตรงสำหรับ Guild Quest
const { data } = await supabase.from('quests').select('*').eq('type', 'guild')

// ✅ ต้อง query จาก guild_quests JOIN quests
const { data } = await supabase
  .from('guild_quests')
  .select('*, quests(*)')
  .eq('guild_id', myGuild.id)
  .eq('status', 'active')
```

## การอัปเดต Guild Quest Progress

ทุกครั้งที่สมาชิก guild ทำ quest สำเร็จ ต้องอัปเดต `guild_quests.current_value`:

```javascript
await supabase
  .from('guild_quests')
  .update({ current_value: supabase.rpc('...') })  // หรือ trigger
  .eq('id', guildQuestId)
```

> **แนะนำ:** สร้าง trigger หรือ RPC `update_guild_quest_progress(p_guild_quest_id, p_amount)` เพื่อ atomic update

---

# 27. PvP System — ข้อควรระวัง

## ❌ ห้ามอัปเดต winner_id โดยตรง

```javascript
// ❌ ห้ามทำ
await supabase.from('pvp_duels').update({ winner_id: userId }).eq('id', duelId)
```

## ✅ ต้องใช้ RPC `resolve_pvp_duel`

```javascript
// ✅ ถูกต้อง — ให้ DB function จัดการทั้งหมด
const { data } = await supabase.rpc('resolve_pvp_duel', {
  p_duel_id: duelId,
  // ... parameters อื่น ๆ ตาม function signature
})
```

## RPC ต้องจัดการทุกอย่างในที่เดียว

ภายใน `resolve_pvp_duel` ต้องครอบคลุม:
1. คำนวณและบันทึก `winner_id`
2. ให้รางวัล XP และ Gold แก่ผู้ชนะ
3. อัปเดต `users.pvp_win_streak`
4. สร้าง notification ให้ทั้งสองฝ่าย

## Cron สำหรับ Duel หมดเวลา

```javascript
// ใน frontend: ตรวจ duel ที่หมดเวลาแล้วยังไม่ resolve
const { data: expired } = await supabase
  .from('pvp_duels')
  .select('id')
  .lt('expires_at', new Date().toISOString())
  .is('winner_id', null)
```

> **แนะนำ:** ตั้ง pg_cron เรียก `resolve_expired_pvp_duels()` ทุก 30 นาที (ดู Section 30)

## Level Difference Check

ต้องตรวจสอบทั้งใน frontend และ DB:

```javascript
// ใน sendChallenge() — ตรวจ frontend ชั้นแรก
const levelDiff = Math.abs(myLevel - targetLevel)
if (levelDiff > 5) {
  showToast('ระดับต่างกันเกิน 5 — ท้าดวลไม่ได้', 'error')
  return
}
```

## PvP Ranking

`users` table ไม่มีคอลัมน์ `pvp_wins` — ต้อง aggregate จาก `pvp_duels`:

```javascript
const { count: pvpWins } = await supabase
  .from('pvp_duels')
  .select('*', { count: 'exact', head: true })
  .eq('winner_id', userId)
```

---

# 28. Quest Submission Standard

## Logic หลัก — แยกตาม proof_type

| proof_type | status | ขั้นตอนถัดไป |
|---|---|---|
| `text` | `approved` | เรียก `grant_quest_xp` ทันที |
| `gps` | `approved` | เรียก `grant_quest_xp` ทันที |
| `image` | `pending_review` | รอ Community Verify 3 votes |
| `screenshot` | `pending_review` | รอ Community Verify 3 votes |
| `url` | `pending_review` | รอ Community Verify 3 votes |

## ตัวอย่างโค้ด submitProof() ที่ถูกต้อง

```javascript
async function submitProof() {
  const autoApprove = (activeQuest.proof_type === 'text' || activeQuest.proof_type === 'gps')
  const status = autoApprove ? 'approved' : 'pending_review'

  const { data: uq, error } = await supabase
    .from('user_quests')
    .upsert({
      user_id: currentUser.id,
      quest_id: activeQuest.id,
      status,
      proof_url,
      proof_text,
      submitted_at: new Date().toISOString(),
      xp_granted: false   // ✅ บังคับใส่ทุกครั้ง
    }, { onConflict: 'user_id,quest_id' })
    .select()
    .single()

  if (error) throw error

  if (autoApprove) {
    // grant_quest_xp เป็น void — ไม่ต้องรับ return value
    await supabase.rpc('grant_quest_xp', {
      p_user_id: currentUser.id,
      p_user_quest_id: uq.id
    })
    await loadProfile()   // โหลด XP และ level ใหม่
    showToast('✅ Quest สำเร็จ! XP เข้าแล้ว', 'success')
  } else {
    showToast('ส่งหลักฐานแล้ว — รอ Community 3 votes ยืนยัน', 'success')
  }
}
```

## ข้อควรระวัง

- **ต้องใส่ `xp_granted: false`** ใน upsert ทุกครั้ง — ตาม DB schema
- **`grant_quest_xp` return void** — อย่าใช้ `const { data } = await supabase.rpc(...)` แล้วนำ data ไปใช้
- **ห้าม call `grant_quest_xp` กับ quest ที่เป็น `pending_review`** — XP จะ grant อัตโนมัติเมื่อ approve ครบ 3 votes (ผ่าน `cast_verification_vote`)

---

# 29. Query Standard: .single() vs .maybeSingle()

## กฎการใช้งาน

| Situation | Method | เหตุผล |
|---|---|---|
| ดึง `users` หลัง login | `.single()` | มั่นใจ 100% ว่ามีแถว |
| ดึง `wallet` ของ user | `.maybeSingle()` | trigger สร้างอัตโนมัติ แต่ระวัง race condition |
| ดึง `city_stats` | `.maybeSingle()` | เมืองใหม่อาจยังไม่มีแถว |
| ดึง `city_projects` | `.maybeSingle()` | อาจไม่มี project |
| ดึง `city_wars` | `.maybeSingle()` | อาจไม่มีสงครามในขณะนั้น |
| ดึง `guild_members` (ตัวเอง) | `.maybeSingle()` | อาจยังไม่ได้เข้า guild |
| ดึง `user_quests` ที่ specific | `.maybeSingle()` | อาจยังไม่ได้เริ่ม quest |

## ตัวอย่าง

```javascript
// ✅ .single() — มั่นใจว่ามีข้อมูล
const { data: user } = await supabase
  .from('users')
  .select('*')
  .eq('id', currentUser.id)
  .single()   // error ถ้าไม่มี หรือมีมากกว่า 1

// ✅ .maybeSingle() — อาจไม่มีข้อมูล
const { data: cityStats } = await supabase
  .from('city_stats')
  .select('*')
  .eq('city_name', userCity)
  .maybeSingle()   // return null ถ้าไม่มี ไม่ throw error

if (cityStats) {
  // มีข้อมูล
} else {
  // ยังไม่มี city stats
}
```

---

# 30. Cron Jobs — SQL ตั้งค่า pg_cron

> รันใน **Supabase SQL Editor** หลังจาก enable extension `pg_cron`

```sql
-- ตรวจสอบว่ามี extension แล้ว
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Job 1: Auto approve verifications ที่ค้างเกิน 3 ชม. (ทุก 30 นาที)
SELECT cron.schedule(
  'auto-approve-verifications',
  '*/30 * * * *',
  'SELECT auto_approve_expired_verifications();'
);

-- Job 2: Reset monthly XP และ rank (วันที่ 1 ของทุกเดือน ตี 0)
SELECT cron.schedule(
  'reset-monthly-xp',
  '0 0 1 * *',
  'SELECT reset_monthly_xp();'
);

-- Job 3: Resolve PvP duels ที่หมดเวลา (ทุก 30 นาที)
-- ⚠️ ต้องสร้าง function resolve_expired_pvp_duels() ก่อน
SELECT cron.schedule(
  'resolve-expired-duels',
  '*/30 * * * *',
  'SELECT resolve_expired_pvp_duels();'
);
```

## ตรวจสอบ jobs ที่ตั้งแล้ว

```sql
SELECT * FROM cron.job;
```

## ลบ job (ถ้าต้องการ)

```sql
SELECT cron.unschedule('auto-approve-verifications');
SELECT cron.unschedule('reset-monthly-xp');
SELECT cron.unschedule('resolve-expired-duels');
```

---

*Blueprint Version 6.0 — NEXUS LIFE Real Life MMO*
*อัพเดตล่าสุด: 2026 — Backend พร้อม 100% + Frontend Standards พร้อม 100%*
*34 tables, 17 functions, 2 views, pg_cron ✅, Auth Standard ✅, Sidebar Badges ✅*

---

# 31. Roadmap แผนพัฒนาในอนาคต (Phase 1–5)

> **เงื่อนไขเริ่มต้น:** Phase 1–5 จะเริ่มพัฒนาหลังจากระบบหลัก (Phase 0 = Sections 1–30 ทั้งหมด) เสถียรและ deploy บน production สำเร็จแล้ว ได้แก่ Auth, Quest, Community Verify, Guild เบื้องต้น, PvP, Economy, City Social, Leaderboard, Cron Jobs ครบ

## 31.1 ภาพรวมแต่ละ Phase

| Phase | ชื่อ | เป้าหมายหลัก | ระยะเวลาประมาณ |
|-------|------|-------------|---------------|
| **0** | Core System (ปัจจุบัน) | ระบบหลักทุกอย่างครบ — พร้อม deploy | เสร็จแล้ว ✅ |
| **1** | Stability & Admin | ระบบ Admin Panel, RLS Policies, pg_cron ครบ, stabilize production | 1–2 สัปดาห์ |
| **2** | Guild & PvP Complete | Guild Quest automation, Guild War rewards, PvP Ranking view, Speedrun Duel | 2–3 สัปดาห์ |
| **3** | Social Advanced | Secondary Role, World Boss Event, Events page | 3–4 สัปดาห์ |
| **4** | Competitive | Speedrun Duel, Province War, Weighted Leaderboard | 2–3 สัปดาห์ |
| **5** | Full Virtual Society | Education System, Justice System, Housing & Family | 4–6 สัปดาห์ |

## 31.2 ตารางสรุป — ระบบใหม่ในแต่ละ Phase

| ระบบ/ตาราง/ฟีเจอร์ | Phase |
|-------------------|-------|
| `admin.html` — ยืนยันสลิป, จัดการ Quest, จัดการผู้ใช้ | 1 |
| RLS Policies ครบทุก table | 1 |
| `resolve_expired_pvp_duels()` function + cron | 1 |
| `update_guild_quest_progress()` RPC | 2 |
| Guild War: `resolve_guild_war()` + rewards | 2 |
| Territory: auto-update controlling guild weekly | 2 |
| `pvp_rankings` view (aggregate from `pvp_duels`) | 2 |
| `user_roles` table + unlock logic | 3 |
| `world_boss_events` + `world_boss_participants` tables | 3 |
| `attack_world_boss()` RPC | 3 |
| `events.html` page | 3 |
| Speedrun Duel (`duel_type = 'speedrun'`) + RPC | 4 |
| Province War enhancements + daily cap | 4 |
| `leaderboard_weighted` view / materialized view | 4 |
| `academies`, `courses`, `user_courses` tables | 5 |
| `court_cases`, `case_verdicts`, `user_jail` tables | 5 |
| `houses`, `family_relations` tables | 5 |

## 31.3 หลักการ Backward Compatibility

- ทุก Phase ต้องไม่ break Schema เดิม — เพิ่ม column ใช้ `ALTER TABLE ... ADD COLUMN ... DEFAULT ...`
- ฟังก์ชันใหม่ต้องไม่เปลี่ยน signature ของฟังก์ชันเดิมที่ frontend ใช้อยู่
- ทดสอบ RLS ทุกครั้งหลัง migration ก่อน deploy

---

# 32. Phase 1 – ความเสถียรและ Admin Panel

## 32.1 ภาพรวม

Phase 1 มีเป้าหมายหลัก 3 ส่วน:
1. **Admin Panel** — หน้าจัดการระบบสำหรับ admin
2. **RLS Policies** — ล็อค security ทุก table ก่อน production จริง
3. **`resolve_expired_pvp_duels()`** — function ที่ยังขาดอยู่จาก Section 30

---

## 32.2 Admin Panel (`admin.html`)

### หน้าที่ครอบคลุม

| Tab | ฟีเจอร์ |
|-----|---------|
| **Transactions** | ดูรายการ topup pending, ยืนยันสลิป, เรียก `confirm_topup()` |
| **Quests** | เพิ่ม/แก้ไข/ลบ Quest ใน `quests` table |
| **Users** | ดูรายชื่อ user, reset streak, ban user, แก้ไข gold/crystal ฉุกเฉิน |
| **Verifications** | ดู queue verify ที่ค้าง, force approve/reject |
| **Guilds** | ดูรายการ guild, ยุบ guild, แก้ไข master |

### การตั้งค่า Admin Role

**วิธีที่ 1 — ใช้ `auth.email()` (ง่ายที่สุด สำหรับ admin จำนวนน้อย):**

```sql
-- ตัวอย่าง RLS policy: admin เท่านั้น select transactions ทั้งหมดได้
CREATE POLICY "admin_select_transactions"
ON transactions FOR SELECT
USING (
  auth.email() IN (
    'admin@nexuslife.app',
    'superadmin@nexuslife.app'
  )
);
```

**วิธีที่ 2 — ใช้ Custom Claim `is_admin` (แนะนำสำหรับ production จริง):**

```sql
-- ขั้นที่ 1: เพิ่ม column is_admin ใน users
ALTER TABLE users ADD COLUMN is_admin boolean DEFAULT false;

-- ขั้นที่ 2: สร้าง function ดึง claim
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ขั้นที่ 3: ใช้ใน RLS policy
CREATE POLICY "admin_all_transactions"
ON transactions FOR ALL
USING ( is_admin() );

CREATE POLICY "admin_all_quests"
ON quests FOR ALL
USING ( is_admin() );
```

> **⚠️ หมายเหตุ Security:** ทุก Admin API call ต้องตรวจ `is_admin()` ทั้ง frontend (hide UI) และ RLS (enforce DB) — ห้าม trust frontend อย่างเดียว

### ตัวอย่างโค้ด admin.html — ยืนยันสลิป

```javascript
import { requireAuth } from './supabase.js'
import { supabase } from './supabase.js'

const session = await requireAuth('./login.html')
if (!session) return

// ตรวจสิทธิ์ admin ก่อนโหลดหน้า
const { data: me } = await supabase
  .from('users')
  .select('is_admin')
  .eq('id', session.user.id)
  .single()

if (!me?.is_admin) {
  window.location.href = './dashboard.html'
  return
}

// โหลด transactions pending
async function loadPendingTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      id, user_id, amount_thb, crystal_amount,
      slip_url, created_at,
      users!inner(username, display_name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) { console.error(error); return }
  renderTransactions(data)
}

// ยืนยันสลิป — เรียก confirm_topup RPC ที่มีอยู่แล้วใน DB
async function confirmTopup(transactionId) {
  const { error } = await supabase.rpc('confirm_topup', {
    p_transaction_id: transactionId,
    p_admin_id: session.user.id
  })

  if (error) {
    showToast('เกิดข้อผิดพลาด: ' + error.message, 'error')
    return
  }

  showToast('✅ ยืนยันสลิปสำเร็จ — Crystal เติมแล้ว', 'success')
  await loadPendingTransactions()
}
```

---

## 32.3 RLS Policies มาตรฐาน

> รันใน Supabase SQL Editor — ตั้งค่าทีละ table

```sql
-- ===== ENABLE RLS ทุก table =====
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pvp_duels ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ===== USERS =====
-- อ่านได้ทุกคน (สำหรับ leaderboard, profile สาธารณะ)
CREATE POLICY "users_select_public"
ON users FOR SELECT
USING ( profile_public = true OR id = auth.uid() );

-- แก้ไขได้เฉพาะตัวเอง
CREATE POLICY "users_update_own"
ON users FOR UPDATE
USING ( id = auth.uid() );

-- ===== USER_QUESTS =====
-- ดูได้เฉพาะของตัวเอง
CREATE POLICY "user_quests_select_own"
ON user_quests FOR SELECT
USING ( user_id = auth.uid() );

-- เพิ่มได้เฉพาะตัวเอง
CREATE POLICY "user_quests_insert_own"
ON user_quests FOR INSERT
WITH CHECK ( user_id = auth.uid() );

-- แก้ไขได้เฉพาะตัวเอง (status in_progress → pending_review)
CREATE POLICY "user_quests_update_own"
ON user_quests FOR UPDATE
USING ( user_id = auth.uid() );

-- ===== QUEST_VERIFICATIONS =====
-- Verifiers อ่าน pending quests ในเมืองเดียวกันได้
-- (ตรวจ via JOIN ใน frontend query ตาม Section 25)
CREATE POLICY "quest_verifications_select"
ON quest_verifications FOR SELECT
USING ( true );  -- RLS ระดับ row ทำใน query filter แทน

-- Insert ได้เฉพาะตัวเอง และ voter_id = auth.uid()
CREATE POLICY "quest_verifications_insert_own"
ON quest_verifications FOR INSERT
WITH CHECK ( voter_id = auth.uid() );

-- ===== NOTIFICATIONS =====
CREATE POLICY "notifications_select_own"
ON notifications FOR SELECT
USING ( user_id = auth.uid() );

CREATE POLICY "notifications_update_own"
ON notifications FOR UPDATE
USING ( user_id = auth.uid() );

-- ===== WALLET =====
CREATE POLICY "wallet_select_own"
ON wallet FOR SELECT
USING ( user_id = auth.uid() );

-- ===== TRANSACTIONS =====
-- User เห็นเฉพาะของตัวเอง
CREATE POLICY "transactions_select_own"
ON transactions FOR SELECT
USING ( user_id = auth.uid() OR is_admin() );

-- Insert ได้เฉพาะตัวเอง (topup)
CREATE POLICY "transactions_insert_own"
ON transactions FOR INSERT
WITH CHECK ( user_id = auth.uid() );

-- ===== MESSAGES =====
CREATE POLICY "messages_select_all"
ON messages FOR SELECT
USING ( true );  -- ทุกคน login ดูได้ (channel filtering ทำใน query)

CREATE POLICY "messages_insert_own"
ON messages FOR INSERT
WITH CHECK ( sender_id = auth.uid() );

-- ===== GUILD_MEMBERS =====
CREATE POLICY "guild_members_select_all"
ON guild_members FOR SELECT
USING ( true );

CREATE POLICY "guild_members_insert_own"
ON guild_members FOR INSERT
WITH CHECK ( user_id = auth.uid() );

CREATE POLICY "guild_members_delete_own"
ON guild_members FOR DELETE
USING ( user_id = auth.uid() );
```

---

## 32.4 Function: `resolve_expired_pvp_duels()`

> ฟังก์ชันนี้ถูกอ้างถึงใน Section 30 แต่ยังไม่ได้สร้าง — Phase 1 ต้องทำก่อนตั้ง pg_cron

```sql
-- สร้างใน Supabase SQL Editor
CREATE OR REPLACE FUNCTION resolve_expired_pvp_duels()
RETURNS integer AS $$
DECLARE
  v_duel RECORD;
  v_resolved_count integer := 0;
  v_winner_id uuid;
  v_reward_xp integer := 100;
  v_reward_gold integer := 50;
BEGIN
  -- วนทุก duel ที่หมดเวลาแล้วและยังไม่มี winner
  FOR v_duel IN
    SELECT id, challenger_id, defender_id,
           challenger_xp, defender_xp
    FROM pvp_duels
    WHERE status = 'active'
      AND expires_at < NOW()
      AND winner_id IS NULL
  LOOP
    -- ตัดสินผู้ชนะด้วย XP ที่เก็บได้ในช่วง duel
    IF v_duel.challenger_xp > v_duel.defender_xp THEN
      v_winner_id := v_duel.challenger_id;
    ELSIF v_duel.defender_xp > v_duel.challenger_xp THEN
      v_winner_id := v_duel.defender_id;
    ELSE
      -- XP เท่ากัน → challenger ชนะ (home advantage)
      v_winner_id := v_duel.challenger_id;
    END IF;

    -- อัปเดต duel ให้ completed
    UPDATE pvp_duels
    SET
      winner_id    = v_winner_id,
      status       = 'completed',
      completed_at = NOW()
    WHERE id = v_duel.id;

    -- ให้รางวัล Gold แก่ผู้ชนะ
    UPDATE users
    SET gold = gold + v_reward_gold
    WHERE id = v_winner_id;

    -- อัปเดต pvp_win_streak ผู้ชนะ
    UPDATE users
    SET pvp_win_streak = pvp_win_streak + 1
    WHERE id = v_winner_id;

    -- reset streak ผู้แพ้
    UPDATE users
    SET pvp_win_streak = 0
    WHERE id = CASE
      WHEN v_winner_id = v_duel.challenger_id THEN v_duel.defender_id
      ELSE v_duel.challenger_id
    END;

    -- สร้าง notification ผู้ชนะ
    INSERT INTO notifications (user_id, title, body)
    VALUES (
      v_winner_id,
      '🏆 คุณชนะ PvP Duel!',
      'คุณชนะ Duel และได้รับ ' || v_reward_gold || ' Gold'
    );

    -- สร้าง notification ผู้แพ้
    INSERT INTO notifications (
      user_id, title, body
    )
    VALUES (
      CASE
        WHEN v_winner_id = v_duel.challenger_id THEN v_duel.defender_id
        ELSE v_duel.challenger_id
      END,
      '💀 Duel สิ้นสุดแล้ว',
      'คุณแพ้ PvP Duel ครั้งนี้ — สู้ต่อไป!'
    );

    v_resolved_count := v_resolved_count + 1;
  END LOOP;

  -- resolve duels ที่ยัง pending แต่หมดเวลา (ไม่มีคนรับ)
  UPDATE pvp_duels
  SET status = 'declined'
  WHERE status = 'pending'
    AND expires_at < NOW();

  RETURN v_resolved_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

> หลังสร้าง function แล้ว → ตั้ง pg_cron ตาม Section 30 Job 3 ได้ทันที

---

## 32.5 pg_cron เพิ่มเติม Phase 1

```sql
-- Job 4: Expire guild quests ที่หมดเวลา (ทุก 6 ชั่วโมง)
SELECT cron.schedule(
  'expire-guild-quests',
  '0 */6 * * *',
  $$
    UPDATE guild_quests
    SET status = 'expired'
    WHERE status = 'active'
      AND expires_at < NOW();
  $$
);

-- Job 5: Expire neighborhood requests ที่หมดเวลา (ทุก 1 ชั่วโมง)
SELECT cron.schedule(
  'expire-neighborhood-requests',
  '0 * * * *',
  $$
    UPDATE neighborhood_requests
    SET status = 'expired'
    WHERE status = 'open'
      AND expires_at < NOW();
  $$
);
```

---

# 33. Phase 2 – ระบบกิลด์และ PvP ที่สมบูรณ์

## 33.1 Guild Quest — Automation ด้วย Trigger + RPC

### ปัญหา (อ้างอิง Section 26)

ปัจจุบัน `guild_quests.current_value` ต้องอัปเดต manual ทุกครั้งที่สมาชิกทำ quest สำเร็จ ซึ่งเสี่ยง race condition และ bug — Phase 2 แก้ด้วย atomic RPC และ trigger

### RPC: `update_guild_quest_progress()`

```sql
-- เรียกทุกครั้งที่ member ของ guild ทำ quest approved
-- p_guild_quest_id: id ของ guild_quests row ที่ต้องอัปเดต
-- p_amount: XP หรือ progress ที่ contribute (ตาม quest target_type)
CREATE OR REPLACE FUNCTION update_guild_quest_progress(
  p_guild_quest_id integer,
  p_amount integer
)
RETURNS json AS $$
DECLARE
  v_gq guild_quests%ROWTYPE;
  v_completed boolean := false;
BEGIN
  -- Atomic update ป้องกัน race condition
  UPDATE guild_quests
  SET current_value = LEAST(current_value + p_amount, target_value)
  WHERE id = p_guild_quest_id
    AND status = 'active'
  RETURNING * INTO v_gq;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'reason', 'quest_not_active');
  END IF;

  -- ตรวจว่าครบแล้วหรือยัง
  IF v_gq.current_value >= v_gq.target_value THEN
    UPDATE guild_quests
    SET status = 'completed'
    WHERE id = p_guild_quest_id;
    v_completed := true;

    -- แจ้งทุกสมาชิกใน guild
    INSERT INTO notifications (user_id, title, body)
    SELECT gm.user_id,
           '🏰 Guild Quest สำเร็จ!',
           'Guild ของคุณทำ Quest สำเร็จแล้ว — รับรางวัลได้เลย!'
    FROM guild_members gm
    WHERE gm.guild_id = v_gq.guild_id;
  END IF;

  RETURN json_build_object(
    'success',        true,
    'completed',      v_completed,
    'current_value',  v_gq.current_value,
    'target_value',   v_gq.target_value
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### เชื่อมกับ Quest Approval Flow

ใน frontend หลัง `grant_quest_xp` สำเร็จ ให้เรียก `update_guild_quest_progress` ถ้า user อยู่ใน guild และ quest เป็น `type = 'guild'`:

```javascript
// ต่อจากโค้ด submitProof() ใน Section 28
if (autoApprove && activeQuest.type === 'guild') {
  // หา guild_quest ที่ active ของ guild user
  const { data: gm } = await supabase
    .from('guild_members')
    .select('guild_id')
    .eq('user_id', currentUser.id)
    .maybeSingle()

  if (gm) {
    const { data: gq } = await supabase
      .from('guild_quests')
      .select('id')
      .eq('guild_id', gm.guild_id)
      .eq('quest_id', activeQuest.id)
      .eq('status', 'active')
      .maybeSingle()

    if (gq) {
      await supabase.rpc('update_guild_quest_progress', {
        p_guild_quest_id: gq.id,
        p_amount: activeQuest.xp_reward   // หรือ stat_points แล้วแต่ target_type
      })
    }
  }
}
```

---

## 33.2 Guild War — Logic สิ้นสุดสงครามและรางวัล

### Function: `resolve_guild_war()`

```sql
CREATE OR REPLACE FUNCTION resolve_guild_war(p_war_id integer)
RETURNS json AS $$
DECLARE
  v_war guild_wars%ROWTYPE;
  v_winner_id integer;
  v_loser_id integer;
  v_reward_crystal integer := 50;
  v_reward_guild_xp integer := 500;
BEGIN
  SELECT * INTO v_war FROM guild_wars WHERE id = p_war_id;

  IF v_war.status = 'completed' THEN
    RETURN json_build_object('success', false, 'reason', 'already_completed');
  END IF;

  -- ตัดสิน winner
  IF v_war.guild1_xp >= v_war.guild2_xp THEN
    v_winner_id := v_war.guild1_id;
    v_loser_id  := v_war.guild2_id;
  ELSE
    v_winner_id := v_war.guild2_id;
    v_loser_id  := v_war.guild1_id;
  END IF;

  -- อัปเดต guild_wars
  UPDATE guild_wars
  SET
    winner_guild_id = v_winner_id,
    status          = 'completed'
  WHERE id = p_war_id;

  -- เพิ่ม guild_xp ให้ guild ชนะ
  UPDATE guilds
  SET guild_xp = guild_xp + v_reward_guild_xp
  WHERE id = v_winner_id;

  -- ให้ crystal แก่สมาชิก guild ชนะทุกคน
  UPDATE users
  SET crystal = crystal + v_reward_crystal
  WHERE id IN (
    SELECT user_id FROM guild_members WHERE guild_id = v_winner_id
  );

  -- Notification สมาชิก guild ชนะ
  INSERT INTO notifications (user_id, title, body)
  SELECT user_id,
         '⚔️ Guild War ชนะแล้ว!',
         'Guild ของคุณชนะสงครามกิลด์! ได้รับ ' || v_reward_crystal || ' Crystal'
  FROM guild_members WHERE guild_id = v_winner_id;

  -- Notification สมาชิก guild แพ้
  INSERT INTO notifications (user_id, title, body)
  SELECT user_id,
         '⚔️ Guild War สิ้นสุดแล้ว',
         'Guild ของคุณแพ้ในครั้งนี้ — ฝึกฝนต่อไป!'
  FROM guild_members WHERE guild_id = v_loser_id;

  RETURN json_build_object(
    'success',          true,
    'winner_guild_id',  v_winner_id,
    'guild1_xp',        v_war.guild1_xp,
    'guild2_xp',        v_war.guild2_xp
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Cron Job สำหรับ Guild War

```sql
-- Job 6: Resolve guild wars ที่หมดเวลา (ทุก 1 ชั่วโมง)
SELECT cron.schedule(
  'resolve-expired-guild-wars',
  '30 * * * *',
  $$
    SELECT resolve_guild_war(id)
    FROM guild_wars
    WHERE status = 'active'
      AND ends_at < NOW();
  $$
);
```

---

## 33.3 Territory — Auto-Update Controlling Guild

```sql
-- Job 7: อัปเดต Territory controlling guild ทุกวันจันทร์ 01:00
SELECT cron.schedule(
  'update-territory-control',
  '0 1 * * 1',
  $$
    WITH weekly_guild_xp AS (
      SELECT
        u.city,
        gm.guild_id,
        SUM(u.xp_this_month) AS total_xp  -- ใช้ xp_this_month เป็น proxy สัปดาห์นี้
      FROM users u
      JOIN guild_members gm ON gm.user_id = u.id
      GROUP BY u.city, gm.guild_id
    ),
    top_guild_per_city AS (
      SELECT DISTINCT ON (city)
        city, guild_id, total_xp
      FROM weekly_guild_xp
      ORDER BY city, total_xp DESC
    )
    INSERT INTO territories (city, controlling_guild_id, guild_xp_this_week, updated_at)
    SELECT city, guild_id, total_xp, NOW()
    FROM top_guild_per_city
    ON CONFLICT (city) DO UPDATE
      SET controlling_guild_id = EXCLUDED.controlling_guild_id,
          guild_xp_this_week   = EXCLUDED.guild_xp_this_week,
          updated_at           = NOW();
  $$
);
```

---

## 33.4 PvP Ranking View

```sql
-- View แสดงอันดับ PvP ของผู้เล่น — aggregate จาก pvp_duels
-- (users table ไม่มี pvp_wins column ตามที่ระบุใน Section 27)
CREATE OR REPLACE VIEW pvp_rankings AS
SELECT
  u.id,
  u.username,
  u.display_name,
  u.avatar_seed,
  u.class,
  u.level,
  u.city,
  u.pvp_win_streak,
  COUNT(CASE WHEN d.winner_id = u.id THEN 1 END)::integer AS pvp_wins,
  COUNT(
    CASE WHEN (d.challenger_id = u.id OR d.defender_id = u.id)
              AND d.status = 'completed'
         THEN 1 END
  )::integer AS pvp_total,
  ROUND(
    100.0 * COUNT(CASE WHEN d.winner_id = u.id THEN 1 END)
      / NULLIF(COUNT(CASE WHEN (d.challenger_id = u.id OR d.defender_id = u.id)
                               AND d.status = 'completed' THEN 1 END), 0),
    1
  ) AS win_rate_pct,
  ROW_NUMBER() OVER (
    ORDER BY COUNT(CASE WHEN d.winner_id = u.id THEN 1 END) DESC,
             u.pvp_win_streak DESC
  ) AS pvp_rank
FROM users u
LEFT JOIN pvp_duels d
  ON d.challenger_id = u.id OR d.defender_id = u.id
WHERE u.profile_public = true
GROUP BY u.id, u.username, u.display_name, u.avatar_seed,
         u.class, u.level, u.city, u.pvp_win_streak;
```

> **Frontend query:**
> ```javascript
> const { data } = await supabase
>   .from('pvp_rankings')
>   .select('*')
>   .order('pvp_rank', { ascending: true })
>   .limit(50)
> ```

---

# 34. Phase 3 – ระบบสังคมขั้นสูง (Role, World Boss, Event)

## 34.1 Secondary Role System

### ตาราง `user_roles`

```sql
CREATE TABLE user_roles (
  id          serial PRIMARY KEY,
  user_id     uuid REFERENCES users(id) ON DELETE CASCADE,
  role_name   text NOT NULL
    CHECK (role_name IN ('police','firefighter','doctor','teacher',
                         'engineer','journalist','chef','athlete')),
  unlocked_at timestamp DEFAULT NOW(),
  is_active   boolean DEFAULT false,
  unlock_source text,    -- 'quest' | 'school' | 'achievement'
  unlock_ref_id integer, -- id ของ quest / course / badge ที่ปลดล็อค
  UNIQUE(user_id, role_name)
);

-- index ค้นหาเร็ว
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_active  ON user_roles(user_id, is_active);
```

### Role Catalog

| role_name | ไทย | ปลดล็อคโดย | ผลพิเศษใน World Boss |
|-----------|-----|------------|----------------------|
| `police` | ตำรวจ | Quest: "ลาดตระเวนชุมชน 7 วัน" | damage +10% |
| `firefighter` | นักดับเพลิง | Quest: "วิ่ง 5km ติดกัน 14 วัน" | HP contribution x1.2 |
| `doctor` | แพทย์ | Badge: "นักวิทย์ระดับ 20" (INT 200+) | heal party 5% HP |
| `teacher` | ครู | Achievement: สอนผู้อื่นทำ quest 10 ครั้ง | XP bonus ให้ทีม +5% |
| `engineer` | วิศวกร | Quest: "สร้าง City Project 3 ครั้ง" | damage +8%, AOE |
| `journalist` | นักข่าว | Achievement: เขียน feed 50 ครั้ง | ลด cooldown attack |
| `chef` | เชฟ | Quest: "ทำอาหาร 10 วัน" | regen streak bonus x1.1 |
| `athlete` | นักกีฬา | Streak 30 วัน + Warrior class | damage +15% (เฉพาะ warrior) |

### Function: `unlock_role()`

```sql
CREATE OR REPLACE FUNCTION unlock_role(
  p_user_id     uuid,
  p_role_name   text,
  p_source      text,
  p_ref_id      integer DEFAULT NULL
)
RETURNS json AS $$
BEGIN
  -- ตรวจว่ามีแล้วหรือยัง
  IF EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = p_user_id AND role_name = p_role_name
  ) THEN
    RETURN json_build_object('success', false, 'reason', 'already_unlocked');
  END IF;

  INSERT INTO user_roles (user_id, role_name, unlock_source, unlock_ref_id)
  VALUES (p_user_id, p_role_name, p_source, p_ref_id);

  -- แจ้ง user
  INSERT INTO notifications (user_id, title, body)
  VALUES (
    p_user_id,
    '🎭 ปลดล็อค Secondary Role ใหม่!',
    'คุณได้รับ Role: ' || p_role_name || ' — เปิดใช้งานในโปรไฟล์ได้เลย'
  );

  RETURN json_build_object('success', true, 'role_name', p_role_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### การเปิด/ปิด Role ใน Frontend

```javascript
// เปิดใช้ role (ใช้ได้ครั้งละ 1 role)
async function activateRole(roleName) {
  // ปิด role เดิมก่อน
  await supabase
    .from('user_roles')
    .update({ is_active: false })
    .eq('user_id', currentUser.id)
    .eq('is_active', true)

  // เปิด role ใหม่
  const { error } = await supabase
    .from('user_roles')
    .update({ is_active: true })
    .eq('user_id', currentUser.id)
    .eq('role_name', roleName)

  if (!error) showToast('✅ เปิดใช้ Role: ' + roleName, 'success')
}
```

---

## 34.2 World Boss Event

### ตาราง `world_boss_events`

```sql
CREATE TABLE world_boss_events (
  id                serial PRIMARY KEY,
  boss_name         text NOT NULL,
  boss_emoji        text DEFAULT '👹',
  location_city     text REFERENCES city_stats(city_name),
  max_participants  integer DEFAULT 500,
  starts_at         timestamp NOT NULL,
  ends_at           timestamp NOT NULL,
  total_hp          bigint NOT NULL DEFAULT 1000000,
  current_hp        bigint NOT NULL DEFAULT 1000000,
  status            text DEFAULT 'upcoming'
    CHECK (status IN ('upcoming','active','defeated','expired')),
  reward_badge_id   integer REFERENCES badges(id),
  reward_title_id   integer REFERENCES titles(id),
  reward_crystal    integer DEFAULT 100,
  created_at        timestamp DEFAULT NOW()
);

CREATE INDEX idx_world_boss_status ON world_boss_events(status);
```

### ตาราง `world_boss_participants`

```sql
CREATE TABLE world_boss_participants (
  id           serial PRIMARY KEY,
  event_id     integer REFERENCES world_boss_events(id) ON DELETE CASCADE,
  user_id      uuid REFERENCES users(id) ON DELETE CASCADE,
  total_damage bigint DEFAULT 0,
  attack_count integer DEFAULT 0,
  last_attack  timestamp,
  joined_at    timestamp DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_wbp_event_damage
  ON world_boss_participants(event_id, total_damage DESC);
```

### RPC: `attack_world_boss()`

```sql
-- สูตร damage:
--   base_damage  = XP รวม 24 ชั่วโมงที่ผ่านมา / 10 (ขั้นต่ำ 10)
--   class_bonus  = 1.05
--   role_bonus   = 1.10 ถ้า role is_active = true
--   streak_bonus = 1 + (streak_current / 100)
--   damage       = ROUND(base_damage * class_bonus * role_bonus * streak_bonus)
--
-- Cooldown: 1 ครั้งต่อ 1 ชั่วโมง

CREATE OR REPLACE FUNCTION attack_world_boss(
  p_user_id  uuid,
  p_event_id integer
)
RETURNS json AS $$
DECLARE
  v_event       world_boss_events%ROWTYPE;
  v_user        users%ROWTYPE;
  v_participant world_boss_participants%ROWTYPE;
  v_xp_24h      bigint;
  v_base_damage numeric;
  v_class_bonus numeric := 1.05;
  v_role_bonus  numeric := 1.00;
  v_streak_bonus numeric;
  v_final_damage bigint;
  v_new_hp      bigint;
  v_defeated    boolean := false;
  v_has_active_role boolean;
BEGIN
  -- ดึงข้อมูล event
  SELECT * INTO v_event FROM world_boss_events WHERE id = p_event_id;
  IF NOT FOUND OR v_event.status != 'active' THEN
    RETURN json_build_object('success', false, 'reason', 'event_not_active');
  END IF;

  -- ดึงข้อมูล user
  SELECT * INTO v_user FROM users WHERE id = p_user_id;

  -- ตรวจ cooldown 1 ชั่วโมง
  SELECT * INTO v_participant
  FROM world_boss_participants
  WHERE event_id = p_event_id AND user_id = p_user_id;

  IF FOUND AND v_participant.last_attack > NOW() - INTERVAL '1 hour' THEN
    RETURN json_build_object(
      'success', false,
      'reason', 'cooldown',
      'next_attack_at', v_participant.last_attack + INTERVAL '1 hour'
    );
  END IF;

  -- คำนวณ XP ที่ได้ใน 24 ชั่วโมงที่ผ่านมา
  SELECT COALESCE(SUM(q.xp_reward), 0) INTO v_xp_24h
  FROM user_quests uq
  JOIN quests q ON q.id = uq.quest_id
  WHERE uq.user_id  = p_user_id
    AND uq.status   = 'approved'
    AND uq.reviewed_at >= NOW() - INTERVAL '24 hours';

  -- base damage: XP/10 ขั้นต่ำ 10
  v_base_damage := GREATEST(v_xp_24h / 10.0, 10);

  -- role bonus
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = p_user_id AND is_active = true
  ) INTO v_has_active_role;
  IF v_has_active_role THEN
    v_role_bonus := 1.10;
  END IF;

  -- streak bonus
  v_streak_bonus := 1.0 + (v_user.streak_current / 100.0);

  -- final damage
  v_final_damage := ROUND(
    v_base_damage * v_class_bonus * v_role_bonus * v_streak_bonus
  );

  -- อัปเดต current_hp — ป้องกัน negative
  v_new_hp := GREATEST(v_event.current_hp - v_final_damage, 0);
  UPDATE world_boss_events
  SET current_hp = v_new_hp
  WHERE id = p_event_id;

  -- upsert participant
  INSERT INTO world_boss_participants
    (event_id, user_id, total_damage, attack_count, last_attack)
  VALUES
    (p_event_id, p_user_id, v_final_damage, 1, NOW())
  ON CONFLICT (event_id, user_id) DO UPDATE
    SET total_damage  = world_boss_participants.total_damage + v_final_damage,
        attack_count  = world_boss_participants.attack_count + 1,
        last_attack   = NOW();

  -- ตรวจว่า HP หมดหรือยัง
  IF v_new_hp <= 0 THEN
    v_defeated := true;
    UPDATE world_boss_events
    SET status = 'defeated'
    WHERE id = p_event_id;

    -- มอบรางวัลให้ผู้เข้าร่วมทุกคน
    PERFORM grant_world_boss_rewards(p_event_id);
  END IF;

  RETURN json_build_object(
    'success',       true,
    'damage',        v_final_damage,
    'remaining_hp',  v_new_hp,
    'total_hp',      v_event.total_hp,
    'defeated',      v_defeated,
    'base_damage',   v_base_damage,
    'role_bonus',    v_role_bonus,
    'streak_bonus',  v_streak_bonus
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Function: `grant_world_boss_rewards()`

```sql
-- เรียกเมื่อ Boss HP <= 0 — มอบรางวัลทุกคนที่ร่วม
CREATE OR REPLACE FUNCTION grant_world_boss_rewards(p_event_id integer)
RETURNS void AS $$
DECLARE
  v_event  world_boss_events%ROWTYPE;
  v_part   world_boss_participants%ROWTYPE;
BEGIN
  SELECT * INTO v_event FROM world_boss_events WHERE id = p_event_id;

  FOR v_part IN
    SELECT * FROM world_boss_participants WHERE event_id = p_event_id
  LOOP
    -- Crystal reward
    UPDATE users
    SET crystal = crystal + v_event.reward_crystal
    WHERE id = v_part.user_id;

    -- Badge reward (ถ้ากำหนด)
    IF v_event.reward_badge_id IS NOT NULL THEN
      INSERT INTO user_badges (user_id, badge_id)
      VALUES (v_part.user_id, v_event.reward_badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;

    -- Title reward (ถ้ากำหนด)
    IF v_event.reward_title_id IS NOT NULL THEN
      INSERT INTO user_titles (user_id, title_id)
      VALUES (v_part.user_id, v_event.reward_title_id)
      ON CONFLICT (user_id, title_id) DO NOTHING;
    END IF;

    -- Notification
    INSERT INTO notifications (user_id, title, body)
    VALUES (
      v_part.user_id,
      '💀 Boss ถูกสังหารแล้ว!',
      'คุณทำ damage รวม ' || v_part.total_damage ||
      ' — ได้รับ ' || v_event.reward_crystal || ' Crystal + รางวัลพิเศษ!'
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Cron Job World Boss

```sql
-- Job 8: เปลี่ยนสถานะ World Boss ที่ถึงเวลา (ทุก 5 นาที)
SELECT cron.schedule(
  'activate-world-boss',
  '*/5 * * * *',
  $$
    -- เปิด boss ที่ถึงเวลา
    UPDATE world_boss_events
    SET status = 'active'
    WHERE status = 'upcoming'
      AND starts_at <= NOW()
      AND ends_at > NOW();

    -- หมดเวลาแล้วแต่ยังไม่ defeated → expired
    UPDATE world_boss_events
    SET status = 'expired'
    WHERE status = 'active'
      AND ends_at < NOW();
  $$
);
```

---

## 34.3 Events Page (`events.html`)

### โครงสร้างหน้า

```javascript
import { requireAuth } from './supabase.js'
import { supabase } from './supabase.js'

const session = await requireAuth('./login.html')
if (!session) return
const currentUser = session.user

// โหลด World Boss ที่กำลัง active
async function loadActiveBoss() {
  const { data: boss } = await supabase
    .from('world_boss_events')
    .select('*')
    .eq('status', 'active')
    .order('starts_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!boss) {
    document.getElementById('bossSection').innerHTML =
      '<p>ไม่มี World Boss ในขณะนี้</p>'
    return
  }

  renderBossCard(boss)
  await loadMyParticipation(boss.id)
  await loadBossLeaderboard(boss.id)
}

// ดึง participation ของตัวเอง (ตรวจ cooldown)
async function loadMyParticipation(eventId) {
  const { data } = await supabase
    .from('world_boss_participants')
    .select('total_damage, attack_count, last_attack')
    .eq('event_id', eventId)
    .eq('user_id', currentUser.id)
    .maybeSingle()

  const now = new Date()
  const canAttack = !data || !data.last_attack ||
    new Date(data.last_attack) < new Date(now - 60 * 60 * 1000)

  document.getElementById('attackBtn').disabled = !canAttack

  if (!canAttack && data?.last_attack) {
    const nextAttack = new Date(new Date(data.last_attack).getTime() + 60 * 60 * 1000)
    const mins = Math.ceil((nextAttack - now) / 60000)
    document.getElementById('cooldownText').textContent =
      `โจมตีได้อีกใน ${mins} นาที`
  }
}

// กด Attack
async function attackBoss(eventId) {
  document.getElementById('attackBtn').disabled = true
  const { data, error } = await supabase.rpc('attack_world_boss', {
    p_user_id:  currentUser.id,
    p_event_id: eventId
  })

  if (error || !data?.success) {
    const reason = data?.reason || error?.message
    showToast('⚠️ ' + reason, 'error')
    document.getElementById('attackBtn').disabled = false
    return
  }

  showToast(`⚔️ โจมตีสำเร็จ! Damage: ${data.damage.toLocaleString()}`, 'success')
  if (data.defeated) {
    showToast('🎉 Boss ถูกสังหาร! รับรางวัลแล้ว!', 'success')
  }

  await loadActiveBoss()
}

// Leaderboard damage
async function loadBossLeaderboard(eventId) {
  const { data } = await supabase
    .from('world_boss_participants')
    .select(`
      total_damage, attack_count,
      users!inner(username, display_name, avatar_seed, class)
    `)
    .eq('event_id', eventId)
    .order('total_damage', { ascending: false })
    .limit(20)

  renderLeaderboard(data)
}
```

### HTML ปุ่ม Attack

```html
<!-- Boss Card -->
<div id="bossSection">
  <div class="boss-card">
    <div id="bossName"></div>
    <div id="bossHPBar">
      <div id="bossHPFill"></div>
    </div>
    <p id="bossHPText"></p>
    <button id="attackBtn" onclick="attackBoss(currentBossId)">
      ⚔️ โจมตี Boss
    </button>
    <small id="cooldownText"></small>
  </div>
</div>

<!-- Damage Leaderboard -->
<div id="leaderboardSection">
  <h3>🏆 Top Damage</h3>
  <div id="leaderboardList"></div>
</div>
```

---

# 35. Phase 4 – ระบบ Competitive (Speedrun Duel, Province War, Weighted Leaderboard)

## 35.1 Speedrun Duel

### แนวคิด

ใช้ตาราง `pvp_duels` เดิม เพิ่ม `duel_type = 'speedrun'` — ทั้งสองฝ่ายได้ `quest_id` เดียวกัน ใครส่งหลักฐาน approved ก่อนชนะ

### เพิ่ม quest_id ใน pvp_duels

```sql
-- Migration: เพิ่ม column สำหรับ speedrun
ALTER TABLE pvp_duels ADD COLUMN speedrun_quest_id integer REFERENCES quests(id);
```

### RPC: `create_speedrun_duel()`

```sql
CREATE OR REPLACE FUNCTION create_speedrun_duel(
  p_challenger_id uuid,
  p_defender_id   uuid,
  p_quest_id      integer
)
RETURNS json AS $$
DECLARE
  v_duel_id uuid;
  v_challenger users%ROWTYPE;
  v_defender   users%ROWTYPE;
BEGIN
  SELECT * INTO v_challenger FROM users WHERE id = p_challenger_id;
  SELECT * INTO v_defender   FROM users WHERE id = p_defender_id;

  -- ตรวจ level diff ไม่เกิน 5 (ตาม Section 27)
  IF ABS(v_challenger.level - v_defender.level) > 5 THEN
    RETURN json_build_object(
      'success', false,
      'reason', 'level_diff_too_large'
    );
  END IF;

  -- ตรวจว่า quest นั้นยังเป็น active
  IF NOT EXISTS (
    SELECT 1 FROM quests WHERE id = p_quest_id AND is_active = true
  ) THEN
    RETURN json_build_object('success', false, 'reason', 'quest_not_active');
  END IF;

  INSERT INTO pvp_duels (
    challenger_id, defender_id,
    duel_type, speedrun_quest_id,
    status, expires_at
  )
  VALUES (
    p_challenger_id, p_defender_id,
    'speedrun', p_quest_id,
    'pending', NOW() + INTERVAL '48 hours'
  )
  RETURNING id INTO v_duel_id;

  -- แจ้ง defender
  INSERT INTO notifications (user_id, title, body)
  VALUES (
    p_defender_id,
    '⚡ ได้รับคำท้า Speedrun Duel!',
    v_challenger.display_name || ' ท้าคุณแข่ง Speedrun Quest — ยอมรับเพื่อเริ่ม!'
  );

  RETURN json_build_object(
    'success',  true,
    'duel_id',  v_duel_id,
    'quest_id', p_quest_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Logic ตัดสิน Speedrun Winner

เมื่อ `pvp_duels.duel_type = 'speedrun'` ระบบตรวจ `user_quests.reviewed_at` ว่าใครได้ `approved` ก่อน:

```sql
-- Trigger function: ตรวจ speedrun duel เมื่อ quest approved
CREATE OR REPLACE FUNCTION check_speedrun_on_quest_approve()
RETURNS trigger AS $$
DECLARE
  v_duel pvp_duels%ROWTYPE;
  v_opponent_quest user_quests%ROWTYPE;
  v_winner_id uuid;
BEGIN
  -- หา speedrun duel ที่ active และ quest ตรงกัน
  SELECT * INTO v_duel
  FROM pvp_duels
  WHERE duel_type = 'speedrun'
    AND speedrun_quest_id = NEW.quest_id
    AND status = 'active'
    AND (challenger_id = NEW.user_id OR defender_id = NEW.user_id)
  LIMIT 1;

  IF NOT FOUND THEN RETURN NEW; END IF;

  -- ผู้ submit คนแรก = winner
  v_winner_id := NEW.user_id;

  UPDATE pvp_duels
  SET
    winner_id    = v_winner_id,
    status       = 'completed',
    completed_at = NOW()
  WHERE id = v_duel.id;

  -- รางวัล
  UPDATE users SET gold = gold + 75 WHERE id = v_winner_id;

  INSERT INTO notifications (user_id, title, body)
  VALUES (
    v_winner_id,
    '⚡ Speedrun Duel ชนะ!',
    'คุณส่งหลักฐาน Quest ก่อน — ได้รับ 75 Gold!'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_check_speedrun
AFTER UPDATE OF status ON user_quests
FOR EACH ROW
WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
EXECUTE FUNCTION check_speedrun_on_quest_approve();
```

---

## 35.2 Province War (City War Enhancement)

### แนวคิด

ขยาย `city_wars` และ `city_war_participants` ที่มีอยู่แล้ว — เพิ่ม daily contribution cap และระบบรางวัล

### Migration: เพิ่ม column

```sql
-- daily cap และ reward tracking
ALTER TABLE city_war_participants
  ADD COLUMN daily_xp_contributed integer DEFAULT 0,
  ADD COLUMN last_contribution_date date;

-- reward tracking ป้องกัน duplicate
ALTER TABLE city_wars
  ADD COLUMN winner_city text,    -- มีอยู่แล้ว ตรวจ
  ADD COLUMN reward_distributed boolean DEFAULT false;
```

### Function: `contribute_city_war()`

```sql
CREATE OR REPLACE FUNCTION contribute_city_war(
  p_user_id  uuid,
  p_war_id   integer,
  p_xp_amount integer
)
RETURNS json AS $$
DECLARE
  v_war    city_wars%ROWTYPE;
  v_user   users%ROWTYPE;
  v_part   city_war_participants%ROWTYPE;
  v_cap    integer := 500;  -- XP cap รายวัน
  v_today  date := CURRENT_DATE;
  v_allowed integer;
BEGIN
  SELECT * INTO v_war FROM city_wars WHERE id = p_war_id;
  IF v_war.status != 'active' THEN
    RETURN json_build_object('success', false, 'reason', 'war_not_active');
  END IF;

  SELECT * INTO v_user FROM users WHERE id = p_user_id;

  -- ตรวจว่า user อยู่ในเมืองที่ร่วมสงคราม
  IF v_user.city NOT IN (v_war.city_a, v_war.city_b) THEN
    RETURN json_build_object('success', false, 'reason', 'not_in_war_city');
  END IF;

  -- ดึง/สร้าง participation record
  SELECT * INTO v_part
  FROM city_war_participants
  WHERE war_id = p_war_id AND user_id = p_user_id;

  IF NOT FOUND THEN
    INSERT INTO city_war_participants
      (war_id, user_id, city_name, xp_contributed, daily_xp_contributed, last_contribution_date)
    VALUES
      (p_war_id, p_user_id, v_user.city, 0, 0, v_today)
    RETURNING * INTO v_part;
  END IF;

  -- คำนวณ daily cap
  IF v_part.last_contribution_date = v_today THEN
    v_allowed := GREATEST(v_cap - v_part.daily_xp_contributed, 0);
  ELSE
    v_allowed := v_cap;
  END IF;

  IF v_allowed = 0 THEN
    RETURN json_build_object(
      'success', false,
      'reason', 'daily_cap_reached',
      'cap', v_cap
    );
  END IF;

  -- จำกัดไม่เกิน cap
  p_xp_amount := LEAST(p_xp_amount, v_allowed);

  -- อัปเดต participant
  UPDATE city_war_participants
  SET
    xp_contributed       = xp_contributed + p_xp_amount,
    daily_xp_contributed = CASE
      WHEN last_contribution_date = v_today
        THEN daily_xp_contributed + p_xp_amount
      ELSE p_xp_amount
    END,
    last_contribution_date = v_today
  WHERE war_id = p_war_id AND user_id = p_user_id;

  -- อัปเดต city XP ใน city_wars
  IF v_user.city = v_war.city_a THEN
    UPDATE city_wars SET city_a_xp = city_a_xp + p_xp_amount WHERE id = p_war_id;
  ELSE
    UPDATE city_wars SET city_b_xp = city_b_xp + p_xp_amount WHERE id = p_war_id;
  END IF;

  RETURN json_build_object(
    'success',       true,
    'contributed',   p_xp_amount,
    'daily_total',   COALESCE(v_part.daily_xp_contributed, 0) + p_xp_amount,
    'daily_cap',     v_cap,
    'remaining_cap', v_allowed - p_xp_amount
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Function: `resolve_city_war()`

```sql
CREATE OR REPLACE FUNCTION resolve_city_war(p_war_id integer)
RETURNS json AS $$
DECLARE
  v_war   city_wars%ROWTYPE;
  v_winner text;
  v_loser  text;
BEGIN
  SELECT * INTO v_war FROM city_wars WHERE id = p_war_id;
  IF v_war.status != 'active' OR v_war.reward_distributed THEN
    RETURN json_build_object('success', false, 'reason', 'invalid_state');
  END IF;

  -- ตัดสิน winner
  IF v_war.city_a_xp >= v_war.city_b_xp THEN
    v_winner := v_war.city_a;
    v_loser  := v_war.city_b;
  ELSE
    v_winner := v_war.city_b;
    v_loser  := v_war.city_a;
  END IF;

  UPDATE city_wars
  SET status = 'completed', winner_city = v_winner, reward_distributed = true
  WHERE id = p_war_id;

  -- รางวัล: ทุกคนที่ contribute > 0 ในเมืองชนะ
  UPDATE users
  SET
    gold    = gold + 200,
    crystal = crystal + 30
  WHERE id IN (
    SELECT user_id FROM city_war_participants
    WHERE war_id = p_war_id
      AND city_name = v_winner
      AND xp_contributed > 0
  );

  -- Badge reward (เพิ่ม badge id 1 = City Defender ตัวอย่าง)
  INSERT INTO user_badges (user_id, badge_id)
  SELECT user_id, 1
  FROM city_war_participants
  WHERE war_id = p_war_id
    AND city_name = v_winner
    AND xp_contributed > 0
  ON CONFLICT (user_id, badge_id) DO NOTHING;

  -- City Buff สำหรับเมืองชนะ (+10% XP bonus 3 วัน)
  UPDATE city_stats
  SET active_buffs = jsonb_set(active_buffs, '{xp_bonus}', '0.10')
  WHERE city_name = v_winner;

  -- Notification ผู้ชนะ
  INSERT INTO notifications (user_id, title, body)
  SELECT user_id, '🏆 Province War ชนะ!',
    v_winner || ' ชนะสงคราม! คุณได้รับ 200 Gold + 30 Crystal + Badge!'
  FROM city_war_participants
  WHERE war_id = p_war_id AND city_name = v_winner AND xp_contributed > 0;

  RETURN json_build_object('success', true, 'winner', v_winner);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Cron: Resolve City Wars

```sql
SELECT cron.schedule(
  'resolve-city-wars',
  '15 * * * *',
  $$
    SELECT resolve_city_war(id)
    FROM city_wars
    WHERE status = 'active'
      AND ends_at < NOW()
      AND reward_distributed = false;
  $$
);
```

---

## 35.3 Weighted Leaderboard

### แนวคิด

Leaderboard ปัจจุบัน (`leaderboard_monthly`) เรียงด้วย `xp_this_month` ล้วน ๆ — คนที่ออนไลน์ทุกวันได้เปรียบมากเกินไป Weighted Leaderboard ปรับด้วยความสม่ำเสมอ

**สูตร:**
```
weighted_score = (xp_this_month / GREATEST(active_days_this_month, 1))
                 * (1 + streak_current / 100.0)
```

โดย `active_days_this_month` = จำนวนวันที่ user มี approved quest ในเดือนนี้

### Migration: เพิ่ม column

```sql
ALTER TABLE users ADD COLUMN active_days_this_month integer DEFAULT 0;

-- Trigger อัปเดต active_days เมื่อ quest approved
CREATE OR REPLACE FUNCTION update_active_days_on_quest_approve()
RETURNS trigger AS $$
BEGIN
  -- นับวันที่ unique ที่มี approved quest ในเดือนนี้
  UPDATE users
  SET active_days_this_month = (
    SELECT COUNT(DISTINCT DATE(reviewed_at))
    FROM user_quests
    WHERE user_id = NEW.user_id
      AND status = 'approved'
      AND DATE_TRUNC('month', reviewed_at) = DATE_TRUNC('month', NOW())
  )
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_active_days
AFTER UPDATE OF status ON user_quests
FOR EACH ROW
WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
EXECUTE FUNCTION update_active_days_on_quest_approve();
```

### View: `leaderboard_weighted`

```sql
CREATE OR REPLACE VIEW leaderboard_weighted AS
WITH scored AS (
  SELECT
    id, username, display_name, class, level, rank,
    xp_this_month, streak_current, avatar_seed, city,
    active_days_this_month,
    ROUND(
      (xp_this_month::numeric / GREATEST(active_days_this_month, 1))
      * (1.0 + streak_current / 100.0)
    )::integer AS weighted_score
  FROM users
  WHERE profile_public = true
    AND xp_this_month > 0
)
SELECT
  *,
  ROW_NUMBER() OVER (ORDER BY weighted_score DESC, xp_this_month DESC) AS weighted_rank,
  CASE
    WHEN rank = 'legendary'  THEN 6
    WHEN rank = 'diamond'    THEN 5
    WHEN rank = 'platinum'   THEN 4
    WHEN rank = 'gold'       THEN 3
    WHEN rank = 'silver'     THEN 2
    ELSE 1
  END AS tier_order
FROM scored;
```

### Reset active_days_this_month ทุกต้นเดือน

```sql
-- เพิ่มใน Job 2 (reset_monthly_xp) หรือสร้าง job แยก
-- แนะนำเพิ่มใน function reset_monthly_xp() ที่มีอยู่แล้ว
-- โดย ALTER function เพิ่มบรรทัด:
--   UPDATE users SET active_days_this_month = 0;
```

### Frontend Query

```javascript
// ดึง Weighted Leaderboard — กรองตาม tier (rank)
async function getWeightedLeaderboard(rankFilter = null, limit = 50) {
  let query = supabase
    .from('leaderboard_weighted')
    .select('*')
    .order('weighted_rank', { ascending: true })
    .limit(limit)

  if (rankFilter) {
    query = query.eq('rank', rankFilter)
  }

  const { data, error } = await query
  return data
}
```

---

# 36. Phase 5 – Full Virtual Society (School, Court, Housing)

## 36.1 Education System

### แนวคิด

ผู้เล่นสามารถ "เข้าเรียน" หลักสูตรเสมือนจริง เรียนจบแล้วปลดล็อค skill หรือ Secondary Role ใน Phase 3

### ตาราง

```sql
-- สถาบันการศึกษา (สร้างโดย admin หรือ guild ระดับ High)
CREATE TABLE academies (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  description text,
  city        text REFERENCES city_stats(city_name),
  owner_guild_id integer REFERENCES guilds(id),
  specialty   text,   -- 'combat','knowledge','social','business','creative'
  is_active   boolean DEFAULT true,
  created_at  timestamp DEFAULT NOW()
);

-- หลักสูตรใน academy
CREATE TABLE courses (
  id           serial PRIMARY KEY,
  academy_id   integer REFERENCES academies(id) ON DELETE CASCADE,
  title        text NOT NULL,
  description  text,
  duration_days integer NOT NULL DEFAULT 7,   -- ระยะเวลาเรียน
  xp_cost      integer DEFAULT 0,             -- XP ที่ต้องใช้สมัคร
  gold_cost    integer DEFAULT 0,
  crystal_cost integer DEFAULT 0,
  reward_role  text,        -- role_name ที่ได้เมื่อจบ (ตาราง user_roles)
  reward_badge_id integer REFERENCES badges(id),
  reward_title_id integer REFERENCES titles(id),
  max_students integer DEFAULT 30,
  is_active    boolean DEFAULT true,
  created_at   timestamp DEFAULT NOW()
);

-- การลงทะเบียนเรียน
CREATE TABLE user_courses (
  id            serial PRIMARY KEY,
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id     integer REFERENCES courses(id),
  enrolled_at   timestamp DEFAULT NOW(),
  completed_at  timestamp,
  status        text DEFAULT 'enrolled'
    CHECK (status IN ('enrolled','in_progress','completed','dropped')),
  progress_pct  integer DEFAULT 0,   -- 0–100
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_user_courses_user ON user_courses(user_id);
CREATE INDEX idx_user_courses_status ON user_courses(status);
```

### Function: `complete_course()`

```sql
CREATE OR REPLACE FUNCTION complete_course(
  p_user_id   uuid,
  p_course_id integer
)
RETURNS json AS $$
DECLARE
  v_course  courses%ROWTYPE;
  v_uc      user_courses%ROWTYPE;
BEGIN
  SELECT * INTO v_course FROM courses WHERE id = p_course_id;
  SELECT * INTO v_uc
  FROM user_courses
  WHERE user_id = p_user_id AND course_id = p_course_id;

  IF NOT FOUND OR v_uc.status = 'completed' THEN
    RETURN json_build_object('success', false, 'reason', 'invalid_enrollment');
  END IF;

  -- อัปเดตสถานะ
  UPDATE user_courses
  SET status = 'completed', completed_at = NOW(), progress_pct = 100
  WHERE user_id = p_user_id AND course_id = p_course_id;

  -- ปลดล็อค Role (ถ้ากำหนด)
  IF v_course.reward_role IS NOT NULL THEN
    PERFORM unlock_role(p_user_id, v_course.reward_role, 'school', p_course_id);
  END IF;

  -- Badge reward
  IF v_course.reward_badge_id IS NOT NULL THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (p_user_id, v_course.reward_badge_id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Title reward
  IF v_course.reward_title_id IS NOT NULL THEN
    INSERT INTO user_titles (user_id, title_id)
    VALUES (p_user_id, v_course.reward_title_id)
    ON CONFLICT (user_id, title_id) DO NOTHING;
  END IF;

  INSERT INTO notifications (user_id, title, body)
  VALUES (
    p_user_id,
    '🎓 เรียนจบแล้ว!',
    'คุณสำเร็จการศึกษาจากหลักสูตร: ' || v_course.title
  );

  RETURN json_build_object('success', true, 'course_title', v_course.title);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 36.2 Justice System

### แนวคิด

ระบบศาลจำลอง — player ที่ทำผิดกฎชุมชน (spam quest, โกง verify, harassment) ถูกฟ้องร้อง ผู้เล่นที่มี Role `police` หรือ Reputation สูงทำหน้าที่ Judge/Jury

### ตาราง

```sql
-- คดีความ
CREATE TABLE court_cases (
  id            serial PRIMARY KEY,
  defendant_id  uuid REFERENCES users(id),  -- ผู้ถูกกล่าวหา
  plaintiff_id  uuid REFERENCES users(id),  -- ผู้ฟ้อง
  charge        text NOT NULL,   -- 'quest_fraud','verify_abuse','harassment','spam'
  evidence_url  text,
  status        text DEFAULT 'open'
    CHECK (status IN ('open','trial','verdict','closed','dismissed')),
  judge_id      uuid REFERENCES users(id),
  jury_ids      uuid[] DEFAULT '{}',
  opened_at     timestamp DEFAULT NOW(),
  closes_at     timestamp DEFAULT (NOW() + INTERVAL '72 hours'),
  verdict       text,    -- 'guilty' | 'not_guilty' | 'dismissed'
  penalty_applied boolean DEFAULT false
);

-- คำตัดสินของ Jury แต่ละคน
CREATE TABLE case_verdicts (
  id         serial PRIMARY KEY,
  case_id    integer REFERENCES court_cases(id) ON DELETE CASCADE,
  juror_id   uuid REFERENCES users(id),
  vote       text CHECK (vote IN ('guilty','not_guilty')),
  reason     text,
  voted_at   timestamp DEFAULT NOW(),
  UNIQUE(case_id, juror_id)
);

-- บันทึกการจำคุก
CREATE TABLE user_jail (
  id           serial PRIMARY KEY,
  user_id      uuid REFERENCES users(id) UNIQUE,
  case_id      integer REFERENCES court_cases(id),
  jailed_at    timestamp DEFAULT NOW(),
  release_at   timestamp NOT NULL,
  penalty_gold integer DEFAULT 0,   -- ปรับ
  penalty_rep  integer DEFAULT 0,   -- ลด reputation
  is_active    boolean DEFAULT true
);

CREATE INDEX idx_user_jail_active ON user_jail(user_id, is_active);
```

### ประเภทโทษ

| ความผิด (`charge`) | โทษ |
|--------------------|----|
| `quest_fraud` | ปรับ 500 Gold + ลด 50 reputation + จำคุก 24 ชม. |
| `verify_abuse` | ลด 30 reputation + ระงับสิทธิ์ vote 48 ชม. |
| `harassment` | ลด 100 reputation + จำคุก 72 ชม. |
| `spam` | ลด 20 reputation + ระงับโพสต์ feed 24 ชม. |

### Function: `apply_court_verdict()`

```sql
CREATE OR REPLACE FUNCTION apply_court_verdict(p_case_id integer)
RETURNS json AS $$
DECLARE
  v_case    court_cases%ROWTYPE;
  v_guilty  integer;
  v_not     integer;
  v_verdict text;
  v_penalty_gold integer := 0;
  v_penalty_rep  integer := 0;
  v_jail_hours   integer := 0;
BEGIN
  SELECT * INTO v_case FROM court_cases WHERE id = p_case_id;
  IF v_case.status = 'verdict' OR v_case.penalty_applied THEN
    RETURN json_build_object('success', false, 'reason', 'already_processed');
  END IF;

  -- นับคะแนน jury
  SELECT
    COUNT(*) FILTER (WHERE vote = 'guilty'),
    COUNT(*) FILTER (WHERE vote = 'not_guilty')
  INTO v_guilty, v_not
  FROM case_verdicts WHERE case_id = p_case_id;

  v_verdict := CASE WHEN v_guilty > v_not THEN 'guilty' ELSE 'not_guilty' END;

  UPDATE court_cases
  SET status = 'verdict', verdict = v_verdict, penalty_applied = true
  WHERE id = p_case_id;

  IF v_verdict = 'guilty' THEN
    -- กำหนดโทษตาม charge
    CASE v_case.charge
      WHEN 'quest_fraud' THEN
        v_penalty_gold := 500; v_penalty_rep := 50; v_jail_hours := 24;
      WHEN 'verify_abuse' THEN
        v_penalty_rep := 30;
      WHEN 'harassment' THEN
        v_penalty_rep := 100; v_jail_hours := 72;
      WHEN 'spam' THEN
        v_penalty_rep := 20;
      ELSE
        v_penalty_rep := 10;
    END CASE;

    -- ลด gold
    IF v_penalty_gold > 0 THEN
      UPDATE users
      SET gold = GREATEST(gold - v_penalty_gold, 0)
      WHERE id = v_case.defendant_id;
    END IF;

    -- ลด reputation ใน city ของ defendant
    PERFORM add_city_reputation(
      v_case.defendant_id,
      (SELECT city FROM users WHERE id = v_case.defendant_id),
      -v_penalty_rep
    );

    -- จำคุก
    IF v_jail_hours > 0 THEN
      INSERT INTO user_jail
        (user_id, case_id, release_at, penalty_gold, penalty_rep)
      VALUES (
        v_case.defendant_id, p_case_id,
        NOW() + (v_jail_hours || ' hours')::interval,
        v_penalty_gold, v_penalty_rep
      )
      ON CONFLICT (user_id) DO UPDATE
        SET release_at = GREATEST(user_jail.release_at, NOW() + (v_jail_hours || ' hours')::interval),
            is_active  = true;
    END IF;

    INSERT INTO notifications (user_id, title, body)
    VALUES (
      v_case.defendant_id,
      '⚖️ ศาลตัดสิน: มีความผิด',
      'คุณถูกลงโทษ — ปรับ ' || v_penalty_gold || ' Gold, ลด ' || v_penalty_rep || ' Reputation'
        || CASE WHEN v_jail_hours > 0 THEN ', จำคุก ' || v_jail_hours || ' ชั่วโมง' ELSE '' END
    );
  ELSE
    INSERT INTO notifications (user_id, title, body)
    VALUES (
      v_case.defendant_id,
      '⚖️ ศาลตัดสิน: ไม่มีความผิด',
      'คดีถูกยกฟ้อง — คุณพ้นข้อกล่าวหาแล้ว'
    );
  END IF;

  RETURN json_build_object(
    'success',  true,
    'verdict',  v_verdict,
    'guilty',   v_guilty,
    'not_guilty', v_not
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

> **Frontend guard:** ก่อนให้ user กระทำบางอย่าง (ส่ง feed, vote) ตรวจว่า `user_jail.is_active = true AND release_at > NOW()` → แสดง UI จำกัดสิทธิ์

---

## 36.3 Housing & Family

### แนวคิด

ผู้เล่นสามารถ "ซื้อ" บ้านเสมือน ตกแต่ง และสร้างครอบครัวกับผู้เล่นอื่น ผลต่อ gameplay: rest buff เพิ่ม XP, shared quest, inheritance crystal

### ตาราง

```sql
-- บ้าน
CREATE TABLE houses (
  id           serial PRIMARY KEY,
  owner_id     uuid REFERENCES users(id) UNIQUE,
  city         text REFERENCES city_stats(city_name),
  house_name   text DEFAULT 'บ้านของฉัน',
  decoration   jsonb DEFAULT '{}',
    -- { "theme": "modern", "furniture": [...], "upgrade_level": 1 }
  size         text DEFAULT 'small' CHECK (size IN ('small','medium','large','mansion')),
  gold_cost    integer NOT NULL DEFAULT 1000,
  purchased_at timestamp DEFAULT NOW(),
  rest_buff_pct numeric(4,2) DEFAULT 5.00,   -- XP bonus % เมื่อ "พัก" ในบ้าน
  last_rest_at  timestamp
);

-- ความสัมพันธ์ในครอบครัว
CREATE TABLE family_relations (
  id          serial PRIMARY KEY,
  user1_id    uuid REFERENCES users(id),
  user2_id    uuid REFERENCES users(id),
  relation_type text NOT NULL
    CHECK (relation_type IN ('partner','parent','child','sibling','guardian')),
  established_at timestamp DEFAULT NOW(),
  is_active   boolean DEFAULT true,
  UNIQUE(user1_id, user2_id, relation_type),
  CHECK (user1_id != user2_id)
);

CREATE INDEX idx_family_user1 ON family_relations(user1_id, is_active);
CREATE INDEX idx_family_user2 ON family_relations(user2_id, is_active);
```

### ผลกระทบ Gameplay

| ระบบ | ผล |
|------|----|
| **Rest Buff** | หลัง "พักในบ้าน" 8 ชั่วโมง → XP +5% (small) ถึง +15% (mansion) ต่อ Quest ครั้งถัดไป |
| **Shared Quest** | สมาชิกครอบครัว partner สามารถทำ Quest เดียวกันและแชร์ XP (multiplier 0.5x) ให้อีกฝ่าย |
| **Inheritance** | เมื่อผู้เล่นหยุดเล่น >30 วัน crystal บางส่วน (10%) ถ่ายโอนให้ `partner` อัตโนมัติ |
| **House Buff ใน City** | บ้านใน city เพิ่ม `city_stats.prosperity_level` ต่อ population |

### Function: `use_house_rest()`

```sql
CREATE OR REPLACE FUNCTION use_house_rest(p_user_id uuid)
RETURNS json AS $$
DECLARE
  v_house houses%ROWTYPE;
  v_cooldown_hours integer := 8;
BEGIN
  SELECT * INTO v_house FROM houses WHERE owner_id = p_user_id;
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'reason', 'no_house');
  END IF;

  -- ตรวจ cooldown
  IF v_house.last_rest_at > NOW() - (v_cooldown_hours || ' hours')::interval THEN
    RETURN json_build_object(
      'success', false,
      'reason', 'cooldown',
      'next_rest_at', v_house.last_rest_at + (v_cooldown_hours || ' hours')::interval
    );
  END IF;

  -- บันทึก rest (ผล buff จะคำนวณใน grant_quest_xp ถัดไป — ต้องแก้ function นั้นรองรับ)
  UPDATE houses SET last_rest_at = NOW() WHERE owner_id = p_user_id;

  -- เพิ่ม temporary buff ใน users metadata (ตัวอย่าง: เก็บใน jsonb ถ้ามี column นั้น)
  -- หรือใช้ตาราง user_buffs ถ้าสร้างใน Phase 5
  INSERT INTO notifications (user_id, title, body)
  VALUES (
    p_user_id,
    '🏠 พักผ่อนในบ้านแล้ว',
    'Rest Buff เปิดใช้งาน: XP +'
      || v_house.rest_buff_pct || '% ใน Quest ครั้งถัดไป (8 ชั่วโมง)'
  );

  RETURN json_build_object(
    'success',       true,
    'rest_buff_pct', v_house.rest_buff_pct
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

# 37. Appendix — Migration Script Templates

> SQL migration ตัวอย่างสำหรับนักพัฒนา — รันใน Supabase SQL Editor ทีละ Phase

## 37.1 Migration: Phase 3 — World Boss + User Roles

```sql
-- ============================================================
-- NEXUS LIFE — Phase 3 Migration
-- World Boss Events + Secondary Role System
-- ============================================================

BEGIN;

-- ===== USER ROLES =====
CREATE TABLE IF NOT EXISTS user_roles (
  id            serial PRIMARY KEY,
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE,
  role_name     text NOT NULL
    CHECK (role_name IN ('police','firefighter','doctor','teacher',
                         'engineer','journalist','chef','athlete')),
  unlocked_at   timestamp DEFAULT NOW(),
  is_active     boolean DEFAULT false,
  unlock_source text,
  unlock_ref_id integer,
  UNIQUE(user_id, role_name)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active  ON user_roles(user_id, is_active);

-- ===== WORLD BOSS EVENTS =====
CREATE TABLE IF NOT EXISTS world_boss_events (
  id                serial PRIMARY KEY,
  boss_name         text NOT NULL,
  boss_emoji        text DEFAULT '👹',
  location_city     text REFERENCES city_stats(city_name),
  max_participants  integer DEFAULT 500,
  starts_at         timestamp NOT NULL,
  ends_at           timestamp NOT NULL,
  total_hp          bigint NOT NULL DEFAULT 1000000,
  current_hp        bigint NOT NULL DEFAULT 1000000,
  status            text DEFAULT 'upcoming'
    CHECK (status IN ('upcoming','active','defeated','expired')),
  reward_badge_id   integer REFERENCES badges(id),
  reward_title_id   integer REFERENCES titles(id),
  reward_crystal    integer DEFAULT 100,
  created_at        timestamp DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_world_boss_status
  ON world_boss_events(status);

-- ===== WORLD BOSS PARTICIPANTS =====
CREATE TABLE IF NOT EXISTS world_boss_participants (
  id           serial PRIMARY KEY,
  event_id     integer REFERENCES world_boss_events(id) ON DELETE CASCADE,
  user_id      uuid REFERENCES users(id) ON DELETE CASCADE,
  total_damage bigint DEFAULT 0,
  attack_count integer DEFAULT 0,
  last_attack  timestamp,
  joined_at    timestamp DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_wbp_event_damage
  ON world_boss_participants(event_id, total_damage DESC);

-- ===== FUNCTIONS =====
-- (วาง SQL functions unlock_role, attack_world_boss, grant_world_boss_rewards
--  จาก Section 34 ที่นี่)

-- ===== RLS =====
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_boss_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_boss_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_roles_select_own"
  ON user_roles FOR SELECT USING ( user_id = auth.uid() );

CREATE POLICY "world_boss_events_select_all"
  ON world_boss_events FOR SELECT USING ( true );

CREATE POLICY "world_boss_participants_select_all"
  ON world_boss_participants FOR SELECT USING ( true );

-- ===== CRON =====
SELECT cron.schedule(
  'activate-world-boss',
  '*/5 * * * *',
  $$
    UPDATE world_boss_events SET status = 'active'
    WHERE status = 'upcoming' AND starts_at <= NOW() AND ends_at > NOW();
    UPDATE world_boss_events SET status = 'expired'
    WHERE status = 'active' AND ends_at < NOW();
  $$
);

COMMIT;
```

---

## 37.2 Migration: Phase 4 — Weighted Leaderboard + Speedrun Duel

```sql
-- ============================================================
-- NEXUS LIFE — Phase 4 Migration
-- Weighted Leaderboard + Speedrun Duel + Province War Enhanced
-- ============================================================

BEGIN;

-- ===== WEIGHTED LEADERBOARD =====
-- เพิ่ม column ใน users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS active_days_this_month integer DEFAULT 0;

-- Trigger อัปเดต active_days
CREATE OR REPLACE FUNCTION update_active_days_on_quest_approve()
RETURNS trigger AS $$
BEGIN
  UPDATE users
  SET active_days_this_month = (
    SELECT COUNT(DISTINCT DATE(reviewed_at))
    FROM user_quests
    WHERE user_id = NEW.user_id
      AND status = 'approved'
      AND DATE_TRUNC('month', reviewed_at) = DATE_TRUNC('month', NOW())
  )
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_active_days ON user_quests;
CREATE TRIGGER trg_update_active_days
  AFTER UPDATE OF status ON user_quests
  FOR EACH ROW
  WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
  EXECUTE FUNCTION update_active_days_on_quest_approve();

-- สร้าง View
CREATE OR REPLACE VIEW leaderboard_weighted AS
WITH scored AS (
  SELECT
    id, username, display_name, class, level, rank,
    xp_this_month, streak_current, avatar_seed, city,
    active_days_this_month,
    ROUND(
      (xp_this_month::numeric / GREATEST(active_days_this_month, 1))
      * (1.0 + streak_current / 100.0)
    )::integer AS weighted_score
  FROM users
  WHERE profile_public = true AND xp_this_month > 0
)
SELECT *,
  ROW_NUMBER() OVER (ORDER BY weighted_score DESC, xp_this_month DESC) AS weighted_rank
FROM scored;

-- ===== SPEEDRUN DUEL =====
ALTER TABLE pvp_duels
  ADD COLUMN IF NOT EXISTS speedrun_quest_id integer REFERENCES quests(id);

-- (วาง SQL: create_speedrun_duel, check_speedrun_on_quest_approve trigger จาก Section 35.1)

-- ===== PROVINCE WAR ENHANCED =====
ALTER TABLE city_war_participants
  ADD COLUMN IF NOT EXISTS daily_xp_contributed integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_contribution_date date;

ALTER TABLE city_wars
  ADD COLUMN IF NOT EXISTS reward_distributed boolean DEFAULT false;

-- (วาง SQL: contribute_city_war, resolve_city_war จาก Section 35.2)

-- ===== CRON =====
SELECT cron.schedule(
  'resolve-city-wars',
  '15 * * * *',
  $$
    SELECT resolve_city_war(id)
    FROM city_wars
    WHERE status = 'active'
      AND ends_at < NOW()
      AND reward_distributed = false;
  $$
);

COMMIT;
```

---

## 37.3 Migration: Phase 5 — School, Court, Housing

```sql
-- ============================================================
-- NEXUS LIFE — Phase 5 Migration
-- Education System + Justice System + Housing & Family
-- ============================================================

BEGIN;

-- ===== EDUCATION SYSTEM =====
CREATE TABLE IF NOT EXISTS academies (
  id              serial PRIMARY KEY,
  name            text NOT NULL,
  description     text,
  city            text REFERENCES city_stats(city_name),
  owner_guild_id  integer REFERENCES guilds(id),
  specialty       text
    CHECK (specialty IN ('combat','knowledge','social','business','creative')),
  is_active       boolean DEFAULT true,
  created_at      timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id             serial PRIMARY KEY,
  academy_id     integer REFERENCES academies(id) ON DELETE CASCADE,
  title          text NOT NULL,
  description    text,
  duration_days  integer NOT NULL DEFAULT 7,
  xp_cost        integer DEFAULT 0,
  gold_cost      integer DEFAULT 0,
  crystal_cost   integer DEFAULT 0,
  reward_role    text,
  reward_badge_id integer REFERENCES badges(id),
  reward_title_id integer REFERENCES titles(id),
  max_students   integer DEFAULT 30,
  is_active      boolean DEFAULT true,
  created_at     timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_courses (
  id            serial PRIMARY KEY,
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id     integer REFERENCES courses(id),
  enrolled_at   timestamp DEFAULT NOW(),
  completed_at  timestamp,
  status        text DEFAULT 'enrolled'
    CHECK (status IN ('enrolled','in_progress','completed','dropped')),
  progress_pct  integer DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- ===== JUSTICE SYSTEM =====
CREATE TABLE IF NOT EXISTS court_cases (
  id                serial PRIMARY KEY,
  defendant_id      uuid REFERENCES users(id),
  plaintiff_id      uuid REFERENCES users(id),
  charge            text NOT NULL
    CHECK (charge IN ('quest_fraud','verify_abuse','harassment','spam','other')),
  evidence_url      text,
  status            text DEFAULT 'open'
    CHECK (status IN ('open','trial','verdict','closed','dismissed')),
  judge_id          uuid REFERENCES users(id),
  jury_ids          uuid[] DEFAULT '{}',
  opened_at         timestamp DEFAULT NOW(),
  closes_at         timestamp DEFAULT (NOW() + INTERVAL '72 hours'),
  verdict           text CHECK (verdict IN ('guilty','not_guilty','dismissed')),
  penalty_applied   boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS case_verdicts (
  id         serial PRIMARY KEY,
  case_id    integer REFERENCES court_cases(id) ON DELETE CASCADE,
  juror_id   uuid REFERENCES users(id),
  vote       text CHECK (vote IN ('guilty','not_guilty')),
  reason     text,
  voted_at   timestamp DEFAULT NOW(),
  UNIQUE(case_id, juror_id)
);

CREATE TABLE IF NOT EXISTS user_jail (
  id            serial PRIMARY KEY,
  user_id       uuid REFERENCES users(id) UNIQUE,
  case_id       integer REFERENCES court_cases(id),
  jailed_at     timestamp DEFAULT NOW(),
  release_at    timestamp NOT NULL,
  penalty_gold  integer DEFAULT 0,
  penalty_rep   integer DEFAULT 0,
  is_active     boolean DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_user_jail_active
  ON user_jail(user_id, is_active);

-- ===== HOUSING & FAMILY =====
CREATE TABLE IF NOT EXISTS houses (
  id            serial PRIMARY KEY,
  owner_id      uuid REFERENCES users(id) UNIQUE,
  city          text REFERENCES city_stats(city_name),
  house_name    text DEFAULT 'บ้านของฉัน',
  decoration    jsonb DEFAULT '{}',
  size          text DEFAULT 'small'
    CHECK (size IN ('small','medium','large','mansion')),
  gold_cost     integer NOT NULL DEFAULT 1000,
  purchased_at  timestamp DEFAULT NOW(),
  rest_buff_pct numeric(4,2) DEFAULT 5.00,
  last_rest_at  timestamp
);

CREATE TABLE IF NOT EXISTS family_relations (
  id             serial PRIMARY KEY,
  user1_id       uuid REFERENCES users(id),
  user2_id       uuid REFERENCES users(id),
  relation_type  text NOT NULL
    CHECK (relation_type IN ('partner','parent','child','sibling','guardian')),
  established_at timestamp DEFAULT NOW(),
  is_active      boolean DEFAULT true,
  UNIQUE(user1_id, user2_id, relation_type),
  CHECK (user1_id != user2_id)
);

CREATE INDEX IF NOT EXISTS idx_family_user1
  ON family_relations(user1_id, is_active);
CREATE INDEX IF NOT EXISTS idx_family_user2
  ON family_relations(user2_id, is_active);

-- ===== RLS =====
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE court_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_verdicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_jail ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_relations ENABLE ROW LEVEL SECURITY;

-- academies/courses: อ่านได้ทุกคน
CREATE POLICY "academies_select_all"  ON academies  FOR SELECT USING (true);
CREATE POLICY "courses_select_all"    ON courses     FOR SELECT USING (true);

-- user_courses: ดูของตัวเอง
CREATE POLICY "user_courses_select_own"
  ON user_courses FOR SELECT USING ( user_id = auth.uid() );
CREATE POLICY "user_courses_insert_own"
  ON user_courses FOR INSERT WITH CHECK ( user_id = auth.uid() );

-- court_cases: ทุกคนดูได้ (transparency)
CREATE POLICY "court_cases_select_all"
  ON court_cases FOR SELECT USING (true);
CREATE POLICY "court_cases_insert_auth"
  ON court_cases FOR INSERT WITH CHECK (
    plaintiff_id = auth.uid()
  );

-- user_jail: ดูของตัวเอง + admin
CREATE POLICY "user_jail_select_own"
  ON user_jail FOR SELECT USING ( user_id = auth.uid() OR is_admin() );

-- houses: ดูของตัวเอง
CREATE POLICY "houses_select_own"
  ON houses FOR SELECT USING ( owner_id = auth.uid() );
CREATE POLICY "houses_insert_own"
  ON houses FOR INSERT WITH CHECK ( owner_id = auth.uid() );
CREATE POLICY "houses_update_own"
  ON houses FOR UPDATE USING ( owner_id = auth.uid() );

-- family_relations: ดูได้ทั้งสองฝ่าย
CREATE POLICY "family_select_own"
  ON family_relations FOR SELECT
  USING ( user1_id = auth.uid() OR user2_id = auth.uid() );
CREATE POLICY "family_insert_own"
  ON family_relations FOR INSERT
  WITH CHECK ( user1_id = auth.uid() );

COMMIT;
```

---

## 37.4 สรุปตาราง Migration Checklist

| Phase | Migration File | จำนวนตารางใหม่ | จำนวน Function/Trigger | Cron Jobs |
|-------|---------------|----------------|------------------------|-----------|
| 1 | `phase1_admin_rls.sql` | 0 | 1 (resolve_expired_pvp_duels) | +2 |
| 2 | `phase2_guild_pvp.sql` | 0 | 3 (update_guild_quest_progress, resolve_guild_war, pvp_rankings view) | +2 |
| 3 | `phase3_social_advanced.sql` | 3 (user_roles, world_boss_events, world_boss_participants) | 4 (unlock_role, attack_world_boss, grant_world_boss_rewards) | +1 |
| 4 | `phase4_competitive.sql` | 0 + 1 view (leaderboard_weighted) | 3 (create_speedrun_duel, contribute_city_war, resolve_city_war) | +1 |
| 5 | `phase5_society.sql` | 7 (academies, courses, user_courses, court_cases, case_verdicts, user_jail, houses, family_relations) | 3 (complete_course, apply_court_verdict, use_house_rest) | 0 |

> **Grand Total Phase 1–5:** 10+ ตารางใหม่, 14+ functions/views/triggers, 6 cron jobs เพิ่ม
> รวมกับ Phase 0 เดิม: **44+ tables, 31+ functions, 4 views, 9 cron jobs**

---

*Blueprint Version 6.0 — Phase 1–5 Roadmap Extension*
*เพิ่มโดย: Sections 31–37*
*ใช้งานร่วมกับ Sections 1–30 (Backend + Frontend Standards ครบ 100%)*
