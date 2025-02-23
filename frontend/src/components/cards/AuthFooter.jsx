// material-ui
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'center' }}
        spacing={2}
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        <Typography variant="subtitle2" color="secondary" style={{ textAlign: 'center' }}>
          <div>Developed with 💙 by Team HireU</div>
          <div>Akshay Chavan Sarthak Shastri Ananya Asthana Vedant Rishi Das Gaurav Tejwani</div>
        </Typography>
      </Stack>
    </Container>
  );
}
