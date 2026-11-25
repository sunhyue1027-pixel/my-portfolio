import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

/**
 * Contact 섹션에 보여줄 연락처 정보
 * TODO: 실제 연락처로 바꿔 주세요. (href 가 없으면 링크 없이 텍스트만 표시)
 */
export const CONTACT_ITEMS = [
  { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com', Icon: EmailOutlinedIcon },
  { label: 'Location', value: 'Seoul, Korea', Icon: LocationOnOutlinedIcon },
];
