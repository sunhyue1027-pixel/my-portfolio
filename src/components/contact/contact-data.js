import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

/**
 * Contact 섹션에 보여줄 연락처 정보
 * TODO: 실제 연락처로 바꿔 주세요. (href 가 없으면 링크 없이 텍스트만 표시)
 */
export const CONTACT_ITEMS = [
  { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com', Icon: EmailOutlinedIcon },
  { label: 'Phone', value: '010-0000-0000', href: 'tel:010-0000-0000', Icon: PhoneOutlinedIcon },
  { label: 'Location', value: 'Seoul, Korea', Icon: LocationOnOutlinedIcon },
];

/**
 * SNS 링크 (동그란 아이콘 버튼)
 * TODO: 실제 계정 주소로 바꿔 주세요.
 */
export const SNS_LINKS = [
  { label: 'GitHub', href: 'https://github.com/sunhyue1027-pixel', Icon: GitHubIcon },
  { label: 'Instagram', href: 'https://instagram.com/', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/', Icon: LinkedInIcon },
];
