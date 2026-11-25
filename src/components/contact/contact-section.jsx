import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import useGuestbook from '../../hooks/use-guestbook';
import { CONTACT_ITEMS } from './contact-data';
import ContactInfoList from './contact-info-list';
import { circleBadgeSx, eyebrowSx, headingSx, outlinedCardSx, SCRIPT_FONT } from './contact-styles';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';
import WavyLine from './wavy-line';

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
  const isCountVisible = isEnabled && !isLoading && !loadError;

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

      <Box sx={{ bgcolor: 'var(--contact-bg)', pt: { xs: 3, md: 5 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Box sx={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--contact-text-sub)', mb: 1 }}>
              {String(index).padStart(2, '0')} · CONTACT
            </Box>
            <Box
              component="h2"
              id="contact-title"
              sx={{
                m: 0,
                fontFamily: SCRIPT_FONT,
                fontWeight: 400,
                fontSize: { xs: '2.5rem', md: '3.25rem' },
                lineHeight: 1.3,
                color: 'var(--contact-navy)',
              }}
            >
              Contact
            </Box>
            <Box sx={{ maxWidth: 360, mx: 'auto', my: 1.5 }}>
              <WavyLine />
            </Box>
            <Box component="p" sx={{ m: 0, fontSize: { xs: 15, md: 17 }, lineHeight: 1.6, color: 'var(--contact-text-sub)', wordBreak: 'keep-all' }}>
              포트폴리오를 봐 주셔서 감사합니다. 채용·협업 제안부터 피드백, 가벼운 인사까지 아래 방명록에 편하게 남겨 주세요.
            </Box>
          </Box>

          {/* 연락처 */}
          <Box sx={{ ...outlinedCardSx, p: { xs: 3, md: 4 } }}>
            <ContactInfoList items={CONTACT_ITEMS} />
          </Box>

          {/* 방명록 */}
          <Box sx={{ mt: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
              <Box>
                <Box component="p" sx={eyebrowSx}>다녀간 흔적을 남겨 주세요</Box>
                <Box component="h3" sx={headingSx}>Guestbook</Box>
              </Box>
              {isCountVisible && (
                <Box sx={circleBadgeSx} aria-label={`방명록 ${entries.length}개`}>
                  {entries.length}
                </Box>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <WavyLine />
            </Box>

            {isEnabled ? (
              <>
                <GuestbookForm onSubmit={addEntry} />
                <Box sx={{ mt: 5 }}>
                  <GuestbookList entries={entries} isLoading={isLoading} errorText={loadError} />
                </Box>
              </>
            ) : (
              <Box sx={{ ...outlinedCardSx, p: 4, textAlign: 'center', color: 'var(--contact-text-sub)', fontSize: 15 }}>
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
