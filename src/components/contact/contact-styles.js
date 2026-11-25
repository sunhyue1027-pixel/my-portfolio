/**
 * Contact 섹션 공통 스타일 (참고: Loop 습관 앱 UI)
 * - 크림 배경 위에 네이비 테두리 + 아래쪽만 살짝 두꺼운 그림자 선
 */

/** 필기체 타이틀 폰트 (index.html 에서 Google Fonts 로 불러옴) */
export const SCRIPT_FONT = '"Pacifico", "Pretendard", cursive';

/** 네이비 테두리 카드 */
export const outlinedCardSx = {
  bgcolor: 'var(--contact-surface)',
  border: '1.5px solid var(--contact-border)',
  borderRadius: 4,
  boxShadow: '0 3px 0 var(--contact-border)',
};

/** 작은 안내 문구 + 굵은 제목 조합 ("What's cooking? / Mehak" 스타일) */
export const eyebrowSx = {
  m: 0,
  fontSize: 13,
  color: 'var(--contact-text-sub)',
};

export const headingSx = {
  m: 0,
  fontSize: { xs: '1.25rem', md: '1.4rem' },
  fontWeight: 800,
  letterSpacing: '-0.01em',
  color: 'var(--contact-text)',
};

/** 동그란 배지 (개수 표시 "0%" 원 스타일) */
export const circleBadgeSx = {
  flexShrink: 0,
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  bgcolor: 'var(--contact-sky)',
  border: '1.5px solid var(--contact-border)',
  color: 'var(--contact-text)',
  fontSize: 14,
  fontWeight: 800,
};
