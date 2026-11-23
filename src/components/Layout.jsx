import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Box from '@mui/material/Box'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * 모든 페이지 공통 틀: 네비게이션 + 페이지 내용(Outlet) + 푸터
 * 푸터가 항상 화면 아래에 붙도록 세로 flex 레이아웃을 사용합니다.
 */
function Layout() {
  const { pathname } = useLocation()

  // 페이지를 이동하면 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
