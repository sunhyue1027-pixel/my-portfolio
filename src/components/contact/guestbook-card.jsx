import Box from '@mui/material/Box';

import { formatDate } from '../../utils/format-date';
import { outlinedCardSx } from './contact-styles';

/**
 * 방명록 글 카드 1개
 * - 왼쪽 위: 닉네임 첫 글자 원 + 닉네임 / 소속
 * - 오른쪽 위: 날짜 칩 (참고 이미지의 "22 / M" 날짜 스타일)
 *
 * Props:
 * @param {{ nickname: string, affiliation: string|null, message: string, photo_url: string|null, created_at: string }} entry - 방명록 글 [Required]
 *
 * Example usage:
 * <GuestbookCard entry={ entry } />
 */
function GuestbookCard({ entry }) {
  const { nickname, affiliation, message, photo_url: photoUrl, created_at: createdAt } = entry;
  const date = new Date(createdAt);

  return (
    <Box
      component="article"
      sx={{ ...outlinedCardSx, height: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: { xs: 2.5, md: 3 } }}
    >
      {/* 작성자 + 날짜 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Box
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'var(--contact-pink)',
            border: '1.5px solid var(--contact-border)',
            color: 'var(--contact-text)',
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          {nickname.charAt(0).toUpperCase()}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box component="h4" sx={{ m: 0, fontSize: 16, fontWeight: 800, color: 'var(--contact-text)', overflowWrap: 'anywhere' }}>
            {nickname}
          </Box>
          {affiliation && (
            <Box sx={{ fontSize: 13, color: 'var(--contact-text-sub)', overflowWrap: 'anywhere' }}>{affiliation}</Box>
          )}
        </Box>

        <Box
          component="time"
          dateTime={createdAt}
          title={formatDate(createdAt)}
          sx={{
            flexShrink: 0,
            minWidth: 44,
            px: 1,
            py: 0.5,
            borderRadius: 2,
            border: '1.5px solid var(--contact-pink-strong)',
            bgcolor: 'var(--contact-pink)',
            color: 'var(--contact-text)',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          <Box component="span" sx={{ display: 'block', fontSize: 15, fontWeight: 800 }}>{date.getDate()}</Box>
          <Box component="span" sx={{ display: 'block', fontSize: 11, fontWeight: 600 }}>{date.getMonth() + 1}월</Box>
        </Box>
      </Box>

      {photoUrl && (
        <Box
          component="img"
          src={photoUrl}
          alt={`${nickname}님이 첨부한 사진`}
          loading="lazy"
          sx={{
            width: '100%',
            aspectRatio: '4 / 3',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 3,
            border: '1.5px solid var(--contact-border)',
            bgcolor: 'var(--contact-navy-soft)',
          }}
        />
      )}

      <Box
        component="p"
        sx={{
          m: 0,
          fontSize: 15,
          lineHeight: 1.6,
          color: 'var(--contact-text)',
          whiteSpace: 'pre-line',
          overflowWrap: 'anywhere',
          wordBreak: 'keep-all',
        }}
      >
        {message}
      </Box>
    </Box>
  );
}

export default GuestbookCard;
