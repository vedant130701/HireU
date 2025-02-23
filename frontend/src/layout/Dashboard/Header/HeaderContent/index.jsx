// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const navigate = useNavigate();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && (
        // <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
        <Button
          sx={{ marginLeft: '65%' }}
          variant="outlined"
          startIcon={<PlusOutlined />}
          onClick={() => {
            navigate('add-new-offer');
          }}
        >
          Add new offer
        </Button>
        // </Box>
      )}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
