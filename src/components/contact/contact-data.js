import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

/**
 * Contact 섹션에 보여줄 연락처 정보
 * - 이메일은 비공개라 표시하지 않고, 대신 아이디를 보여줍니다.
 * - href 가 없으면 링크 없이 텍스트만 표시합니다.
 */
export const CONTACT_ITEMS = [
  { label: 'ID', value: '0545921', Icon: BadgeOutlinedIcon },
  { label: 'Location', value: 'Seoul, Korea', Icon: LocationOnOutlinedIcon },
];
