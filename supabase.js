// ============================================
// NEXUS LIFE — Supabase Client (ไฟล์กลาง)
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

// ============================================
// QUEST HELPERS
// ============================================

/** ดึง Quest ทั้งหมดที่ active */
export async function getQuests(classTarget = null) {
  let query = supabase.from('quests').select('*').eq('is_active', true)
  if (classTarget) query = query.eq('class_target', classTarget)
  const { data, error } = await query
  return { data, error }
}

/** ดึง Quest ที่ user กำลังทำอยู่ */
export async function getUserQuests(userId) {
  const { data, error } = await supabase
    .from('user_quests')
    .select('*, quests(*)')
    .eq('user_id', userId)
  return { data, error }
}

/** ส่งหลักฐาน Quest */
export async function submitQuestProof(userId, questId, proofText = null, proofUrl = null) {
  const { data, error } = await supabase
    .from('user_quests')
    .upsert({
      user_id: userId,
      quest_id: questId,
      status: 'pending_review',
      proof_text: proofText,
      proof_url: proofUrl,
      submitted_at: new Date().toISOString()
    })
  return { data, error }
}

// ============================================
// ACTIVITY FEED
// ============================================

/** ดึง activity feed ล่าสุด */
export async function getActivityFeed(limit = 20) {
  const { data, error } = await supabase
    .from('activity_feed')
    .select('*, users(username, display_name, class, level, avatar_seed)')
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

/** เพิ่ม activity */
export async function addActivity(userId, type, data = {}) {
  const { error } = await supabase
    .from('activity_feed')
    .insert({ user_id: userId, type, data })
  return { error }
}

// ============================================
// LEADERBOARD
// ============================================

/** ดึง leaderboard รายเดือน */
export async function getLeaderboard(limit = 50) {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, display_name, class, level, rank, xp_this_month, avatar_seed, equipped_title_id')
    .eq('profile_public', true)
    .order('xp_this_month', { ascending: false })
    .limit(limit)
  return { data, error }
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

/** ส่งข้อความ chat */
export async function sendChatMessage(senderId, channel, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ sender_id: senderId, channel, content })
  return { data, error }
}
