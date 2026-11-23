import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './styles/colors.css'
import './styles/global.css'

import theme from './theme/theme'
import App from './App.jsx'

// vite.config.js 의 base('/my-portfolio/')를 라우터에도 알려줍니다
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      {/* injectFirst: 직접 작성한 CSS가 MUI 기본 스타일을 덮어쓸 수 있게 합니다 */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
)
