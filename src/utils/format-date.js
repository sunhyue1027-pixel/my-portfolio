const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * 날짜 문자열을 "2026. 11. 25. 오후 03:20" 형태로 바꿉니다.
 * @param {string} value - ISO 날짜 문자열
 * @returns {string}
 */
export function formatDate(value) {
  return dateFormatter.format(new Date(value));
}
