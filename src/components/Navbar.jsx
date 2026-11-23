import { Link, NavLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

/**
 * 상단 네비게이션
 * - 로고는 왼쪽, 탭 3개는 오른쪽 (flexbox space-between)
 * - 현재 페이지 탭은 Primary 보라색 + 연보라 배경으로 표시 (NavLink의 .active 클래스)
 */
function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 1, minHeight: { xs: 60, sm: 68 } }}>
          {/* 로고 */}
          <Box
            component={Link}
            to="/"
            sx={{
              color: 'var(--color-primary)',
              fontWeight: 800,
              fontSize: { xs: 18, sm: 22 },
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { color: 'var(--color-primary-dark)' },
            }}
          >
            Portfolio
            <Box component="span" sx={{ color: 'var(--color-secondary)' }}>.</Box>
          </Box>

          {/* 탭 메뉴 */}
          <Box component="nav" aria-label="주요 메뉴">
            <Box component="ul" sx={{ display: 'flex', gap: { xs: 0.25, sm: 1 }, m: 0, p: 0, listStyle: 'none' }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Box
                    component={NavLink}
                    to={item.to}
                    end={item.to === '/'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 44,
                      px: { xs: 1.25, sm: 2 },
                      borderRadius: 999,
                      color: 'var(--color-text-nav)',
                      fontSize: { xs: 14, sm: 16 },
                      fontWeight: 500,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease, background-color 0.2s ease',
                      '&:hover': { color: 'var(--color-primary)' },
                      '&.active': {
                        color: 'var(--color-primary)',
                        bgcolor: 'var(--color-primary-light)',
                        fontWeight: 700,
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
