/** 방명록 입력 제한 (DB 제약조건과 같은 값) */
export const GUESTBOOK_LIMITS = {
  nickname: 20,
  affiliation: 40,
  message: 500,
};

/** 사진 업로드 제한 (Storage 버킷 설정과 같은 값) */
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * 방명록 폼 값을 검사하고, 항목별 에러 메시지를 돌려줍니다.
 * @param {object} values - 폼 입력값
 * @returns {Record<string, string>} 에러가 없으면 빈 객체
 */
export function validateGuestbook(values) {
  const errors = {};
  const nickname = values.nickname.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!nickname) errors.nickname = '아이디 또는 닉네임을 입력해 주세요.';
  else if (nickname.length > GUESTBOOK_LIMITS.nickname) errors.nickname = `${GUESTBOOK_LIMITS.nickname}자 이내로 입력해 주세요.`;

  if (email && !EMAIL_PATTERN.test(email)) errors.email = '이메일 형식을 확인해 주세요.';

  if (values.affiliation.trim().length > GUESTBOOK_LIMITS.affiliation) {
    errors.affiliation = `${GUESTBOOK_LIMITS.affiliation}자 이내로 입력해 주세요.`;
  }

  if (!message) errors.message = '남기실 말을 적어 주세요.';
  else if (message.length > GUESTBOOK_LIMITS.message) errors.message = `${GUESTBOOK_LIMITS.message}자 이내로 입력해 주세요.`;

  return errors;
}

/**
 * 사진 파일이 업로드 가능한지 검사합니다.
 * @param {File} file
 * @returns {string} 에러 메시지 (문제없으면 빈 문자열)
 */
export function validatePhoto(file) {
  if (!PHOTO_TYPES.includes(file.type)) return 'JPG, PNG, WEBP, GIF 이미지만 올릴 수 있어요.';
  if (file.size > PHOTO_MAX_BYTES) return '사진은 5MB 이하만 올릴 수 있어요.';
  return '';
}
