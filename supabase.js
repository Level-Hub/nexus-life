// ============================================
// NEXUS LIFE — Supabase Client (ไฟล์กลาง)
// Version 2.0 — อัพเดตให้ตรงกับ Schema + Blueprint v3
// ทุกหน้าให้ import ไฟล์นี้แทน
// ============================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://rksqrdydlfimrpmyhfeg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc3FyZHlkbGZpbXJwbXloZmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODc1MzksImV4cCI6MjA5NTU2MzUzOX0.KEOLEfilTgVX5osmpfMutHq5TuPzvEeWN6ACZ8OKlnY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================
// AUTH HELPERS
// ============================================

/** สมัครสมาชิกด้วย email/password */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

/** เข้าสู่ระบบด้วย email/password */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

/** ออกจากระบบ */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/** ดึง session ปัจจุบัน */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/** ดึง user ปัจจุบัน */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/** Guard — ถ้าไม่ได้ login ให้ redirect ไป login */
export async function requireAuth(redirectTo = '/auth/login.html') {
  const session = await getSession()
  if (!session) {
    window.location.href = redirectTo
    return null
  }
  return session
}

/** Guard — ถ้า login แล้วให้ redirect ไป dashboard */
export async function redirectIfLoggedIn(redirectTo = '/dashboard.html') {
  const session = await getSession()
  if (session) {
    window.location.href = redirectTo
  }
}

// ============================================
// USER HELPERS
// ============================================

/** ดึงข้อมูล user profile จาก users table */
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

/** ดึงข้อมูล user profile พร้อม title ที่ใส่อยู่ */
export async function getUserProfileFull(userId) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      user_titles!inner(
        is_equipped,
        titles(name, icon, category)
      )
    `)
    .eq('id', userId)
    .eq('user_titles.is_equipped', true)
    .single()
  return { data, error }
}

/** ดึงข้อมูล user stats */
export async function getUserStats(userId) {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

/** อัพเดต user profile */
export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
  return { data, error }
}

/** ดึง badges ของ user */
export async function getUserBadges(userId) {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*, badges(*)')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false })
  return { data, error }
}

/** ดึง titles ของ user */
export async function getUserTitles(userId) {
  const { data, error } = await supabase
    .from('user_titles')
    .select('*, titles(*)')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false })
  return { data, error }
}

/** เปลี่ยน title ที่ใส่อยู่ */
export async function equipTitle(userId, titleId) {
  // ถอด title เก่าออกก่อน
  await supabase
    .from('user_titles')
    .update({ is_equipped: false })
    .eq('user_id', userId)

  // ใส่ title ใหม่
  const { data, error } = await supabase
    .from('user_titles')
    .update({ is_equipped: true })
    .eq('user_id', userId)
    .eq('title_id', titleId)
  return { data, error }
}

// ============================================
// QUEST HELPERS
// ============================================

/** ดึง Quest ทั้งหมดที่ active (กรองตาม class + ทุก class) */
export async function getQuests(classTarget = null) {
  let query = supabase.from('quests').select('*').eq('is_active', true)
  if (classTarget) {
    // ดึงทั้ง quest ของ class นั้น + quest ที่ไม่จำกัด class (null)
    query = query.or(`class_target.eq.${classTarget},class_target.is.null`)
  }
  const { data, error } = await query
  return { data, error }
}

/** ดึง Quest ที่ user กำลังทำอยู่ */
export async function getUserQuests(userId) {
  const { data, error } = await supabase
    .from('user_quests')
    .select('*, quests(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

/** ดึง Quest วันนี้ของ user (daily) */
export async function getTodayQuests(userId, userClass = null) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: quests } = await getQuests(userClass)
  const dailyQuests = (quests || []).filter(q => q.type === 'daily')

  const { data: userQuests } = await supabase
    .from('user_quests')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())

  return { quests: dailyQuests, userQuests: userQuests || [] }
}

/**
 * ส่งหลักฐาน Quest
 * FIX: เช็ค proof_type ก่อน — text/gps = auto approve ทันที
 */
export async function submitQuestProof(userId, questId, proofType, proofText = null, proofUrl = null) {
  const autoApprove = proofType === 'text' || proofType === 'gps'

  const { data, error } = await supabase
    .from('user_quests')
    .upsert({
      user_id: userId,
      quest_id: questId,
      status: autoApprove ? 'approved' : 'pending_review',
      proof_text: proofText,
      proof_url: proofUrl,
      submitted_at: new Date().toISOString(),
      // ถ้า auto approve ให้ mark xp_granted = true ด้วย
      // (XP จะ grant แยกผ่าน grantQuestXP)
      xp_granted: false
    })
  return { data, error, autoApproved: autoApprove }
}

/** เริ่มทำ Quest (in_progress) */
export async function startQuest(userId, questId) {
  const { data, error } = await supabase
    .from('user_quests')
    .insert({
      user_id: userId,
      quest_id: questId,
      status: 'in_progress'
    })
  return { data, error }
}

// ============================================
// COMMUNITY VERIFY HELPERS
// ============================================

/**
 * ดึง quests ที่รอ verify ในเมืองเดียวกับ user
 * ซ่อน quest ของตัวเอง + ที่ตัวเองเคย vote แล้ว
 */
export async function getPendingVerifications(userId, city) {
  // ดึง user_quest_ids ที่ตัวเองเคย vote แล้ว
  const { data: voted } = await supabase
    .from('quest_verifications')
    .select('user_quest_id')
    .eq('voter_id', userId)

  const votedIds = (voted || []).map(v => v.user_quest_id)

  let query = supabase
    .from('user_quests')
    .select(`
      *,
      quests(title, description, type, xp_reward, proof_type),
      users(username, display_name, avatar_seed, class, level, city)
    `)
    .eq('status', 'pending_review')
    .neq('user_id', userId)  // ซ่อน quest ตัวเอง

  // ซ่อน quest ที่ vote แล้ว
  if (votedIds.length > 0) {
    query = query.not('id', 'in', `(${votedIds.join(',')})`)
  }

  const { data, error } = await query
    .order('submitted_at', { ascending: true })

  // กรองเฉพาะเมืองเดียวกัน (city filter ใน JS เพราะ nested)
  const filtered = city
    ? (data || []).filter(uq => uq.users?.city === city)
    : data || []

  return { data: filtered, error }
}

/**
 * Vote verify quest
 * เรียก DB function cast_verification_vote()
 */
export async function castVerificationVote(userQuestId, voterId, vote) {
  const { data, error } = await supabase.rpc('cast_verification_vote', {
    p_user_quest_id: userQuestId,
    p_voter_id: voterId,
    p_vote: vote  // 'approve' หรือ 'reject'
  })
  return { data, error }
}

/** ดึง votes ของ quest นั้น */
export async function getQuestVotes(userQuestId) {
  const { data, error } = await supabase
    .from('quest_verifications')
    .select('vote, voter_id, created_at')
    .eq('user_quest_id', userQuestId)
  return { data, error }
}

// ============================================
// ACTIVITY FEED
// ============================================

/**
 * ดึง social feed จาก view
 * FIX: ใช้ social_feed_view แทน join manual
 */
export async function getSocialFeed(city = null, limit = 30) {
  let query = supabase
    .from('social_feed_view')
    .select('*')
    .limit(limit)

  if (city) query = query.eq('city', city)

  const { data, error } = await query
  return { data, error }
}

/** ดึง feed ของคนที่ follow */
export async function getFollowingFeed(userId, limit = 30) {
  // ดึง following ids ก่อน
  const { data: follows } = await supabase
    .from('social_follows')
    .select('following_id')
    .eq('follower_id', userId)

  const followingIds = (follows || []).map(f => f.following_id)
  if (followingIds.length === 0) return { data: [], error: null }

  const { data, error } = await supabase
    .from('social_feed_view')
    .select('*')
    .in('user_id', followingIds)
    .limit(limit)

  return { data, error }
}

/** เพิ่ม activity (เรียกจาก frontend ถ้าจำเป็น) */
export async function addActivity(userId, type, data = {}) {
  const { error } = await supabase
    .from('activity_feed')
    .insert({ user_id: userId, type, data })
  return { error }
}

// ============================================
// LEADERBOARD
// ============================================

/**
 * ดึง leaderboard รายเดือน
 * FIX: ใช้ leaderboard_monthly view แทน query ตรง
 */
export async function getLeaderboard(limit = 50, city = null) {
  let query = supabase
    .from('leaderboard_monthly')
    .select('*')
    .limit(limit)

  if (city) query = query.eq('city', city)

  const { data, error } = await query
  return { data, error }
}

// ============================================
// CITY SOCIAL HELPERS
// ============================================

/** ดึงข้อมูลเมือง */
export async function getCityStats(cityName) {
  const { data, error } = await supabase
    .from('city_stats')
    .select('*')
    .eq('city_name', cityName)
    .single()
  return { data, error }
}

/** ดึง city projects ที่ active */
export async function getCityProjects(cityName) {
  const { data, error } = await supabase
    .from('city_projects')
    .select('*')
    .eq('city_name', cityName)
    .eq('status', 'active')
    .order('ends_at', { ascending: true })
  return { data, error }
}

/** ดึง contribution ของ user ใน project */
export async function getUserContribution(projectId, userId) {
  const { data, error } = await supabase
    .from('city_project_contributions')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .single()
  return { data, error }
}

/** ดึง city reputation ของ user */
export async function getCityReputation(userId, cityName) {
  const { data, error } = await supabase
    .from('city_reputation')
    .select('*')
    .eq('user_id', userId)
    .eq('city_name', cityName)
    .single()
  return { data, error }
}

// ============================================
// SOCIAL FOLLOW HELPERS
// ============================================

/** ติดตาม user — เรียก DB function */
export async function followUser(followerId, followingId) {
  const { data, error } = await supabase.rpc('follow_user', {
    p_follower_id: followerId,
    p_following_id: followingId
  })
  return { data, error }
}

/** เลิกติดตาม user — เรียก DB function */
export async function unfollowUser(followerId, followingId) {
  const { data, error } = await supabase.rpc('unfollow_user', {
    p_follower_id: followerId,
    p_following_id: followingId
  })
  return { data, error }
}

/** เช็คว่า follow อยู่ไหม */
export async function isFollowing(followerId, followingId) {
  const { data, error } = await supabase
    .from('social_follows')
    .select('id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .single()
  return { isFollowing: !!data, error }
}

/** ดึงรายชื่อ followers */
export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from('social_follows')
    .select('follower_id, users!social_follows_follower_id_fkey(username, display_name, avatar_seed, class, level)')
    .eq('following_id', userId)
  return { data, error }
}

/** ดึงรายชื่อคนที่ follow */
export async function getFollowing(userId) {
  const { data, error } = await supabase
    .from('social_follows')
    .select('following_id, users!social_follows_following_id_fkey(username, display_name, avatar_seed, class, level)')
    .eq('follower_id', userId)
  return { data, error }
}

// ============================================
// NOTIFICATION HELPERS
// ============================================

/** ดึง notifications ของ user */
export async function getNotifications(userId, limit = 50) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

/** นับ notifications ที่ยังไม่ได้อ่าน */
export async function getUnreadCount(userId) {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false)
  return { count: count || 0, error }
}

/** Mark notification ว่าอ่านแล้ว */
export async function markNotificationRead(notificationId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
  return { error }
}

/** Mark ทั้งหมดว่าอ่านแล้ว */
export async function markAllNotificationsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false)
  return { error }
}

// ============================================
// STORAGE HELPERS
// ============================================

/** อัพโหลดรูปหลักฐาน Quest */
export async function uploadProofImage(userId, questId, file) {
  const ext = file.name.split('.').pop()
  const path = `proofs/${userId}/${questId}_${Date.now()}.${ext}`
  const { data, error } = await supabase.storage
    .from('nexuslife')
    .upload(path, file, { upsert: true })
  if (error) return { url: null, error }
  const { data: { publicUrl } } = supabase.storage.from('nexuslife').getPublicUrl(path)
  return { url: publicUrl, error: null }
}

/** อัพโหลด avatar */
export async function uploadAvatar(userId, file) {
  const ext = file.name.split('.').pop()
  const path = `${userId}/avatar_${Date.now()}.${ext}`
  const { data, error } = await supabase.storage
    .from('nexuslife-avatars')
    .upload(path, file, { upsert: true })
  if (error) return { url: null, error }
  const { data: { publicUrl } } = supabase.storage.from('nexuslife-avatars').getPublicUrl(path)
  return { url: publicUrl, error: null }
}

// ============================================
// REALTIME
// ============================================

/** Subscribe ช่อง chat */
export function subscribeChatChannel(channel, callback) {
  return supabase
    .channel(`chat:${channel}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `channel=eq.${channel}`
    }, callback)
    .subscribe()
}

/** Subscribe activity feed ของเมือง (realtime) */
export function subscribeCityFeed(city, callback) {
  return supabase
    .channel(`city-feed:${city}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'activity_feed'
    }, callback)
    .subscribe()
}

/** Subscribe notifications ของ user */
export function subscribeNotifications(userId, callback) {
  return supabase
    .channel(`notifications:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, callback)
    .subscribe()
}

/** Subscribe quest verification (แสดง vote count realtime) */
export function subscribeQuestVerification(userQuestId, callback) {
  return supabase
    .channel(`verify:${userQuestId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'quest_verifications',
      filter: `user_quest_id=eq.${userQuestId}`
    }, callback)
    .subscribe()
}

/** ส่งข้อความ chat */
export async function sendChatMessage(senderId, channel, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ sender_id: senderId, channel, content })
  return { data, error }
}

/** ดึงประวัติ chat */
export async function getChatHistory(channel, limit = 50) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, users(username, display_name, avatar_seed, class)')
    .eq('channel', channel)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data: (data || []).reverse(), error }
}

// ============================================
// XP & STREAK HELPERS
// ============================================

/** Grant XP จาก Quest — เรียก DB function grant_quest_xp */
export async function grantQuestXP(userId, userQuestId) {
  return supabase.rpc('grant_quest_xp', {
    p_user_id: userId,
    p_user_quest_id: userQuestId
  })
}

/** อัพเดต streak ของ user */
export async function updateStreak(userId) {
  return supabase.rpc('update_streak', { p_user_id: userId })
}

// ============================================
// WALLET & SHOP HELPERS
// ============================================

/** ดึงยอด wallet */
export async function getWallet(userId) {
  const { data, error } = await supabase
    .from('wallet')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

/** ดึงประวัติ transactions */
export async function getTransactions(userId, limit = 20) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

/** ดึงสินค้าใน shop */
export async function getShopItems(category = null) {
  let query = supabase
    .from('shop_items')
    .select('*')
    .eq('is_active', true)
    .order('crystal_cost', { ascending: true })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  return { data, error }
}

/** ดึงสิ่งที่ user ซื้อแล้ว */
export async function getUserPurchases(userId) {
  const { data, error } = await supabase
    .from('user_purchases')
    .select('*, shop_items(*)')
    .eq('user_id', userId)
    .eq('is_active', true)
  return { data, error }
}

/** สร้าง topup transaction (pending) */
export async function createTopupTransaction(userId, amountThb, slipUrl, slipHash) {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      type: 'topup',
      amount_thb: amountThb,
      crystal_amount: 0,  // จะคำนวณตอน admin confirm
      payment_method: 'promptpay',
      slip_url: slipUrl,
      slip_hash: slipHash,
      status: 'pending'
    })
  return { data, error }
}
