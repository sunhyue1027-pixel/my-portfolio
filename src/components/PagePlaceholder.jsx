import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

/**
 * 아직 개발 전인 페이지의 공통 틀
 * - 위쪽: 연보라 배경의 페이지 제목 영역
 * - 아래쪽: 크림 배경 위에 안내 문구 카드
 */
function PagePlaceholder({ eyebrow, title, description, children }) {
  return (
    <>
      <Box component="header" sx={{ bgcolor: 'var(--color-primary-light)', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            sx={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', mb: 1.5 }}
          >
            {eyebrow}
          </Typography>
          <Typography
            variant="h1"
            sx={{ color: 'var(--color-text-primary)', fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' } }}
          >
            {title}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'var(--color-bg-secondary)', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Card sx={{ textAlign: 'center', borderTop: '4px solid var(--color-primary)' }}>
            <CardContent sx={{ px: { xs: 3, sm: 6 }, py: { xs: 5, sm: 7 } }}>
              <Typography
                sx={{
                  color: 'var(--color-text-secondary)',
                  fontSize: { xs: 16, sm: 18 },
                  lineHeight: 1.8,
                  maxWidth: 560,
                  mx: 'auto',
                  wordBreak: 'keep-all',
                }}
              >
                {description}
              </Typography>
              {children}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default PagePlaceholder
