import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import useGuestbook from '../../hooks/use-guestbook';
import { CONTACT_ITEMS } from './contact-data';
import ContactInfoList from './contact-info-list';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

/** 흰 카드 공통 스타일 */
const panelSx = {
  bgcolor: 'var(--contact-surface)',
  border: '1px solid var(--contact-border)',
  borderRadius: 5,
  p: { xs: 3, md: 5 },
};

/** 작은 소제목 스타일 */
const subTitleSx = {
  m: 0,
  mb: 0.5,
  fontSize: { xs: '1.25rem', md: '1.4rem' },
  fontWeight: 700,
  color: 'var(--contact-text)',
  letterSpacing: '-0.01em',
};

/**
 * Home 탭의 Contact 섹션
 * - 위: 연락처(아이콘 + 텍스트)
 * - 아래: 방명록 작성 폼 + 방명록 목록 (Supabase)
 *
 * Props:
 * @param {number} index - 섹션 번호 (뱃지에 표시) [Required]
 *
 * Example usage:
 * <ContactSection index={ 5 } />
 */
function ContactSection({ index }) {
  const { entries, isLoading, loadError, isEnabled, addEntry } = useGuestbook();

  return (
    <Box component="section" id="contact" aria-labelledby="contact-title" sx={{ scrollMarginTop: 68 }}>
      {/* 윗 섹션과 부드럽게 이어지는 물결 경계 */}
      <Box sx={{ bgcolor: 'var(--color-bg-primary)', lineHeight: 0 }} aria-hidden="true">
        <Box
          component="svg"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          sx={{ display: 'block', width: '100%', height: { xs: 28, md: 48 } }}
        >
          <path d="M0 40 C 240 0, 480 0, 720 30 S 1200 60, 1440 20 L1440 60 L0 60 Z" fill="var(--contact-bg)" />
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'var(--contact-bg)', pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: 'inline-block',
                px: 1.5,
                py: 0.5,
                mb: 2,
                borderRadius: 999,
                bgcolor: 'var(--contact-navy-soft)',
                color: 'var(--contact-navy)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {String(index).padStart(2, '0')} · CONTACT
            </Box>
            <Box
              component="h2"
              id="contact-title"
              sx={{
                m: 0,
                mb: 1.5,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--contact-text)',
              }}
            >
              Contact
            </Box>
            <Box component="p" sx={{ m: 0, fontSize: { xs: 15, md: 17 }, lineHeight: 1.6, color: 'var(--contact-text-sub)', wordBreak: 'keep-all' }}>
              궁금한 점이나 함께하고 싶은 일이 있다면 편하게 연락 주세요.
            </Box>
          </Box>

          {/* 연락처 */}
          <Box sx={panelSx}>
            <ContactInfoList items={CONTACT_ITEMS} />
          </Box>

          {/* 방명록 */}
          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 2 }}>
              <Box component="h3" sx={subTitleSx}>Guestbook</Box>
              {isEnabled && !isLoading && !loadError && (
                <Box sx={{ fontSize: 14, color: 'var(--contact-text-sub)' }}>{entries.length}개의 글</Box>
              )}
            </Box>

            {isEnabled ? (
              <>
                <Box sx={{ ...panelSx, mb: 4 }}>
                  <GuestbookForm onSubmit={addEntry} />
                </Box>
                <GuestbookList entries={entries} isLoading={isLoading} errorText={loadError} />
              </>
            ) : (
              <Box sx={{ ...panelSx, textAlign: 'center', color: 'var(--contact-text-sub)', fontSize: 15 }}>
                방명록을 준비하고 있어요.
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ContactSection;
