import { useCallback, useEffect, useState } from 'react';

import { isSupabaseConfigured, supabase } from '../lib/supabase';

const TABLE = 'guestbook';
const BUCKET = 'guestbook-photos';

/** 공개 컬럼만 조회합니다. (이메일은 DB 권한상 조회 불가) */
const PUBLIC_COLUMNS = 'id, nickname, affiliation, message, photo_url, created_at';

/**
 * 사진을 Storage 에 올리고 공개 URL 을 돌려줍니다.
 * @param {File} file
 * @returns {Promise<string>}
 */
async function uploadPhoto(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
  });
  if (error) throw error;

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * 공개 컬럼으로 최신 방명록 50개를 조회합니다.
 * @returns {Promise<{ data: object[]|null, error: object|null }>}
 */
function fetchEntries() {
  return supabase
    .from(TABLE)
    .select(PUBLIC_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(50);
}

/**
 * 방명록 목록 조회 + 글 작성 훅
 * @returns {{ entries: object[], isLoading: boolean, loadError: string, isEnabled: boolean, addEntry: function }}
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [loadError, setLoadError] = useState('');

  /** 조회 결과를 상태에 반영합니다. */
  const applyResult = useCallback(({ data, error }) => {
    if (error) {
      setLoadError('방명록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
    } else {
      setEntries(data);
      setLoadError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let isActive = true;
    fetchEntries().then((result) => {
      if (isActive) applyResult(result);
    });
    return () => {
      isActive = false;
    };
  }, [applyResult]);

  /**
   * 방명록 글을 저장합니다. 사진이 있으면 먼저 업로드합니다.
   * @param {{ nickname: string, email: string, affiliation: string, message: string }} values
   * @param {File | null} photo
   */
  const addEntry = useCallback(async (values, photo) => {
    const photoUrl = photo ? await uploadPhoto(photo) : null;

    const { error } = await supabase.from(TABLE).insert({
      nickname: values.nickname.trim(),
      email: values.email.trim() || null,
      affiliation: values.affiliation.trim() || null,
      message: values.message.trim(),
      photo_url: photoUrl,
    });
    if (error) throw error;

    applyResult(await fetchEntries());
  }, [applyResult]);

  return { entries, isLoading, loadError, isEnabled: isSupabaseConfigured, addEntry };
}

export default useGuestbook;
