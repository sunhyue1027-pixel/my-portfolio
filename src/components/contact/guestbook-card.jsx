import Box from '@mui/material/Box';

import { formatDate } from '../../utils/format-date';

/**
 * 방명록 글 카드 1개
 *
 * Props:
 * @param {{ nickname: string, affiliation: string|null, message: string, photo_url: string|null, created_at: string }} entry - 방명록 글 [Required]
 *
 * Example usage:
 * <GuestbookCard entry={ entry } />
 */
function GuestbookCard({ entry }) {
  const { nickname, affiliation, message, photo_url: photoUrl, created_at: createdAt } = entry;

  return (
    <Box
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--contact-surface)',
        border: '1px solid var(--contact-border)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {photoUrl && (
        <Box
          component="img"
          src={photoUrl}
          alt={`${nickname}님이 첨부한 사진`}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', bgcolor: 'var(--contact-navy-soft)' }}
        />
      )}

      <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Box component="h4" sx={{ m: 0, fontSize: 16, fontWeight: 700, color: 'var(--contact-text)' }}>
            {nickname}
          </Box>
          {affiliation && (
            <Box
              component="span"
              sx={{
                px: 1.25,
                py: 0.25,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                bgcolor: 'var(--contact-pink)',
                color: 'var(--contact-pink-ink)',
              }}
            >
              {affiliation}
            </Box>
          )}
        </Box>

        <Box
          component="p"
          sx={{
            m: 0,
            flex: 1,
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

        <Box component="time" dateTime={createdAt} sx={{ fontSize: 12, color: 'var(--contact-text-sub)' }}>
          {formatDate(createdAt)}
        </Box>
      </Box>
    </Box>
  );
}

export default GuestbookCard;
