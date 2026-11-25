import Box from '@mui/material/Box';

/**
 * 연락처 목록 (아이콘 + 텍스트 정렬)
 *
 * Props:
 * @param {Array<{ label: string, value: string, href?: string, Icon: object }>} items - 표시할 연락처 [Required]
 *
 * Example usage:
 * <ContactInfoList items={ CONTACT_ITEMS } />
 */
function ContactInfoList({ items }) {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(220px, 1fr))' } }}>
      {items.map(({ label, value, href, Icon }) => (
        <Box component="li" key={label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            aria-hidden="true"
            sx={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'var(--contact-pink)',
              color: 'var(--contact-pink-ink)',
            }}
          >
            <Icon fontSize="small" />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--contact-text-sub)' }}>
              {label.toUpperCase()}
            </Box>
            <Box
              component={href ? 'a' : 'span'}
              href={href}
              sx={{
                display: 'inline-block',
                fontSize: { xs: 15, md: 16 },
                fontWeight: 600,
                color: 'var(--contact-text)',
                textDecoration: 'none',
                overflowWrap: 'anywhere',
                '&:hover': href ? { color: 'var(--contact-navy)', textDecoration: 'underline' } : undefined,
              }}
            >
              {value}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ContactInfoList;
