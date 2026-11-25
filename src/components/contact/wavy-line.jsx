import Box from '@mui/material/Box';

/**
 * 제목 아래 물결 선 (참고 이미지의 손그림 느낌 구분선)
 *
 * Props: 없음
 *
 * Example usage:
 * <WavyLine />
 */
function WavyLine() {
  return (
    <Box
      component="svg"
      viewBox="0 0 600 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{ display: 'block', width: '100%', height: 20 }}
    >
      <path
        d="M0 14 C 60 2, 120 2, 180 12 S 300 24, 360 12 S 480 0, 540 10 S 590 16, 600 12"
        fill="none"
        stroke="var(--contact-border)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </Box>
  );
}

export default WavyLine;
