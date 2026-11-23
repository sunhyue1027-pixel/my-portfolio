import { createTheme } from '@mui/material/styles'

/**
 * MUI 테마
 * - 색상은 "컬러 팔레트 디자인 시스템.md" 의 CSS 변수와 같은 값입니다. (src/styles/colors.css)
 * - MUI는 hover 색, 대비 글자색 등을 자동 계산하므로 palette에는 hex 값을 넣고,
 *   버튼처럼 상태 색이 정해진 컴포넌트는 styleOverrides에서 CSS 변수를 직접 씁니다.
 * - colorSchemes: 운영체제가 다크모드면 dark 팔레트가 자동 적용됩니다.
 */
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#5F0080', light: '#F4EDF7', dark: '#4A0064', contrastText: '#FFFFFF' },
        secondary: { main: '#BD76FF', contrastText: '#FFFFFF' },
        background: { default: '#FFFFFF', paper: '#FFFFFF' },
        text: { primary: '#333333', secondary: '#6D6D6D', disabled: '#B5B5B5' },
        divider: '#E2E2E2',
      },
    },
    dark: {
      palette: {
        primary: { main: '#B27CD0', light: '#2A1A33', dark: '#C99BE0', contrastText: '#121212' },
        secondary: { main: '#CB94FF', contrastText: '#121212' },
        background: { default: '#121212', paper: '#1E1B22' },
        text: { primary: '#EDEDED', secondary: '#B0B0B0', disabled: '#7A7A7A' },
        divider: '#333333',
      },
    },
  },
  typography: {
    // 한글이 깔끔하게 보이도록 시스템 한글 폰트를 우선 사용
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple SD Gothic Neo"',
      '"Malgun Gothic"',
      '"Noto Sans KR"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        // 터치 영역 44px 이상 확보 (디자인 시스템 모바일 가이드)
        root: { minHeight: 44, paddingInline: 22, borderRadius: 999 },
        containedPrimary: {
          backgroundColor: 'var(--color-button-primary)',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: 'var(--color-button-hover)' },
          '@media (hover: none)': {
            '&:active': { backgroundColor: 'var(--color-primary-dark)' },
          },
        },
        outlinedPrimary: {
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          '&:hover': { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' },
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-bg-primary)',
          border: '1px solid var(--color-border)',
        },
      },
    },
  },
})

export default theme
