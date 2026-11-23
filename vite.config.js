import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 주소가 https://<아이디>.github.io/my-portfolio/ 이므로
  // 빌드된 파일 경로 앞에 /my-portfolio/ 를 붙입니다.
  base: '/my-portfolio/',
})
