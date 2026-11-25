import SectionBlock from '../components/SectionBlock'
import ContactSection from '../components/contact/contact-section'

// 홈 화면 섹션 1~4. 순서를 바꾸거나 추가하려면 이 배열만 수정하면 됩니다. (5번 Contact 는 별도 컴포넌트)
const SECTIONS = [
  {
    id: 'hero',
    label: 'HERO',
    title: 'Hero 섹션',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    tone: 'accent',
    large: true,
  },
  {
    id: 'about',
    label: 'ABOUT ME',
    title: 'About Me 섹션',
    description: "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
    tone: 'white',
    action: { label: '더 알아보기', to: '/about' },
  },
  {
    id: 'skills',
    label: 'SKILL TREE',
    title: 'Skill Tree 섹션',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    tone: 'cream',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    title: 'Projects 섹션',
    description: "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.",
    tone: 'white',
    action: { label: '더 보기', to: '/projects' },
  },
]

function HomePage() {
  return (
    <>
      {SECTIONS.map((section, i) => <SectionBlock key={section.id} index={i + 1} {...section} />)}
      {/* Contact 섹션: 연락처 + SNS + 방명록 (src/components/contact) */}
      <ContactSection index={SECTIONS.length + 1} />
    </>
  )
}

export default HomePage
