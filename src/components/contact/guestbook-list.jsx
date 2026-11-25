import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import GuestbookCard from './guestbook-card';

/**
 * 방명록 목록 (로딩 / 에러 / 빈 상태 포함)
 *
 * Props:
 * @param {object[]} entries - 방명록 글 목록 [Required]
 * @param {boolean} isLoading - 불러오는 중인지 [Optional, 기본값: false]
 * @param {string} errorText - 불러오기 에러 메시지 [Optional, 기본값: '']
 *
 * Example usage:
 * <GuestbookList entries={ entries } isLoading={ isLoading } />
 */
function GuestbookList({ entries, isLoading = false, errorText = '' }) {
  const messageSx = { py: 6, textAlign: 'center', fontSize: 15, color: 'var(--contact-text-sub)' };

  if (isLoading) {
    return (
      <Box sx={{ ...messageSx, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={28} sx={{ color: 'var(--contact-navy)' }} aria-label="방명록 불러오는 중" />
      </Box>
    );
  }

  if (errorText) return <Box role="alert" sx={messageSx}>{errorText}</Box>;

  if (entries.length === 0) {
    return <Box sx={messageSx}>아직 남겨진 글이 없어요. 첫 번째 방명록을 남겨 주세요.</Box>;
  }

  return (
    <Grid container spacing={2}>
      {entries.map((entry) => (
        <Grid key={entry.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <GuestbookCard entry={entry} />
        </Grid>
      ))}
    </Grid>
  );
}

export default GuestbookList;
