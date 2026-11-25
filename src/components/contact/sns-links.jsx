import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * SNS 링크 (동그란 아이콘 버튼 나란히)
 *
 * Props:
 * @param {Array<{ label: string, href: string, Icon: object }>} links - SNS 목록 [Required]
 *
 * Example usage:
 * <SnsLinks links={ SNS_LINKS } />
 */
function SnsLinks({ links }) {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <Tooltip title={label}>
            <IconButton
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (새 창)`}
              sx={{
                width: 48,
                height: 48,
                border: '1.5px solid var(--contact-navy)',
                color: 'var(--contact-navy)',
                bgcolor: 'var(--contact-surface)',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                '&:hover': { bgcolor: 'var(--contact-navy)', color: 'var(--contact-on-navy)' },
              }}
            >
              <Icon fontSize="small" />
            </IconButton>
          </Tooltip>
        </li>
      ))}
    </Box>
  );
}

export default SnsLinks;
