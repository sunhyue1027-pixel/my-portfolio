import { Link } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// 섹션 배경 톤: 흰색·크림을 번갈아 쓰면 구분선 없이도 섹션이 나뉩니다 (디자인 시스템 가이드)
const TONES = {
  accent: 'var(--color-primary-light)',
  white: 'var(--color-bg-primary)',
  cream: 'var(--color-bg-secondary)',
}

/**
 * 홈 화면의 섹션 하나
 * - 가로 전체 배경(Box) 안에 중앙 정렬된 카드(Card)를 둡니다.
 *
 * @param {string} id - 섹션 앵커 id (예: "hero")
 * @param {number} index - 섹션 번호
 * @param {string} label - 영문 라벨 (예: "HERO")
 * @param {string} title - 섹션 제목
 * @param {string} description - 섹션 설명 문구
 * @param {'accent'|'white'|'cream'} [tone] - 배경 톤
 * @param {{ label: string, to: string }} [action] - 하단 버튼 (선택)
 * @param {boolean} [large] - Hero처럼 크게 보여줄지
 */
function SectionBlock({ id, index, label, title, description, tone = 'white', action, large = false }) {
  const headingId = `${id}-title`

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={headingId}
      sx={{
        bgcolor: TONES[tone],
        py: large ? { xs: 8, md: 14 } : { xs: 6, md: 10 },
        scrollMarginTop: 68, // 고정 네비게이션에 가려지지 않게
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            textAlign: 'center',
            borderTop: '4px solid var(--color-primary)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            '@media (hover: hover)': {
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(95, 0, 128, 0.10)' },
            },
          }}
        >
          <CardContent sx={{ px: { xs: 3, sm: 6 }, py: large ? { xs: 6, sm: 8 } : { xs: 4, sm: 6 } }}>
            {/* 섹션 번호 뱃지: Secondary 색 + 굵은 흰 글씨 */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.5,
                mb: 2,
                borderRadius: 999,
                bgcolor: 'var(--color-secondary)',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {String(index).padStart(2, '0')} · {label}
            </Box>

            <Typography
              id={headingId}
              variant={large ? 'h2' : 'h4'}
              component="h2"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: large ? 800 : 700,
                fontSize: large ? { xs: '2.25rem', sm: '3rem', md: '3.5rem' } : { xs: '1.6rem', sm: '2rem' },
                mb: 2,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: 'var(--color-text-secondary)',
                fontSize: { xs: 16, sm: large ? 19 : 17 },
                lineHeight: 1.8,
                maxWidth: 560,
                mx: 'auto',
                wordBreak: 'keep-all', // 한글 단어 중간에서 줄바꿈되지 않게
              }}
            >
              {description}
            </Typography>

            {action && (
              <Button component={Link} to={action.to} variant="contained" sx={{ mt: 4 }}>
                {action.label}
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default SectionBlock
