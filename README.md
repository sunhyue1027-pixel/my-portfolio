# My Portfolio

React + React Router + MUI로 만든 포트폴리오 템플릿 사이트입니다.

- 컬러: `컬러 팔레트 디자인 시스템.md`(마켓컬리 실측 팔레트)의 CSS 변수 → `src/styles/colors.css`, `src/theme/theme.js`
- 페이지: Home(Hero · About Me · Skill Tree · Projects · Contact), About Me, Projects
- 배포: `main`에 push하면 GitHub Actions가 GitHub Pages로 자동 배포

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 정적 파일 빌드 (dist/)
```

## 폴더 구조

```
src/
├── components/   Navbar, Footer, Layout, SectionBlock, PagePlaceholder
├── pages/        HomePage, AboutPage, ProjectsPage, NotFoundPage
├── styles/       colors.css (디자인 시스템 변수), global.css
└── theme/        theme.js (MUI 테마)
```
