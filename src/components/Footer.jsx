import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const YEAR = new Date().getFullYear()

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 4, borderTop: '1px solid var(--color-border)', bgcolor: 'var(--color-bg-primary)' }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
          © {YEAR} My Portfolio · Built with React &amp; MUI
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
