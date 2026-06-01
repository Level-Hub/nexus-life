# 🎮 NEXUS LIFE — Real Life MMO
## Blueprint ฉบับสมบูรณ์ v3.0

> **Changelog v3.0:** เพิ่ม Section 19 — Community Verify System (แทนระบบ Admin Verify)
> อัพเดต: Section 3.3 Proof System, Section 4.3 XP Sources, Section 5.1 SOC Stat, Section 15 Sitemap, Section 18.9 Build Priority

---

# 📋 สารบัญ

1. [Overview & Concept](#1-overview--concept)
2. [Class System](#2-class-system)
3. [Quest System](#3-quest-system)
4. [XP / Level / Rank System](#4-xp--level--rank-system)
5. [Stat System (6 ด้าน)](#5-stat-system-6-ด้าน)
6. [Profile & Avatar System](#6-profile--avatar-system)
7. [Title & Badge System](#7-title--badge-system)
8. [Guild System](#8-guild-system)
9. [PvP / Duel System](#9-pvp--duel-system)
10. [Economy & Currency](#10-economy--currency)
11. [World Map System](#11-world-map-system)
12. [Notification System](#12-notification-system)
13. [Onboarding Flow](#13-onboarding-flow)
14. [Supabase Schema (SQL)](#14-supabase-schema-sql)
15. [Page Structure (Sitemap)](#15-page-structure-sitemap)
16. [Build Priority](#16-build-priority)
17. [Monetization](#17-monetization)
18. [City Social System](#18-city-social-system)
19. [Community Verify System ⭐ NEW](#19-community-verify-system)

---

# 1. Overview & Concept

## แนวคิดหลัก
NEXUS LIFE คือ Real Life MMO — แอปที่เปลี่ยนกิจกรรมในชีวิตจริง (ออกกำลังกาย, อ่านหนังสือ, เดินทาง, ออมเงิน ฯลฯ) ให้กลายเป็น Quest ใน Game ได้รับ XP, Level Up, ปลดล็อค Title/Badge และแข่งกับผู้เล่นคนอื่นบน Leaderboard

## Core Loop
```
ทำกิจกรรมจริง → ส่งหลักฐาน → รับ XP + Stat → Level Up → ปลดล็อคของ → แข่ง Leaderboard → กลับไปทำกิจกรรมต่อ
```

## Tech Stack (แนะนำ)
- **Frontend:** HTML/CSS/JS (Vanilla) หรือ React
- **Backend/DB:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Storage:** Supabase Storage (รูปหลักฐาน, avatar)
- **Map:** Mapbox GL JS หรือ Leaflet.js
- **Hosting:** Vercel หรือ Netlify

---

# 2. Class System

## 2.1 อาชีพทั้ง 6

| Class | สี | ธีม | Stat หลัก |
|-------|----|-----|-----------|
| ⚔️ Warrior | #ff4444 | นักกีฬา, สายฟิต | 💪 STR |
| 🔮 Mage | #aa44ff | นักอ่าน, นักเรียน | 🧠 INT |
| 🗺️ Explorer | #44ff88 | นักเดินทาง, สำรวจ | 🗺️ EXP |
| 💰 Merchant | #ffaa00 | สายธุรกิจ, การเงิน | 💼 BIZ |
| 🎨 Artist | #ff66aa | สร้างสรรค์, ศิลปะ | 🎨 CRE |
| 🤝 Diplomat | #00ccff | สังคม, ผู้นำ | 🤝 SOC |

## 2.2 รายละเอียดแต่ละ Class

### ⚔️ WARRIOR
- **คอนเซ็ป:** คนที่ชนะด้วยร่างกาย ทุก Quest ต้องมีเหงื่อ
- **Quest ที่ได้ STR bonus x1.5:**
  - วิ่ง / เดิน / ปั่นจักรยาน (GPS หรือรูปหลักฐาน)
  - เล่นยิม / ออกกำลังกาย (รูปหลักฐาน)
  - เล่นกีฬา (รูปหลักฐาน)
  - กายบริหารที่บ้าน
- **Class Bonus:** XP จาก Physical Quest +15%
- **Class Skill (passive):** Streak ไม่ขาดแม้ข้ามวัน 1 ครั้ง/เดือน (Grace Day)

### 🔮 MAGE
- **คอนเซ็ป:** คนที่เติบโตด้วยความรู้ ยิ่งเรียนยิ่งแกร่ง
- **Quest ที่ได้ INT bonus x1.5:**
  - อ่านหนังสือ (ส่งรูปหน้าที่อ่าน + จำนวนหน้า)
  - เรียนคอร์สออนไลน์ (รูป certificate หรือ progress)
  - ทำ Quiz / ทดสอบความรู้ใน app
  - เขียน Journal / บันทึกสิ่งที่เรียนรู้
- **Class Bonus:** XP จาก Knowledge Quest +15%
- **Class Skill (passive):** ได้ Bonus XP เมื่ออ่านหนังสือติดกัน 7 วัน (+20%)

### 🗺️ EXPLORER
- **คอนเซ็ป:** ยิ่งออกไปข้างนอก ยิ่งได้ XP เยอะ
- **Quest ที่ได้ EXP bonus x1.5:**
  - Check-in สถานที่ใหม่ (GPS location)
  - เดินทางไปต่างจังหวัด / ต่างประเทศ
  - ถ่ายรูปสถานที่ + caption
  - ค้นพบ Hidden Spot ที่ไม่มีคนเคย check-in ใน app
- **Class Bonus:** XP จาก Exploration Quest +15%
- **Class Skill (passive):** เป็นคนแรกที่ Check-in สถานที่ใหม่ได้ "Pioneer Badge" ทันที

### 💰 MERCHANT
- **คอนเซ็ป:** ทำเงิน บริหารเงิน สร้าง value
- **Quest ที่ได้ BIZ bonus x1.5:**
  - บันทึกการออมเงิน (ส่งจำนวนที่ออม)
  - อ่านหนังสือการเงิน / ธุรกิจ
  - ทำโปรเจกต์ side income
  - Networking / ไปงาน event ธุรกิจ
- **Class Bonus:** XP จาก Business Quest +15%
- **Class Skill (passive):** ทุก 10,000 บาทที่ออม ได้ Bonus XP พิเศษ

### 🎨 ARTIST
- **คอนเซ็ป:** สร้างสรรค์สิ่งใหม่ทุกวัน
- **Quest ที่ได้ CRE bonus x1.5:**
  - วาดรูป / Digital art (ส่งรูปผลงาน)
  - เขียน Blog / บทความ / เรื่องสั้น
  - ถ่ายภาพ (Photography challenge)
  - ทำดนตรี / เล่นเครื่องดนตรี
  - ทำ Video / Edit VDO
  - ทำ Craft / DIY
- **Class Bonus:** XP จาก Creative Quest +15%
- **Class Skill (passive):** ผลงานที่ได้ Like จากผู้เล่นคนอื่น ได้ bonus XP เพิ่ม

### 🤝 DIPLOMAT
- **คอนเซ็ป:** ยิ่งมีคนรู้จักมาก ยิ่งแข็งแกร่ง
- **Quest ที่ได้ SOC bonus x1.5:**
  - ชวนเพื่อนสมัคร app (Referral)
  - เข้าร่วม Guild และทำ Guild Quest
  - ช่วย Verify หลักฐานผู้เล่นคนอื่น
  - Post ใน Global / City Chat (ที่มีคนตอบ)
  - จัด Meetup / ชวนผู้เล่นมาเจอกันจริง
- **Class Bonus:** XP จาก Social Quest +15%
- **Class Skill (passive):** ทุกคนใน Guild ที่ตัวเองชวนมา Level Up → ได้ bonus XP ด้วย

## 2.3 กฎการเลือก Class
- เลือกได้ 1 อาชีพตอน Onboarding
- เปลี่ยน Class ได้ทุก 90 วัน (แต่ Stat สะสมไว้อยู่ ไม่รีเซ็ต)
- เปลี่ยนก่อน 90 วันได้ด้วย "Class Change Ticket" (ของหายาก จาก Achievement)

---

# 3. Quest System

## 3.1 ประเภท Quest

| ประเภท | รีเซ็ต | XP | จำนวน/วัน |
|--------|--------|-----|-----------|
| Daily Quest | ทุกเที่ยงคืน | 50–150 XP | 3–5 quest |
| Weekly Quest | ทุกวันจันทร์ 00:00 | 300–800 XP | 3 quest |
| Challenge Quest | ไม่รีเซ็ต (ทำครั้งเดียว) | 500–2000 XP | ไม่จำกัด |
| Guild Quest | ทุก 3 วัน | 200–600 XP/คน | 1–2 quest |
| Story Quest | ไม่รีเซ็ต (ทำตามลำดับ) | 1000–5000 XP | ไม่จำกัด |

## 3.2 ตัวอย่าง Daily Quest แยกตาม Class

### ⚔️ Warrior Daily
- วิ่ง 3 km (รูป GPS หรือ screenshot Strava)
- ออกกำลังกาย 30 นาที (รูปหลักฐาน)
- เดิน 5,000 ก้าว (screenshot pedometer)

### 🔮 Mage Daily
- อ่านหนังสือ 20 หน้า (รูปหน้าที่อ่าน)
- บันทึกสิ่งที่เรียนรู้วันนี้ 1 เรื่อง (text)
- ทำ Daily Quiz ใน app (5 ข้อ)

### 🗺️ Explorer Daily
- Check-in สถานที่ใหม่ (GPS)
- ถ่ายรูประหว่างทาง + caption
- ค้นหา Hidden Spot ในเมือง

### 💰 Merchant Daily
- บันทึกรายรับ-รายจ่ายวันนี้
- อ่านข่าวธุรกิจ/การเงิน 1 บทความ (link)
- ออมเงิน (บันทึกจำนวน)

### 🎨 Artist Daily
- สร้างผลงาน 1 ชิ้น (รูป/เขียน/ถ่าย)
- ฝึกทักษะ 30 นาที
- Share ผลงานให้คนอื่น vote

### 🤝 Diplomat Daily
- ทักทายผู้เล่นใหม่ใน City Chat
- Vote/Comment ผลงาน Artist 3 คน
- **Community Verify หลักฐาน Quest ของผู้เล่นคนอื่น 1 ครั้ง** → +SOC 5 pts

## 3.3 ระบบส่งหลักฐาน (Proof System)

### ประเภทหลักฐาน
| ประเภท | ใช้กับ Quest | วิธีตรวจ |
|--------|-------------|---------|
| รูปภาพ | ทั่วไป | **Community Verify** (ดู Section 19) |
| GPS Check-in | Explorer | Location API อัตโนมัติ |
| Screenshot | App อื่น (Strava, etc.) | **Community Verify** |
| Text/Journal | Mage/Merchant | **Auto approve ทันที** |
| Link URL | บทความ, คอร์ส | Auto check URL valid |

### กระบวนการ Review (Community Verify)
```
ส่งหลักฐาน (รูปภาพ/screenshot)
    ↓
[Auto Check] ไฟล์ขนาด > 50KB? (ป้องกันรูปเปล่า)
    ↓
status = 'pending_review' → โชว์ใน verify.html + feed.html
    ↓
ผู้เล่นคนอื่นในเมือง Vote: ✅ Approve / ❌ Reject
    ↓
Approve ≥ 3 → status = 'approved' → XP + Stat เข้าอัตโนมัติ
Reject ≥ 3   → status = 'rejected' → แจ้ง user (re-submit ได้ 1 ครั้ง)
    ↓
ถ้าไม่มีคน vote ครบใน 24 ชม. → Auto Approve อัตโนมัติ
```

> **หมายเหตุ:** Text/Journal quest (proof_type = 'text') → approve อัตโนมัติทันที ไม่ต้อง verify

### Anti-Cheat
- รูปต้องมีขนาด > 50KB (ป้องกันรูปเปล่า/รูปขาว)
- ห้าม vote ของตัวเอง (check user_id ≠ voter_id ใน DB)
- ห้าม vote คนเดียวกัน 2 ครั้ง (unique constraint)
- รูปซ้ำ (hash check) → ไม่ผ่านอัตโนมัติ
- ถ้าถูก reject บ่อย (> 3 ครั้ง/เดือน) → แจ้งเตือน warning

## 3.4 Quest Streak

| Streak | Bonus |
|--------|-------|
| 3 วันติด | +10% XP ทุก Quest |
| 7 วันติด | +20% XP + Badge "Week Warrior" |
| 30 วันติด | +30% XP + Title ปลดล็อค |
| 100 วันติด | +50% XP + Title "The Unbreakable" + Special Frame |

- ขาด 1 วัน = Streak รีเซ็ต
- Warrior Class มี Grace Day 1 ครั้ง/เดือน (ขาดได้ 1 วันโดยไม่รีเซ็ต)

---

# 4. XP / Level / Rank System

## 4.1 Level System

Level คำนวณจาก XP สะสมรวม (ไม่รีเซ็ต)

| Level | XP ที่ต้องการ (สะสม) | ชื่อ Level |
|-------|---------------------|-----------|
| 1 | 0 | Novice |
| 2 | 100 | Novice |
| 3 | 250 | Novice |
| 4 | 500 | Apprentice |
| 5 | 900 | Apprentice |
| 6 | 1,400 | Apprentice |
| 7 | 2,100 | Journeyman |
| 8 | 3,000 | Journeyman |
| 9 | 4,100 | Journeyman |
| 10 | 5,500 | Veteran |
| 15 | 15,000 | Veteran |
| 20 | 30,000 | Expert |
| 25 | 55,000 | Expert |
| 30 | 90,000 | Master |
| 40 | 200,000 | Grand Master |
| 50 | 400,000 | Legend |

**สูตรคำนวณ XP ต่อ Level:**
```
XP(n) = XP(n-1) + (n * 50) + (n^1.5 * 30)
```

## 4.2 Rank System

Rank คือ "ยศ" แยกจาก Level — คำนวณจาก XP ที่ได้ใน **เดือนปัจจุบัน** เพื่อให้คนใหม่มีโอกาสขึ้น Rank ได้

| Rank | XP เดือนนี้ | สี | สิทธิ์พิเศษ |
|------|------------|-----|------------|
| 🥉 BRONZE | 0–999 | #cd7f32 | - |
| 🥈 SILVER | 1,000–2,999 | #c0c0c0 | City Chat สี Silver |
| 🥇 GOLD | 3,000–7,999 | #ffd700 | Priority Review, Gold Frame |
| 💎 PLATINUM | 8,000–14,999 | #00f5ff | Exclusive Quest, Platinum Frame |
| 💠 DIAMOND | 15,000–39,999 | #b044ff | Beta Feature Access, Diamond Frame |
| 👑 LEGENDARY | Top 100 ของประเทศ | #ff9500 | Unique Frame, ชื่อ Gold ใน Leaderboard |

- Rank รีเซ็ตทุกต้นเดือน
- ถ้าอยู่ GOLD ขึ้นไป ได้รับ "Season Reward" ตอนสิ้นเดือน

## 4.3 XP Sources

| แหล่ง XP | จำนวน |
|----------|-------|
| Daily Quest | 50–150 XP |
| Weekly Quest | 300–800 XP |
| Challenge Quest | 500–2,000 XP |
| Guild Quest | 200–600 XP |
| Story Quest | 1,000–5,000 XP |
| **Verify หลักฐานคนอื่น (Community Verify)** | **10 XP/ครั้ง** |
| **Vote ถูกต้อง (majority เดียวกัน)** | **+5 XP bonus** |
| Streak Bonus | +10–50% |
| Class Bonus | +15% |
| Referral (ชวนเพื่อน) | 200 XP |
| First Check-in สถานที่ใหม่ | 100 XP bonus |

---

# 5. Stat System (6 ด้าน)

## 5.1 ค่า Stat ทั้ง 6

| Stat | Icon | ชื่อ | Class หลัก | ได้จาก |
|------|------|------|-----------|--------|
| STR | 💪 | Strength | Warrior | ออกกำลังกาย, วิ่ง, เดิน |
| INT | 🧠 | Intelligence | Mage | อ่านหนังสือ, เรียน, Quiz |
| EXP | 🗺️ | Exploration | Explorer | Check-in, เดินทาง |
| BIZ | 💼 | Business | Merchant | ออม, networking, project |
| CRE | 🎨 | Creativity | Artist | ผลงาน, เขียน, ถ่ายรูป |
| SOC | 🤝 | Social | Diplomat | ชวนเพื่อน, Guild, **Community Verify**, interact ใน Feed |

## 5.2 วิธีคำนวณ Stat Points

- แต่ละ Quest ให้ Stat Points ตาม type ของ Quest
- Class หลักได้ Stat Points x1.5 จาก Quest ประเภทนั้น
- Class อื่นๆ ก็ได้ Stat Points ปกติจาก Quest ทุกประเภท (เพียงแต่ไม่มี bonus)

```
ตัวอย่าง:
Warrior ทำ Running Quest → ได้ 30 STR points (x1.5 bonus) + 10 EXP points
Mage ทำ Running Quest → ได้ 20 STR points (ไม่มี bonus)
```

## 5.3 Stat Threshold & Unlock

| Stat Points | ผลลัพธ์ |
|-------------|--------|
| 100 | Title ปลดล็อค (tier 1) |
| 250 | Title ปลดล็อค (tier 2) |
| 500 | Badge พิเศษ |
| 1,000 | Title ระดับ Legend |

## 5.4 แสดงผลบน Profile

```
💪 STR  ████████░░  80/100
🧠 INT  █████░░░░░  50/100
🗺️ EXP  ███░░░░░░░  30/100
💼 BIZ  ██░░░░░░░░  20/100
🎨 CRE  ░░░░░░░░░░  5/100
🤝 SOC  ██████░░░░  60/100
```

---

# 6. Profile & Avatar System

## 6.1 โครงสร้าง Profile

```
┌─────────────────────────────────────┐
│  [Dynamic Frame]                    │
│  ┌──────────┐  Username             │
│  │  Pixel   │  @handle              │
│  │  Avatar  │  ✍️ "Signature text"   │
│  │  + Pet   │  🏷️ Status: 🏃 วิ่งอยู่  │
│  └──────────┘                       │
│  🎖️ Title: "The Unbreakable"        │
│  ⚔️ Warrior | Lv.24 | 🥇 GOLD Rank  │
│                                     │
│  📊 Stats:                          │
│  💪 STR ████████░░ 80               │
│  🧠 INT █████░░░░░ 50               │
│  [ดูทั้งหมด]                         │
│                                     │
│  🏅 Badges (8/30)  [ดูทั้งหมด]       │
│  [🏅][🏅][🏅][🏅]                    │
│                                     │
│  📜 Activity Feed                   │
│  ✅ เมื่อวาน: วิ่ง 5km               │
│  ✅ 2 วันที่แล้ว: อ่านหนังสือ 30 หน้า  │
└─────────────────────────────────────┘
```

## 6.2 Pixel Avatar

- สร้างได้ตอน Onboarding
- ตัวเลือก: ทรงผม, ผิว, เสื้อผ้า, ตา, สีพื้นหลัง
- render เป็น SVG หรือ Canvas 64x64 px
- ปลดล็อค item เพิ่มตาม Level

## 6.3 Profile Frame (Dynamic)

| Frame | ได้จาก | CSS Class |
|-------|--------|-----------|
| Default | เริ่มต้น | frame-default |
| 🥈 Silver | Rank Silver | frame-silver |
| 🥇 Gold | Rank Gold | frame-gold |
| 💎 Platinum | Rank Platinum | frame-platinum |
| 💠 Diamond | Rank Diamond | frame-diamond |
| 👑 Legendary | Top 100 | frame-legendary |
| 🔥 Flame | Streak 30 วัน | frame-flame |
| 🌟 Star | ปลดล็อคทุก Badge ในหมวด | frame-star |
| 🏆 Trophy | ชนะ PvP Tournament | frame-trophy |
| 🌈 Rainbow | Event พิเศษ (ปีใหม่, สงกรานต์) | frame-rainbow |

## 6.4 Signature & Status

- **Signature:** ข้อความ max 60 ตัวอักษร แก้ได้ใน Profile Settings
- **Status:** emoji + ข้อความ max 30 ตัวอักษร เปลี่ยนได้ทุกเวลา
  - ตัวอย่าง: 🏃 "กำลังวิ่ง", 📚 "อ่านหนังสืออยู่", 😴 "พักผ่อน", 🎮 "หาสมาชิก Guild"

## 6.5 Activity Feed

แสดง 5 activity ล่าสุดบน Profile สาธารณะ เช่น:
```
✅ วิ่ง 5km · เมื่อวาน
✅ Check-in: เชียงใหม่ · 3 วันที่แล้ว
🏅 ปลดล็อค Badge: "Globe Trotter" · 5 วันที่แล้ว
⬆️ Level Up! → Lv.24 · 1 สัปดาห์ที่แล้ว
```

## 6.6 Privacy Settings

| ข้อมูล | ตัวเลือก |
|--------|---------|
| โปรไฟล์ | สาธารณะ / เฉพาะเพื่อน / ส่วนตัว |
| Stat | แสดง / ซ่อน |
| Activity Feed | แสดง / ซ่อน |
| Location (World Map) | แสดง / ซ่อน |

## 6.7 Profile Completion

Gamify การ setup โปรไฟล์:

| ทำ | XP ที่ได้ |
|----|---------|
| ใส่รูป Avatar | +50 XP |
| เขียน Signature | +30 XP |
| ตั้งค่า Status | +20 XP |
| ทำ Quest แรก | +100 XP |
| เข้าร่วม Guild | +80 XP |
| ชวนเพื่อน 1 คน | +200 XP |

แสดงเป็น Progress Bar บน Profile: "โปรไฟล์สมบูรณ์ 60% — ทำต่อเพื่อรับ XP"

---

# 7. Title & Badge System

## 7.1 Title (ฉายา)

ผู้เล่นปลดล็อคฉายาจาก Achievement แล้วเลือกใส่ได้ 1 อัน

### Title ประเภท Physical (Warrior)
| ฉายา | เงื่อนไข |
|------|---------|
| 🏃 นักวิ่งมือใหม่ | วิ่งครบ 10 km รวม |
| 💪 The Unbreakable | Streak 30 วันติด |
| 🏋️ Iron Body | ออกกำลังกาย 100 ครั้ง |
| ⚡ Speed Demon | วิ่งครบ 500 km รวม |
| 🦾 Warrior King | STR stat ถึง 1,000 |

### Title ประเภท Knowledge (Mage)
| ฉายา | เงื่อนไข |
|------|---------|
| 📖 นักอ่านมือใหม่ | อ่านหนังสือครบ 5 เล่ม |
| 🧙 จอมเวทแห่งการเรียนรู้ | ทำ Knowledge Quest ครบ 50 ครั้ง |
| 📚 ปัญญาชนไร้ขอบเขต | อ่านหนังสือ 20 เล่ม |
| 🎓 Grand Scholar | INT stat ถึง 1,000 |

### Title ประเภท Exploration (Explorer)
| ฉายา | เงื่อนไข |
|------|---------|
| 🗺️ นักสำรวจผู้กล้า | Check-in 10 เมือง |
| 📍 Pathfinder | ไปสถานที่ใหม่ 30 แห่ง |
| 🌍 Globe Trotter | Check-in 3 จังหวัด |
| 🧭 World Wanderer | เดินทางครบ 10 จังหวัด |
| 🏔️ Pioneer | เป็นคนแรก Check-in 5 สถานที่ |

### Title ประเภท Business (Merchant)
| ฉายา | เงื่อนไข |
|------|---------|
| 💰 นักวางแผนการเงิน | ออมเงิน 10,000 บาท |
| 📈 Market Master | BIZ stat ถึง 500 |
| 🏦 The Investor | ออมเงิน 100,000 บาท |

### Title ประเภท Creative (Artist)
| ฉายา | เงื่อนไข |
|------|---------|
| 🎨 Artisan | ส่งผลงาน 10 ชิ้น |
| ✍️ Storyteller | เขียน Journal 20 ครั้ง |
| 📸 Lens Master | ถ่ายรูป Quest 50 ครั้ง |
| 🌟 Creative Legend | CRE stat ถึง 1,000 |

### Title ประเภท Social (Diplomat)
| ฉายา | เงื่อนไข |
|------|---------|
| 🤝 เสน่ห์ล้นเหลือ | มีเพื่อนใน app 20 คน |
| 👑 Guild Master | เป็นผู้นำ Guild |
| 🌐 Ambassador | ชวนเพื่อนสมัคร 10 คน |
| 🏛️ Peacekeeper | Verify หลักฐาน 100 ครั้ง |

### Title ประเภท Special
| ฉายา | เงื่อนไข |
|------|---------|
| 👑 จ้าวแห่งเดือน | Top 10 Leaderboard เดือนนี้ |
| 🥇 Champion | ชนะ PvP Tournament |
| 🌈 Event Hero | ทำ Event Quest ครบในงาน |
| 🧪 Beta Tester | ใช้งาน app ในช่วง Beta |
| ⭐ Founder | สมัครใน 1,000 คนแรก |

## 7.2 Badge System

แสดงในโปรไฟล์เป็น Grid 4x4 (ล่าสุด 8 อัน, ดูทั้งหมดได้)

### Badge หมวด Physical
| Badge | Icon | เงื่อนไข |
|-------|------|---------|
| First Step | 👟 | ทำ Physical Quest ครั้งแรก |
| Week Warrior | 🔥 | Streak 7 วัน |
| Monthly Crusher | 💥 | Streak 30 วัน |
| Gold Walker | 🥇 | เดินครบ 500 km |
| Iron Man | 🦾 | ออกกำลังกาย 100 ครั้ง |

### Badge หมวด Knowledge
| Badge | Icon | เงื่อนไข |
|-------|------|---------|
| First Blood | 🧠 | ทำ Quest แรกสำเร็จ |
| Bookworm | 📚 | อ่านหนังสือ 10 เล่ม |
| Quiz Master | 🎯 | ทำ Quiz 50 ครั้ง |
| Scholar | 🎓 | INT stat ถึง 500 |

### Badge หมวด Exploration
| Badge | Icon | เงื่อนไข |
|-------|------|---------|
| Globe Trotter | 🌍 | Check-in 3 จังหวัด |
| City Explorer | 🏙️ | Check-in 10 เมือง |
| Pioneer | 🧭 | เป็นคนแรก Check-in สถานที่ใหม่ |
| Adventurer | ⛺ | เดินทาง 5 จังหวัด |

### Badge หมวด Social
| Badge | Icon | เงื่อนไข |
|-------|------|---------|
| Social Butterfly | 🦋 | เข้าร่วม Guild |
| Recruiter | 📣 | ชวนเพื่อน 5 คน |
| Duel Master | ⚔️ | ชนะ PvP 5 ครั้ง |
| Proof Master | 📸 | อัพรูปหลักฐาน 10 ครั้ง |
| Helper | 🤝 | Verify หลักฐาน 50 ครั้ง |

### Badge หมวด Special
| Badge | Icon | เงื่อนไข |
|-------|------|---------|
| Founder | ⭐ | สมัครใน 1,000 คนแรก |
| Season Champion | 🏆 | Top 3 Leaderboard เดือนไหนก็ได้ |
| Event Veteran | 🎉 | เข้าร่วม 3 Event พิเศษ |

---

# 8. Guild System

## 8.1 โครงสร้าง Guild

| ข้อมูล | รายละเอียด |
|--------|-----------|
| ขนาด | 5–30 คน |
| สร้าง Guild | ต้องเป็น Level 10 ขึ้นไป |
| ค่าสร้าง | 500 Gold (in-app currency) |
| ชื่อ Guild | 3–20 ตัวอักษร |
| Tag | [TAG] 3–4 ตัวอักษร |
| Icon | เลือกจาก preset หรืออัพโหลด |

## 8.2 Guild Roles

| Role | สิทธิ์ |
|------|-------|
| Master | ทุกอย่าง, kick, ยุบ Guild |
| Officer | kick member, จัด Quest, invite |
| Member | ทำ Quest, Chat, Vote |

## 8.3 Guild Quest

- Guild Quest ปรากฎทุก 3 วัน
- ต้องมีสมาชิกร่วมทำอย่างน้อย 3 คน
- XP แชร์ให้ทุกคนที่ร่วม (200–600 XP/คน)
- Guild ได้รับ "Guild XP" แยกจาก XP ส่วนตัว
- Guild Level คำนวณจาก Guild XP สะสม

### ตัวอย่าง Guild Quest
- "สมาชิก 5 คนวิ่งรวมกัน 50 km ภายใน 3 วัน"
- "สมาชิก 3 คนอ่านหนังสือพร้อมกัน 1 ชั่วโมง"
- "ทำ 10 Quest รวมกันภายใน 48 ชั่วโมง"

## 8.4 Territory System

- แต่ละเมือง/จังหวัด มี Territory 1 อัน
- Guild ที่มี Guild XP มากที่สุดในเมืองนั้น = ครอง Territory
- การครอง Territory ได้รับ Bonus XP +10% สำหรับ Quest ในเมืองนั้น
- Territory เปลี่ยนมือทุกสัปดาห์ตาม Guild XP

## 8.5 Guild Chat & Feed

- Guild มี Chat แยกต่างหากจาก Global/City
- Guild Feed แสดง activity ของสมาชิก เช่น "⚔️ NaruTo ทำ Quest สำเร็จ!"
- แจ้งเตือนเมื่อสมาชิก Level Up หรือปลดล็อค Badge

---

# 9. PvP / Duel System

## 9.1 แนวคิด

PvP ไม่ใช่การต่อสู้จริง แต่เป็นการแข่งทำ Quest ภายในเวลาที่กำหนด

## 9.2 โหมด PvP

### 1v1 Duel
- ท้าผู้เล่นคนใดก็ได้ (ต้อง Level ใกล้เคียงกัน ±5)
- เวลา: 24 ชั่วโมง
- แพ้/ชนะด้วย: XP ที่ได้ในช่วง 24 ชม.
- รางวัล: +50 XP, ชนะติดกัน 3 ครั้ง → Badge "Duel Master"

### Guild War
- Guild ท้า Guild (ต้องมีสมาชิกเท่ากันขึ้นไป)
- เวลา: 3 วัน
- แพ้/ชนะด้วย: XP รวมของทีม
- รางวัล: Guild XP + "Guild War Victor" Badge สำหรับทุกคนในทีม

### Monthly Tournament
- เปิดทุกต้นเดือน, ปิดรับสมัครวันที่ 5
- แบบ bracket tournament
- รางวัล: Title "Champion", Trophy Frame, Bonus Gold

---

# 10. Economy & Currency

## 10.1 ประเภท Currency

| Currency | ชื่อ | ได้จาก | ใช้ซื้อ |
|----------|------|--------|--------|
| ⭐ Gold | Gold | Quest, Achievement, Level Up | Item cosmetic, Class Change Ticket |
| 💎 Crystal | Crystal | Rank Reward, Tournament | Item หายาก, Premium cosmetic |

## 10.2 Gold Economy

**ได้รับ:**
| แหล่ง | Gold |
|-------|------|
| Daily Quest สำเร็จ | 10–30 Gold |
| Weekly Quest สำเร็จ | 50–150 Gold |
| Level Up | Level × 10 Gold |
| Rank Reward (สิ้นเดือน) | Silver=100, Gold=300, Platinum=600, Diamond=1000 |
| ชวนเพื่อน | 100 Gold/คน |

**ใช้จ่าย:**
| สิ่งที่ซื้อ | Gold |
|-----------|------|
| สร้าง Guild | 500 Gold |
| Class Change Ticket | 1,000 Gold |
| Avatar Item (ทั่วไป) | 50–200 Gold |
| Custom Frame | 300–500 Gold |
| Pet (ทั่วไป) | 500–1,000 Gold |

## 10.3 Crystal Economy

**ได้รับ:**
| แหล่ง | Crystal |
|-------|--------|
| Rank Gold ขึ้นไป (สิ้นเดือน) | 10–50 Crystal |
| ชนะ Tournament | 100–500 Crystal |
| Achievement พิเศษ | 5–20 Crystal |

**ใช้จ่าย:**
| สิ่งที่ซื้อ | Crystal |
|-----------|--------|
| Premium Avatar Frame | 30–100 Crystal |
| Exclusive Pet | 50–200 Crystal |
| Profile Theme พิเศษ | 50 Crystal |

> **หมายเหตุ:** ไม่มีการขาย Currency ด้วยเงินจริง (No Pay-to-Win) — ทุกอย่างได้จาก gameplay เท่านั้น

---

# 11. World Map System

## 11.1 แสดงผล

- แผนที่ประเทศไทย (ขยายเป็น World ได้ในอนาคต)
- แสดง Pixel Avatar ของผู้เล่นที่ให้ Location permission
- Cluster ผู้เล่นที่อยู่ใกล้กัน (ไม่แสดง exact location เพื่อความปลอดภัย)
- แสดง Guild Territory ของแต่ละเมืองด้วยสีของ Guild

## 11.2 Privacy

- แสดงเฉพาะ "เขตอำเภอ" ไม่แสดง exact GPS
- ปิดการแสดงผลบนแผนที่ได้ใน Privacy Settings
- Location อัพเดตทุก 6 ชม. (ไม่ realtime เพื่อประหยัด battery)

## 11.3 Check-in System

- กด Check-in ที่สถานที่ใดก็ได้ (ต้องอยู่ในรัศมี 100m)
- ถ้าเป็นสถานที่ใหม่ที่ไม่มีใครเคย Check-in → Explorer ได้ "Pioneer Bonus"
- สถานที่ยอดนิยม (Check-in เยอะ) จะแสดงเป็น Hotspot บนแผนที่

---

# 12. Notification System

## 12.1 ประเภทการแจ้งเตือน

| เหตุการณ์ | เวลา | ประเภท |
|----------|------|--------|
| Daily Quest รีเซ็ต | ทุกเที่ยงคืน | Push |
| Quest ใกล้หมดเวลา | 2 ชม. ก่อน | Push |
| มีคน Verify หลักฐานของนาย | ทันที | Push |
| Quest ผ่าน/ไม่ผ่าน | ทันที | Push |
| Level Up | ทันที | In-app |
| ปลดล็อค Badge ใหม่ | ทันที | In-app |
| Guild Quest เปิดใหม่ | ทุก 3 วัน | Push |
| มีคนท้า PvP | ทันที | Push |
| Streak เสี่ยงขาด | 20:00 น. | Push |
| Rank Reward (สิ้นเดือน) | วันที่ 1 | Push |

## 12.2 Notification Settings

ผู้ใช้ปิด/เปิดได้แยกประเภท ใน Settings > Notifications

---

# 13. Onboarding Flow

## 13.1 ขั้นตอน

```
1. หน้า Landing (index.html)
   ↓
2. สมัครสมาชิก (email + password หรือ Google OAuth)
   ↓
3. ตั้งชื่อตัวละคร (username ไม่ซ้ำ, 3–20 ตัว)
   ↓
4. เลือก Class (แสดงคำอธิบาย + Quest ตัวอย่างของแต่ละ class)
   ↓
5. สร้าง Pixel Avatar (ทรงผม, สี, เสื้อผ้า)
   ↓
6. Tutorial Quest แรก (ง่ายที่สุด ทำได้เลย)
   - Warrior: กด "เริ่มนับก้าว" 5 นาที
   - Mage: เขียน "สิ่งที่อยากเรียนรู้" 1 ข้อ
   - Explorer: Check-in ที่อยู่ตอนนี้
   - Merchant: บันทึกค่าใช้จ่ายวันนี้ 1 รายการ
   - Artist: อัพโหลดรูปอะไรก็ได้ที่ชอบ
   - Diplomat: ส่ง Hello ใน City Chat
   ↓
7. รับ XP แรก + เห็น Level Bar เคลื่อน
   ↓
8. แนะนำให้ Join Guild
   ↓
9. เข้าหน้า Dashboard หลัก
```

## 13.2 Tutorial Tips (In-app)

แสดง tooltip แนะนำ feature ต่างๆ ครั้งแรกที่เข้าหน้านั้น:
- Dashboard: "นี่คือ Quest ของวันนี้"
- Quest Detail: "อัพรูปหลักฐานเพื่อรับ XP"
- Leaderboard: "แข่งกับผู้เล่นในเมืองเดียวกัน"
- Profile: "แต่งโปรไฟล์ให้เป็นเอกลักษณ์"

---

# 14. Supabase Schema (SQL)

```sql
-- ============================================
-- USERS & AUTH
-- ============================================

create table users (
  id uuid primary key references auth.users(id),
  username text unique not null,
  display_name text,
  email text unique not null,
  class text check (class in ('warrior','mage','explorer','merchant','artist','diplomat')),
  level integer default 1,
  xp_total integer default 0,
  xp_this_month integer default 0,
  rank text default 'bronze',
  gold integer default 0,
  crystal integer default 0,
  avatar_config jsonb, -- { hair, skin, eyes, outfit, bg_color }
  equipped_title_id integer references titles(id),
  equipped_frame_id integer references profile_frames(id),
  equipped_pet_id integer references pets(id),
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
  created_at timestamp default now()
);

-- ============================================
-- STATS
-- ============================================

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

-- ============================================
-- QUESTS
-- ============================================

create table quests (
  id serial primary key,
  title text not null,
  description text,
  type text check (type in ('daily','weekly','challenge','guild','story')),
  class_target text, -- null = ทุก class
  xp_reward integer not null,
  gold_reward integer default 0,
  stat_type text check (stat_type in ('str','int','exp','biz','cre','soc')),
  stat_points integer default 0,
  proof_type text check (proof_type in ('image','gps','screenshot','text','url')),
  is_active boolean default true,
  created_at timestamp default now()
);

create table user_quests (
  id serial primary key,
  user_id uuid references users(id),
  quest_id integer references quests(id),
  status text check (status in ('in_progress','pending_review','approved','rejected')) default 'in_progress',
  proof_url text,
  proof_text text,
  submitted_at timestamp,
  reviewed_at timestamp,
  reviewer_ids uuid[],
  approve_count integer default 0,
  reject_count integer default 0,
  xp_granted boolean default false,
  created_at timestamp default now()
);

-- ============================================
-- TITLES & BADGES
-- ============================================

create table titles (
  id serial primary key,
  name text not null,
  description text,
  icon text,
  unlock_criteria jsonb, -- { type: 'stat', stat: 'str', value: 100 }
  category text check (category in ('physical','knowledge','exploration','business','creative','social','special'))
);

create table user_titles (
  id serial primary key,
  user_id uuid references users(id),
  title_id integer references titles(id),
  unlocked_at timestamp default now(),
  is_equipped boolean default false,
  unique(user_id, title_id)
);

create table badges (
  id serial primary key,
  name text not null,
  description text,
  icon_url text,
  unlock_condition jsonb,
  category text,
  rarity text check (rarity in ('common','rare','epic','legendary')) default 'common'
);

create table user_badges (
  id serial primary key,
  user_id uuid references users(id),
  badge_id integer references badges(id),
  unlocked_at timestamp default now(),
  unique(user_id, badge_id)
);

-- ============================================
-- PROFILE FRAMES & PETS
-- ============================================

create table profile_frames (
  id serial primary key,
  name text not null,
  css_class text,
  unlock_condition jsonb,
  rarity text default 'common'
);

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

create table user_pets (
  id serial primary key,
  user_id uuid references users(id),
  pet_id integer references pets(id),
  unlocked_at timestamp default now(),
  is_equipped boolean default false,
  unique(user_id, pet_id)
);

-- ============================================
-- GUILDS
-- ============================================

create table guilds (
  id serial primary key,
  name text unique not null,
  tag text unique not null,
  description text,
  icon_url text,
  master_id uuid references users(id),
  guild_xp integer default 0,
  guild_level integer default 1,
  member_limit integer default 30,
  is_public boolean default true,
  city text, -- เมืองหลักของ Guild
  created_at timestamp default now()
);

create table guild_members (
  id serial primary key,
  guild_id integer references guilds(id),
  user_id uuid references users(id),
  role text check (role in ('master','officer','member')) default 'member',
  joined_at timestamp default now(),
  unique(user_id)
);

create table guild_quests (
  id serial primary key,
  guild_id integer references guilds(id),
  quest_id integer references quests(id),
  target_value integer, -- เช่น วิ่งรวม 50 km
  current_value integer default 0,
  status text check (status in ('active','completed','expired')) default 'active',
  expires_at timestamp,
  created_at timestamp default now()
);

create table territories (
  id serial primary key,
  city text unique not null,
  province text,
  controlling_guild_id integer references guilds(id),
  guild_xp_this_week integer default 0,
  updated_at timestamp default now()
);

-- ============================================
-- PVP
-- ============================================

create table pvp_duels (
  id serial primary key,
  challenger_id uuid references users(id),
  opponent_id uuid references users(id),
  status text check (status in ('pending','active','completed','declined')) default 'pending',
  challenger_xp integer default 0,
  opponent_xp integer default 0,
  winner_id uuid references users(id),
  started_at timestamp,
  ends_at timestamp,
  created_at timestamp default now()
);

-- ============================================
-- WORLD MAP / CHECKIN
-- ============================================

create table checkins (
  id serial primary key,
  user_id uuid references users(id),
  place_name text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  district text,
  city text,
  province text,
  is_pioneer boolean default false, -- เป็นคนแรกที่ check-in ที่นี้ไหม
  created_at timestamp default now()
);

-- ============================================
-- ACTIVITY FEED
-- ============================================

create table activity_feed (
  id serial primary key,
  user_id uuid references users(id),
  type text check (type in ('quest_complete','level_up','badge_unlock','title_unlock','checkin','guild_join','pvp_win')),
  data jsonb, -- ข้อมูลเพิ่มเติม
  is_public boolean default true,
  created_at timestamp default now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

create table notifications (
  id serial primary key,
  user_id uuid references users(id),
  type text not null,
  title text,
  body text,
  data jsonb,
  is_read boolean default false,
  created_at timestamp default now()
);

-- ============================================
-- CHAT
-- ============================================

create table messages (
  id serial primary key,
  sender_id uuid references users(id),
  channel text, -- 'global', 'city:{city}', 'guild:{guild_id}', 'dm:{user_id}'
  content text not null,
  created_at timestamp default now()
);

-- ============================================
-- LEADERBOARD (View หรือ Materialized View)
-- ============================================

create or replace view leaderboard_monthly as
  select
    u.id,
    u.username,
    u.display_name,
    u.class,
    u.level,
    u.rank,
    u.xp_this_month,
    u.equipped_title_id,
    u.avatar_config,
    row_number() over (order by u.xp_this_month desc) as position
  from users u
  where u.profile_public = true;
```

---

# 15. Page Structure (Sitemap)

```
/ (index.html)             — Landing Page (มีแล้ว)
/auth/login                — Login
/auth/register             — Register + Onboarding
/dashboard                 — หน้าหลัก (Quest วันนี้, XP Bar, Quick Stats)
/quests                    — ดู Quest ทั้งหมด + ส่งหลักฐาน
/quests/:id                — Quest Detail
/profile/:username         — Profile สาธารณะ
/profile/me                — Profile ตัวเอง + Edit
/profile/settings          — ตั้งค่า Avatar, Signature, Privacy
/leaderboard               — Leaderboard (Global / City / Guild)
/map                       — World Map + Check-in
/guild                     — รายชื่อ Guild
/guild/:id                 — Guild Page
/guild/create              — สร้าง Guild
/pvp                       — ท้า PvP / ดูผลการแข่ง
/achievements              — Title + Badge ที่ปลดล็อคแล้ว
/shop                      — ร้านค้า (Avatar Item, Pet, Frame, Booster, Season Pass)
/wallet                    — กระเป๋าเงิน + ยอด Crystal + ประวัติธุรกรรม
/topup                     — เติมเงิน (QR PromptPay + อัปสลิป)
/notifications             — ประวัติ Notification
/admin                     — Admin Panel สำหรับ verify Quest
/admin/transactions        — Admin ตรวจสอบและยืนยันสลิปเติมเงิน
```

---

# 16. Build Priority

## Phase 1 — Core (ต้องทำก่อน, 2–3 สัปดาห์)
1. `auth/register` + `auth/login` (Supabase Auth)
2. Onboarding Flow (เลือก Class + สร้าง Avatar)
3. `dashboard` — Quest วันนี้ + XP Bar + Level
4. Quest ส่งหลักฐาน (รูปภาพ + text)
5. Proof Review System (Guild verify)
6. Streak System

## Phase 2 — Profile & Social (1–2 สัปดาห์)
7. `profile/:username` — โปรไฟล์สาธารณะ
8. Title + Badge System
9. Stat Bar (6 ด้าน)
10. Signature + Status Message
11. Activity Feed

## Phase 3 — Guild & Competition (2 สัปดาห์)
12. Guild System (สร้าง, เข้าร่วม, Guild Quest)
13. Leaderboard (Monthly Rank)
14. PvP Duel
15. Territory System

## Phase 4 — Monetization & World (2–3 สัปดาห์)
16. World Map + Check-in
17. **Shop** (Avatar Item, Pet, Frame, Booster, Season Pass)
18. **Wallet + Top-up** (QR PromptPay + Manual Verify)
19. **Admin Transactions Panel** (ยืนยันสลิป + เติม Crystal)
20. Notification System
21. Level-Up Animation
22. Dynamic Frame

## Phase 5 — Polish & Events (ongoing)
21. Monthly Tournament
22. Seasonal Events (สงกรานต์, ปีใหม่)
23. Story Quest
24. Analytics & Admin Panel

---

---

# 17. Monetization System 💰

## 17.1 ภาพรวม

NEXUS LIFE ใช้โมเดล **Free-to-Play + Optional Premium** — ผู้เล่นทุกคนเล่นได้ฟรีครบทุก feature หลัก แต่สามารถซื้อ Crystal ด้วยเงินจริงเพื่อแลกของ Cosmetic และ Utility ที่ไม่ได้ให้ความได้เปรียบในการเล่น (No Pay-to-Win)

### หลักการสำคัญ
- Crystal ได้ 2 ทาง: **gameplay** (ฟรี) และ **ซื้อด้วยเงินจริง** (premium)
- ของที่ซื้อด้วย Crystal **ไม่ทำให้แข็งแกร่งกว่าคนอื่น** เพียงแต่สวยกว่าหรือสะดวกกว่า
- Gold ยังคงได้จาก gameplay เท่านั้น ไม่ขาย
- Crystal ซื้อด้วยเงินจริงไม่สามารถขายคืน หรือโอนให้ผู้เล่นคนอื่น (ป้องกันฟอกเงิน)

---

## 17.2 Currency System (อัพเดตจาก Section 10)

| Currency | ได้จาก | ใช้ซื้อ | ขายด้วยเงินจริง |
|----------|--------|--------|----------------|
| ⭐ Gold | Gameplay เท่านั้น | Item ทั่วไป, สร้าง Guild | ❌ ไม่มี |
| 💎 Crystal | Gameplay + **ซื้อได้** | Premium Item, Booster, Season Pass | ✅ มี |

### อัตราแลกเปลี่ยน
- **1 Crystal = 1 บาท** (ง่ายต่อการเข้าใจ)
- ซื้อเยอะได้ Bonus Crystal:

| ซื้อ (บาท) | Crystal ที่ได้ | Bonus |
|-----------|--------------|-------|
| 50 ฿ | 50 💎 | — |
| 100 ฿ | 110 💎 | +10% |
| 300 ฿ | 345 💎 | +15% |
| 500 ฿ | 600 💎 | +20% |

---

## 17.3 สินค้าใน Shop

### หมวด COSMETIC (ขายดีที่สุด)

| สินค้า | Crystal | รายละเอียด |
|--------|---------|-----------|
| ✨ Avatar Frame พิเศษ | 30–99 💎 | Neon, Gold, Animated frame |
| 🎨 Avatar Skin | 49 💎 | เปลี่ยนทรงผม/ชุด/สี |
| 🐉 Pet พิเศษ | 69 💎 | มังกร, หมาเวอร์ชั่นพิเศษ |
| 🏷️ Custom Title Color | 39 💎 | เปลี่ยนสีฉายาเป็นสีรุ้งหรือ gradient |
| 🎭 Emoji Pack พิเศษ | 29 💎 | ใช้ emoji พิเศษในแชท |
| 🖼️ Profile Background | 49 💎 | Background GIF หรืออนิเมชัน |

### หมวด UTILITY (convenience ไม่ใช่ power)

| สินค้า | Crystal | รายละเอียด |
|--------|---------|-----------|
| ⚡ XP Booster 2x (24 ชม.) | 19 💎 | XP 2 เท่า 1 วัน |
| 🔄 Class Change Ticket | 49 💎 | เปลี่ยนอาชีพทันที (ปกติรอ 90 วัน) |
| 📦 Extra Daily Quest Slot | 29 💎 | เพิ่ม Daily Quest +1 ข้อ/วัน |
| 🏷️ Name Change | 39 💎 | เปลี่ยน username |
| 👥 Guild Slot Expansion | 59 💎 | เพิ่มสมาชิก Guild +5 |
| 🛡️ Streak Shield (1 วัน) | 15 💎 | ป้องกัน streak ไม่ขาดถ้าลืม 1 วัน |

### หมวด SEASON PASS

| แพ็คเกจ | Crystal | ระยะเวลา | รายละเอียด |
|---------|---------|---------|-----------|
| Season Pass Standard | 149 💎 | 30 วัน | Exclusive Frame + Badge + XP Boost ทุกวัน + Quest พิเศษ |
| Season Pass Premium | 299 💎 | 30 วัน | ทุกอย่างใน Standard + Exclusive Pet + 200 Crystal โบนัส |

### หมวด LIMITED / SEASONAL

- ขาย Frame ธีมสงกรานต์, ปีใหม่, ฮาโลวีน (ราคา 49–99 Crystal)
- Founder Pack: สมัคร 1,000 คนแรก ซื้อ Bundle พิเศษ 199 Crystal ได้ของมูลค่า 500 Crystal

---

## 17.4 กระบวนการเติมเงิน (Top-up Flow)

### Phase 1 — Manual (เริ่มต้น)

```
ผู้ใช้เข้า /topup.html
    ↓
เลือกจำนวน (50/100/300/500 บาท)
    ↓
ระบบแสดง QR PromptPay + เลขบัญชีปลายทาง
    ↓
ผู้ใช้โอนเงิน → อัปโหลดสลิป (รูปภาพ)
    ↓
ระบบสร้าง transactions record (status: 'pending')
    ↓
Admin เห็นใน /admin/transactions.html
    ↓
Admin ตรวจสลิป → กด "ยืนยัน"
    ↓
ระบบเติม Crystal อัตโนมัติ + แจ้ง notification ผู้ใช้
```

### Phase 2 — Semi-auto (ถ้ามี user เยอะ)

- เชื่อม Webhook กับ PromptPay หรือ KBank API
- ระบบ match ยอดโอนอัตโนมัติ → เติม Crystal ทันที

---

## 17.5 Anti-Abuse & Policy

### ป้องกันสลิปปลอม
- Admin ต้องตรวจยืนยันทุก transaction (Phase 1)
- บันทึก `slip_url`, `amount_thb`, `admin_verified_by` ทุกครั้ง
- ถ้าสลิปซ้ำกัน (hash check) → auto reject

### Refund Policy
- Crystal ที่ซื้อแล้วคืนไม่ได้ (ระบุชัดในหน้า topup)
- ถ้า admin ยืนยันผิด → admin แก้ได้ด้วย `refund` transaction
- Crystal ที่ได้จาก gameplay ไม่เกี่ยวกับระบบนี้

### ป้องกันฟอกเงิน
- ห้าม trade Crystal ระหว่าง user โดยตรง
- Gift ให้เพื่อนได้เฉพาะ item ที่ซื้อแล้ว ไม่ใช่ raw Crystal
- จำกัดเติมสูงสุด 3,000 บาท/วัน/user

---

## 17.6 รายได้รูปแบบอื่น

| รูปแบบ | รายละเอียด | ช่วงเวลา |
|--------|-----------|---------|
| Sponsored Quest | แบรนด์จ่ายให้มี Quest "ซื้อกาแฟที่ร้าน X" | Phase 3 |
| Guild Premium Features | Logo อนิเมชัน, สีชื่อ Guild, จ่ายรายเดือน | Phase 3 |
| Ad Rewards (Opt-in) | ดูโฆษณา 30 วิ → ได้ +5 Crystal ฟรี | Phase 3 |
| Merchandise | เสื้อ, สติกเกอร์ LINE ขายผ่าน Shopee | Phase 4 |

---

## 17.7 กลยุทธ์ส่งเสริมการขาย

- **First Purchase Bonus:** เติมครั้งแรก 100 บาท ได้ 130 Crystal (แทน 110)
- **Daily Login Crystal:** Login 7 วันติด ได้ 5 Crystal ฟรี
- **Referral:** ชวนเพื่อนสมัครและเติมเงิน → ได้ 10% ของยอดที่เพื่อนเติม (เป็น Crystal)
- **Limited Time:** ขาย Frame ธีมเทศกาล ราคาพิเศษ 72 ชม. เท่านั้น

---

## 17.8 หน้าใหม่ที่เพิ่มใน Sitemap

```
/shop.html                    — ร้านค้า (แสดงสินค้าแยกหมวด)
/wallet.html                  — กระเป๋าเงิน + ยอด Crystal + ประวัติธุรกรรม
/topup.html                   — หน้าเติมเงิน (QR + อัปสลิป)
/admin/transactions.html      — Admin ตรวจสอบและยืนยันสลิป
```

---

## 17.9 Supabase Schema — Monetization

```sql
-- ============================================
-- WALLET (ยอด Crystal ที่ซื้อด้วยเงินจริง)
-- ============================================
create table public.wallet (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade unique,
  balance_thb integer default 0,       -- เงินบาทสะสม (ยังไม่แปลงเป็น Crystal)
  crystal_purchased integer default 0, -- Crystal ที่ซื้อด้วยเงินจริง (lifetime)
  crystal_spent integer default 0,     -- Crystal ที่ใช้ไปแล้ว (lifetime)
  updated_at timestamp default now()
);

-- ============================================
-- TRANSACTIONS (ประวัติการเติมเงิน)
-- ============================================
create table public.transactions (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade,
  type text check (type in ('topup','spend','gift','refund','bonus')) not null,
  amount_thb integer,                  -- จำนวนเงินบาท (สำหรับ topup)
  crystal_amount integer not null,     -- จำนวน Crystal ที่เพิ่ม/ลด
  payment_method text check (payment_method in ('promptpay','truemoney','manual')),
  slip_url text,                       -- URL รูปสลิปใน Supabase Storage
  slip_hash text,                      -- hash ของสลิปสำหรับป้องกันซ้ำ
  status text check (status in ('pending','completed','failed','refunded')) default 'pending',
  note text,                           -- หมายเหตุ admin
  admin_verified_by uuid references public.users(id),
  verified_at timestamp,
  created_at timestamp default now()
);

-- ============================================
-- SHOP ITEMS (สินค้าทั้งหมดใน Shop)
-- ============================================
create table public.shop_items (
  id serial primary key,
  name text not null,
  description text,
  category text check (category in ('frame','avatar','pet','booster','utility','season_pass','bundle','limited')),
  crystal_cost integer not null,
  is_consumable boolean default false,  -- true = หมดแล้วหมดเลย (booster, shield)
  duration_hours integer,               -- สำหรับ consumable ที่มีเวลา (booster 24h)
  is_limited boolean default false,     -- ของ limited edition
  available_until timestamp,            -- วันหมดอายุของ limited item
  is_active boolean default true,
  metadata jsonb,                       -- { item_type: 'frame', item_id: 5, css_class: 'frame-neon' }
  created_at timestamp default now()
);

-- ============================================
-- USER PURCHASES (ประวัติการซื้อของ)
-- ============================================
create table public.user_purchases (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade,
  item_id integer references public.shop_items(id),
  transaction_id integer references public.transactions(id),
  crystal_spent integer not null,
  purchased_at timestamp default now(),
  expires_at timestamp,                 -- null = ไม่หมดอายุ, มีค่า = consumable
  is_active boolean default true        -- false = หมดอายุหรือ refund แล้ว
);

-- ============================================
-- RLS POLICIES — Monetization
-- ============================================
alter table public.wallet enable row level security;
alter table public.transactions enable row level security;
alter table public.shop_items enable row level security;
alter table public.user_purchases enable row level security;

-- Wallet: ดูและแก้ได้แค่ตัวเอง
create policy "Users see own wallet"
  on public.wallet for select using (auth.uid() = user_id);

create policy "System manages wallet"
  on public.wallet for all using (auth.uid() = user_id);

-- Transactions: ดูได้แค่ตัวเอง, insert ได้ตัวเอง
create policy "Users see own transactions"
  on public.transactions for select using (auth.uid() = user_id);

create policy "Users create own transactions"
  on public.transactions for insert with check (auth.uid() = user_id);

-- Shop Items: ทุกคนอ่านได้
create policy "Shop items are public"
  on public.shop_items for select using (true);

-- User Purchases: ดูได้แค่ตัวเอง
create policy "Users see own purchases"
  on public.user_purchases for select using (auth.uid() = user_id);

-- ============================================
-- SEED DATA — Shop Items เริ่มต้น
-- ============================================
insert into public.shop_items (name, description, category, crystal_cost, is_consumable, duration_hours, metadata) values
-- Cosmetic: Frames
('Neon Frame', 'กรอบโปรไฟล์ Neon สีม่วง', 'frame', 49, false, null, '{"css_class":"frame-neon"}'),
('Gold Elite Frame', 'กรอบทองสำหรับนักรบผู้ยิ่งใหญ่', 'frame', 79, false, null, '{"css_class":"frame-gold-elite"}'),
('Flame Frame', 'กรอบเปลวไฟ animated', 'frame', 99, false, null, '{"css_class":"frame-flame-premium"}'),

-- Cosmetic: Pets
('Mini Dragon', 'มังกรน้อยตาม profile', 'pet', 69, false, null, '{"emoji":"🐉","pet_id":"mini_dragon"}'),
('Space Cat', 'แมวอวกาศสุดคิ้วต์', 'pet', 69, false, null, '{"emoji":"🐱","pet_id":"space_cat"}'),

-- Cosmetic: Avatar
('Rainbow Title Color', 'เปลี่ยนสีฉายาเป็น gradient รุ้ง', 'avatar', 39, false, null, '{"type":"title_color","value":"rainbow"}'),
('Special Emoji Pack', 'Emoji พิเศษ 20 แบบสำหรับแชท', 'avatar', 29, false, null, '{"type":"emoji_pack","pack_id":"special_v1"}'),

-- Utility: Consumable
('XP Booster 2x', 'XP 2 เท่าเป็นเวลา 24 ชั่วโมง', 'booster', 19, true, 24, '{"multiplier":2,"stat":"xp"}'),
('Streak Shield', 'ป้องกัน Streak ไม่ขาด 1 วัน', 'utility', 15, true, null, '{"type":"streak_shield","uses":1}'),
('Class Change Ticket', 'เปลี่ยนอาชีพได้ทันที 1 ครั้ง', 'utility', 49, true, null, '{"type":"class_change","uses":1}'),
('Extra Quest Slot', 'เพิ่ม Daily Quest Slot +1 วันนี้', 'utility', 29, true, 24, '{"type":"quest_slot","amount":1}'),
('Name Change', 'เปลี่ยน username ได้ 1 ครั้ง', 'utility', 39, true, null, '{"type":"name_change","uses":1}'),
('Guild Slot +5', 'เพิ่ม member limit ของ Guild +5 คน', 'utility', 59, false, null, '{"type":"guild_slot","amount":5}'),

-- Season Pass
('Season Pass Standard', 'Exclusive Frame + Badge + XP Boost ทุกวัน + Quest พิเศษ ระยะเวลา 30 วัน', 'season_pass', 149, true, 720, '{"type":"season_pass","tier":"standard"}'),
('Season Pass Premium', 'ทุกอย่างใน Standard + Exclusive Pet + 200 Crystal โบนัส', 'season_pass', 299, true, 720, '{"type":"season_pass","tier":"premium"}');

-- ============================================
-- FUNCTION: เติม Crystal หลัง Admin ยืนยัน
-- ============================================
create or replace function public.confirm_topup(
  p_transaction_id integer,
  p_admin_id uuid
)
returns void as $$
declare
  v_tx public.transactions%rowtype;
  v_crystal integer;
begin
  -- ดึงข้อมูล transaction
  select * into v_tx from public.transactions where id = p_transaction_id and status = 'pending';
  if not found then
    raise exception 'Transaction not found or already processed';
  end if;

  -- คำนวณ Crystal พร้อม Bonus
  v_crystal := case
    when v_tx.amount_thb >= 500 then round(v_tx.amount_thb * 1.20)
    when v_tx.amount_thb >= 300 then round(v_tx.amount_thb * 1.15)
    when v_tx.amount_thb >= 100 then round(v_tx.amount_thb * 1.10)
    else v_tx.amount_thb
  end;

  -- อัพเดต transaction
  update public.transactions set
    crystal_amount = v_crystal,
    status = 'completed',
    admin_verified_by = p_admin_id,
    verified_at = now()
  where id = p_transaction_id;

  -- เติม Crystal ให้ user ใน users table
  update public.users set crystal = crystal + v_crystal where id = v_tx.user_id;

  -- อัพเดต wallet
  insert into public.wallet (user_id, crystal_purchased)
    values (v_tx.user_id, v_crystal)
    on conflict (user_id) do update set
      crystal_purchased = public.wallet.crystal_purchased + v_crystal,
      balance_thb = public.wallet.balance_thb + v_tx.amount_thb,
      updated_at = now();

  -- แจ้ง notification
  insert into public.notifications (user_id, title, body)
    values (v_tx.user_id, '💎 เติม Crystal สำเร็จ!', 'ได้รับ ' || v_crystal || ' Crystal เรียบร้อยแล้ว');
end;
$$ language plpgsql security definer;
```

---

## 17.10 Build Priority ของ Monetization

| ลำดับ | งาน | อยู่ใน Phase |
|-------|-----|-------------|
| 1 | ตาราง SQL ทั้งหมด (wallet, transactions, shop_items, user_purchases) | Phase 2 |
| 2 | `/shop.html` — แสดงสินค้า + ซื้อด้วย Crystal | Phase 2 |
| 3 | `/topup.html` — QR + อัปสลิป | Phase 2 |
| 4 | `/wallet.html` — ยอด Crystal + ประวัติ | Phase 2 |
| 5 | `/admin/transactions.html` — ยืนยันสลิป | Phase 2 |
| 6 | Sponsored Quest (B2B) | Phase 3 |
| 7 | Ad Rewards (Opt-in) | Phase 3 |

---

---

# 18. City Social System 🏙️
*(Section ใหม่ v2.0 — ระบบสังคมเมืองและ Lock-in)*

## 18.1 ภาพรวม

City Social System เปลี่ยนเมืองในชีวิตจริง (กรุงเทพ, เชียงใหม่, ขอนแก่น ฯลฯ) ให้เป็น "สังคมออนไลน์ที่ผู้เล่นต้องพึ่งพากัน" โดยใช้หลักจิตวิทยาทำให้ผู้เล่นรู้สึกว่า **ออกจากแอปไม่ได้** โดยไม่ต้อง Pay-to-Win

### หลักจิตวิทยาที่ใช้

| หลักการ | ใช้กับฟีเจอร์ |
|---------|--------------|
| Loss Aversion | City Buff ลดลงถ้าคนในเมืองไม่ active |
| Social Proof | แสดงจำนวนคนที่กำลัง active ใน Feed |
| Commitment & Consistency | City Project ที่ต้องลงแรงร่วมกัน |
| FOMO | City War / Limited Event แบบจำกัดเวลา |
| Reciprocity | Neighborhood Watch (ช่วยเพื่อน → เพื่อนช่วยกลับ) |
| Status & Ownership | City Reputation + City Council |

---

## 18.2 ฟีเจอร์ Phase 1 (เปิดตัววันแรก)

### A. Social Feed `/feed.html`
**ที่ขาดหายไปจาก Blueprint เดิมและสำคัญที่สุด**

- แสดง activity ของ "คนในเมืองเดียวกัน" แบบ real-time
- ตัวอย่างที่แสดง:
  ```
  🏃 WarriorKing วิ่ง 5km สำเร็จ! +150 XP · 3 นาทีที่แล้ว
  📖 TheMage อ่านหนังสือครบ 30 หน้า · 12 นาทีที่แล้ว
  ⬆️ NaruTo Level Up! → Lv.15 · 1 ชั่วโมงที่แล้ว
  🏙️ Explorer99 Check-in: อุทยานลุมพินี [Pioneer!] · 2 ชั่วโมงที่แล้ว
  ```
- Filter: เมือง | เพื่อน | Guild | ทั้งหมด
- Like / Comment / Cheer ได้ (Diplomat ได้ +SOC stat จากการ interact)
- ดึงจาก table `activity_feed` ที่มีอยู่แล้ว

### B. City Buff ร่วมกัน
- ทุกเมืองมี **Prosperity Level** (1–10) คำนวณจาก XP รวมของคนในเมืองในสัปดาห์นั้น
- ถ้า Level สูง → ทุกคนในเมืองได้ **XP Bonus +5% ต่อ Level** (สูงสุด +50%)
- ถ้าไม่มีคน active พอ → Prosperity ลดลง → ทุกคนเสีย Buff → **แรงกดดันทางสังคมให้กลับมา**
- แสดงบน Dashboard: "🏙️ กรุงเทพ Lv.7 — XP Bonus +35% (อีก 500 XP ถึง Lv.8)"

### C. City Project
- ทุกสัปดาห์มีโครงการ 1 อัน เช่น "ออกกำลังกายรวม 1,000 km" หรือ "อ่านหนังสือรวม 500 ชั่วโมง"
- ผู้เล่นทุกคนในเมือง contribute ได้โดยทำ Quest ตามปกติ (นับอัตโนมัติ)
- Progress bar แสดงว่าเมืองทำได้กี่ % แล้ว
- เมื่อสำเร็จ → **ทุกคนได้รับ Crystal + Badge พิเศษของเมือง**
- ถ้าไม่สำเร็จ → แสดง "เมืองพลาดโครงการสัปดาห์นี้" → FOMO

---

## 18.3 ฟีเจอร์ Phase 2 (หลังเปิดตัว มี user พอแล้ว)

### D. City Reputation
- คะแนน 0–1000 ต่อเมือง ได้จาก: ช่วย verify quest, ทำ City Project, เป็น top contributor
- Reputation สูง → สิทธิ์พิเศษ:
  - Badge "พลเมืองกิตติมศักดิ์"
  - ชื่อสีพิเศษใน City Chat
  - สิทธิ์โหวต City Project ประจำสัปดาห์
- Reputation ลดได้: ถ้าถูก report โกง, ไม่เข้าแอป 3 วัน (-5%/วัน, ต่ำสุด 0)

### E. City Ranking (Monthly)
- จัดอันดับเมืองทุกเดือนจาก Prosperity + Active Users
- **Top 3 เมือง:** ผู้เล่นทุกคนได้ Crystal ฟรี + City Banner บน World Map
- **Bottom 3 เมือง:** เสีย Prosperity -2 Level สัปดาห์ถัดไป → ทุกคนในเมืองอยากแก้มือ

### F. City War (Limited Event)
- Event 24 ชั่วโมง: 2 เมืองแข่งกันทำ Quest
- เมืองชนะ → ผู้เล่นได้รับ Frame + Title พิเศษตลอดไป
- เมืองแพ้ → เสีย Prosperity -1 Level
- แจ้งเตือนล่วงหน้า 24 ชม. → สร้าง hype และ FOMO สูงมาก

---

## 18.4 ฟีเจอร์ Phase 3 (Long-term)

### G. City Council
- Top 5 Reputation ในเมือง = สมาชิกสภาเมือง
- สิทธิ์: โหวต City Project, ออกประกาศใน City Chat, โหวตเลือก Mayor
- **Mayor** = คนได้โหวตสูงสุด → Frame Gold พิเศษ + ชื่อสีทองใน Chat
- ถ้า inactive 3 วัน → ถูกปลดจากสภา → มีคนมาแทน

### H. Neighborhood Watch
- ผู้เล่นขอ "ความช่วยเหลือด่วน" ในเมืองได้ เช่น "ต้องการคู่วิ่งช่วงเย็นนี้"
- คนที่ช่วย → ได้ City Reputation + XP bonus
- สร้างความผูกพันจริง → ระบบ Reciprocity ทำงานเต็มที่

### I. City Resource Exchange
- แต่ละเมืองมีทรัพยากรประจำ (ได้จาก Quest ในเมืองนั้น)
- แลกเปลี่ยนระหว่างเมืองผ่านตลาดกลาง (ต้องมี Reputation ถึงระดับหนึ่ง)
- ของหายากมีจำนวนจำกัดต่อวัน → สร้าง competition และ Scarcity

---

## 18.5 Lock-in Strategy (กลยุทธ์ให้ออกจากแอปไม่ได้)

| กลยุทธ์ | วิธีทำงาน | จิตวิทยา |
|---------|----------|---------|
| City Streak ร่วมกัน | Login ครบ 7 วันทั้งเมือง → ทุกคนได้ Crystal | Group Pressure |
| Consequence of Absence | ไม่เข้า 3 วัน → Reputation -5%/วัน | Loss Aversion |
| City Council Threat | ไม่ active → ถูกปลดจากสภา | Status Loss |
| Limited Event | City War / City Project มีเวลาจำกัด | FOMO |
| Social Feed | เห็นเพื่อนได้ XP ตลอด → อยากทำบ้าง | Social Proof |

> **หมายเหตุ:** ไม่ใช้ "Goodbye Penalty" แบบ guilt-trip ที่โจมตีโดยตรง ให้ใช้แนวทาง "นี่คือสิ่งที่นายสร้างไว้" แทน เช่น แสดง City Reputation, badge ที่สะสม, และ streak ที่จะเสียหาย ทำให้ผู้เล่นตัดสินใจเองโดยไม่รู้สึกถูกบังคับ

---

## 18.6 Supabase Schema — City System

```sql
-- ============================================
-- CITY STATS (สถานะของแต่ละเมือง)
-- ============================================
create table public.city_stats (
  city_name text primary key,
  province text,
  population integer default 0,
  prosperity_level integer default 1 check (prosperity_level between 1 and 10),
  xp_contributed_weekly integer default 0,
  xp_threshold_next integer default 1000,
  active_buffs jsonb default '{}',
  city_streak_days integer default 0,
  last_updated timestamp default now()
);

-- ============================================
-- CITY PROJECTS (โครงการประจำสัปดาห์)
-- ============================================
create table public.city_projects (
  id serial primary key,
  city_name text references public.city_stats(city_name),
  title text not null,
  description text,
  target_type text check (target_type in ('xp','km','checkins','quests','hours')),
  target_value integer not null,
  current_value integer default 0,
  reward_crystal integer default 20,
  reward_badge_id integer references public.badges(id),
  status text check (status in ('active','completed','failed')) default 'active',
  starts_at timestamp default now(),
  ends_at timestamp not null,
  created_at timestamp default now()
);

-- ============================================
-- CITY PROJECT CONTRIBUTIONS (ใครทำเท่าไร)
-- ============================================
create table public.city_project_contributions (
  id serial primary key,
  project_id integer references public.city_projects(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  contribution_value integer default 0,
  updated_at timestamp default now(),
  unique(project_id, user_id)
);

-- ============================================
-- CITY REPUTATION (ชื่อเสียงในเมือง)
-- ============================================
create table public.city_reputation (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade,
  city_name text references public.city_stats(city_name),
  reputation_score integer default 0 check (reputation_score >= 0),
  is_council_member boolean default false,
  is_mayor boolean default false,
  last_decay_date date,
  updated_at timestamp default now(),
  unique(user_id, city_name)
);

-- ============================================
-- CITY WARS (Event แข่งระหว่างเมือง)
-- ============================================
create table public.city_wars (
  id serial primary key,
  city_a text references public.city_stats(city_name),
  city_b text references public.city_stats(city_name),
  city_a_xp integer default 0,
  city_b_xp integer default 0,
  winner_city text,
  status text check (status in ('upcoming','active','completed')) default 'upcoming',
  starts_at timestamp not null,
  ends_at timestamp not null,
  created_at timestamp default now()
);

-- ============================================
-- SOCIAL FOLLOWS (ติดตามกัน)
-- ============================================
create table public.social_follows (
  id serial primary key,
  follower_id uuid references public.users(id) on delete cascade,
  following_id uuid references public.users(id) on delete cascade,
  created_at timestamp default now(),
  unique(follower_id, following_id)
);

-- ============================================
-- ACTIVITY FEED (อัพเดต: เพิ่ม type ใหม่)
-- ============================================
-- เพิ่ม type ที่รองรับ city events
alter table public.activity_feed
  drop constraint if exists activity_feed_type_check;

alter table public.activity_feed
  add constraint activity_feed_type_check
  check (type in (
    'quest_complete','level_up','badge_unlock','title_unlock',
    'checkin','guild_join','pvp_win',
    'city_project_join','city_war_participate','city_level_up',
    'follow','streak_milestone'
  ));

-- ============================================
-- RLS POLICIES — City System
-- ============================================
alter table public.city_stats enable row level security;
alter table public.city_projects enable row level security;
alter table public.city_project_contributions enable row level security;
alter table public.city_reputation enable row level security;
alter table public.city_wars enable row level security;
alter table public.social_follows enable row level security;

-- City Stats: ทุกคนอ่านได้
create policy "City stats are public"
  on public.city_stats for select using (true);

-- City Projects: ทุกคนอ่านได้
create policy "City projects are public"
  on public.city_projects for select using (true);

-- Contributions: ดูและแก้ได้แค่ตัวเอง
create policy "Users manage own contributions"
  on public.city_project_contributions for all using (auth.uid() = user_id);

-- City Reputation: ทุกคนอ่านได้ แก้ได้แค่ตัวเอง
create policy "City reputation is public"
  on public.city_reputation for select using (true);

create policy "Users update own reputation"
  on public.city_reputation for all using (auth.uid() = user_id);

-- City Wars: ทุกคนอ่านได้
create policy "City wars are public"
  on public.city_wars for select using (true);

-- Social Follows: ทุกคนอ่านได้ insert ได้แค่ตัวเอง
create policy "Follows are public"
  on public.social_follows for select using (true);

create policy "Users manage own follows"
  on public.social_follows for insert with check (auth.uid() = follower_id);

create policy "Users delete own follows"
  on public.social_follows for delete using (auth.uid() = follower_id);

-- ============================================
-- SEED DATA — Thai Cities เริ่มต้น
-- ============================================
insert into public.city_stats (city_name, province, xp_threshold_next) values
('กรุงเทพมหานคร', 'กรุงเทพมหานคร', 5000),
('เชียงใหม่', 'เชียงใหม่', 2000),
('ขอนแก่น', 'ขอนแก่น', 1500),
('ชลบุรี', 'ชลบุรี', 1500),
('ภูเก็ต', 'ภูเก็ต', 1500),
('นครราชสีมา', 'นครราชสีมา', 1000),
('หาดใหญ่', 'สงขลา', 1000),
('อุดรธานี', 'อุดรธานี', 1000),
('เชียงราย', 'เชียงราย', 800),
('นนทบุรี', 'นนทบุรี', 1000)
on conflict do nothing;

-- ============================================
-- FUNCTION: คำนวณ City Prosperity จาก XP รวม
-- ============================================
create or replace function public.update_city_prosperity(p_city_name text)
returns void as $$
declare
  v_xp integer;
  v_level integer;
  v_threshold integer;
begin
  -- นับ XP รวมสัปดาห์นี้
  select coalesce(sum(u.xp_this_month), 0)
  into v_xp
  from public.users u
  where u.status_text is not null -- placeholder: ควร join กับ city column จริง
  ;

  -- คำนวณ level จาก XP
  v_level := least(10, greatest(1, floor(sqrt(v_xp / 100.0))::integer + 1));

  update public.city_stats set
    xp_contributed_weekly = v_xp,
    prosperity_level = v_level,
    active_buffs = jsonb_build_object('xp_bonus', (v_level * 0.05)::text),
    last_updated = now()
  where city_name = p_city_name;
end;
$$ language plpgsql security definer;
```

---

## 18.7 หน้าใหม่ที่เพิ่มใน Sitemap

```
/feed.html              — Social Feed (เห็น activity คนในเมือง + เพื่อน) ← สำคัญมาก
/city.html              — City Dashboard (Prosperity, Project, Ranking, Chat)
/city/project/:id       — City Project Detail + Progress
/city/war               — City War Event Page
/city/leaderboard       — City Ranking แบบ Monthly
```

---

## 18.8 Build Priority ของ City System

| Phase | ฟีเจอร์ | ไฟล์ที่ต้องสร้าง |
|-------|--------|----------------|
| **Phase 1** | Social Feed | `/feed.html` |
| **Phase 1** | City Buff (แสดงบน Dashboard) | อัพเดต `dashboard.html` |
| **Phase 1** | City Project | `/city.html` |
| **Phase 2** | City Reputation | อัพเดต `profile.html` |
| **Phase 2** | City Ranking | อัพเดต `leaderboard.html` |
| **Phase 3** | City War | `/city/war.html` |
| **Phase 3** | City Council + Mayor | อัพเดต `city.html` |
| **Phase 3** | Neighborhood Watch | Feature ใน `city.html` |
| **Phase 3** | Resource Exchange | `/city/market.html` |

---

## 18.9 ไฟล์ทั้งหมดที่ต้องสร้าง (สรุป v2.0)

### ✅ มีแล้ว
| ไฟล์ | สถานะ |
|------|-------|
| `index.html` | ✅ |
| `login.html` | ✅ |
| `register.html` | ✅ |
| `dashboard.html` | ✅ |
| `config.js` | ✅ |
| `supabase.js` | ✅ |

### 🔨 ต้องสร้างต่อ (เรียงตาม Priority)
| ลำดับ | ไฟล์ | Phase | คำอธิบาย |
|-------|------|-------|---------|
| 1 | `feed.html` | 1 | Social Feed หัวใจของ City Social ✅ |
| 2 | `quests.html` | 1 | ดู Quest ทั้งหมด + ส่งหลักฐาน ✅ |
| 3 | `profile.html` | 2 | Profile สาธารณะ (avatar, stats, badges) ✅ |
| 4 | `city.html` | 1 | City Dashboard + City Project ✅ |
| 5 | `leaderboard.html` | 2 | Leaderboard Global / City / Guild ✅ |
| 6 | `notifications.html` | 2 | ประวัติการแจ้งเตือน ✅ |
| 7 | `shop.html` | 4 | ร้านค้า Crystal ✅ |
| 8 | `wallet.html` | 4 | กระเป๋าเงิน + ประวัติ ✅ |
| 9 | `topup.html` | 4 | เติมเงิน QR + สลิป ✅ |
| 10 | **`verify.html`** | **2** | **Community Verify หลักฐาน Quest ⭐ NEW** |
| 11 | `achievements.html` | 2 | Title + Badge collection |
| 12 | `map.html` | 3 | World Map + Check-in (Leaflet.js) |
| 13 | `guild.html` | 3 | รายชื่อ Guild ทั้งหมด |
| 14 | `guild-detail.html` | 3 | Guild Page + Chat + Quest |
| 15 | `guild-create.html` | 3 | สร้าง Guild |
| 16 | `pvp.html` | 3 | ท้า PvP / ดูผล |
| 17 | `admin/transactions.html` | 4 | Admin ยืนยันสลิปเติมเงิน (ยังจำเป็นสำหรับ topup) |
| 18 | `city/war.html` | 3 | City War Event |
| 19 | `city/market.html` | 3 | Resource Exchange |

> **หมายเหตุ:** `admin/quests.html` ถูกแทนที่ด้วย `verify.html` (Community Verify) แล้ว ไม่จำเป็นต้องสร้าง

---

*Blueprint Version 2.0 — NEXUS LIFE Real Life MMO*
*อัพเดตล่าสุด: 2026 — เพิ่ม Section 18: City Social System + Lock-in Strategy*
*ไฟล์ที่มีแล้ว: index, login, register, dashboard, config, supabase*

---

# 19. Community Verify System ⭐

*(Section ใหม่ v3.0 — แทนระบบ Admin Verify เดิม)*

## 19.1 ภาพรวม

**ทำไมไม่ใช้ Admin Verify?**
- Admin คนเดียวนั่ง verify รูปทุกรูปไม่ไหว scale ไม่ได้
- Community Verify ให้ผู้เล่นช่วยกัน → สร้าง engagement + SOC stat ให้ Diplomat

**หลักการ:** ผู้เล่นคนอื่นในเมืองช่วย vote ว่าหลักฐานของเพื่อนจริงหรือไม่ ได้ 3 approve → ผ่าน, ได้ 3 reject → ไม่ผ่าน, 24 ชม. ไม่มีใครโหวต → auto approve

---

## 19.2 กฎของระบบ

| กฎ | รายละเอียด |
|----|-----------|
| ห้าม vote ตัวเอง | `voter_id ≠ quest owner_id` (enforce ใน DB + frontend) |
| ห้าม vote ซ้ำ | unique constraint `(user_quest_id, voter_id)` |
| ต้องการ 3 votes | approve ≥ 3 → ผ่าน, reject ≥ 3 → ไม่ผ่าน |
| Auto approve | ถ้า 24 ชม. ยังไม่ครบ → approve อัตโนมัติ |
| Text quest | proof_type = 'text' → approve ทันที ไม่ต้อง verify |
| GPS quest | proof_type = 'gps' → approve ทันที ไม่ต้อง verify |

---

## 19.3 รางวัลสำหรับผู้ Verify

| การกระทำ | รางวัล |
|---------|-------|
| Vote 1 ครั้ง (ใดก็ได้) | +10 XP |
| Vote ตรงกับ majority | +5 XP bonus |
| Vote 5 ครั้งในวัน | นับเป็น Diplomat Daily Quest สำเร็จ |
| Diplomat class verify | ได้ +SOC 5 pts ต่อครั้ง (class bonus) |

---

## 19.4 Supabase Schema

```sql
-- ============================================
-- QUEST VERIFICATIONS
-- ============================================
CREATE TABLE public.quest_verifications (
  id serial PRIMARY KEY,
  user_quest_id integer REFERENCES public.user_quests(id) ON DELETE CASCADE,
  voter_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  vote text CHECK (vote IN ('approve', 'reject')) NOT NULL,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_quest_id, voter_id)
);

-- RLS
ALTER TABLE public.quest_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Verifications are public"
  ON public.quest_verifications FOR SELECT USING (true);

CREATE POLICY "Auth users can vote"
  ON public.quest_verifications FOR INSERT
  WITH CHECK (
    auth.uid() = voter_id
    AND auth.uid() != (
      SELECT user_id FROM public.user_quests WHERE id = user_quest_id
    )
  );

-- ============================================
-- FUNCTION: cast_verification_vote
-- เรียกจาก frontend เมื่อ user กด vote
-- ============================================
CREATE OR REPLACE FUNCTION public.cast_verification_vote(
  p_user_quest_id integer,
  p_voter_id uuid,
  p_vote text
)
RETURNS json AS $$
DECLARE
  v_owner_id uuid;
  v_approve_count integer;
  v_reject_count integer;
  v_quest_xp integer;
  v_quest_stat_type text;
  v_quest_stat_pts integer;
  v_class text;
  v_stat_bonus numeric;
BEGIN
  -- ดึง owner
  SELECT user_id INTO v_owner_id
  FROM public.user_quests WHERE id = p_user_quest_id;

  -- ห้าม vote ตัวเอง
  IF v_owner_id = p_voter_id THEN
    RETURN json_build_object('success', false, 'error', 'cannot_vote_own');
  END IF;

  -- insert vote (unique constraint จะ error ถ้า vote ซ้ำ)
  INSERT INTO public.quest_verifications (user_quest_id, voter_id, vote)
  VALUES (p_user_quest_id, p_voter_id, p_vote);

  -- นับ votes
  SELECT
    COUNT(*) FILTER (WHERE vote = 'approve'),
    COUNT(*) FILTER (WHERE vote = 'reject')
  INTO v_approve_count, v_reject_count
  FROM public.quest_verifications
  WHERE user_quest_id = p_user_quest_id;

  -- ให้ XP ผู้ vote
  UPDATE public.users
  SET xp_total = xp_total + 10,
      xp_this_month = xp_this_month + 10
  WHERE id = p_voter_id;

  -- ให้ SOC stat ถ้าเป็น Diplomat
  SELECT class INTO v_class FROM public.users WHERE id = p_voter_id;
  IF v_class = 'diplomat' THEN
    UPDATE public.user_stats
    SET soc_points = soc_points + 5
    WHERE user_id = p_voter_id;
  ELSE
    UPDATE public.user_stats
    SET soc_points = soc_points + 2
    WHERE user_id = p_voter_id;
  END IF;

  -- ถ้า approve ≥ 3 → approve quest
  IF v_approve_count >= 3 THEN
    -- ดึง quest info
    SELECT q.xp_reward, q.stat_type, q.stat_points
    INTO v_quest_xp, v_quest_stat_type, v_quest_stat_pts
    FROM public.user_quests uq
    JOIN public.quests q ON q.id = uq.quest_id
    WHERE uq.id = p_user_quest_id;

    -- อัพเดต status
    UPDATE public.user_quests
    SET status = 'approved', xp_granted = true
    WHERE id = p_user_quest_id;

    -- ให้ XP เจ้าของ quest
    SELECT class INTO v_class FROM public.users WHERE id = v_owner_id;
    v_stat_bonus := CASE WHEN v_class = substring(v_quest_stat_type, 1, 3) THEN 1.5 ELSE 1.0 END;

    UPDATE public.users
    SET xp_total = xp_total + v_quest_xp,
        xp_this_month = xp_this_month + v_quest_xp
    WHERE id = v_owner_id;

    -- ให้ stat points
    IF v_quest_stat_type IS NOT NULL THEN
      EXECUTE format(
        'UPDATE public.user_stats SET %I = %I + $1 WHERE user_id = $2',
        v_quest_stat_type || '_points', v_quest_stat_type || '_points'
      ) USING round(v_quest_stat_pts * v_stat_bonus), v_owner_id;
    END IF;

    -- activity feed
    INSERT INTO public.activity_feed (user_id, type, data)
    VALUES (v_owner_id, 'quest_complete', json_build_object('xp', v_quest_xp));

    -- notification
    INSERT INTO public.notifications (user_id, title, body)
    VALUES (v_owner_id, '✅ Quest ผ่านแล้ว!', 'Community ยืนยันหลักฐานของคุณแล้ว ได้รับ ' || v_quest_xp || ' XP');

    RETURN json_build_object('success', true, 'result', 'approved', 'approves', v_approve_count);
  END IF;

  -- ถ้า reject ≥ 3 → reject quest
  IF v_reject_count >= 3 THEN
    UPDATE public.user_quests SET status = 'rejected' WHERE id = p_user_quest_id;

    INSERT INTO public.notifications (user_id, title, body)
    VALUES (v_owner_id, '❌ Quest ไม่ผ่าน', 'Community ไม่ยืนยันหลักฐาน ลองส่งใหม่อีกครั้ง');

    RETURN json_build_object('success', true, 'result', 'rejected', 'rejects', v_reject_count);
  END IF;

  RETURN json_build_object('success', true, 'result', 'voted', 'approves', v_approve_count, 'rejects', v_reject_count);

EXCEPTION WHEN unique_violation THEN
  RETURN json_build_object('success', false, 'error', 'already_voted');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: auto_approve_expired_verifications
-- รัน cron job ทุก 1 ชม. หรือเรียก manual
-- ============================================
CREATE OR REPLACE FUNCTION public.auto_approve_expired_verifications()
RETURNS integer AS $$
DECLARE
  v_count integer := 0;
  v_uq record;
BEGIN
  FOR v_uq IN
    SELECT uq.id, uq.user_id, q.xp_reward, q.stat_type, q.stat_points, u.class
    FROM public.user_quests uq
    JOIN public.quests q ON q.id = uq.quest_id
    JOIN public.users u ON u.id = uq.user_id
    WHERE uq.status = 'pending_review'
      AND uq.submitted_at < now() - interval '24 hours'
      AND uq.xp_granted = false
  LOOP
    UPDATE public.user_quests
    SET status = 'approved', xp_granted = true
    WHERE id = v_uq.id;

    UPDATE public.users
    SET xp_total = xp_total + v_uq.xp_reward,
        xp_this_month = xp_this_month + v_uq.xp_reward
    WHERE id = v_uq.user_id;

    INSERT INTO public.notifications (user_id, title, body)
    VALUES (v_uq.user_id, '✅ Quest ผ่านอัตโนมัติ', 'ไม่มีผู้ตรวจสอบใน 24 ชม. ระบบ approve ให้อัตโนมัติ +' || v_uq.xp_reward || ' XP');

    v_count := v_count + 1;
  END LOOP;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 19.5 หน้าที่เกี่ยวข้อง

| ไฟล์ | บทบาท | สิ่งที่ต้องมี |
|------|-------|------------|
| `verify.html` | หน้าหลัก Community Verify | แสดงรูปรอ verify ในเมือง, ปุ่ม ✅/❌, ประวัติที่ตัวเองเคย vote |
| `feed.html` | แสดงปุ่ม Verify ใต้โพสต์ pending | ปุ่ม ✅ Verify ขนาดเล็กใต้รูป proof |
| `quests.html` | แสดง status pending_review | บอกว่า "รอ community verify — X/3 votes" |
| `dashboard.html` | แสดง badge จำนวนรอ verify | nav badge ตรง "Verify" |
| `profile.html` | แสดง SOC stat จากการ verify | ไม่ต้องแก้พิเศษ (SOC stat อัพเดตผ่าน function แล้ว) |

---

## 19.6 UX Flow ใน verify.html

```
1. เข้าหน้า verify.html
2. แสดงการ์ดรูปหลักฐานทั้งหมด (pending_review) ในเมืองเดียวกับ user
   - ซ่อน quest ของตัวเอง
   - ซ่อน quest ที่ตัวเองเคย vote แล้ว
3. การ์ดแต่ละใบแสดง:
   - รูปหลักฐาน (คลิกขยายได้)
   - ชื่อ Quest, ชื่อผู้เล่น, เวลาที่ส่ง
   - approve X/3 | reject Y/3
   - ปุ่ม ✅ APPROVE / ❌ REJECT
4. กด vote → เรียก cast_verification_vote() → อัพเดต realtime
5. ถ้า vote ครบ → การ์ดหายไปจากหน้า (กรองออก)
```

---

## 19.7 ไฟล์ที่ต้องสร้าง/แก้

### สร้างใหม่
- `verify.html` — หน้า Community Verify

### แก้ไข
- `feed.html` — เพิ่มปุ่ม Verify ใต้ proof post
- `quests.html` — แสดง vote count แทน "รอ admin"
- `dashboard.html` — เพิ่ม nav link ไป verify.html + badge count

### SQL ที่ต้องรันใน Supabase
```sql
-- 1. สร้างตาราง quest_verifications
-- 2. สร้าง function cast_verification_vote
-- 3. สร้าง function auto_approve_expired_verifications
-- (ดู SQL ทั้งหมดใน Section 19.4)
```

---

*Blueprint Version 3.0 — NEXUS LIFE Real Life MMO*
*อัพเดตล่าสุด: 2026 — เพิ่ม Section 19: Community Verify System*
*ไฟล์ที่มีแล้ว: index, login, register, dashboard, quests, feed, profile, city, leaderboard, notifications, shop, wallet, topup, config.js, supabase.js*
