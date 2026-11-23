import { Link } from 'react-router'
import Button from '@mui/material/Button'
import PagePlaceholder from '../components/PagePlaceholder'

function NotFoundPage() {
  return (
    <PagePlaceholder eyebrow="404" title="페이지를 찾을 수 없어요" description="주소가 바뀌었거나 없는 페이지입니다.">
      <Button component={Link} to="/" variant="outlined" sx={{ mt: 4 }}>
        홈으로 돌아가기
      </Button>
    </PagePlaceholder>
  )
}

export default NotFoundPage
