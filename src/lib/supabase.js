import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** .env 에 Supabase 값이 들어 있는지 여부 (없으면 방명록을 비활성화합니다) */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

/**
 * Supabase 클라이언트
 * - 공개(anon/publishable) 키만 사용합니다. 보안은 DB의 RLS·컬럼 권한이 담당합니다.
 */
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;
